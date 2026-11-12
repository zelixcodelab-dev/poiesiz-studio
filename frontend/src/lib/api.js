import axios from "axios";

export const BACKEND = process.env.REACT_APP_BACKEND_URL || "";
export const api = axios.create({ baseURL: `${BACKEND}/api`, withCredentials: true });

const TOKEN_KEY = "poiesiz_admin_token";
export const setToken = (t) => (t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY));

api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem(TOKEN_KEY);
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

api.interceptors.response.use(undefined, async (err) => {
  const cfg = err.config;
  if (err.response?.status === 401 && cfg && !cfg._retry && !cfg.url?.startsWith("/auth/")) {
    cfg._retry = true;
    try {
      const { data } = await api.post("/auth/refresh");
      setToken(data?.access_token);
      return api(cfg);
    } catch {
      setToken(null);
    }
  }
  return Promise.reject(err);
});

export const asset = (u) => (typeof u === "string" && u.startsWith("/api/") ? `${BACKEND}${u}` : u);

export const errText = (e) => {
  const d = e?.response?.data?.detail;
  if (typeof d === "string") return d;
  if (Array.isArray(d)) return d.map((x) => x?.msg).filter(Boolean).join(" ");
  return e?.message || "Something went wrong. Please try again.";
};
