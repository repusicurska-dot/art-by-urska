import Link from "next/link";
import Container from "@/components/shared/Container";
import QuoteSequence from "@/components/shared/QuoteSequence";

/**
 * Urška's own words, verbatim from her notes — do not edit or add to these without
 * her. The rest of the poetry quotes are still coming from her; drop them into this
 * array in her order and the page extends itself.
 */
const POETRY_QUOTES = [
  "Poetry is the bridge between what my soul remembers and what my heart longs to say.",
];

export default function PoetryIndexContent() {
  return (
    <div className="bg-ink">
      <section className="flex min-h-[35vh] items-end justify-center px-6 pt-24 text-center">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">Poetry by Urška</span>
      </section>

      <QuoteSequence quotes={POETRY_QUOTES} />

      <section className="px-6 pb-28 text-center">
        <Container className="max-w-xl">
          <Link
            href="/collection"
            className="inline-block text-xs tracking-widest uppercase text-bone/85 hover:text-bone transition-colors border-b border-bone/40 pb-1"
          >
            See the paintings these words belong to →
          </Link>
        </Container>
      </section>
    </div>
  );
}
