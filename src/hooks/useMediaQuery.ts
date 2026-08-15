import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook. Returns false on the first render and updates
 * after mount so desktop-only features (custom cursor, magnetic hover,
 * pinned horizontal scroll) never flash on mobile.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMatches(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
