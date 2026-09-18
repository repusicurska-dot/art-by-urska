"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import type { LetterView } from "@/lib/poetry/view";

/** The letters exist in Slovenian and English — see lib/poetry/subscription.ts. */
type LetterLang = "sl" | "en";

/**
 * A subscriber's own page: every letter ever sent, and the subscription itself. The letters
 * exist in Slovenian and English, so this page follows the member's own language rather than
 * the site-wide switcher.
 */

export interface ArchiveLetter {
  id: string;
  week: string;
  date: string;
  sl: LetterView;
  en: LetterView;
}

interface MemberView {
  email: string;
  lang: LetterLang;
  status: string;
  accessUntil: string | null;
  cancelAtPeriodEnd: boolean;
  complimentary: boolean;
  hasCalendar: boolean;
}

const COPY = {
  sl: {
    eyebrow: "Pisma iz ateljeja",
    title: "Moja pisma",
    welcome: "Dobrodošel. Prvo pismo te čaka spodaj, naslednje prispe v četrtek.",
    none: "Prvo pismo prispe v četrtek. Takrat se pojavi tudi tukaj.",
    lockedTitle: "Naročnina ni aktivna",
    lockedText: "Arhiv se odpre takoj, ko je naročnina spet aktivna. Nič od tega, kar si prebral, se ne izgubi.",
    start: "Aktiviraj naročnino — 4,99 € / mesec",
    trialUntil: "Brezplačni preizkus do",
    activeUntil: "Naročnina velja do",
    cancelsOn: "Naročnina se konča",
    complimentary: "✨ Ta račun ima trajen brezplačen dostop.",
    cancel: "Odpovej naročnino",
    cancelConfirm: "Res želiš odpovedati naročnino? Pisma bereš do konca plačanega obdobja.",
    resume: "Prekliči odpoved",
    working: "Trenutek …",
    failed: "Ni uspelo. Poskusi znova.",
    calendar: "Zvezdni poslovni koledar",
    calendarCta: "Odpri svoj koledar →",
    calendarPitch: "Na istem računu imaš lahko tudi osebni astrološki koledar za posel in življenje.",
    account: "Račun in geslo",
    reply: "Na vsako pismo lahko preprosto odgovoriš — pride naravnost Urški.",
    signOut: "Odjava",
  },
  en: {
    eyebrow: "Letters from the studio",
    title: "My letters",
    welcome: "Welcome. Your first letter is below; the next one arrives on Thursday.",
    none: "The first letter arrives on Thursday. It will appear here too.",
    lockedTitle: "The subscription isn't active",
    lockedText: "The archive opens again the moment the subscription is active. Nothing you've read is lost.",
    start: "Start the subscription — €4.99 / month",
    trialUntil: "Free trial until",
    activeUntil: "Subscription runs until",
    cancelsOn: "The subscription ends on",
    complimentary: "✨ This account has permanent free access.",
    cancel: "Cancel subscription",
    cancelConfirm: "Cancel your subscription? You keep reading until the end of the paid period.",
    resume: "Undo cancellation",
    working: "One moment …",
    failed: "That didn't work. Please try again.",
    calendar: "Star Business Calendar",
    calendarCta: "Open your calendar →",
    calendarPitch: "The same account can also hold your personal astrological calendar for business and life.",
    account: "Account and password",
    reply: "You can simply reply to any letter — it goes straight to Urška.",
    signOut: "Sign out",
  },
} as const;

