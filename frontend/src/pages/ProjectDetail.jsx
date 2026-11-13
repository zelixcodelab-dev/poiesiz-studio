import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { useContent, list, slug } from "../lib/content";
import { asset } from "../lib/api";
import { MaskLines, Reveal } from "../components/site/Motion";
import { RoundCta } from "../components/site/Fx";

const Lightbox = ({ imgs, index, setIndex }) => {
  useEffect(() => {
    const k = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % imgs.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + imgs.length) % imgs.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [imgs.length, setIndex]);
  const btn = "absolute flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-[#ECE9E1] hover:text-[#130C08]";
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4" onClick={() => setIndex(null)} data-testid="project-lightbox">
      <img src={asset(imgs[index])} alt="" className="max-h-[85vh] max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
      <button className={`${btn} right-4 top-4`} onClick={() => setIndex(null)} aria-label="Close" data-testid="lightbox-close"><X className="h-5 w-5" /></button>
      {imgs.length > 1 && <>
        <button className={`${btn} left-4 top-1/2 -translate-y-1/2`} onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + imgs.length) % imgs.length); }} aria-label="Previous" data-testid="lightbox-prev"><ChevronLeft className="h-5 w-5" /></button>
        <button className={`${btn} right-4 top-1/2 -translate-y-1/2`} onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % imgs.length); }} aria-label="Next" data-testid="lightbox-next"><ChevronRight className="h-5 w-5" /></button>
      </>}
      <p className="absolute bottom-5 font-mono text-xs text-white/80">{index + 1} / {imgs.length}</p>
    </div>
  );
};

export default function ProjectDetail({ onBook }) {
  const { slug: s } = useParams();
  const items = list(useContent("projects").items);
  const p = items.find((x) => slug(x.name) === s);
  const [open, setOpen] = useState(null);
  useEffect(() => { if (p) document.title = `${p.name} | POIESIZ Interiors`; }, [p]);

  if (!p) return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 pt-24 text-center" data-testid="project-not-found">
      <h1 className="font-display text-3xl font-semibold">Project not found</h1>
      <Link to="/#projects" className="text-[#50321F] underline">Back to all projects</Link>
    </section>
  );
  const imgs = [...new Set([p.img, ...list(p.gallery)].filter(Boolean))];
  const idx = items.indexOf(p);
  const next = items[(idx + 1) % items.length];
  const facts = [["Type", p.type], ["Location", p.place], ["Status", p.status]].filter(([, v]) => v);

  return (
    <article className="min-h-screen pb-24" data-testid="project-detail-page">
      <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-[#130C08]">
        {imgs[0] && (
          <motion.button initial={{ scale: 1.18 }} animate={{ scale: 1 }} transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }} onClick={() => setOpen(0)} className="absolute inset-0 block h-full w-full" aria-label="Open photo" data-testid="project-hero-image">
            <img src={asset(imgs[0])} alt={p.name} className="h-full w-full object-cover" />
          </motion.button>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#130C08]/85 via-[#130C08]/20 to-[#130C08]/40" />
        <div className="pointer-events-none relative mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28">
          <Link to="/#projects" className="pointer-events-auto inline-flex w-fit items-center gap-2 font-mono text-xs lowercase tracking-[0.12em] text-[#ECE9E1]/85 hover:text-[#ECE9E1]" data-testid="project-back-link"><ArrowLeft className="h-4 w-4" />[all projects]</Link>
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="font-mono text-xs lowercase tracking-[0.14em] text-[#D8C3A5]">[{p.label}]</motion.p>
            <MaskLines as="h1" testId="project-title" className="mt-4 font-display text-[12vw] font-semibold leading-[0.9] tracking-[-0.045em] text-[#ECE9E1] md:text-[7.5vw]" lines={[p.name]} />
            <div className="relative mt-8 flex flex-wrap items-end gap-x-12 gap-y-4 pt-6">
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-0 top-0 h-px origin-left bg-[#ECE9E1]/35" />
              {facts.map(([k, v], i) => (
                <motion.div key={k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 + i * 0.12 }} data-testid={`project-fact-${k.toLowerCase()}`}>
                  <p className="font-mono text-[11px] lowercase tracking-[0.12em] text-[#D8C3A5]">[{k}]</p>
                  <p className="mt-1 flex items-center gap-2 font-medium text-[#ECE9E1]">{k === "Location" && <MapPin className="h-4 w-4" />}{v}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {p.description && <Reveal className="mx-auto mt-14 max-w-3xl"><p className="text-lg leading-relaxed text-[#130C08] md:text-xl" data-testid="project-description">{p.description}</p></Reveal>}
        {imgs.length > 1 && (
          <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3" data-testid="project-gallery">
            {imgs.slice(1).map((src, i) => (
              <Reveal key={src + i} delay={(i % 3) * 0.06} className="mb-4 break-inside-avoid">
                <button onClick={() => setOpen(i + 1)} className="reveal-img block w-full overflow-hidden rounded-[20px]" data-testid={`project-gallery-item-${i}`}>
                  <img src={asset(src)} alt={`${p.name} photo ${i + 2}`} className="w-full object-cover transition-transform duration-[1.2s] hover:scale-105" />
                </button>
              </Reveal>
            ))}
          </div>
        )}
        <div className="mt-20 flex flex-col gap-6 rounded-[28px] bg-[#D9CFBF] p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <h2 className="font-display text-2xl font-semibold text-[#111] md:text-4xl">Want something like this?</h2>
          <div className="flex flex-wrap gap-3">
            <RoundCta onClick={onBook} testId="project-book-btn">Book Free Consultation</RoundCta>
            {next && next !== p && <Link to={`/projects/${slug(next.name)}`} className="rounded-full border border-[#111] px-6 py-3.5 font-medium text-[#111] hover:bg-[#111] hover:text-white" data-testid="project-next-link">Next: {next.name}</Link>}
          </div>
        </div>
      </div>
      {open !== null && <Lightbox imgs={imgs} index={open} setIndex={setOpen} />}
    </article>
  );
}
