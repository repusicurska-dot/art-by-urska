import { NextRequest, NextResponse } from "next/server";
import { LIVE_READING_PACKAGES, LIVE_READING_FORMATS, formatSlotDate } from "@/components/spirituality/liveReadingData";
import { isEmailConfigured, oneLine, ownerEmail, sendEmail, warnEmailNotConfigured } from "@/lib/email";
import { buildIcsEventInZone } from "@/lib/ics";

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
  if (!/^d{4}-d{2}-d{2}$/.test(slotDate) || !/^d{2}:d{2}$/.test(slotTime)) {
    return NextResponse.json({ error: "Please pick a proposed time." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  // STILL MISSING (see STANJE.md): a database, so a taken slot disappears from the picker and
  // two visitors can't request the same time, and a scheduled reminder the day before.
  const lang = body.lang === "sl" ? "sl" : "en";
  const selectedPackage = LIVE_READING_PACKAGES.find((p) => p.key === pkg)!;

  if (!isEmailConfigured()) {
    warnEmailNotConfigured("live-reading-booking");
    return NextResponse.json({ ok: true });
  }

  const when = `${formatSlotDate(slotDate, "sl")} ob ${slotTime}`;
  // The .ics makes the request one tap away from Urška's iPhone calendar.
  const ics = buildIcsEventInZone({
    title: `Tarot branje (${selectedPackage.title.sl}) — ${name}`,
    description: `${name} <${email}>\n${selectedPackage.title.sl}, ${selectedPackage.price}\n\n${message}\n\nŠe ni potrjeno — odgovori stranki.`,
    date: slotDate,
    time: slotTime,
    durationMinutes: selectedPackage.minutes,
    uid: `${slotDate}-${slotTime}-${Date.now()}@byurska.com`,
    tzid: "Europe/Ljubljana",
  });

  const notified = await sendEmail({
    to: ownerEmail(),
    replyTo: email,
    subject: oneLine(`Novo povpraševanje za branje: ${name}, ${when}`),
    text: [
      `Ime: ${name}`,
      `Email: ${email}`,
      `Branje: ${selectedPackage.title.sl} (${selectedPackage.duration.sl}, ${selectedPackage.price})`,
      `Način: ${format === "video" ? "video klic" : "telefonski klic"}`,
      `Predlagan termin: ${when} (slovenski čas)`,
      `Jezik strani: ${lang === "sl" ? "slovenščina" : "angleščina"}`,
      "",
      message ? `Vprašanje / kontekst:\n${message}` : "(brez sporočila)",
      "",
      "Termin še ni potrjen. Odgovori na ta email, da ga potrdiš ali predlagaš drugega.",
      "Priponka .ics doda predlagan termin v tvoj koledar.",
    ].join("\n"),
    attachments: [{ filename: `branje-${slotDate}.ics`, content: ics, contentType: "text/calendar" }],
  });

  if (!notified) {
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

  // Confirmation to the visitor. Urška already has the request, so a failure here isn't
  // worth failing the whole booking over.
  const visitorWhen = `${formatSlotDate(slotDate, lang)}, ${slotTime}`;
  await sendEmail({
    to: email,
    replyTo: ownerEmail(),
    subject:
      lang === "sl" ? "Tvoje povpraševanje za tarot branje je prispelo" : "Your tarot reading request has arrived",
    text:
      lang === "sl"
        ? [
            `Pozdrav, ${name},`,
            "",
            "hvala za povpraševanje. Urška ga je prejela in se ti oglasi v nekaj dneh, da potrdi termin ali predlaga drugega.",
            "",
            `Branje: ${selectedPackage.title.sl} (${selectedPackage.duration.sl}, ${selectedPackage.price})`,
            `Predlagan termin: ${visitorWhen} (slovenski čas)`,
            "",
            "Termin še ni rezerviran, dokler ga Urška ne potrdi. Če želiš kaj dodati, preprosto odgovori na ta email.",
            "",
            "Lep pozdrav,",
            "Art by Urška",
          ].join("\n")
        : [
            `Hi ${name},`,
            "",
            "thank you for your request. Urška has received it and will get back to you within a few days to confirm the time or suggest another.",
            "",
            `Reading: ${selectedPackage.title.en} (${selectedPackage.duration.en}, ${selectedPackage.price})`,
            `Proposed time: ${visitorWhen} (Slovenian time)`,
            "",
            "The time isn't booked until Urška confirms it. If you'd like to add anything, just reply to this email.",
            "",
            "Warm wishes,",
            "Art by Urška",
          ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}
