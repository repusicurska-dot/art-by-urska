/**
 * Single source of truth for real-world business/legal facts, as supplied by Urška on
 * 2026-09-17. Update this file only and every legal page, footer, and structured-data
 * block picks it up.
 */
export const business = {
  legalName: "Urška Repušič s.p.",
  tradingName: "Art by Urška",
  legalForm: "samostojna podjetnica / sole proprietor",
  registeredAddress: "Lončarska ulica 14, 2327 Rače",
  country: "Slovenia, European Union",
  /** Matična številka */
  registrationNumber: "9753273000",
  /** Davčna številka — not registered for VAT */
  taxNumber: "17329493",
  vatRegistered: false,
  /**
   * Not public yet. Deliberately NOT shown on the site for readings: it only goes out in the
   * confirmation email once Urška confirms a booking (see bookingEmails.ts), so people can't
   * call for fun. Note: EU distance-selling rules generally expect a phone number for the shop.
   */
  phone: null as string | null,
  returnsAddress: "Lončarska ulica 14, 2327 Rače, Slovenia",
} as const;

/**
 * The contact address is never written into the HTML as plain text, so address-harvesting
 * bots that scrape pages for emails don't find it. It's stored reversed and base64-encoded
 * and only assembled in the browser by <ProtectedEmail />.
 */
export const contactEmailEncoded = "bW9jLmxpYW1nQGFrc3J1Y2lzdXBlcg==";

export function decodeContactEmail(): string {
  return atob(contactEmailEncoded).split("").reverse().join("");
}

/** Shown wherever the price's VAT treatment is stated. */
export const vatNote = "No VAT charged — seller is not registered for VAT (Art. 94(1) ZDDV-1)";

export const legalReviewNotice =
  "This page describes the intended structure of our policy and has not yet been reviewed by a legal professional. It is not a substitute for legal advice.";
