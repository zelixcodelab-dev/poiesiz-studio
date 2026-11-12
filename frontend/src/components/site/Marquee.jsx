const WORDS = ["Living rooms", "Modular kitchens", "Wardrobes", "Pooja units", "False ceilings", "Kids' rooms", "Study corners", "Balconies"];

export const Marquee = () => (
  <div className="overflow-hidden border-y border-[#E5DEC9] bg-[#FBF9F5] py-7" data-testid="editorial-marquee">
    <div className="marquee-track flex w-max">
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
          {WORDS.map((w) => (
            <span key={w} className="flex items-center font-display text-3xl tracking-tight text-[#1A1918] md:text-5xl">
              <span className="px-8">{w}</span>
              <span className="text-[#E0A100]">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
