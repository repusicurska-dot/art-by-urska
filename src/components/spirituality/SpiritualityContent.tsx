"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { fadeInUp } from "@/lib/motion";
import Horoscope from "./Horoscope";

type Lang = "sl" | "en";

interface RelatedArtwork {
  slug: string;
  title: string;
  image: string;
  cta: string;
}

interface Section {
  heading: string;
  text: string;
  artwork?: RelatedArtwork;
}

interface Copy {
  eyebrow: string;
  title: string;
  lead: string;
  sections: Section[];
  closing: string;
  closingCta: string;
  signature: string;
}

// AI-drafted at Urška's explicit request ("ne vem kaj naj mam na tej strani, ustvari
// zanimivo in da se lahko izražam") — a starting voice for her to keep, edit, or replace,
// not presented as her verbatim words. Built from what's genuinely known about her
// (competition climber turned painter) and the recurring themes in her own real work
// (soul recognition across lifetimes, courage as a choice, darkness giving way to light).
// Each reflection that maps onto a real painting links straight to it, so the page has
// somewhere to go rather than being read once and left.
const COPY: Record<Lang, Copy> = {
  sl: {
    eyebrow: "Duhovnost pri Urški",
    title: "Preden je čopič, je duša.",
    lead: "Nekaj časa sem mislila, da moram najprej razumeti, preden lahko ustvarim. Zdaj vem, da je obratno — najprej moram začutiti. Razumevanje pride pozneje, če sploh kdaj pride.",
    sections: [
      {
        heading: "Tišina pred barvo",
        text: "Preden se dotaknem platna, se za trenutek ustavim. Ne zato, ker bi čakala na navdih, ampak zato, ker vem, da tisto, kar je res moje, ne pride v hrupu. Prihaja v tistem tihem prostoru med enim vdihom in naslednjim — tam, kjer strahu, kaj bo nastalo, ni več.",
      },
      {
        heading: "Od skale do platna",
        text: "Dolgo preden sem prvič prijela čopič, sem se učila zaupanja na steni. Plezanje me je naučilo, da telo pozna stvari, ki jih um še ne razume — kam seže roka, preden oko najde oprijem, kako dihanje umiri strah. Danes slikam na podoben način. Ne načrtujem vsake poteze vnaprej. Zaupam, da roka najde pot, tako kot jo je nekoč našla na steni.",
      },
      {
        heading: "Duše, ki se prepoznajo",
        text: "Verjamem, da nekatera srečanja niso naključna. Da obstaja starejša oblika spomina, ki nima nič opraviti z datumi ali kraji — samo z občutkom, da si nekoga že poznal, še preden si izvedel njegovo ime. To platno se je rodilo prav iz tega občutka.",
        artwork: {
          slug: "artwork-05",
          title: "Somehow My Heart Still Remembers You",
          image: "/images/somehow-my-heart.jpg",
          cta: "Poglej to delo →",
        },
      },
      {
        heading: "Ko tema ni sovražnik",
        text: "Nekaj mojih najtemnejših platen je nastalo v obdobjih, ko sem se počutila najbolj izgubljeno. In vsakič znova sem odkrila isto: tema ni nasprotje svetlobe, je le prostor, kjer se svetloba še ni pokazala. Pogum ni odsotnost strahu — je odločitev, da kljub strahu pokleknemo in začnemo. Iz tega je nastala ta slika.",
        artwork: {
          slug: "artwork-02",
          title: "The Prophecy",
          image: "/images/the-prophecy.jpg",
          cta: "Poglej to delo →",
        },
      },
    ],
    closing:
      "Vsaka slika na tej strani se je rodila iz nečesa, kar sem prej začutila kot duhovno resnico, šele nato kot podobo. Če te je katera od zgornjih misli nagovorila, je verjetno platno, ki ji pripada, zate.",
    closingCta: "Razišči vso zbirko →",
    signature: "— Urška",
  },
  en: {
    eyebrow: "Spirituality by Urška",
    title: "Before the brush, there is a soul.",
    lead: "For a long time I thought I had to understand before I could create. Now I know it's the other way around — I have to feel first. Understanding comes later, if it comes at all.",
    sections: [
      {
        heading: "The silence before color",
        text: "Before I touch the canvas, I stop for a moment. Not because I'm waiting for inspiration, but because I know that whatever is truly mine doesn't arrive in noise. It comes in that quiet space between one breath and the next — where the fear of what might appear no longer lives.",
      },
      {
        heading: "From the rock to the canvas",
        text: "Long before I ever held a brush, I was learning to trust a wall. Climbing taught me that the body knows things the mind hasn't caught up to yet — where the hand reaches before the eye finds the hold, how breath can quiet fear. I paint in much the same way now. I don't plan every stroke in advance. I trust that my hand will find the way, the way it once did on stone.",
      },
      {
        heading: "Souls that recognize each other",
        text: "I believe some meetings aren't accidental. That there's an older kind of memory that has nothing to do with dates or places — only with the feeling that you already knew someone before you learned their name. This canvas was born from exactly that feeling.",
        artwork: {
          slug: "artwork-05",
          title: "Somehow My Heart Still Remembers You",
          image: "/images/somehow-my-heart.jpg",
          cta: "View this piece →",
        },
      },
      {
        heading: "When darkness isn't the enemy",
        text: "Some of my darkest canvases were made in the seasons I felt most lost. And every time, I discovered the same thing: darkness isn't the opposite of light — it's just the space where light hasn't arrived yet. Courage isn't the absence of fear — it's the decision to kneel down and begin anyway. This piece came out of that.",
        artwork: {
          slug: "artwork-02",
          title: "The Prophecy",
          image: "/images/the-prophecy.jpg",
          cta: "View this piece →",
        },
      },
    ],
    closing:
      "Every painting on this site started as something I felt as a spiritual truth before it ever became an image. If one of these reflections spoke to you, the canvas it belongs to probably will too.",
    closingCta: "Explore the full collection →",
    signature: "— Urška",
  },
};

