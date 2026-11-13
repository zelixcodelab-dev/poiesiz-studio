import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fine = () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

export const RollText = ({ text, alt = "#50321F" }) => (
  <span className="roll-link" style={{ "--roll": alt }} aria-label={text}>
    {String(text).split("").map((ch, i) => (
      <span key={i} aria-hidden="true" className="rl-ch" style={{ transitionDelay: `${i * 18}ms` }}>{ch === " " ? "\u00a0" : ch}</span>
    ))}
  </span>
);

export const RoundCta = ({ children, onClick, href, dark = false, testId }) => {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const move = (e) => {
    if (!fine() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.18);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };
  const Tag = href ? motion.a : motion.button;
  const ink = dark ? "border-[#ECE9E1] text-[#ECE9E1]" : "border-[#130C08] text-[#130C08]";
  return (
    <Tag ref={ref} href={href} onClick={onClick} onMouseMove={move} onMouseLeave={reset} style={{ x, y }} data-testid={testId} data-dark={dark ? "true" : "false"}
      className={`cta-round group inline-flex w-fit items-center gap-3 rounded-full border py-2 pl-6 pr-2 font-medium ${ink}`}>
      <span className="relative z-10">{children}</span>
      <span className="cta-dot relative z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#FEBD1C] text-[#130C08]">
        <ArrowRight className="cta-arrow h-4 w-4" />
        <ArrowRight className="cta-arrow-2 absolute h-4 w-4" />
      </span>
    </Tag>
  );
};

export const ParallaxImg = ({ src, alt = "", className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <div ref={ref} className={`relative h-full w-full overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.16 }} className="h-full w-full object-cover" />
    </div>
  );
};

export const useViewCursor = () => {
  const [on, setOn] = useState(false);
  const x = useSpring(useMotionValue(-100), { stiffness: 300, damping: 30 });
  const y = useSpring(useMotionValue(-100), { stiffness: 300, damping: 30 });
  const bind = {
    onMouseMove: (e) => { if (!fine()) return; x.set(e.clientX); y.set(e.clientY); setOn(true); },
    onMouseLeave: () => setOn(false),
  };
  const cursor = (
    <motion.div aria-hidden="true" style={{ x, y, translateX: "-50%", translateY: "-50%" }} animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-24 w-24 items-center justify-center rounded-full bg-[#130C08]/85 font-mono text-[11px] uppercase tracking-[0.2em] text-[#ECE9E1] backdrop-blur md:flex" data-testid="view-cursor">
      View
    </motion.div>
  );
  return { bind, cursor };
};
