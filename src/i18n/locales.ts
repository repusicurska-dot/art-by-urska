/**
 * The five languages the site speaks. English is the fallback: anything not translated yet —
 * and the long generated texts (tarot readings, the calendar's day readings) — appears in
 * English for hr/de/it, which is better than an empty page.
 *
 * Live tarot readings with Urška are only offered in Slovenian and English, because those are
 * the languages she speaks; the booking form says so in every language.
 */
export const LOCALES = ["en", "sl", "hr", "de", "it"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  sl: "Slovenščina",
  hr: "Hrvatski",
  de: "Deutsch",
  it: "Italiano",
};

/** Short code shown in the compact switcher. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  sl: "SL",
  hr: "HR",
  de: "DE",
  it: "IT",
};

/** The languages Urška herself reads and speaks, for anything she answers personally. */
export const HUMAN_LOCALES: Locale[] = ["sl", "en"];

export const LOCALE_COOKIE = "au_lang";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Best match for a browser's language list, e.g. ["de-AT", "en"] → "de". */
export function matchLocale(languages: readonly string[]): Locale {
  for (const lang of languages) {
    const base = lang.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
    // Serbian/Bosnian/Montenegrin readers understand Croatian.
    if (["sr", "bs", "me", "hbs"].includes(base)) return "hr";
    if (base === "at" || base === "ch") return "de";
  }
  return DEFAULT_LOCALE;
}
