# Art by Urška

International, storytelling-driven art gallery and store for Urška's original paintings.
Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

- `src/content/artworks.ts` — the 5 flagship artworks, all using Urška's real titles, poems, and
  hero photography, sourced verbatim from her `.docx` files in the project root — each doc had
  both the poem text and an embedded photo of the finished painting (images copied out to
  `public/images/`). This is a snapshot, not a live link — re-sync by hand if she edits those
  files. Their "Meaning"/"For the collector" beats, artist's note, and specs
  (medium/dimensions/year/price/etc.) are still bracketed placeholders — do not invent this
  text. Two more of her documents ("ANGEL OF LIGHT", "ENCHANTED SWAN") each have a real painting
  photo too but are marked "NOT AVAILABLE" with no poem text, so they aren't used as artworks.
  Prices are demo/provisional values (`priceConfirmed: false`) used to exercise the cart →
  checkout flow; they are shown everywhere with a "provisional pricing" note until she confirms
  real prices.
- `src/content/business.ts` — single source of truth for every legal/business fact (business
  name, address, VAT number, etc.). All currently bracketed placeholders — fill in here once and
  every legal page, footer, and structured-data block picks it up.
- Adding a 6th/7th artwork: add a new entry to `artworks.ts` with an `order` and a `layout`
  (reuse one of the five bespoke homepage treatments, or add a new one under
  `src/components/home/exhibition/`).

## Commerce

- Cart: `src/lib/cart/CartContext.tsx`, client-side, localStorage-persisted. Each original is
  one of a kind (no quantities).
- Checkout: `/checkout` → `POST /api/checkout` (`src/app/api/checkout/route.ts`), which
  re-derives price/availability/shipping-zone server-side from `artworks.ts` — the client price is
  never trusted — then calls `createCheckoutSession()`.
- `src/lib/payments.ts` — Stripe Checkout is intentionally not implemented yet; the function
  throws. The API route catches that and returns a graceful "checkout isn't live yet" response so
  the full flow is testable end-to-end without live Stripe keys. To go live: implement
  `createCheckoutSession()` and set real Stripe keys.
- Contact form: `/contact` → `POST /api/contact` (`src/app/api/contact/route.ts`), validates +
  honeypot, but does not yet deliver anywhere — no email/CRM provider is connected.

## Legal & compliance

`src/app/legal/*` covers Terms, Privacy, Cookies, Shipping, Returns, and the Legal Notice. Every
page pulls business facts from `src/content/business.ts` and displays a visible "pending legal
review" notice — **the existence of these pages does not mean the site is legally compliant.**
See `OWNER_ACTION_REQUIRED.md` for what's still needed before launch.

Cookie consent (`src/components/shared/cookies/CookieBanner.tsx`,
`src/lib/cookieConsent.ts`) is real and gating — no analytics/marketing scripts are wired up
today, so it currently only governs future additions. Any analytics/marketing script added later
must check `hasConsent()` before loading.

## Deployment

Not yet connected to GitHub/Vercel — this repo is local-only for now. Connect it to Urška's own
GitHub + Vercel accounts when ready to publish. Set `NEXT_PUBLIC_SITE_URL` in production so
metadata, sitemap, and OG tags resolve to the real domain instead of localhost.
