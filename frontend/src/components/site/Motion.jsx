import { motion } from "framer-motion";

export const rich = (s, cls) => String(s ?? "").split(/(\*[^*]+\*)/).map((p, i) => (p.length > 2 && p.startsWith("*") && p.endsWith("*") ? <span key={i} className={cls}>{p.slice(1, -1)}</span> : p));

const ease = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, className = "", y = 28 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0.001, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.9, delay, ease }}
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
          transition={{ duration: 1.1, delay: delay + i * 0.12, ease }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </Tag>
);

export const Eyebrow = ({ children, light }) => (
  <p className={`font-mono text-xs uppercase tracking-[0.22em] ${light ? "text-[#FEBD1C]" : "text-[#8A6200]"}`}>{children}</p>
);

export const SectionHead = ({ eyebrow, title, sub, light, right }) => (
  <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
    <div className="max-w-2xl space-y-4">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${light ? "text-[#FBF9F5]" : "text-[#1A1918]"}`}>{title}</h2>
      {sub && <p className={`text-base md:text-lg ${light ? "text-[#D9D3C7]" : "text-[#6E6B65]"}`}>{sub}</p>}
    </div>
    {right}
  </Reveal>
);
