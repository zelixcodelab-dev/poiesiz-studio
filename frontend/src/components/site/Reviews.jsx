import { Star } from "lucide-react";
import { REVIEWS } from "../../data/content";
import { SectionHead, Reveal } from "./Motion";

export const Reviews = () => (
  <section className="bg-[#F3EFEA] py-20 md:py-32" data-testid="reviews-section">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <SectionHead eyebrow="09 — Homeowners" title="In their words" sub="Sample reviews shown for layout. Replace with your real customer reviews." />
    </div>
    <div className="no-scrollbar flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 md:scroll-pl-10 md:px-10 xl:px-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]">
      {REVIEWS.map((r, i) => (
        <Reveal key={r.name} delay={i * 0.06} className="w-[82vw] shrink-0 snap-start sm:w-[380px]">
          <figure className="flex h-full flex-col justify-between rounded-[22px] bg-white p-7" data-testid={`review-card-${i}`}>
            <div>
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-[#D4A359] text-[#D4A359]" />)}</div>
              <blockquote className="mt-5 text-[17px] leading-relaxed text-[#1A1918]">"{r.text}"</blockquote>
            </div>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2D3B36] font-display text-[#FBF9F5]">{r.name[0]}</span>
              <div><p className="font-medium text-[#1A1918]">{r.name}</p><p className="text-sm text-[#6E6B65]">{r.city}</p></div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  </section>
);
