# Art by Urska

Storytelling art portfolio for Urška. Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

- `src/content/categories.ts` — 7 mood/emotion sections.
- `src/content/paintings.ts` — 21 paintings (3 per category), each with story beats, price, dimensions, etc.
- All images are currently placeholders (`PlaceholderArt` renders a mood-colored gradient). To add a real photo, set `heroImage: "/images/paintings/your-file.jpg"` on a painting record and drop the file in `public/images/paintings/`.
- All story text is placeholder copy matching each category's tone — replace freely, the structure (Origin / Depth or Tension / Resolution) doesn't need to change.

## Phase 2 — Payments

Stripe + crypto checkout are intentionally not implemented yet. The seam is:

- `src/lib/payments.ts` — stub `createCheckoutSession()`, currently throws.
- `src/components/story/EnquireCTA.tsx` — has a disabled "Buy Now" button as the visual placeholder for where checkout will attach.
- Planned: a `POST /api/checkout` route handler creating a Stripe Checkout Session (and later a crypto option, e.g. Coinbase Commerce), called from the "Buy Now" button once implemented.

## Deployment

Not yet connected to GitHub/Vercel — this repo is local-only for now. Connect it to Urška's own GitHub + Vercel accounts when ready to publish.
