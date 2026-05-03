import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Dotazy ke službě opravfotku, technické dotazy, ochrana osobních údajů.",
};

export default function KontaktPage() {
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-16 sm:px-10 sm:pt-20 lg:px-16">
      <header className="mb-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-(--color-ink-faint) transition-colors hover:text-(--color-amber)"
        >
          <span>← editor</span>
        </Link>
        <h1
          className="mt-7 font-(family-name:--font-display) text-5xl leading-[0.95] tracking-tight text-balance sm:text-6xl"
        >
          <em className="text-(--color-amber)">Kontakt.</em>
        </h1>
        <p className="mt-7 max-w-md text-base leading-relaxed text-(--color-ink-dim)">
          Dotazy, technické problémy, návrhy, hlášení chyb. Napiš na e-mail.
        </p>
      </header>

      <section className="grid gap-3">
        <a
          href="mailto:info@opravfotku.cz"
          className="group rounded-(--radius-card) border border-(--color-line) bg-(--color-surface) p-6 transition-colors hover:border-(--color-amber)"
        >
          <div className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
            E-mail
          </div>
          <div className="mt-3 font-(family-name:--font-display) text-2xl italic text-(--color-ink) transition-colors group-hover:text-(--color-amber)">
            info@opravfotku.cz
          </div>
        </a>

        <div className="rounded-(--radius-card) border border-(--color-line) bg-(--color-surface) p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
            Odezva
          </div>
          <p className="mt-3 text-sm leading-relaxed text-(--color-ink-dim)">
            Tohle je osobní projekt, ne komerční služba. Odpovídám zpravidla
            do několika dní.
          </p>
        </div>

        <div className="rounded-(--radius-card) border border-(--color-line) bg-(--color-surface) p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
            Něco nefunguje?
          </div>
          <p className="mt-3 text-sm leading-relaxed text-(--color-ink-dim)">
            Pošli prosím popis problému, použitý prompt, a ideálně screenshot
            chybové hlášky. Pomůže to s rychlejší diagnostikou.
          </p>
        </div>
      </section>
    </main>
  );
}
