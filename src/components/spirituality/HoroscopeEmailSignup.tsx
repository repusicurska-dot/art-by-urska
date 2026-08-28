"use client";

import { useState } from "react";
import type { Lang } from "./zodiacData";

const LABELS: Record<
  Lang,
  {
    heading: string;
    body: string;
    placeholder: string;
    button: string;
    sending: string;
    success: string;
    disclaimer: string;
  }
> = {
  sl: {
    heading: "Prejemaj svoj horoskop vsak teden",
    body: "Pusti email in tvoje znamenje, in vsak teden ti pošljemo novo sporočilo zate.",
    placeholder: "tvoj@email.com",
    button: "Prijavi se",
    sending: "Pošiljam …",
    success: "Hvala! Zabeležili smo tvojo prijavo.",
    disclaimer:
      "Ta obrazec še ni povezan s pravim sistemom za pošiljanje e-pošte — prijave se trenutno beležijo, a še ne prejmeš tedenskih sporočil.",
  },
  en: {
    heading: "Get your horoscope every week",
    body: "Leave your email and your sign, and we'll send you a new message every week.",
    placeholder: "you@email.com",
    button: "Subscribe",
    sending: "Sending …",
    success: "Thank you! We've noted your sign-up.",
    disclaimer:
      "This form isn't yet connected to a real email-sending system — sign-ups are currently recorded, but you won't receive weekly messages yet.",
  },
};

export default function HoroscopeEmailSignup({
  lang,
  signKey,
  signName,
}: {
  lang: Lang;
  signKey: string;
  signName: string;
}) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const labels = LABELS[lang];

  return (
    <div className="mt-16 w-full max-w-md">
      <div className="rounded-lg border border-bone/10 bg-raised/40 px-6 py-7 text-center">
        <h4 className="font-heading text-lg text-bone">{labels.heading}</h4>
        <p className="mt-2 text-sm text-bone/60">{labels.body}</p>

        {status === "sent" ? (
          <p className="mt-5 text-sm text-bone/85">{labels.success}</p>
        ) : (
          <form
            className="mt-5 flex flex-col gap-3 sm:flex-row"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus("submitting");
              setError("");
              try {
                const res = await fetch("/api/horoscope-subscribe", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, sign: signKey, company }),
                });
                const data = await res.json();
                if (!res.ok) {
                  setError(data.error ?? "Something went wrong.");
                  setStatus("error");
                  return;
                }
                setStatus("sent");
              } catch {
                setError("Couldn't reach the server.");
                setStatus("error");
              }
            }}
          >
            <div className="hidden" aria-hidden="true">
              <label htmlFor="hs-company">Company</label>
              <input
                id="hs-company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <label htmlFor="hs-email" className="sr-only">
              Email
            </label>
            <input
              id="hs-email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={labels.placeholder}
              className="w-full flex-1 rounded-sm border border-bone/20 bg-transparent px-4 py-2.5 text-sm text-bone focus:outline-none focus:border-bone"
            />
            <button type="submit" disabled={status === "submitting"} className="btn-primary shrink-0">
              {status === "submitting" ? labels.sending : labels.button}
            </button>
          </form>
        )}

        {status === "error" && (
          <p role="alert" className="mt-3 text-xs text-terracotta">
            {error}
          </p>
        )}

        <p className="mt-4 text-[11px] text-bone/40 italic">{labels.disclaimer}</p>
        <p className="mt-1 text-[11px] text-bone/30">{signName}</p>
      </div>
    </div>
  );
}
