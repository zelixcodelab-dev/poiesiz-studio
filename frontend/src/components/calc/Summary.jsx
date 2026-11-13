import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { lakh } from "../../lib/pricing";

export const Summary = ({ est, label }) => (
  <div className="rounded-[24px] border border-[#CFC8BA] bg-white p-6" data-testid="calc-summary">
    <div className="flex items-center gap-2 text-[#50321F]"><Calculator className="h-4 w-4" /><span className="font-mono text-xs uppercase tracking-[0.2em]">Live estimate</span></div>
    <motion.p key={est.total.toFixed(2)} initial={{ opacity: 0.3, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#130C08]" data-testid="calc-summary-total">
      {est.total ? `${lakh(est.low)} – ${lakh(est.high)}` : "₹0"}
    </motion.p>
    <p className="mt-1 text-sm text-[#6A5647]">{label}</p>
    <ul className="mt-5 max-h-[320px] divide-y divide-[#CFC8BA] overflow-y-auto border-t border-[#CFC8BA]" data-lenis-prevent>
      {est.lines.length ? est.lines.map((l) => (
        <li key={l.key} className="flex justify-between gap-3 py-2.5 text-sm"><span className="text-[#130C08]">{l.label}{l.qty > 1 ? ` × ${l.qty}` : ""}</span><span className="font-mono text-[#6A5647]">{lakh(l.cost)}</span></li>
      )) : <li className="py-3 text-sm text-[#6A5647]">Add at least one room.</li>}
    </ul>
  </div>
);
