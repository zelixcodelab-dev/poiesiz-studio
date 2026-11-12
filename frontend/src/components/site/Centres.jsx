import { MapPin, Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { CONTACT } from "../../data/content";
import { SectionHead, Reveal } from "./Motion";

export const Centres = ({ onBook }) => (
  <section id="studios" className="bg-[#121212] py-20 md:py-32" data-testid="centres-section">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <SectionHead light eyebrow="Contact us" title="Visit our office in Palarivattom" sub="Drop by, call or write to us to discuss your home, office or retail project." />
      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col gap-6 rounded-[24px] border border-white/10 p-6 md:p-8" data-testid="contact-card">
            <div className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-[#FEBD1C]" /><p className="text-[#FBF9F5]" data-testid="contact-address">{CONTACT.address}</p></div>
            <div className="flex gap-4"><Phone className="mt-1 h-5 w-5 shrink-0 text-[#FEBD1C]" /><div className="flex flex-col">{CONTACT.phones.map((p, i) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="text-[#FBF9F5] transition-colors duration-300 hover:text-[#FEBD1C]" data-testid={`contact-phone-${i}`}>{p}</a>)}</div></div>
            <div className="flex gap-4"><Mail className="mt-1 h-5 w-5 shrink-0 text-[#FEBD1C]" /><a href={`mailto:${CONTACT.email}`} className="break-all text-[#FBF9F5] transition-colors duration-300 hover:text-[#FEBD1C]" data-testid="contact-email">{CONTACT.email}</a></div>
            <div className="flex gap-4"><Globe className="mt-1 h-5 w-5 shrink-0 text-[#FEBD1C]" /><a href={`https://${CONTACT.website}`} target="_blank" rel="noreferrer" className="text-[#FBF9F5] transition-colors duration-300 hover:text-[#FEBD1C]" data-testid="contact-website">{CONTACT.website}</a></div>
            <button onClick={onBook} className="group mt-auto flex w-fit items-center gap-2 rounded-full bg-[#FEBD1C] px-6 py-3.5 font-medium transition-colors duration-300 hover:bg-[#F0AC00]" data-testid="contact-book-btn">Book Free Consultation <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <iframe title="POIESIZ Interiors location" src="https://www.google.com/maps?q=Pallissery%20Road%2C%20Palarivattom%2C%20Ernakulam%20682025&output=embed" className="h-[340px] w-full rounded-[24px] border-0 grayscale md:h-full md:min-h-[420px]" loading="lazy" data-testid="contact-map" />
        </Reveal>
      </div>
    </div>
  </section>
);
