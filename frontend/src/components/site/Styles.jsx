import { ArrowUpRight } from "lucide-react";
import { SectionHead, Reveal } from "./Motion";
import { useContent, list } from "../../lib/content";
import { asset } from "../../lib/api";

export const Styles = () => {
  const d = useContent("styles");
  return (
  <section className="pb-20 md:pb-32" data-testid="styles-section">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <SectionHead eyebrow={d.eyebrow} title={d.title} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list(d.items).map((s, i) => (
          <Reveal key={s.name} delay={i * 0.08}>
            <a href="#consult" className="reveal-img group relative block aspect-[3/4] overflow-hidden rounded-[22px]" data-testid={`style-card-${i}`}>
              <img src={asset(s.img)} alt={s.name} className="h-full w-full object-cover transition-transform duration-[2.4s] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#130C08]/85 via-[#130C08]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-700 ease-out group-hover:-translate-y-2">
                <div className="mb-3 flex gap-1.5">{s.chips.map((c) => <span key={c} className="h-4 w-4 rounded-full border border-white/40" style={{ background: c }} />)}</div>
                <div className="flex items-end justify-between">
                  <div><h3 className="font-display text-2xl font-semibold text-[#ECE9E1]">{s.name}</h3><p className="text-sm text-[#E9E4DA]">{s.count.toLocaleString("en-IN")} ideas</p></div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ECE9E1] text-[#130C08] transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#6A5647]">Browse by category</p>
        <div className="flex flex-wrap gap-2">
          {list(d.categories).map((c) => <span key={c} className="cursor-default rounded-full border border-[#CFC8BA] px-4 py-2 text-sm text-[#130C08] transition-colors duration-300 hover:border-[#50321F] hover:text-[#50321F]" data-testid={`category-chip-${c.toLowerCase().replace(/\s/g, "-")}`}>{c}</span>)}
        </div>
      </Reveal>
    </div>
  </section>
  );
};
