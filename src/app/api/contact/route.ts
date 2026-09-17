import { NextRequest, NextResponse } from "next/server";
import { clientIp, withinDailyLimit } from "@/lib/rateLimit";
import { isEmailConfigured, oneLine, ownerEmail, sendEmail, warnEmailNotConfigured } from "@/lib/email";

const VALID_CATEGORIES = [
  "Artwork inquiry",
  "Purchase assistance",
  "Commission inquiry",
  "Shipping question",
  "Press / collaboration",
  "Other",
];

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  category?: unknown;
  message?: unknown;
  piece?: unknown;
  // Honeypot — real users never fill this in.
  company?: unknown;
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim() !== "") {
    // Silently accept to not tip off bots, but do nothing.
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const category = typeof body.category === "string" ? body.category : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Please select an inquiry type." }, { status: 400 });
  }
  if (!message || message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Please write a message between 10 and 5000 characters." },
      { status: 400 }
    );
  }

  const piece = typeof body.piece === "string" ? body.piece.trim().slice(0, 200) : "";

  if (!(await withinDailyLimit("contact", { ip: clientIp(request), email }, { perIp: 5, perEmail: 3 }))) {
    return NextResponse.json(
      {
        error:
          "You've reached today's limit for messages through this form. Please try again tomorrow — Urška will reply to the ones you've already sent.",
      },
      { status: 429 }
    );
  }

  if (!isEmailConfigured()) {
    warnEmailNotConfigured("contact");
    return NextResponse.json({ ok: true });
  }

  // Reply-To is the visitor, so Urška can answer straight from her inbox.
  const sent = await sendEmail({
    to: ownerEmail(),
    replyTo: email,
    subject: oneLine(`Novo sporočilo: ${category} — ${name}`),
    text: [
      `Ime: ${name}`,
      `Email: ${email}`,
      `Vrsta: ${category}`,
      ...(piece ? [`Slika: ${piece}`] : []),
      "",
      message,
      "",
      "— poslano prek obrazca na byurska.com/contact (odgovori neposredno na ta email)",
    ].join("\n"),
  });

  if (!sent) {
    return NextResponse.json(
      { error: "Your message couldn't be sent right now. Please try again in a few minutes." },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
