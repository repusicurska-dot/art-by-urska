import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { findInstantTopic } from "@/components/spirituality/instantReadingData";
import { composeReading, readingAsText } from "@/lib/instantReading/compose";
import { claimFreeReading, cleanQuestion, firstTimeFor, paidReadingSession, parseLang } from "@/lib/instantReading/access";
import { isEmailConfigured, sendEmail } from "@/lib/email";
import { clientIp } from "@/lib/rateLimit";
import { getSiteUrl } from "@/lib/siteUrl";

/**
 * Opens an instant reading.
 *   { sessionId }                   — a paid one, after Stripe Checkout. Same cards every time.
 *   { topic, lang, question }       — this week's free one of that topic, once per visitor.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const lang = parseLang(body.lang);

  if (typeof body.sessionId === "string") {
    const paid = await paidReadingSession(body.sessionId);
    if (!paid) return NextResponse.json({ code: "not_paid" }, { status: 404 });
    const { session, topic } = paid;
    // The reading stays in the language it was bought in, unless the visitor has switched the page since.
    const readingLang = typeof body.lang === "string" ? lang : parseLang(session.metadata?.lang);
    const reading = composeReading({
      topic,
      lang: readingLang,
      question: session.metadata?.question ?? "",
      seed: session.id,
      paid: true,
    });

    let emailed = false;
    const email = session.customer_details?.email;
    if (email && isEmailConfigured() && (await firstTimeFor(session.id))) {
      const link = `${getSiteUrl()}/spirituality?reading=${session.id}#instant-reading`;
      emailed = await sendEmail({
        to: email,
        subject: `Tarot — ${topic.title[readingLang]}`,
        text: `${readingAsText(reading, topic.title[readingLang])}\n\n${link}\n\n— Art by Urška`,
      });
    }
    return NextResponse.json({ reading, emailed });
  }

  const topic = findInstantTopic(body.topic);
  if (!topic) return NextResponse.json({ code: "bad_topic" }, { status: 400 });
  if (!(await claimFreeReading(clientIp(request), topic.key))) {
    return NextResponse.json({ code: "free_used" }, { status: 429 });
  }
  const reading = composeReading({
    topic,
    lang,
    question: cleanQuestion(body.question),
    seed: randomUUID(),
    paid: false,
  });
  return NextResponse.json({ reading });
}
