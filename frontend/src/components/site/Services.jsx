import { KeyRound, Home, Store, Briefcase } from "lucide-react";
import { Reveal, Eyebrow } from "./Motion";
import { useContent, list } from "../../lib/content";
import { asset } from "../../lib/api";

const ICONS = [KeyRound, Home, Store, Briefcase];

export const Services = () => {
  const d = useContent("services");
  return (
  <section id="services" className="py-20 md:py-32" data-testid="services-section">
    <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-10 lg:grid-cols-12">
      <Reveal className="lg:col-span-5">
        <div className="space-y-5 lg:sticky lg:top-28">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1A1918] sm:text-4xl lg:text-5xl">{d.title} <span className="font-serif-it font-normal italic">{d.titleAccent}</span></h2>
          <p className="text-[#6E6B65] md:text-lg">{d.sub}</p>
          <div className="relative mt-4 aspect-[4/5] max-w-sm overflow-hidden rounded-[24px] bg-[#FEBD1C]">
            {d.image && <img src={asset(d.image)} alt="" className="h-full w-full object-cover" />}
          </div>
        </div>
      </Reveal>
      <div className="divide-y divide-[#E5DEC9] border-y border-[#E5DEC9] lg:col-span-7">
        {list(d.items).map((s, i) => {
          const I = ICONS[i % ICONS.length];
          return (
            <Reveal key={s.title} delay={i * 0.06}>
              <article className="group flex gap-5 py-8 md:gap-8 md:py-10" data-testid={`service-item-${i}`}>
                <span className="font-mono text-sm text-[#6E6B65]">0{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FEBD1C] transition-transform duration-500 group-hover:rotate-12"><I className="h-5 w-5" /></span>
                    <h3 className="font-display text-2xl font-semibold text-[#1A1918] md:text-3xl">{s.title}</h3>
                  </div>
                  <p className="mt-4 max-w-xl text-[#6E6B65]">{s.text}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
  );
};
