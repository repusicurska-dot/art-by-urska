import { NextRequest, NextResponse } from "next/server";
import { TAROT_CARDS, type Lang } from "@/components/spirituality/tarotData";
import { isLocale } from "@/i18n/locales";
import { addContact, isEmailConfigured, ownerEmail, sendEmail, warnEmailNotConfigured } from "@/lib/email";
import { getSiteUrl } from "@/lib/siteUrl";
import { isRedisConfigured } from "@/lib/redis";
import { clientIp, withinDailyLimit } from "@/lib/rateLimit";
import { addSubscriber, unsubscribeUrl } from "@/lib/tarotSubscribers";

const VALID_CARD_KEYS = new Set(TAROT_CARDS.map((c) => c.key));

interface SubscribePayload {
  email?: unknown;
  card?: unknown;
  lang?: unknown;
  // Honeypot — real users never fill this in.
  company?: unknown;
}

/** The welcome email and the form's own replies, in each of the five languages. */
const SUBSCRIBE_LABELS: Record<
  Lang,
  {
    tooMany: string;
    saveFailed: string;
    subject: (name: string) => string;
    thanks: string;
    yourCard: (name: string) => string;
    readMore: (url: string) => string;
    weekly: string;
    optOut: (url: string) => string;
    optOutReply: string;
    signOff: string;
  }
