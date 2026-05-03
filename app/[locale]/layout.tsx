import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import {
  isValidLocale,
  LOCALE_HTML_LANG,
  LOCALES,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: {
      default: dict.meta.title,
      template: `%s · ${dict.meta.title}`,
    },
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      locale: LOCALE_HTML_LANG[locale],
    },
    alternates: {
      languages: {
        cs: "/cs",
        en: "/en",
        de: "/de",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <SetHtmlLang lang={LOCALE_HTML_LANG[typedLocale]} />
      <div className="flex-1">{children}</div>
      <SiteFooter dict={dict} locale={typedLocale} />
    </>
  );
}

function SetHtmlLang({ lang }: { lang: string }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang = ${JSON.stringify(lang)};`,
      }}
    />
  );
}