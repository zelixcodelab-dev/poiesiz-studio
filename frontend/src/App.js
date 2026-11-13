import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@/App.css";
import { Nav } from "./components/site/Nav";
import { Hero } from "./components/site/Hero";
import { Marquee } from "./components/site/Marquee";
import { Trending } from "./components/site/Trending";
import { Estimator } from "./components/site/Estimator";
import { Projects } from "./components/site/Projects";
import { Rooms } from "./components/site/Rooms";
import { Featured } from "./components/site/Featured";
import { Styles } from "./components/site/Styles";
import { Vaastu } from "./components/site/Vaastu";
import { WhyUs } from "./components/site/WhyUs";
import { Centres } from "./components/site/Centres";
import { HowItWorks } from "./components/site/HowItWorks";
import { Faq } from "./components/site/Faq";
import { Footer } from "./components/site/Footer";
import { Services } from "./components/site/Services";
import { Ongoing } from "./components/site/Ongoing";
import { BookDialog } from "./components/site/BookDialog";
import { Intro, RouteCurtain, useImageReveal } from "./components/site/Transitions";
import { motion, MotionConfig } from "framer-motion";
import PriceCalculator from "./pages/PriceCalculator";
import ProjectDetail from "./pages/ProjectDetail";
import AdminApp from "./admin/AdminApp";
import { ContentProvider, useContent, list } from "./lib/content";
import { SECTION_LABELS } from "./data/defaults";

const SECTIONS = {
  marquee: Marquee, services: Services, projects: Projects, featured: Featured, trending: Trending, estimator: Estimator,
  rooms: Rooms, styles: Styles, clients: Vaastu, why: WhyUs, ongoing: Ongoing, how: HowItWorks, contact: Centres, faq: Faq,
};

const Home = ({ onBook }) => {
  const saved = list(useContent("sections").items).filter((s) => SECTIONS[s?.id]);
  const missing = Object.keys(SECTION_LABELS).filter((id) => !saved.some((s) => s.id === id)).map((id) => ({ id, visible: true }));
  return (
    <main>
      <Hero />
      {[...saved, ...missing].filter((s) => s.visible !== false).map((s) => {
        const C = SECTIONS[s.id];
        return <C key={s.id} onBook={onBook} />;
      })}
    </main>
  );
};

const Shell = () => {
  const [open, setOpen] = useState(false);
  const book = () => setOpen(true);
  const { pathname, hash } = useLocation();
  const home = pathname === "/";

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -70 } });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return undefined; }
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 120);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  useImageReveal(pathname);

  return (
    <MotionConfig reducedMotion="user">
    <div className="grain bg-[#ECE9E1] font-body text-[#130C08]">
      <Intro />
      <RouteCurtain k={pathname} />
      <Nav onBook={book} home={home} />
      <motion.div key={pathname} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      <Routes>
        <Route path="/" element={<Home onBook={book} />} />
        <Route path="/price-calculator" element={<PriceCalculator onBook={book} />} />
        <Route path="/projects/:slug" element={<ProjectDetail onBook={book} />} />
        <Route path="*" element={<Home onBook={book} />} />
      </Routes>
      </motion.div>
      <Footer onBook={book} home={home} />
      <BookDialog open={open} onOpenChange={setOpen} />
      <Toaster position="top-center" richColors />
    </div>
    </MotionConfig>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="*" element={<Shell />} />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  );
}

export default App;
