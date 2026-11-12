import { motion } from "framer-motion";
import { SectionHead } from "./Motion";
import { useContent, list } from "../../lib/content";

export const HowItWorks = () => {
  const d = useContent("steps");
  const STEPS = list(d.items);
  return (
  <section className="py-20 md:py-32" data-testid="how-section">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <SectionHead eyebrow={d.eyebrow} title={d.title} />
      <div className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-[#FEBD1C] md:block" />
        {STEPS.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0.001, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }} className="relative" data-testid={`how-step-${i}`}>
            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#FEBD1C] font-mono text-sm text-white ring-8 ring-[#FBF9F5]">0{i + 1}</span>
            <h3 className="mt-6 font-display text-xl font-semibold text-[#1A1918]">{s.title}</h3>
            <p className="mt-2 text-[#6E6B65]">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};
