"use client";

import Link from "next/link";
import Container from "./Container";
import { OPEN_COOKIE_PREFERENCES_EVENT } from "./cookies/CookieBanner";

const legalLinks = [
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/cookies", label: "Cookie Policy" },
  { href: "/legal/shipping", label: "Shipping & Delivery" },
  { href: "/legal/returns", label: "Returns & Cancellations" },
  { href: "/legal/notice", label: "Legal Notice" },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/[0.14] py-14">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <p className="font-gothic text-2xl text-bone">AU</p>
            <p className="mt-3 text-sm text-smoke max-w-xs">
              Original paintings, made in Slovenia, shared with the world.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                title="Instagram — link pending"
                className="text-xs tracking-widest uppercase text-smoke hover:text-bone transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-smoke/70 mb-4">Explore</p>
            <ul className="space-y-2 text-sm text-smoke">
              <li>
                <Link href="/collection" className="hover:text-bone transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/poetry" className="hover:text-bone transition-colors">
                  Poetry
                </Link>
              </li>
              <li>
                <Link href="/spirituality" className="hover:text-bone transition-colors">
                  Spirituality
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-bone transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-bone transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-smoke/70 mb-4">Policies</p>
            <ul className="space-y-2 text-sm text-smoke">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-bone transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))
                  }
                  className="hover:text-bone transition-colors text-left"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-smoke/70 mb-4">Language</p>
            <button
              type="button"
              disabled
              title="More languages coming soon"
              className="text-sm text-smoke/60 cursor-not-allowed"
            >
              English
            </button>
          </div>
        </div>

        <p className="mt-12 text-sm text-smoke/60">
          &copy; {new Date().getFullYear()} Art by Urška. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
