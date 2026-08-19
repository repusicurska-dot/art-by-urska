import { Suspense } from "react";
import Container from "@/components/shared/Container";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-xl">
        <span className="text-xs tracking-widest uppercase text-gold-600">
          Kontakt
        </span>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-4 mb-10">
          Pišite nam
        </h1>
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </Container>
    </section>
  );
}
