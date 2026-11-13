import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { estimate } from "../lib/pricing";
import { usePricing } from "../lib/usePricing";
import { HomeStep, RoomsStep, FinishStep } from "../components/calc/Steps";
import { ResultStep } from "../components/calc/Result";
import { Summary } from "../components/calc/Summary";
import { MaskLines } from "../components/site/Motion";

const LABELS = ["Home", "Rooms", "Finish", "Estimate"];
const initial = () => ({ bhk: 2, area: 1050, rooms: { living: 1, kitchen: 1, master: 1, bedroom: 1, dining: 1, bath: 2, pooja: 1, study: 0 }, shape: "l", tier: "premium", addons: { ceiling: true, painting: true, lighting: false, electrical: false } });

export default function PriceCalculator({ onBook }) {
  const [step, setStep] = useState(0);
  const [s, setS] = useState(initial);
  const { TIERS, cfg } = usePricing();
  const tier = TIERS.find((t) => t.key === s.tier) ?? TIERS[0] ?? { label: "", mult: 1 };
  const est = estimate(s, tier.mult, cfg);

  useEffect(() => { document.title = "Interior Price Calculator | POIESIZ Interiors"; return () => { document.title = "POIESIZ Interiors | Modern & Custom Interiors, Kochi"; }; }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  const Body = [HomeStep, RoomsStep, FinishStep][step];
  return (
    <section className="min-h-screen bg-[#ECE9E1] pb-24 pt-28 md:pt-36" data-testid="price-calculator-page">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#50321F]">Free price calculator</p>
        <MaskLines as="h1" testId="calc-headline" className="mt-4 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-[#130C08] sm:text-5xl lg:text-6xl"
          lines={["Price your home,", <>room by <span className="font-serif-it font-normal italic text-[#50321F]">room.</span></>]} />
        <div className="mt-10 grid grid-cols-4 gap-2" data-testid="calc-progress">
          {LABELS.map((l, i) => (
            <button key={l} type="button" onClick={() => setStep(i)} className="text-left" data-testid={`calc-progress-${i}`}>
              <div className="h-1 overflow-hidden rounded-full bg-[#CFC8BA]"><motion.div animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.6 }} className="h-full bg-[#FEBD1C]" /></div>
              <p className={`mt-2 text-xs sm:text-sm ${i === step ? "font-medium text-[#130C08]" : "text-[#6A5647]"}`}>{l}</p>
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-8">
            {step < 3 ? <Body s={s} setS={setS} /> : <ResultStep s={s} setS={setS} onBook={onBook} />}
            <div className="mt-10 flex items-center justify-between gap-3">
              {step > 0 ? <button onClick={() => setStep(step - 1)} className="flex h-12 items-center gap-2 rounded-full border border-[#130C08] px-5 text-sm font-medium text-[#130C08] transition-colors duration-300 hover:bg-[#130C08] hover:text-white" data-testid="calc-back-btn"><ArrowLeft className="h-4 w-4" />Back</button>
                : <span />}
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} disabled={step === 1 && !est.total} className="group flex h-12 items-center gap-2 rounded-full bg-[#FEBD1C] px-6 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#F0AC00] disabled:opacity-40" data-testid="calc-next-btn">
                  {step === 2 ? "See my estimate" : "Continue"}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              ) : (
                <button onClick={() => { setS(initial()); setStep(0); }} className="flex h-12 items-center gap-2 text-sm font-medium text-[#6A5647] transition-colors duration-300 hover:text-[#50321F]" data-testid="calc-restart-btn"><RotateCcw className="h-4 w-4" />Start over</button>
              )}
            </div>
          </motion.div>
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28"><Summary est={est} label={`${s.bhk} BHK · ${tier.label}`} /></div>
          </aside>
        </div>
      </div>
    </section>
  );
}
