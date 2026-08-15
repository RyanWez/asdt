import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow, MaskText, Reveal } from "@/components/ui";
import { filters, projects, type Category, type Project } from "@/lib/content";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/utils/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

const accentDot: Record<Project["accent"], string> = {
  raspberry: "bg-raspberry",
  lilac: "bg-lilac-deep",
  sage: "bg-sage-deep",
  apricot: "bg-apricot-deep",
};

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cn("group block w-full text-left", p.offset)}
    >
      <div className="relative overflow-hidden border border-line">
        <div style={{ aspectRatio: p.ratio }} className="overflow-hidden">
          <img
            src={p.image}
            alt={`${p.title} — ${p.categoryLabel} by Aye Sandar Tun`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
          />
        </div>

        {/* Hover / focus overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end gap-1 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent p-5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:hidden">
          <span className="eyebrow text-ivory/80">{p.categoryLabel}</span>
          <span className="font-display text-2xl leading-tight text-ivory">{p.title}</span>
          <span className="mt-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-ivory/70">
            View piece
            <span aria-hidden className="inline-block">→</span>
          </span>
        </div>
      </div>

      {/* Always-visible caption */}
      <div className="mt-4 flex items-center gap-2.5">
        <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", accentDot[p.accent])} />
        <span className="text-[0.7rem] uppercase tracking-[0.22em] text-muted">{p.categoryLabel}</span>
      </div>
      <h3 className="mt-1.5 font-display text-xl text-ink transition-colors group-hover:text-raspberry">
        {p.title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{p.story}</p>
    </motion.button>
  );
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        aria-label="Close project details"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${p.title} details`}
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-ivory sm:rounded-3xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative aspect-[3/4] sm:aspect-auto">
            <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col p-7 sm:p-9">
            <div className="flex items-center gap-2.5">
              <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", accentDot[p.accent])} />
              <span className="text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                {p.categoryLabel}
              </span>
            </div>
            <h3 className="mt-2 font-display text-3xl text-ink">{p.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.story}</p>

            <dl className="mt-7 space-y-4 border-t border-line pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Fabric & material</dt>
                <dd className="text-right font-500 text-ink">{p.fabric}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Occasion</dt>
                <dd className="text-right font-500 text-ink">{p.occasion}</dd>
              </div>
            </dl>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ivory/90 text-ink transition-colors hover:border-raspberry hover:text-raspberry"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

export function Collections() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [active, setActive] = useState<Project | null>(null);

  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="collections" aria-labelledby="collections-heading" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Eyebrow>Featured Collections</Eyebrow>
            <h2 id="collections-heading" className="display-1 mt-6">
              <MaskText text="A look at recent pieces." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="measure max-w-sm text-muted">
              Evening gowns, occasion dresses, everyday staples and custom creations —
              each designed and made in the studio.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3" role="group" aria-label="Filter collections">
          {filters.map((f) => {
            const isActive = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={isActive}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm font-500 transition-colors duration-200",
                  isActive
                    ? "border-raspberry bg-raspberry text-ivory"
                    : "border-line text-ink/75 hover:border-raspberry/60 hover:text-raspberry"
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-14 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <ProjectCard key={p.id} p={p} onOpen={() => setActive(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal p={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
