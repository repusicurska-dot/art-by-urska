"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import type { DayReading } from "@/lib/astro/calendar";
import { TYPE_EMOJI, TYPE_LABEL, formatDate, moonEmoji, type Lang } from "@/lib/astro/texts";
import DayCard, { TYPE_COLOR } from "./DayCard";
import BirthFields, { type BirthValue } from "./BirthFields";

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
  const [lang, setLang] = useState<Lang>("sl");
  const t = COPY[lang];
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState<BirthValue>({ birthDate: "", birthTime: "", birthTimeZone: "Europe/Ljubljana" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "already" | "complimentary" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    // Follow the visitor's browser language on first load.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!navigator.language.toLowerCase().startsWith("sl")) setLang("en");
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/sbc/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang, consent, ...birth }),
      });
      const data = await res.json();
      if (!res.ok) {
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
    <div className="spirit-light spirit-ground relative isolate" lang={lang}>
      <section className="px-6 pt-20 pb-16 text-center md:pt-28">
        <Container className="max-w-3xl">
          <div className="mb-8 flex items-center justify-center gap-2" role="group" aria-label="Language">
            {(["sl", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-widest ${lang === l ? "border-bone/60 text-bone" : "border-bone/15 text-smoke"}`}
              >
                {l === "sl" ? "Slovensko" : "English"}
              </button>
            ))}
          </div>
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
