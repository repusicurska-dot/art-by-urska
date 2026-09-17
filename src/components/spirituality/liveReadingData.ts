import type { Lang } from "./tarotData";

export interface LiveReadingPackage {
  key: string;
  duration: { sl: string; en: string };
  title: { sl: string; en: string };
  description: { sl: string; en: string };
  /** Real pricing, set by Urška on 2026-09-12. */
  price: string;
  /** Length of the calendar event sent with the booking. */
  minutes: number;
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
    minutes: 20,
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
    minutes: 50,
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
      "Prikazani so samo prosti termini. Izbrani termin se zadrži zate, rezerviran pa je, ko ga Urška potrdi.",
    nameLabel: "Ime in priimek",
    emailLabel: "Email",
    messageLabel: "Vprašanje ali kontekst (neobvezno)",
    messagePlaceholder: "Če želiš, na kratko opiši, kaj te trenutno zanima.",
    submit: "Povprašaj za termin",
    submitting: "Pošiljam …",
    successTitle: "Hvala!",
    successBody: "Termin je zadržan zate. Ko ga Urška potrdi, dobiš potrdilo po emailu, dan pred branjem pa še opomnik.",
    addToCalendar: "Dodaj predlagan termin v svoj koledar",
    disclaimer:
      "Povpraševanje prejme Urška po emailu, ti pa potrdilo, da je prispelo. Ko Urška termin potrdi, dobiš potrdilo s terminom za koledar in dan prej opomnik. Plačilo se uredi ob potrditvi.",
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
    slotHint: "Only free times are shown. The time you pick is held for you and becomes a booking once Urška confirms it.",
    nameLabel: "Full name",
    emailLabel: "Email",
    messageLabel: "Question or context (optional)",
    messagePlaceholder: "If you'd like, briefly describe what's on your mind.",
    submit: "Ask about a time slot",
    submitting: "Sending …",
    successTitle: "Thank you!",
    successBody: "Your time is held. Once Urška confirms it you'll get a confirmation by email, and a reminder the day before.",
    addToCalendar: "Add the proposed time to your calendar",
    disclaimer:
      "Urška receives your request by email, and you get a confirmation that it arrived. Once she confirms, you'll get the time for your calendar and a reminder the day before. Payment is arranged on confirmation.",
    priceNote: "Payment is arranged when the time slot is confirmed.",
  },
};
