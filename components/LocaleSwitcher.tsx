"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALES,
  LOCALE_NAMES,
  isValidLocale,
  type Locale,
} from "@/lib/i18n/config";

type Props = {
  current: Locale;
  label: string;
};

export function LocaleSwitcher({ current, label }: Props) {
  const pathname = usePathname() ?? "/";

  function pathForLocale(locale: Locale): string {
    // Replace the leading /xx segment with the new locale
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && isValidLocale(segments[0])) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }
    return "/" + segments.join("/");
  }

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-(--color-ink-faint)">
        {label}
      </p>
      <ul className="mt-3 space-y-2 text-sm sm:mt-4">
        {LOCALES.map((locale) => {
          const isActive = locale === current;
          return (
            <li key={locale}>
              <Link
                href={pathForLocale(locale)}
                hrefLang={locale}
                className={`transition-colors ${
                  isActive
                    ? "text-(--color-amber)"
                    : "text-(--color-ink-dim) hover:text-(--color-amber)"
                }`}
              >
                {LOCALE_NAMES[locale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
