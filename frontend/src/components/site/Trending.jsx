import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TRENDING } from "../../data/content";
import { Reveal, SectionHead } from "./Motion";

export const Trending = () => {
  const row = useRef(null);
  const nudge = (d) => row.current?.scrollBy({ left: d * row.current.clientWidth * 0.8, behavior: "smooth" });
  const btn = "flex h-12 w-12 items-center justify-center rounded-full border border-[#1A1918] text-[#1A1918] transition-colors duration-300 hover:bg-[#1A1918] hover:text-[#FBF9F5]";

  return (
    <section id="ideas" className="py-20 md:py-32" data-testid="trending-section">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead eyebrow="01 — Trending ideas" title="What homes are wearing this season"
          right={<div className="flex gap-3"><button className={btn} onClick={() => nudge(-1)} aria-label="Previous" data-testid="trending-prev-btn"><ArrowLeft className="h-5 w-5" /></button><button className={btn} onClick={() => nudge(1)} aria-label="Next" data-testid="trending-next-btn"><ArrowRight className="h-5 w-5" /></button></div>} />
      </div>
      <div ref={row} className="no-scrollbar flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto px-5 md:scroll-pl-10 md:px-10 xl:px-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]" data-lenis-prevent-wheel="false">
        {TRENDING.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.06} className="w-[85vw] shrink-0 snap-start sm:w-[440px]">
            <article className="group" data-testid={`trending-card-${i}`}>
              <div className="grid h-[340px] grid-cols-3 grid-rows-2 gap-2 overflow-hidden rounded-[22px]">
                <div className="col-span-2 row-span-2 overflow-hidden"><img src={t.imgs[0]} alt={t.title} className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" /></div>
                <div className="overflow-hidden"><img src={t.imgs[1]} alt="" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" /></div>
                <div className="overflow-hidden"><img src={t.imgs[2]} alt="" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" /></div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-[#1A1918]">{t.title}</h3>
                <span className="rounded-full bg-[#F3EFEA] px-3 py-1 text-xs text-[#6E6B65]">{t.tag}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
