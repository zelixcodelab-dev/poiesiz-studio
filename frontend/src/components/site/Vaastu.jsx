import { Compass, Check } from "lucide-react";
import { Reveal, Eyebrow } from "./Motion";

export const Vaastu = ({ onBook }) => (
  <section className="px-5 md:px-10" data-testid="vaastu-section">
    <Reveal className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] bg-[#C85A32] px-6 py-14 md:px-14 md:py-20">
      <Compass className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 text-white/10 md:h-[28rem] md:w-[28rem]" strokeWidth={0.6} />
      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs text-white">Limited slots this week</span>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">A Vaastu guide for a calmer, balanced home</h2>
          <p className="max-w-lg text-white/90 md:text-lg">Room-by-room direction tips and simple remedies, reviewed with you by a designer.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={onBook} className="rounded-full bg-[#FBF9F5] px-6 py-3.5 font-medium text-[#1A1918] transition-colors duration-300 hover:bg-[#1A1918] hover:text-white" data-testid="vaastu-guide-btn">Get the Vaastu Guide</button>
            <button onClick={onBook} className="rounded-full border border-white/60 px-6 py-3.5 font-medium text-white transition-colors duration-300 hover:bg-white/10" data-testid="vaastu-expert-btn">Talk to an Expert</button>
          </div>
        </div>
        <div className="rounded-[24px] bg-[#FBF9F5]/10 p-6 backdrop-blur-md md:p-8">
          <Eyebrow light>What you get</Eyebrow>
          <ul className="mt-5 space-y-4">
            {["A personalised Vaastu checklist for your floor plan", "Colour and furniture placement suggestions", "A free 1:1 session with a designer"].map((t) => (
              <li key={t} className="flex items-start gap-3 text-white"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#C85A32]"><Check className="h-3.5 w-3.5" /></span>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  </section>
);
