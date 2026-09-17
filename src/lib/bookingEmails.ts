import { LIVE_READING_PACKAGES, formatSlotDate } from "@/components/spirituality/liveReadingData";
import type { Booking } from "./bookings";
import { BOOKING_TIME_ZONE } from "./bookings";
import { oneLine, ownerEmail, sendEmail } from "./email";
import { buildIcsEventInZone } from "./ics";
import { sign } from "./signing";
import { getSiteUrl } from "./siteUrl";

/** Every email a live reading booking sends, in one place so the wording stays consistent. */

function pkg(booking: Booking) {
  return LIVE_READING_PACKAGES.find((p) => p.key === booking.packageKey) ?? LIVE_READING_PACKAGES[0];
}

function ics(booking: Booking, audience: "owner" | "visitor") {
  const p = pkg(booking);
  const owner = audience === "owner";
  const sl = owner || booking.lang === "sl";
  return {
    filename: `${sl ? "branje" : "reading"}-${booking.date}.ics`,
    contentType: "text/calendar",
    content: buildIcsEventInZone({
      title: owner
        ? `Tarot branje (${p.title.sl}) — ${booking.name}`
        : sl
          ? "Tarot branje z Urško"
          : "Tarot reading with Urška",
      description: owner
        ? `${booking.name} <${booking.email}>\n${p.title.sl}, ${p.price}\n\n${booking.message}`
        : `${p.title[booking.lang]} (${p.duration[booking.lang]}) — Art by Urška`,
      date: booking.date,
      time: booking.time,
      durationMinutes: p.minutes,
      uid: `${booking.id}@byurska.com`,
      tzid: BOOKING_TIME_ZONE,
    }),
  };
}

export function manageUrl(booking: Booking): string {
  return `${getSiteUrl()}/rezervacija/${booking.id}?t=${sign(`booking:${booking.id}`)}`;
}

function whenSl(booking: Booking) {
  return `${formatSlotDate(booking.date, "sl")} ob ${booking.time}`;
}

function whenVisitor(booking: Booking) {
  return booking.lang === "sl"
    ? `${formatSlotDate(booking.date, "sl")} ob ${booking.time} (slovenski čas)`
    : `${formatSlotDate(booking.date, "en")} at ${booking.time} (Slovenian time)`;
}

/** New request → Urška, with the confirm/decline link. `manage` is false without a database. */
export function sendOwnerRequest(booking: Booking, manage: boolean) {
  const p = pkg(booking);
  return sendEmail({
    to: ownerEmail(),
    replyTo: booking.email,
    subject: oneLine(`Novo povpraševanje za branje: ${booking.name}, ${whenSl(booking)}`),
    text: [
      `Ime: ${booking.name}`,
      `Email: ${booking.email}`,
      `Branje: ${p.title.sl} (${p.duration.sl}, ${p.price})`,
      `Način: ${booking.format === "video" ? "video klic" : "telefonski klic"}`,
      `Predlagan termin: ${whenSl(booking)} (slovenski čas)`,
      `Jezik strani: ${booking.lang === "sl" ? "slovenščina" : "angleščina"}`,
      "",
      booking.message ? `Vprašanje / kontekst:\n${booking.message}` : "(brez sporočila)",
      "",
      ...(manage
        ? [
            "Termin je zdaj zadržan in ga drugi ne morejo izbrati.",
            `Potrdi ali zavrni ga tukaj: ${manageUrl(booking)}`,
            "Ob potrditvi stranka dobi potrdilo in dan pred terminom opomnik; ob zavrnitvi se termin sprosti.",
          ]
        : ["Termin še ni potrjen. Odgovori na ta email, da ga potrdiš ali predlagaš drugega."]),
      "",
      "Priponka .ics doda termin v tvoj koledar.",
    ].join("\n"),
    attachments: [ics(booking, "owner")],
  });
}

/** Request received → visitor. */
export function sendVisitorReceived(booking: Booking) {
  const p = pkg(booking);
  const sl = booking.lang === "sl";
  return sendEmail({
    to: booking.email,
    replyTo: ownerEmail(),
    subject: sl ? "Tvoje povpraševanje za tarot branje je prispelo" : "Your tarot reading request has arrived",
    text: (sl
      ? [
          `Pozdrav, ${booking.name},`,
          "",
          "hvala za povpraševanje. Urška ga je prejela in ti bo termin potrdila po emailu.",
          "",
          `Branje: ${p.title.sl} (${p.duration.sl}, ${p.price})`,
          `Predlagan termin: ${whenVisitor(booking)}`,
          "",
          "Termin je zadržan zate, rezerviran pa bo, ko ga Urška potrdi. Če želiš kaj dodati, preprosto odgovori na ta email.",
          "",
          "Lep pozdrav,",
          "Art by Urška",
        ]
      : [
          `Hi ${booking.name},`,
          "",
          "thank you for your request. Urška has received it and will confirm the time by email.",
          "",
          `Reading: ${p.title.en} (${p.duration.en}, ${p.price})`,
          `Proposed time: ${whenVisitor(booking)}`,
          "",
          "The time is held for you and becomes a booking once Urška confirms it. If you'd like to add anything, just reply to this email.",
          "",
          "Warm wishes,",
          "Art by Urška",
        ]
    ).join("\n"),
  });
}

