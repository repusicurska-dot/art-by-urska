import { NextRequest, NextResponse } from "next/server";
import { SIGNS } from "@/components/spirituality/zodiacData";

const VALID_SIGN_KEYS = new Set(SIGNS.map((s) => s.key));

interface SubscribePayload {
  email?: unknown;
  sign?: unknown;
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
  const sign = typeof body.sign === "string" ? body.sign : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!VALID_SIGN_KEYS.has(sign)) {
    return NextResponse.json({ error: "Please select a zodiac sign." }, { status: 400 });
  }

  // TODO(phase-2): same gap as /api/contact — no email provider or subscriber storage is
  // wired up yet, so this validates and accepts the request but does not persist it or
  // send anything. To actually deliver a weekly email per sign, this needs: (1) an email
  // provider (e.g. Resend/Postmark), (2) somewhere durable to store {email, sign} pairs
  // (serverless functions here have no persistent filesystem), and (3) a weekly scheduled
  // job (e.g. Vercel Cron) that reads subscribers and sends that week's SIGNS[...].profile
  // + weeklyFocus content. None of that exists yet — flagged in OWNER_ACTION_REQUIRED.md.
  return NextResponse.json({ ok: true });
}
