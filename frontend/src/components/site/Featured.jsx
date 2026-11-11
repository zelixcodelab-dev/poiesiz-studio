import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Play } from "lucide-react";
import { IMG } from "../../data/content";
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
            <motion.img style={{ y, scale: 1.18 }} src={IMG.living3} alt="Featured home living room" className="h-full w-full object-cover" />
            <button className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-[#FBF9F5] py-2 pl-2 pr-5 text-sm font-medium text-[#1A1918] transition-colors duration-300 hover:bg-[#C85A32] hover:text-white" data-testid="featured-video-btn">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C85A32] text-white"><Play className="h-4 w-4 fill-current" /></span>Video tour
            </button>
          </motion.div>
        </div>
        <Reveal delay={0.1} className="space-y-6 lg:col-span-5">
          <Eyebrow>Featured project · Sample story</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1A1918] sm:text-4xl">The Iyer family's 3 BHK</h2>
          <Quote className="h-8 w-8 text-[#D4A359]" />
          <p className="font-serif-it text-2xl italic leading-snug text-[#1A1918] md:text-[1.75rem]" data-testid="featured-quote">
            We wanted a home that felt like our grandparents' house, minus the clutter. They gave us the courtyard feeling in a city apartment.
          </p>
          <div className="flex gap-10 border-t border-[#E5DEC9] pt-6">
            {[["Bengaluru", "City"], ["Indian Contemporary", "Style"], ["11 weeks", "Timeline"]].map(([v, k]) => (
              <div key={k}><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6E6B65]">{k}</p><p className="mt-1 text-sm font-medium text-[#1A1918]">{v}</p></div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
