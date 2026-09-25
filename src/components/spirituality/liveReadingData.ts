import type { Lang, Text } from "./lang";

export interface LiveReadingPackage {
  key: string;
  duration: Text;
  title: Text;
  description: Text;
  /**
   * Draft pricing (2026-09-25), ladder from quickest/cheapest to deepest/priciest —
   * placeholders for Urška to confirm or adjust, same as the previous two-package
   * pricing was (set by her on 2026-09-12). Not final until she signs off.
   */
  price: string;
  /** Length of the calendar event sent with the booking. */
  minutes: number;
}

/**
 * Replaced the old duration-only "short / deep" split (2026-09-12) with topic-based
 * reading types, per Urška's request (2026-09-25): she wants a richer menu of named
 * readings — love, career, yes/no, etc. — so the offer matches what visitors are
 * actually searching for, rather than just picking a length. Ordered as a price
 * ladder: quick/cheap first, deepest/most expensive last.
 */
export const LIVE_READING_PACKAGES: LiveReadingPackage[] = [
  {
    key: "yesno",
    duration: { sl: "10 minut", en: "10 minutes", hr: "10 minuta", de: "10 Minuten", it: "10 minuti" },
    title: {
      sl: "Da ali ne",
      en: "Yes or No Tarot",
      hr: "Da ili ne",
      de: "Ja oder Nein",
      it: "Sì o no",
    },
    description: {
      sl: "Hitra karta za vprašanje, ki terja jasen da ali ne.",
      en: "A quick draw for the question that needs a clear yes or no.",
      hr: "Brza karta za pitanje koje traži jasan da ili ne.",
      de: "Eine schnelle Karte für die Frage, die ein klares Ja oder Nein braucht.",
      it: "Una carta veloce per la domanda che cerca un sì o un no chiaro.",
    },
    price: "25 €",
    minutes: 10,
  },
  {
    key: "single",
    duration: { sl: "20 minut", en: "20 minutes", hr: "20 minuta", de: "20 Minuten", it: "20 minuti" },
    title: {
      sl: "Eno vprašanje",
      en: "Single Question Reading",
      hr: "Jedno pitanje",
      de: "Eine Frage",
      it: "Una domanda",
    },
    description: {
      sl: "Eno konkretno vprašanje, ki ti trenutno teži misli, in jasen prostor zanj.",
      en: "One question that's been on your mind, and a clear space for it.",
      hr: "Jedno konkretno pitanje koje ti trenutno leži na duši i jasan prostor za njega.",
      de: "Eine Frage, die dich gerade beschäftigt, und ein klarer Raum dafür.",
      it: "Una domanda che hai in mente, e uno spazio chiaro per accoglierla.",
    },
    price: "45 €",
    minutes: 20,
  },
  {
    key: "love",
    duration: { sl: "30 minut", en: "30 minutes", hr: "30 minuta", de: "30 Minuten", it: "30 minuti" },
    title: {
      sl: "Ljubezen in odnosi",
      en: "Love & Relationship Reading",
      hr: "Ljubav i odnosi",
      de: "Liebe & Beziehung",
      it: "Amore e relazioni",
    },
    description: {
      sl: "O srcu, o njem ali njej, o tem, kar med vama resnično je.",
      en: "About the heart, about them, about what's really between you.",
      hr: "O srcu, o njemu ili njoj, o onome što je zaista između vas.",
      de: "Über das Herz, über sie oder ihn, über das, was wirklich zwischen euch ist.",
      it: "Del cuore, di lui o di lei, di ciò che c'è davvero tra voi.",
    },
    price: "65 €",
    minutes: 30,
  },
  {
    key: "career",
    duration: { sl: "30 minut", en: "30 minutes", hr: "30 minuta", de: "30 Minuten", it: "30 minuti" },
    title: {
      sl: "Kariera in denar",
      en: "Career & Money Reading",
      hr: "Karijera i novac",
      de: "Karriere & Geld",
      it: "Carriera e denaro",
    },
    description: {
      sl: "Jasnost o poti, ki jo gradiš, in o tem, kar te na njej ovira.",
      en: "Clarity about the path you're building, and what's standing in its way.",
      hr: "Jasnoća o putu koji gradiš i o onome što te na njemu koči.",
      de: "Klarheit über den Weg, den du gehst, und was ihn gerade blockiert.",
      it: "Chiarezza sul percorso che stai costruendo e su ciò che lo ostacola.",
    },
    price: "65 €",
    minutes: 30,
  },
  {
    key: "general",
    duration: { sl: "30 minut", en: "30 minutes", hr: "30 minuta", de: "30 Minuten", it: "30 minuti" },
    title: {
      sl: "Splošno življenjsko branje",
      en: "General Life Reading",
      hr: "Opće životno čitanje",
      de: "Allgemeine Lebenslesung",
      it: "Lettura generale di vita",
    },
    description: {
      sl: "Brez enega vprašanja — pogled na to, kje si trenutno na svoji poti.",
      en: "No single question — a look at where you stand on your path right now.",
      hr: "Bez jednog pitanja — pogled na to gdje se trenutno nalaziš na svom putu.",
      de: "Ohne eine einzelne Frage — ein Blick darauf, wo du gerade auf deinem Weg stehst.",
      it: "Senza una domanda precisa — uno sguardo su dove ti trovi ora nel tuo cammino.",
    },
    price: "65 €",
    minutes: 30,
  },
  {
    key: "future",
    duration: { sl: "40 minut", en: "40 minutes", hr: "40 minuta", de: "40 Minuten", it: "40 minuti" },
    title: {
      sl: "Pot naprej",
      en: "Future Path Reading",
      hr: "Put naprijed",
      de: "Der Weg voraus",
      it: "Il cammino futuro",
    },
    description: {
      sl: "Kam te trenutna smer resnično vodi, in kaj je pred teboj.",
      en: "Where your current direction is really taking you, and what lies ahead.",
      hr: "Kamo te trenutni smjer zaista vodi i što te čeka.",
      de: "Wohin deine jetzige Richtung dich wirklich führt, und was vor dir liegt.",
      it: "Dove ti sta davvero portando la tua direzione attuale, e cosa ti aspetta.",
    },
    price: "80 €",
    minutes: 40,
  },
  {
    key: "full",
    duration: { sl: "60 minut", en: "60 minutes", hr: "60 minuta", de: "60 Minuten", it: "60 minuti" },
    title: {
      sl: "Celovita tarot konzultacija",
      en: "Full Tarot Consultation",
      hr: "Potpuna tarot konzultacija",
      de: "Vollständige Tarot-Beratung",
      it: "Consulto tarocchi completo",
    },
    description: {
      sl: "Celoten razlog, čas za več vprašanj in za pogovor o tem, kar karte pokažejo.",
      en: "A full spread, room for several questions, and a conversation about what the cards show.",
      hr: "Cijeli raspored, prostor za više pitanja i razgovor o onome što karte pokazuju.",
      de: "Eine vollständige Legung, Raum für mehrere Fragen und ein Gespräch über das, was die Karten zeigen.",
      it: "Una stesa completa, spazio per più domande e una conversazione su ciò che le carte mostrano.",
    },
    price: "120 €",
    minutes: 60,
  },
];

