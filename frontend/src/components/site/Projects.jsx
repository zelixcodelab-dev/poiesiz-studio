import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "./Motion";
import { useContent, list as asList, slug } from "../../lib/content";
import { asset } from "../../lib/api";
import { useViewCursor } from "./Fx";

const Card = ({ p, i, wide, onOpen, className = "" }) => (
  <article onClick={onOpen} className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-[22px] ${className}`} data-testid={`project-card-${i}`}>
    <div className="reveal-img absolute inset-0 overflow-hidden">
      <img src={asset(p.img)} alt={p.name} className="h-full w-full object-cover transition-transform duration-[2.4s] ease-out group-hover:scale-105" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-[#130C08]/75 via-transparent to-transparent" />
    <span className="absolute left-5 top-5 font-mono text-[11px] lowercase tracking-[0.12em] text-[#ECE9E1]">[{p.type}]</span>
    {p.status === "On-going" && <span className="absolute right-5 top-5 rounded-full bg-[#50321F] px-3 py-1 text-xs text-white">On-going</span>}
    <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
      <div>
        <h3 className={`font-display font-semibold tracking-tight text-[#ECE9E1] ${wide ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"}`}>{p.name}</h3>
        <p className="mt-1 text-sm text-[#E9E4DA]/85">{[p.label, p.place].filter(Boolean).join(" · ")}</p>
      </div>
      <span className="hidden translate-y-3 font-mono text-[11px] lowercase tracking-[0.12em] text-[#ECE9E1] opacity-0 transition-[opacity,transform] duration-700 group-hover:translate-y-0 group-hover:opacity-100 md:block">view project →</span>
    </div>
  </article>
);

export const Projects = () => {
  const [city, setCity] = useState("All");
  const d = useContent("projects");
  const nav = useNavigate();
  const { bind, cursor } = useViewCursor();
  const FILTERS = asList(d.filters);
  const list = asList(d.items).filter((p) => city === "All" || p.type === city || p.status === city);
  const wrap = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  const distMv = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, distMv], ([v, dd]) => -v * dd);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useLayoutEffect(() => {
    const f = () => { const v = Math.max(0, track.current.scrollWidth - window.innerWidth); setDist(v); distMv.set(v); };
    f();
    const ro = new ResizeObserver(f);
    ro.observe(track.current);
    window.addEventListener("resize", f);
    return () => { ro.disconnect(); window.removeEventListener("resize", f); };
  }, [list.length, distMv]);

  const open = (p) => nav(`/projects/${slug(p.name)}`);
  const filters = (
    <div className="flex flex-wrap gap-2">{FILTERS.map((f) => (
      <button key={f} onClick={() => setCity(f)} data-testid={`projects-filter-${f.toLowerCase()}`}
        className={`h-9 rounded-full border px-4 text-xs transition-colors duration-300 ${city === f ? "border-[#130C08] bg-[#130C08] text-[#ECE9E1]" : "border-[#CFC8BA] text-[#130C08] hover:border-[#130C08]"}`}>{f}</button>))}</div>
  );
  const head = (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-5 md:flex-row md:items-end md:justify-between md:px-10">
      <div>
        <Eyebrow>{d.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.035em] text-[#130C08] md:text-6xl lg:text-7xl" data-testid="projects-title">{d.title}</h2>
      </div>
      {filters}
    </div>
  );

  return (
    <section id="projects" data-testid="projects-section">
      <div ref={wrap} className="relative hidden md:block" style={{ height: `calc(100vh + ${dist}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden pb-8 pt-24">
          {head}
          <motion.div ref={track} style={{ x }} {...bind} className="mt-8 flex min-h-0 flex-1 gap-5 px-10 md:cursor-none" data-testid="projects-track">
            {list.map((p, i) => <Card key={p.name} p={p} i={i} wide={i % 3 === 0} onOpen={() => open(p)} className={i % 3 === 0 ? "w-[44vw]" : "w-[27vw]"} />)}
          </motion.div>
          <div className="mx-auto mt-6 flex w-full max-w-[1600px] items-center gap-4 px-10 font-mono text-[11px] lowercase tracking-[0.12em] text-[#6A5647]">
            [scroll to explore]<div className="h-px flex-1 bg-[#CFC8BA]"><motion.div style={{ width: bar }} className="h-px bg-[#130C08]" /></div>{String(list.length).padStart(2, "0")} projects
          </div>
          {cursor}
        </div>
      </div>
      <div className="py-20 md:hidden">
        {head}
        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5" data-lenis-prevent>
          {list.map((p, i) => <Card key={p.name} p={p} i={i} wide={false} onOpen={() => open(p)} className="h-[62vh] w-[80vw] snap-start" />)}
        </div>
      </div>
    </section>
  );
};
