import { ArrowUp, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { FOOTER_CITIES } from "../../data/content";
import { Logo } from "./Logo";

export const Footer = ({ onBook }) => (
  <footer className="bg-[#141C18] pt-20 text-[#D9D3C7]" data-testid="site-footer">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <div className="flex flex-col gap-8 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-[#FBF9F5] md:text-6xl">Let's start with a <span className="font-serif-it font-normal italic text-[#D4A359]">conversation.</span></h2>
        <button onClick={onBook} className="shrink-0 rounded-full bg-[#C85A32] px-7 py-4 font-medium text-white transition-colors duration-300 hover:bg-[#B24C28]" data-testid="footer-book-btn">Book Free Consultation</button>
      </div>
      <div className="grid gap-10 py-14 md:grid-cols-12">
        <div className="space-y-4 md:col-span-4">
          <Logo light />
          <p className="max-w-xs text-sm">Home interiors designed, built and installed by one team.</p>
          <div className="flex gap-2">{[Instagram, Facebook, Linkedin, Youtube].map((I, i) => (
            <a key={i} href="#top" aria-label="Social link" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 hover:border-[#D4A359] hover:text-[#D4A359]" data-testid={`footer-social-${i}`}><I className="h-4 w-4" /></a>))}</div>
        </div>
        <div className="md:col-span-5">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#D4A359]">Interior designers in</p>
          <div className="grid grid-cols-2 gap-2 text-sm">{FOOTER_CITIES.map((c) => <a key={c} href="#consult" className="transition-colors duration-300 hover:text-white" data-testid={`footer-city-${c.toLowerCase()}`}>{c}</a>)}</div>
        </div>
        <div className="md:col-span-3">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#D4A359]">Explore</p>
          <div className="flex flex-col gap-2 text-sm">{[["Trending ideas", "#ideas"], ["Cost estimator", "#estimator"], ["Projects", "#projects"], ["Studios", "#studios"], ["FAQs", "#faq"]].map(([l, h]) => <a key={h} href={h} className="transition-colors duration-300 hover:text-white" data-testid={`footer-link-${h.slice(1)}`}>{l}</a>)}</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 py-6 text-xs text-[#BFB8AB]">
        <p>© {new Date().getFullYear()} Aangan Studio. All rights reserved.</p>
        <a href="#top" className="flex items-center gap-2 transition-colors duration-300 hover:text-white" data-testid="footer-back-top">Back to top <ArrowUp className="h-3.5 w-3.5" /></a>
      </div>
    </div>
  </footer>
);
