import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.kontakt.title,
    description: dict.kontakt.metaDescription,
  };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <main className="relative z-10 mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-10 sm:pt-20 lg:px-16">
      <header className="mb-10 sm:mb-14">
        <Link
          href={`/${typedLocale}`}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-(--color-ink-faint) transition-colors hover:text-(--color-amber)"
        >
          <span>{dict.kontakt.backToEditor}</span>
        </Link>
        <h1 className="mt-6 font-(family-name:--font-display) text-4xl leading-[0.95] tracking-tight text-balance sm:mt-7 sm:text-6xl">
          <em className="text-(--color-amber)">{dict.kontakt.titleAccent}</em>
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-(--color-ink-dim) sm:mt-7 sm:text-base">
          {dict.kontakt.description}
        </p>
      </header>

      <section className="grid gap-3">
        <a
          href="mailto:info@opravfotku.cz"
          className="group rounded-(--radius-card) border border-(--color-line) bg-(--color-surface) p-5 transition-colors hover:border-(--color-amber) sm:p-6"
        >
          <div className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
            {dict.kontakt.emailLabel}
          </div>
          <div className="mt-3 break-all font-(family-name:--font-display) text-xl italic text-(--color-ink) transition-colors group-hover:text-(--color-amber) sm:text-2xl">
            info@opravfotku.cz
          </div>
        </a>

        <div className="rounded-(--radius-card) border border-(--color-line) bg-(--color-surface) p-5 sm:p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
            {dict.kontakt.responseLabel}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-(--color-ink-dim)">
            {dict.kontakt.responseText}
          </p>
        </div>

        <div className="rounded-(--radius-card) border border-(--color-line) bg-(--color-surface) p-5 sm:p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
            {dict.kontakt.bugLabel}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-(--color-ink-dim)">
            {dict.kontakt.bugText}
          </p>
        </div>
      </section>
    </main>
  );
}
