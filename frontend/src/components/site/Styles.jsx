import { ArrowUpRight } from "lucide-react";
import { STYLES, CATEGORIES } from "../../data/content";
import { SectionHead, Reveal } from "./Motion";

export const Styles = () => (
  <section className="pb-20 md:pb-32" data-testid="styles-section">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <SectionHead eyebrow="05 — Ideas by style" title="Find the mood that feels like you" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STYLES.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.08}>
            <a href="#consult" className="group relative block aspect-[3/4] overflow-hidden rounded-[22px]" data-testid={`style-card-${i}`}>
              <img src={s.img} alt={s.name} className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/85 via-[#121212]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="mb-3 flex gap-1.5">{s.chips.map((c) => <span key={c} className="h-4 w-4 rounded-full border border-white/40" style={{ background: c }} />)}</div>
                <div className="flex items-end justify-between">
                  <div><h3 className="font-display text-2xl font-semibold text-[#FBF9F5]">{s.name}</h3><p className="text-sm text-[#E9E4DA]">{s.count.toLocaleString("en-IN")} ideas</p></div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBF9F5] text-[#1A1918] transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#6E6B65]">Browse by category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => <span key={c} className="cursor-default rounded-full border border-[#E5DEC9] px-4 py-2 text-sm text-[#1A1918] transition-colors duration-300 hover:border-[#8A6200] hover:text-[#8A6200]" data-testid={`category-chip-${c.toLowerCase().replace(/\s/g, "-")}`}>{c}</span>)}
        </div>
      </Reveal>
    </div>
  </section>
);
