import type { Lang } from "./tarotData";

export interface LiveReadingPackage {
  key: string;
  duration: { sl: string; en: string };
  title: { sl: string; en: string };
  description: { sl: string; en: string };
  /** Real pricing, set by Urška on 2026-09-12. */
  price: string;
}

export const LIVE_READING_PACKAGES: LiveReadingPackage[] = [
  {
    key: "short",
    duration: { sl: "20 minut", en: "20 minutes" },
    title: { sl: "Kratko branje", en: "Short reading" },
    description: {
      sl: "Eno vprašanje, ki ti trenutno teži misli, in jasen prostor zanj.",
      en: "One question that's been on your mind, and a clear space for it.",
    },
    price: "50 €",
  },
  {
    key: "deep",
    duration: { sl: "50 minut", en: "50 minutes" },
    title: { sl: "Poglobljeno branje", en: "Deep reading" },
    description: {
      sl: "Celoten razlog, čas za več vprašanj in za pogovor o tem, kar karte pokažejo.",
      en: "A full spread, room for several questions, and a conversation about what the cards show.",
    },
    price: "100 €",
  },
];

export interface LiveReadingFormat {
  key: "video" | "phone";
  label: { sl: string; en: string };
  /** Phone reading isn't built yet (per Urška's request, to add later) — the option
   *  shows in the form as disabled with a "coming soon" tag, not hidden entirely, so
   *  visitors know it's planned. */
  comingSoon?: boolean;
}

export const LIVE_READING_FORMATS: LiveReadingFormat[] = [
  { key: "video", label: { sl: "Video klic", en: "Video call" } },
  { key: "phone", label: { sl: "Telefonski klic", en: "Phone call" }, comingSoon: true },
];

/**
 * Generates a fixed set of candidate time slots for the booking picker: the next
 * `weeks` weeks, Tuesday–Saturday, at a few fixed hours. This is NOT a real
 * availability calendar — nothing here is checked against other visitors' requests
 * (there's no database wired up yet, see OWNER_ACTION_REQUIRED.md), so two people
 * could request the same slot. The UI is explicit that this is a request Urška
 * confirms by hand, not an instant, conflict-free booking.
 */
export interface TimeSlot {
  /** ISO date string (YYYY-MM-DD), local. */
  date: string;
  /** 24h "HH:mm", local. */
  time: string;
}

const SLOT_HOURS = ["10:00", "13:00", "16:00", "19:00"];
const SLOT_WEEKDAYS = [2, 3, 4, 5, 6]; // Tue–Sat (0 = Sunday)

export function generateCandidateSlots(weeks = 3): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + 1); // start from tomorrow

  for (let i = 0; i < weeks * 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    if (!SLOT_WEEKDAYS.includes(day.getDay())) continue;

    const iso = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(
      day.getDate()
    ).padStart(2, "0")}`;
    for (const time of SLOT_HOURS) {
      slots.push({ date: iso, time });
    }
  }
  return slots;
}

export function formatSlotDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(lang === "sl" ? "sl-SI" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export const LIVE_READING_LABELS: Record<
  Lang,
  {
    heading: string;
    intro: string;
    packageLabel: string;
    formatLabel: string;
    comingSoonTag: string;
    slotLabel: string;
    slotHint: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    addToCalendar: string;
    disclaimer: string;
    priceNote: string;
  }
> = {
  sl: {
    heading: "Živo tarot branje z Urško",
    intro:
      "Poleg kart na tej strani si lahko rezerviraš tudi osebno, živo branje prek video klica — vprašanje, ki ga nosiš, dobi prostor, glas in odgovor v realnem času.",
    packageLabel: "Izberi branje",
    formatLabel: "Način branja",
    comingSoonTag: "kmalu",
    slotLabel: "Izberi predlagan termin",
    slotHint:
      "To je predlog termina, ne dokončna rezervacija — Urška ga potrdi ali predlaga drugega po emailu.",
    nameLabel: "Ime in priimek",
    emailLabel: "Email",
    messageLabel: "Vprašanje ali kontekst (neobvezno)",
    messagePlaceholder: "Če želiš, na kratko opiši, kaj te trenutno zanima.",
    submit: "Povprašaj za termin",
    submitting: "Pošiljam …",
    successTitle: "Hvala!",
    successBody: "Urška te bo v nekaj dneh kontaktirala po emailu, da uskladita termin in ceno.",
    addToCalendar: "Dodaj predlagan termin v svoj koledar",
    disclaimer:
      "To še ni samodejni koledar ali plačilni sistem — povpraševanja se trenutno beležijo, Urška pa termine potrjuje ročno po emailu. Samodejni email opomnik dan pred terminom bo dodan, ko bo povezan pravi sistem za pošiljanje pošte.",
    priceNote: "Plačilo se uredi ob potrditvi termina.",
  },
  en: {
    heading: "Live Tarot Reading with Urška",
    intro:
      "Alongside the cards on this page, you can also book a personal, live reading over video call — the question you're carrying gets space, a voice, and an answer in real time.",
    packageLabel: "Choose a reading",
    formatLabel: "Format",
    comingSoonTag: "coming soon",
    slotLabel: "Pick a proposed time",
    slotHint: "This is a proposed time, not a confirmed booking — Urška confirms it or suggests another by email.",
    nameLabel: "Full name",
    emailLabel: "Email",
    messageLabel: "Question or context (optional)",
    messagePlaceholder: "If you'd like, briefly describe what's on your mind.",
    submit: "Ask about a time slot",
    submitting: "Sending …",
    successTitle: "Thank you!",
    successBody: "Urška will contact you by email within a few days to confirm a time and price.",
    addToCalendar: "Add the proposed time to your calendar",
    disclaimer:
      "This isn't an automatic calendar or payment system yet — requests are currently recorded, and Urška confirms time slots manually by email. An automatic reminder email the day before will be added once a real email-sending system is connected.",
    priceNote: "Payment is arranged when the time slot is confirmed.",
  },
};
