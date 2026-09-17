import { NextRequest, NextResponse } from "next/server";
import { LIVE_READING_PACKAGES, LIVE_READING_FORMATS } from "@/components/spirituality/liveReadingData";
import { isEmailConfigured, warnEmailNotConfigured } from "@/lib/email";
import { isRedisConfigured } from "@/lib/redis";
import { clientIp, withinDailyLimit } from "@/lib/rateLimit";
import { createBooking, ljubljanaDate, setBookingStatus, type Booking } from "@/lib/bookings";
import { sendOwnerRequest, sendVisitorReceived } from "@/lib/bookingEmails";

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
  lang?: unknown;
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
  const lang = body.lang === "sl" ? "sl" : "en";
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
  if (!/^\d{4}-\d{2}-\d{2}$/.test(slotDate) || !/^\d{2}:\d{2}$/.test(slotTime) || slotDate <= ljubljanaDate()) {
    return NextResponse.json({ error: "Please pick a proposed time." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  if (!(await withinDailyLimit("booking", { ip: clientIp(request), email }, { perIp: 5, perEmail: 3 }))) {
    return NextResponse.json(
      {
        error:
          lang === "sl"
            ? "Danes je bilo poslanih že največ povpraševanj. Poskusi znova jutri ali odgovori na email s potrdilom."
            : "You've reached today's limit for reading requests. Please try again tomorrow, or reply to your confirmation email.",
      },
      { status: 429 }
    );
  }

  if (!isEmailConfigured()) {
    warnEmailNotConfigured("live-reading-booking");
    return NextResponse.json({ ok: true });
  }

  const input = { name, email, message, packageKey: pkg, format, lang, date: slotDate, time: slotTime } as const;
  const withDatabase = isRedisConfigured();

  let booking: Booking;
  if (withDatabase) {
    let created: Booking | null;
    try {
      created = await createBooking(input);
    } catch (err) {
      console.error("[booking] could not store booking:", err);
      return NextResponse.json(
        {
          error:
            lang === "sl"
              ? "Povpraševanja trenutno ni bilo mogoče poslati. Poskusi znova čez nekaj minut."
              : "Your request couldn't be sent right now. Please try again in a few minutes.",
        },
        { status: 502 }
      );
    }
    if (!created) {
      return NextResponse.json(
        {
          error:
            lang === "sl"
              ? "Ta termin je pravkar zasedel nekdo drug. Izberi drugega."
              : "Someone has just taken this time. Please choose another.",
          code: "slot_taken",
        },
        { status: 409 }
      );
    }
    booking = created;
  } else {
    // No database yet: nothing to hold or confirm, Urška just gets the request by email.
    booking = { ...input, id: `${slotDate}-${slotTime}-${Date.now()}`, status: "pending", createdAt: new Date().toISOString() };
  }

  const notified = await sendOwnerRequest(booking, withDatabase);
  if (!notified) {
    // Urška would never hear about it, so don't leave the slot held.
    if (withDatabase) await setBookingStatus(booking, "declined").catch(() => {});
    return NextResponse.json(
      {
        error:
          lang === "sl"
            ? "Povpraševanja trenutno ni bilo mogoče poslati. Poskusi znova čez nekaj minut."
            : "Your request couldn't be sent right now. Please try again in a few minutes.",
      },
      { status: 502 }
    );
  }

  // Urška already has the request, so a failed confirmation isn't worth failing the booking over.
  await sendVisitorReceived(booking);

  return NextResponse.json({ ok: true });
}
