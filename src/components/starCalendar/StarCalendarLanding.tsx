"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import type { DayReading } from "@/lib/astro/calendar";
import { TYPE_EMOJI, TYPE_LABEL, formatDate, moonEmoji, type Lang } from "@/lib/astro/texts";
import DayCard, { TYPE_COLOR } from "./DayCard";
import BirthFields, { type BirthValue } from "./BirthFields";
import { useLanguage } from "@/i18n/LanguageProvider";

const COPY = {
  sl: {
    eyebrow: "Art by Urška · nova naročnina",
    title: "Zvezdni poslovni koledar",
    subtitle:
      "Poveži svoje poslovne in življenjske odločitve z ritmom lune in planetov. Vsak dan veš, ali je čas za podpis, za nov začetek, za počitek — ali da ne začenjaš ničesar.",
    ctaTrial: "Začni 7 dni brezplačno",
    today: "Danes za vse",
    todayNote: "To je splošen dan. Naročniki vidijo, kaj pomeni za njihovo rojstno karto.",
    week: "Naslednjih 7 dni",
    featuresTitle: "Kaj dobiš",
    features: [
      ["📅", "Osebni koledar", "Vsak dan označen: 🤝 pogodbe, 🚀 začetki, ⛔ ne začenjaj, 🧘 čas zase — izračunano iz tvojega datuma, ure in kraja rojstva."],
      ["💞💰🌿", "Ljubezen, denar, zdravje", "Za vsak dan zvezdice za tri področja, da veš, kdaj se odpreti, kdaj vlagati in kdaj si privoščiti več energije."],
      ["🌙", "Mesečni osebni horoskop", "Vsak 1. v mesecu v tvojem nabiralniku: pregled meseca, tvoji najboljši dnevi in obdobja, na katera paziš."],
      ["✉️", "Pregled tedna", "Vsak ponedeljek: kateri dan izbrati za pomemben podpis in kdaj zagnati nekaj novega."],
      ["📱", "V tvojem telefonu", "Z enim klikom dodaš koledar v iPhone ali Google koledar — dnevi se prikažejo med tvojimi termini."],
      ["☿℞", "Opozorila", "Merkur retrogradno, mrki, luna brez smeri — pravočasno veš, kdaj je bolje počakati."],
    ],
    priceTitle: "5,99 € / mesec",
    priceNote: "Prvih 7 dni brezplačno · odpoveš kadarkoli z enim klikom",
    formTitle: "Ustvari svoj koledar",
    email: "E-naslov",
    password: "Geslo (vsaj 8 znakov)",
    passwordRepeat: "Ponovi geslo",
    passwordHint: "Z e-naslovom in geslom se pozneje prijaviš do svojega koledarja.",
    mismatch: "Gesli se ne ujemata.",
    exists: "Račun s tem e-naslovom že obstaja. Prijavi se — če naročnina ni aktivna, jo dokončaš na svoji strani.",
    consent: "Strinjam se s pogoji naročnine. Razumem, da se po 7 dneh brezplačnega preizkusa naročnina samodejno podaljšuje za 5,99 € na mesec, dokler je ne odpovem, in da storitev začne teči takoj.",
    terms: "Pogoji",
    submit: "Nadaljuj na plačilo — 7 dni brezplačno",
    submitting: "Pripravljam …",
    already: "S tem naslovom že imaš naročnino — poslali smo ti povezavo za prijavo.",
    complimentary: "✨ Ta naslov ima brezplačen dostop. Poslali smo ti povezavo za prijavo.",
    soon: "Naročnina bo na voljo zelo kmalu.",
    loginPrompt: "Že imaš naročnino?",
    login: "Prijava",
    canceled: "Plačilo je bilo prekinjeno — nič ni bilo zaračunano. Poskusiš lahko znova.",
    error: "Pri plačilu je šlo nekaj narobe. Poskusi znova ali nam piši.",
    faqTitle: "Pogosta vprašanja",
    faq: [
      ["Ali potrebujem uro rojstva?", "Ne nujno. Z uro je koledar natančnejši (predvsem položaj Lune), brez nje pa še vedno upošteva Sonce, Merkur, Venero, Mars, Jupiter in Saturn ob tvojem rojstvu."],
      ["Kako odpovem?", "Na svoji strani koledarja klikneš »Odpovej naročnino«. Dostop ostane do konca plačanega obdobja ali preizkusa. Če odpoveš v 7 dneh, ne plačaš nič."],
      ["Je to finančni nasvet?", "Ne. Koledar je duhovno orodje za načrtovanje in razmislek po tradicionalni astrologiji. Odločitve so vedno tvoje."],
      ["Na čem temelji?", "Na natančnih astronomskih položajih planetov in pravilih klasične (elekcijske) astrologije: Merkur za pogodbe, rastoča Luna za začetke, Luna brez smeri in mrki za čakanje, Venera za ljubezen, Jupiter za denar."],
    ],
    disclaimer: "Duhovna in razvedrilna vsebina — ne nadomešča finančnega, pravnega ali zdravstvenega nasveta.",
  },
  en: {
    eyebrow: "Art by Urška · new subscription",
    title: "Star Business Calendar",
    subtitle:
      "Align your business and life decisions with the rhythm of the Moon and planets. Every day you know whether it's time to sign, to begin, to rest — or to start nothing at all.",
    ctaTrial: "Start 7 days free",
    today: "Today, for everyone",
    todayNote: "This is the general day. Subscribers see what it means for their own birth chart.",
    week: "The next 7 days",
    featuresTitle: "What you get",
    features: [
      ["📅", "A personal calendar", "Every day marked: 🤝 contracts, 🚀 beginnings, ⛔ start nothing, 🧘 time for yourself — calculated from your birth date, time and place."],
      ["💞💰🌿", "Love, money, health", "Stars for three areas every day, so you know when to open up, when to invest and when you have energy to spare."],
      ["🌙", "Monthly personal horoscope", "In your inbox on the 1st: the month ahead, your best days and the stretches to watch."],
      ["✉️", "Your week", "Every Monday: which day to choose for an important signature, and when to launch something new."],
      ["📱", "On your phone", "One tap adds it to iPhone or Google Calendar — the days show up alongside your appointments."],
      ["☿℞", "Heads-ups", "Mercury retrograde, eclipses, the void-of-course Moon — know in time when it's wiser to wait."],
    ],
    priceTitle: "€5.99 / month",
    priceNote: "First 7 days free · cancel any time with one click",
    formTitle: "Create your calendar",
    email: "Email",
    password: "Password (at least 8 characters)",
    passwordRepeat: "Repeat password",
    passwordHint: "You'll sign in to your calendar with this email and password.",
    mismatch: "The passwords don't match.",
    exists: "An account with this email already exists. Sign in — if the subscription isn't active, you can finish it on your account page.",
    consent: "I agree to the subscription terms. I understand that after the 7-day free trial the subscription renews automatically at €5.99 per month until I cancel, and that the service starts immediately.",
    terms: "Terms",
    submit: "Continue to payment — 7 days free",
    submitting: "Preparing …",
    already: "You already have a subscription with this email — we've sent you a sign-in link.",
    complimentary: "✨ This address has free access. We've sent you a sign-in link.",
    soon: "Subscriptions open very soon.",
    loginPrompt: "Already subscribed?",
    login: "Sign in",
    canceled: "Payment was cancelled — you haven't been charged. You can try again.",
    error: "Something went wrong with the payment. Please try again or write to us.",
    faqTitle: "Questions",
    faq: [
      ["Do I need my birth time?", "Not necessarily. With it the calendar is more precise (especially the Moon's position); without it, it still uses your natal Sun, Mercury, Venus, Mars, Jupiter and Saturn."],
      ["How do I cancel?", "Click “Cancel subscription” on your calendar page. You keep access until the end of the paid period or trial. Cancel within 7 days and you pay nothing."],
      ["Is this financial advice?", "No. The calendar is a spiritual tool for planning and reflection, based on traditional astrology. The decisions are always yours."],
      ["What is it based on?", "Precise astronomical planet positions and the rules of classical (electional) astrology: Mercury for contracts, the waxing Moon for beginnings, the void-of-course Moon and eclipses for waiting, Venus for love, Jupiter for money."],
    ],
    disclaimer: "Spiritual and entertainment content — not a substitute for financial, legal or medical advice.",
  },
  hr: {
    eyebrow: "Art by Urška · nova pretplata",
    title: "Zvjezdani poslovni kalendar",
    subtitle:
      "Poveži svoje poslovne i životne odluke s ritmom Mjeseca i planeta. Svakog dana znaš je li vrijeme za potpis, za novi početak, za odmor — ili da ne započinješ ništa.",
    ctaTrial: "Započni 7 dana besplatno",
    today: "Danas, za sve",
    todayNote: "Ovo je opći dan. Pretplatnici vide što znači za njihovu rođenu kartu.",
    week: "Sljedećih 7 dana",
    featuresTitle: "Što dobivaš",
    features: [
      ["📅", "Osobni kalendar", "Svaki dan označen: 🤝 ugovori, 🚀 počeci, ⛔ ne počinji, 🧘 vrijeme za sebe — izračunato iz tvog datuma, sata i mjesta rođenja."],
      ["💞💰🌿", "Ljubav, novac, zdravlje", "Zvjezdice za tri područja svakog dana, da znaš kada se otvoriti, kada ulagati i kada imaš viška energije."],
      ["🌙", "Mjesečni osobni horoskop", "Prvog u mjesecu u tvom sandučiću: pregled mjeseca, tvoji najbolji dani i razdoblja na koja paziš."],
      ["✉️", "Pregled tjedna", "Svakog ponedjeljka: koji dan odabrati za važan potpis i kada pokrenuti nešto novo."],
      ["📱", "U tvom telefonu", "Jednim klikom dodaješ kalendar u iPhone ili Google kalendar — dani se pojavljuju među tvojim terminima."],
      ["☿℞", "Upozorenja", "Merkur retrogradno, pomrčine, Mjesec bez smjera — na vrijeme znaš kada je bolje pričekati."],
    ],
    priceTitle: "5,99 € / mjesec",
    priceNote: "Prvih 7 dana besplatno · otkazuješ bilo kada jednim klikom",
    formTitle: "Stvori svoj kalendar",
    email: "E-adresa",
    password: "Lozinka (najmanje 8 znakova)",
    passwordRepeat: "Ponovi lozinku",
    passwordHint: "S e-adresom i lozinkom poslije se prijavljuješ u svoj kalendar.",
    mismatch: "Lozinke se ne podudaraju.",
    exists: "Račun s ovom e-adresom već postoji. Prijavi se — ako pretplata nije aktivna, dovršavaš je na svojoj stranici.",
    consent: "Slažem se s uvjetima pretplate. Razumijem da se nakon 7 dana besplatnog probnog razdoblja pretplata automatski obnavlja za 5,99 € mjesečno dok je ne otkažem i da usluga počinje odmah.",
    terms: "Uvjeti",
    submit: "Nastavi na plaćanje — 7 dana besplatno",
    submitting: "Pripremam …",
    already: "S ovom adresom već imaš pretplatu — poslali smo ti poveznicu za prijavu.",
    complimentary: "✨ Ova adresa ima besplatan pristup. Poslali smo ti poveznicu za prijavu.",
    soon: "Pretplata će biti dostupna vrlo brzo.",
    loginPrompt: "Već si pretplaćen?",
    login: "Prijava",
    canceled: "Plaćanje je prekinuto — ništa nije naplaćeno. Možeš pokušati ponovno.",
    error: "Nešto je pošlo po zlu s plaćanjem. Pokušaj ponovno ili nam piši.",
    faqTitle: "Česta pitanja",
    faq: [
      ["Trebam li sat rođenja?", "Ne nužno. Sa satom je kalendar precizniji (osobito položaj Mjeseca), a bez njega i dalje uzima u obzir Sunce, Merkur, Veneru, Mars, Jupiter i Saturn u trenutku tvog rođenja."],
      ["Kako otkazujem?", "Na svojoj stranici kalendara klikneš „Otkaži pretplatu“. Pristup ostaje do kraja plaćenog razdoblja ili probnog roka. Otkažeš li u 7 dana, ne plaćaš ništa."],
      ["Je li ovo financijski savjet?", "Nije. Kalendar je duhovni alat za planiranje i promišljanje prema tradicionalnoj astrologiji. Odluke su uvijek tvoje."],
      ["Na čemu se temelji?", "Na točnim astronomskim položajima planeta i pravilima klasične (elekcijske) astrologije: Merkur za ugovore, rastući Mjesec za početke, Mjesec bez smjera i pomrčine za čekanje, Venera za ljubav, Jupiter za novac."],
    ],
    disclaimer: "Duhovni i zabavni sadržaj — ne zamjenjuje financijski, pravni ni zdravstveni savjet.",
  },
  de: {
    eyebrow: "Art by Urška · neues Abo",
    title: "Sternen-Geschäftskalender",
    subtitle:
      "Bring deine geschäftlichen und persönlichen Entscheidungen in den Rhythmus von Mond und Planeten. Jeden Tag weißt du, ob die Zeit zum Unterschreiben ist, für einen Neuanfang, für Ruhe — oder dafür, gar nichts zu beginnen.",
    ctaTrial: "7 Tage kostenlos starten",
    today: "Heute, für alle",
    todayNote: "Das ist der allgemeine Tag. Abonnentinnen und Abonnenten sehen, was er für ihr eigenes Geburtshoroskop bedeutet.",
    week: "Die nächsten 7 Tage",
    featuresTitle: "Was du bekommst",
    features: [
      ["📅", "Ein persönlicher Kalender", "Jeder Tag markiert: 🤝 Verträge, 🚀 Anfänge, ⛔ nichts beginnen, 🧘 Zeit für dich — berechnet aus Datum, Uhrzeit und Ort deiner Geburt."],
      ["💞💰🌿", "Liebe, Geld, Gesundheit", "Sterne für drei Bereiche an jedem Tag, damit du weißt, wann du dich öffnest, wann du investierst und wann du Energie übrig hast."],
      ["🌙", "Monatliches persönliches Horoskop", "Am Ersten im Postfach: der Monat im Überblick, deine besten Tage und die Phasen, auf die du achtest."],
      ["✉️", "Deine Woche", "Jeden Montag: welchen Tag du für eine wichtige Unterschrift wählst und wann du etwas Neues startest."],
      ["📱", "Auf deinem Handy", "Mit einem Tippen im iPhone- oder Google-Kalender — die Tage erscheinen zwischen deinen Terminen."],
      ["☿℞", "Hinweise", "Merkur rückläufig, Finsternisse, der Mond ohne Lauf — du weißt rechtzeitig, wann Warten klüger ist."],
    ],
    priceTitle: "5,99 € / Monat",
    priceNote: "Die ersten 7 Tage kostenlos · jederzeit mit einem Klick kündbar",
    formTitle: "Erstell deinen Kalender",
    email: "E-Mail",
    password: "Passwort (mindestens 8 Zeichen)",
    passwordRepeat: "Passwort wiederholen",
    passwordHint: "Mit dieser E-Mail und diesem Passwort meldest du dich später in deinem Kalender an.",
    mismatch: "Die Passwörter stimmen nicht überein.",
    exists: "Ein Konto mit dieser E-Mail existiert bereits. Melde dich an — ist das Abo nicht aktiv, schließt du es auf deiner Seite ab.",
    consent: "Ich stimme den Abo-Bedingungen zu. Mir ist bewusst, dass sich das Abo nach den 7 kostenlosen Tagen automatisch für 5,99 € pro Monat verlängert, bis ich kündige, und dass die Leistung sofort beginnt.",
    terms: "Bedingungen",
    submit: "Weiter zur Zahlung — 7 Tage kostenlos",
    submitting: "Einen Moment …",
    already: "Mit dieser Adresse hast du schon ein Abo — wir haben dir einen Anmeldelink geschickt.",
    complimentary: "✨ Diese Adresse hat freien Zugang. Wir haben dir einen Anmeldelink geschickt.",
    soon: "Das Abo öffnet sehr bald.",
    loginPrompt: "Schon abonniert?",
    login: "Anmelden",
    canceled: "Die Zahlung wurde abgebrochen — es wurde nichts berechnet. Du kannst es erneut versuchen.",
    error: "Bei der Zahlung ist etwas schiefgegangen. Versuch es erneut oder schreib uns.",
    faqTitle: "Fragen",
    faq: [
      ["Brauche ich meine Geburtszeit?", "Nicht unbedingt. Mit ihr ist der Kalender genauer (vor allem die Mondstellung); ohne sie rechnet er weiterhin mit Sonne, Merkur, Venus, Mars, Jupiter und Saturn deiner Geburt."],
      ["Wie kündige ich?", "Auf deiner Kalenderseite klickst du auf „Abo kündigen“. Der Zugang bleibt bis zum Ende des bezahlten Zeitraums oder der Testphase. Kündigst du innerhalb von 7 Tagen, zahlst du nichts."],
      ["Ist das eine Finanzberatung?", "Nein. Der Kalender ist ein spirituelles Werkzeug zum Planen und Nachdenken, nach traditioneller Astrologie. Die Entscheidungen sind immer deine."],
      ["Worauf beruht er?", "Auf genauen astronomischen Planetenständen und den Regeln der klassischen (elektionalen) Astrologie: Merkur für Verträge, der zunehmende Mond für Anfänge, der Mond ohne Lauf und Finsternisse fürs Warten, Venus für die Liebe, Jupiter fürs Geld."],
    ],
    disclaimer: "Spiritueller und unterhaltender Inhalt — kein Ersatz für finanzielle, rechtliche oder medizinische Beratung.",
  },
  it: {
    eyebrow: "Art by Urška · nuovo abbonamento",
    title: "Calendario stellare d'affari",
    subtitle:
      "Allinea le tue decisioni di lavoro e di vita al ritmo della Luna e dei pianeti. Ogni giorno sai se è il momento di firmare, di cominciare, di riposare — o di non iniziare nulla.",
    ctaTrial: "Inizia 7 giorni gratis",
    today: "Oggi, per tutti",
    todayNote: "Questo è il giorno generale. Chi è abbonato vede cosa significa per il proprio tema natale.",
    week: "I prossimi 7 giorni",
    featuresTitle: "Cosa ricevi",
    features: [
      ["📅", "Un calendario personale", "Ogni giorno segnato: 🤝 contratti, 🚀 inizi, ⛔ non iniziare, 🧘 tempo per te — calcolato da data, ora e luogo della tua nascita."],
      ["💞💰🌿", "Amore, denaro, salute", "Stelle per tre ambiti ogni giorno, così sai quando aprirti, quando investire e quando hai energia da spendere."],
      ["🌙", "Oroscopo personale mensile", "Il primo del mese nella tua casella: il mese in sintesi, i tuoi giorni migliori e i periodi a cui fare attenzione."],
      ["✉️", "La tua settimana", "Ogni lunedì: quale giorno scegliere per una firma importante e quando avviare qualcosa di nuovo."],
      ["📱", "Nel tuo telefono", "Con un tocco lo aggiungi al calendario di iPhone o di Google — i giorni compaiono tra i tuoi appuntamenti."],
      ["☿℞", "Avvisi", "Mercurio retrogrado, eclissi, la Luna senza rotta — sai per tempo quando conviene aspettare."],
    ],
    priceTitle: "5,99 € / mese",
    priceNote: "I primi 7 giorni gratis · disdici quando vuoi con un clic",
    formTitle: "Crea il tuo calendario",
    email: "Email",
    password: "Password (almeno 8 caratteri)",
    passwordRepeat: "Ripeti la password",
    passwordHint: "Con questa email e questa password accederai poi al tuo calendario.",
    mismatch: "Le password non coincidono.",
    exists: "Esiste già un account con questa email. Accedi — se l'abbonamento non è attivo, lo completi dalla tua pagina.",
    consent: "Accetto le condizioni dell'abbonamento. Ho compreso che dopo i 7 giorni di prova gratuita l'abbonamento si rinnova automaticamente a 5,99 € al mese finché non lo disdico, e che il servizio inizia subito.",
    terms: "Condizioni",
    submit: "Continua al pagamento — 7 giorni gratis",
    submitting: "Un momento …",
    already: "Con questa email hai già un abbonamento — ti abbiamo mandato un link per accedere.",
    complimentary: "✨ Questo indirizzo ha accesso gratuito. Ti abbiamo mandato un link per accedere.",
    soon: "L'abbonamento apre molto presto.",
    loginPrompt: "Sei già abbonato?",
    login: "Accedi",
    canceled: "Il pagamento è stato annullato — non ti è stato addebitato nulla. Puoi riprovare.",
    error: "Qualcosa è andato storto con il pagamento. Riprova o scrivici.",
    faqTitle: "Domande",
    faq: [
      ["Mi serve l'ora di nascita?", "Non per forza. Con l'ora il calendario è più preciso (soprattutto la posizione della Luna); senza, tiene comunque conto di Sole, Mercurio, Venere, Marte, Giove e Saturno alla tua nascita."],
      ["Come disdico?", "Sulla tua pagina del calendario clicchi «Disdici l'abbonamento». L'accesso resta fino alla fine del periodo pagato o della prova. Se disdici entro 7 giorni non paghi nulla."],
      ["È una consulenza finanziaria?", "No. Il calendario è uno strumento spirituale per pianificare e riflettere, basato sull'astrologia tradizionale. Le decisioni sono sempre tue."],
      ["Su cosa si basa?", "Su posizioni planetarie astronomiche precise e sulle regole dell'astrologia classica (elettiva): Mercurio per i contratti, la Luna crescente per gli inizi, la Luna senza rotta e le eclissi per aspettare, Venere per l'amore, Giove per il denaro."],
    ],
    disclaimer: "Contenuto spirituale e di intrattenimento — non sostituisce una consulenza finanziaria, legale o medica.",
  },
} as const;

