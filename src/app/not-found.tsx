import Link from "next/link";
import Container from "@/components/shared/Container";

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <Container>
        <h1 className="font-heading text-4xl text-charcoal">Stran ne obstaja</h1>
        <p className="mt-4 text-charcoal/60">
          Zgodba, ki jo iščete, se je verjetno preselila drugam.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 text-sm tracking-widest uppercase text-gold-600 hover:text-gold-400 transition-colors border-b border-gold-600/40 pb-1"
        >
          Nazaj domov
        </Link>
      </Container>
    </section>
  );
}
