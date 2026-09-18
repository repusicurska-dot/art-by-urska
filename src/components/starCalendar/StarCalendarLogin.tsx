"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import type { Lang } from "@/lib/astro/texts";
import { useLanguage } from "@/i18n/LanguageProvider";

type Mode = "password" | "forgot";

/**
 * Signing in to the Star Business Calendar: email and password, with "forgot my password" next
 * to it. Members from before passwords existed (and anyone who would rather not type one) can
 * still ask for a one-time link by email.
 */
const COPY: Record<Lang, {
  poetry: string;
  calendar: string;
  forgotTitle: string;
  signInTitle: string;
  expired: string;
  sent: string;
  backToSignIn: string;
  forgotIntro: string;
  email: string;
  password: string;
  sendLink: string;
  signIn: string;
  forgotLink: string;
  emailMeLink: string;
  noAccount: string;
  signInFailed: string;
  failed: string;
}> = {
  sl: {
    poetry: "Pisma iz ateljeja",
    calendar: "Zvezdni poslovni koledar",
    forgotTitle: "Pozabljeno geslo",
    signInTitle: "Prijava",
    expired: "Povezava je potekla ali ni veljavna. Prijavi se z geslom ali zahtevaj novo povezavo.",
    sent: "Če ta naslov pri nas obstaja, je sporočilo že na poti. Preveri tudi neželeno pošto.",
    backToSignIn: "Nazaj na prijavo",
    forgotIntro: "Vpiši e-naslov svojega računa in poslali ti bomo povezavo za nastavitev novega gesla.",
    email: "E-naslov",
    password: "Geslo",
    sendLink: "Pošlji povezavo",
    signIn: "Prijava",
    forgotLink: "Pozabljeno geslo?",
    emailMeLink: "Pošlji mi povezavo",
    noAccount: "Še nimaš računa? 7 dni brezplačno →",
    signInFailed: "Prijava ni uspela.",
    failed: "Ni uspelo.",
  },
  en: {
    poetry: "Letters from the studio",
    calendar: "Star Business Calendar",
    forgotTitle: "Forgot password",
    signInTitle: "Sign in",
    expired: "That link has expired or isn't valid. Sign in with your password or request a new link.",
    sent: "If that address is registered with us, the email is on its way. Check your spam folder too.",
    backToSignIn: "Back to sign in",
    forgotIntro: "Enter your account's email and we'll send you a link to set a new password.",
    email: "Email",
    password: "Password",
    sendLink: "Send link",
    signIn: "Sign in",
    forgotLink: "Forgot password?",
    emailMeLink: "Email me a link",
    noAccount: "No account yet? 7 days free →",
    signInFailed: "Sign-in failed.",
    failed: "That didn't work.",
  },
  hr: {
    poetry: "Pisma iz ateljea",
    calendar: "Zvjezdani poslovni kalendar",
    forgotTitle: "Zaboravljena lozinka",
    signInTitle: "Prijava",
    expired: "Poveznica je istekla ili nije valjana. Prijavi se lozinkom ili zatraži novu poveznicu.",
    sent: "Ako ta adresa kod nas postoji, poruka je već na putu. Provjeri i neželjenu poštu.",
    backToSignIn: "Natrag na prijavu",
    forgotIntro: "Upiši e-adresu svog računa i poslat ćemo ti poveznicu za postavljanje nove lozinke.",
    email: "E-adresa",
    password: "Lozinka",
    sendLink: "Pošalji poveznicu",
    signIn: "Prijava",
    forgotLink: "Zaboravljena lozinka?",
    emailMeLink: "Pošalji mi poveznicu",
    noAccount: "Još nemaš račun? 7 dana besplatno →",
    signInFailed: "Prijava nije uspjela.",
    failed: "Nije uspjelo.",
  },
  de: {
    poetry: "Briefe aus dem Atelier",
    calendar: "Sternen-Geschäftskalender",
    forgotTitle: "Passwort vergessen",
    signInTitle: "Anmelden",
    expired: "Dieser Link ist abgelaufen oder ungültig. Melde dich mit deinem Passwort an oder fordere einen neuen Link an.",
    sent: "Wenn es diese Adresse bei uns gibt, ist die E-Mail schon unterwegs. Sieh auch im Spam nach.",
    backToSignIn: "Zurück zur Anmeldung",
    forgotIntro: "Gib die E-Mail deines Kontos ein, und wir schicken dir einen Link, um ein neues Passwort zu setzen.",
    email: "E-Mail",
    password: "Passwort",
    sendLink: "Link senden",
    signIn: "Anmelden",
    forgotLink: "Passwort vergessen?",
    emailMeLink: "Schick mir einen Link",
    noAccount: "Noch kein Konto? 7 Tage kostenlos →",
    signInFailed: "Die Anmeldung hat nicht geklappt.",
    failed: "Das hat nicht geklappt.",
  },
  it: {
    poetry: "Lettere dallo studio",
    calendar: "Calendario stellare d'affari",
    forgotTitle: "Password dimenticata",
    signInTitle: "Accedi",
    expired: "Questo link è scaduto o non è valido. Accedi con la password o richiedi un nuovo link.",
    sent: "Se quell'indirizzo è registrato da noi, l'email è già in viaggio. Controlla anche lo spam.",
    backToSignIn: "Torna all'accesso",
    forgotIntro: "Inserisci l'email del tuo account e ti manderemo un link per impostare una nuova password.",
    email: "Email",
    password: "Password",
    sendLink: "Invia il link",
    signIn: "Accedi",
    forgotLink: "Password dimenticata?",
    emailMeLink: "Mandami un link",
    noAccount: "Non hai ancora un account? 7 giorni gratis →",
    signInFailed: "Accesso non riuscito.",
    failed: "Non ha funzionato.",
  },
};

