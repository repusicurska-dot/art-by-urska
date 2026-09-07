import { NextRequest, NextResponse } from "next/server";
import { LIVE_READING_PACKAGES, LIVE_READING_FORMATS } from "@/components/spirituality/liveReadingData";

const VALID_PACKAGE_KEYS = new Set<string>(LIVE_READING_PACKAGES.map((p) => p.key));
const VALID_FORMAT_KEYS = new Set<string>(LIVE_READING_FORMATS.filter((f) => !f.comingSoon).map((f) => f.key));

interface SlotPayload {
  date?: unknown;
  time?: unknown;
}

interface BookingPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  package?: unknown;
  format?: unknown;
  slot?: SlotPayload | null;
  // Honeypot — real users never fill this in.
  company?: unknown;
}

export async function POST(request: NextRequest) {
  let body: BookingPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const pkg = typeof body.package === "string" ? body.package : "";
  const format = typeof body.format === "string" ? body.format : "";
  const slotDate = typeof body.slot?.date === "string" ? body.slot.date : "";
  const slotTime = typeof body.slot?.time === "string" ? body.slot.time : "";

  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!VALID_PACKAGE_KEYS.has(pkg)) {
    return NextResponse.json({ error: "Please select a reading package." }, { status: 400 });
  }
  if (!VALID_FORMAT_KEYS.has(format)) {
    return NextResponse.json({ error: "Please select a reading format." }, { status: 400 });
  }
  if (!slotDate || !slotTime) {
    return NextResponse.json({ error: "Please pick a proposed time." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  // TODO(phase-2): no database, email provider, or scheduled job is wired up yet —
  // this validates and accepts the request but does not persist it or notify anyone.
  // To make this real:
  // 1. A database (e.g. Vercel Postgres, Supabase) to store bookings durably and check
  //    the requested slot isn't already taken by someone else — right now two visitors
  //    could request the same slot; Urška resolves conflicts by hand over email.
  // 2. An email provider (Resend/Postmark) to notify Urška of each new request (with an
  //    .ics attachment — the easiest way to get it straight into her iPhone Calendar
  //    with one tap, no calendar-feed/sync integration needed) and to confirm the
  //    customer once she accepts.
  // 3. A Vercel Cron job that reads confirmed bookings and sends a reminder email the
  //    day before — SMS (e.g. via Twilio) is a natural later addition, per her request.
  // See OWNER_ACTION_REQUIRED.md for the full breakdown.
  return NextResponse.json({ ok: true });
}
