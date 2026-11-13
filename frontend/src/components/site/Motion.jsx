import { motion } from "framer-motion";

export const rich = (s, cls) => String(s ?? "").split(/(\*[^*]+\*)/).map((p, i) => (p.length > 2 && p.startsWith("*") && p.endsWith("*") ? <span key={i} className={cls}>{p.slice(1, -1)}</span> : p));

const ease = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, className = "", y = 28 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0.001, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 1.4, delay, ease }}
  >
    {children}
  </motion.div>
);

export const MaskLines = ({ lines, className = "", delay = 0.2, as: Tag = "h1", testId }) => (
  <Tag className={className} data-testid={testId}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.08em]">
        <motion.span
          className="block"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.5, delay: delay + i * 0.18, ease }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </Tag>
);

export const Eyebrow = ({ children, light }) => (
  <p className={`font-mono text-xs lowercase tracking-[0.14em] ${light ? "text-[#D8C3A5]" : "text-[#50321F]"}`}>[{children}]</p>
);

const wordV = { hidden: { y: "105%" }, show: (i) => ({ y: "0%", transition: { duration: 1.3, delay: i * 0.08, ease } }) };

const Words = ({ text }) => (
  <>
    {String(text).split(" ").map((w, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
        <motion.span className="inline-block" variants={wordV} custom={i}>{w}&nbsp;</motion.span>
      </span>
    ))}
  </>
);

export const SectionHead = ({ eyebrow, title, sub, light, right }) => (
  <Reveal className="relative mb-10 flex flex-col gap-6 pb-8 md:mb-14 md:flex-row md:items-end md:justify-between">
    <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1.8, delay: 0.2, ease }} className={`absolute inset-x-0 bottom-0 h-px origin-left ${light ? "bg-white/20" : "bg-[#CFC8BA]"}`} />
    <div className="max-w-3xl space-y-4">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className={`font-display text-4xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-6xl ${light ? "text-[#ECE9E1]" : "text-[#130C08]"}`}>{typeof title === "string" ? <Words text={title} /> : title}</motion.h2>
      {sub && <motion.p initial={{ opacity: 0.001, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1.2, delay: 0.35, ease }} className={`text-base md:text-lg ${light ? "text-[#D9D3C7]" : "text-[#6A5647]"}`}>{sub}</motion.p>}
    </div>
    {right}
  </Reveal>
);
