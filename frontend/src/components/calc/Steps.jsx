import { Slider } from "../ui/slider";
import { Check } from "lucide-react";
import { ROOM_ITEMS, KITCHEN_SHAPES, ADDONS, TIERS, BHK_DEFAULTS } from "../../lib/pricing";
import { Choice, Stepper, Toggle, StepTitle } from "./Parts";

export const HomeStep = ({ s, setS }) => (
  <div>
    <StepTitle n={1} title="Tell us about your home" sub="Pick the size. We'll pre-fill the rooms a home like yours usually has." />
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[1, 2, 3, 4].map((b) => (
        <Choice key={b} active={s.bhk === b} onClick={() => setS({ ...s, bhk: b, area: BHK_DEFAULTS[b].area, rooms: { ...BHK_DEFAULTS[b].rooms } })} testId={`calc-bhk-${b}`} className="p-5">
          <p className="font-display text-3xl font-semibold text-[#1A1918]">{b}</p>
          <p className="text-sm text-[#6E6B65]">BHK</p>
        </Choice>
      ))}
    </div>
    <div className="mt-10 rounded-2xl border border-[#E5DEC9] bg-white p-6">
      <div className="flex items-end justify-between">
        <p className="font-medium text-[#1A1918]">Carpet area</p>
        <p className="font-mono text-lg text-[#8A6200]" data-testid="calc-area-value">{s.area.toLocaleString("en-IN")} sq ft</p>
      </div>
      <Slider className="mt-6" min={400} max={3500} step={50} value={[s.area]} onValueChange={([v]) => setS({ ...s, area: v })} data-testid="calc-area-slider" />
      <div className="mt-3 flex justify-between text-xs text-[#6E6B65]"><span>400</span><span>3,500</span></div>
    </div>
  </div>
);

export const RoomsStep = ({ s, setS }) => (
  <div>
    <StepTitle n={2} title="Choose the rooms" sub="Add or remove anything. The live estimate updates as you go." />
    <div className="grid gap-3 md:grid-cols-2">
      {ROOM_ITEMS.map((r) => <Stepper key={r.key} item={r} value={s.rooms[r.key]} onChange={(v) => setS({ ...s, rooms: { ...s.rooms, [r.key]: v } })} />)}
    </div>
    {s.rooms.kitchen > 0 && (
      <div className="mt-10">
        <p className="mb-3 font-medium text-[#1A1918]">Kitchen layout</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {KITCHEN_SHAPES.map((k) => <Choice key={k.key} active={s.shape === k.key} onClick={() => setS({ ...s, shape: k.key })} testId={`calc-shape-${k.key}`} className="p-4 text-sm font-medium text-[#1A1918]">{k.label}</Choice>)}
        </div>
      </div>
    )}
    <div className="mt-10">
      <p className="mb-3 font-medium text-[#1A1918]">Add-ons</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {ADDONS.map((a) => <Toggle key={a.key} on={s.addons[a.key]} label={a.label} onClick={() => setS({ ...s, addons: { ...s.addons, [a.key]: !s.addons[a.key] } })} testId={`calc-addon-${a.key}`} />)}
      </div>
    </div>
  </div>
);

export const FinishStep = ({ s, setS }) => (
  <div>
    <StepTitle n={3} title="Pick a finish level" sub="This sets the materials, hardware and warranty for everything you chose." />
    <div className="grid gap-4 lg:grid-cols-3">
      {TIERS.map((t) => (
        <Choice key={t.key} active={s.tier === t.key} onClick={() => setS({ ...s, tier: t.key })} testId={`calc-tier-${t.key}`} className="flex flex-col p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A6200]">{t.note}</p>
          <p className="mt-2 font-display text-2xl font-semibold text-[#1A1918]">{t.label}</p>
          <ul className="mt-5 space-y-2.5">
            {t.features.map((f) => <li key={f} className="flex gap-2 text-sm text-[#6E6B65]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5E7A4C]" />{f}</li>)}
          </ul>
        </Choice>
      ))}
    </div>
  </div>
);
