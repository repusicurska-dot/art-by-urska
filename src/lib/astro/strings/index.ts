import type { Locale } from "@/i18n/locales";
import type { AstroStrings } from "./types";
import { sl } from "./sl";
import { en } from "./en";
import { hr } from "./hr";
import { de } from "./de";
import { it } from "./it";

export type { AstroStrings } from "./types";

/** The Star Business Calendar speaks every language the site does. */
export type Lang = Locale;

export const STRINGS: Record<Lang, AstroStrings> = { sl, en, hr, de, it };

/**
 * Turns "a table per language" into "a language pair per key" — so `TYPE_LABEL[type][lang]`
 * keeps working for every call site while the words themselves live in one file per language.
 */
export function byKey<K extends string>(
  pick: (s: AstroStrings) => Record<K, string>
): Record<K, Record<Lang, string>> {
  const out = {} as Record<K, Record<Lang, string>>;
  for (const key of Object.keys(pick(en)) as K[]) {
    out[key] = {
      sl: pick(sl)[key],
      en: pick(en)[key],
      hr: pick(hr)[key],
      de: pick(de)[key],
      it: pick(it)[key],
    };
  }
  return out;
}
