import type { Locale } from "@/i18n/locales";

/**
 * The Spirituality page speaks all five site languages, and follows the site-wide switcher
 * rather than carrying its own. Everything on the page — the paths, the moon, the breathing
 * pause, the tarot readings, the scratch lines — exists in all five.
 *
 * The one thing that doesn't is the live reading itself: Urška holds those over video, and
 * she speaks Slovenian and English. So the booking form asks which of those two the reading
 * should be in, separately from the language the visitor is reading the page in.
 */
export type Lang = Locale;

export type Text = Record<Lang, string>;

/** The two languages Urška gives live readings in. */
export type ReadingLang = "sl" | "en";

/** The reading language a visitor most likely wants, given the language they're browsing in. */
export function defaultReadingLang(lang: Lang): ReadingLang {
  return lang === "sl" ? "sl" : "en";
}
