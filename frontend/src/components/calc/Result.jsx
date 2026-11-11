import { motion } from "framer-motion";
import { TIERS, estimate, lakh } from "../../lib/pricing";
import { StepTitle } from "./Parts";

export const ResultStep = ({ s, onBook, setS }) => {
  const all = TIERS.map((t) => ({ ...t, est: estimate(s, t.mult) }));
  const cur = all.find((t) => t.key === s.tier) ?? all[1];
  const max = Math.max(...all.map((t) => t.est.high), 1);
  return (
    <div data-testid="calc-result-step">
      <StepTitle n={4} title="Your estimate is ready" sub={`${s.bhk} BHK · ${s.area.toLocaleString("en-IN")} sq ft · ${cur.label} finishes`} />
      <div className="rounded-[28px] bg-[#2D3B36] p-6 text-[#FBF9F5] md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A359]">Estimated range</p>
        <p className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-6xl" data-testid="calc-result-total">{cur.est.total ? `${lakh(cur.est.low)} – ${lakh(cur.est.high)}` : "₹0"}</p>
        <div className="mt-10 space-y-5">
          <p className="text-sm text-[#D9D3C7]">Same home, all three finish levels</p>
          {all.map((t, i) => (
            <button key={t.key} type="button" onClick={() => setS({ ...s, tier: t.key })} className="block w-full text-left" data-testid={`calc-compare-${t.key}`}>
              <div className="mb-2 flex justify-between text-sm"><span className={t.key === s.tier ? "text-white" : "text-[#BFB8AB]"}>{t.label}</span><span className="font-mono text-[#D9D3C7]">{lakh(t.est.low)} – {lakh(t.est.high)}</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(t.est.high / max) * 100}%` }} transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full rounded-full ${t.key === s.tier ? "bg-[#D4A359]" : "bg-white/30"}`} />
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button onClick={onBook} className="flex-1 rounded-full bg-[#C85A32] py-4 font-medium text-white transition-colors duration-300 hover:bg-[#B24C28]" data-testid="calc-result-book-btn">Get my exact, itemised quote</button>
      </div>
      <p className="mt-4 text-xs text-[#6E6B65]">Indicative range based on sample rates. Your designer confirms the final price after measuring your home.</p>
    </div>
  );
};
