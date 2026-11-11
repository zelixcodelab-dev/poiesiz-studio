import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { PROJECTS } from "../../data/content";
import { SectionHead } from "./Motion";

const FILTERS = ["All", "Bengaluru", "Hyderabad", "Pune", "Mumbai"];

export const Projects = () => {
  const [city, setCity] = useState("All");
  const list = PROJECTS.filter((p) => city === "All" || p.city === city);
  return (
    <section id="projects" className="py-20 md:py-32" data-testid="projects-section">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead eyebrow="03 — Recent projects" title="Recently handed over"
          right={<div className="flex flex-wrap gap-2">{FILTERS.map((f) => (
            <button key={f} onClick={() => setCity(f)} data-testid={`projects-filter-${f.toLowerCase()}`}
              className={`h-10 rounded-full border px-4 text-sm transition-colors duration-300 ${city === f ? "border-[#1A1918] bg-[#1A1918] text-[#FBF9F5]" : "border-[#E5DEC9] text-[#1A1918] hover:border-[#1A1918]"}`}>{f}</button>))}</div>} />
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <motion.article layout key={p.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay: (i % 3) * 0.08 }} className="group" data-testid={`project-card-${i}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]" style={{ clipPath: "inset(0 round 22px)" }}>
                <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-[#FBF9F5]/90 px-3 py-1.5 text-xs text-[#1A1918] backdrop-blur"><MapPin className="h-3 w-3" />{p.city}</span>
                <span className="absolute right-4 top-4 rounded-full bg-[#1A1918]/70 px-3 py-1.5 text-xs text-[#FBF9F5] backdrop-blur">{p.bhk}</span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div><h3 className="font-display text-xl font-semibold text-[#1A1918]">{p.name}</h3><p className="text-sm text-[#6E6B65]">{p.style}</p></div>
                <div className="flex items-center gap-0.5 pt-1">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className={`h-3.5 w-3.5 ${k < p.rating ? "fill-[#D4A359] text-[#D4A359]" : "text-[#E5DEC9]"}`} />)}</div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
