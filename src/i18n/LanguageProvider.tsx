"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DICTIONARIES, type Dictionary } from "./dictionary";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, matchLocale, type Locale } from "./locales";

/**
 * The site's language, remembered in a plain cookie so it survives reloads and is readable by
 * the server if it ever needs it. The first visit follows the browser's own languages.
 *
 * Server-rendered HTML is always the default language; the provider switches on hydration.
 * That keeps every page static and fast, at the cost of a blink for non-English visitors —
 * a fair trade while the site has no per-language URLs.
 */

interface LanguageValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageValue>({
  locale: DEFAULT_LOCALE,
  t: DICTIONARIES[DEFAULT_LOCALE],
  setLocale: () => {},
});

function readCookie(): Locale | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  return isLocale(value) ? value : null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readCookie();
    const next = stored ?? matchLocale(navigator.languages ?? [navigator.language]);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (next !== DEFAULT_LOCALE) setLocaleState(next);
    document.documentElement.lang = next;
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }, []);

  const value = useMemo<LanguageValue>(() => ({ locale, t: DICTIONARIES[locale], setLocale }), [locale, setLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** `const { t, locale } = useLanguage();` then `t.nav.art`. */
export function useLanguage(): LanguageValue {
  return useContext(LanguageContext);
}
