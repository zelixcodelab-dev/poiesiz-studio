import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, Eyebrow } from "./Motion";
import { useContent, list } from "../../lib/content";
import { asset } from "../../lib/api";

export const Featured = () => {
  const f = useContent("featured");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(scrollYProgress, [0, 0.45], ["inset(12% 10% 12% 10% round 28px)", "inset(0% 0% 0% 0% round 28px)"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} className="relative py-20 md:py-32" data-testid="featured-section">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:px-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <motion.div style={{ clipPath: clip }} className="relative aspect-[4/3] overflow-hidden">
            <motion.img style={{ y, scale: 1.18 }} src={asset(f.image)} alt={f.title} className="h-full w-full object-cover" />
          </motion.div>
        </div>
        <Reveal delay={0.1} className="space-y-6 lg:col-span-5">
          <Eyebrow>{f.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1A1918] sm:text-4xl">{f.title} <span className="font-serif-it font-normal italic">{f.titleAccent}</span></h2>
          <p className="text-lg leading-relaxed text-[#6E6B65]" data-testid="featured-desc">{f.text}</p>
          <div className="grid grid-cols-2 gap-3">
            {[f.image2, f.image3].filter(Boolean).map((src, i) => <img key={i} src={asset(src)} alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" />)}
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-[#E5DEC9] pt-6">
            {list(f.facts).map((x, i) => (
              <div key={i}><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6E6B65]">{x.label}</p><p className="mt-1 text-sm font-medium text-[#1A1918]">{x.value}</p></div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
