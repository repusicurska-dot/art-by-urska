import { NextRequest, NextResponse } from "next/server";
import { TAROT_CARDS } from "@/components/spirituality/tarotData";
import { addContact, isEmailConfigured, ownerEmail, sendEmail, warnEmailNotConfigured } from "@/lib/email";
import { getSiteUrl } from "@/lib/siteUrl";

const VALID_CARD_KEYS = new Set(TAROT_CARDS.map((c) => c.key));

interface SubscribePayload {
  email?: unknown;
  card?: unknown;
  lang?: unknown;
  // Honeypot — real users never fill this in.
  company?: unknown;
}

export async function POST(request: NextRequest) {
  let body: SubscribePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const card = typeof body.card === "string" ? body.card : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!VALID_CARD_KEYS.has(card)) {
    return NextResponse.json({ error: "Please select a tarot card." }, { status: 400 });
  }

  const lang = body.lang === "sl" ? "sl" : "en";
  const tarotCard = TAROT_CARDS.find((c) => c.key === card)!;

  if (!isEmailConfigured()) {
    warnEmailNotConfigured("tarot-subscribe");
    return NextResponse.json({ ok: true });
  }

  // The subscriber lands in Resend → Audience → Contacts. The weekly card itself is sent
  // from there as a Broadcast (which adds the unsubscribe link automatically); an automatic
  // weekly send is still open in STANJE.md.
  const added = await addContact(email);

  const pageUrl = `${getSiteUrl()}/spirituality`;
  const welcomed = await sendEmail({
    to: email,
    replyTo: ownerEmail(),
    subject: lang === "sl" ? `Tvoja karta: ${tarotCard.name.sl}` : `Your card: ${tarotCard.name.en}`,
    text:
      lang === "sl"
        ? [
            "Hvala, da se pridružuješ tedenski karti.",
            "",
            `Tvoja karta ob prijavi je ${tarotCard.name.sl}.`,
            "",
            tarotCard.meaning.sl,
            "",
            `Celotno branje in karto dneva najdeš na ${pageUrl}`,
            "",
            "Vsak teden ti pošljemo novo karto in njeno sporočilo. Če jih ne želiš več prejemati, odgovori na ta email z besedo »odjava«.",
            "",
            "Z lučjo,",
            "Art by Urška",
          ].join("\n")
        : [
            "Thank you for joining the weekly card.",
            "",
            `The card you signed up with is ${tarotCard.name.en}.`,
            "",
            tarotCard.meaning.en,
            "",
            `Read the full card and today's draw at ${pageUrl}`,
            "",
            "Every week we'll send you a new card and its message. If you'd rather not receive them, just reply to this email with \"unsubscribe\".",
            "",
            "With light,",
            "Art by Urška",
          ].join("\n"),
  });

  if (!added && !welcomed) {
    return NextResponse.json(
      {
        error:
          lang === "sl"
            ? "Prijave trenutno ni bilo mogoče shraniti. Poskusi znova čez nekaj minut."
            : "Your sign-up couldn't be saved right now. Please try again in a few minutes.",
      },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
