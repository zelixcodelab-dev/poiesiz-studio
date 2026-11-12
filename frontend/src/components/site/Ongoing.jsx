import { SectionHead, Reveal } from "./Motion";
import { useContent, list } from "../../lib/content";
import { asset } from "../../lib/api";

const SPAN = ["col-span-2 md:row-span-2", "", "", "", "", "col-span-2", "col-span-2"];

export const Ongoing = () => {
  const d = useContent("ongoing");
  return (
  <section className="bg-[#F3EFEA] py-20 md:py-32" data-testid="ongoing-section">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <SectionHead eyebrow={d.eyebrow} title={d.title} sub={d.sub} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[230px]">
        {list(d.items).map((o, i) => (
          <Reveal key={i} delay={(i % 4) * 0.05} className={`${SPAN[i % SPAN.length]} ${i === 0 ? "aspect-[4/3] md:aspect-auto" : "aspect-square md:aspect-auto"}`}>
            <figure className="group relative h-full overflow-hidden rounded-[20px]" data-testid={`ongoing-item-${i}`}>
              <img src={asset(o.img)} alt={o.label} className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              <figcaption className="absolute inset-x-2 bottom-2 rounded-xl bg-[#111111]/75 px-3 py-2 text-xs text-white backdrop-blur">{o.label}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
  );
};
