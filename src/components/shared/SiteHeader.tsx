"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import { useCart } from "@/lib/cart/CartContext";
import { useLanguage } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { HUB } from "@/content/hub";
import { placeFor, WORLDS, WORLD_NAME } from "@/lib/worlds";



export default function SiteHeader() {
  const pathname = usePathname();
  const cart = useCart();
  const { t, locale } = useLanguage();
  const place = placeFor(pathname);
  // The five worlds; finance is its own site and opens there, in the same tab.
  const navLinks = WORLDS.map((w) => ({
    href: w.href,
    label: HUB[locale].worlds[w.key].nav,
    external: !!w.external,
    active: place === w.key,
  }));
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Some mobile browsers restore the previous scroll position on reload, which on this
    // very tall homepage can land far down the page instead of the top. Take manual control.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

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
      setScrolled(y > 40);
      lastY.current = y;
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    update();
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
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-white/[0.14]"
          : "bg-transparent border-transparent"
      }`}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeInOut" }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-bone focus:text-ink focus:px-4 focus:py-2 focus:rounded-sm"
      >
        {t.nav.skipToContent}
      </a>

      <Container className="grid grid-cols-[1fr_auto_1fr] items-center py-5">
        <Link href="/" className="text-bone justify-self-start" aria-label={t.nav.home}>
          <Logo wordmark label={WORLD_NAME[place]} iconClassName="h-8 w-8" wordmarkClassName="hidden sm:inline" />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-10 text-sm tracking-wide text-bone/85">
          {navLinks.map((link) => {
            const className = `border-b pb-0.5 transition-colors hover:text-bone ${
              link.active ? "border-gold-600/70 text-bone" : "border-transparent"
            }`;
            return link.external ? (
              <a key={link.href} href={link.href} className={className}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} aria-current={link.active ? "page" : undefined} className={className}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="col-start-3 flex items-center gap-4 justify-self-end text-bone/85">
          <span className="hidden md:block">
            <LanguageSwitcher compact />
          </span>
          <Link
            href="/cart"
            className="relative hover:text-bone transition-colors"
            aria-label={`${t.nav.cart} (${cart.count})`}
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
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </Container>

      {place === "art" && (
        <div
          className={`border-t py-1.5 text-center text-[11px] tracking-widest uppercase text-smoke transition-colors duration-500 ${
            scrolled ? "border-white/[0.14]" : "border-transparent"
          }`}
        >
          {t.nav.tagline}
        </div>
      )}

      {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[100] md:hidden"
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
                aria-label={t.nav.close}
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </Container>
            <nav aria-label="Mobile" className="flex flex-col items-center justify-center gap-8 pt-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                >
                  {link.external ? (
                    <a href={link.href} className="font-heading text-3xl text-bone/90 hover:text-bone transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-heading text-3xl text-bone/90 hover:text-bone transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * navLinks.length }}
              >
                <div className="flex gap-8 text-xs uppercase tracking-[0.3em] text-bone/70">
                  <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-bone transition-colors">
                    {t.nav.about}
                  </Link>
                  <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-bone transition-colors">
                    {t.nav.contact}
                  </Link>
                </div>
              </motion.div>
              <div className="mt-6">
                <LanguageSwitcher compact />
              </div>
            </nav>
          </motion.div>
      )}
    </motion.header>
  );
}
