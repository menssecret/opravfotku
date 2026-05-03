import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import {
  isValidLocale,
  LOCALE_HTML_LANG,
  LOCALES,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
});

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
    icons: {
      icon: [{ url: "/logo-amber.svg", type: "image/svg+xml" }],
      apple: { url: "/logo-amber.svg" },
    },
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

export const viewport: Viewport = {
  themeColor: "#0e0c0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

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
    <html
      lang={LOCALE_HTML_LANG[typedLocale]}
      className={`${geist.variable} ${instrument.variable}`}
    >
      <body className="antialiased relative z-0 flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <SiteFooter dict={dict} locale={typedLocale} />
      </body>
    </html>
  );
}