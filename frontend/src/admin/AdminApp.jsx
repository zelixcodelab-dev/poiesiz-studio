import { createContext, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import { api, setToken } from "../lib/api";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

const AuthCtx = createContext({ user: null, setUser: () => {} });
export const useAdmin = () => useContext(AuthCtx);

const Protected = ({ children }) => {
  const { user } = useAdmin();
  if (user === null) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-zinc-400" /></div>;
  return user ? children : <Navigate to="/admin/login" replace />;
};

export default function AdminApp() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    api.get("/auth/me").then(({ data }) => setUser(data ?? false)).catch(() => { setToken(null); setUser(false); });
  }, []);
  const logout = async () => {
    try { await api.post("/auth/logout"); } catch { /* ignore */ }
    setToken(null);
    setUser(false);
  };
  return (
    <AuthCtx.Provider value={{ user, setUser, logout }}>
      <div className="min-h-screen bg-zinc-100 font-body text-zinc-900">
        <Routes>
          <Route path="login" element={user ? <Navigate to="/admin" replace /> : <AdminLogin />} />
          <Route path="*" element={<Protected><AdminDashboard /></Protected>} />
        </Routes>
        <Toaster position="top-center" richColors />
      </div>
    </AuthCtx.Provider>
  );
}
