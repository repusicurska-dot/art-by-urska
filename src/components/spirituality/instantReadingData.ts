import type { Lang, Text } from "./lang";

/**
 * Instant readings: the same kinds of reading as the live ones (yes/no, love, career…), but
 * drawn and written automatically, on the spot, with no appointment and no work for Urška.
 *
 * Works like the weekly scratch card: every visitor gets one free reading a week in each topic
 * (Urška, 2026-09-29 — six free a week in all). More than that, they unlock for 2 € (one card) or 3 € (three cards) through Stripe. The live readings
 * with Urška stay exactly as they were, below this section.
 *
 * This file is shared with the browser: topic names, prices and labels only. The card texts
 * and the drawing itself live on the server (src/lib/instantReading), so a paid reading
 * can't be read out of the page's JavaScript.
 */

export type InstantTopicKey = "yesno" | "single" | "love" | "career" | "general" | "future";

export interface InstantTopic {
  key: InstantTopicKey;
  /** In euro cents — what Stripe charges for one extra reading. */
  priceCents: number;
  title: Text;
  blurb: Text;
  /** One label per card drawn. */
  positions: Text[];
  /** Whether the visitor is asked to type their question. */
  asksQuestion: boolean;
}

export const INSTANT_TOPICS: InstantTopic[] = [
  {
    key: "yesno",
    priceCents: 200,
    asksQuestion: true,
    title: { sl: "Da ali ne", en: "Yes or No", hr: "Da ili ne", de: "Ja oder Nein", it: "Sì o no" },
    blurb: {
      sl: "Ena karta, jasen odgovor.",
      en: "One card, a clear answer.",
      hr: "Jedna karta, jasan odgovor.",
      de: "Eine Karte, eine klare Antwort.",
      it: "Una carta, una risposta chiara.",
    },
    positions: [{ sl: "Odgovor", en: "The answer", hr: "Odgovor", de: "Die Antwort", it: "La risposta" }],
  },
  {
    key: "single",
    priceCents: 200,
    asksQuestion: true,
    title: { sl: "Eno vprašanje", en: "One Question", hr: "Jedno pitanje", de: "Eine Frage", it: "Una domanda" },
    blurb: {
      sl: "Karta za tisto, kar te ta hip najbolj teži.",
      en: "A card for what's weighing on you right now.",
      hr: "Karta za ono što te ovog trena najviše muči.",
      de: "Eine Karte für das, was dich gerade am meisten beschäftigt.",
      it: "Una carta per ciò che ti pesa di più in questo momento.",
    },
    positions: [{ sl: "Tvoja karta", en: "Your card", hr: "Tvoja karta", de: "Deine Karte", it: "La tua carta" }],
  },
  {
    key: "love",
    priceCents: 300,
    asksQuestion: false,
    title: { sl: "Ljubezen", en: "Love", hr: "Ljubav", de: "Liebe", it: "Amore" },
    blurb: {
      sl: "Ti, druga oseba in tisto, kar je med vama.",
      en: "You, them, and what's between you.",
      hr: "Ti, druga osoba i ono što je među vama.",
      de: "Du, die andere Person und das, was zwischen euch ist.",
      it: "Tu, l'altra persona e ciò che c'è tra voi.",
    },
    positions: [
      { sl: "Ti", en: "You", hr: "Ti", de: "Du", it: "Tu" },
      { sl: "Druga oseba", en: "The other person", hr: "Druga osoba", de: "Die andere Person", it: "L'altra persona" },
      { sl: "Med vama", en: "Between you", hr: "Među vama", de: "Zwischen euch", it: "Tra voi" },
    ],
  },
  {
    key: "career",
    priceCents: 300,
    asksQuestion: false,
    title: { sl: "Kariera in denar", en: "Career & Money", hr: "Karijera i novac", de: "Karriere & Geld", it: "Carriera e denaro" },
    blurb: {
      sl: "Kje stojiš, kaj te ovira in kam naprej.",
      en: "Where you stand, what's in the way, where next.",
      hr: "Gdje stojiš, što te koči i kamo dalje.",
      de: "Wo du stehst, was im Weg ist, wohin als Nächstes.",
      it: "Dove sei, cosa ti ostacola, dove andare.",
    },
    positions: [
      { sl: "Kje stojiš", en: "Where you stand", hr: "Gdje stojiš", de: "Wo du stehst", it: "Dove sei" },
      { sl: "Kaj te ovira", en: "What's in the way", hr: "Što te koči", de: "Was im Weg steht", it: "Cosa ti ostacola" },
      { sl: "Naslednji korak", en: "The next step", hr: "Sljedeći korak", de: "Der nächste Schritt", it: "Il prossimo passo" },
    ],
  },
  {
    key: "general",
    priceCents: 300,
    asksQuestion: false,
    title: { sl: "Splošno branje", en: "General Reading", hr: "Opće čitanje", de: "Allgemeine Lesung", it: "Lettura generale" },
    blurb: {
      sl: "Kaj te nosi, kaj te izziva, kaj se odpira.",
      en: "What carries you, what challenges you, what's opening.",
      hr: "Što te nosi, što te izaziva, što se otvara.",
      de: "Was dich trägt, was dich fordert, was sich öffnet.",
      it: "Cosa ti sostiene, cosa ti sfida, cosa si apre.",
    },
    positions: [
      { sl: "Kar te nosi", en: "What carries you", hr: "Što te nosi", de: "Was dich trägt", it: "Cosa ti sostiene" },
      { sl: "Kar te izziva", en: "What challenges you", hr: "Što te izaziva", de: "Was dich fordert", it: "Cosa ti sfida" },
      { sl: "Kar se odpira", en: "What's opening", hr: "Što se otvara", de: "Was sich öffnet", it: "Cosa si apre" },
    ],
  },
  {
    key: "future",
    priceCents: 300,
    asksQuestion: false,
    title: { sl: "Pot naprej", en: "The Road Ahead", hr: "Put naprijed", de: "Der Weg voraus", it: "Il cammino" },
    blurb: {
      sl: "Naslednji tedni, kaj sprejeti in kam te vodi.",
      en: "The coming weeks, what to embrace, where it leads.",
      hr: "Sljedeći tjedni, što prihvatiti i kamo te vodi.",
      de: "Die nächsten Wochen, was du annehmen sollst, wohin es führt.",
      it: "Le prossime settimane, cosa accogliere, dove porta.",
    },
    positions: [
      { sl: "Naslednji tedni", en: "The coming weeks", hr: "Sljedeći tjedni", de: "Die nächsten Wochen", it: "Le prossime settimane" },
      { sl: "Kaj sprejeti", en: "What to embrace", hr: "Što prihvatiti", de: "Was du annehmen sollst", it: "Cosa accogliere" },
      { sl: "Kam vodi", en: "Where it leads", hr: "Kamo vodi", de: "Wohin es führt", it: "Dove porta" },
    ],
  },
];

