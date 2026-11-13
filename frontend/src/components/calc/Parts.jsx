import { Minus, Plus, Check } from "lucide-react";

export const Choice = ({ active, onClick, children, testId, className = "" }) => (
  <button type="button" onClick={onClick} data-testid={testId}
    className={`rounded-2xl border text-left transition-colors duration-300 ${active ? "border-[#E0A100] bg-[#FEBD1C]/[0.12] ring-1 ring-[#E0A100]" : "border-[#CFC8BA] bg-white hover:border-[#130C08]/40"} ${className}`}>
    {children}
  </button>
);

export const Stepper = ({ item, value, onChange }) => (
  <div className={`flex items-center justify-between gap-4 rounded-2xl border p-4 transition-colors duration-300 ${value ? "border-[#E0A100]/50 bg-white" : "border-[#CFC8BA] bg-white/60"}`} data-testid={`calc-room-${item.key}`}>
    <div className="min-w-0">
      <p className="font-medium text-[#130C08]">{item.label}</p>
      <p className="truncate text-sm text-[#6A5647]">{item.hint}</p>
    </div>
    <div className="flex shrink-0 items-center gap-2">
      <button type="button" aria-label={`Fewer ${item.label}`} onClick={() => onChange(Math.max(0, value - 1))} disabled={!value} data-testid={`calc-room-${item.key}-minus`}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#CFC8BA] text-[#130C08] transition-colors duration-300 hover:bg-[#130C08] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#130C08]"><Minus className="h-4 w-4" /></button>
      <span className="w-6 text-center font-mono text-[#130C08]" data-testid={`calc-room-${item.key}-count`}>{value}</span>
      <button type="button" aria-label={`More ${item.label}`} onClick={() => onChange(Math.min(item.max, value + 1))} disabled={value >= item.max} data-testid={`calc-room-${item.key}-plus`}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#CFC8BA] text-[#130C08] transition-colors duration-300 hover:bg-[#130C08] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#130C08]"><Plus className="h-4 w-4" /></button>
    </div>
  </div>
);

export const Toggle = ({ on, onClick, label, testId }) => (
  <button type="button" onClick={onClick} data-testid={testId}
    className={`flex h-12 items-center gap-3 rounded-xl border px-4 text-left text-sm transition-colors duration-300 ${on ? "border-[#E0A100] bg-[#FEBD1C]/[0.12] text-[#130C08]" : "border-[#CFC8BA] bg-white text-[#6A5647] hover:border-[#130C08]/40"}`}>
    <span className={`flex h-5 w-5 items-center justify-center rounded-md border ${on ? "border-[#FEBD1C] bg-[#FEBD1C]" : "border-[#BFB8AB]"}`}>{on && <Check className="h-3.5 w-3.5 text-[#111111]" />}</span>{label}
  </button>
);

export const StepTitle = ({ n, title, sub }) => (
  <div className="mb-8">
    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#E0A100]">Step {n} of 4</p>
    <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#130C08] sm:text-4xl">{title}</h2>
    {sub && <p className="mt-3 text-[#6A5647]">{sub}</p>}
  </div>
);
