import { Eyebrow, MaskText, Reveal } from "@/components/ui";
import { testimonials } from "@/lib/content";
import { cn } from "@/utils/cn";

const layout = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-20",
  "lg:col-span-6 lg:col-start-4 lg:mt-8",
];

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-xl">
          <Eyebrow>Kind Words</Eyebrow>
          <h2 id="testimonials-heading" className="display-2 mt-6">
            <MaskText text="From the people who wore them." />
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-12">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className={cn(layout[i], i === 0 && "")}>
              <figure className="flex h-full flex-col">
                <span aria-hidden className="font-display text-6xl leading-[0.6] text-raspberry/30">
                  &ldquo;
                </span>
                <blockquote
                  className={cn(
                    "mt-3 font-display leading-snug text-ink",
                    i === 0 ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
                  )}
                >
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                  <span className="font-600 text-ink">{t.name}</span>
                  <span className="text-muted"> — {t.outfit}</span>
                  <span className="mt-0.5 block text-xs uppercase tracking-[0.18em] text-muted">
                    {t.event}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
