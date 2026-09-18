"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import type { DayReading } from "@/lib/astro/calendar";
import type { Sign } from "@/lib/astro/ephemeris";
import { SIGN_NAME, SIGN_SYMBOL, TYPE_EMOJI, TYPE_LABEL, formatDate, moonEmoji, type Lang } from "@/lib/astro/texts";
import DayCard, { TYPE_COLOR } from "./DayCard";
import BirthFields, { type BirthValue } from "./BirthFields";
import { LOCALES } from "@/i18n/locales";

interface MemberView {
  email: string;
  lang: Lang;
  birthDate: string;
  birthTime: string | null;
  birthTimeZone: string;
  status: string;
  accessUntil: string | null;
  cancelAtPeriodEnd: boolean;
  complimentary: boolean;
  hasPassword: boolean;
  /** False for an account made through the Poetry letters, which needs no birth chart. */
  hasBirth: boolean;
}

type Summary = { title: string; paragraphs: string[] };

function shiftMonth(year: number, month: number, by: number) {
  const d = new Date(Date.UTC(year, month - 1 + by, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

interface MemberCopy {
  locale: string;
  product: string;
  yourCalendar: string;
  sunSign: string;
  signOut: string;
  welcome: string;
  noBirthTitle: string;
  noBirthBody: string;
  inactiveTitle: string;
  pastDue: string;
  resubscribeBody: string;
  continueToPayment: string;
  failed: string;
  prevMonth: string;
  nextMonth: string;
  money: string;
  love: string;
  phoneTitle: string;
  phoneBody: string;
  addToCalendar: string;
  copied: string;
  copyLink: string;
  privateLink: string;
  noPasswordYet: string;
  birthTitle: string;
  birthNote: string;
  saved: string;
  save: string;
  checkDetails: string;
  changePassword: string;
  setPassword: string;
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  savePassword: string;
  mismatch: string;
  subscription: string;
  freeAccess: string;
  trialUntil: (until: string) => string;
  cancelled: (until: string) => string;
  active: (until: string) => string;
  resume: string;
  cancel: string;
  cancelConfirm: string;
  disclaimer: string;
}

const COPY: Record<Lang, MemberCopy> = {
  sl: {
    locale: "sl-SI",
    product: "Zvezdni poslovni koledar",
    yourCalendar: "Tvoj koledar",
    sunSign: "Sončno znamenje",
    signOut: "Odjava",
    welcome: "Dobrodošlica! Tvoj koledar je pripravljen, v nabiralniku pa te čaka email z vsemi povezavami.",
    noBirthTitle: "Še brez rojstnih podatkov",
    noBirthBody: "Vpiši datum (in po možnosti uro ter kraj) rojstva spodaj, da se koledar lahko izračuna zate.",
    inactiveTitle: "Naročnina ni aktivna",
    pastDue: "Zadnje plačilo ni uspelo. Stripe bo poskusil znova — ali pa posodobi kartico ob ponovni naročnini.",
    resubscribeBody: "Ko se znova naročiš, se koledar takoj vrne — z vsemi tvojimi podatki.",
    continueToPayment: "Nadaljuj na plačilo",
    failed: "Ni uspelo. Poskusi znova.",
    prevMonth: "Prejšnji mesec",
    nextMonth: "Naslednji mesec",
    money: "denar",
    love: "ljubezen",
    phoneTitle: "Koledar v telefonu",
    phoneBody:
      "Dodaj koledar v iPhone, Mac ali Outlook z enim klikom. Za Google koledar kopiraj povezavo in jo dodaj pod »Drugi koledarji → Iz URL-ja«. Dnevi se osvežujejo sami.",
    addToCalendar: "Dodaj v koledar",
    copied: "Kopirano ✓",
    copyLink: "Kopiraj povezavo",
    privateLink: "Povezava je zasebna — ne deli je z drugimi.",
    noPasswordYet: "Tvoj račun še nima gesla. Nastavi ga spodaj, da se boš lahko prijavljal brez povezave iz emaila.",
    birthTitle: "Rojstni podatki",
    birthNote: "Jezik strani, ki ga izbereš zgoraj, velja tudi za emaile.",
    saved: "Shranjeno ✓",
    save: "Shrani",
    checkDetails: "Preveri podatke.",
    changePassword: "Sprememba gesla",
    setPassword: "Nastavi geslo",
    currentPassword: "Trenutno geslo",
    newPassword: "Novo geslo (vsaj 8 znakov)",
    repeatNewPassword: "Ponovi novo geslo",
    savePassword: "Shrani geslo",
    mismatch: "Gesli se ne ujemata.",
    subscription: "Naročnina",
    freeAccess: "✨ Brezplačen dostop brez omejitev.",
    trialUntil: (until) => `🎁 Brezplačni preizkus do ${until}. Nato 5,99 € na mesec.`,
    cancelled: (until) => `Naročnina je odpovedana. Dostop ostane do ${until}, zaračunano ne bo nič več.`,
    active: (until) => `Aktivna · 5,99 € na mesec · naslednje obdobje od ${until}.`,
    resume: "Obnovi naročnino",
    cancel: "Odpovej naročnino",
    cancelConfirm: "Res želiš odpovedati naročnino?",
    disclaimer: "Koledar je duhovno orodje za načrtovanje, ne finančni, pravni ali zdravstveni nasvet.",
  },
  en: {
    locale: "en-GB",
    product: "Star Business Calendar",
    yourCalendar: "Your calendar",
    sunSign: "Sun sign",
    signOut: "Sign out",
    welcome: "Welcome! Your calendar is ready, and an email with all the links is in your inbox.",
    noBirthTitle: "No birth details yet",
    noBirthBody:
      "Add your birth date below — and your birth time and place if you know them — and the calendar can be calculated for you.",
    inactiveTitle: "Your subscription isn't active",
    pastDue: "The last payment didn't go through. Stripe will retry — or update your card by subscribing again.",
    resubscribeBody: "Subscribe again and your calendar is back straight away, with all your details.",
    continueToPayment: "Continue to payment",
    failed: "That didn't work. Please try again.",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    money: "money",
    love: "love",
    phoneTitle: "On your phone",
    phoneBody:
      "Add it to iPhone, Mac or Outlook with one tap. For Google Calendar, copy the link and add it under “Other calendars → From URL”. The days update on their own.",
    addToCalendar: "Add to calendar",
    copied: "Copied ✓",
    copyLink: "Copy link",
    privateLink: "This link is private — don't share it.",
    noPasswordYet: "Your account has no password yet. Set one below so you can sign in without an email link.",
    birthTitle: "Birth details",
    birthNote: "The language chosen above is also used for your emails.",
    saved: "Saved ✓",
    save: "Save",
    checkDetails: "Please check the details.",
    changePassword: "Change password",
    setPassword: "Set a password",
    currentPassword: "Current password",
    newPassword: "New password (at least 8 characters)",
    repeatNewPassword: "Repeat new password",
    savePassword: "Save password",
    mismatch: "The passwords don't match.",
    subscription: "Subscription",
    freeAccess: "✨ Free, unlimited access.",
    trialUntil: (until) => `🎁 Free trial until ${until}. Then €5.99 per month.`,
    cancelled: (until) => `Your subscription is cancelled. You keep access until ${until} and won't be charged again.`,
    active: (until) => `Active · €5.99 per month · next period from ${until}.`,
    resume: "Resume subscription",
    cancel: "Cancel subscription",
    cancelConfirm: "Cancel your subscription?",
    disclaimer: "The calendar is a spiritual planning tool, not financial, legal or medical advice.",
  },
  hr: {
    locale: "hr-HR",
    product: "Zvjezdani poslovni kalendar",
    yourCalendar: "Tvoj kalendar",
    sunSign: "Sunčev znak",
    signOut: "Odjava",
    welcome: "Dobro došao! Tvoj je kalendar spreman, a u sandučiću te čeka e-mail sa svim poveznicama.",
    noBirthTitle: "Još bez podataka o rođenju",
    noBirthBody: "Upiši datum (i po mogućnosti sat te mjesto) rođenja niže, da se kalendar može izračunati za tebe.",
    inactiveTitle: "Pretplata nije aktivna",
    pastDue: "Zadnje plaćanje nije uspjelo. Stripe će pokušati ponovno — ili ažuriraj karticu pri novoj pretplati.",
    resubscribeBody: "Kad se ponovno pretplatiš, kalendar se odmah vraća — sa svim tvojim podacima.",
    continueToPayment: "Nastavi na plaćanje",
    failed: "Nije uspjelo. Pokušaj ponovno.",
    prevMonth: "Prethodni mjesec",
    nextMonth: "Sljedeći mjesec",
    money: "novac",
    love: "ljubav",
    phoneTitle: "Kalendar u telefonu",
    phoneBody:
      "Dodaj kalendar u iPhone, Mac ili Outlook jednim klikom. Za Google kalendar kopiraj poveznicu i dodaj je pod „Drugi kalendari → S URL-a“. Dani se osvježavaju sami.",
    addToCalendar: "Dodaj u kalendar",
    copied: "Kopirano ✓",
    copyLink: "Kopiraj poveznicu",
    privateLink: "Poveznica je privatna — nemoj je dijeliti.",
    noPasswordYet: "Tvoj račun još nema lozinku. Postavi je niže da se možeš prijaviti bez poveznice iz e-maila.",
    birthTitle: "Podaci o rođenju",
    birthNote: "Jezik stranice koji odabereš gore vrijedi i za e-mailove.",
    saved: "Spremljeno ✓",
    save: "Spremi",
    checkDetails: "Provjeri podatke.",
    changePassword: "Promjena lozinke",
    setPassword: "Postavi lozinku",
    currentPassword: "Trenutna lozinka",
    newPassword: "Nova lozinka (najmanje 8 znakova)",
    repeatNewPassword: "Ponovi novu lozinku",
    savePassword: "Spremi lozinku",
    mismatch: "Lozinke se ne podudaraju.",
    subscription: "Pretplata",
    freeAccess: "✨ Besplatan pristup bez ograničenja.",
    trialUntil: (until) => `🎁 Besplatno probno razdoblje do ${until}. Zatim 5,99 € mjesečno.`,
    cancelled: (until) => `Pretplata je otkazana. Pristup ostaje do ${until}, više se ništa neće naplatiti.`,
    active: (until) => `Aktivna · 5,99 € mjesečno · sljedeće razdoblje od ${until}.`,
    resume: "Obnovi pretplatu",
    cancel: "Otkaži pretplatu",
    cancelConfirm: "Stvarno želiš otkazati pretplatu?",
    disclaimer: "Kalendar je duhovni alat za planiranje, a ne financijski, pravni ni zdravstveni savjet.",
  },
  de: {
    locale: "de-DE",
    product: "Sternen-Geschäftskalender",
    yourCalendar: "Dein Kalender",
    sunSign: "Sonnenzeichen",
    signOut: "Abmelden",
    welcome: "Willkommen! Dein Kalender ist bereit, und eine E-Mail mit allen Links liegt in deinem Postfach.",
    noBirthTitle: "Noch keine Geburtsdaten",
    noBirthBody:
      "Trag unten dein Geburtsdatum ein — und wenn du sie kennst, Uhrzeit und Ort —, damit der Kalender für dich berechnet werden kann.",
    inactiveTitle: "Dein Abo ist nicht aktiv",
    pastDue: "Die letzte Zahlung ist nicht durchgegangen. Stripe versucht es erneut — oder aktualisier die Karte beim neuen Abo.",
    resubscribeBody: "Sobald du wieder abonnierst, ist dein Kalender sofort zurück — mit all deinen Daten.",
    continueToPayment: "Weiter zur Zahlung",
    failed: "Das hat nicht geklappt. Versuch es erneut.",
    prevMonth: "Vorheriger Monat",
    nextMonth: "Nächster Monat",
    money: "Geld",
    love: "Liebe",
    phoneTitle: "Auf deinem Handy",
    phoneBody:
      "Füg ihn mit einem Tippen zu iPhone, Mac oder Outlook hinzu. Für Google Kalender kopier den Link und trag ihn unter „Weitere Kalender → Per URL“ ein. Die Tage aktualisieren sich von selbst.",
    addToCalendar: "Zum Kalender hinzufügen",
    copied: "Kopiert ✓",
    copyLink: "Link kopieren",
    privateLink: "Der Link ist privat — teil ihn nicht.",
    noPasswordYet: "Dein Konto hat noch kein Passwort. Setz unten eines, damit du dich ohne E-Mail-Link anmelden kannst.",
    birthTitle: "Geburtsdaten",
    birthNote: "Die oben gewählte Sprache gilt auch für deine E-Mails.",
    saved: "Gespeichert ✓",
    save: "Speichern",
    checkDetails: "Bitte prüf die Angaben.",
    changePassword: "Passwort ändern",
    setPassword: "Passwort setzen",
    currentPassword: "Aktuelles Passwort",
    newPassword: "Neues Passwort (mindestens 8 Zeichen)",
    repeatNewPassword: "Neues Passwort wiederholen",
    savePassword: "Passwort speichern",
    mismatch: "Die Passwörter stimmen nicht überein.",
    subscription: "Abo",
    freeAccess: "✨ Freier Zugang ohne Einschränkung.",
    trialUntil: (until) => `🎁 Kostenlos testen bis ${until}. Danach 5,99 € pro Monat.`,
    cancelled: (until) => `Dein Abo ist gekündigt. Der Zugang bleibt bis ${until}, es wird nichts mehr berechnet.`,
    active: (until) => `Aktiv · 5,99 € pro Monat · nächster Zeitraum ab ${until}.`,
    resume: "Abo fortsetzen",
    cancel: "Abo kündigen",
    cancelConfirm: "Willst du dein Abo wirklich kündigen?",
    disclaimer: "Der Kalender ist ein spirituelles Planungswerkzeug, keine finanzielle, rechtliche oder medizinische Beratung.",
  },
  it: {
    locale: "it-IT",
    product: "Calendario stellare d'affari",
    yourCalendar: "Il tuo calendario",
    sunSign: "Segno solare",
    signOut: "Esci",
    welcome: "Benvenuto! Il tuo calendario è pronto e nella casella ti aspetta un'email con tutti i link.",
    noBirthTitle: "Ancora senza dati di nascita",
    noBirthBody:
      "Inserisci qui sotto la data di nascita — e, se le conosci, l'ora e il luogo — così il calendario può essere calcolato per te.",
    inactiveTitle: "Il tuo abbonamento non è attivo",
    pastDue: "L'ultimo pagamento non è andato a buon fine. Stripe riproverà — oppure aggiorna la carta riabbonandoti.",
    resubscribeBody: "Appena ti riabboni il calendario torna subito — con tutti i tuoi dati.",
    continueToPayment: "Continua al pagamento",
    failed: "Non ha funzionato. Riprova.",
    prevMonth: "Mese precedente",
    nextMonth: "Mese successivo",
    money: "denaro",
    love: "amore",
    phoneTitle: "Nel tuo telefono",
    phoneBody:
      "Aggiungilo a iPhone, Mac o Outlook con un tocco. Per Google Calendar copia il link e aggiungilo sotto «Altri calendari → Da URL». I giorni si aggiornano da soli.",
    addToCalendar: "Aggiungi al calendario",
    copied: "Copiato ✓",
    copyLink: "Copia il link",
    privateLink: "Il link è privato — non condividerlo.",
    noPasswordYet: "Il tuo account non ha ancora una password. Impostala qui sotto per accedere senza link via email.",
    birthTitle: "Dati di nascita",
    birthNote: "La lingua scelta sopra vale anche per le tue email.",
    saved: "Salvato ✓",
    save: "Salva",
    checkDetails: "Controlla i dati.",
    changePassword: "Cambia password",
    setPassword: "Imposta una password",
    currentPassword: "Password attuale",
    newPassword: "Nuova password (almeno 8 caratteri)",
    repeatNewPassword: "Ripeti la nuova password",
    savePassword: "Salva la password",
    mismatch: "Le password non coincidono.",
    subscription: "Abbonamento",
    freeAccess: "✨ Accesso libero e senza limiti.",
    trialUntil: (until) => `🎁 Prova gratuita fino al ${until}. Poi 5,99 € al mese.`,
    cancelled: (until) => `Il tuo abbonamento è disdetto. L'accesso resta fino al ${until} e non ti verrà addebitato altro.`,
    active: (until) => `Attivo · 5,99 € al mese · prossimo periodo dal ${until}.`,
    resume: "Riattiva l'abbonamento",
    cancel: "Disdici l'abbonamento",
    cancelConfirm: "Vuoi davvero disdire l'abbonamento?",
    disclaimer: "Il calendario è uno strumento spirituale di pianificazione, non una consulenza finanziaria, legale o medica.",
  },
};

export default function MemberCalendar({
  member,
  active,
  year,
  month,
  today,
  days,
  summary,
  sunSign,
  feed,
  welcome,
}: {
  member: MemberView;
  active: boolean;
  year: number;
  month: number;
  today: string;
  days: DayReading[];
  summary: Record<Lang, Summary> | null;
  sunSign: Sign | null;
  feed: { https: string; webcal: string };
  welcome: boolean;
}) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>(member.lang);
  const t = COPY[lang];
  const [selected, setSelected] = useState<string>(days.find((d) => d.date === today)?.date ?? days[0]?.date ?? "");
  const [birth, setBirth] = useState<BirthValue>({
    birthDate: member.birthDate,
    birthTime: member.birthTime ?? "",
    birthTimeZone: member.birthTimeZone,
  });
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [subState, setSubState] = useState<"idle" | "working" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [passwordState, setPasswordState] = useState<"idle" | "working" | "saved" | "error">("idle");
  const [passwordError, setPasswordError] = useState("");

  const selectedDay = days.find((d) => d.date === selected);
  const firstWeekday = days.length ? (new Date(`${days[0].date}T12:00:00Z`).getUTCDay() + 6) % 7 : 0;
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Date(Date.UTC(2024, 0, 1 + i)).toLocaleDateString(t.locale, { weekday: "short", timeZone: "UTC" })
  );
  const until = member.accessUntil ? formatDate(member.accessUntil.slice(0, 10), lang, { day: "numeric", month: "long", year: "numeric" }) : "";

  async function changeSubscription(action: "cancel" | "resume") {
    if (action === "cancel" && !window.confirm(t.cancelConfirm)) return;
    setSubState("working");
    const res = await fetch("/api/sbc/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    }).catch(() => null);
    if (!res?.ok) {
      setSubState("error");
      return;
    }
    setSubState("idle");
    router.refresh();
  }

  async function resubscribe() {
    setSubState("working");
    const res = await fetch("/api/sbc/resubscribe", { method: "POST" }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    const url = (data as { url?: string }).url;
    if (!res?.ok || !url) {
      setSubState("error");
      return;
    }
    window.location.href = url;
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaveState("saving");
    const res = await fetch("/api/sbc/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...birth, lang }),
    }).catch(() => null);
    if (!res?.ok) {
      setSaveState("error");
      return;
    }
    setSaveState("saved");
    router.refresh();
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== newPasswordRepeat) {
      setPasswordError(t.mismatch);
      setPasswordState("error");
      return;
    }
    setPasswordState("working");
    setPasswordError("");
    const res = await fetch("/api/sbc/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "change", currentPassword, password: newPassword, lang }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (!res?.ok) {
      setPasswordError((data as { error?: string }).error ?? t.failed);
      setPasswordState("error");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordRepeat("");
    setPasswordState("saved");
    router.refresh();
  }

  const box = "rounded-3xl bg-paper/85 p-6 md:p-8 shadow-[0_30px_70px_-40px_rgba(75,58,94,0.45)]";
  const field = "w-full rounded-sm border border-bone/20 bg-paper px-4 py-3 text-bone focus:border-bone focus:outline-none";
  const fieldLabel = "mb-2 block text-xs uppercase tracking-widest text-bone";

  return (
    <div className="spirit-light relative isolate" lang={lang}>
      <Container className="max-w-5xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-smoke">✨ {t.product}</p>
            <h1 className="mt-3 font-heading text-4xl text-bone md:text-5xl">
              {sunSign ? `${SIGN_SYMBOL[sunSign]} ` : ""}
              {t.yourCalendar}
            </h1>
            <p className="mt-2 text-bone">
              {sunSign ? `${t.sunSign}: ${SIGN_NAME[sunSign][lang]} · ` : ""}
              {member.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* This also chooses the language of the member's emails — see t.birthNote. */}
            {LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-widest ${lang === l ? "border-bone/60 text-bone" : "border-bone/15 text-smoke"}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
            <form method="post" action="/api/sbc/logout">
              <button type="submit" className="ml-2 text-xs uppercase tracking-widest text-bone underline">
                {t.signOut}
              </button>
            </form>
          </div>
        </div>

        {welcome && active && (
          <p className="mt-6 rounded-2xl bg-paper/85 px-5 py-4 text-bone">
            🎉 {t.welcome}
          </p>
        )}

        {!member.hasBirth ? (
          // An account that came in through the Poetry letters: it exists, but there is no chart
          // to calculate from yet. Never offer payment here — they may already be paying.
          <div className={`${box} mt-10 text-center`}>
            <p className="text-4xl">🪐</p>
            <h2 className="mt-3 font-heading text-3xl text-bone">{t.noBirthTitle}</h2>
            <p className="mt-3 text-bone">
              {t.noBirthBody}
            </p>
          </div>
        ) : !active ? (
          <div className={`${box} mt-10 text-center`}>
            <p className="text-4xl">🌙</p>
            <h2 className="mt-3 font-heading text-3xl text-bone">{t.inactiveTitle}</h2>
            <p className="mt-3 text-bone">
              {member.status === "past_due" ? t.pastDue : t.resubscribeBody}
            </p>
            <button type="button" onClick={resubscribe} disabled={subState === "working"} className="btn-primary mt-6">
              {subState === "working" ? "…" : t.continueToPayment}
            </button>
            {subState === "error" && <p className="mt-3 text-sm text-terracotta">{t.failed}</p>}
          </div>
        ) : (
          <>
            <div className="mt-10 flex items-center justify-between">
              <Link href={`/zvezdni-koledar/moj?m=${shiftMonth(year, month, -1)}`} className="rounded-full bg-paper/80 px-4 py-2 text-bone" aria-label={t.prevMonth}>
                ←
              </Link>
              <h2 className="font-heading text-3xl capitalize text-bone">
                {formatDate(`${year}-${String(month).padStart(2, "0")}-01`, lang, { month: "long", year: "numeric" })}
              </h2>
              <Link href={`/zvezdni-koledar/moj?m=${shiftMonth(year, month, 1)}`} className="rounded-full bg-paper/80 px-4 py-2 text-bone" aria-label={t.nextMonth}>
                →
              </Link>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {weekdays.map((w) => (
                    <p key={w} className="pb-1 text-[11px] uppercase text-smoke">
                      {w}
                    </p>
                  ))}
                  {Array.from({ length: firstWeekday }).map((_, i) => (
                    <span key={`pad-${i}`} />
                  ))}
                  {days.map((d) => {
                    const isSelected = d.date === selected;
                    const isToday = d.date === today;
                    return (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => setSelected(d.date)}
                        aria-pressed={isSelected}
                        aria-label={`${formatDate(d.date, lang, { day: "numeric", month: "long" })}: ${TYPE_LABEL[d.type][lang]}`}
                        className="relative flex aspect-square flex-col items-center justify-center rounded-xl border bg-paper/80 transition-transform hover:-translate-y-0.5"
                        style={{
                          borderColor: isSelected ? TYPE_COLOR[d.type] : "transparent",
                          boxShadow: isSelected ? `0 0 0 2px ${TYPE_COLOR[d.type]}` : undefined,
                        }}
                      >
                        <span className={`text-xs ${isToday ? "rounded-full bg-charcoal px-1.5 text-ivory" : "text-bone"}`}>
                          {Number(d.date.slice(8))}
                        </span>
                        <span className="text-lg leading-none sm:text-2xl">{TYPE_EMOJI[d.type]}</span>
                        <span className="hidden text-[11px] leading-none sm:block">
                          {moonEmoji(d.moonPhase)}
                          {d.stars.money >= 2 ? "💰" : ""}
                          {d.stars.love >= 2 ? "💞" : ""}
                        </span>
                        <span className="absolute bottom-1 h-0.5 w-5 rounded-full" style={{ background: TYPE_COLOR[d.type] }} />
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-bone">
                  {(["contracts", "beginnings", "avoid", "self"] as const).map((type) => (
                    <span key={type}>
                      {TYPE_EMOJI[type]} {TYPE_LABEL[type][lang]}
                    </span>
                  ))}
                  <span>💰 {t.money}</span>
                  <span>💞 {t.love}</span>
                </div>
              </div>

              <div>{selectedDay && <DayCard day={selectedDay} lang={lang} />}</div>
            </div>

            {summary && (
              <div className={`${box} mt-10`}>
                <h2 className="font-heading text-3xl text-bone">🌙 {summary[lang].title}</h2>
                <div className="mt-4 space-y-4">
                  {summary[lang].paragraphs.map((p, i) => (
                    <p key={i} className="whitespace-pre-line leading-relaxed text-bone">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className={`${box} mt-6`}>
              <h2 className="font-heading text-2xl text-bone">📱 {t.phoneTitle}</h2>
              <p className="mt-2 leading-relaxed text-bone">
                {t.phoneBody}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={feed.webcal} className="btn-primary">
                  {t.addToCalendar}
                </a>
                <button
                  type="button"
                  className="btn-secondary border-bone/30 text-bone"
                  onClick={async () => {
                    await navigator.clipboard.writeText(feed.https).catch(() => {});
                    setCopied(true);
                  }}
                >
                  {copied ? t.copied : t.copyLink}
                </button>
              </div>
              <p className="mt-3 text-xs italic text-smoke">
                {t.privateLink}
              </p>
            </div>
          </>
        )}

        {!member.hasPassword && (
          <p className="mt-6 rounded-2xl bg-paper/85 px-5 py-4 text-bone">
            🔐{" "}
            {t.noPasswordYet}
          </p>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <form onSubmit={saveProfile} className={box}>
            <h2 className="font-heading text-2xl text-bone">🪐 {t.birthTitle}</h2>
            <p className="mt-2 mb-5 text-sm text-bone">
              {t.birthNote}
            </p>
            <BirthFields lang={lang} value={birth} onChange={setBirth} />
            <button type="submit" disabled={saveState === "saving"} className="btn-primary mt-5">
              {saveState === "saving" ? "…" : saveState === "saved" ? t.saved : t.save}
            </button>
            {saveState === "error" && <p className="mt-2 text-sm text-terracotta">{t.checkDetails}</p>}
          </form>

          <form onSubmit={savePassword} className={box}>
            <h2 className="font-heading text-2xl text-bone">
              🔐 {member.hasPassword ? t.changePassword : t.setPassword}
            </h2>
            <div className="mt-5 space-y-4">
              {member.hasPassword && (
                <div>
                  <label htmlFor="sbc-current-password" className={fieldLabel}>
                    {t.currentPassword}
                  </label>
                  <input
                    id="sbc-current-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={field}
                  />
                </div>
              )}
              <div>
                <label htmlFor="sbc-change-password" className={fieldLabel}>
                  {t.newPassword}
                </label>
                <input
                  id="sbc-change-password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="sbc-change-password-2" className={fieldLabel}>
                  {t.repeatNewPassword}
                </label>
                <input
                  id="sbc-change-password-2"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={newPasswordRepeat}
                  onChange={(e) => setNewPasswordRepeat(e.target.value)}
                  className={field}
                />
              </div>
            </div>
            <button type="submit" disabled={passwordState === "working"} className="btn-primary mt-5">
              {passwordState === "working" ? "…" : passwordState === "saved" ? t.saved : t.savePassword}
            </button>
            {passwordState === "error" && <p className="mt-2 text-sm text-terracotta">{passwordError}</p>}
          </form>

          <div className={box}>
            <h2 className="font-heading text-2xl text-bone">💳 {t.subscription}</h2>
            <p className="mt-3 leading-relaxed text-bone">
              {member.complimentary
                ? t.freeAccess
                : member.status === "trialing" && !member.cancelAtPeriodEnd
                  ? t.trialUntil(until)
                  : member.cancelAtPeriodEnd
                    ? t.cancelled(until)
                    : member.status === "active"
                      ? t.active(until)
                      : ""}
            </p>
            {active &&
              !member.complimentary &&
              (member.cancelAtPeriodEnd ? (
                <button type="button" disabled={subState === "working"} onClick={() => changeSubscription("resume")} className="btn-primary mt-5">
                  {t.resume}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={subState === "working"}
                  onClick={() => changeSubscription("cancel")}
                  className="btn-secondary mt-5 border-bone/30 text-bone"
                >
                  {t.cancel}
                </button>
              ))}
            {subState === "error" && <p className="mt-2 text-sm text-terracotta">{t.failed}</p>}
            <p className="mt-5 text-xs italic text-smoke">
              {t.disclaimer}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
