import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/shared/Container";

// Unsubscribe page for the weekly tarot card, linked from every weekly email. The actual
// unsubscribe is a button (POST), so mail link scanners opening the URL change nothing.
export const metadata: Metadata = {
  title: "Odjava / Unsubscribe — Art by Urška",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string; t?: string; result?: string }>;
}) {
  const { e, t, result } = await searchParams;

  return (
    <section className="min-h-[70vh] flex items-center px-6 py-24 text-center">
      <Container className="max-w-lg">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">Tedenska karta · Weekly card</span>

        {result === "done" ? (
          <>
            <h1 className="mt-6 font-heading text-4xl text-bone">Odjava je uspela.</h1>
            <p className="mt-4 text-bone">You&apos;ve been unsubscribed. Hvala za skupno pot — the cards are always here.</p>
          </>
        ) : result === "invalid" || !e || !t ? (
          <>
            <h1 className="mt-6 font-heading text-4xl text-bone">Povezava ni veljavna.</h1>
            <p className="mt-4 text-bone">This link isn&apos;t valid. Reply to any weekly email and we&apos;ll remove you by hand.</p>
          </>
        ) : (
          <>
            <h1 className="mt-6 font-heading text-4xl text-bone">Odjava od tedenske karte</h1>
            <p className="mt-4 text-bone">
              {e}
              <br />
              Unsubscribe from the weekly tarot card?
            </p>
            <form method="post" action="/api/tarot-unsubscribe" className="mt-8">
              <input type="hidden" name="e" value={e} />
              <input type="hidden" name="t" value={t} />
              <button type="submit" className="btn-primary bg-bone text-ink">
                Odjavi me · Unsubscribe
              </button>
            </form>
          </>
        )}

        <Link href="/spirituality" className="mt-10 inline-block text-xs tracking-widest uppercase text-bone underline">
          Spirituality →
        </Link>
      </Container>
    </section>
  );
}
