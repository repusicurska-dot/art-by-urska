"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={
        isHome
          ? "absolute top-0 left-0 right-0 z-30"
          : "relative z-30 border-b border-charcoal/10"
      }
    >
      <Container className="flex items-center justify-between py-6">
        <Link
          href="/"
          className={`font-heading text-2xl tracking-wide ${
            isHome ? "text-ivory" : "text-charcoal"
          }`}
        >
          Art by Urska
        </Link>
        <nav
          className={`hidden sm:flex items-center gap-8 text-sm tracking-wide ${
            isHome ? "text-ivory/90" : "text-charcoal/80"
          }`}
        >
          <Link href="/about" className="hover:text-gold-400 transition-colors">
            O Urski
          </Link>
          <Link href="/contact" className="hover:text-gold-400 transition-colors">
            Kontakt
          </Link>
        </nav>
      </Container>
    </header>
  );
}