export function findInstantTopic(key: unknown): InstantTopic | null {
  return INSTANT_TOPICS.find((t) => t.key === key) ?? null;
}

export function formatPrice(cents: number, lang: Lang): string {
  const euros = cents / 100;
  const n = Number.isInteger(euros) ? String(euros) : euros.toFixed(2).replace(".", lang === "en" ? "." : ",");
  return `${n} €`;
}

/** What the server sends back: which cards landed where, and the words for each. */
export interface InstantReadingResult {
  topic: InstantTopicKey;
  lang: Lang;
  question: string;
  cards: { key: string; position: string; text: string }[];
  answer?: "yes" | "no" | "maybe";
  answerLabel?: string;
  answerText?: string;
  closing: string;
  paid: boolean;
}

export const INSTANT_LABELS: Record<
  Lang,
  {
    heading: string;
    intro: string;
    freeBadge: string;
    freeUsed: string;
    days: string;
    questionLabel: string;
    questionPlaceholder: string;
    drawFree: string;
    unlock: string;
    consent: string;
    consentNeeded: string;
    drawing: string;
    another: string;
    emailed: string;
    disclaimer: string;
    error: string;
    rateLimited: string;
    paidNotFound: string;
    liveHint: string;
    cards1: string;
    cards3: string;
  }