export default function PoetryArchive({
  member,
  active,
  letters,
  welcome,
}: {
  member: MemberView;
  active: boolean;
  letters: ArchiveLetter[];
  welcome: boolean;
}) {
  const router = useRouter();
  const [lang, setLang] = useState<LetterLang>(member.lang);
  const t = COPY[lang];
  const [state, setState] = useState<"idle" | "working" | "error">("idle");

  const until = member.accessUntil
    ? new Date(member.accessUntil).toLocaleDateString(lang === "sl" ? "sl-SI" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  async function act(action: "start" | "cancel" | "resume") {
    if (action === "cancel" && !window.confirm(t.cancelConfirm)) return;
    setState("working");
    const res = await fetch("/api/poetry/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (!res?.ok) {
      setState("error");
      return;
    }
    if (action === "start" && (data as { url?: string }).url) {
      window.location.href = (data as { url: string }).url;
      return;
    }
    setState("idle");
    router.refresh();
  }

  return (
    <div className="spirit-light relative isolate">
      <Container className="max-w-2xl px-6 py-20">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-smoke">🕊️ {t.eyebrow}</p>
          <div className="flex gap-2" role="group" aria-label="Language">
            {(["sl", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-widest ${
                  lang === l ? "border-bone/60 text-bone" : "border-bone/15 text-smoke"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <h1 className="mt-4 font-heading text-4xl text-bone">{t.title}</h1>
        <p className="mt-2 text-sm text-smoke">{member.email}</p>
        {welcome && <p className="mt-5 rounded-2xl bg-paper/85 px-5 py-4 text-bone">✨ {t.welcome}</p>}

        {/* Subscription */}
        <div className="mt-8 rounded-3xl bg-paper/85 px-6 py-5">
          {member.complimentary ? (
            <p className="text-bone">{t.complimentary}</p>
          ) : active ? (
            <>
              <p className="text-bone">
                {member.cancelAtPeriodEnd ? t.cancelsOn : member.status === "trialing" ? t.trialUntil : t.activeUntil}{" "}
                <strong>{until}</strong>
              </p>
              <button
                type="button"
                onClick={() => act(member.cancelAtPeriodEnd ? "resume" : "cancel")}
                disabled={state === "working"}
                className="mt-3 text-xs uppercase tracking-widest text-bone underline"
              >
                {state === "working" ? t.working : member.cancelAtPeriodEnd ? t.resume : t.cancel}
              </button>
            </>
          ) : (
            <>
              <h2 className="font-heading text-xl text-bone">{t.lockedTitle}</h2>
              <p className="mt-2 leading-relaxed text-bone">{t.lockedText}</p>
              <button type="button" onClick={() => act("start")} disabled={state === "working"} className="btn-primary mt-4">
                {state === "working" ? t.working : t.start}
              </button>
            </>
          )}
          {state === "error" && (
            <p role="alert" className="mt-3 text-sm text-terracotta">
              {t.failed}
            </p>
          )}
        </div>

        {/* Letters */}
        {active &&
          (letters.length === 0 ? (
            <p className="mt-10 text-center text-bone">{t.none}</p>
          ) : (
            <div className="mt-12 space-y-10">
              {letters.map((entry) => {
                const letter = entry[lang];
                return (
                  <article key={entry.id} id={entry.id} className="reading-panel scroll-mt-24 rounded-3xl px-6 py-8 md:px-9">
                    <p className="text-xs uppercase tracking-[0.25em] text-smoke">
                      {new Date(entry.date).toLocaleDateString(lang === "sl" ? "sl-SI" : "en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="mt-2 font-heading text-2xl text-bone md:text-3xl">{letter.title}</h2>
                    {letter.artwork && (
                      <Link href={`/collection/${letter.artwork.slug}`} className="mt-5 block">
                        <Image
                          src={letter.artwork.image}
                          alt={letter.artwork.title}
                          width={900}
                          height={600}
                          className="mx-auto h-auto max-h-[22rem] w-auto rounded-2xl object-contain"
                          sizes="(max-width: 768px) 100vw, 640px"
                        />
                        <span className="mt-2 block text-xs uppercase tracking-widest text-smoke">{letter.artwork.title}</span>
                      </Link>
                    )}
                    {letter.body.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="mt-4 leading-relaxed text-bone">
                        {paragraph}
                      </p>
                    ))}
                    <p className="mt-6 font-heading italic text-bone">— Urška</p>
                  </article>
                );
              })}
              <p className="text-center text-sm italic text-smoke">{t.reply}</p>
            </div>
          ))}

        {/* The other subscription on the same account */}
        <div className="mt-14 rounded-3xl bg-paper/70 px-6 py-5 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-smoke">✨ {t.calendar}</p>
          {member.hasCalendar ? (
            <Link href="/zvezdni-koledar/moj" className="mt-3 inline-block text-bone underline">
              {t.calendarCta}
            </Link>
          ) : (
            <>
              <p className="mt-3 leading-relaxed text-bone">{t.calendarPitch}</p>
              <Link href="/zvezdni-koledar" className="mt-3 inline-block text-bone underline">
                {t.calendarCta}
              </Link>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest text-smoke">
          <Link href="/zvezdni-koledar/moj" className="underline">
            {t.account}
          </Link>
          <form method="post" action="/api/sbc/logout">
            <button type="submit" className="uppercase tracking-widest underline">
              {t.signOut}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
