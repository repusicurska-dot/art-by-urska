// TODO(phase-2): implement real Stripe Checkout + crypto payments here (e.g. Coinbase
// Commerce). See README "Phase 2 — Payments". The full cart → checkout flow is already
// built and wired: POST /api/checkout (src/app/api/checkout/route.ts) validates the
// order server-side and calls this function — it just needs a real implementation and
// live Stripe keys.

export async function createCheckoutSession(
  paintingSlug: string
): Promise<{ url: string } | null> {
  throw new Error(
    `Payments are not yet implemented (requested for "${paintingSlug}"). See README "Phase 2 — Payments".`
  );
}
