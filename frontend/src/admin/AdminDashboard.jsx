import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Save, RotateCcw, ExternalLink, LogOut, KeyRound, Loader2, Menu } from "lucide-react";
import { SCHEMA } from "./schema";
import { Fields } from "./Fields";
import { useAdmin } from "./AdminApp";
import { useSite } from "../lib/content";
import { api, errText } from "../lib/api";
import { PasswordDialog } from "./PasswordDialog";
import { Enquiries } from "./Enquiries";

const INBOX = "_enquiries";

export default function AdminDashboard() {
  const { user, logout } = useAdmin();
  const { data, reload } = useSite();
  const [key, setKey] = useState(INBOX);
  const [draft, setDraft] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const isInbox = key === INBOX;
  const section = useMemo(() => (isInbox ? { label: "Enquiries", hint: "Every consultation request from the website. Call, then mark the status." } : SCHEMA.find((s) => s.key === key) ?? SCHEMA[0]), [key, isInbox]);

  useEffect(() => { if (!dirty) setDraft(data[key]); }, [data, key, dirty]);

  const pick = (k) => {
    if (dirty && !window.confirm("You have unsaved changes. Discard them?")) return;
    setKey(k);
    setDraft(data[k]);
    setDirty(false);
    setNavOpen(false);
  };
  const save = async () => {
    setBusy(true);
    try {
      await api.put(`/content/${key}`, { data: draft });
      await reload();
      setDirty(false);
      toast.success(`${section.label} saved. The website is updated.`);
    } catch (e) { toast.error(errText(e)); } finally { setBusy(false); }
  };
  const reset = async () => {
    if (!window.confirm(`Reset "${section.label}" back to the original content?`)) return;
    setBusy(true);
    try {
      await api.delete(`/content/${key}`);
      setDirty(false);
      await reload();
      toast.success("Restored original content.");
    } catch (e) { toast.error(errText(e)); } finally { setBusy(false); }
  };

  return (
    <div className="flex min-h-screen">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 overflow-y-auto border-r border-zinc-200 bg-white p-4 transition-transform lg:static lg:translate-x-0 ${navOpen ? "translate-x-0" : "-translate-x-full"}`} data-testid="admin-sidebar">
        <div className="mb-6 flex items-center gap-2 px-2"><img src="/brand/mark.png" alt="" className="h-8" /><span className="font-chillax tracking-[0.2em]">POIESIZ</span></div>
        <nav className="space-y-1">
          <button onClick={() => pick(INBOX)} className={`mb-3 block w-full rounded-lg px-3 py-2 text-left text-sm ${isInbox ? "bg-[#FEBD1C] font-semibold" : "bg-zinc-100 font-medium text-zinc-700 hover:bg-zinc-200"}`} data-testid="admin-nav-enquiries">Enquiries inbox</button>
          {SCHEMA.map((s) => (
            <button key={s.key} onClick={() => pick(s.key)} className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${key === s.key ? "bg-[#FEBD1C] font-semibold" : "text-zinc-600 hover:bg-zinc-100"}`} data-testid={`admin-nav-${s.key}`}>{s.label}</button>
          ))}
        </nav>
      </aside>
      {navOpen && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setNavOpen(false)} />}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur md:px-8">
          <button className="lg:hidden" onClick={() => setNavOpen(true)} aria-label="Menu" data-testid="admin-menu-btn"><Menu className="h-5 w-5" /></button>
          <h1 className="flex-1 truncate font-display text-lg font-semibold" data-testid="admin-section-title">{section.label}</h1>
          <a href="/" target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 sm:flex" data-testid="admin-view-site"><ExternalLink className="h-4 w-4" />View site</a>
          <button onClick={() => setPwOpen(true)} className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900" data-testid="admin-password-btn"><KeyRound className="h-4 w-4" /><span className="hidden sm:inline">Password</span></button>
          <button onClick={logout} className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900" data-testid="admin-logout-btn"><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Log out</span></button>
        </header>
        <main className="mx-auto max-w-3xl space-y-6 px-4 py-8 pb-32 md:px-8">
          <p className="text-sm text-zinc-500">Signed in as {user?.email}. {section.hint ?? "Edit the content below, then press Save."}</p>
          {isInbox ? <Enquiries /> : (
          <div className="space-y-6 rounded-2xl bg-white p-5 shadow-sm md:p-7" data-testid={`admin-editor-${key}`}>
            <Fields fields={section.fields} value={draft ?? {}} onChange={(v) => { setDraft(v); setDirty(true); }} tid={`f-${key}`} />
          </div>
          )}
        </main>
        {!isInbox && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur lg:left-64">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <span className="flex-1 text-sm text-zinc-500" data-testid="admin-dirty-state">{dirty ? "Unsaved changes" : "All changes saved"}</span>
            <button onClick={reset} disabled={busy} className="flex h-10 items-center gap-2 rounded-full border border-zinc-300 px-4 text-sm hover:bg-zinc-100 disabled:opacity-50" data-testid="admin-reset-btn"><RotateCcw className="h-4 w-4" /><span className="hidden sm:inline">Restore original</span></button>
            <button onClick={save} disabled={busy || !dirty} className="flex h-10 items-center gap-2 rounded-full bg-[#FEBD1C] px-5 text-sm font-semibold hover:bg-[#F0AC00] disabled:opacity-50" data-testid="admin-save-btn">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Save
            </button>
          </div>
        </div>
        )}
      </div>
      <PasswordDialog open={pwOpen} onOpenChange={setPwOpen} />
    </div>
  );
}
