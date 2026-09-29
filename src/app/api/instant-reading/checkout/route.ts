import { NextRequest, NextResponse } from "next/server";
import { findInstantTopic } from "@/components/spirituality/instantReadingData";
import { cleanQuestion, createReadingCheckout, parseLang } from "@/lib/instantReading/access";
import { clientIp, withinDailyLimit } from "@/lib/rateLimit";

/** Starts Stripe Checkout for one extra instant reading (2 € or 3 €). */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const lang = parseLang(body.lang);
  const topic = findInstantTopic(body.topic);
  if (!topic) return NextResponse.json({ code: "bad_topic" }, { status: 400 });
  // Digital content delivered at once: no sale without the withdrawal waiver.
  if (body.consent !== true) return NextResponse.json({ code: "consent" }, { status: 400 });
  if (!(await withinDailyLimit("instant-reading-checkout", { ip: clientIp(request) }, { perIp: 30 }))) {
    return NextResponse.json({ code: "rate_limited" }, { status: 429 });
  }
  if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ code: "unavailable" }, { status: 503 });

  try {
    const url = await createReadingCheckout({ topic, lang, question: cleanQuestion(body.question) });
    if (!url) throw new Error("Stripe returned no URL");
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[instant-reading] checkout failed:", err);
    return NextResponse.json({ code: "checkout_failed" }, { status: 502 });
  }
}
