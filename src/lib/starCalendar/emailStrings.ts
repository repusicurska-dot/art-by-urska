import type { Lang } from "@/lib/astro/texts";

/**
 * The wording of the Star Business Calendar's emails, per language.
 *
 * `weekdays` is indexed by `Date.getUTCDay()` (0 = Sunday) and is written in whatever case the
 * tip sentences below need — Slovenian and Croatian want the accusative ("izberi sredo"), the
 * others take the plain name.
 */
export interface CalendarEmailStrings {
  weekdays: string[];
  footerManage: string;
  footerDisclaimer: string;
  loginSubject: string;
  loginBody: (link: string) => string;
  welcomeSubject: string;
  welcomeGreeting: string;
  welcomeReady: (product: string, symbol: string, sign: string) => string;
  welcomeCalendar: string;
  welcomePhone: string;
  welcomeWhat: string;
  welcomeDayTypes: string;
  welcomeAreas: string;
  welcomeCadence: string;
  welcomeTrial: (until: string) => string;
  welcomeSignOff: string;
  weeklySubject: string;
  weeklyIntro: string;
  tipContract: (weekday: string) => string;
  tipStart: (weekday: string) => string;
  resetSubject: string;
  resetBody: (url: string) => string;
  changedSubject: string;
  changedBody: (product: string) => string;
}

