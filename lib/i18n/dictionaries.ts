// lib/i18n/dictionaries.ts

import { cs, type Dict } from "./cs";
import { en } from "./en";
import { de } from "./de";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dict> = { cs, en, de };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}

export type { Dict };

/**
 * Replaces {n}, {word}, etc. tokens in a string template.
 */
export function tFormat(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    String(vars[key] ?? `{${key}}`),
  );
}
