import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "../../data/content";
import { rich } from "./Motion";
import { useContent, list } from "../../lib/content";
import { asset } from "../../lib/api";
import { RoundCta } from "./Fx";

const ease = [0.22, 1, 0.36, 1];

const HeroLines = ({ lines }) => (
  <h1 className="font-display text-[15vw] font-semibold leading-[0.9] tracking-[-0.045em] text-[#ECE9E1] md:text-[9.5vw] lg:text-[8.4vw]" data-testid="hero-headline">
    {lines.map((l, i) => (
      <span key={i} className={`block overflow-hidden pb-[0.06em] ${i === lines.length - 1 && i > 0 ? "pl-[14vw] md:pl-[22vw]" : ""}`}>
        <motion.span className="block" initial={{ y: "108%" }} animate={{ y: "0%" }} transition={{ duration: 1.6, delay: 0.35 + i * 0.16, ease }}>
          {rich(l, "font-serif-it font-normal italic text-[#D8C3A5]")}
        </motion.span>
      </span>
    ))}
  </h1>
);

const fade = (delay) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.3, delay, ease } });

export const Hero = ({ onBook }) => {
  const h = useContent("hero");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const textO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#130C08]" data-testid="hero-section">
      <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 3.2, ease }} className="absolute inset-0">
        <motion.img src={asset(h.image) || IMG.hero} alt="Interior by POIESIZ" style={{ y: imgY, scale: 1.1 }} className="absolute inset-0 h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[#130C08]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#130C08]/85 via-[#130C08]/10 to-[#130C08]/30" />
      <motion.div style={{ y: textY, opacity: textO }} className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-6 md:px-10 md:pb-10">
        <motion.p {...fade(0.2)} className="mb-5 font-mono text-xs lowercase tracking-[0.14em] text-[#D8C3A5]" data-testid="hero-eyebrow">[{h.eyebrow}]</motion.p>
        <HeroLines lines={list(h.lines)} />
        <div className="relative mt-8 grid gap-6 pt-6 md:grid-cols-12 md:items-start">
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.8, delay: 1, ease }} className="absolute inset-x-0 top-0 h-px origin-left bg-[#ECE9E1]/35" />
          <motion.a {...fade(1.3)} href="#process" className="hidden items-center gap-3 font-mono text-xs lowercase tracking-[0.14em] text-[#ECE9E1]/80 md:col-span-3 md:flex" data-testid="hero-scroll-down">
            <span className="relative block h-8 w-px overflow-hidden bg-[#ECE9E1]/25"><span className="scroll-tick absolute inset-x-0 top-0 h-1/2 bg-[#ECE9E1]" /></span>[scroll down]
          </motion.a>
          <motion.div {...fade(1.45)} className="md:col-span-5">
            <p className="max-w-md text-sm leading-relaxed text-[#E9E4DA] md:text-base" data-testid="hero-sub">{h.sub}</p>
            {list(h.usps).length > 0 && <p className="mt-3 font-mono text-[11px] lowercase tracking-[0.12em] text-[#D8C3A5]">{list(h.usps).join("  ·  ")}</p>}
          </motion.div>
          <motion.div {...fade(1.6)} className="flex flex-wrap items-center gap-6 md:col-span-4 md:justify-end">
            <RoundCta dark onClick={onBook} testId="hero-quote-btn">Get a quote</RoundCta>
            <div className="flex gap-4 font-mono text-xs lowercase tracking-[0.12em] text-[#ECE9E1]/80">
              <a href="#process" className="link-line hover:text-[#ECE9E1]" data-testid="hero-link-process">our process</a>
              <a href="#projects" className="link-line hover:text-[#ECE9E1]" data-testid="hero-link-work">our work</a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
