import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button, Eyebrow, MaskText, ThreadSquiggle } from "@/components/ui";
import { images, site } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yDetail = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-32 sm:px-8 lg:min-h-screen lg:pb-24 lg:pt-40">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8"
        >
          {/* Copy */}
          <motion.div
            style={{ y: reduce ? 0 : yCopy, opacity: reduce ? 1 : fade }}
            className="order-1 lg:col-span-7"
          >
            <div className="flex items-center gap-4">
              <Eyebrow>Custom Atelier</Eyebrow>
              <span className="burmese text-sm text-muted">{site.nameBurmese}</span>
            </div>

            <h1 id="hero-heading" className="display-hero mt-6">
              <MaskText text="Designed to Feel" className="block" />
              <span className="mt-1 block">
                <MaskText text="Like" />{" "}
                <MaskText text="You." className="font-500 italic text-raspberry" delay={0.18} />
              </span>
            </h1>

            <motion.p
              className="measure mt-7 max-w-[52ch] text-lg leading-relaxed text-muted"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            >
              Custom evening wear, occasion pieces, and everyday clothing,
              thoughtfully designed and made by Aye Sandar Tun.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.62 }}
            >
              <Button to="collections">Explore My Work</Button>
              <Button to="contact" variant="outline">
                Start Your Design
              </Button>
            </motion.div>

            {/* Handwritten annotation */}
            <motion.div
              className="mt-12 flex items-end gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <ThreadSquiggle className="h-7 w-24 shrink-0 text-sage-deep sm:w-32" />
              <p className="hand text-2xl leading-tight text-ink sm:text-3xl">
                Made with care, shaped around you.
              </p>
            </motion.div>
          </motion.div>

          {/* Images */}
          <div className="relative order-2 lg:col-span-5">
            <motion.div style={{ y: reduce ? 0 : yPortrait }}>
              <figure className="relative border border-line bg-ivory p-2.5">
                <img
                  src={images.heroPortrait}
                  alt="Aye Sandar Tun's flowing raspberry-rose evening gown, photographed in a sunlit studio"
                  width={640}
                  height={853}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover"
                />
              </figure>
            </motion.div>

            <motion.div
              style={{ y: reduce ? 0 : yDetail }}
              className="relative -mt-20 ml-auto w-2/3 sm:absolute sm:-left-10 sm:bottom-12 sm:mt-0 sm:w-44"
            >
              <figure className="relative">
                <div className="overflow-hidden border border-line bg-ivory p-2 shadow-[0_18px_40px_-28px_rgba(40,20,30,0.45)]">
                  <img
                    src={images.heroDetail}
                    alt="Macro detail of hand stitching across soft lilac and ivory silk"
                    width={300}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-raspberry" />
                  Hand-finished detail
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted">Scroll</span>
        <motion.span
          className="h-10 w-px bg-raspberry/50"
          animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3], transformOrigin: "top" }}
          transition={{ duration: 1.8, repeat: Infinity, ease: EASE }}
        />
      </motion.div>
    </section>
  );
}
