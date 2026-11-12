import { Link } from "react-router-dom";
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { useContent, list } from "../../lib/content";

export const Footer = ({ onBook, home = true }) => {
  const CONTACT = useContent("contact");
  const ft = useContent("footer");
  return (
  <footer className="bg-[#121212] pt-20 text-[#D9D3C7]" data-testid="site-footer">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <div className="flex flex-col gap-8 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-[#FBF9F5] md:text-6xl">{ft.headline} <span className="font-serif-it font-normal italic text-[#FEBD1C]">{ft.headlineAccent}</span></h2>
        <button onClick={onBook} className="shrink-0 rounded-full bg-[#FEBD1C] px-7 py-4 font-medium text-white transition-colors duration-300 hover:bg-[#F0AC00]" data-testid="footer-book-btn">Book Free Consultation</button>
      </div>
      <div className="grid gap-10 py-14 md:grid-cols-12">
        <div className="space-y-4 md:col-span-4">
          <Logo light />
          <p className="max-w-xs text-sm">{ft.tagline}</p>
          <div className="space-y-2 text-sm">
            <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FEBD1C]" />{CONTACT.address}</p>
            <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#FEBD1C]" />{list(CONTACT.phones).join(" · ")}</p>
            <a href={`mailto:${CONTACT.email}`} className="flex gap-2 transition-colors duration-300 hover:text-white" data-testid="footer-email"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#FEBD1C]" />{CONTACT.email}</a>
          </div>
        </div>
        <div className="md:col-span-5">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#FEBD1C]">Interior designers in & around</p>
          <div className="grid grid-cols-2 gap-2 text-sm">{list(ft.cities).map((c) => <a key={c} href={home ? "#consult" : "/#consult"} className="transition-colors duration-300 hover:text-white" data-testid={`footer-city-${c.toLowerCase()}`}>{c}</a>)}</div>
        </div>
        <div className="md:col-span-3">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#FEBD1C]">Explore</p>
          <div className="flex flex-col gap-2 text-sm"><Link to="/price-calculator" className="transition-colors duration-300 hover:text-white" data-testid="footer-link-calculator">Price calculator</Link>
            {[["Trending ideas", "#ideas"], ["Projects", "#projects"], ["Services", "#services"], ["Contact", "#studios"], ["FAQs", "#faq"]].map(([l, h]) => <a key={h} href={home ? h : `/${h}`} className="transition-colors duration-300 hover:text-white" data-testid={`footer-link-${h.slice(1)}`}>{l}</a>)}</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 py-6 text-xs text-[#BFB8AB]">
        <p>© {new Date().getFullYear()} POIESIZ Interiors · {CONTACT.website}</p>
        <a href="#top" className="flex items-center gap-2 transition-colors duration-300 hover:text-white" data-testid="footer-back-top">Back to top <ArrowUp className="h-3.5 w-3.5" /></a>
      </div>
    </div>
  </footer>
  );
};
