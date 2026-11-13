import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { RoundCta } from "./Fx";
import { SectionHead, Reveal } from "./Motion";
import { useContent, list } from "../../lib/content";

export const Centres = ({ onBook }) => {
  const CONTACT = useContent("contact");
  return (
  <section id="studios" className="bg-[#130C08] py-20 md:py-32" data-testid="centres-section">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <SectionHead light eyebrow={CONTACT.eyebrow} title={CONTACT.title} sub={CONTACT.sub} />
      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col gap-6 rounded-[24px] border border-white/10 p-6 md:p-8" data-testid="contact-card">
            <div className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-[#D8C3A5]" /><p className="text-[#ECE9E1]" data-testid="contact-address">{CONTACT.address}</p></div>
            <div className="flex gap-4"><Phone className="mt-1 h-5 w-5 shrink-0 text-[#D8C3A5]" /><div className="flex flex-col">{list(CONTACT.phones).map((p, i) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="text-[#ECE9E1] transition-colors duration-300 hover:text-[#D8C3A5]" data-testid={`contact-phone-${i}`}>{p}</a>)}</div></div>
            <div className="flex gap-4"><Mail className="mt-1 h-5 w-5 shrink-0 text-[#D8C3A5]" /><a href={`mailto:${CONTACT.email}`} className="break-all text-[#ECE9E1] transition-colors duration-300 hover:text-[#D8C3A5]" data-testid="contact-email">{CONTACT.email}</a></div>
            <div className="flex gap-4"><Globe className="mt-1 h-5 w-5 shrink-0 text-[#D8C3A5]" /><a href={`https://${CONTACT.website}`} target="_blank" rel="noreferrer" className="text-[#ECE9E1] transition-colors duration-300 hover:text-[#D8C3A5]" data-testid="contact-website">{CONTACT.website}</a></div>
            <div className="mt-auto"><RoundCta dark onClick={onBook} testId="contact-book-btn">Book Free Consultation</RoundCta></div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <iframe title="POIESIZ Interiors location" src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery || CONTACT.address || "")}&output=embed`} className="h-[340px] w-full rounded-[24px] border-0 grayscale md:h-full md:min-h-[420px]" loading="lazy" data-testid="contact-map" />
        </Reveal>
      </div>
    </div>
  </section>
  );
};
