import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
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
import { Reviews } from "./components/site/Reviews";
import { Faq } from "./components/site/Faq";
import { Footer } from "./components/site/Footer";
import { BookDialog } from "./components/site/BookDialog";

function App() {
  const [open, setOpen] = useState(false);
  const book = () => setOpen(true);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -70 } });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  return (
    <div className="grain bg-[#FBF9F5] font-body text-[#1A1918]">
      <Nav onBook={book} />
      <main>
        <Hero />
        <Marquee />
        <Trending />
        <Estimator onBook={book} />
        <Projects />
        <Rooms />
        <Featured />
        <Styles />
        <Vaastu onBook={book} />
        <WhyUs />
        <Centres onBook={book} />
        <HowItWorks />
        <Reviews />
        <Faq onBook={book} />
      </main>
      <Footer onBook={book} />
      <BookDialog open={open} onOpenChange={setOpen} />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
