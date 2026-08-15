import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Subtle custom cursor — a small sewing dot with a thread-loop ring.
 * Optimized for performance with smooth spring physics.
 * Desktop / fine-pointer only. Hidden entirely for reduced-motion & touch.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  
  // Snappy trailing ring (faster response)
  const ringX = useSpring(x, { stiffness: 600, damping: 35, mass: 0.2 });
  const ringY = useSpring(y, { stiffness: 600, damping: 35, mass: 0.2 });
  
  // Instant inner dot
  const dotX = useSpring(x, { stiffness: 800, damping: 30 });
  const dotY = useSpring(y, { stiffness: 800, damping: 30 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    let lastTarget: Element | null = null;
    let isHovering = false;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      
      const t = e.target as Element | null;
      if (t !== lastTarget) {
        lastTarget = t;
        const shouldHover = !!t?.closest('a, button, [data-cursor="hover"], input, textarea, select, label');
        if (shouldHover !== isHovering) {
          isHovering = shouldHover;
          setHovering(isHovering);
        }
      }
    };
    
    const downH = () => setDown(true);
    const upH = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", downH, { passive: true });
    window.addEventListener("mouseup", upH, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", downH);
      window.removeEventListener("mouseup", upH);
      document.body.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[999] hidden md:block">
      {/* Trailing Ring (Sewing Stitches) */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          opacity: hovering ? 1 : 0.6,
          scale: down ? 0.8 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* We use an SVG circle with stroke-dasharray to simulate sewing thread */}
        <svg className="w-full h-full text-raspberry" viewBox="0 0 100 100" style={{ opacity: 0.6 }}>
          <circle 
            cx="50" cy="50" r="48" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeDasharray="10 8" 
          />
        </svg>
      </motion.div>
      {/* Core Dot */}
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-raspberry"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
