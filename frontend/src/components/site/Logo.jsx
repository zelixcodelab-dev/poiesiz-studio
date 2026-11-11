export const Logo = ({ light }) => (
  <a href="#top" className="flex items-center gap-2.5" data-testid="brand-logo-link">
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="32" height="32" rx="8" fill="#C85A32" />
      <path d="M10 18L18 10L26 18L18 26L10 18Z" fill="#FBF9F5" />
      <circle cx="18" cy="18" r="3" fill="#D4A359" />
    </svg>
    <span className={`font-display text-lg font-semibold tracking-tight ${light ? "text-[#FBF9F5]" : "text-[#1A1918]"}`}>
      Aangan<span className="font-serif-it font-normal italic text-[#C85A32]"> Studio</span>
    </span>
  </a>
);
