import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SectionHead } from "./Motion";
import { useContent, list as asList, slug } from "../../lib/content";
import { asset } from "../../lib/api";
import { useViewCursor } from "./Fx";


export const Projects = () => {
  const [city, setCity] = useState("All");
  const d = useContent("projects");
  const nav = useNavigate();
  const { bind, cursor } = useViewCursor();
  const FILTERS = asList(d.filters);
  const list = asList(d.items).filter((p) => city === "All" || p.type === city || p.status === city);
  return (
    <section id="projects" className="py-20 md:py-32" data-testid="projects-section">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead eyebrow={d.eyebrow} title={d.title}
          right={<div className="flex flex-wrap gap-2">{FILTERS.map((f) => (
            <button key={f} onClick={() => setCity(f)} data-testid={`projects-filter-${f.toLowerCase()}`}
              className={`h-10 rounded-full border px-4 text-sm transition-colors duration-300 ${city === f ? "border-[#130C08] bg-[#130C08] text-[#ECE9E1]" : "border-[#CFC8BA] text-[#130C08] hover:border-[#130C08]"}`}>{f}</button>))}</div>} />
        <motion.div layout {...bind} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:cursor-none">
          {list.map((p, i) => (
            <motion.article layout key={p.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay: (i % 3) * 0.08 }} className="group cursor-pointer" onClick={() => nav(`/projects/${slug(p.name)}`)} data-testid={`project-card-${i}`}>
              <div className="reveal-img relative aspect-[4/5] overflow-hidden rounded-[22px]">
                <img src={asset(p.img)} alt={p.name} className="h-full w-full object-cover transition-transform duration-[2.4s] ease-out group-hover:scale-105" />
                {p.place && <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-[#ECE9E1]/90 px-3 py-1.5 text-xs text-[#130C08] backdrop-blur"><MapPin className="h-3 w-3" />{p.place}</span>}
                <span className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs backdrop-blur ${p.status === "On-going" ? "bg-[#50321F] text-white" : "bg-[#130C08]/70 text-[#ECE9E1]"}`}>{p.status}</span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div><h3 className="font-display text-xl font-semibold text-[#130C08]">{p.name}</h3><p className="text-sm text-[#6A5647]">{p.label}</p></div>
                <span className="mt-1 rounded-full bg-[#E3E0D6] px-3 py-1 text-xs text-[#6A5647]">{p.type}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
        {cursor}
      </div>
    </section>
  );
};
