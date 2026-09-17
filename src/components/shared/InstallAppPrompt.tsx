"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import InstallDemo, { type DemoPlatform } from "./InstallDemo";
import { getConsentSnapshot, subscribeConsent } from "@/lib/cookieConsent";

/** Fired by the footer's "Add to home screen" link to open the prompt on demand. */
export const OPEN_INSTALL_PROMPT_EVENT = "open-install-prompt";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "au-install-dismissed-until";

function detectPlatform(): DemoPlatform | "other" {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/**
 * Tells phone visitors, shortly after they arrive, that byurska.com is also an app — and shows
 * them how to add it with a short animated walkthrough for their phone (iPhone or Android, with
 * a switch for the other one). On Android, where the browser allows it, there's also a real
 * one-tap install button. Snoozed for 14 days when closed, never shown inside the installed
 * app, and always reachable from "Add to home screen" in the footer.
 */
export default function InstallAppPrompt() {
  // The phone app is "Spirituality by Urška", so it offers itself only on the Spirituality page,
  // and only on phones. Elsewhere phone visitors can still open it from the footer link.
  const pathname = usePathname();
  const offersItself = pathname === "/spirituality";
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<DemoPlatform>("ios");
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [sl, setSl] = useState(true);

  useEffect(() => {
    if (isStandalone()) return;
    const detected = detectPlatform();
    /* eslint-disable react-hooks/set-state-in-effect */
    setPlatform(detected === "android" ? "android" : "ios");
    setSl(navigator.language.toLowerCase().startsWith("sl"));
    /* eslint-enable react-hooks/set-state-in-effect */

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    // Phones only — on a computer there is nothing to add to a home screen.
    const onOpen = () => detected !== "other" && setOpen(true);
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener(OPEN_INSTALL_PROMPT_EVENT, onOpen);

    let snoozed = false;
    try {
      snoozed = Number(window.localStorage.getItem(DISMISS_KEY) ?? 0) > Date.now();
    } catch {
      snoozed = false;
    }
    // On arrival, phones only — after the intro has had its moment, and never on top of the
    // cookie banner: if the visitor hasn't answered it yet, wait until they have.
    let timer: number | undefined;
    let unsubscribe: (() => void) | undefined;
    if (detected !== "other" && !snoozed && offersItself) {
      if (getConsentSnapshot()) {
        timer = window.setTimeout(() => setOpen(true), 5000);
      } else {
        unsubscribe = subscribeConsent(() => {
          unsubscribe?.();
          timer = window.setTimeout(() => setOpen(true), 2500);
        });
      }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener(OPEN_INSTALL_PROMPT_EVENT, onOpen);
      if (timer) window.clearTimeout(timer);
      unsubscribe?.();
    };
  }, [offersItself]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now() + 14 * 86400000));
    } catch {
      // Private mode — it will simply ask again next visit.
    }
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice.catch(() => null);
    setDeferred(null);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="install-title">
      <button type="button" aria-label={sl ? "Zapri" : "Close"} onClick={close} className="absolute inset-0 bg-black/55" />
      <div
        className="relative m-3 w-full max-w-sm rounded-3xl border border-white/10 px-5 pb-5 pt-6 shadow-2xl"
        style={{ background: "linear-gradient(180deg,#1b1822,#0b0a0d)", color: "#f2f0eb" }}
      >
        <button type="button" onClick={close} aria-label={sl ? "Zapri" : "Close"} className="absolute right-4 top-3 text-2xl leading-none opacity-70">
          ×
        </button>

        <p className="text-center text-[11px] uppercase tracking-[0.3em]" style={{ color: "#d6bb8c" }}>
          {sl ? "Novo · aplikacija za telefon" : "New · phone app"}
        </p>
        <h2 id="install-title" className="mt-2 text-center font-heading text-2xl leading-snug">
          {sl ? "Spirituality by Urška je zdaj aplikacija 📱" : "Spirituality by Urška is now an app 📱"}
        </h2>
        <p className="mt-2 text-center text-sm leading-relaxed opacity-90">
          {sl
            ? "Dodaj si jo na domači zaslon: karta dneva, luna, minuta tišine in tvoj Zvezdni koledar so ti z enim dotikom na voljo — hitreje, čez cel zaslon, brez brskalnika."
            : "Add it to your home screen: your card of the day, the moon, a minute of stillness and your Star Calendar are one tap away — faster, full-screen, no browser bar."}
        </p>

        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label={sl ? "Vrsta telefona" : "Phone type"}>
          {(["ios", "android"] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={platform === p}
              onClick={() => setPlatform(p)}
              className="rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest"
              style={{ borderColor: platform === p ? "#d6bb8c" : "rgba(255,255,255,.2)", color: platform === p ? "#d6bb8c" : "#f2f0eb" }}
            >
              {p === "ios" ? "🍎 iPhone" : "🤖 Android"}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <InstallDemo platform={platform} sl={sl} />
        </div>

        {platform === "android" && deferred ? (
          <button type="button" onClick={install} className="mt-4 w-full rounded-full py-3 text-sm font-semibold uppercase tracking-widest" style={{ background: "#d6bb8c", color: "#030303" }}>
            {sl ? "Namesti zdaj" : "Install now"}
          </button>
        ) : (
          <button type="button" onClick={close} className="mt-4 w-full rounded-full py-3 text-sm font-semibold uppercase tracking-widest" style={{ background: "#d6bb8c", color: "#030303" }}>
            {sl ? "Razumem" : "Got it"}
          </button>
        )}
        <button type="button" onClick={close} className="mt-2 w-full py-2 text-xs uppercase tracking-widest opacity-60">
          {sl ? "Ne zdaj" : "Not now"}
        </button>
      </div>
    </div>
  );
}
