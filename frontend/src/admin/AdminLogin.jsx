import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { Input } from "../components/ui/input";
import { api, setToken, errText } from "../lib/api";
import { useAdmin } from "./AdminApp";

export default function AdminLogin() {
  const { setUser } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setToken(data?.access_token);
      setUser(data);
    } catch (err) {
      setError(errText(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-3xl bg-white p-8 shadow-xl" data-testid="admin-login-form">
        <div className="flex items-center gap-3">
          <img src="/brand/mark.png" alt="" className="h-10 w-auto" />
          <div><p className="font-chillax text-lg tracking-[0.2em]">POIESIZ</p><p className="text-xs text-zinc-500">Admin dashboard</p></div>
        </div>
        <div className="space-y-3">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required data-testid="admin-login-email" />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required data-testid="admin-login-password" />
        </div>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" data-testid="admin-login-error">{error}</p>}
        <button type="submit" disabled={busy} className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#FEBD1C] font-medium hover:bg-[#F0AC00] disabled:opacity-60" data-testid="admin-login-submit">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}Sign in
        </button>
      </form>
    </div>
  );
}
