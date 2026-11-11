import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { FAQS } from "../../data/content";
import { Reveal, Eyebrow } from "./Motion";

export const Faq = ({ onBook }) => (
  <section id="faq" className="py-20 md:py-32" data-testid="faq-section">
    <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-10 lg:grid-cols-12">
      <Reveal className="space-y-5 lg:col-span-4">
        <Eyebrow>10 — Questions</Eyebrow>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1A1918] sm:text-4xl lg:text-5xl">Good questions, honest answers</h2>
        <p className="text-[#6E6B65]">Still unsure? A designer can walk you through it on a free call.</p>
        <button onClick={onBook} className="rounded-full border border-[#1A1918] px-6 py-3 text-sm font-medium text-[#1A1918] transition-colors duration-300 hover:bg-[#1A1918] hover:text-white" data-testid="faq-book-btn">Ask a designer</button>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-8">
        <Accordion type="single" collapsible className="border-t border-[#E5DEC9]">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`} className="border-[#E5DEC9]">
              <AccordionTrigger className="py-6 text-left font-display text-lg font-medium text-[#1A1918] hover:no-underline md:text-xl" data-testid={`faq-trigger-${i}`}>{f.q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-[#6E6B65]">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);
