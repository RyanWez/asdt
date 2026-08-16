import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui";
import { nav, site, social } from "@/lib/content";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { cn } from "@/utils/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section highlighting
  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    if (id === "top") {
      wasOpen ? setTimeout(() => scrollToTarget(0), 120) : scrollToTarget(0);
    } else {
      wasOpen ? setTimeout(() => scrollToTarget(`#${id}`), 120) : scrollToTarget(`#${id}`);
    }
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-raspberry focus:px-5 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed left-1/2 top-4 z-[80] w-[calc(100%-2rem)] max-w-[1400px] -translate-x-1/2 rounded-full transition-all duration-500",
          scrolled
            ? "border border-line/80 bg-ivory/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md"
            : "border border-transparent bg-transparent"
        )}
      >
        <nav className="flex items-center justify-between px-5 py-3 sm:px-8">
          {/* Wordmark */}
          <a
            href="#top"
            onClick={go("top")}
            className="group flex flex-col leading-none"
            aria-label={`${site.name} — home`}
          >
            <span className="font-display text-xl font-600 tracking-tight text-ink md:text-2xl">
              {site.name}
            </span>
            <span className="mt-0.5 text-[0.6rem] font-500 uppercase tracking-[0.3em] text-muted">
              {site.role}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={go(item.id)}
                data-active={active === item.id}
                className="link-underline text-sm font-500 tracking-wide text-ink/85 transition-colors hover:text-raspberry data-[active=true]:text-raspberry"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button to="contact" className="px-5 py-3 text-sm">
                Book a Design
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            >
              <span className="relative flex flex-col justify-between w-5 h-3.5 overflow-hidden">
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-full bg-ink transition-all duration-300 origin-center",
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-ink transition-all duration-300",
                    open ? "opacity-0 translate-x-4" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-full bg-ink transition-all duration-300 origin-center",
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[75] flex flex-col bg-ivory px-6 pb-10 pt-24 lg:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <nav className="flex flex-col">
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: EASE }}
                  className="border-b border-line/70 py-4 font-display text-3xl text-ink"
                >
                  <span className="mr-3 align-middle text-xs text-raspberry">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mt-auto flex flex-col gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
            >
              <Button to="contact" magnetic={false} className="w-full">
                Book a Design
              </Button>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                {social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-raspberry">
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
