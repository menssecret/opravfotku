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
    title: dict.privacy.title,
    description: dict.privacy.metaDescription,
  };
}

export default async function PrivacyPage({
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
          <span>{dict.privacy.backToEditor}</span>
        </Link>
        <h1 className="mt-6 font-(family-name:--font-display) text-3xl leading-[1.05] tracking-tight text-balance sm:mt-7 sm:text-5xl">
          {dict.privacy.title}{" "}
          <em className="text-(--color-amber)">{dict.privacy.titleAccent}</em>
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-(--color-ink-dim) sm:mt-7 sm:text-base">
          {dict.privacy.description}
        </p>
      </header>

      <article className="space-y-8 text-(--color-ink-dim) sm:space-y-10">
        <Section heading={dict.privacy.sections.whatHappens.heading}>
          {dict.privacy.sections.whatHappens.body.map((p, i) => (
            <p key={i}>{renderInline(p)}</p>
          ))}
        </Section>

        <Section heading={dict.privacy.sections.thirdParties.heading}>
          <p>{dict.privacy.sections.thirdParties.intro}</p>
          <ul className="mt-3 space-y-3 list-none">
            {dict.privacy.sections.thirdParties.items.map((item, i) => (
              <Bullet key={i} name={item.name} detail={item.detail} />
            ))}
          </ul>
          <p className="mt-3">{dict.privacy.sections.thirdParties.outro}</p>
        </Section>

        <Section heading={dict.privacy.sections.browserStorage.heading}>
          {dict.privacy.sections.browserStorage.body.map((p, i) => (
            <p key={i}>{renderInline(p)}</p>
          ))}
        </Section>

        <Section heading={dict.privacy.sections.rateLimit.heading}>
          {dict.privacy.sections.rateLimit.body.map((p, i) => (
            <p key={i}>{renderInline(p)}</p>
          ))}
        </Section>

        <Section heading={dict.privacy.sections.rights.heading}>
          {dict.privacy.sections.rights.body.map((p, i) => (
            <p key={i}>{renderInline(p)}</p>
          ))}
        </Section>

        <Section heading={dict.privacy.sections.whatsNotHere.heading}>
          {dict.privacy.sections.whatsNotHere.body.map((p, i) => (
            <p key={i}>{renderInline(p)}</p>
          ))}
        </Section>

        <div className="rounded-(--radius-card) border border-(--color-line) bg-(--color-surface) p-5 text-sm">
          {renderInline(dict.privacy.footer)}
        </div>
      </article>
    </main>
  );
}

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-(family-name:--font-display) text-xl italic text-(--color-ink) sm:text-2xl">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed sm:mt-4">
        {children}
      </div>
    </section>
  );
}

function Bullet({ name, detail }: { name: string; detail: string }) {
  return (
    <li className="flex gap-3 border-l border-(--color-line) pl-4">
      <div>
        <div className="text-(--color-ink)">{name}</div>
        <div className="mt-1 text-xs text-(--color-ink-faint)">{detail}</div>
      </div>
    </li>
  );
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  segments.forEach((seg, i) => {
    if (seg.startsWith("**") && seg.endsWith("**")) {
      const inner = seg.slice(2, -2);
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inner)) {
        parts.push(
          <a
            key={i}
            href={`mailto:${inner}`}
            className="text-(--color-amber) underline-offset-4 hover:underline"
          >
            {inner}
          </a>,
        );
      } else {
        parts.push(<strong key={i}>{inner}</strong>);
      }
    } else if (seg.length > 0) {
      parts.push(seg);
    }
  });
  return parts;
}
