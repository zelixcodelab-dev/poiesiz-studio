import { Phone } from "lucide-react";
import { CLIENTS, CONTACT } from "../../data/content";
import { Reveal } from "./Motion";

export const Vaastu = ({ onBook }) => (
  <section className="px-5 md:px-10" data-testid="clients-section">
    <Reveal className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] bg-[#FEBD1C] px-6 py-14 text-[#111111] md:px-14 md:py-20">
      <img src="/brand/mark.png" alt="" className="pointer-events-none absolute -right-10 -top-10 hidden h-72 w-auto opacity-25 mix-blend-multiply md:block md:h-[26rem]" />
      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="space-y-5 lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.22em]">Our clients</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">Trusted by names you know</h2>
          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={onBook} className="rounded-full bg-[#111111] px-6 py-3.5 font-medium text-white transition-colors duration-300 hover:bg-[#333333]" data-testid="clients-book-btn">Start your project</button>
            <a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-full border border-[#111111] px-6 py-3.5 font-medium transition-colors duration-300 hover:bg-[#111111] hover:text-white" data-testid="clients-call-btn"><Phone className="h-4 w-4" />{CONTACT.phones[0]}</a>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[22px] bg-[#111111]/15 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
          {CLIENTS.map((c, i) => (
            <li key={c} className="flex min-h-[96px] items-center bg-[#FEBD1C] px-5 py-6 font-display text-lg font-semibold leading-snug" data-testid={`client-${i}`}>{c}</li>
          ))}
        </ul>
      </div>
    </Reveal>
  </section>
);
