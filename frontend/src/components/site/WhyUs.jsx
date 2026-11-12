import { Users, Hammer, Heart, Receipt, BadgeCheck } from "lucide-react";
import { WHY } from "../../data/content";
import { SectionHead, Reveal } from "./Motion";

const ICONS = [Users, Hammer, Heart, Receipt, BadgeCheck];
const SPANS = ["lg:col-span-2 lg:row-span-2", "", "", "", "lg:col-span-2"];

export const WhyUs = () => (
  <section className="py-20 md:py-32" data-testid="why-section">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <SectionHead eyebrow="Why POIESIZ" title="Trust built into every detail" />
      <div className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-3">
        {WHY.map((w, i) => {
          const I = ICONS[i];
          const big = i === 0;
          return (
            <Reveal key={w.title} delay={i * 0.06} className={`${SPANS[i]} ${big ? "md:col-span-2" : ""}`}>
              <div className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] p-7 transition-transform duration-500 hover:-translate-y-1 ${big ? "min-h-[460px] text-white" : i === 3 ? "bg-[#1C1C1C] text-white" : "bg-[#F3EFEA] text-[#1A1918]"}`} data-testid={`why-card-${i}`}>
                {big && <><img src="/projects/thrissur-courtyard.jpg" alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/30 to-transparent" /></>}
                <span className={`relative flex h-12 w-12 items-center justify-center rounded-full ${big || i === 3 ? "bg-white/15 text-[#FEBD1C]" : "bg-white text-[#8A6200]"}`}><I className="h-5 w-5" /></span>
                <div className="relative mt-10 max-w-md">
                  <h3 className={`font-display font-semibold ${big ? "text-3xl md:text-4xl" : "text-xl"}`}>{w.title}</h3>
                  <p className={`mt-2 ${big || i === 3 ? "text-[#E9E4DA]" : "text-[#6E6B65]"}`}>{w.text}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
