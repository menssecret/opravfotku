// lib/i18n/config.ts

export const LOCALES = ["cs", "en", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "cs";

export const LOCALE_NAMES: Record<Locale, string> = {
  cs: "Čeština",
  en: "English",
  de: "Deutsch",
};

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  cs: "cs",
  en: "en",
  de: "de",
};

export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
