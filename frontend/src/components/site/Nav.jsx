import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { RollText } from "./Fx";

const SECTIONS = [["Ideas", "#ideas"], ["Projects", "#projects"], ["Rooms", "#rooms"], ["Services", "#services"], ["Contact", "#studios"], ["FAQs", "#faq"]];

export const Nav = ({ onBook, home = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const LINKS = SECTIONS.map(([l, h]) => [l, home ? h : `/${h}`]);
  const [open, setOpen] = useState(false);
  const solid = scrolled || open || !home;
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <motion.header initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }} className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${solid ? "border-b border-[#CFC8BA] bg-[#ECE9E1]/85 backdrop-blur-xl" : "bg-transparent"}`} data-testid="site-nav">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
        <Logo light={!solid} />
        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/price-calculator" className={`text-sm ${solid ? "text-[#130C08]" : "text-[#ECE9E1]"}`} data-testid="nav-link-calculator"><RollText text="Price Calculator" alt={solid ? "#50321F" : "#D8C3A5"} /></Link>
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} className={`text-sm ${solid ? "text-[#130C08]" : "text-[#ECE9E1]"}`} data-testid={`nav-link-${l.toLowerCase()}`}><RollText text={l} alt={solid ? "#50321F" : "#D8C3A5"} /></a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:+919961775580" className={`hidden text-sm font-medium transition-colors duration-300 hover:text-[#D8C3A5] xl:block ${solid ? "text-[#130C08]" : "text-white"}`} data-testid="nav-phone-link">+91 99617 75580</a>
          <button onClick={onBook} className="btn-roll hidden rounded-full bg-[#FEBD1C] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#F0AC00] sm:block" data-testid="nav-book-btn"><span className="roll-a">Book Free Consultation</span><span className="roll-b" aria-hidden="true">Book Free Consultation</span></button>
          <button onClick={() => setOpen(!open)} className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${solid ? "text-[#130C08]" : "text-white"}`} aria-label="Menu" data-testid="nav-mobile-toggle">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[#CFC8BA] px-5 pb-6 lg:hidden" data-testid="nav-mobile-menu">
          <Link to="/price-calculator" onClick={() => setOpen(false)} className="block border-b border-[#CFC8BA] py-4 font-display text-xl text-[#50321F]" data-testid="nav-mobile-link-calculator">Price Calculator</Link>
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-[#CFC8BA] py-4 font-display text-xl text-[#130C08]" data-testid={`nav-mobile-link-${l.toLowerCase()}`}>{l}</a>
          ))}
          <button onClick={() => { setOpen(false); onBook(); }} className="mt-5 w-full rounded-full bg-[#FEBD1C] py-3.5 font-medium text-white" data-testid="nav-mobile-book-btn">Book Free Consultation</button>
        </div>
      )}
    </motion.header>
  );
};
