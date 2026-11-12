import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, ReceiptText, ShieldCheck } from "lucide-react";
import { IMG, USPS } from "../../data/content";
import { MaskLines, rich } from "./Motion";
import { useContent, list } from "../../lib/content";
import { asset } from "../../lib/api";
import { ConsultForm } from "./ConsultForm";

const ICONS = [Sparkles, ReceiptText, ShieldCheck];

export const Hero = () => {
  const h = useContent("hero");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-[#121212]" data-testid="hero-section">
      <motion.img src={asset(h.image) || IMG.hero} alt="Interior by POIESIZ" style={{ y: imgY, scale: imgScale }} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#121212]/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 pb-16 pt-32 md:px-10 lg:grid-cols-12 lg:items-end lg:pb-24 lg:pt-40">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.1 }} className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[#FEBD1C]">{h.eyebrow}</motion.p>
          <MaskLines testId="hero-headline" className="font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-[#FBF9F5] sm:text-6xl lg:text-[5.4rem]"
            lines={list(h.lines).map((l) => rich(l, "font-serif-it font-normal italic text-[#FEBD1C]"))} />
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }} className="mt-8 max-w-lg text-base text-[#E9E4DA] md:text-lg">
            {h.sub}
          </motion.p>
          <div className="mt-10 flex flex-wrap gap-3">
            {list(h.usps).map((u, i) => {
              const I = ICONS[i % ICONS.length];
              return (
                <motion.span key={u} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-[#FBF9F5] backdrop-blur-md" data-testid={`hero-usp-${i}`}>
                  <I className="h-4 w-4 text-[#FEBD1C]" /> {u}
                </motion.span>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-5" style={{ perspective: 1200 }}>
          <motion.div id="consult" onMouseMove={tilt} onMouseLeave={() => { rx.set(0); ry.set(0); }} style={{ rotateX: rx, rotateY: ry }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] bg-[#FBF9F5] p-6 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] md:p-8" data-testid="hero-form-card">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A6200]">Free · No obligation</p>
            <h2 className="mb-5 mt-2 font-display text-2xl font-semibold text-[#1A1918]">{h.formTitle}</h2>
            <ConsultForm id="hero" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
