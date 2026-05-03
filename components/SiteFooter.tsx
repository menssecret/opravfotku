import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-(--color-line) mt-16 sm:mt-24">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-10 sm:py-12 lg:px-16">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-(--color-amber)">
              <span className="inline-block h-px w-10 bg-(--color-amber)" />
              <span>opravfotku</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-(--color-ink-dim) sm:mt-5">
              Úprava fotek pomocí jednoho promptu. Bez vrstev, bez pravítek.
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
              Stránky
            </p>
            <ul className="mt-3 space-y-2 text-sm sm:mt-4">
              <li>
                <Link
                  href="/"
                  className="text-(--color-ink-dim) transition-colors hover:text-(--color-amber)"
                >
                  Editor
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-(--color-ink-dim) transition-colors hover:text-(--color-amber)"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/ochrana-osobnich-udaju"
                  className="text-(--color-ink-dim) transition-colors hover:text-(--color-amber)"
                >
                  Ochrana osobních údajů
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
              Postaveno na
            </p>
            <ul className="mt-3 space-y-2 text-sm sm:mt-4">
              <li>
                <a
                  href="https://replicate.com/black-forest-labs/flux-kontext-pro"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-(--color-ink-dim) transition-colors hover:text-(--color-amber)"
                >
                  FLUX.1 Kontext Pro
                </a>
              </li>
              <li>
                <a
                  href="https://replicate.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-(--color-ink-dim) transition-colors hover:text-(--color-amber)"
                >
                  Replicate
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-(--color-ink-dim) transition-colors hover:text-(--color-amber)"
                >
                  Next.js + Vercel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-(--color-line) pt-5 text-xs text-(--color-ink-faint) sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p>© {year} opravfotku</p>
          <p className="font-(family-name:--font-display) italic">
            Made with intent, not with templates.
          </p>
        </div>
      </div>
    </footer>
  );
}