/** Urška confirmed → visitor, with the event for their own calendar. */
export function sendVisitorConfirmed(booking: Booking) {
  const p = pkg(booking);
  const sl = booking.lang === "sl";
  return sendEmail({
    to: booking.email,
    replyTo: ownerEmail(),
    subject: sl ? `Termin potrjen: ${whenVisitor(booking)}` : `Your reading is confirmed: ${whenVisitor(booking)}`,
    text: (sl
      ? [
          `Pozdrav, ${booking.name},`,
          "",
          "Urška je potrdila tvoje tarot branje.",
          "",
          `Branje: ${p.title.sl} (${p.duration.sl}, ${p.price})`,
          `Termin: ${whenVisitor(booking)}`,
          "",
          "V priponki je termin za tvoj koledar. Dan prej ti pošljemo še opomnik.",
          "Za plačilo in povezavo za video klic ti Urška piše posebej — če imaš vprašanje, odgovori na ta email.",
          "",
          "Se vidimo,",
          "Art by Urška",
        ]
      : [
          `Hi ${booking.name},`,
          "",
          "Urška has confirmed your tarot reading.",
          "",
          `Reading: ${p.title.en} (${p.duration.en}, ${p.price})`,
          `Time: ${whenVisitor(booking)}`,
          "",
          "The attachment adds it to your calendar, and we'll send you a reminder the day before.",
          "Urška will write separately about payment and the video call link — if you have a question, just reply to this email.",
          "",
          "See you soon,",
          "Art by Urška",
        ]
    ).join("\n"),
    attachments: [ics(booking, "visitor")],
  });
}

/** Urška declined → visitor, pointing them back to pick another time. */
export function sendVisitorDeclined(booking: Booking) {
  const sl = booking.lang === "sl";
  const url = `${getSiteUrl()}/spirituality#live-reading`;
  return sendEmail({
    to: booking.email,
    replyTo: ownerEmail(),
    subject: sl ? "Termin za tarot branje ni na voljo" : "Your requested reading time isn't available",
    text: (sl
      ? [
          `Pozdrav, ${booking.name},`,
          "",
          `žal termin ${whenVisitor(booking)} ni na voljo.`,
          `Izberi drug termin tukaj: ${url}`,
          "ali odgovori na ta email in skupaj najdeta čas, ki ustreza obema.",
          "",
          "Lep pozdrav,",
          "Art by Urška",
        ]
      : [
          `Hi ${booking.name},`,
          "",
          `unfortunately ${whenVisitor(booking)} isn't available.`,
          `You can pick another time here: ${url}`,
          "or reply to this email and you'll find a time that works for both of you.",
          "",
          "Warm wishes,",
          "Art by Urška",
        ]
    ).join("\n"),
  });
}

/** Day-before reminder → visitor. */
export function sendVisitorReminder(booking: Booking) {
  const p = pkg(booking);
  const sl = booking.lang === "sl";
  return sendEmail({
    to: booking.email,
    replyTo: ownerEmail(),
    subject: sl ? `Opomnik: tarot branje jutri ob ${booking.time}` : `Reminder: your tarot reading tomorrow at ${booking.time}`,
    text: (sl
      ? [
          `Pozdrav, ${booking.name},`,
          "",
          "prijazen opomnik, da imaš jutri tarot branje z Urško.",
          "",
          `Branje: ${p.title.sl} (${p.duration.sl})`,
          `Termin: ${whenVisitor(booking)}`,
          "",
          "Poišči miren kotiček in si v mislih pripravi vprašanje, ki ga nosiš.",
          "Če povezave za video klic še nimaš ali termin ne ustreza več, odgovori na ta email.",
          "",
          "Do jutri,",
          "Art by Urška",
        ]
      : [
          `Hi ${booking.name},`,
          "",
          "a gentle reminder that your tarot reading with Urška is tomorrow.",
          "",
          `Reading: ${p.title.en} (${p.duration.en})`,
          `Time: ${whenVisitor(booking)}`,
          "",
          "Find a quiet corner and bring the question you're carrying.",
          "If you don't have the video call link yet, or the time no longer works, just reply to this email.",
          "",
          "Until tomorrow,",
          "Art by Urška",
        ]
    ).join("\n"),
  });
}

/** Morning digest → Urška, listing tomorrow's confirmed readings. */
export function sendOwnerTomorrow(bookings: Booking[]) {
  return sendEmail({
    to: ownerEmail(),
    subject: `Jutri imaš ${bookings.length} ${bookings.length === 1 ? "branje" : bookings.length === 2 ? "branji" : bookings.length < 5 ? "branja" : "branj"}`,
    text: [
      "Potrjena branja za jutri (slovenski čas):",
      "",
      ...bookings.map((b) => `• ${b.time} — ${b.name} <${b.email}>, ${pkg(b).title.sl} (${pkg(b).duration.sl})`),
      "",
      "Strankam je bil poslan opomnik.",
    ].join("\n"),
  });
}
