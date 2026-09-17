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

function weeklyEmail(card: TarotCard, lang: Lang, email: string) {
  const unsubscribe = unsubscribeUrl(email);
  const page = `${getSiteUrl()}/spirituality#tarot`;
  const firstParagraph = card.profile[lang].split("\n\n")[0];
  const sl = lang === "sl";
  return {
    to: email,
    replyTo: ownerEmail(),
    subject: sl ? `Tvoja karta tega tedna: ${card.name.sl}` : `Your card this week: ${card.name.en}`,
    headers: {
      "List-Unsubscribe": `<${oneClickUnsubscribeUrl(email)}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    text: [
      sl ? "Karta tega tedna" : "This week's card",
      "",
      `${card.name[lang]}`,
      card.keywords[lang].join(" · "),
      "",
      `„${card.meaning[lang]}“`,
      "",
      firstParagraph,
      "",
      sl ? `Preberi celotno karto in izvleci karto dneva: ${page}` : `Read the whole card and draw your card of the day: ${page}`,
      "",
      sl ? "Z lučjo," : "With light,",
      "Urška",
      "",
      "—",
      sl ? `Ne želiš več prejemati tedenske karte? Odjava: ${unsubscribe}` : `No longer want the weekly card? Unsubscribe: ${unsubscribe}`,
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
