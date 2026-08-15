import type Lenis from "lenis";

/**
 * Lightweight Lenis singleton. Components (nav links, buttons) call
 * `scrollToTarget` for smooth anchor navigation. The SmoothScroll provider
 * registers / clears the active instance.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smoothly scroll to a selector, element, or pixel offset. */
export function scrollToTarget(
  target: string | number | HTMLElement,
  offset = -72
) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: prefersReduced() ? 0 : 1.2 });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: prefersReduced() ? "auto" : "smooth" });
    return;
  }

  if (typeof target === "string") {
    const el = document.querySelector(target);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: prefersReduced() ? "auto" : "smooth" });
    }
  }
}
