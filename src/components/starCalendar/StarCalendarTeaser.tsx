import Link from "next/link";
import Container from "@/components/shared/Container";
import type { Locale } from "@/i18n/locales";

/**
 * The Star Business Calendar's invitation on the Spirituality page. That page speaks all five
 * site languages, so this does too — the calendar behind the link is still Slovenian and
 * English, which its own sign-up form makes clear.
 */
const COPY: Record<Locale, { badge: string; title: string; body: string; cta: string; note: string }> = {
  sl: {
    badge: "Novo",
    title: "Zvezdni poslovni koledar",
    body: "Tvoj osebni koledar po rojstni karti: kdaj podpisati 🤝, kdaj začeti 🚀, kdaj počakati ⛔ in kdaj si vzeti čas zase 🧘 — plus ljubezen 💞, denar 💰 in zdravje 🌿.",
    cta: "7 dni brezplačno →",
    note: "nato 5,99 € na mesec · odpoveš kadarkoli",
  },
  en: {
    badge: "New",
    title: "Star Business Calendar",
    body: "Your personal calendar from your birth chart: when to sign 🤝, when to begin 🚀, when to wait ⛔ and when to take time for yourself 🧘 — plus love 💞, money 💰 and health 🌿.",
    cta: "7 days free →",
    note: "then €5.99 a month · cancel any time",
  },
  hr: {
    badge: "Novo",
    title: "Zvjezdani poslovni kalendar",
    body: "Tvoj osobni kalendar prema rođenoj karti: kada potpisati 🤝, kada započeti 🚀, kada pričekati ⛔ i kada uzeti vrijeme za sebe 🧘 — plus ljubav 💞, novac 💰 i zdravlje 🌿.",
    cta: "7 dana besplatno →",
    note: "zatim 5,99 € mjesečno · otkazuješ bilo kada",
  },
  de: {
    badge: "Neu",
    title: "Sternen-Geschäftskalender",
    body: "Dein persönlicher Kalender aus deinem Geburtshoroskop: wann unterschreiben 🤝, wann beginnen 🚀, wann warten ⛔ und wann Zeit für dich nehmen 🧘 — dazu Liebe 💞, Geld 💰 und Gesundheit 🌿.",
    cta: "7 Tage kostenlos →",
    note: "danach 5,99 € im Monat · jederzeit kündbar",
  },
  it: {
    badge: "Novità",
    title: "Calendario stellare d'affari",
    body: "Il tuo calendario personale dal tuo tema natale: quando firmare 🤝, quando iniziare 🚀, quando aspettare ⛔ e quando prenderti del tempo 🧘 — più amore 💞, denaro 💰 e salute 🌿.",
    cta: "7 giorni gratis →",
    note: "poi 5,99 € al mese · disdici quando vuoi",
  },
};

export default function StarCalendarTeaser({ lang }: { lang: Locale }) {
  const t = COPY[lang];
  return (
    <section id="zvezdni-koledar" className="scroll-mt-24 border-t border-bone/10 px-6 py-24 md:py-28">
      <Container className="max-w-3xl">
        <div className="rounded-3xl border border-accent-warm/40 bg-paper/85 p-8 text-center shadow-[0_30px_70px_-40px_rgba(75,58,94,0.45)] md:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-smoke">{t.badge}</p>
          <h2 className="mt-4 font-heading text-3xl text-bone md:text-4xl">✨ {t.title}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-bone">{t.body}</p>
          <Link href="/zvezdni-koledar" className="btn-primary mt-8 inline-block">
            {t.cta}
          </Link>
          <p className="mt-3 text-sm text-smoke">{t.note}</p>
        </div>
      </Container>
    </section>
  );
}
