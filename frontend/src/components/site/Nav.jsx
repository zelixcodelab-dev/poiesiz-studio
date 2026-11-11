import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const LINKS = [["Ideas", "#ideas"], ["Estimator", "#estimator"], ["Projects", "#projects"], ["Rooms", "#rooms"], ["Studios", "#studios"], ["FAQs", "#faq"]];

export const Nav = ({ onBook }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? "border-b border-[#E5DEC9] bg-[#FBF9F5]/85 backdrop-blur-xl" : "bg-transparent"}`} data-testid="site-nav">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
        <Logo light={!scrolled && !open} />
        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} className={`text-sm transition-colors duration-300 hover:text-[#C85A32] ${scrolled ? "text-[#1A1918]" : "text-[#FBF9F5]"}`} data-testid={`nav-link-${l.toLowerCase()}`}>{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onBook} className="hidden rounded-full bg-[#C85A32] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#B24C28] sm:block" data-testid="nav-book-btn">Book Free Consultation</button>
          <button onClick={() => setOpen(!open)} className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${scrolled || open ? "text-[#1A1918]" : "text-white"}`} aria-label="Menu" data-testid="nav-mobile-toggle">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[#E5DEC9] px-5 pb-6 lg:hidden" data-testid="nav-mobile-menu">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-[#E5DEC9] py-4 font-display text-xl text-[#1A1918]" data-testid={`nav-mobile-link-${l.toLowerCase()}`}>{l}</a>
          ))}
          <button onClick={() => { setOpen(false); onBook(); }} className="mt-5 w-full rounded-full bg-[#C85A32] py-3.5 font-medium text-white" data-testid="nav-mobile-book-btn">Book Free Consultation</button>
        </div>
      )}
    </header>
  );
};
