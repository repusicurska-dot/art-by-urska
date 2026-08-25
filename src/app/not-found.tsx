import Link from "next/link";
import Container from "@/components/shared/Container";

export default function NotFound() {
  return (
    <section className="py-32 text-center bg-ink">
      <Container>
        <h1 className="font-heading text-4xl text-bone">Page not found</h1>
        <p className="mt-4 text-bone/60">
          The story you&rsquo;re looking for may have moved elsewhere.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 text-sm tracking-widest uppercase text-gold-400 hover:text-bone transition-colors border-b border-gold-400/40 pb-1"
        >
          Back home
        </Link>
      </Container>
    </section>
  );
}
