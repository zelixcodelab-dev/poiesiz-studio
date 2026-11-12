import { Link } from "react-router-dom";

export const Logo = ({ light }) => (
  <Link to="/" className="flex items-center gap-3" data-testid="brand-logo-link" aria-label="POIESIZ Interiors home">
    <span className="flex flex-col items-start leading-none">
      <span className={`font-chillax text-[19px] font-medium tracking-[0.3em] md:text-[21px] ${light ? "text-white" : "text-[#111111]"}`}>POIESIZ</span>
      <span className="mt-1 flex items-baseline">
        <span aria-hidden="true" className="invisible font-chillax text-[19px] font-medium leading-none tracking-[0.3em] md:text-[21px]">PO</span>
        <span className={`font-chillax text-[12px] font-normal tracking-[0.12em] ${light ? "text-white/90" : "text-[#111111]/80"}`} data-testid="logo-interiors">Interiors</span>
      </span>
    </span>
    <img src="/brand/mark.png" alt="" className="h-10 w-auto" />
  </Link>
);
