import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow, MaskText, Reveal, RevealImage, ThreadLine } from "@/components/ui";
import { images } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const philosophy = [
  {
    n: "01",
    title: "Thoughtful details",
    body: "Hand-finished touches that make a piece feel considered, never rushed.",
  },
  {
    n: "02",
    title: "Flattering shapes",
    body: "Silhouettes drafted around your proportions and the way you naturally move.",
  },
  {
    n: "03",
    title: "Personal to you",
    body: "Colour, fabric, and mood chosen around your story and the moment.",
  },
];

function MeasuringTape() {
  const reduce = useReducedMotion();
  const ticks = Array.from({ length: 20 }, (_, i) => 60 + i * 14);
  return (
    <svg viewBox="0 0 374 70" className="h-auto w-full" aria-hidden="true" fill="none">
      {/* tape roll */}
      <motion.circle
        cx="30"
        cy="35"
        r="22"
        stroke="currentColor"
        strokeWidth="1.6"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformOrigin: "30px 35px" }}
      />
      <motion.circle cx="30" cy="35" r="6" fill="currentColor" />

      {/* tape strip */}
      <motion.path
        d="M48 35 H360"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
      />
      {/* ticks */}
      {ticks.map((x, i) => (
        <motion.line
          key={x}
          x1={x}
          y1={i % 2 ? 30 : 27}
          x2={x}
          y2={i % 2 ? 40 : 43}
          stroke="currentColor"
          strokeWidth="1.3"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.3 + i * 0.03 }}
        />
      ))}
    </svg>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative">
              <RevealImage
                src={images.aboutPortrait}
                alt="Aye Sandar Tun sketching a dress design among fabric swatches and a measuring tape"
                ratio="4 / 5"
                className="border border-line"
              />
              <div className="absolute -bottom-10 right-0 w-44 text-raspberry/60 lg:w-56">
                <MeasuringTape />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Eyebrow>The Designer</Eyebrow>
            <h2 id="about-heading" className="display-1 mt-6">
              <MaskText text="Designs that begin with you." />
            </h2>

            <Reveal delay={0.1}>
              <p className="measure mt-7 text-lg leading-relaxed text-muted">
                I'm Aye Sandar Tun, a fashion designer creating custom pieces for
                celebrations, meaningful moments, and everyday confidence. From the
                first sketch to the final fitting, I focus on thoughtful details,
                flattering shapes, and designs that feel personal to the person
                wearing them.
              </p>
            </Reveal>

            <dl className="mt-10 grid gap-7 sm:grid-cols-3">
              {philosophy.map((p, i) => (
                <Reveal key={p.n} delay={0.15 + i * 0.1}>
                  <div>
                    <span className="font-display text-sm text-raspberry">{p.n}</span>
                    <dt className="mt-2 font-display text-xl text-ink">{p.title}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.3}>
              <div className="mt-10">
                <p className="hand text-4xl text-ink">Aye Sandar Tun</p>
                <ThreadLine className="mt-1 h-3 w-44 text-raspberry/50" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
