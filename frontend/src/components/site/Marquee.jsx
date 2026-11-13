import { useContent, list } from "../../lib/content";

export const Marquee = () => {
  const WORDS = list(useContent("marquee").words);
  return (
  <div className="overflow-hidden border-y border-[#CFC8BA] bg-[#ECE9E1] py-7" data-testid="editorial-marquee">
    <div className="marquee-track flex w-max">
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
          {WORDS.map((w, wi) => (
            <span key={wi} className="flex items-center font-display text-3xl tracking-tight text-[#130C08] md:text-5xl">
              <span className="px-8">{w}</span>
              <span className="text-[#E0A100]">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
  );
};
