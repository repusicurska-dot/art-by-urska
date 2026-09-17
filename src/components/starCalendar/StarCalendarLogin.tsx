"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import type { Lang } from "@/lib/astro/texts";

export default function StarCalendarLogin({ expired }: { expired: boolean }) {
  const [lang, setLang] = useState<Lang>("sl");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const sl = lang === "sl";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!navigator.language.toLowerCase().startsWith("sl")) setLang("en");
  }, []);

  return (
    <div className="spirit-light spirit-ground relative isolate min-h-[70vh]" lang={lang}>
      <Container className="max-w-md px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-smoke">✨ {sl ? "Zvezdni poslovni koledar" : "Star Business Calendar"}</p>
        <h1 className="mt-5 font-heading text-4xl text-bone">{sl ? "Prijava" : "Sign in"}</h1>
        <p className="mt-4 text-bone">
          {sl ? "Vpiši e-naslov naročnine in poslali ti bomo povezavo za prijavo — brez gesla." : "Enter your subscription email and we'll send you a sign-in link — no password needed."}
        </p>
        {expired && (
          <p className="mt-4 rounded-xl bg-paper/80 px-4 py-3 text-bone">
            {sl ? "Povezava je potekla ali ni veljavna. Zahtevaj novo." : "That link has expired or isn't valid. Request a new one."}
          </p>
        )}

        {status === "sent" ? (
          <p className="mt-8 rounded-2xl bg-paper/85 px-5 py-6 text-bone">
            ✉️ {sl ? "Če je ta naslov naročen, je povezava za prijavo že na poti. Preveri tudi neželeno pošto." : "If this address has a subscription, a sign-in link is on its way. Check your spam folder too."}
          </p>
        ) : (
          <form
            className="mt-8 space-y-4 text-left"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus("sending");
              const res = await fetch("/api/sbc/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, lang }),
              }).catch(() => null);
              const data = res ? await res.json().catch(() => ({})) : {};
              if (!res || !res.ok) {
                setError(data.error ?? (sl ? "Povezava ni uspela." : "Couldn't connect."));
                setStatus("error");
                return;
              }
              setStatus("sent");
            }}
          >
            <label htmlFor="sbc-login-email" className="block text-xs uppercase tracking-widest text-bone">
              {sl ? "E-naslov" : "Email"}
            </label>
            <input
              id="sbc-login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-bone/20 bg-paper px-4 py-3 text-bone focus:border-bone focus:outline-none"
            />
            {status === "error" && (
              <p role="alert" className="text-sm text-terracotta">
                {error}
              </p>
            )}
            <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
              {status === "sending" ? "…" : sl ? "Pošlji povezavo" : "Send link"}
            </button>
          </form>
        )}

        <Link href="/zvezdni-koledar" className="mt-10 inline-block text-sm text-bone underline">
          {sl ? "Še nimaš naročnine? 7 dni brezplačno →" : "No subscription yet? 7 days free →"}
        </Link>
      </Container>
    </div>
  );
}
