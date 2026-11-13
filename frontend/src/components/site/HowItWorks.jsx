import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Reveal } from "./Motion";
import { useContent, list } from "../../lib/content";
import { asset } from "../../lib/api";

const FALLBACK = ["/projects/thrissur-courtyard.jpg", "/projects/vinod-dining.jpg", "/projects/ongoing-site.jpg", "/projects/indrajith-1.jpg"];
const ease = [0.76, 0, 0.24, 1];
const n2 = (i) => String(i + 1).padStart(2, "0");
const imgOf = (s, i) => asset(s.img) || FALLBACK[i % FALLBACK.length];

const StepText = ({ s, i }) => (
  <>
    <h3 className="font-display text-2xl font-semibold tracking-tight text-[#ECE9E1] md:text-4xl">{n2(i)} – {s.title}</h3>
    <p className="mt-3 max-w-lg text-sm text-[#E9E4DA] md:text-base">{s.text}</p>
    {s.outcome && <p className="mt-4 font-mono text-xs lowercase tracking-[0.12em] text-[#D8C3A5]">[outcome] {s.outcome}</p>}
  </>
);

const Sticky = ({ d, S }) => {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(S.length - 1, Math.max(0, Math.floor(v * S.length)))));
  return (
    <div ref={ref} className="relative hidden md:block" style={{ height: `${S.length * 90 + 10}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-12 gap-10 px-10 pt-16">
          <div className="col-span-5 flex flex-col">
            <Eyebrow>{d.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-[#130C08] lg:text-7xl" data-testid="how-title">{d.title}</h2>
            <div className="mt-8 h-px w-full bg-[#CFC8BA]"><motion.div style={{ width: bar }} className="h-px bg-[#130C08]" /></div>
            <p className="mt-4 font-mono text-xs lowercase tracking-[0.14em] text-[#6A5647]">[keep scrolling]</p>
            <ol className="mt-10 space-y-3">
              {S.map((s, k) => (
                <li key={s.title} className={`flex items-baseline gap-4 font-display text-lg transition-[opacity,transform] duration-700 ${k === i ? "translate-x-2 opacity-100" : "opacity-35"}`} data-testid={`how-step-${k}`}>
                  <span className="font-mono text-xs">{n2(k)}</span>{s.title}
                </li>
              ))}
            </ol>
          </div>
          <div className="relative col-span-7 h-[74vh] overflow-hidden rounded-[24px] bg-[#130C08]" data-testid="how-frame">
            {S.map((s, k) => (
              <motion.img key={k} src={imgOf(s, k)} alt={s.title} initial={false}
                animate={{ clipPath: k <= i ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)", scale: k === i ? 1 : 1.12 }}
                transition={{ duration: 1.4, ease }} className="absolute inset-0 h-full w-full object-cover" />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#130C08]/85 via-[#130C08]/10 to-transparent" />
            <span className="absolute right-6 top-6 font-mono text-xs text-[#ECE9E1]/80" data-testid="how-counter">{n2(i)} / {n2(S.length - 1)}</span>
            <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                  <StepText s={S[i]} i={i} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stacked = ({ d, S }) => (
  <div className="px-5 py-20 md:hidden">
    <Eyebrow>{d.eyebrow}</Eyebrow>
    <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-[#130C08]">{d.title}</h2>
    <div className="mt-10 space-y-5">
      {S.map((s, k) => (
        <Reveal key={s.title} className="reveal-img relative h-[70vh] overflow-hidden rounded-[22px]">
          <img src={imgOf(s, k)} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#130C08]/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6" data-testid={`how-mobile-step-${k}`}><StepText s={s} i={k} /></div>
        </Reveal>
      ))}
    </div>
  </div>
);

export const HowItWorks = () => {
  const d = useContent("steps");
  const S = list(d.items);
  if (!S.length) return null;
  return (
    <section id="process" data-testid="how-section">
      <Sticky d={d} S={S} />
      <Stacked d={d} S={S} />
    </section>
  );
};
