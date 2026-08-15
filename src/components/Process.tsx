import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Eyebrow, MaskText, Reveal } from "@/components/ui";
import { processSteps } from "@/lib/content";

function DesktopTrack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [step, setStep] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const progressSpring = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  useMotionValueEvent(progressSpring, "change", (v) => {
    const next = Math.min(5, Math.max(1, Math.round(v * 4) + 1));
    setStep((s) => (s === next ? s : next));
  });

  useEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 64));
      }
    };
    calc();
    const t = setTimeout(calc, 500);
    window.addEventListener("resize", calc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", calc);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative hidden h-[340vh] lg:block">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-8">
          <span className="eyebrow">The Process</span>
          <span className="font-display text-base text-muted">
            <span className="text-raspberry">0{step}</span> / 05
          </span>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="relative mt-16 flex w-max items-start">
          {/* Drawing thread */}
          <div
            aria-hidden
            className="absolute left-0 top-[19px] h-[2px] w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, oklch(89% 0.025 350) 0 10px, transparent 10px 20px)",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute left-0 top-[18px] h-[3px] w-full origin-left bg-raspberry"
            style={{ scaleX: progressSpring }}
          />

          {processSteps.map((s) => (
            <article
              key={s.index}
              className="relative w-[34rem] shrink-0 pl-[6vw] pr-[3vw] first:pl-[9vw] last:pr-[9vw]"
            >
              <div className="flex h-10 items-center">
                <span className="relative z-10 h-3.5 w-3.5 rounded-full border-2 border-raspberry bg-ivory" />
              </div>
              <span className="block font-display text-7xl leading-none text-line">{s.index}</span>
              <h3 className="mt-5 font-display text-3xl text-ink">{s.title}</h3>
              <p className="measure mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function MobileTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  return (
    <div ref={ref} className="relative mx-auto max-w-md px-5 py-6 lg:hidden">
      <div aria-hidden className="absolute bottom-12 left-[1.69rem] top-3 w-px bg-line" />
      <motion.div
        aria-hidden
        className="absolute left-[1.69rem] top-3 w-px origin-top bg-raspberry"
        style={{ height: "calc(100% - 3.75rem)", scaleY }}
      />
      <div className="space-y-0">
        {processSteps.map((s, i) => (
          <Reveal key={s.index} delay={i * 0.05} className="relative flex gap-5 pb-11 last:pb-0">
            <span className="relative z-10 mt-2 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-raspberry bg-ivory" />
            <div>
              <span className="font-display text-4xl leading-none text-raspberry/30">{s.index}</span>
              <h3 className="mt-2 font-display text-2xl text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="scroll-mt-24 py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <Eyebrow>Design Process</Eyebrow>
          <h2 id="process-heading" className="display-1 mt-6">
            <MaskText text="From idea to final fitting." />
          </h2>
          <p className="measure mt-6 text-lg text-muted">
            A calm, clear journey in five steps — flowing as one continuous line
            from your first idea to the finished piece.
          </p>
        </div>
      </div>

      <DesktopTrack />
      <MobileTimeline />
    </section>
  );
}