export interface LiveReadingFormat {
  key: "video" | "phone";
  label: Text;
  /** Phone reading isn't built yet (per Urška's request, to add later) — the option
   *  shows in the form as disabled with a "coming soon" tag, not hidden entirely, so
   *  visitors know it's planned. */
  comingSoon?: boolean;
}

export const LIVE_READING_FORMATS: LiveReadingFormat[] = [
  {
    key: "video",
    label: { sl: "Video klic", en: "Video call", hr: "Video poziv", de: "Videoanruf", it: "Videochiamata" },
  },
  {
    key: "phone",
    label: { sl: "Telefonski klic", en: "Phone call", hr: "Telefonski poziv", de: "Telefonat", it: "Telefonata" },
    comingSoon: true,
  },
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

const DATE_LOCALE: Record<Lang, string> = {
  sl: "sl-SI",
  en: "en-GB",
  hr: "hr-HR",
  de: "de-DE",
  it: "it-IT",
};

export function formatSlotDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(DATE_LOCALE[lang], {
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
    /** Urška holds the reading itself in Slovenian or English — see lang.ts. */
    readingLanguageLabel: string;
    readingLanguageHint: string;
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
    readingLanguageLabel: "Jezik branja",
    readingLanguageHint: "Urška vodi branja v slovenščini in angleščini.",
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
    readingLanguageLabel: "Language of the reading",
    readingLanguageHint: "Urška gives readings in Slovenian and English.",
  },
  hr: {
    heading: "Tarot čitanje uživo s Urškom",
    intro:
      "Uz karte na ovoj stranici možeš rezervirati i osobno čitanje uživo putem video poziva — pitanje koje nosiš dobiva prostor, glas i odgovor u stvarnom vremenu.",
    packageLabel: "Odaberi čitanje",
    formatLabel: "Način čitanja",
    comingSoonTag: "uskoro",
    slotLabel: "Odaberi predloženi termin",
    slotHint:
      "Prikazani su samo slobodni termini. Odabrani termin zadržava se za tebe, a rezerviran je kad ga Urška potvrdi.",
    nameLabel: "Ime i prezime",
    emailLabel: "E-adresa",
    messageLabel: "Pitanje ili kontekst (neobavezno)",
    messagePlaceholder: "Ako želiš, ukratko opiši što te trenutno zanima.",
    submit: "Upitaj za termin",
    submitting: "Šaljem …",
    successTitle: "Hvala!",
    successBody: "Termin je zadržan za tebe. Kad ga Urška potvrdi, dobit ćeš potvrdu e-poštom, a dan prije i podsjetnik.",
    addToCalendar: "Dodaj predloženi termin u svoj kalendar",
    disclaimer:
      "Upit prima Urška e-poštom, a ti potvrdu da je stigao. Kad Urška potvrdi termin, dobit ćeš potvrdu s terminom za kalendar i podsjetnik dan ranije. Plaćanje se dogovara pri potvrdi.",
    priceNote: "Plaćanje se dogovara pri potvrdi termina.",
    readingLanguageLabel: "Jezik čitanja",
    readingLanguageHint: "Urška vodi čitanja na slovenskom i engleskom.",
  },
  de: {
    heading: "Live-Tarotlesung mit Urška",
    intro:
      "Neben den Karten auf dieser Seite kannst du auch eine persönliche Live-Lesung per Videoanruf buchen — die Frage, die du mit dir trägst, bekommt Raum, eine Stimme und eine Antwort in Echtzeit.",
    packageLabel: "Lesung wählen",
    formatLabel: "Format",
    comingSoonTag: "bald",
    slotLabel: "Wähl einen vorgeschlagenen Termin",
    slotHint:
      "Es werden nur freie Zeiten gezeigt. Der gewählte Termin wird für dich freigehalten und ist gebucht, sobald Urška ihn bestätigt.",
    nameLabel: "Vor- und Nachname",
    emailLabel: "E-Mail",
    messageLabel: "Frage oder Kontext (optional)",
    messagePlaceholder: "Wenn du magst, beschreib kurz, was dich gerade beschäftigt.",
    submit: "Nach einem Termin fragen",
    submitting: "Wird gesendet …",
    successTitle: "Danke!",
    successBody:
      "Dein Termin wird freigehalten. Sobald Urška ihn bestätigt, bekommst du eine Bestätigung per E-Mail und am Tag davor eine Erinnerung.",
    addToCalendar: "Vorgeschlagenen Termin in deinen Kalender eintragen",
    disclaimer:
      "Urška erhält deine Anfrage per E-Mail, du bekommst eine Bestätigung, dass sie angekommen ist. Sobald sie bestätigt, bekommst du den Termin für deinen Kalender und am Tag davor eine Erinnerung. Die Zahlung wird bei der Bestätigung geregelt.",
    priceNote: "Die Zahlung wird bei der Bestätigung des Termins geregelt.",
    readingLanguageLabel: "Sprache der Lesung",
    readingLanguageHint: "Urška hält die Lesungen auf Slowenisch und Englisch.",
  },
  it: {
    heading: "Lettura di tarocchi dal vivo con Urška",
    intro:
      "Oltre alle carte di questa pagina puoi prenotare una lettura personale dal vivo in videochiamata — la domanda che porti trova spazio, una voce e una risposta in tempo reale.",
    packageLabel: "Scegli la lettura",
    formatLabel: "Formato",
    comingSoonTag: "presto",
    slotLabel: "Scegli un orario proposto",
    slotHint:
      "Sono mostrati solo gli orari liberi. L'orario che scegli viene tenuto per te e diventa una prenotazione quando Urška lo conferma.",
    nameLabel: "Nome e cognome",
    emailLabel: "Email",
    messageLabel: "Domanda o contesto (facoltativo)",
    messagePlaceholder: "Se vuoi, descrivi brevemente cosa ti sta a cuore.",
    submit: "Chiedi un orario",
    submitting: "Invio …",
    successTitle: "Grazie!",
    successBody:
      "Il tuo orario è tenuto da parte. Quando Urška lo conferma riceverai una conferma via email, e il giorno prima un promemoria.",
    addToCalendar: "Aggiungi l'orario proposto al tuo calendario",
    disclaimer:
      "Urška riceve la tua richiesta via email e tu ricevi conferma che è arrivata. Quando conferma, riceverai l'orario per il calendario e un promemoria il giorno prima. Il pagamento si concorda alla conferma.",
    priceNote: "Il pagamento si concorda alla conferma dell'orario.",
    readingLanguageLabel: "Lingua della lettura",
    readingLanguageHint: "Urška conduce le letture in sloveno e in inglese.",
  },
};
