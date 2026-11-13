import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Calculator } from "lucide-react";
import { Reveal, Eyebrow } from "./Motion";

const TIERS = { Economy: 1, Premium: 1.6, Luxury: 2.5 };
const ROOMS = [
  { key: "living", label: "Living room", base: 1.1 },
  { key: "kitchen", label: "Modular kitchen", base: 1.5 },
  { key: "master", label: "Master bedroom", base: 1.0 },
  { key: "bedrooms", label: "Other bedrooms", base: 0.8, perBed: true },
  { key: "dining", label: "Dining area", base: 0.5 },
];
const fmt = (v) => `₹${v.toFixed(1)}L`;

const Pill = ({ active, onClick, children, testId }) => (
  <button type="button" onClick={onClick} data-testid={testId}
    className={`h-11 rounded-full border px-5 text-sm transition-colors duration-300 ${active ? "border-[#ECE9E1] bg-[#ECE9E1] text-[#130C08]" : "border-white/25 text-[#ECE9E1] hover:border-white/60"}`}>{children}</button>
);

export const Estimator = ({ onBook }) => {
  const [bhk, setBhk] = useState(2);
  const [tier, setTier] = useState("Premium");
  const [sel, setSel] = useState({ living: true, kitchen: true, master: true, bedrooms: true, dining: false });

  const lines = useMemo(() => ROOMS.filter((r) => sel[r.key]).map((r) => {
    const qty = r.perBed ? Math.max(bhk - 1, 0) : 1;
    return { ...r, qty, cost: r.base * qty * TIERS[tier] * (1 + (bhk - 1) * 0.08) };
  }).filter((l) => l.qty > 0), [bhk, tier, sel]);
  const total = lines.reduce((s, l) => s + l.cost, 0);

  return (
    <section id="estimator" className="bg-[#50321F] py-20 md:py-32" data-testid="estimator-section">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-10 lg:grid-cols-12">
        <Reveal className="space-y-8 lg:col-span-7">
          <Eyebrow light>02 — Free cost estimator</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[#ECE9E1] sm:text-4xl lg:text-5xl">How much will your <span className="font-serif-it font-normal italic text-[#D8C3A5]">interiors</span> cost?</h2>
          <p className="max-w-xl text-[#D9D3C7] md:text-lg">Pick your home size, a finish level and the rooms you want done. The estimate updates as you go.</p>
          <div className="space-y-3"><p className="text-sm text-[#BFB8AB]">Home size</p>
            <div className="flex flex-wrap gap-2">{[1, 2, 3, 4].map((b) => <Pill key={b} active={bhk === b} onClick={() => setBhk(b)} testId={`estimator-bhk-${b}`}>{b} BHK</Pill>)}</div></div>
          <div className="space-y-3"><p className="text-sm text-[#BFB8AB]">Finish level</p>
            <div className="flex flex-wrap gap-2">{Object.keys(TIERS).map((t) => <Pill key={t} active={tier === t} onClick={() => setTier(t)} testId={`estimator-tier-${t.toLowerCase()}`}>{t}</Pill>)}</div></div>
          <div className="space-y-3"><p className="text-sm text-[#BFB8AB]">Rooms to design</p>
            <div className="grid gap-2 sm:grid-cols-2">{ROOMS.map((r) => (
              <button key={r.key} type="button" onClick={() => setSel({ ...sel, [r.key]: !sel[r.key] })} data-testid={`estimator-room-${r.key}`}
                className={`flex h-12 items-center gap-3 rounded-xl border px-4 text-left text-sm transition-colors duration-300 ${sel[r.key] ? "border-[#FEBD1C] bg-[#FEBD1C]/10 text-[#ECE9E1]" : "border-white/15 text-[#D9D3C7] hover:border-white/40"}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-md border ${sel[r.key] ? "border-[#FEBD1C] bg-[#FEBD1C]" : "border-white/40"}`}>{sel[r.key] && <Check className="h-3.5 w-3.5 text-[#130C08]" />}</span>{r.label}
              </button>))}</div></div>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-5">
          <div className="sticky top-28 rounded-[28px] bg-[#ECE9E1] p-6 md:p-8" data-testid="estimator-result-card">
            <div className="flex items-center gap-2 text-[#50321F]"><Calculator className="h-4 w-4" /><span className="font-mono text-xs uppercase tracking-[0.2em]">Your estimate</span></div>
            <motion.p key={total.toFixed(1)} initial={{ opacity: 0.3, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-display text-4xl font-semibold tracking-tight text-[#130C08] md:text-5xl" data-testid="estimator-total">
              {total ? `${fmt(total * 0.88)} – ${fmt(total * 1.12)}` : "₹0"}
            </motion.p>
            <p className="mt-1 text-sm text-[#6A5647]">{bhk} BHK · {tier} finishes</p>
            <ul className="mt-6 divide-y divide-[#CFC8BA] border-y border-[#CFC8BA]" data-testid="estimator-breakdown">
              {lines.length ? lines.map((l) => (
                <li key={l.key} className="flex justify-between py-3 text-sm"><span className="text-[#130C08]">{l.label}{l.qty > 1 ? ` × ${l.qty}` : ""}</span><span className="font-mono text-[#6A5647]">{fmt(l.cost)}</span></li>
              )) : <li className="py-3 text-sm text-[#6A5647]">Select at least one room.</li>}
            </ul>
            <p className="mt-4 text-xs text-[#6A5647]">Indicative range only. Your designer shares an exact, itemised quote after measuring your home.</p>
            <button onClick={onBook} className="mt-6 w-full rounded-full bg-[#FEBD1C] py-3.5 font-medium text-white transition-colors duration-300 hover:bg-[#F0AC00]" data-testid="estimator-cta-btn">Get My Exact Quote</button>
            <Link to="/price-calculator" className="mt-3 block text-center text-sm font-medium text-[#50321F] underline-offset-4 hover:underline" data-testid="estimator-full-calc-link">Open the detailed price calculator →</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
