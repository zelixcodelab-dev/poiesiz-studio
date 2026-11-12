import { useRef, useState } from "react";
import { toast } from "sonner";
import { ArrowUp, ArrowDown, Trash2, Plus, Upload, Loader2, Eye, EyeOff, ChevronDown } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { api, asset, errText } from "../lib/api";
import { SECTION_LABELS } from "../data/defaults";

const arr = (v) => (Array.isArray(v) ? v : []);
const move = (a, i, d) => { const b = [...a]; const j = i + d; if (j < 0 || j >= b.length) return b; [b[i], b[j]] = [b[j], b[i]]; return b; };
const iconBtn = "flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-100 disabled:opacity-30";

const RowTools = ({ i, n, onMove, onRemove, tid }) => (
  <div className="flex shrink-0 gap-1">
    <button type="button" className={iconBtn} disabled={i === 0} onClick={() => onMove(i, -1)} aria-label="Move up" data-testid={`${tid}-up-${i}`}><ArrowUp className="h-3.5 w-3.5" /></button>
    <button type="button" className={iconBtn} disabled={i === n - 1} onClick={() => onMove(i, 1)} aria-label="Move down" data-testid={`${tid}-down-${i}`}><ArrowDown className="h-3.5 w-3.5" /></button>
    {onRemove && <button type="button" className={`${iconBtn} hover:text-red-600`} onClick={() => onRemove(i)} aria-label="Remove" data-testid={`${tid}-remove-${i}`}><Trash2 className="h-3.5 w-3.5" /></button>}
  </div>
);

export const ImageField = ({ value, onChange, tid }) => {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const pick = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const { data } = await api.post("/upload", fd);
      onChange(data?.url ?? "");
      toast.success("Photo uploaded. Remember to save.");
    } catch (err) {
      toast.error(errText(err));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="flex items-center gap-3" data-testid={tid}>
      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
        {value ? <img src={asset(value)} alt="" className="h-full w-full object-cover" /> : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="Image URL or upload" className="h-9 text-xs" data-testid={`${tid}-url`} />
        <button type="button" onClick={() => ref.current?.click()} disabled={busy} className="flex h-8 w-fit items-center gap-2 rounded-lg bg-zinc-900 px-3 text-xs font-medium text-white hover:bg-zinc-700 disabled:opacity-60" data-testid={`${tid}-upload-btn`}>
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}{busy ? "Uploading…" : "Upload photo"}
        </button>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={pick} />
      </div>
    </div>
  );
};

const Strings = ({ value, onChange, tid, images }) => {
  const a = arr(value);
  const set = (i, v) => onChange(a.map((x, k) => (k === i ? v : x)));
  return (
    <div className="space-y-2">
      {a.map((v, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex-1">{images ? <ImageField value={v} onChange={(nv) => set(i, nv)} tid={`${tid}-${i}`} /> : <Input value={v ?? ""} onChange={(e) => set(i, e.target.value)} className="h-9" data-testid={`${tid}-${i}`} />}</div>
          <RowTools i={i} n={a.length} tid={tid} onMove={(x, d) => onChange(move(a, x, d))} onRemove={(x) => onChange(a.filter((_, k) => k !== x))} />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...a, ""])} className="flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:underline" data-testid={`${tid}-add`}><Plus className="h-3.5 w-3.5" />Add {images ? "photo" : "item"}</button>
    </div>
  );
};

const ListField = ({ field, value, onChange, tid }) => {
  const a = arr(value);
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-2">
      {a.map((item, i) => (
        <div key={i} className="rounded-xl border border-zinc-200 bg-zinc-50" data-testid={`${tid}-item-${i}`}>
          <div className="flex items-center gap-2 p-2 pl-3">
            <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex min-w-0 flex-1 items-center gap-2 text-left text-sm font-medium text-zinc-800" data-testid={`${tid}-toggle-${i}`}>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              <span className="truncate">{item?.[field.itemLabel] || `Item ${i + 1}`}</span>
            </button>
            <RowTools i={i} n={a.length} tid={tid} onMove={(x, d) => onChange(move(a, x, d))} onRemove={(x) => onChange(a.filter((_, k) => k !== x))} />
          </div>
          {open === i && (
            <div className="space-y-4 border-t border-zinc-200 bg-white p-4">
              <Fields fields={field.fields} value={item ?? {}} onChange={(nv) => onChange(a.map((x, k) => (k === i ? nv : x)))} tid={`${tid}-${i}`} />
            </div>
          )}
        </div>
      ))}
      <button type="button" onClick={() => { onChange([...a, {}]); setOpen(a.length); }} className="flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:underline" data-testid={`${tid}-add`}><Plus className="h-3.5 w-3.5" />Add new</button>
    </div>
  );
};

const SectionsField = ({ value, onChange, tid }) => {
  const saved = arr(value).filter((s) => SECTION_LABELS[s?.id]);
  const a = [...saved, ...Object.keys(SECTION_LABELS).filter((id) => !saved.some((s) => s.id === id)).map((id) => ({ id, visible: true }))];
  return (
    <div className="space-y-2">
      <div className="rounded-xl border border-dashed border-zinc-300 px-3 py-2 text-xs text-zinc-500">Hero banner always shows first.</div>
      {a.map((s, i) => (
        <div key={s.id} className={`flex items-center gap-3 rounded-xl border p-2 pl-3 ${s.visible === false ? "border-zinc-200 bg-zinc-50 text-zinc-400" : "border-zinc-200 bg-white text-zinc-800"}`} data-testid={`${tid}-${s.id}`}>
          <span className="flex-1 text-sm font-medium">{SECTION_LABELS[s.id]}</span>
          <button type="button" onClick={() => onChange(a.map((x, k) => (k === i ? { ...x, visible: x.visible === false } : x)))} className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium ${s.visible === false ? "bg-zinc-200 text-zinc-600" : "bg-amber-100 text-amber-800"}`} data-testid={`${tid}-${s.id}-visibility`}>
            {s.visible === false ? <><EyeOff className="h-3.5 w-3.5" />Hidden</> : <><Eye className="h-3.5 w-3.5" />Shown</>}
          </button>
          <RowTools i={i} n={a.length} tid={tid} onMove={(x, d) => onChange(move(a, x, d))} />
        </div>
      ))}
    </div>
  );
};

export const Fields = ({ fields, value, onChange, tid }) => (
  <>
    {fields.map((f) => {
      const v = value?.[f.name];
      const set = (nv) => onChange({ ...value, [f.name]: nv });
      const id = `${tid}-${f.name}`;
      return (
        <div key={f.name} className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{f.label}</label>
          {f.type === "text" && <Input value={v ?? ""} onChange={(e) => set(e.target.value)} data-testid={id} />}
          {f.type === "textarea" && <Textarea value={v ?? ""} onChange={(e) => set(e.target.value)} rows={3} data-testid={id} />}
          {f.type === "image" && <ImageField value={v} onChange={set} tid={id} />}
          {f.type === "strings" && <Strings value={v} onChange={set} tid={id} />}
          {f.type === "images" && <Strings value={v} onChange={set} tid={id} images />}
          {f.type === "list" && <ListField field={f} value={v} onChange={set} tid={id} />}
          {f.type === "sections" && <SectionsField value={v} onChange={set} tid={id} />}
        </div>
      );
    })}
  </>
);
