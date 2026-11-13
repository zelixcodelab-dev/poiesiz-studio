import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Reveal, Eyebrow } from "./Motion";
import { useContent, list } from "../../lib/content";

export const Faq = ({ onBook }) => {
  const d = useContent("faqs");
  return (
  <section id="faq" className="py-20 md:py-32" data-testid="faq-section">
    <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-10 lg:grid-cols-12">
      <Reveal className="space-y-5 lg:col-span-4">
        <Eyebrow>Questions</Eyebrow>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-[#130C08] sm:text-4xl lg:text-5xl">{d.title}</h2>
        <p className="text-[#6A5647]">Still unsure? A designer can walk you through it on a free call.</p>
        <button onClick={onBook} className="rounded-full border border-[#130C08] px-6 py-3 text-sm font-medium text-[#130C08] transition-colors duration-300 hover:bg-[#130C08] hover:text-white" data-testid="faq-book-btn">Ask a designer</button>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-8">
        <Accordion type="single" collapsible className="border-t border-[#CFC8BA]">
          {list(d.items).map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`} className="border-[#CFC8BA]">
              <AccordionTrigger className="py-6 text-left font-display text-lg font-medium text-[#130C08] hover:no-underline md:text-xl" data-testid={`faq-trigger-${i}`}>{f.q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-[#6A5647]">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
  );
};
