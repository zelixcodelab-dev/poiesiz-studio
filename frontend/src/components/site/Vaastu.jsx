import { Phone } from "lucide-react";
import { Reveal } from "./Motion";
import { useContent, list } from "../../lib/content";
import { asset } from "../../lib/api";

export const Vaastu = ({ onBook }) => {
  const c = useContent("clients");
  const phone = list(useContent("contact").phones)[0] ?? "";
  return (
  <section className="px-5 md:px-10" data-testid="clients-section">
    <Reveal className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] bg-[#FEBD1C] px-6 py-14 text-[#111111] md:px-14 md:py-20">
      <img src="/brand/mark.png" alt="" className="pointer-events-none absolute -right-10 -top-10 hidden h-72 w-auto opacity-25 mix-blend-multiply md:block md:h-[26rem]" />
      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="space-y-5 lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.22em]">{c.eyebrow}</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{c.title}</h2>
          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={onBook} className="rounded-full bg-[#111111] px-6 py-3.5 font-medium text-white transition-colors duration-300 hover:bg-[#333333]" data-testid="clients-book-btn">Start your project</button>
            {phone && <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-full border border-[#111111] px-6 py-3.5 font-medium transition-colors duration-300 hover:bg-[#111111] hover:text-white" data-testid="clients-call-btn"><Phone className="h-4 w-4" />{phone}</a>}
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3 lg:col-span-7 lg:grid-cols-3">
          {list(c.items).map((cl, i) => (
            <li key={i} className="group flex min-h-[150px] flex-col items-center justify-center gap-3 rounded-[20px] bg-white/85 p-4 text-center shadow-sm transition-transform duration-500 hover:-translate-y-1" data-testid={`client-${i}`}>
              {cl.logo && <img src={asset(cl.logo)} alt={cl.name} className="h-16 w-auto max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105" />}
              <span className="font-display text-xs font-semibold leading-snug text-[#1A1918] sm:text-sm">{cl.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  </section>
  );
};
