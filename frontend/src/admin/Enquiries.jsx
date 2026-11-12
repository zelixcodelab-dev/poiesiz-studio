import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Phone, RefreshCw, Loader2, Archive, Inbox } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { api, errText } from "../lib/api";

const STATUS = [["new", "New", "bg-amber-100 text-amber-800"], ["called", "Called", "bg-sky-100 text-sky-800"], ["closed", "Closed", "bg-emerald-100 text-emerald-800"]];
const fmt = (iso) => { const d = new Date(iso); return Number.isNaN(d.getTime()) ? "" : d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }); };

const Row = ({ e, onSave }) => {
  const [note, setNote] = useState(e.note ?? "");
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm" data-testid={`enquiry-${e.id}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold">{e.name}</p>
          <p className="text-sm text-zinc-500">{[e.type, e.city].filter(Boolean).join(" · ")} · {fmt(e.created_at)}</p>
        </div>
        <a href={`tel:+91${e.phone}`} className="flex items-center gap-2 rounded-full bg-[#FEBD1C] px-4 py-2 text-sm font-semibold hover:bg-[#F0AC00]" data-testid={`enquiry-call-${e.id}`}><Phone className="h-4 w-4" />+91 {e.phone}</a>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {STATUS.map(([k, l, c]) => (
          <button key={k} onClick={() => onSave(e.id, { status: k })} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${e.status === k ? c : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`} data-testid={`enquiry-status-${k}-${e.id}`}>{l}</button>
        ))}
        <button onClick={() => window.confirm("Archive this enquiry? It will be hidden from the list.") && onSave(e.id, { status: "archived" })} className="ml-auto flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-zinc-500 hover:bg-zinc-100" data-testid={`enquiry-archive-${e.id}`}><Archive className="h-3.5 w-3.5" />Archive</button>
      </div>
      <div className="mt-3 flex gap-2">
        <Textarea value={note} onChange={(ev) => setNote(ev.target.value)} rows={2} placeholder="Add a note (e.g. call back Friday)" className="text-sm" data-testid={`enquiry-note-${e.id}`} />
        <button disabled={note === (e.note ?? "")} onClick={() => onSave(e.id, { note })} className="h-fit rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white disabled:opacity-30" data-testid={`enquiry-note-save-${e.id}`}>Save</button>
      </div>
    </div>
  );
};

export const Enquiries = () => {
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState("all");
  const load = useCallback(async () => {
    try { const { data } = await api.get("/enquiries"); setItems(Array.isArray(data) ? data : []); } catch (e) { toast.error(errText(e)); setItems([]); }
  }, []);
  useEffect(() => { load(); }, [load]);
  const save = async (id, patch) => {
    try {
      const { data } = await api.patch(`/enquiries/${id}`, patch);
      setItems((xs) => (data?.status === "archived" ? xs.filter((x) => x.id !== id) : xs.map((x) => (x.id === id ? data : x))));
      toast.success("Updated");
    } catch (e) { toast.error(errText(e)); }
  };
  if (items === null) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-zinc-400" /></div>;
  const shown = items.filter((x) => filter === "all" || x.status === filter);
  return (
    <div className="space-y-4" data-testid="enquiries-panel">
      <div className="flex flex-wrap items-center gap-2">
        {[["all", "All"], ...STATUS].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className={`rounded-full px-4 py-2 text-sm ${filter === k ? "bg-zinc-900 text-white" : "bg-white text-zinc-600"}`} data-testid={`enquiries-filter-${k}`}>
            {l} <span className="opacity-60">{k === "all" ? items.length : items.filter((x) => x.status === k).length}</span>
          </button>
        ))}
        <button onClick={load} className="ml-auto flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900" data-testid="enquiries-refresh"><RefreshCw className="h-4 w-4" />Refresh</button>
      </div>
      {shown.length ? shown.map((e) => <Row key={e.id} e={e} onSave={save} />) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white py-16 text-zinc-500" data-testid="enquiries-empty"><Inbox className="h-8 w-8" />No enquiries here yet.</div>
      )}
    </div>
  );
};
