import { MapPin, ArrowRight } from "lucide-react";
import { CENTRES } from "../../data/content";
import { SectionHead, Reveal } from "./Motion";

export const Centres = ({ onBook }) => (
  <section id="studios" className="bg-[#141C18] py-20 md:py-32" data-testid="centres-section">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <SectionHead light eyebrow="07 — Experience studios" title="Touch the finishes before you choose" sub="Walk through full-size kitchens, wardrobes and material libraries at a studio near you." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CENTRES.map((c, i) => (
          <Reveal key={c.area} delay={i * 0.06}>
            <div className="group flex h-full flex-col justify-between gap-8 rounded-[22px] border border-white/10 p-6 transition-colors duration-500 hover:border-[#D4A359]/60 hover:bg-white/[0.03]" data-testid={`centre-card-${i}`}>
              <div>
                <MapPin className="h-5 w-5 text-[#D4A359]" />
                <h3 className="mt-6 font-display text-xl font-semibold text-[#FBF9F5]">{c.area}</h3>
                <p className="text-sm text-[#BFB8AB]">{c.city}</p>
                <p className="mt-4 text-sm text-[#BFB8AB]">[Studio address]</p>
                <p className="text-sm text-[#BFB8AB]">Open daily, 10am – 8pm</p>
              </div>
              <button onClick={onBook} className="flex items-center gap-2 text-sm font-medium text-[#FBF9F5] transition-colors duration-300 hover:text-[#D4A359]" data-testid={`centre-visit-btn-${i}`}>Schedule visit <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
