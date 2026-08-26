"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import { useCart } from "@/lib/cart/CartContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Gallery" },
  { href: "/poetry", label: "Poetry" },
  { href: "/spirituality", label: "Spirituality" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    function update() {
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      if (menuOpen) {
        setHidden(false);
      } else if (goingDown && y > 120) {
        setHidden(true);
      } else if (!goingDown) {
        setHidden(false);
      }
      lastY.current = y;
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-ink border-b border-white/[0.14]"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeInOut" }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-bone focus:text-ink focus:px-4 focus:py-2 focus:rounded-sm"
      >
        Skip to content
      </a>

      <Container className="grid grid-cols-[1fr_auto_1fr] items-center py-5">
        <Link href="/" className="text-bone justify-self-start" aria-label="Art by Urška — Home">
          <Logo wordmark iconClassName="h-8 w-8" wordmarkClassName="hidden sm:inline" />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-10 text-sm tracking-wide text-bone/85">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b pb-0.5 transition-colors hover:text-bone ${
                  active ? "border-bone/60 text-bone" : "border-transparent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5 justify-self-end text-bone/85">
          <button
            type="button"
            className="hidden sm:inline-flex hover:text-bone transition-colors"
            aria-label="Account (coming soon)"
            title="Account — coming soon"
          >
            <User size={19} strokeWidth={1.5} />
          </button>
          <Link
            href="/cart"
            className="relative hover:text-bone transition-colors"
            aria-label={`Cart, ${cart.count} item${cart.count === 1 ? "" : "s"}`}
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            {cart.count > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center h-4 w-4 rounded-full bg-bone text-[10px] text-ink">
                {cart.count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden hover:text-bone transition-colors"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </Container>

      <div className="border-t border-white/[0.14] py-1.5 text-center text-[11px] tracking-widest uppercase text-smoke">
        Original paintings, made in Slovenia — shipped worldwide
      </div>

      {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[100] bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Container className="flex items-center justify-between py-5">
              <Logo className="text-bone" iconClassName="h-8 w-8" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-bone/85 hover:text-bone transition-colors"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </Container>
            <nav aria-label="Mobile" className="flex flex-col items-center justify-center gap-8 pt-16">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-heading text-3xl text-bone/90 hover:text-bone transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * NAV_LINKS.length }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="font-heading text-3xl text-bone/90 hover:text-bone transition-colors"
                >
                  Contact
                </Link>
              </motion.div>
            </nav>
          </motion.div>
      )}
    </motion.header>
  );
}
