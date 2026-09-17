import Link from "next/link";
import Container from "@/components/shared/Container";
import type { Lang } from "@/lib/astro/texts";

/** The Star Business Calendar's invitation on the Spirituality page. */
export default function StarCalendarTeaser({ lang }: { lang: Lang }) {
  const sl = lang === "sl";
  return (
    <section id="zvezdni-koledar" className="scroll-mt-24 border-t border-bone/10 px-6 py-24 md:py-28">
      <Container className="max-w-3xl">
        <div className="rounded-3xl border border-accent-warm/40 bg-paper/85 p-8 text-center shadow-[0_30px_70px_-40px_rgba(75,58,94,0.45)] md:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-smoke">{sl ? "Novo" : "New"}</p>
          <h2 className="mt-4 font-heading text-3xl text-bone md:text-4xl">✨ {sl ? "Zvezdni poslovni koledar" : "Star Business Calendar"}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-bone">
            {sl
              ? "Tvoj osebni koledar po rojstni karti: kdaj podpisati 🤝, kdaj začeti 🚀, kdaj počakati ⛔ in kdaj si vzeti čas zase 🧘 — plus ljubezen 💞, denar 💰 in zdravje 🌿."
              : "Your personal calendar from your birth chart: when to sign 🤝, when to begin 🚀, when to wait ⛔ and when to take time for yourself 🧘 — plus love 💞, money 💰 and health 🌿."}
          </p>
          <Link href="/zvezdni-koledar" className="btn-primary mt-8 inline-block">
            {sl ? "7 dni brezplačno →" : "7 days free →"}
          </Link>
          <p className="mt-3 text-sm text-smoke">{sl ? "nato 5,99 € na mesec · odpoveš kadarkoli" : "then €5.99 a month · cancel any time"}</p>
        </div>
      </Container>
    </section>
  );
}
