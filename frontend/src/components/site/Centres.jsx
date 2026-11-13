import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { RoundCta } from "./Fx";
import { Eyebrow, Reveal, rich } from "./Motion";
import { ConsultForm } from "./ConsultForm";
import { useContent, list } from "../../lib/content";
import { asset } from "../../lib/api";

const ease = [0.22, 1, 0.36, 1];
const FALLBACK = ["/projects/vinod-tv.jpg", "/projects/chai-interior-1.jpg", "/projects/thrissur-kitchen.jpg", "/projects/indrajith-2.jpg"];

const BigTitle = ({ text }) => (
  <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="font-display text-[15vw] font-semibold leading-[0.88] tracking-[-0.05em] text-[#130C08] md:text-[10vw]" data-testid="contact-big-title">
    {String(text).split(" ").map((w, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
        <motion.span className="inline-block" variants={{ hidden: { y: "108%" }, show: { y: "0%", transition: { duration: 1.5, delay: i * 0.1, ease } } }}>
          {rich(w, "font-serif-it font-normal italic text-[#50321F]")}&nbsp;
        </motion.span>
      </span>
    ))}
  </motion.h2>
);

const Photos = ({ imgs }) => (
  <div className="mt-12 flex h-[46vh] gap-3 md:h-[58vh]" data-testid="contact-photos">
    {imgs.map((src, i) => (
      <div key={src + i} className={`reveal-img group relative min-w-0 flex-1 overflow-hidden rounded-[20px] transition-[flex-grow] duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] hover:flex-[2.2] ${i > 1 ? "hidden sm:block" : ""}`} style={{ transitionDelay: `${i * 0.12}s` }}>
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    ))}
  </div>
);

const row = "flex gap-4 border-b border-[#CFC8BA] py-4";
const Details = ({ c }) => (
  <div className="flex flex-col" data-testid="contact-card">
    <div className={row}><MapPin className="mt-1 h-4 w-4 shrink-0 text-[#50321F]" /><p data-testid="contact-address">{c.address}</p></div>
    <div className={row}><Phone className="mt-1 h-4 w-4 shrink-0 text-[#50321F]" /><div className="flex flex-col">{list(c.phones).map((p, i) => <a key={`${p}-${i}`} href={`tel:${p.replace(/\s/g, "")}`} className="link-line w-fit" data-testid={`contact-phone-${i}`}>{p}</a>)}</div></div>
    <div className={row}><Mail className="mt-1 h-4 w-4 shrink-0 text-[#50321F]" /><a href={`mailto:${c.email}`} className="link-line w-fit break-all" data-testid="contact-email">{c.email}</a></div>
    <div className={row}><Globe className="mt-1 h-4 w-4 shrink-0 text-[#50321F]" /><a href={`https://${c.website}`} target="_blank" rel="noreferrer" className="link-line w-fit" data-testid="contact-website">{c.website}</a></div>
    <iframe title="POIESIZ Interiors location" src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery || c.address || "")}&output=embed`} className="mt-6 h-[260px] w-full rounded-[20px] border-0 grayscale" loading="lazy" data-testid="contact-map" />
  </div>
);

export const Centres = ({ onBook }) => {
  const c = useContent("contact");
  const formTitle = useContent("hero").formTitle;
  const imgs = list(c.photos).length ? list(c.photos).map(asset) : FALLBACK;
  return (
    <section id="studios" className="bg-[#E3E0D6] pb-20 pt-24 md:pb-28 md:pt-36" data-testid="centres-section">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <Reveal><p className="font-display text-xl text-[#50321F] md:text-2xl" data-testid="contact-kicker">{c.kicker}</p></Reveal>
        </div>
        <div className="mt-6"><BigTitle text={c.bigTitle} /></div>
        <div className="relative mt-8 flex flex-col gap-6 pt-6 md:flex-row md:items-center md:justify-between">
          <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease }} className="absolute inset-x-0 top-0 h-px origin-left bg-[#130C08]/40" />
          <RoundCta onClick={onBook} testId="contact-book-btn">Start your project</RoundCta>
          <div className="flex gap-6 font-mono text-xs lowercase tracking-[0.12em] text-[#6A5647]">
            <a href="#top" className="link-line hover:text-[#130C08]" data-testid="contact-link-top">[go on top]</a>
            <a href="#process" className="link-line hover:text-[#130C08]" data-testid="contact-link-process">[process]</a>
            <a href="#projects" className="link-line hover:text-[#130C08]" data-testid="contact-link-work">[work]</a>
          </div>
        </div>
        <Photos imgs={imgs} />
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h3 className="font-display text-3xl font-semibold tracking-tight text-[#130C08]">{c.title}</h3>
            {c.sub && <p className="mt-3 text-[#6A5647]">{c.sub}</p>}
            <div className="mt-6 text-[#130C08]"><Details c={c} /></div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div id="consult" className="rounded-[28px] bg-[#ECE9E1] p-6 md:p-10" data-testid="contact-form-card">
              <Eyebrow>free · no obligation</Eyebrow>
              <h3 className="mb-6 mt-3 font-display text-2xl font-semibold text-[#130C08] md:text-3xl">{formTitle}</h3>
              <ConsultForm id="contact" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