> = {
  sl: {
    tooMany: "Danes je bilo s tega naslova že dovolj prijav. Poskusi znova jutri.",
    saveFailed: "Prijave trenutno ni bilo mogoče shraniti. Poskusi znova čez nekaj minut.",
    subject: (name) => `Tvoja karta: ${name}`,
    thanks: "Hvala, da se pridružuješ tedenski karti.",
    yourCard: (name) => `Tvoja karta ob prijavi je ${name}.`,
    readMore: (url) => `Celotno branje in karto dneva najdeš na ${url}`,
    weekly: "Vsak ponedeljek ti pošljemo novo karto in njeno sporočilo.",
    optOut: (url) => `Odjava je mogoča kadarkoli: ${url}`,
    optOutReply: "Če jih ne želiš več prejemati, odgovori na ta email z besedo »odjava«.",
    signOff: "Z lučjo,",
  },
  en: {
    tooMany: "Too many sign-ups today. Please try again tomorrow.",
    saveFailed: "Your sign-up couldn't be saved right now. Please try again in a few minutes.",
    subject: (name) => `Your card: ${name}`,
    thanks: "Thank you for joining the weekly card.",
    yourCard: (name) => `The card you signed up with is ${name}.`,
    readMore: (url) => `Read the full card and today's draw at ${url}`,
    weekly: "Every Monday we'll send you a new card and its message.",
    optOut: (url) => `You can unsubscribe at any time: ${url}`,
    optOutReply: 'If you\'d rather not receive them, just reply to this email with "unsubscribe".',
    signOff: "With light,",
  },
  hr: {
    tooMany: "S ove adrese danas je već bilo dovoljno prijava. Pokušaj ponovno sutra.",
    saveFailed: "Prijavu trenutno nije bilo moguće spremiti. Pokušaj ponovno za nekoliko minuta.",
    subject: (name) => `Tvoja karta: ${name}`,
    thanks: "Hvala što se pridružuješ tjednoj karti.",
    yourCard: (name) => `Karta s kojom si se prijavio je ${name}.`,
    readMore: (url) => `Cijelo čitanje i kartu dana nalaziš na ${url}`,
    weekly: "Svakog ponedjeljka šaljemo ti novu kartu i njezinu poruku.",
    optOut: (url) => `Odjaviti se možeš bilo kada: ${url}`,
    optOutReply: "Ako ih više ne želiš primati, odgovori na ovaj e-mail riječju „odjava“.",
    signOff: "Sa svjetlom,",
  },
  de: {
    tooMany: "Von dieser Adresse gab es heute schon genug Anmeldungen. Versuch es morgen wieder.",
    saveFailed: "Deine Anmeldung konnte gerade nicht gespeichert werden. Versuch es in ein paar Minuten noch einmal.",
    subject: (name) => `Deine Karte: ${name}`,
    thanks: "Danke, dass du bei der Karte der Woche dabei bist.",
    yourCard: (name) => `Die Karte, mit der du dich angemeldet hast, ist ${name}.`,
    readMore: (url) => `Die ganze Karte und die Tageskarte findest du auf ${url}`,
    weekly: "Jeden Montag schicken wir dir eine neue Karte und ihre Botschaft.",
    optOut: (url) => `Abmelden kannst du dich jederzeit: ${url}`,
    optOutReply: 'Wenn du sie lieber nicht bekommen möchtest, antworte einfach mit "Abmelden".',
    signOff: "Mit Licht,",
  },
  it: {
    tooMany: "Da questo indirizzo ci sono già state abbastanza iscrizioni oggi. Riprova domani.",
    saveFailed: "Non è stato possibile salvare la tua iscrizione adesso. Riprova tra qualche minuto.",
    subject: (name) => `La tua carta: ${name}`,
    thanks: "Grazie per esserti unito alla carta settimanale.",
    yourCard: (name) => `La carta con cui ti sei iscritto è ${name}.`,
    readMore: (url) => `Trovi la lettura completa e la carta del giorno su ${url}`,
    weekly: "Ogni lunedì ti mandiamo una nuova carta e il suo messaggio.",
    optOut: (url) => `Puoi disiscriverti quando vuoi: ${url}`,
    optOutReply: 'Se preferisci non riceverle, rispondi a questa email con "disiscrivimi".',
    signOff: "Con luce,",
  },
};

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
  const card = typeof body.card === "string" ? body.card : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!VALID_CARD_KEYS.has(card)) {
    return NextResponse.json({ error: "Please select a tarot card." }, { status: 400 });
  }

  const lang: Lang = isLocale(body.lang) ? body.lang : "en";
  const tarotCard = TAROT_CARDS.find((c) => c.key === card)!;

  if (!(await withinDailyLimit("subscribe", { ip: clientIp(request), email }, { perIp: 3, perEmail: 2 }))) {
    return NextResponse.json(
      {
        error: SUBSCRIBE_LABELS[lang].tooMany,
      },
      { status: 429 }
    );
  }

  if (!isEmailConfigured()) {
    warnEmailNotConfigured("tarot-subscribe");
    return NextResponse.json({ ok: true });
  }

  // With the database, the subscriber is stored with their language and the weekly cron
  // (/api/cron/weekly-tarot) sends them the card every Monday. Without it, fall back to a
  // Resend contact so Urška can still send a Broadcast by hand.
  let added = false;
  if (isRedisConfigured()) {
    try {
      await addSubscriber(email, lang);
      added = true;
    } catch (err) {
      console.error("[tarot-subscribe] could not store subscriber:", err);
    }
  } else {
    added = await addContact(email);
  }
  const optOut = isRedisConfigured()
    ? unsubscribeUrl(email)
    : null;

  const pageUrl = `${getSiteUrl()}/spirituality`;
  const welcomed = await sendEmail({
    to: email,
    replyTo: ownerEmail(),
    subject: SUBSCRIBE_LABELS[lang].subject(tarotCard.name[lang]),
    text: [
      SUBSCRIBE_LABELS[lang].thanks,
      "",
      SUBSCRIBE_LABELS[lang].yourCard(tarotCard.name[lang]),
      "",
      tarotCard.meaning[lang],
      "",
      SUBSCRIBE_LABELS[lang].readMore(pageUrl),
      "",
      SUBSCRIBE_LABELS[lang].weekly,
      optOut ? SUBSCRIBE_LABELS[lang].optOut(optOut) : SUBSCRIBE_LABELS[lang].optOutReply,
      "",
      SUBSCRIBE_LABELS[lang].signOff,
      "Art by Urška",
    ].join("\n"),
  });

  if (!added && !welcomed) {
    return NextResponse.json(
      {
        error: SUBSCRIBE_LABELS[lang].saveFailed,
      },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
