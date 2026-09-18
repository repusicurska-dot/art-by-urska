import { NextRequest, NextResponse } from "next/server";
import type { Lang, TarotCard } from "@/components/spirituality/tarotData";
import { isAuthorizedCron } from "@/lib/cron";
import { isEmailConfigured, ownerEmail, sendBatch } from "@/lib/email";
import { isRedisConfigured } from "@/lib/redis";
import { getSiteUrl } from "@/lib/siteUrl";
import {
  cardOfTheWeek,
  claimWeeklySend,
  isoWeek,
  listSubscribers,
  oneClickUnsubscribeUrl,
  releaseWeeklySend,
  unsubscribeUrl,
} from "@/lib/tarotSubscribers";

/** The wrapper around the card's own text, in each of the five languages. */
const EMAIL_LABELS: Record<
  Lang,
  { subject: (name: string) => string; heading: string; readMore: string; signOff: string; unsubscribe: string }
> = {
  sl: {
    subject: (name) => `Tvoja karta tega tedna: ${name}`,
    heading: "Karta tega tedna",
    readMore: "Preberi celotno karto in izvleci karto dneva:",
    signOff: "Z lučjo,",
    unsubscribe: "Ne želiš več prejemati tedenske karte? Odjava:",
  },
  en: {
    subject: (name) => `Your card this week: ${name}`,
    heading: "This week's card",
    readMore: "Read the whole card and draw your card of the day:",
    signOff: "With light,",
    unsubscribe: "No longer want the weekly card? Unsubscribe:",
  },
  hr: {
    subject: (name) => `Tvoja karta ovog tjedna: ${name}`,
    heading: "Karta ovog tjedna",
    readMore: "Pročitaj cijelu kartu i izvuci kartu dana:",
    signOff: "Sa svjetlom,",
    unsubscribe: "Ne želiš više primati tjednu kartu? Odjava:",
  },
  de: {
    subject: (name) => `Deine Karte dieser Woche: ${name}`,
    heading: "Die Karte dieser Woche",
    readMore: "Lies die ganze Karte und zieh deine Karte des Tages:",
    signOff: "Mit Licht,",
    unsubscribe: "Du willst die Karte der Woche nicht mehr bekommen? Abmelden:",
  },
  it: {
    subject: (name) => `La tua carta di questa settimana: ${name}`,
    heading: "La carta di questa settimana",
    readMore: "Leggi la carta intera e pesca la tua carta del giorno:",
    signOff: "Con luce,",
    unsubscribe: "Non vuoi più ricevere la carta settimanale? Disiscriviti:",
  },
};

function weeklyEmail(card: TarotCard, lang: Lang, email: string) {
  const unsubscribe = unsubscribeUrl(email);
  const page = `${getSiteUrl()}/spirituality#tarot`;
  const firstParagraph = card.profile[lang].split("\n\n")[0];
  const t = EMAIL_LABELS[lang];
  return {
    to: email,
    replyTo: ownerEmail(),
    subject: t.subject(card.name[lang]),
    headers: {
      "List-Unsubscribe": `<${oneClickUnsubscribeUrl(email)}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    text: [
      t.heading,
      "",
      `${card.name[lang]}`,
      card.keywords[lang].join(" · "),
      "",
      `„${card.meaning[lang]}“`,
      "",
      firstParagraph,
      "",
      `${t.readMore} ${page}`,
      "",
      t.signOff,
      "Urška",
      "",
      "—",
      `${t.unsubscribe} ${unsubscribe}`,
    ].join("\n"),
  };
}

/**
 * Weekly (Monday morning, vercel.json): sends every subscriber the week's card in their
 * language. Claims the week first so a retry can't double-send.
 *
 * Resend's free plan allows 100 emails a day — past ~100 subscribers this needs the paid plan
 * (or sends spread across days).
 */
export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isRedisConfigured() || !isEmailConfigured()) {
    return NextResponse.json({ skipped: "database or email not configured" });
  }

  const week = isoWeek().key;
  if (!(await claimWeeklySend(week))) return NextResponse.json({ week, skipped: "already sent" });

  const subscribers = await listSubscribers();
  const card = cardOfTheWeek();
  let sent = 0;
  for (let i = 0; i < subscribers.length; i += 100) {
    const chunk = subscribers.slice(i, i + 100);
    if (await sendBatch(chunk.map((s) => weeklyEmail(card, s.lang, s.email)))) {
      sent += chunk.length;
    } else if (sent === 0) {
      // Nothing went out — let the next run try again.
      await releaseWeeklySend(week);
      return NextResponse.json({ week, error: "send failed" }, { status: 502 });
    }
  }

  return NextResponse.json({ week, card: card.key, subscribers: subscribers.length, sent });
}
