"use client";

import { useEffect, useState } from "react";

export type DemoPlatform = "ios" | "android";

const STEP_MS = 2600;
const STEPS = 4;

/**
 * A looping animated "video" of adding byurska.com to the home screen, drawn in HTML/CSS
 * (light, sharp on every screen, no video file to download) — one version for iPhone
 * (Safari: Share → Add to Home Screen → Add) and one for Android (Chrome: ⋮ → Install app →
 * Install). A finger moves and taps; the last scene shows the app icon landing on the
 * home screen. With reduced motion it holds on each step without animating.
 */
export default function InstallDemo({ platform, sl }: { platform: DemoPlatform; sl: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep(0);
    const id = window.setInterval(() => setStep((s) => (s + 1) % STEPS), STEP_MS);
    return () => window.clearInterval(id);
  }, [platform]);

  const ios = platform === "ios";
  const captions = ios
    ? sl
      ? ["1. Tapni »Deli« ⬆︎", "2. Izberi »Dodaj na domači zaslon« ➕", "3. Tapni »Dodaj«", "✨ Aplikacija je na domačem zaslonu"]
      : ["1. Tap “Share” ⬆︎", "2. Choose “Add to Home Screen” ➕", "3. Tap “Add”", "✨ The app is on your home screen"]
    : sl
      ? ["1. Odpri meni ⋮", "2. Izberi »Namesti aplikacijo«", "3. Tapni »Namesti«", "✨ Aplikacija je na domačem zaslonu"]
      : ["1. Open the menu ⋮", "2. Choose “Install app”", "3. Tap “Install”", "✨ The app is on your home screen"];

  // Where the finger points in each step (percent of the phone screen).
  const finger = ios
    ? [
        { x: 50, y: 92 },
        { x: 50, y: 66 },
        { x: 84, y: 9 },
        { x: 50, y: 110 },
      ]
    : [
        { x: 90, y: 5 },
        { x: 62, y: 23 },
        { x: 76, y: 58 },
        { x: 50, y: 110 },
      ];

  const gold = "#d6bb8c";

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative overflow-hidden"
        style={{ width: 176, height: 340, borderRadius: 30, border: "7px solid #2a2630", background: "#f3eadf", boxShadow: "0 18px 40px -12px rgba(0,0,0,.6)" }}
        aria-hidden="true"
      >
        {/* The website */}
        <div className="absolute inset-0" style={{ opacity: step === 3 ? 0 : 1, transition: "opacity .5s" }}>
          {!ios && (
            <div className="flex items-center gap-1 px-2" style={{ height: 26, background: "#fff", borderBottom: "1px solid #e6dccf" }}>
              <div className="flex-1 rounded-full px-2 text-[8px] leading-[16px]" style={{ background: "#efe9e2", color: "#555" }}>
                byurska.com/spirituality
              </div>
              <span className="text-[13px] font-bold" style={{ color: step === 0 ? "#b5652a" : "#444" }}>
                ⋮
              </span>
            </div>
          )}
          <div className="px-3 pt-4 text-center">
            <div className="mx-auto h-2 w-16 rounded-full" style={{ background: "#d9cde6" }} />
            <p className="mt-3 font-heading text-[14px] leading-tight" style={{ color: "#2a2233" }}>
              Spirituality by Urška
            </p>
            <div className="mx-auto mt-3 h-20 w-24 rounded-lg" style={{ background: "linear-gradient(135deg,#f4cf94,#cdb8ec)" }} />
            <div className="mx-auto mt-3 h-1.5 w-28 rounded-full" style={{ background: "#e2d6cb" }} />
            <div className="mx-auto mt-1.5 h-1.5 w-20 rounded-full" style={{ background: "#e2d6cb" }} />
            <div className="mx-auto mt-3 h-5 w-20 rounded-full" style={{ background: "#4b3a5e" }} />
          </div>
          {ios && (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-around" style={{ height: 30, background: "rgba(255,255,255,.95)", borderTop: "1px solid #e6dccf" }}>
              <span className="text-[10px] text-[#007aff]">‹</span>
              <span className="text-[10px] text-[#007aff]">›</span>
              <span className="text-[13px]" style={{ color: "#007aff", transform: step === 0 ? "scale(1.25)" : "none", transition: "transform .3s" }}>
                ⬆︎
              </span>
              <span className="text-[10px] text-[#007aff]">▢</span>
            </div>
          )}
        </div>

        {/* Step 2 — iOS share sheet / Android menu */}
        {ios ? (
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-2xl px-2 pb-2 pt-3"
            style={{ height: "58%", background: "#f2f2f7", transform: step === 1 || step === 2 ? "translateY(0)" : "translateY(105%)", transition: "transform .5s cubic-bezier(.2,.9,.3,1.2)" }}
          >
            <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-[#c7c7cc]" />
            {[sl ? "Kopiraj" : "Copy", sl ? "Dodaj v bralni seznam" : "Add to Reading List", sl ? "Dodaj na domači zaslon  ➕" : "Add to Home Screen  ➕", sl ? "Natisni" : "Print"].map((row, i) => (
              <div
                key={row}
                className="mb-1 rounded-lg px-2 text-[9px] leading-[22px]"
                style={{ background: i === 2 && step >= 1 ? "#ffe8b8" : "#fff", color: "#111", fontWeight: i === 2 ? 700 : 400, transition: "background .3s" }}
              >
                {row}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="absolute right-1 top-7 w-28 rounded-md py-1 shadow-lg"
            style={{ background: "#fff", transformOrigin: "top right", transform: step === 1 ? "scale(1)" : "scale(0)", transition: "transform .35s" }}
          >
            {[sl ? "Nov zavihek" : "New tab", sl ? "Zaznamki" : "Bookmarks", sl ? "Namesti aplikacijo" : "Install app", sl ? "Nastavitve" : "Settings"].map((row, i) => (
              <div key={row} className="px-2 text-[9px] leading-[20px]" style={{ background: i === 2 ? "#ffe8b8" : "transparent", color: "#111", fontWeight: i === 2 ? 700 : 400 }}>
                {i === 2 ? "📲 " : ""}
                {row}
              </div>
            ))}
          </div>
        )}

        {/* Step 3 — confirm */}
        {ios ? (
          <div className="absolute inset-0" style={{ background: "#f2f2f7", opacity: step === 2 ? 1 : 0, transition: "opacity .4s" }}>
            <div className="flex items-center justify-between px-2 text-[9px]" style={{ height: 30, color: "#007aff" }}>
              <span>{sl ? "Prekliči" : "Cancel"}</span>
              <span className="font-semibold text-[#111]">{sl ? "Dodaj na domači zaslon" : "Add to Home Screen"}</span>
              <span className="rounded px-1 font-bold" style={{ background: step === 2 ? "#ffe8b8" : "transparent" }}>
                {sl ? "Dodaj" : "Add"}
              </span>
            </div>
            <div className="mx-2 mt-2 flex items-center gap-2 rounded-lg bg-white p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/app-icons/icon-192.png" alt="" width={36} height={36} className="rounded-lg" />
              <div className="text-[9px] text-[#111]">
                <p className="font-semibold">Spirituality</p>
                <p className="text-[#888]">byurska.com</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,.35)", opacity: step === 2 ? 1 : 0, transition: "opacity .4s" }}>
            <div className="w-36 rounded-xl bg-white p-3 text-[9px] text-[#111]" style={{ transform: step === 2 ? "scale(1)" : "scale(.8)", transition: "transform .4s" }}>
              <p className="font-semibold">{sl ? "Namestim aplikacijo?" : "Install app?"}</p>
              <div className="mt-2 flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/app-icons/icon-192.png" alt="" width={28} height={28} className="rounded-md" />
                <span>Spirituality by Urška</span>
              </div>
              <div className="mt-3 flex justify-end gap-3">
                <span className="text-[#666]">{sl ? "Prekliči" : "Cancel"}</span>
                <span className="rounded px-1 font-bold" style={{ color: "#1a73e8", background: "#ffe8b8" }}>
                  {sl ? "Namesti" : "Install"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 — home screen */}
        <div
          className="absolute inset-0 grid grid-cols-4 content-start gap-x-2 gap-y-3 px-3 pt-8"
          style={{ background: "linear-gradient(160deg,#3b2f5c,#b36a5e 70%,#e9b973)", opacity: step === 3 ? 1 : 0, transition: "opacity .5s" }}
        >
          {["#5ac8fa", "#4cd964", "#ff9500", "#ff2d55", "#5856d6", "#ffcc00", "#34aadc"].map((c, i) => (
            <div key={i} className="mx-auto h-7 w-7 rounded-lg" style={{ background: c, opacity: 0.85 }} />
          ))}
          <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/app-icons/icon-192.png"
              alt=""
              width={28}
              height={28}
              className="rounded-lg"
              style={{ transform: step === 3 ? "scale(1)" : "scale(0)", transition: "transform .6s cubic-bezier(.3,1.8,.5,1) .35s", boxShadow: `0 0 0 2px ${gold}` }}
            />
            <span className="mt-0.5 text-[6px] text-white">Spirituality</span>
          </div>
        </div>

        {/* Finger */}
        <div
          className="pointer-events-none absolute text-[26px]"
          style={{
            left: `${finger[step].x}%`,
            top: `${finger[step].y}%`,
            transform: "translate(-30%, -10%)",
            transition: "left .7s ease-in-out, top .7s ease-in-out",
            filter: "drop-shadow(0 2px 3px rgba(0,0,0,.35))",
          }}
        >
          <span className="install-demo-tap block">👆</span>
        </div>
      </div>

      <p className="mt-3 min-h-[2.5rem] text-center text-sm font-medium" aria-live="polite">
        {captions[step]}
      </p>
      <div className="mt-1 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: STEPS }).map((_, i) => (
          <span key={i} className="h-1.5 rounded-full transition-all" style={{ width: i === step ? 16 : 6, background: i === step ? gold : "rgba(255,255,255,.3)" }} />
        ))}
      </div>
    </div>
  );
}
