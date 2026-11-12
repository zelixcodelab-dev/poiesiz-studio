import { Link } from "react-router-dom";

export const Logo = ({ light }) => (
  <Link to="/" className="flex items-center" data-testid="brand-logo-link" aria-label="POIESIZ Interiors home">
    <img src={light ? "/brand/logo-light.png" : "/brand/logo-dark.png"} alt="POIESIZ Interiors" className="h-10 w-auto md:h-12" data-testid="brand-logo-img" />
  </Link>
);
