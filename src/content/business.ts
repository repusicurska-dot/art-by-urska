/**
 * Single source of truth for real-world business/legal facts.
 * Every value here is a placeholder until Urška supplies the real one —
 * do not fill these in with invented information. Update this file only
 * and every legal page, footer, and structured-data block picks it up.
 */
export const business = {
  legalName: "[LEGAL BUSINESS NAME]",
  tradingName: "Art by Urška",
  legalForm: "[LEGAL FORM — e.g. s.p. / d.o.o.]",
  registeredAddress: "[REGISTERED ADDRESS]",
  country: "Slovenia, European Union",
  registrationNumber: "[REGISTRATION NUMBER]",
  vatNumber: "[TAX/VAT NUMBER]",
  contactEmail: "[CONTACT EMAIL]",
  phone: "[PHONE — IF REQUIRED]",
  returnsAddress: "[RETURNS ADDRESS]",
  bankDetails: "[BANK DETAILS — IF NEEDED FOR MANUAL PAYMENT/REFUND HANDLING]",
  disputeResolutionBody: "[APPLICABLE EU/SLOVENIAN ADR / ODR CONTACT — IF APPLICABLE]",
  dataProtectionContact: "[DATA PROTECTION CONTACT EMAIL — IF DIFFERENT FROM CONTACT EMAIL]",
} as const;

export const legalReviewNotice =
  "This page describes the intended structure of our policy and has not yet been reviewed by a legal professional. It is not a substitute for legal advice and must be finalized with real business details before the site goes live.";
