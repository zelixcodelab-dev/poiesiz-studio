import asyncio
import os
import uuid
import logging
from datetime import datetime, timezone, timedelta
from typing import Any

import bcrypt
import jwt
import requests
from bson import ObjectId
from fastapi import APIRouter, Request, Response, HTTPException, Depends, UploadFile, File
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)
JWT_ALGORITHM = "HS256"
CONTENT_KEYS = {"sections", "hero", "marquee", "services", "projects", "featured", "trending", "rooms", "styles",
                "clients", "why", "ongoing", "steps", "faqs", "contact", "footer", "form"}
IMAGE_TYPES = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "image/svg+xml": "svg"}
STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
storage_key = None


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def make_token(user_id: str, kind: str, delta: timedelta, email: str = "") -> str:
    payload = {"sub": user_id, "email": email, "type": kind, "exp": datetime.now(timezone.utc) + delta}
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, user_id: str, email: str) -> str:
    access = make_token(user_id, "access", timedelta(minutes=15), email)
    refresh = make_token(user_id, "refresh", timedelta(days=7))
    response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none", max_age=900, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True, samesite="none", max_age=604800, path="/")
    return access


def public_user(u: dict) -> dict:
    return {"id": str(u["_id"]), "email": u["email"], "name": u.get("name", ""), "role": u.get("role", "")}


def init_storage(force: bool = False):
    global storage_key
    if storage_key and not force:
        return storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": os.environ["EMERGENT_LLM_KEY"]}, timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key


def put_object(path: str, data: bytes, content_type: str) -> dict:
    resp = requests.put(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": init_storage(), "Content-Type": content_type}, data=data, timeout=120)
    resp.raise_for_status()
    return resp.json()


def get_object(path: str):
    resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": init_storage()}, timeout=60)
    if resp.status_code == 404:
        resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": init_storage(force=True)}, timeout=60)
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")


class LoginIn(BaseModel):
    email: str
    password: str


class PasswordIn(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8)


class ContentIn(BaseModel):
    data: Any


async def seed_admin(db):
    email = os.environ["ADMIN_EMAIL"].strip().lower()
    if not await db.users.find_one({"email": email}):
        await db.users.insert_one({"email": email, "password_hash": hash_password(os.environ["ADMIN_PASSWORD"]), "name": "Admin",
                                   "role": "admin", "created_at": datetime.now(timezone.utc)})
    try:
        await asyncio.to_thread(init_storage)
    except Exception as e:
        logger.error(f"Storage init failed: {e}")


def build_router(db) -> APIRouter:
    r = APIRouter(prefix="/api")

    async def current_admin(request: Request) -> dict:
        token = request.cookies.get("access_token")
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
        if not token:
            raise HTTPException(status_code=401, detail="Not authenticated")
        try:
            payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user or user.get("role") != "admin":
            raise HTTPException(status_code=401, detail="Not authorised")
        return user

    @r.post("/auth/login")
    async def login(body: LoginIn, request: Request, response: Response):
        email = body.email.strip().lower()
        ident = f"{request.client.host if request.client else 'x'}:{email}"
        rec = await db.login_attempts.find_one({"identifier": ident})
        now = datetime.now(timezone.utc)
        locked = rec.get("locked_until") if rec else None
        if locked and locked.replace(tzinfo=timezone.utc) > now:
            raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")
        user = await db.users.find_one({"email": email})
        if not user or not verify_password(body.password, user["password_hash"]):
            count = (rec.get("count", 0) if rec else 0) + 1
            await db.login_attempts.update_one({"identifier": ident}, {"$set": {"count": count, "locked_until": now + timedelta(minutes=15) if count >= 5 else None}}, upsert=True)
            raise HTTPException(status_code=401, detail="Invalid email or password")
        await db.login_attempts.delete_many({"identifier": ident})
        token = set_auth_cookies(response, str(user["_id"]), email)
        return {**public_user(user), "access_token": token}

    @r.post("/auth/refresh")
    async def refresh(request: Request, response: Response):
        token = request.cookies.get("refresh_token")
        if not token:
            raise HTTPException(status_code=401, detail="No refresh token")
        try:
            payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        token = set_auth_cookies(response, str(user["_id"]), user["email"])
        return {**public_user(user), "access_token": token}

    @r.get("/auth/me")
    async def me(user: dict = Depends(current_admin)):
        return public_user(user)

    @r.post("/auth/logout")
    async def logout(response: Response):
        response.delete_cookie("access_token", path="/", secure=True, samesite="none")
        response.delete_cookie("refresh_token", path="/", secure=True, samesite="none")
        return {"ok": True}

    @r.post("/auth/change-password")
    async def change_password(body: PasswordIn, user: dict = Depends(current_admin)):
        if not verify_password(body.current_password, user["password_hash"]):
            raise HTTPException(status_code=400, detail="Current password is incorrect")
        await db.users.update_one({"_id": user["_id"]}, {"$set": {"password_hash": hash_password(body.new_password)}})
        return {"ok": True}

    @r.get("/content")
    async def get_content():
        docs = await db.site_content.find({}, {"_id": 0, "key": 1, "data": 1}).to_list(100)
        return {d["key"]: d["data"] for d in docs}

    @r.put("/content/{key}")
    async def save_content(key: str, body: ContentIn, user: dict = Depends(current_admin)):
        if key not in CONTENT_KEYS:
            raise HTTPException(status_code=404, detail="Unknown section")
        await db.site_content.update_one({"key": key}, {"$set": {"data": body.data, "updated_at": datetime.now(timezone.utc).isoformat()}}, upsert=True)
        return {"key": key, "data": body.data}

    @r.delete("/content/{key}")
    async def reset_content(key: str, user: dict = Depends(current_admin)):
        await db.site_content.delete_one({"key": key})
        return {"ok": True}

    @r.post("/upload")
    async def upload(file: UploadFile = File(...), user: dict = Depends(current_admin)):
        ext = IMAGE_TYPES.get(file.content_type or "")
        if not ext:
            raise HTTPException(status_code=400, detail="Only JPG, PNG, WEBP, GIF or SVG images are allowed")
        data = await file.read()
        if len(data) > 10 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Image must be under 10 MB")
        path = f"{os.environ['STORAGE_APP_NAME']}/uploads/{uuid.uuid4()}.{ext}"
        result = await asyncio.to_thread(put_object, path, data, file.content_type)
        await db.files.insert_one({"id": str(uuid.uuid4()), "storage_path": result["path"], "original_filename": file.filename,
                                   "content_type": file.content_type, "size": result.get("size", len(data)), "is_deleted": False,
                                   "created_at": datetime.now(timezone.utc).isoformat()})
        return {"url": f"/api/files/{result['path']}"}

    @r.get("/files/{path:path}")
    async def download(path: str):
        record = await db.files.find_one({"storage_path": path, "is_deleted": False}, {"_id": 0, "content_type": 1})
        if not record:
            raise HTTPException(status_code=404, detail="File not found")
        data, ctype = await asyncio.to_thread(get_object, path)
        return Response(content=data, media_type=record.get("content_type") or ctype, headers={"Cache-Control": "public, max-age=31536000"})

    return r
