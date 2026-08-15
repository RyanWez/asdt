import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Progress thread — a slim vertical line on the left (desktop) that draws
 * downward with scroll, plus a thin top bar on mobile.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const needleTop = useTransform(scaleY, (v) => `calc(${v * 100}% - 5px)`);

  return (
    <>
      {/* Mobile / tablet top bar */}
      <motion.div
        aria-hidden
        className="fixed left-0 top-0 z-[90] h-[2px] w-full origin-left bg-raspberry md:hidden"
        style={{ scaleX: scaleY }}
      />

      {/* Desktop vertical thread */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-5 top-0 z-[55] hidden h-screen md:block"
      >
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
        <motion.div
          className="absolute left-1/2 top-0 w-px origin-top -translate-x-1/2 bg-raspberry"
          style={{ height: "100%", scaleY }}
        />
        <motion.div
          className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-raspberry bg-ivory"
          style={{ top: needleTop }}
        />
      </div>
    </>
  );
}
