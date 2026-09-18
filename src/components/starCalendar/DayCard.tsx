"use client";

import type { DayReading } from "@/lib/astro/calendar";
import {
  CATEGORY_EMOJI,
  SIGN_NAME,
  SIGN_SYMBOL,
  TYPE_ADVICE,
  TYPE_EMOJI,
  TYPE_LABEL,
  factorText,
  formatDate,
  moonEmoji,
  moonPhaseName,
  starsText,
  type Lang,
} from "@/lib/astro/texts";

export const TYPE_COLOR: Record<DayReading["type"], string> = {
  contracts: "#2f7d6d",
  beginnings: "#b5652a",
  avoid: "#9b3d4f",
  self: "#6a5a9c",
};

/** The full explanation of one day. `locked` hides the reasons (landing-page teaser). */
const LABELS: Record<Lang, { moon: string; eclipse: string; love: string; money: string; health: string; locked: string }> = {
  sl: {
    moon: "Luna",
    eclipse: "mrk",
    love: "Ljubezen",
    money: "Denar",
    health: "Zdravje",
    locked: "🔒 Zakaj je dan tak in kaj pomeni zate osebno, vidijo naročniki.",
  },
  en: {
    moon: "Moon",
    eclipse: "eclipse",
    love: "Love",
    money: "Money",
    health: "Health",
    locked: "🔒 Why the day looks like this — and what it means for you personally — is for subscribers.",
  },
  hr: {
    moon: "Mjesec",
    eclipse: "pomrčina",
    love: "Ljubav",
    money: "Novac",
    health: "Zdravlje",
    locked: "🔒 Zašto je dan takav i što znači za tebe osobno, vide pretplatnici.",
  },
  de: {
    moon: "Mond",
    eclipse: "Finsternis",
    love: "Liebe",
    money: "Geld",
    health: "Gesundheit",
    locked: "🔒 Warum der Tag so aussieht — und was er persönlich für dich bedeutet — sehen Abonnentinnen und Abonnenten.",
  },
  it: {
    moon: "Luna",
    eclipse: "eclissi",
    love: "Amore",
    money: "Denaro",
    health: "Salute",
    locked: "🔒 Perché la giornata è così — e cosa significa per te — lo vede chi è abbonato.",
  },
};

export default function DayCard({ day, lang, locked = false }: { day: DayReading; lang: Lang; locked?: boolean }) {
  const t = LABELS[lang];
  return (
    <div className="rounded-3xl border border-bone/10 bg-paper/85 p-6 text-left shadow-[0_30px_70px_-40px_rgba(75,58,94,0.45)] md:p-8">
      <p className="text-xs tracking-widest uppercase text-smoke">
        {formatDate(day.date, lang, { weekday: "long", day: "numeric", month: "long" })}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-4xl" aria-hidden="true">
          {TYPE_EMOJI[day.type]}
        </span>
        <div>
          <h3 className="font-heading text-2xl md:text-3xl" style={{ color: TYPE_COLOR[day.type] }}>
            {TYPE_LABEL[day.type][lang]}
          </h3>
          <p className="text-sm text-bone">{TYPE_ADVICE[day.type][lang]}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-sm text-bone">
        <span className="rounded-full bg-raised px-3 py-1">
          {moonEmoji(day.moonPhase)} {moonPhaseName(day.moonPhase, lang)}
        </span>
        <span className="rounded-full bg-raised px-3 py-1">
          {SIGN_SYMBOL[day.moonSign]} {t.moon}: {SIGN_NAME[day.moonSign][lang]}
        </span>
        {day.retrograde.includes("mercury") && <span className="rounded-full bg-raised px-3 py-1">☿℞</span>}
        {day.eclipse && <span className="rounded-full bg-raised px-3 py-1">🌘 {t.eclipse}</span>}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-bone">
        <span title={t.love}>
          {CATEGORY_EMOJI.love} <span className="tracking-widest text-accent-warm">{starsText(day.stars.love)}</span>
        </span>
        <span title={t.money}>
          {CATEGORY_EMOJI.money} <span className="tracking-widest text-accent-warm">{starsText(day.stars.money)}</span>
        </span>
        <span title={t.health}>
          {CATEGORY_EMOJI.health} <span className="tracking-widest text-accent-warm">{starsText(day.stars.health)}</span>
        </span>
      </div>

      {locked ? (
        <p className="mt-5 text-sm italic text-smoke">
          {t.locked}
        </p>
      ) : (
        <ul className="mt-5 space-y-2 text-bone">
          {day.factors.map((f, i) => (
            <li key={i} className="leading-relaxed">
              {factorText(f.factor, lang)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
