"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/shared/Container";
import TarotCardArt from "./TarotCardArt";
import { TAROT_CARDS } from "./tarotData";
import type { Lang } from "./lang";
import {
  INSTANT_LABELS,
  INSTANT_TOPICS,
  formatPrice,
  type InstantReadingResult,
  type InstantTopicKey,
} from "./instantReadingData";

/**
 * Instant readings — see instantReadingData.ts. One free a week (remembered here for the
 * visitor's convenience and enforced on the server), extra ones through Stripe Checkout,
 * which sends the visitor back with ?reading=<session id> to open the paid reading.
 */

// v2: one free reading per topic per week (v1 held a single one for all topics).
const STORAGE_KEY = "au-instant-reading-v2";

type FreeWeek = Partial<Record<InstantTopicKey, InstantReadingResult | null>>;

function isoWeekKey(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  return `${d.getUTCFullYear()}-W${Math.ceil(((d.getTime() - yearStart) / 86400000 + 1) / 7)}`;
}

function daysUntilNextMonday(): number {
  const diff = (8 - new Date().getDay()) % 7;
  return diff === 0 ? 7 : diff;
}

type Status = "idle" | "loading" | "shown";

export default function InstantReading({ lang }: { lang: Lang }) {
  const labels = INSTANT_LABELS[lang];
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const [topicKey, setTopicKey] = useState<InstantTopicKey>("love");
  const [question, setQuestion] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [reading, setReading] = useState<InstantReadingResult | null>(null);
  const [emailed, setEmailed] = useState(false);
  // null until mounted. A topic listed here has had its free reading this week (the reading
  // itself kept, when there is one, so it can be opened again).
  const [freeWeek, setFreeWeek] = useState<FreeWeek | null>(null);
  const [paidSession, setPaidSession] = useState<string | null>(null);

  const topic = INSTANT_TOPICS.find((t) => t.key === topicKey) ?? INSTANT_TOPICS[0];
  const freeUsed = freeWeek === null ? null : topic.key in freeWeek;
  const weekReading = freeWeek?.[topic.key] ?? null;

  useEffect(() => {
    const week = isoWeekKey(new Date());
    let saved: FreeWeek = {};
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as
        | { week?: string; topics?: FreeWeek }
        | null;
      if (stored?.week === week && stored.topics) saved = stored.topics;
    } catch {
      // No storage — the server still limits the free readings.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFreeWeek(saved);
    const session = new URLSearchParams(window.location.search).get("reading");
    if (session) setPaidSession(session);
  }, []);

  // Back from Stripe (or from the link in the email): open the paid reading. Refetched when
  // the page language changes, so it follows the switcher like everything else here.
  useEffect(() => {
    if (!paidSession) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("loading");
    setError("");
    fetch("/api/instant-reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: paidSession, lang }),
    })
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as { reading?: InstantReadingResult; emailed?: boolean };
        if (cancelled) return;
        if (!res.ok || !data.reading) {
          setStatus("idle");
          setError(res.status === 404 ? labels.paidNotFound : labels.error);
          return;
        }
        setReading(data.reading);
        if (data.emailed) setEmailed(true);
        setTopicKey(data.reading.topic);
        setStatus("shown");
        sectionRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("idle");
        setError(labels.error);
      });
    return () => {
      cancelled = true;
    };
  }, [paidSession, lang, labels.error, labels.paidNotFound, reduceMotion]);

  function rememberFree(key: InstantTopicKey, r: InstantReadingResult | null) {
    const next: FreeWeek = { ...freeWeek, [key]: r };
    setFreeWeek(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ week: isoWeekKey(new Date()), topics: next }));
    } catch {
      // Ignore.
    }
  }

  async function drawFree() {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/instant-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.key, lang, question: topic.asksQuestion ? question : "" }),
      });
      const data = (await res.json().catch(() => ({}))) as { reading?: InstantReadingResult; code?: string };
      if (res.status === 429 && data.code === "free_used") {
        rememberFree(topic.key, null);
        setStatus("idle");
        setError(labels.rateLimited);
        return;
      }
      if (!res.ok || !data.reading) throw new Error(data.code);
      rememberFree(topic.key, data.reading);
      setReading(data.reading);
      setEmailed(false);
      setStatus("shown");
    } catch {
      setStatus("idle");
      setError(labels.error);
    }
  }

  async function unlock() {
    if (!consent) {
      setError(labels.consentNeeded);
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/instant-reading/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.key, lang, question: topic.asksQuestion ? question : "", consent }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string };
      if (!res.ok || !data.url) throw new Error();
      window.location.assign(data.url);
    } catch {
      setStatus("idle");
      setError(labels.error);
    }
  }

  function startOver() {
    setReading(null);
    setStatus("idle");
    setQuestion("");
    setConsent(false);
    setEmailed(false);
    if (paidSession) {
      setPaidSession(null);
      const url = new URL(window.location.href);
      url.searchParams.delete("reading");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  }

  const shownTopic = reading ? INSTANT_TOPICS.find((t) => t.key === reading.topic) ?? topic : topic;

  return (
    <section ref={sectionRef} className="border-t border-bone/10 py-24 md:py-32 scroll-mt-24">
      <Container className="max-w-2xl text-center">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">{labels.heading}</span>
        <p className="mt-6 text-bone leading-relaxed max-w-xl mx-auto">{labels.intro}</p>

        {status === "shown" && reading ? (
          <ReadingView
            reading={reading}
            title={shownTopic.title[lang]}
            lang={lang}
            reduceMotion={!!reduceMotion}
            emailed={emailed}
            labels={labels}
            onAgain={startOver}
          />
        ) : (
          <div className="mt-12 text-left">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {INSTANT_TOPICS.map((t) => {
                const isSelected = t.key === topicKey;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTopicKey(t.key)}
                    aria-pressed={isSelected}
                    className="rounded-lg border px-4 py-4 text-left transition-colors"
                    style={{
                      borderColor: isSelected
                        ? "var(--color-accent-warm)"
                        : "color-mix(in srgb, var(--color-bone) 15%, transparent)",
                      background: isSelected
                        ? "color-mix(in srgb, var(--color-aurora-gold) 45%, var(--color-paper))"
                        : "color-mix(in srgb, var(--color-paper) 65%, transparent)",
                    }}
                  >
                    <span className="block font-heading text-base text-bone">{t.title[lang]}</span>
                    <span className="mt-1 block text-xs tracking-widest uppercase text-smoke">
                      {t.positions.length === 1 ? labels.cards1 : labels.cards3} · {formatPrice(t.priceCents, lang)}
                    </span>
                    <span className="mt-2 block text-sm text-bone leading-relaxed">{t.blurb[lang]}</span>
                  </button>
                );
              })}
            </div>

            {topic.asksQuestion && (
              <div className="mt-8">
                <label htmlFor="ir-question" className="block text-xs tracking-widest uppercase text-bone mb-2">
                  {labels.questionLabel}
                </label>
                <input
                  id="ir-question"
                  type="text"
                  maxLength={300}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={labels.questionPlaceholder}
                  className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-paper/70 focus:outline-none focus:border-bone"
                />
              </div>
            )}

            <div className="mt-10 flex flex-col items-center text-center">
              {freeUsed === false && (
                <>
                  <span className="text-xs tracking-widest uppercase text-smoke">{labels.freeBadge}</span>
                  <button
                    type="button"
                    onClick={drawFree}
                    disabled={status === "loading"}
                    className="btn-primary mt-4 disabled:opacity-60"
                  >
                    {status === "loading" ? labels.drawing : labels.drawFree}
                  </button>
                </>
              )}

              {freeUsed === true && (
                <>
                  <span className="text-xs text-smoke">
                    {labels.freeUsed} {daysUntilNextMonday()} {labels.days}
                  </span>
                  <label className="mt-5 flex max-w-md items-start gap-3 text-left text-xs text-bone leading-relaxed">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-terracotta)]"
                    />
                    <span>{labels.consent}</span>
                  </label>
                  <button
                    type="button"
                    onClick={unlock}
                    disabled={status === "loading"}
                    className="btn-primary mt-5 disabled:opacity-60"
                  >
                    {status === "loading" ? labels.drawing : `${labels.unlock} ${formatPrice(topic.priceCents, lang)}`}
                  </button>
                  {weekReading && (
                    <button
                      type="button"
                      onClick={() => {
                        setReading(weekReading);
                        setEmailed(false);
                        setStatus("shown");
                      }}
                      className="mt-4 text-xs tracking-widest uppercase text-bone border-b border-bone/40 pb-1"
                    >
                      {INSTANT_TOPICS.find((t) => t.key === weekReading.topic)?.title[lang]} ↺
                    </button>
                  )}
                </>
              )}

              {error && (
                <p role="alert" className="mt-4 text-sm text-terracotta">
                  {error}
                </p>
              )}

              <p className="mt-8 text-xs text-bone italic">{labels.liveHint}</p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function ReadingView({
  reading,
  title,
  lang,
  reduceMotion,
  emailed,
  labels,
  onAgain,
}: {
  reading: InstantReadingResult;
  title: string;
  lang: Lang;
  reduceMotion: boolean;
  emailed: boolean;
  labels: (typeof INSTANT_LABELS)[Lang];
  onAgain: () => void;
}) {
  const cards = reading.cards.map((c) => ({ ...c, card: TAROT_CARDS.find((t) => t.key === c.key)! }));
  const delay = (i: number) => (reduceMotion ? 0 : 0.25 + i * 0.35);

  return (
    <div className="mt-12 flex flex-col items-center">
      <h3 className="font-heading text-2xl text-bone">{title}</h3>
      {reading.question && (
        <p className="mt-3 max-w-md font-heading italic text-lg text-bone">&ldquo;{reading.question}&rdquo;</p>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-6">
        {cards.map(({ card, position }, i) => (
          <div key={card.key} className="flex w-[90px] flex-col items-center sm:w-[130px]">
            <span className="mb-3 flex min-h-[2.5em] items-end text-center text-[11px] leading-tight tracking-widest uppercase text-smoke">{position}</span>
            <div className="h-[153px] w-[90px] sm:h-[221px] sm:w-[130px]" style={{ perspective: 900 }}>
              <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateY: reduceMotion ? 180 : 0 }}
                animate={{ rotateY: 180 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, delay: delay(i), ease: "easeInOut" }}
              >
                <div
                  className="absolute inset-0 rounded-md border"
                  style={{
                    backfaceVisibility: "hidden",
                    borderColor: "color-mix(in srgb, var(--color-accent-warm) 35%, transparent)",
                    background:
                      "radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--color-accent-warm) 12%, var(--color-ink)) 0%, var(--color-ink) 72%)",
                  }}
                />
                <div
                  className="absolute inset-0 overflow-hidden rounded-md border"
                  style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "flat",
                    transform: "rotateY(180deg)",
                    borderColor: "color-mix(in srgb, var(--color-accent-warm) 45%, transparent)",
                    background: "var(--color-ink)",
                    boxShadow: "0 20px 45px -25px rgba(75,58,94,0.45)",
                  }}
                >
                  <TarotCardArt
                    cardKey={card.key}
                    number={card.number}
                    title={card.name[lang]}
                    className="h-full w-full rounded-md"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: reduceMotion ? 0 : delay(cards.length) + 0.3 }}
        className="mt-10 w-full max-w-lg rounded-lg px-7 py-8 text-left md:px-10 md:py-10"
        style={{
          background: "var(--color-paper)",
          border: "1px solid color-mix(in srgb, var(--color-terracotta) 30%, transparent)",
          boxShadow: "0 25px 60px -30px rgba(75,58,94,0.35)",
        }}
      >
        {reading.answerLabel && (
          <div className="mb-8 text-center">
            <p className="font-heading text-5xl" style={{ color: "var(--color-terracotta)" }}>
              {reading.answerLabel}
            </p>
            <p className="mt-3 leading-relaxed text-bone">{reading.answerText}</p>
          </div>
        )}

        <div className="space-y-6">
          {cards.map(({ card, position, text }) => (
            <div key={card.key}>
              <p className="text-xs tracking-widest uppercase text-smoke">
                {position} · <span className="text-bone">{card.name[lang]}</span>
              </p>
              <p className="mt-2 leading-relaxed text-bone">{text}</p>
            </div>
          ))}
        </div>

        <p
          className="mt-8 font-heading italic text-lg leading-relaxed"
          style={{ color: "var(--color-terracotta)" }}
        >
          {reading.closing}
        </p>
      </motion.div>

      {emailed && <p className="mt-6 text-xs text-smoke">{labels.emailed}</p>}

      <button type="button" onClick={onAgain} className="btn-secondary mt-8">
        {labels.another}
      </button>
      <p className="mt-6 max-w-md text-xs text-bone italic">{labels.disclaimer}</p>
    </div>
  );
}
