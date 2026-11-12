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
import PriceCalculator from "./pages/PriceCalculator";

const Home = ({ onBook }) => (
  <main>
    <Hero />
    <Marquee />
    <Services />
    <Projects />
    <Featured />
    <Trending />
    <Estimator onBook={onBook} />
    <Rooms />
    <Styles />
    <Vaastu onBook={onBook} />
    <WhyUs />
    <Ongoing />
    <HowItWorks />
    <Centres onBook={onBook} />
    <Faq onBook={onBook} />
  </main>
);

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

  return (
    <div className="grain bg-[#FBF9F5] font-body text-[#1A1918]">
      <Nav onBook={book} home={home} />
      <Routes>
        <Route path="/" element={<Home onBook={book} />} />
        <Route path="/price-calculator" element={<PriceCalculator onBook={book} />} />
        <Route path="*" element={<Home onBook={book} />} />
      </Routes>
      <Footer onBook={book} home={home} />
      <BookDialog open={open} onOpenChange={setOpen} />
      <Toaster position="top-center" richColors />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}

export default App;