export default function StarCalendarLogin({ expired, next }: { expired: boolean; next: string }) {
  const router = useRouter();
  // Follows the site-wide switcher; it also picks the language of any email this form sends.
  const { locale } = useLanguage();
  const lang: Lang = locale;
  const [mode, setMode] = useState<Mode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const t = COPY[lang];
  // The same sign-in serves both subscriptions; the page dresses itself for wherever they came from.
  const poetry = next.startsWith("/poetry");

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
      setError((data.error as string) ?? t.signInFailed);
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
      setError((data.error as string) ?? t.failed);
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
      setError((data.error as string) ?? t.failed);
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
            ? `🕊️ ${t.poetry}`
            : `✨ ${t.calendar}`}
        </p>
        <h1 className="mt-5 font-heading text-4xl text-bone">
          {mode === "forgot" ? t.forgotTitle : t.signInTitle}
        </h1>

        {expired && status !== "sent" && (
          <p className="mt-4 rounded-xl bg-paper/80 px-4 py-3 text-bone">
            {t.expired}
          </p>
        )}

        {status === "sent" ? (
          <>
            <p className="mt-8 rounded-2xl bg-paper/85 px-5 py-6 text-bone">
              ✉️{" "}
              {t.sent}
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setMode("password");
              }}
              className="mt-6 text-sm text-bone underline"
            >
              {t.backToSignIn}
            </button>
          </>
        ) : mode === "forgot" ? (
          <form onSubmit={forgot} className="mt-8 space-y-4 text-left">
            <p className="text-sm text-bone">
              {t.forgotIntro}
            </p>
            <div>
              <label htmlFor="sbc-forgot-email" className={label}>
                {t.email}
              </label>
              <input id="sbc-forgot-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="email" />
            </div>
            {status === "error" && (
              <p role="alert" className="text-sm text-terracotta">
                {error}
              </p>
            )}
            <button type="submit" disabled={status === "working"} className="btn-primary w-full">
              {status === "working" ? "…" : t.sendLink}
            </button>
            <button type="button" onClick={() => setMode("password")} className="w-full py-2 text-xs uppercase tracking-widest text-bone underline">
              {t.backToSignIn}
            </button>
          </form>
        ) : (
          <form onSubmit={signIn} className="mt-8 space-y-4 text-left">
            <div>
              <label htmlFor="sbc-login-email" className={label}>
                {t.email}
              </label>
              <input id="sbc-login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="sbc-login-password" className={label}>
                {t.password}
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
              {status === "working" ? "…" : t.signIn}
            </button>
            <div className="flex flex-wrap justify-between gap-3 pt-1 text-xs uppercase tracking-widest text-bone">
              <button type="button" onClick={() => setMode("forgot")} className="underline">
                {t.forgotLink}
              </button>
              <button type="button" onClick={sendLink} className="underline" disabled={!email || status === "working"}>
                {t.emailMeLink}
              </button>
            </div>
          </form>
        )}

        <Link href={poetry ? "/poetry" : "/zvezdni-koledar"} className="mt-10 inline-block text-sm text-bone underline">
          {t.noAccount}
        </Link>
      </Container>
    </div>
  );
}
