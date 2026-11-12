import { ONGOING } from "../../data/content";
import { SectionHead, Reveal } from "./Motion";

const SPAN = ["col-span-2 md:row-span-2", "", "", "", "", "col-span-2", "col-span-2"];

export const Ongoing = () => (
  <section className="bg-[#F3EFEA] py-20 md:py-32" data-testid="ongoing-section">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <SectionHead eyebrow="On-going projects" title="On site right now" sub="A look at work in progress across our current residential and commercial projects." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[230px]">
        {ONGOING.map((o, i) => (
          <Reveal key={o.img + i} delay={(i % 4) * 0.05} className={`${SPAN[i]} ${i === 0 ? "aspect-[4/3] md:aspect-auto" : "aspect-square md:aspect-auto"}`}>
            <figure className="group relative h-full overflow-hidden rounded-[20px]" data-testid={`ongoing-item-${i}`}>
              <img src={o.img} alt={o.label} className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              <figcaption className="absolute inset-x-2 bottom-2 rounded-xl bg-[#111111]/75 px-3 py-2 text-xs text-white backdrop-blur">{o.label}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
