import Link from "next/link";
import Container from "@/components/shared/Container";

export default function ClimbContent() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-ink px-6 py-24 text-center">
      <Container className="max-w-xl">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">Climb by Urška</span>
        <h1 className="font-heading text-4xl md:text-5xl text-bone mt-6">A new chapter, coming soon.</h1>
        <p className="mt-6 text-bone/70 leading-relaxed">
          This part of Urška's story — her life on the rock, before the canvas — is still being
          written. Check back soon.
        </p>
        <Link
          href="/"
          className="inline-block mt-10 text-sm tracking-widest uppercase text-bone/85 hover:text-bone transition-colors border-b border-bone/40 pb-1"
        >
          ← Back to the paintings
        </Link>
      </Container>
    </section>
  );
}
