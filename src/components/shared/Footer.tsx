import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 py-10 mt-24">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-charcoal/60">
        <p>&copy; {new Date().getFullYear()} Art by Urska. Vse pravice pridržane.</p>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-gold-600 transition-colors">
            O Urski
          </Link>
          <Link href="/contact" className="hover:text-gold-600 transition-colors">
            Kontakt
          </Link>
        </div>
      </Container>
    </footer>
  );
}
