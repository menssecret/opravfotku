import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-(--color-line) mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-(--color-amber)">
              <span className="inline-block h-px w-10 bg-(--color-amber)" />
              <span>opravfotku</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-(--color-ink-dim)">
              Úprava fotek pomocí jednoho promptu. Bez vrstev, bez pravítek.
            </p>
          </div>

          {/* Stránky */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
              Stránky
            </p>
            <ul className="mt-4 space-y-2 text-sm">
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

          {/* Postaveno na */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
              Postaveno na
            </p>
            <ul className="mt-4 space-y-2 text-sm">
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

        <div className="mt-10 flex flex-col gap-2 border-t border-(--color-line) pt-6 text-xs text-(--color-ink-faint) sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} opravfotku</p>
          <p className="font-(family-name:--font-display) italic">
            Made with intent, not with templates.
          </p>
        </div>
      </div>
    </footer>
  );
}