export const EMAIL_STRINGS: Record<Lang, CalendarEmailStrings> = {
  sl: {
    weekdays: ["nedeljo", "ponedeljek", "torek", "sredo", "četrtek", "petek", "soboto"],
    footerManage: "Naročnino urediš ali odpoveš na",
    footerDisclaimer: "Koledar je navdih za načrtovanje, ne finančni nasvet.",
    loginSubject: "🔑 Prijava v",
    loginBody: (link) =>
      `Pozdrav,\n\ntukaj je tvoja povezava za prijavo (velja 30 minut):\n${link}\n\nČe te prošnje ne prepoznaš, sporočilo preprosto prezri.`,
    welcomeSubject: "✨ Dobrodošlica v",
    welcomeGreeting: "Pozdrav,",
    welcomeReady: (product, symbol, sign) => `tvoj ${product} je pripravljen. ${symbol} Tvoje sončno znamenje je ${sign}.`,
    welcomeCalendar: "📅 Tvoj koledar:",
    welcomePhone: "📱 Dodaj ga v telefon (iPhone/Google koledar):",
    welcomeWhat: "Kaj te čaka:",
    welcomeDayTypes: "🤝 dnevi za pogodbe · 🚀 dnevi za začetke · ⛔ dnevi, ko ne začenjaš ničesar · 🧘 čas zase",
    welcomeAreas: "💞 ljubezen · 💰 denar · 🌿 zdravje — vse prilagojeno tvoji rojstni karti.",
    welcomeCadence: "Vsak 1. v mesecu dobiš osebni mesečni horoskop, vsak ponedeljek pa pregled tedna.",
    welcomeTrial: (until) => `🎁 Brezplačni preizkus traja do ${until}. Do takrat lahko kadarkoli odpoveš brez plačila.`,
    welcomeSignOff: "Z zvezdami,",
    weeklySubject: "✨ Tvoj teden v zvezdah",
    weeklyIntro: "Pregled tvojega tedna:",
    tipContract: (weekday) => `🤝 Za pomemben podpis izberi ${weekday}.`,
    tipStart: (weekday) => `🚀 Nekaj novega zaženi v ${weekday}.`,
    resetSubject: "🔑 Ponastavitev gesla —",
    resetBody: (url) =>
      `Pozdrav,\n\ntukaj je povezava za nastavitev novega gesla (velja eno uro):\n${url}\n\nČe te prošnje ne prepoznaš, sporočilo mirno prezri — geslo ostane nespremenjeno.`,
    changedSubject: "✅ Geslo je spremenjeno",
    changedBody: (product) =>
      `Pozdrav,\n\ngeslo za tvoj ${product} je bilo pravkar spremenjeno.\n\nČe te spremembe ne prepoznaš, takoj odgovori na ta email.`,
  },
  en: {
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    footerManage: "Manage or cancel your subscription at",
    footerDisclaimer: "The calendar is inspiration for planning, not financial advice.",
    loginSubject: "🔑 Sign in to the",
    loginBody: (link) =>
      `Hi,\n\nhere is your sign-in link (valid for 30 minutes):\n${link}\n\nIf you didn't ask for this, just ignore this email.`,
    welcomeSubject: "✨ Welcome to the",
    welcomeGreeting: "Hi,",
    welcomeReady: (product, symbol, sign) => `your ${product} is ready. ${symbol} Your Sun sign is ${sign}.`,
    welcomeCalendar: "📅 Your calendar:",
    welcomePhone: "📱 Add it to your phone (iPhone/Google Calendar):",
    welcomeWhat: "What to expect:",
    welcomeDayTypes: "🤝 days for contracts · 🚀 days for beginnings · ⛔ days to start nothing · 🧘 time for yourself",
    welcomeAreas: "💞 love · 💰 money · 🌿 health — all tuned to your birth chart.",
    welcomeCadence: "Every 1st of the month you get a personal monthly horoscope, and every Monday a look at the week.",
    welcomeTrial: (until) => `🎁 Your free trial runs until ${until}. Cancel any time before then and you won't be charged.`,
    welcomeSignOff: "With the stars,",
    weeklySubject: "✨ Your week in the stars",
    weeklyIntro: "Your week at a glance:",
    tipContract: (weekday) => `🤝 For an important signature, choose ${weekday}.`,
    tipStart: (weekday) => `🚀 Launch something new on ${weekday}.`,
    resetSubject: "🔑 Reset your password —",
    resetBody: (url) =>
      `Hi,\n\nhere is your link to set a new password (valid for one hour):\n${url}\n\nIf you didn't ask for this, you can ignore this email — your password stays as it is.`,
    changedSubject: "✅ Your password was changed",
    changedBody: (product) =>
      `Hi,\n\nthe password for your ${product} was just changed.\n\nIf that wasn't you, reply to this email right away.`,
  },
  hr: {
    weekdays: ["nedjelju", "ponedjeljak", "utorak", "srijedu", "četvrtak", "petak", "subotu"],
    footerManage: "Pretplatu uređuješ ili otkazuješ na",
    footerDisclaimer: "Kalendar je nadahnuće za planiranje, a ne financijski savjet.",
    loginSubject: "🔑 Prijava u",
    loginBody: (link) =>
      `Pozdrav,\n\novo je tvoja poveznica za prijavu (vrijedi 30 minuta):\n${link}\n\nAko ovo nisi tražio, jednostavno zanemari poruku.`,
    welcomeSubject: "✨ Dobro došao u",
    welcomeGreeting: "Pozdrav,",
    welcomeReady: (product, symbol, sign) => `tvoj ${product} je spreman. ${symbol} Tvoj Sunčev znak je ${sign}.`,
    welcomeCalendar: "📅 Tvoj kalendar:",
    welcomePhone: "📱 Dodaj ga u telefon (iPhone/Google kalendar):",
    welcomeWhat: "Što te čeka:",
    welcomeDayTypes: "🤝 dani za ugovore · 🚀 dani za početke · ⛔ dani kad ne počinješ ništa · 🧘 vrijeme za sebe",
    welcomeAreas: "💞 ljubav · 💰 novac · 🌿 zdravlje — sve prilagođeno tvojoj rođenoj karti.",
    welcomeCadence: "Prvog u mjesecu dobivaš osobni mjesečni horoskop, a svakog ponedjeljka pregled tjedna.",
    welcomeTrial: (until) => `🎁 Besplatno probno razdoblje traje do ${until}. Do tada možeš otkazati bez plaćanja.`,
    welcomeSignOff: "Sa zvijezdama,",
    weeklySubject: "✨ Tvoj tjedan u zvijezdama",
    weeklyIntro: "Pregled tvog tjedna:",
    tipContract: (weekday) => `🤝 Za važan potpis odaberi ${weekday}.`,
    tipStart: (weekday) => `🚀 Nešto novo pokreni u ${weekday}.`,
    resetSubject: "🔑 Postavljanje nove lozinke —",
    resetBody: (url) =>
      `Pozdrav,\n\novo je poveznica za postavljanje nove lozinke (vrijedi jedan sat):\n${url}\n\nAko ovo nisi tražio, mirno zanemari poruku — lozinka ostaje ista.`,
    changedSubject: "✅ Lozinka je promijenjena",
    changedBody: (product) =>
      `Pozdrav,\n\nlozinka za tvoj ${product} upravo je promijenjena.\n\nAko to nisi bio ti, odmah odgovori na ovaj e-mail.`,
  },
  de: {
    weekdays: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    footerManage: "Dein Abo verwaltest oder kündigst du unter",
    footerDisclaimer: "Der Kalender ist eine Anregung zum Planen, keine Finanzberatung.",
    loginSubject: "🔑 Anmeldung beim",
    loginBody: (link) =>
      `Hallo,\n\nhier ist dein Anmeldelink (30 Minuten gültig):\n${link}\n\nWenn du das nicht angefragt hast, ignorier diese E-Mail einfach.`,
    welcomeSubject: "✨ Willkommen beim",
    welcomeGreeting: "Hallo,",
    welcomeReady: (product, symbol, sign) => `dein ${product} ist bereit. ${symbol} Dein Sonnenzeichen ist ${sign}.`,
    welcomeCalendar: "📅 Dein Kalender:",
    welcomePhone: "📱 Aufs Handy holen (iPhone/Google Kalender):",
    welcomeWhat: "Das erwartet dich:",
    welcomeDayTypes: "🤝 Tage für Verträge · 🚀 Tage für Anfänge · ⛔ Tage, an denen du nichts beginnst · 🧘 Zeit für dich",
    welcomeAreas: "💞 Liebe · 💰 Geld · 🌿 Gesundheit — alles auf dein Geburtshoroskop abgestimmt.",
    welcomeCadence: "Am Ersten jedes Monats bekommst du dein persönliches Monatshoroskop, jeden Montag den Blick auf die Woche.",
    welcomeTrial: (until) => `🎁 Deine kostenlose Testphase läuft bis ${until}. Kündigst du vorher, wird nichts berechnet.`,
    welcomeSignOff: "Mit den Sternen,",
    weeklySubject: "✨ Deine Woche in den Sternen",
    weeklyIntro: "Deine Woche auf einen Blick:",
    tipContract: (weekday) => `🤝 Für eine wichtige Unterschrift nimm den ${weekday}.`,
    tipStart: (weekday) => `🚀 Starte etwas Neues am ${weekday}.`,
    resetSubject: "🔑 Neues Passwort —",
    resetBody: (url) =>
      `Hallo,\n\nhier ist dein Link, um ein neues Passwort zu setzen (eine Stunde gültig):\n${url}\n\nWenn du das nicht angefragt hast, ignorier diese E-Mail — dein Passwort bleibt, wie es ist.`,
    changedSubject: "✅ Dein Passwort wurde geändert",
    changedBody: (product) =>
      `Hallo,\n\ndas Passwort für deinen ${product} wurde gerade geändert.\n\nWenn das nicht du warst, antworte sofort auf diese E-Mail.`,
  },
  it: {
    weekdays: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
    footerManage: "Gestisci o disdici il tuo abbonamento su",
    footerDisclaimer: "Il calendario è un'ispirazione per pianificare, non una consulenza finanziaria.",
    loginSubject: "🔑 Accesso al",
    loginBody: (link) =>
      `Ciao,\n\necco il tuo link di accesso (valido 30 minuti):\n${link}\n\nSe non l'hai richiesto, ignora semplicemente questa email.`,
    welcomeSubject: "✨ Benvenuto nel",
    welcomeGreeting: "Ciao,",
    welcomeReady: (product, symbol, sign) => `il tuo ${product} è pronto. ${symbol} Il tuo segno solare è ${sign}.`,
    welcomeCalendar: "📅 Il tuo calendario:",
    welcomePhone: "📱 Aggiungilo al telefono (iPhone/Google Calendar):",
    welcomeWhat: "Cosa ti aspetta:",
    welcomeDayTypes: "🤝 giorni per i contratti · 🚀 giorni per gli inizi · ⛔ giorni in cui non iniziare nulla · 🧘 tempo per te",
    welcomeAreas: "💞 amore · 💰 denaro · 🌿 salute — tutto calibrato sul tuo tema natale.",
    welcomeCadence: "Il primo di ogni mese ricevi il tuo oroscopo personale, e ogni lunedì uno sguardo alla settimana.",
    welcomeTrial: (until) => `🎁 La tua prova gratuita dura fino al ${until}. Disdici prima e non ti verrà addebitato nulla.`,
    welcomeSignOff: "Con le stelle,",
    weeklySubject: "✨ La tua settimana nelle stelle",
    weeklyIntro: "La tua settimana in breve:",
    tipContract: (weekday) => `🤝 Per una firma importante scegli ${weekday}.`,
    tipStart: (weekday) => `🚀 Avvia qualcosa di nuovo ${weekday}.`,
    resetSubject: "🔑 Nuova password —",
    resetBody: (url) =>
      `Ciao,\n\necco il link per impostare una nuova password (valido un'ora):\n${url}\n\nSe non l'hai richiesto, ignora pure questa email — la tua password resta invariata.`,
    changedSubject: "✅ La tua password è stata cambiata",
    changedBody: (product) =>
      `Ciao,\n\nla password del tuo ${product} è stata appena cambiata.\n\nSe non sei stato tu, rispondi subito a questa email.`,
  },
};

/** The weekday of an ISO date, in the form the tip sentences need. */
export function weekdayName(date: string, lang: Lang): string {
  const [y, m, d] = date.split("-").map(Number);
  return EMAIL_STRINGS[lang].weekdays[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
}
