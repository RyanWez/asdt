import { Eyebrow, MaskText, ParallaxImage, Reveal, ThreadLine } from "@/components/ui";
import { images } from "@/lib/content";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="relative scroll-mt-24 overflow-hidden bg-cream py-24 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Quote */}
          <div className="lg:col-span-7">
            <Eyebrow>Design Philosophy</Eyebrow>

            <h2 id="philosophy-heading" className="display-1 mt-7">
              <MaskText text="Beautiful clothing" className="block" />
              <MaskText text="should not only be seen." className="mt-1 block" delay={0.12} />
              <MaskText text="It should feel like it" className="mt-4 block" delay={0.24} />
              <MaskText text="belongs to you." className="mt-1 block font-500 italic text-raspberry" delay={0.34} />
            </h2>

            <Reveal delay={0.2}>
              <p className="measure mt-9 text-lg leading-relaxed text-muted">
                A garment is only finished when it fits the person — their proportions,
                their posture, the way they move through a day. That belief shapes every
                seam I sew. Personal fit, honest craftsmanship, and quiet confidence are
                woven into everything that leaves the studio.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-4">
                <ThreadLine className="h-3 w-28 text-sage-deep/70" loop />
                <p className="hand text-2xl text-ink">Fit is a feeling.</p>
              </div>
            </Reveal>
          </div>

          {/* Image */}
          <div className="lg:col-span-5">
            <div className="lg:mt-16">
              <ParallaxImage
                src={images.philosophyDetail}
                alt="Dramatic close-up of softly draped ivory fabric catching the light"
                ratio="3 / 4"
                speed={10}
                className="border border-line"
                imgClassName="saturate-[0.95]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
