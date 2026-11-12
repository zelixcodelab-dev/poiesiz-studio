import { Link } from "react-router-dom";

export const Logo = ({ light }) => (
  <Link to="/" className="flex items-center gap-3" data-testid="brand-logo-link" aria-label="POIESIZ Interiors home">
    <span className="flex flex-col items-end leading-none">
      <span className={`font-display text-[19px] font-light tracking-[0.3em] md:text-[21px] ${light ? "text-white" : "text-[#111111]"}`}>POIESIZ</span>
      <span className={`mt-1 font-display text-[12px] font-light tracking-[0.12em] ${light ? "text-white/90" : "text-[#111111]/80"}`}>Interiors</span>
    </span>
    <img src="/brand/mark.png" alt="" className="h-10 w-auto" />
  </Link>
);
