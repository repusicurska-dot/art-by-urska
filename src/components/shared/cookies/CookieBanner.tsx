"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  acceptAll,
  COOKIE_CATEGORY_INFO,
  CookieCategory,
  getConsentSnapshot,
  getServerConsentSnapshot,
  rejectNonEssential,
  subscribeConsent,
  writeConsent,
} from "@/lib/cookieConsent";

export const OPEN_COOKIE_PREFERENCES_EVENT = "open-cookie-preferences";

const CATEGORIES = Object.keys(COOKIE_CATEGORY_INFO) as CookieCategory[];
const DEFAULT_DRAFT: Record<CookieCategory, boolean> = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

export default function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot
  );
  const [managing, setManaging] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [draft, setDraft] = useState<Record<CookieCategory, boolean>>(DEFAULT_DRAFT);

  useEffect(() => {
    function openPreferences() {
      setDraft(getConsentSnapshot()?.categories ?? DEFAULT_DRAFT);
      setManaging(true);
      setForceOpen(true);
    }
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
  }, []);

  const visible = forceOpen || !consent;
  if (!visible) return null;

  function close() {
    setForceOpen(false);
    setManaging(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[200] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-2xl bg-charcoal text-ivory rounded-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-6 md:p-8">
        {!managing ? (
          <>
            <p className="text-sm leading-relaxed text-ivory/85">
              We use necessary cookies to run this site. With your consent, we&rsquo;d also use
              analytics, marketing, and preference cookies — none are currently active. Read more
              in our{" "}
              <a href="/legal/cookies" className="underline hover:text-gold-400">
                Cookie Policy
              </a>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  acceptAll();
                  close();
                }}
                className="text-sm tracking-widest uppercase bg-gold-600 text-ivory hover:bg-gold-400 transition-colors rounded-full px-6 py-3"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => {
                  rejectNonEssential();
                  close();
                }}
                className="text-sm tracking-widest uppercase border border-ivory/30 hover:border-gold-400 transition-colors rounded-full px-6 py-3"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraft(getConsentSnapshot()?.categories ?? DEFAULT_DRAFT);
                  setManaging(true);
                }}
                className="text-sm tracking-widest uppercase text-ivory/70 hover:text-gold-400 transition-colors px-2 py-3"
              >
                Manage preferences
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-heading text-xl mb-4">Cookie preferences</h2>
            <div className="space-y-4">
              {CATEGORIES.map((category) => {
                const info = COOKIE_CATEGORY_INFO[category];
                return (
                  <label key={category} className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={draft[category]}
                      disabled={info.required}
                      onChange={(e) =>
                        setDraft((prev) => ({ ...prev, [category]: e.target.checked }))
                      }
                      className="mt-1"
                    />
                    <span>
                      <span className="block text-sm">
                        {info.label}
                        {info.required && (
                          <span className="text-ivory/50"> — always on</span>
                        )}
                      </span>
                      <span className="block text-xs text-ivory/50 mt-0.5">{info.description}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  writeConsent(draft);
                  close();
                }}
                className="text-sm tracking-widest uppercase bg-gold-600 text-ivory hover:bg-gold-400 transition-colors rounded-full px-6 py-3"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => setManaging(false)}
                className="text-sm tracking-widest uppercase text-ivory/70 hover:text-gold-400 transition-colors px-2 py-3"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
