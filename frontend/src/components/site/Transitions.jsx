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
      const p = Math.min(1, (t - t0) / 1800);
      setN(Math.round(p * 100));
      if (p < 1) id = requestAnimationFrame(tick); else setDone(true);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [show]);
  if (!show) return null;
  return (
    <motion.div initial={{ y: 0 }} animate={{ y: done ? "-100%" : 0 }} transition={{ duration: 1.5, ease, delay: done ? 0.3 : 0 }}
      className="pointer-events-none fixed inset-0 z-[80] flex flex-col justify-between bg-[#130C08] p-6 md:p-10" data-testid="intro-curtain">
      <motion.img initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} src="/brand/logo-light.png" alt="" className="h-12 w-auto self-start md:h-14" />
      <div className="flex items-end justify-between">
        <p className="max-w-xs font-mono text-xs uppercase tracking-[0.22em] text-[#AEA496]">Modern &amp; custom interiors · Kochi</p>
        <p className="font-display text-7xl font-semibold leading-none text-[#E3E0D6] md:text-[10rem]" data-testid="intro-counter">{n}</p>
      </div>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: n / 100 }} transition={{ ease: "linear", duration: 0.05 }} className="absolute bottom-0 left-0 h-1 w-full origin-left bg-[#8C6E57]" />
    </motion.div>
  );
};

export const RouteCurtain = ({ k }) => (
  <>
    <motion.div key={`${k}-a`} initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 1.3, ease, delay: 0.25 }}
      className="pointer-events-none fixed inset-0 z-[75] origin-top bg-[#50321F]" data-testid="route-curtain" />
    <motion.div key={`${k}-b`} initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 1.1, ease, delay: 0.05 }}
      className="pointer-events-none fixed inset-0 z-[76] origin-top bg-[#E3E0D6]" />
  </>
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
