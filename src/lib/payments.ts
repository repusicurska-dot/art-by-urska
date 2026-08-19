// TODO(phase-2): implement real Stripe Checkout + crypto payments here (e.g. Coinbase
// Commerce). See README "Phase 2 — Payments" for the intended flow. The disabled
// "Buy Now" button in EnquireCTA is the UI anchor point this will wire up to,
// most likely via a POST to /api/checkout that calls createCheckoutSession().

export async function createCheckoutSession(
  paintingSlug: string
): Promise<{ url: string } | null> {
  throw new Error(
    `Payments are not yet implemented (requested for "${paintingSlug}"). See README "Phase 2 — Payments".`
  );
}
