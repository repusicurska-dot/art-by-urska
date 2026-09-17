"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import type { Lang } from "@/lib/astro/texts";

type Mode = "password" | "forgot";

/**
 * Signing in to the Star Business Calendar: email and password, with "forgot my password" next
 * to it. Members from before passwords existed (and anyone who would rather not type one) can
 * still ask for a one-time link by email.
 */
export default function StarCalendarLogin({ expired, next }: { expired: boolean; next: string }) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("sl");
  const [mode, setMode] = useState<Mode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const sl = lang === "sl";
  // The same sign-in serves both subscriptions; the page dresses itself for wherever they came from.
  const poetry = next.startsWith("/poetry");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!navigator.language.toLowerCase().startsWith("sl")) setLang("en");
  }, []);

  async function post(url: string, payload: Record<string, unknown>) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, lang }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    return { ok: !!res?.ok, data: data as Record<string, unknown> };
  }

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setStatus("working");
    setError("");
    const { ok, data } = await post("/api/sbc/login", { email, password });
    if (!ok) {
      setError((data.error as string) ?? (sl ? "Prijava ni uspela." : "Sign-in failed."));
      setStatus("error");
      return;
    }
    router.push(next);
    router.refresh();
  }

  async function sendLink() {
    setStatus("working");
    setError("");
    const { ok, data } = await post("/api/sbc/login", { email, mode: "link" });
    if (!ok) {
      setError((data.error as string) ?? (sl ? "Ni uspelo." : "That didn't work."));
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  async function forgot(e: React.FormEvent) {
    e.preventDefault();
    setStatus("working");
    setError("");
    const { ok, data } = await post("/api/sbc/password", { action: "forgot", email });
    if (!ok) {
      setError((data.error as string) ?? (sl ? "Ni uspelo." : "That didn't work."));
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  const field = "w-full rounded-sm border border-bone/20 bg-paper px-4 py-3 text-bone focus:border-bone focus:outline-none";
  const label = "mb-2 block text-xs uppercase tracking-widest text-bone";

  return (
    <div className="spirit-light relative isolate min-h-[70vh]" lang={lang}>
      <Container className="max-w-md px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-smoke">
          {poetry
            ? `🕊️ ${sl ? "Pisma iz ateljeja" : "Letters from the studio"}`
            : `✨ ${sl ? "Zvezdni poslovni koledar" : "Star Business Calendar"}`}
        </p>
        <h1 className="mt-5 font-heading text-4xl text-bone">
          {mode === "forgot" ? (sl ? "Pozabljeno geslo" : "Forgot password") : sl ? "Prijava" : "Sign in"}
        </h1>

        {expired && status !== "sent" && (
          <p className="mt-4 rounded-xl bg-paper/80 px-4 py-3 text-bone">
            {sl ? "Povezava je potekla ali ni veljavna. Prijavi se z geslom ali zahtevaj novo povezavo." : "That link has expired or isn't valid. Sign in with your password or request a new link."}
          </p>
        )}

        {status === "sent" ? (
          <>
            <p className="mt-8 rounded-2xl bg-paper/85 px-5 py-6 text-bone">
              ✉️{" "}
              {sl
                ? "Če ta naslov pri nas obstaja, je sporočilo že na poti. Preveri tudi neželeno pošto."
                : "If that address is registered with us, the email is on its way. Check your spam folder too."}
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setMode("password");
              }}
              className="mt-6 text-sm text-bone underline"
            >
              {sl ? "Nazaj na prijavo" : "Back to sign in"}
            </button>
          </>
        ) : mode === "forgot" ? (
          <form onSubmit={forgot} className="mt-8 space-y-4 text-left">
            <p className="text-sm text-bone">
              {sl
                ? "Vpiši e-naslov svojega računa in poslali ti bomo povezavo za nastavitev novega gesla."
                : "Enter your account's email and we'll send you a link to set a new password."}
            </p>
            <div>
              <label htmlFor="sbc-forgot-email" className={label}>
                {sl ? "E-naslov" : "Email"}
              </label>
              <input id="sbc-forgot-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="email" />
            </div>
            {status === "error" && (
              <p role="alert" className="text-sm text-terracotta">
                {error}
              </p>
            )}
            <button type="submit" disabled={status === "working"} className="btn-primary w-full">
              {status === "working" ? "…" : sl ? "Pošlji povezavo" : "Send link"}
            </button>
            <button type="button" onClick={() => setMode("password")} className="w-full py-2 text-xs uppercase tracking-widest text-bone underline">
              {sl ? "Nazaj na prijavo" : "Back to sign in"}
            </button>
          </form>
        ) : (
          <form onSubmit={signIn} className="mt-8 space-y-4 text-left">
            <div>
              <label htmlFor="sbc-login-email" className={label}>
                {sl ? "E-naslov" : "Email"}
              </label>
              <input id="sbc-login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="sbc-login-password" className={label}>
                {sl ? "Geslo" : "Password"}
              </label>
              <input
                id="sbc-login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={field}
                autoComplete="current-password"
              />
            </div>
            {status === "error" && (
              <p role="alert" className="text-sm text-terracotta">
                {error}
              </p>
            )}
            <button type="submit" disabled={status === "working"} className="btn-primary w-full">
              {status === "working" ? "…" : sl ? "Prijava" : "Sign in"}
            </button>
            <div className="flex flex-wrap justify-between gap-3 pt-1 text-xs uppercase tracking-widest text-bone">
              <button type="button" onClick={() => setMode("forgot")} className="underline">
                {sl ? "Pozabljeno geslo?" : "Forgot password?"}
              </button>
              <button type="button" onClick={sendLink} className="underline" disabled={!email || status === "working"}>
                {sl ? "Pošlji mi povezavo" : "Email me a link"}
              </button>
            </div>
          </form>
        )}

        <Link href={poetry ? "/poetry" : "/zvezdni-koledar"} className="mt-10 inline-block text-sm text-bone underline">
          {sl ? "Še nimaš računa? 7 dni brezplačno →" : "No account yet? 7 days free →"}
        </Link>
      </Container>
    </div>
  );
}
