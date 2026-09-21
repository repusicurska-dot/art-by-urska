"use client";

import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import ProtectedEmail from "./ProtectedEmail";
import { OPEN_INSTALL_PROMPT_EVENT } from "./InstallAppPrompt";
import { OPEN_COOKIE_PREFERENCES_EVENT } from "./cookies/CookieBanner";
import { useLanguage } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

const legalLinks = [
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/cookies", label: "Cookie Policy" },
  { href: "/legal/shipping", label: "Shipping & Delivery" },
  { href: "/legal/returns", label: "Returns & Cancellations" },
  { href: "/legal/notice", label: "Legal Notice" },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/[0.14] py-14">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <Logo ring wordmark className="text-bone" iconClassName="h-11 w-11" />
            <p className="mt-3 text-sm text-smoke max-w-xs">
              {t.footer.tagline}
            </p>
            <p className="mt-3 text-sm text-smoke">
              <ProtectedEmail className="hover:text-bone transition-colors underline" />
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/art_by_urska/"
                target="_blank"
                rel="noopener noreferrer"
                title="@art_by_urska"
                className="text-xs tracking-widest uppercase text-smoke hover:text-bone transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-smoke/70 mb-4">{t.footer.explore}</p>
            <ul className="space-y-2 text-sm text-smoke">
              <li>
                <Link href="/collection" className="hover:text-bone transition-colors">
                  {t.nav.art}
                </Link>
              </li>
              <li>
                <Link href="/poetry" className="hover:text-bone transition-colors">
                  {t.nav.poetry}
                </Link>
              </li>
              <li>
                <Link
                  href="/spirituality"
                  className="hover:text-bone transition-colors"
                >
                  {t.nav.spirituality}
                </Link>
              </li>
              <li>
                <Link href="/zvezdni-koledar" className="hover:text-bone transition-colors">
                  {t.footer.starCalendar}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-bone transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-bone transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-smoke/70 mb-4">{t.footer.policies}</p>
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
                  {t.footer.cookiePreferences}
                </button>
              </li>
              <li className="md:hidden">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event(OPEN_INSTALL_PROMPT_EVENT))}
                  className="hover:text-bone transition-colors text-left"
                >
                  {t.footer.installApp}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-smoke/70 mb-4">{t.footer.language}</p>
            <LanguageSwitcher />
          </div>
        </div>

        <p className="mt-12 text-sm text-smoke/60">
          &copy; {new Date().getFullYear()} Art by Urška. {t.footer.rights}
        </p>
      </Container>
    </footer>
  );
}
