import { nav, site, social } from "@/lib/content";
import { ThreadLine } from "@/components/ui";
import { scrollToTarget } from "@/lib/lenis";

export function Footer() {
  const year = new Date().getFullYear();
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (id === "top") scrollToTarget(0);
    else scrollToTarget(`#${id}`);
  };

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ivory-deep/60">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <a href="#top" onClick={go("top")} className="inline-flex flex-col leading-none">
              <span className="font-display text-3xl text-ink">{site.name}</span>
              <span className="burmese mt-1 text-sm text-muted">{site.nameBurmese}</span>
            </a>
            <p className="hand mt-5 text-2xl text-raspberry">{site.tagline}</p>
            <ThreadLine className="mt-3 h-3 w-36 text-raspberry/40" />
          </div>

          {/* Nav */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-600 uppercase tracking-[0.2em] text-muted">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={go(n.id)}
                    className="link-underline text-[15px] text-ink/80 transition-colors hover:text-raspberry"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-4">
            <h2 className="text-xs font-600 uppercase tracking-[0.2em] text-muted">Connect</h2>
            <ul className="mt-4 space-y-2.5">
              {social.map((s) => (
                <li key={s.label} className="flex items-baseline justify-between gap-3">
                  <a href={s.href} target="_blank" rel="noreferrer" className="link-underline text-[15px] text-ink/80 transition-colors hover:text-raspberry">
                    {s.label}
                  </a>
                  <span className="text-sm text-muted">{s.handle}</span>
                </li>
              ))}
              <li className="flex items-baseline justify-between gap-3 pt-1">
                <a href={`mailto:${site.email}`} className="link-underline text-[15px] text-ink/80 hover:text-raspberry">
                  Email
                </a>
                <span className="text-sm text-muted">{site.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 text-sm text-muted sm:flex-row sm:items-center">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <span aria-hidden className="text-raspberry">✿</span>
            Made with care in {site.location}
          </p>
        </div>
      </div>

      {/* Oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] leading-none text-ink/[0.035]"
      >
        Aye Sandar Tun
      </span>
    </footer>
  );
}
