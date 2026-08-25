import { NextRequest, NextResponse } from "next/server";

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

  // TODO(phase-2): no email/CRM provider is wired up yet — this validates and accepts
  // the inquiry but does not currently deliver it anywhere. Connect an email provider
  // (e.g. Resend, Postmark) here once one is chosen.
  return NextResponse.json({ ok: true });
}
