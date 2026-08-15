import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow, MaskText } from "@/components/ui";
import { services, type Service } from "@/lib/content";
import { cn } from "@/utils/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

const accentTint: Record<Service["accent"], string> = {
  raspberry: "from-raspberry/25",
  lilac: "from-lilac/40",
  sage: "from-sage/40",
  apricot: "from-apricot/45",
};

const swatches = [
  { name: "Raspberry", cls: "bg-raspberry" },
  { name: "Lilac", cls: "bg-lilac" },
  { name: "Sage", cls: "bg-sage" },
  { name: "Apricot", cls: "bg-apricot" },
];

export function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? open ?? 0;
  const current = services[active];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 border-y border-line bg-ivory-deep/50 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <Eyebrow>Services</Eyebrow>
          <h2 id="services-heading" className="display-1 mt-6">
            <MaskText text="Made for Your Moment." />
          </h2>
          <p className="measure mt-6 text-lg text-muted">
            Every service is personal — whether it's a gown for one unforgettable night
            or a wardrobe of pieces made to live in.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Accordion list */}
          <div>
            {services.map((s, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={s.id}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="border-t border-line last:border-b"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${s.id}`}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className={cn("font-display text-sm", isOpen ? "text-raspberry" : "text-muted")}>
                        {s.index}
                      </span>
                      <span
                        className={cn(
                          "font-display text-2xl transition-colors duration-300 sm:text-3xl",
                          isOpen ? "text-ink" : "text-ink/80"
                        )}
                      >
                        {s.title}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        isOpen ? "rotate-180 border-raspberry text-raspberry" : "border-line text-ink"
                      )}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1 V11 M1 6 H11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className={cn("transition-opacity duration-300", isOpen && "opacity-0")} />
                        <path d="M1 6 H11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`service-panel-${s.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pr-6">
                          <p className="font-display text-xl text-ink">{s.benefit}</p>
                          <p className="measure mt-3 text-[15px] leading-relaxed text-muted">{s.detail}</p>

                          <div className="mt-5 flex items-center gap-3">
                            <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted">Swatches</span>
                            <div className="flex gap-2">
                              {swatches.map((sw) => (
                                <span
                                  key={sw.name}
                                  title={sw.name}
                                  aria-label={sw.name}
                                  className={cn("h-5 w-5 rounded-full ring-1 ring-inset ring-ink/10", sw.cls)}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Image panel */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="relative aspect-[4/5] overflow-hidden border border-line">
              <AnimatePresence>
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={`${current.title} — example garment detail by Aye Sandar Tun`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </AnimatePresence>
              <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent", accentTint[current.accent])} />
              <div className="absolute bottom-0 left-0 flex items-center gap-3 p-5">
                <span className="font-display text-sm text-raspberry">{current.index}</span>
                <span className="font-display text-xl text-ivory">{current.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