export default function SpiritualityContent() {
  const [lang, setLang] = useState<Lang>("sl");
  const copy = COPY[lang];

  return (
    <div
      className="bg-ink"
      style={{
        background: [
          "radial-gradient(1100px circle at 15% -10%, color-mix(in srgb, var(--color-accent-spirit) 40%, transparent), transparent 60%)",
          "radial-gradient(900px circle at 90% 25%, color-mix(in srgb, var(--color-accent-poetry) 28%, transparent), transparent 55%)",
          "radial-gradient(1300px circle at 50% 115%, color-mix(in srgb, var(--color-accent-warm) 22%, transparent), transparent 60%)",
          "var(--color-ink)",
        ].join(", "),
      }}
    >
      <section className="min-h-[60vh] flex items-center justify-center px-6 py-24 text-center">
        <Container className="max-w-2xl">
          <div className="flex justify-center gap-2 mb-8" role="group" aria-label="Language">
            {(["sl", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors ${
                  lang === l
                    ? "border-bone/60 text-bone"
                    : "border-bone/15 text-smoke hover:text-bone hover:border-bone/40"
                }`}
              >
                {l === "sl" ? "Slovensko" : "English"}
              </button>
            ))}
          </div>

          <motion.div key={lang} initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="block text-xs tracking-[0.3em] uppercase text-smoke">
              {copy.eyebrow}
            </span>
            <h1 className="font-heading italic text-3xl md:text-5xl text-bone mt-6 leading-snug">
              {copy.title}
            </h1>
            <p className="mt-8 text-lg text-bone/75 leading-relaxed">{copy.lead}</p>
          </motion.div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container className="max-w-2xl">
          <div className="space-y-16">
            {copy.sections.map((section: Section, i: number) => (
              <motion.div
                key={`${lang}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="font-heading text-xl md:text-2xl text-bone">{section.heading}</h2>
                <p className="mt-4 text-bone/70 leading-relaxed">{section.text}</p>

                {section.artwork && (
                  <Link
                    href={`/artworks/${section.artwork.slug}`}
                    className="group mt-6 flex items-center gap-4 rounded-sm border border-bone/10 p-3 transition-colors hover:border-bone/30"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-raised">
                      <Image
                        src={section.artwork.image}
                        alt={section.artwork.title}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <p className="font-heading text-base text-bone">{section.artwork.title}</p>
                      <span className="text-xs tracking-widest uppercase text-bone/60 group-hover:text-bone transition-colors">
                        {section.artwork.cta}
                      </span>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Horoscope lang={lang} />

      <section className="pb-24 md:pb-32">
        <Container className="max-w-2xl">
          <motion.div
            key={`${lang}-closing`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pt-16 border-t border-bone/10 text-center"
          >
            <p className="font-heading italic text-xl md:text-2xl text-bone leading-relaxed max-w-xl mx-auto">
              {copy.closing}
            </p>
            <Link
              href="/collection"
              className="inline-block mt-8 text-xs tracking-widest uppercase text-bone/85 hover:text-bone transition-colors border-b border-bone/40 pb-1"
            >
              {copy.closingCta}
            </Link>
            <p className="mt-8 font-heading text-lg text-bone">{copy.signature}</p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
