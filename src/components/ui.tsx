import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef, type ReactNode, type ElementType } from "react";
import { cn } from "@/utils/cn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { scrollToTarget } from "@/lib/lenis";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ----------------------------------------------------------------
   Magnetic — gently pulls toward the cursor (desktop / fine pointer)
----------------------------------------------------------------- */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useMediaQuery("(pointer: fine)");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.3 });

  const onMove = (e: React.MouseEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

/* ----------------------------------------------------------------
   Button — primary / outline, magnetic, supports section + external links
----------------------------------------------------------------- */
export function Button({
  children,
  variant = "primary",
  to,
  href,
  onClick,
  type = "button",
  magnetic = true,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  variant?: "primary" | "outline";
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const cls = cn("btn", variant === "primary" ? "btn-primary" : "btn-outline", className);

  let el: ReactNode;
  if (to) {
    el = (
      <a
        href={`#${to}`}
        aria-label={ariaLabel}
        className={cls}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
          scrollToTarget(`#${to}`);
        }}
      >
        {children}
      </a>
    );
  } else if (href) {
    el = (
      <a href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel} className={cls}>
        {children}
      </a>
    );
  } else {
    el = (
      <button type={type} aria-label={ariaLabel} onClick={onClick} className={cls}>
        {children}
      </button>
    );
  }

  return magnetic ? <Magnetic strength={0.22}>{el}</Magnetic> : el;
}

/* ----------------------------------------------------------------
   MaskText — word-by-word masked reveal on scroll into view
----------------------------------------------------------------- */
export function MaskText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((w, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
          >
            <motion.span
              className="inline-block"
              style={{ willChange: "transform" }}
              initial={{ y: "115%" }}
              whileInView={{ y: 0 }}
              viewport={{ once, margin: "-8% 0px -8% 0px" }}
              transition={{ duration: 0.65, ease: EASE, delay: delay + i * stagger }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* ----------------------------------------------------------------
   Reveal — simple fade + rise
----------------------------------------------------------------- */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 26,
  once = true,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const MotionTag: any = (motion as any)[as as string] ?? motion.div;

  if (reduce) {
    const StaticTag: any = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/* ----------------------------------------------------------------
   RevealImage — clip-path wipe + scale on enter
----------------------------------------------------------------- */
export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  ratio = "3 / 4",
  delay = 0,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  delay?: number;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio: ratio }}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...({ fetchPriority: priority ? "high" : "low" } as any)}
        className={cn("h-full w-full object-cover", imgClassName)}
        initial={reduce ? false : { clipPath: "inset(100% 0 0 0)", scale: 1.18 }}
        whileInView={reduce ? undefined : { clipPath: "inset(0% 0 0 0)", scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{
          clipPath: { duration: 0.9, ease: EASE, delay },
          scale: { duration: 1.1, ease: EASE, delay },
        }}
      />
    </div>
  );
}

/* ----------------------------------------------------------------
   ParallaxImage — subtle scroll-linked drift, clipped + scaled
----------------------------------------------------------------- */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  ratio = "3 / 4",
  speed = 8,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  speed?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} style={{ aspectRatio: ratio }}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...({ fetchPriority: priority ? "high" : "low" } as any)}
        className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
        style={{ y: reduce ? 0 : y, scale: 1.18 }}
      />
    </div>
  );
}

/* ----------------------------------------------------------------
   Eyebrow — uppercase label with a short thread
----------------------------------------------------------------- */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-3", className)}>
      <span aria-hidden className="h-px w-8 bg-raspberry/45" />
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------
   ThreadLine — animated stitch divider (stitch dashes drawn on view)
----------------------------------------------------------------- */
export function ThreadLine({
  className,
  delay = 0,
  loop = false,
}: {
  className?: string;
  delay?: number;
  loop?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 240 14"
      preserveAspectRatio="none"
      className={cn("h-[14px] w-full", className)}
      aria-hidden="true"
    >
      <motion.path
        d="M2 7 H238"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="0.1 8"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ pathLength: { duration: 1.3, ease: EASE, delay }, opacity: { duration: 0.3, delay } }}
      />
      {loop && (
        <motion.circle
          cx="234"
          cy="7"
          r="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: delay + 1.1 }}
        />
      )}
    </svg>
  );
}

/* ----------------------------------------------------------------
   ThreadSquiggle — hand-drawn thread for hero annotations
----------------------------------------------------------------- */
export function ThreadSquiggle({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 200 40" className={className} fill="none" aria-hidden="true">
      <motion.path
        d="M4 28 C 36 6, 64 6, 92 22 S 150 40, 184 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="0.1 6"
        initial={reduce ? false : { pathLength: 0 }}
        animate={reduce ? undefined : { pathLength: 1 }}
        transition={{ duration: 1.5, ease: EASE, delay: 0.5 }}
      />
      <motion.circle
        cx="190"
        cy="8"
        r="4"
        fill="currentColor"
        initial={reduce ? false : { scale: 0 }}
        animate={reduce ? undefined : { scale: 1 }}
        transition={{ duration: 0.4, ease: EASE, delay: 1.9 }}
      />
    </svg>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }),
};
