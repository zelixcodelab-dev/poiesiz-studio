import { Star } from "lucide-react";
import { SectionHead, Reveal } from "./Motion";
import { useContent, list } from "../../lib/content";

const GoogleG = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

const Stars = ({ n, className = "h-4 w-4" }) => (
  <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`${className} ${i <= Math.round(n) ? "fill-[#FEBD1C] text-[#FEBD1C]" : "text-[#CFC6B6]"}`} />)}
  </span>
);

const Summary = ({ rating, count }) => (
  <div className="flex items-center gap-5 rounded-[24px] bg-[#50321F] px-6 py-5 text-white" data-testid="reviews-summary">
    <span className="font-display text-5xl font-semibold" data-testid="reviews-overall-rating">{rating.toFixed(1)}</span>
    <div className="space-y-1.5">
      <Stars n={rating} />
      <p className="flex items-center gap-2 text-sm text-[#E9E4DA]" data-testid="reviews-count">
        <GoogleG className="h-4 w-4" />{count ? `Based on ${count} Google reviews` : "Rated on Google"}
      </p>
    </div>
  </div>
);

const Card = ({ r, i }) => (
  <Reveal delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid">
    <article className="rounded-[24px] bg-[#E3E0D6] p-7 transition-transform duration-500 hover:-translate-y-1" data-testid={`review-card-${i}`}>
      <div className="flex items-center justify-between">
        <Stars n={r.stars} />
        <GoogleG />
      </div>
      <p className="mt-5 text-base leading-relaxed text-[#2A1C13]">“{r.text}”</p>
      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#50321F] font-display text-sm font-semibold text-[#ECE9E1]">{String(r.name).trim().charAt(0).toUpperCase()}</span>
        <div>
          <p className="font-semibold text-[#130C08]">{r.name}</p>
          {r.date && <p className="text-sm text-[#6A5647]">{r.date}</p>}
        </div>
      </div>
    </article>
  </Reveal>
);

export const Reviews = () => {
  const d = useContent("reviews");
  const items = list(d.items).map((r) => ({ ...r, stars: Number(r?.rating) || 0 })).filter((r) => r.stars >= 4 && r.name && r.text);
  if (!items.length) return null;
  const rating = Number(d.rating);
  const summary = rating > 0 && rating <= 5 ? <Summary rating={rating} count={d.count} /> : null;
  return (
    <section className="py-20 md:py-32" data-testid="reviews-section">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead eyebrow={d.eyebrow} title={d.title} sub={d.sub} right={summary} />
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
          {items.map((r, i) => <Card key={`${r.name}-${i}`} r={r} i={i} />)}
        </div>
      </div>
    </section>
  );
};