export default function StarCalendarLanding({
  week,
  available,
  notice,
}: {
  week: DayReading[];
  available: boolean;
  notice: "canceled" | "error" | null;
}) {
  // The page follows the site-wide language switcher in the header.
  const { locale } = useLanguage();
  const lang: Lang = locale;
  const t = COPY[lang];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [birth, setBirth] = useState<BirthValue>({ birthDate: "", birthTime: "", birthTimeZone: "Europe/Ljubljana" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "already" | "complimentary" | "exists" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setError(t.mismatch);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/sbc/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, lang, consent, ...birth }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.code === "account_exists") {
          setStatus("exists");
          return;
        }
        setError(data.error ?? "Error");
        setStatus("error");
        return;
      }
      if (data.complimentary) {
        setStatus("complimentary");
        return;
      }
      if (data.alreadyMember) {
        setStatus("already");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError(lang === "sl" ? "Povezava ni uspela. Poskusi znova." : "Couldn't connect. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="spirit-light relative isolate" lang={lang}>
      <section className="px-6 pt-20 pb-16 text-center md:pt-28">
        <Container className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-smoke">{t.eyebrow}</p>
          <h1 className="mt-5 font-heading text-4xl text-bone md:text-6xl">✨ {t.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-bone">{t.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#narocnina" className="btn-primary">
              {t.ctaTrial}
            </a>
            <span className="text-sm text-smoke">
              {t.loginPrompt}{" "}
              <Link href="/zvezdni-koledar/prijava" className="text-bone underline">
                {t.login}
              </Link>
            </span>
          </div>
          {notice && <p className="mx-auto mt-6 max-w-lg rounded-xl bg-paper/80 px-4 py-3 text-bone">{t[notice]}</p>}
        </Container>
      </section>

      <section className="px-6 pb-16">
        <Container className="max-w-3xl">
          <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-smoke">{t.today}</p>
          <DayCard day={week[0]} lang={lang} locked />
          <p className="mt-3 text-center text-sm italic text-smoke">{t.todayNote}</p>

          <p className="mt-12 mb-4 text-center text-xs uppercase tracking-[0.3em] text-smoke">{t.week}</p>
          <div className="grid grid-cols-7 gap-2">
            {week.map((d) => (
              <div key={d.date} className="rounded-2xl bg-paper/80 px-1 py-3 text-center" title={TYPE_LABEL[d.type][lang]}>
                <p className="text-[11px] uppercase text-smoke">{formatDate(d.date, lang, { weekday: "short" })}</p>
                <p className="text-sm text-bone">{formatDate(d.date, lang, { day: "numeric" })}</p>
                <p className="mt-1 text-2xl">{TYPE_EMOJI[d.type]}</p>
                <p className="text-sm">{moonEmoji(d.moonPhase)}</p>
                <span className="mx-auto mt-2 block h-1 w-6 rounded-full" style={{ background: TYPE_COLOR[d.type] }} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-bone">
            {(["contracts", "beginnings", "avoid", "self"] as const).map((type) => (
              <span key={type}>
                {TYPE_EMOJI[type]} {TYPE_LABEL[type][lang]}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-bone/10 px-6 py-20">
        <Container className="max-w-5xl">
          <h2 className="text-center font-heading text-3xl text-bone md:text-4xl">{t.featuresTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map(([icon, title, text]) => (
              <div key={title} className="rounded-3xl bg-paper/80 p-6">
                <p className="text-3xl">{icon}</p>
                <h3 className="mt-3 font-heading text-xl text-bone">{title}</h3>
                <p className="mt-2 leading-relaxed text-bone">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="narocnina" className="scroll-mt-24 border-t border-bone/10 px-6 py-20">
        <Container className="max-w-xl">
          <div className="rounded-3xl border border-accent-warm/40 bg-paper/90 p-7 shadow-[0_30px_70px_-40px_rgba(75,58,94,0.5)] md:p-10">
            <p className="text-center font-heading text-4xl text-bone">{t.priceTitle}</p>
            <p className="mt-2 text-center text-sm text-accent-warm">{t.priceNote}</p>

            {!available ? (
              <p className="mt-8 text-center text-bone">🌙 {t.soon}</p>
            ) : status === "exists" ? (
              <div className="mt-8 text-center">
                <p className="text-bone">👋 {t.exists}</p>
                <Link href="/zvezdni-koledar/prijava" className="btn-primary mt-5 inline-block">
                  {t.login}
                </Link>
              </div>
            ) : status === "already" || status === "complimentary" ? (
              <p className="mt-8 text-center text-bone">✉️ {t[status]}</p>
            ) : (
              <form onSubmit={submit} className="mt-8 space-y-5">
                <h2 className="font-heading text-2xl text-bone">{t.formTitle}</h2>
                <div>
                  <label htmlFor="sbc-email" className="mb-2 block text-xs uppercase tracking-widest text-bone">
                    {t.email}
                  </label>
                  <input
                    id="sbc-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-sm border border-bone/20 bg-paper px-4 py-3 text-bone focus:border-bone focus:outline-none"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="sbc-password" className="mb-2 block text-xs uppercase tracking-widest text-bone">
                      {t.password}
                    </label>
                    <input
                      id="sbc-password"
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-sm border border-bone/20 bg-paper px-4 py-3 text-bone focus:border-bone focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="sbc-password-2" className="mb-2 block text-xs uppercase tracking-widest text-bone">
                      {t.passwordRepeat}
                    </label>
                    <input
                      id="sbc-password-2"
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={passwordRepeat}
                      onChange={(e) => setPasswordRepeat(e.target.value)}
                      className="w-full rounded-sm border border-bone/20 bg-paper px-4 py-3 text-bone focus:border-bone focus:outline-none"
                    />
                  </div>
                </div>
                <p className="-mt-2 text-xs italic text-smoke">{t.passwordHint}</p>
                <BirthFields lang={lang} value={birth} onChange={setBirth} />
                <label className="flex items-start gap-3 text-sm leading-relaxed text-bone">
                  <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
                  <span>
                    {t.consent}{" "}
                    <Link href="/legal/terms#zvezdni-koledar" className="underline" target="_blank">
                      {t.terms}
                    </Link>
                  </span>
                </label>
                {status === "error" && (
                  <p role="alert" className="text-sm text-terracotta">
                    {error}
                  </p>
                )}
                <button type="submit" disabled={status === "submitting"} className="btn-primary w-full">
                  {status === "submitting" ? t.submitting : t.submit}
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>

      <section className="border-t border-bone/10 px-6 py-20">
        <Container className="max-w-2xl">
          <h2 className="text-center font-heading text-3xl text-bone">{t.faqTitle}</h2>
          <div className="mt-8 space-y-3">
            {t.faq.map(([q, a]) => (
              <details key={q} className="rounded-2xl bg-paper/80 px-5 py-4">
                <summary className="cursor-pointer font-heading text-lg text-bone">{q}</summary>
                <p className="mt-2 leading-relaxed text-bone">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-center text-xs italic text-smoke">{t.disclaimer}</p>
        </Container>
      </section>
    </div>
  );
}
