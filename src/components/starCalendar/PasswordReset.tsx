"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import type { Lang } from "@/lib/astro/texts";
import { useLanguage } from "@/i18n/LanguageProvider";

/** The page a reset link opens: choose a new password, then straight into the calendar. */
const COPY: Record<Lang, {
  product: string;
  title: string;
  incomplete: string;
  toSignIn: string;
  forWhom: string;
  newPassword: string;
  repeatPassword: string;
  submit: string;
  mismatch: string;
  failed: string;
}> = {
  sl: {
    product: "Zvezdni poslovni koledar",
    title: "Novo geslo",
    incomplete: "Povezava ni popolna. Zahtevaj novo na strani za prijavo.",
    toSignIn: "Na prijavo",
    forWhom: "Za",
    newPassword: "Novo geslo (vsaj 8 znakov)",
    repeatPassword: "Ponovi geslo",
    submit: "Shrani geslo in se prijavi",
    mismatch: "Gesli se ne ujemata.",
    failed: "Ni uspelo.",
  },
  en: {
    product: "Star Business Calendar",
    title: "New password",
    incomplete: "This link is incomplete. Request a new one from the sign-in page.",
    toSignIn: "To sign in",
    forWhom: "For",
    newPassword: "New password (at least 8 characters)",
    repeatPassword: "Repeat password",
    submit: "Save password and sign in",
    mismatch: "The passwords don't match.",
    failed: "That didn't work.",
  },
  hr: {
    product: "Zvjezdani poslovni kalendar",
    title: "Nova lozinka",
    incomplete: "Poveznica nije potpuna. Zatraži novu na stranici za prijavu.",
    toSignIn: "Na prijavu",
    forWhom: "Za",
    newPassword: "Nova lozinka (najmanje 8 znakova)",
    repeatPassword: "Ponovi lozinku",
    submit: "Spremi lozinku i prijavi se",
    mismatch: "Lozinke se ne podudaraju.",
    failed: "Nije uspjelo.",
  },
  de: {
    product: "Sternen-Geschäftskalender",
    title: "Neues Passwort",
    incomplete: "Dieser Link ist unvollständig. Fordere auf der Anmeldeseite einen neuen an.",
    toSignIn: "Zur Anmeldung",
    forWhom: "Für",
    newPassword: "Neues Passwort (mindestens 8 Zeichen)",
    repeatPassword: "Passwort wiederholen",
    submit: "Passwort speichern und anmelden",
    mismatch: "Die Passwörter stimmen nicht überein.",
    failed: "Das hat nicht geklappt.",
  },
  it: {
    product: "Calendario stellare d'affari",
    title: "Nuova password",
    incomplete: "Questo link è incompleto. Richiedine uno nuovo dalla pagina di accesso.",
    toSignIn: "Vai all'accesso",
    forWhom: "Per",
    newPassword: "Nuova password (almeno 8 caratteri)",
    repeatPassword: "Ripeti la password",
    submit: "Salva la password e accedi",
    mismatch: "Le password non coincidono.",
    failed: "Non ha funzionato.",
  },
};

export default function PasswordReset({ email, exp, token }: { email: string; exp: string; token: string }) {
  const router = useRouter();
  // Follows the site-wide switcher, like every other page.
  const { locale } = useLanguage();
  const lang: Lang = locale;
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "error">("idle");
  const [error, setError] = useState("");
  const t = COPY[lang];
  const linkLooksValid = !!email && !!exp && !!token;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== repeat) {
      setError(t.mismatch);
      setStatus("error");
      return;
    }
    setStatus("working");
    setError("");
    const res = await fetch("/api/sbc/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reset", email, exp: Number(exp), token, password, lang }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (!res?.ok) {
      setError((data as { error?: string }).error ?? t.failed);
      setStatus("error");
      return;
    }
    router.push("/zvezdni-koledar/moj");
    router.refresh();
  }

  const field = "w-full rounded-sm border border-bone/20 bg-paper px-4 py-3 text-bone focus:border-bone focus:outline-none";
  const label = "mb-2 block text-xs uppercase tracking-widest text-bone";

  return (
    <div className="spirit-light relative isolate min-h-[70vh]" lang={lang}>
      <Container className="max-w-md px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-smoke">✨ {t.product}</p>
        <h1 className="mt-5 font-heading text-4xl text-bone">{t.title}</h1>

        {!linkLooksValid ? (
          <>
            <p className="mt-6 text-bone">
              {t.incomplete}
            </p>
            <Link href="/zvezdni-koledar/prijava" className="btn-primary mt-8 inline-block">
              {t.toSignIn}
            </Link>
          </>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-4 text-left">
            <p className="text-sm text-bone">
              {t.forWhom} <strong>{email}</strong>
            </p>
            <div>
              <label htmlFor="sbc-new-password" className={label}>
                {t.newPassword}
              </label>
              <input
                id="sbc-new-password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={field}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="sbc-new-password-2" className={label}>
                {t.repeatPassword}
              </label>
              <input
                id="sbc-new-password-2"
                type="password"
                required
                minLength={8}
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
                className={field}
                autoComplete="new-password"
              />
            </div>
            {status === "error" && (
              <p role="alert" className="text-sm text-terracotta">
                {error}
              </p>
            )}
            <button type="submit" disabled={status === "working"} className="btn-primary w-full">
              {status === "working" ? "…" : t.submit}
            </button>
          </form>
        )}
      </Container>
    </div>
  );
}