> = {
  sl: {
    heading: "Branje takoj",
    intro:
      "Brez termina in brez čakanja: izberi temo, osredotoči se na vprašanje in karte se razkrijejo takoj. Vsak teden je eno branje na vsako temo zate brezplačno — za več ga odkleneš za 2 ali 3 €.",
    freeBadge: "To branje je ta teden brezplačno",
    freeUsed: "Brezplačno branje te teme je ta teden porabljeno. Novo čez",
    days: "dni",
    questionLabel: "Tvoje vprašanje (neobvezno)",
    questionPlaceholder: "Na kaj misliš, ko vlečeš karto?",
    drawFree: "Izvleci brezplačno",
    unlock: "Odkleni za",
    consent:
      "Želim, da mi je branje dostavljeno takoj, in razumem, da s tem izgubim pravico do odstopa v 14 dneh.",
    consentNeeded: "Za nadaljevanje potrdi zgornje polje.",
    drawing: "Karte se mešajo …",
    another: "Novo branje",
    emailed: "Kopijo branja smo poslali tudi na tvoj e-naslov.",
    disclaimer: "Branja so za razmislek in navdih, ne nasvet (zdravniški, pravni ali finančni).",
    error: "Nekaj ni uspelo. Poskusi znova čez trenutek.",
    rateLimited: "Brezplačno branje te teme je ta teden že porabljeno.",
    paidNotFound: "Plačila nismo našli. Če si plačal, nam piši in branje pošljemo.",
    liveHint: "Želiš pogovor z Urško v živo? Rezerviraj termin spodaj.",
    cards1: "1 karta",
    cards3: "3 karte",
  },
  en: {
    heading: "Instant reading",
    intro:
      "No appointment, no waiting: choose a theme, hold your question in mind, and the cards turn over straight away. One reading a week in every theme is free — after that, unlock another for 2 or 3 €.",
    freeBadge: "This week's reading is free",
    freeUsed: "This week's free reading for this theme is used. Next one in",
    days: "days",
    questionLabel: "Your question (optional)",
    questionPlaceholder: "What's on your mind as you draw?",
    drawFree: "Draw for free",
    unlock: "Unlock for",
    consent:
      "I want the reading delivered immediately and understand that I thereby lose my 14-day right of withdrawal.",
    consentNeeded: "Please tick the box above to continue.",
    drawing: "Shuffling the cards …",
    another: "New reading",
    emailed: "We've also sent a copy of the reading to your email.",
    disclaimer: "Readings are for reflection and inspiration, not medical, legal or financial advice.",
    error: "Something went wrong. Please try again in a moment.",
    rateLimited: "This week's free reading for this theme has already been used.",
    paidNotFound: "We couldn't find the payment. If you paid, write to us and we'll send your reading.",
    liveHint: "Want to talk with Urška live? Book a time below.",
    cards1: "1 card",
    cards3: "3 cards",
  },
  hr: {
    heading: "Čitanje odmah",
    intro:
      "Bez termina i bez čekanja: odaberi temu, usredotoči se na pitanje i karte se otkrivaju odmah. Svaki tjedan jedno je čitanje za svaku temu besplatno — za više ga otključaš za 2 ili 3 €.",
    freeBadge: "Ovo čitanje je ovaj tjedan besplatno",
    freeUsed: "Besplatno čitanje ove teme ovaj je tjedan iskorišteno. Novo za",
    days: "dana",
    questionLabel: "Tvoje pitanje (neobavezno)",
    questionPlaceholder: "Na što misliš dok vučeš kartu?",
    drawFree: "Izvuci besplatno",
    unlock: "Otključaj za",
    consent:
      "Želim da mi se čitanje isporuči odmah i razumijem da time gubim pravo na odustanak u roku od 14 dana.",
    consentNeeded: "Za nastavak potvrdi gornje polje.",
    drawing: "Karte se miješaju …",
    another: "Novo čitanje",
    emailed: "Kopiju čitanja poslali smo i na tvoju e-adresu.",
    disclaimer: "Čitanja su za razmišljanje i nadahnuće, a ne savjet (liječnički, pravni ili financijski).",
    error: "Nešto nije uspjelo. Pokušaj ponovno za trenutak.",
    rateLimited: "Besplatno čitanje ove teme ovaj je tjedan već iskorišteno.",
    paidNotFound: "Nismo pronašli uplatu. Ako si platio, piši nam i poslat ćemo ti čitanje.",
    liveHint: "Želiš razgovor s Urškom uživo? Rezerviraj termin ispod.",
    cards1: "1 karta",
    cards3: "3 karte",
  },
  de: {
    heading: "Sofort-Lesung",
    intro:
      "Kein Termin, kein Warten: Wähl ein Thema, halte deine Frage im Sinn, und die Karten decken sich sofort auf. Pro Woche ist in jedem Thema eine Lesung kostenlos — danach schaltest du weitere für 2 oder 3 € frei.",
    freeBadge: "Diese Lesung ist diese Woche kostenlos",
    freeUsed: "Die kostenlose Lesung zu diesem Thema ist diese Woche verbraucht. Die nächste in",
    days: "Tagen",
    questionLabel: "Deine Frage (optional)",
    questionPlaceholder: "Woran denkst du, während du ziehst?",
    drawFree: "Kostenlos ziehen",
    unlock: "Freischalten für",
    consent:
      "Ich möchte die Lesung sofort erhalten und weiß, dass ich dadurch mein 14-tägiges Widerrufsrecht verliere.",
    consentNeeded: "Bitte bestätige das Kästchen oben, um fortzufahren.",
    drawing: "Die Karten werden gemischt …",
    another: "Neue Lesung",
    emailed: "Eine Kopie der Lesung haben wir dir auch per E-Mail geschickt.",
    disclaimer: "Die Lesungen dienen der Besinnung und Inspiration, nicht als medizinischer, rechtlicher oder finanzieller Rat.",
    error: "Etwas ist schiefgelaufen. Bitte versuch es gleich noch einmal.",
    rateLimited: "Die kostenlose Lesung zu diesem Thema wurde diese Woche bereits genutzt.",
    paidNotFound: "Wir konnten die Zahlung nicht finden. Wenn du bezahlt hast, schreib uns, und wir schicken dir deine Lesung.",
    liveHint: "Möchtest du live mit Urška sprechen? Buch unten einen Termin.",
    cards1: "1 Karte",
    cards3: "3 Karten",
  },
  it: {
    heading: "Lettura immediata",
    intro:
      "Nessun appuntamento, nessuna attesa: scegli un tema, tieni a mente la tua domanda e le carte si scoprono subito. Ogni settimana una lettura per ogni tema è gratuita — per altre, sbloccale a 2 o 3 €.",
    freeBadge: "Questa lettura è gratuita questa settimana",
    freeUsed: "La lettura gratuita di questo tema è usata per questa settimana. La prossima tra",
    days: "giorni",
    questionLabel: "La tua domanda (facoltativa)",
    questionPlaceholder: "A cosa pensi mentre peschi?",
    drawFree: "Pesca gratis",
    unlock: "Sblocca per",
    consent:
      "Voglio ricevere subito la lettura e so che in questo modo perdo il diritto di recesso di 14 giorni.",
    consentNeeded: "Per continuare conferma la casella qui sopra.",
    drawing: "Le carte si mescolano …",
    another: "Nuova lettura",
    emailed: "Ti abbiamo inviato una copia della lettura anche via email.",
    disclaimer: "Le letture sono per riflessione e ispirazione, non consigli medici, legali o finanziari.",
    error: "Qualcosa non ha funzionato. Riprova tra un momento.",
    rateLimited: "La lettura gratuita di questo tema è già stata usata questa settimana.",
    paidNotFound: "Non abbiamo trovato il pagamento. Se hai pagato, scrivici e ti invieremo la lettura.",
    liveHint: "Vuoi parlare dal vivo con Urška? Prenota un orario qui sotto.",
    cards1: "1 carta",
    cards3: "3 carte",
  },
};
