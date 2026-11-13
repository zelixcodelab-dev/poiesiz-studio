import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1];

export const Intro = () => {
  const [show] = useState(() => !sessionStorage.getItem("poiesiz_intro"));
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!show) return undefined;
    sessionStorage.setItem("poiesiz_intro", "1");
    const t0 = performance.now();
    let id;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1300);
      setN(Math.round(p * 100));
      if (p < 1) id = requestAnimationFrame(tick); else setDone(true);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [show]);
  if (!show) return null;
  return (
    <motion.div initial={{ y: 0 }} animate={{ y: done ? "-100%" : 0 }} transition={{ duration: 1, ease, delay: done ? 0.15 : 0 }}
      className="pointer-events-none fixed inset-0 z-[80] flex flex-col justify-between bg-[#111111] p-6 md:p-10" data-testid="intro-curtain">
      <motion.img initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} src="/brand/logo-light.png" alt="" className="h-12 w-auto self-start md:h-14" />
      <div className="flex items-end justify-between">
        <p className="max-w-xs font-mono text-xs uppercase tracking-[0.22em] text-[#BFB8AB]">Modern &amp; custom interiors · Kochi</p>
        <p className="font-display text-7xl font-semibold leading-none text-[#FEBD1C] md:text-[10rem]" data-testid="intro-counter">{n}</p>
      </div>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: n / 100 }} transition={{ ease: "linear", duration: 0.05 }} className="absolute bottom-0 left-0 h-1 w-full origin-left bg-[#FEBD1C]" />
    </motion.div>
  );
};

export const RouteCurtain = ({ k }) => (
  <motion.div key={k} initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.9, ease, delay: 0.05 }}
    className="pointer-events-none fixed inset-0 z-[75] origin-top bg-[#FEBD1C]" data-testid="route-curtain" />
);

export const useImageReveal = (dep) => {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll(":scope > .reveal-img, :scope .reveal-img").forEach((el) => el.classList.add("is-in"));
        io.unobserve(e.target);
      });
    }, { threshold: 0.05 });
    const scan = () => document.querySelectorAll(".reveal-img:not(.is-in)").forEach((el) => {
      document.documentElement.classList.add("reveal-ready");
      io.observe(el.parentElement ?? el);
    });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    const safety = setTimeout(() => document.querySelectorAll(".reveal-img").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-in");
    }), 2500);
    return () => { io.disconnect(); mo.disconnect(); clearTimeout(safety); };
  }, [dep]);
};
