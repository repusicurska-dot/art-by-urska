import type { Locale } from "@/i18n/locales";

/**
 * Prices, written the way each language writes them — €1,111 in English, 1.111 € elsewhere in
 * Europe. The currency symbol stays after the number, as the rest of the site has it.
 */
const NUMBER_LOCALE: Record<Locale, string> = {
  en: "en-IE",
  sl: "sl-SI",
  hr: "hr-HR",
  de: "de-DE",
  it: "it-IT",
};

export function formatPrice(amount: number, locale: Locale): string {
  return `${amount.toLocaleString(NUMBER_LOCALE[locale])} €`;
}
