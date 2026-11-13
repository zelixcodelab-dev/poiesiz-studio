import { KeyRound, Home, Store, Briefcase } from "lucide-react";
import { Reveal, Eyebrow } from "./Motion";
import { ParallaxImg } from "./Fx";
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
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[#130C08] sm:text-4xl lg:text-5xl">{d.title} <span className="font-serif-it font-normal italic">{d.titleAccent}</span></h2>
          <p className="text-[#6A5647] md:text-lg">{d.sub}</p>
          <div className="reveal-img relative mt-4 aspect-[4/5] max-w-sm overflow-hidden rounded-[24px] bg-[#D9CFBF]">
            {d.image && <ParallaxImg src={asset(d.image)} />}
          </div>
        </div>
      </Reveal>
      <div className="divide-y divide-[#CFC8BA] border-y border-[#CFC8BA] lg:col-span-7">
        {list(d.items).map((s, i) => {
          const I = ICONS[i % ICONS.length];
          return (
            <Reveal key={s.title} delay={i * 0.06}>
              <article className="group flex gap-5 py-8 md:gap-8 md:py-10" data-testid={`service-item-${i}`}>
                <span className="font-mono text-sm text-[#6A5647]">0{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#50321F] text-[#ECE9E1] transition-transform duration-700 group-hover:rotate-12"><I className="h-5 w-5" /></span>
                    <h3 className="font-display text-2xl font-semibold text-[#130C08] md:text-3xl">{s.title}</h3>
                  </div>
                  <p className="mt-4 max-w-xl text-[#6A5647]">{s.text}</p>
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
