import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHead, Reveal } from "./Motion";
import { useContent, list } from "../../lib/content";
import { asset } from "../../lib/api";

export const Rooms = () => {
  const d = useContent("rooms");
  const ROOMS = list(d.items).map((r, i) => ({ ...r, key: `r${i}` }));
  const [active, setActive] = useState("r0");
  const room = ROOMS.find((r) => r.key === active) ?? ROOMS[0] ?? { key: "r0", label: "", imgs: [] };
  return (
    <section id="rooms" className="bg-[#F3EFEA] py-20 md:py-32" data-testid="rooms-section">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead eyebrow={d.eyebrow} title={d.title} />
        <Reveal className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          {ROOMS.map((r) => (
            <button key={r.key} onClick={() => setActive(r.key)} data-testid={`rooms-tab-${r.key}`}
              className={`flex h-12 shrink-0 items-center gap-2 rounded-full px-5 text-sm transition-colors duration-300 ${active === r.key ? "bg-[#FEBD1C] text-white" : "bg-white text-[#1A1918] hover:bg-[#E5DEC9]"}`}>
              {r.label}<span className={`font-mono text-xs ${active === r.key ? "text-[#111111]/70" : "text-[#6E6B65]"}`}>{r.count}</span>
            </button>))}
        </Reveal>
        <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2 md:h-[620px]" data-testid="rooms-gallery">
          {list(room.imgs).slice(0, 4).map((src, i) => (
            <motion.div key={`${room.key}-${i}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: i * 0.07 }}
              className={`overflow-hidden rounded-[20px] ${i === 0 ? "aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : i === 3 ? "aspect-[4/3] md:col-span-2 md:aspect-auto" : "aspect-[4/3] md:aspect-auto"}`}>
              <img src={asset(src)} alt={`${room.label} idea ${i + 1}`} className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-105" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
