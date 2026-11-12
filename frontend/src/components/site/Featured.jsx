import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, Eyebrow } from "./Motion";

export const Featured = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(scrollYProgress, [0, 0.45], ["inset(12% 10% 12% 10% round 28px)", "inset(0% 0% 0% 0% round 28px)"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} className="relative py-20 md:py-32" data-testid="featured-section">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:px-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <motion.div style={{ clipPath: clip }} className="relative aspect-[4/3] overflow-hidden">
            <motion.img style={{ y, scale: 1.18 }} src="/projects/chai-entrance.jpg" alt="Chai Bazaar plantation store entrance" className="h-full w-full object-cover" />
          </motion.div>
        </div>
        <Reveal delay={0.1} className="space-y-6 lg:col-span-5">
          <Eyebrow>Featured project · Recently completed</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1A1918] sm:text-4xl">Chai Bazaar, <span className="font-serif-it font-normal italic">The Plantation Store</span></h2>
          <p className="text-lg leading-relaxed text-[#6E6B65]" data-testid="featured-desc">
            Recently completed retail shop for Kannan Devan Hills Plantations at the Munnar Tea Museum, Mattupetty Tea Factory.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <img src="/projects/chai-interior-1.jpg" alt="Chai Bazaar interior" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <img src="/projects/chai-interior-4.jpg" alt="Chai Bazaar shelving" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          </div>
          <div className="flex gap-10 border-t border-[#E5DEC9] pt-6">
            {[["Munnar", "Location"], ["Retail shop", "Type"], ["Kannan Devan", "Client"]].map(([v, k]) => (
              <div key={k}><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6E6B65]">{k}</p><p className="mt-1 text-sm font-medium text-[#1A1918]">{v}</p></div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
