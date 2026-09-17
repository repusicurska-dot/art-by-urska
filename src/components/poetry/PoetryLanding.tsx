"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { LetterView } from "@/lib/poetry/view";

/**
 * Poetry by Urška.
 *
 * The page used to be one quote and a link out, which gave a visitor nothing to do and Urška
 * nothing back. It is now the front of "Letters from the studio": this week's letter in full,
 * free to read, and a €4.99 subscription for the ones that follow — on the same account as the
 * Star Business Calendar.
 *
 * The page speaks all five site languages; the letters themselves are written in Slovenian and
 * English, so the reader picks one of those for the emails.
 */

type Status = "idle" | "submitting" | "exists" | "complimentary" | "error";

export default function PoetryLanding({
  sample,
  quotes,
  available,
  notice,
  signedIn,
}: {
  /** This week's letter, in both languages the letters exist in. */
  sample: { sl: LetterView; en: LetterView } | null;
  quotes: string[];
  available: boolean;
  notice: "canceled" | "error" | null;
  signedIn: boolean;
}) {
  const { locale, t } = useLanguage();
  const p = t.poetry;
  // The language provider only knows the visitor's language after hydration, so the letter
  // follows the site language until the reader picks one of the two it is written in.
  const [chosenLang, setLetterLang] = useState<"sl" | "en" | null>(null);
  const letterLang: "sl" | "en" = chosenLang ?? (locale === "sl" ? "sl" : "en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const letter = sample?.[letterLang] ?? null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setError(p.mismatch);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/poetry/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, lang: letterLang, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.code === "account_exists" || data.code === "already_subscribed") {
          setStatus("exists");
          return;
        }
        setError(data.error ?? p.checkoutError);
        setStatus("error");
        return;
      }
      if (data.complimentary) {
        setStatus("complimentary");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError(p.checkoutError);
      setStatus("error");
    }
  }

  const field = "w-full rounded-sm border border-bone/20 bg-paper px-4 py-3 text-bone focus:border-bone focus:outline-none";
  const label = "mb-2 block text-xs uppercase tracking-widest text-bone";

  return (
    <div className="spirit-light relative isolate">
      <section className="px-6 pt-24 pb-12 text-center md:pt-32">
        <Container className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-smoke">{p.eyebrow}</p>
          <h1 className="mt-5 font-heading text-4xl text-bone md:text-6xl">🕊️ {p.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-bone">{p.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#narocnina" className="btn-primary">
              {p.cta}
            </a>
            <span className="text-sm text-smoke">
              {signedIn ? (
                <Link href="/poetry/moj" className="text-bone underline">
                  {p.archiveLink} →
                </Link>
              ) : (
                <>
                  {p.loginPrompt}{" "}
                  <Link href="/zvezdni-koledar/prijava?next=/poetry/moj" className="text-bone underline">
                    {p.login}
                  </Link>
                </>
              )}
            </span>
          </div>
          {notice && (
            <p className="mx-auto mt-6 max-w-lg rounded-xl bg-paper/80 px-4 py-3 text-bone">
              {notice === "canceled" ? p.canceled : p.checkoutError}
            </p>
          )}
        </Container>
      </section>

      <section className="px-6 pb-8">
        <Container className="max-w-xl">
          <p className="mb-6 text-center font-heading text-2xl italic leading-relaxed text-bone md:text-3xl">
            “{p.lead}”
          </p>
        </Container>
      </section>

      {letter && (
        <section className="px-6 py-12">
          <Container className="max-w-2xl">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-smoke">{p.sampleEyebrow}</p>
            <div className="mt-5 flex justify-center gap-2" role="group" aria-label="Letter language">
              {(["sl", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLetterLang(l)}
                  aria-pressed={letterLang === l}
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-widest ${
                    letterLang === l ? "border-bone/60 text-bone" : "border-bone/15 text-smoke"
                  }`}
                >
                  {l === "sl" ? "Slovensko" : "English"}
                </button>
              ))}
            </div>

            <article className="reading-panel mt-6 rounded-3xl px-6 py-8 md:px-10 md:py-10" lang={letterLang}>
              <h2 className="text-center font-heading text-3xl text-bone">{letter.title}</h2>
              {letter.artwork && (
                <Link href={`/collection/${letter.artwork.slug}`} className="mt-6 block">
                  <Image
                    src={letter.artwork.image}
                    alt={letter.artwork.title}
                    width={900}
                    height={600}
                    className="mx-auto h-auto max-h-[26rem] w-auto rounded-2xl object-contain"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                  <span className="mt-2 block text-center text-xs uppercase tracking-widest text-smoke">
                    {letter.artwork.title}
                  </span>
                </Link>
              )}
              {letter.body.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mt-5 text-lg leading-relaxed text-bone">
                  {paragraph}
                </p>
              ))}
              <p className="mt-8 text-center font-heading italic text-bone">— Urška</p>
            </article>
            <p className="mt-3 text-center text-sm italic text-smoke">{p.sampleNote}</p>
          </Container>
        </section>
      )}

      <section className="border-t border-bone/10 px-6 py-20">
        <Container className="max-w-5xl">
          <h2 className="text-center font-heading text-3xl text-bone md:text-4xl">{p.whatTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.what.map((item) => (
              <div key={item.title} className="rounded-3xl bg-paper/80 p-6">
                <p className="text-3xl">{item.icon}</p>
                <h3 className="mt-3 font-heading text-xl text-bone">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-bone">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm italic text-smoke">{p.languageNote}</p>
        </Container>
      </section>

      {quotes.length > 0 && (
        <section className="border-t border-bone/10 px-6 py-20">
          <Container className="max-w-2xl text-center">
            <h2 className="font-heading text-3xl text-bone">{p.quotesTitle}</h2>
            <div className="mt-8 space-y-8">
              {quotes.map((quote) => (
                <p key={quote} className="font-heading text-xl italic leading-relaxed text-bone md:text-2xl">
                  “{quote}”
                </p>
              ))}
            </div>
            <Link
              href="/collection"
              className="mt-10 inline-block border-b border-bone/40 pb-1 text-xs uppercase tracking-widest text-bone/85 transition-colors hover:text-bone"
            >
              {p.seePaintings}
            </Link>
          </Container>
        </section>
      )}

      <section id="narocnina" className="scroll-mt-24 border-t border-bone/10 px-6 py-20">
        <Container className="max-w-xl">
          <div className="rounded-3xl border border-accent-warm/40 bg-paper/90 p-7 shadow-[0_30px_70px_-40px_rgba(75,58,94,0.5)] md:p-10">
            <p className="text-center font-heading text-4xl text-bone">{p.priceTitle}</p>
            <p className="mt-2 text-center text-sm text-accent-warm">{p.priceNote}</p>
            <p className="mt-4 text-center text-sm text-bone">{p.lockedText}</p>

            {!available ? (
              <p className="mt-8 text-center text-bone">🕊️ {p.soon}</p>
            ) : status === "exists" ? (
              <div className="mt-8 text-center">
                <p className="text-bone">👋 {p.exists}</p>
                <Link href="/zvezdni-koledar/prijava?next=/poetry/moj" className="btn-primary mt-5 inline-block">
                  {p.login}
                </Link>
              </div>
            ) : status === "complimentary" ? (
              <div className="mt-8 text-center">
                <p className="text-bone">{p.complimentary}</p>
                <Link href="/zvezdni-koledar/prijava?next=/poetry/moj" className="btn-primary mt-5 inline-block">
                  {p.login}
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-8 space-y-5">
                <h2 className="font-heading text-2xl text-bone">{p.formTitle}</h2>
                <div>
                  <label htmlFor="poetry-email" className={label}>
                    {p.email}
                  </label>
                  <input
                    id="poetry-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={field}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="poetry-password" className={label}>
                      {p.password}
                    </label>
                    <input
                      id="poetry-password"
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="poetry-password-2" className={label}>
                      {p.passwordRepeat}
                    </label>
                    <input
                      id="poetry-password-2"
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={passwordRepeat}
                      onChange={(e) => setPasswordRepeat(e.target.value)}
                      className={field}
                    />
                  </div>
                </div>
                <p className="-mt-2 text-xs italic text-smoke">{p.passwordHint}</p>

                <fieldset>
                  <legend className={label}>{p.languageNote}</legend>
                  <div className="flex gap-2">
                    {(["sl", "en"] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLetterLang(l)}
                        aria-pressed={letterLang === l}
                        className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest ${
                          letterLang === l ? "border-bone/60 text-bone" : "border-bone/15 text-smoke"
                        }`}
                      >
                        {l === "sl" ? "Slovensko" : "English"}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="flex items-start gap-3 text-sm leading-relaxed text-bone">
                  <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
                  <span>
                    {p.consent}{" "}
                    <Link href="/legal/terms#poetry" className="underline" target="_blank">
                      {p.terms}
                    </Link>
                  </span>
                </label>
                {status === "error" && (
                  <p role="alert" className="text-sm text-terracotta">
                    {error}
                  </p>
                )}
                <button type="submit" disabled={status === "submitting"} className="btn-primary w-full">
                  {status === "submitting" ? p.submitting : p.submit}
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>

      <section className="border-t border-bone/10 px-6 py-20">
        <Container className="max-w-2xl">
          <h2 className="text-center font-heading text-3xl text-bone">{p.faqTitle}</h2>
          <div className="mt-8 space-y-3">
            {p.faq.map((item) => (
              <details key={item.q} className="rounded-2xl bg-paper/80 px-5 py-4">
                <summary className="cursor-pointer font-heading text-lg text-bone">{item.q}</summary>
                <p className="mt-2 leading-relaxed text-bone">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
