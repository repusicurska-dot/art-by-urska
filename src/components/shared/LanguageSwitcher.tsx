"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { LOCALES, LOCALE_LABEL } from "@/i18n/locales";

/** Language chooser: full names in the footer, short codes in the header. */
export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();

  if (compact) {
    return (
      <label className="flex items-center gap-1 text-xs uppercase tracking-widest text-bone/85">
        <span className="sr-only">{t.footer.language}</span>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as (typeof LOCALES)[number])}
          className="cursor-pointer bg-transparent uppercase tracking-widest text-bone/85 focus:outline-none"
        >
          {LOCALES.map((l) => (
            <option key={l} value={l} className="text-ink">
              {LOCALE_LABEL[l]}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <ul className="space-y-2 text-sm text-smoke">
      {LOCALES.map((l) => (
        <li key={l}>
          <button
            type="button"
            onClick={() => setLocale(l)}
            aria-current={locale === l ? "true" : undefined}
            className={`transition-colors hover:text-bone ${locale === l ? "text-bone underline" : ""}`}
          >
            {LOCALE_LABEL[l]}
          </button>
        </li>
      ))}
    </ul>
  );
}
