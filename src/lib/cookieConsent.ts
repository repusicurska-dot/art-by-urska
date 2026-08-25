"use client";

const STORAGE_KEY = "artbyurska.cookie-consent.v1";
const CONSENT_VERSION = 1;

export type CookieCategory = "necessary" | "analytics" | "marketing" | "preferences";

export interface CookieConsentState {
  version: number;
  decidedAt: string;
  categories: Record<CookieCategory, boolean>;
}

export const COOKIE_CATEGORY_INFO: Record<
  CookieCategory,
  { label: string; description: string; required: boolean }
> = {
  necessary: {
    label: "Necessary",
    description: "Required for the site to function — cannot be switched off.",
    required: true,
  },
  analytics: {
    label: "Analytics",
    description:
      "Would help us understand how the site is used. Not currently in use on this site.",
    required: false,
  },
  marketing: {
    label: "Marketing",
    description: "Would be used to personalize offers. Not currently in use on this site.",
    required: false,
  },
  preferences: {
    label: "Preferences",
    description: "Would remember choices like display settings. Not currently in use on this site.",
    required: false,
  },
};

type Listener = () => void;
let listeners: Listener[] = [];
let cached: CookieConsentState | null | undefined;

function readFromStorage(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getConsentSnapshot(): CookieConsentState | null {
  if (cached === undefined) cached = readFromStorage();
  return cached;
}

export function getServerConsentSnapshot(): CookieConsentState | null {
  return null;
}

export function subscribeConsent(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function writeConsent(categories: Record<CookieCategory, boolean>) {
  const state: CookieConsentState = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    categories: { ...categories, necessary: true },
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  cached = state;
  listeners.forEach((l) => l());
  return state;
}

export function acceptAll() {
  return writeConsent({ necessary: true, analytics: true, marketing: true, preferences: true });
}

export function rejectNonEssential() {
  return writeConsent({ necessary: true, analytics: false, marketing: false, preferences: false });
}

/** Any future analytics/marketing script must check this before loading. */
export function hasConsent(category: CookieCategory): boolean {
  const state = getConsentSnapshot();
  if (!state) return category === "necessary";
  return state.categories[category] ?? false;
}
