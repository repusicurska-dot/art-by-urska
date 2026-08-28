"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { fadeInUp } from "@/lib/motion";

type Lang = "sl" | "en";

interface Section {
  heading: string;
  text: string;
}

interface Copy {
  eyebrow: string;
  title: string;
  lead: string;
  sections: Section[];
  closing: string;
  signature: string;
}

// AI-drafted at Urška's explicit request ("ne vem kaj naj mam na tej strani, ustvari
// zanimivo in da se lahko izražam") — a starting voice for her to keep, edit, or replace,
// not presented as her verbatim words. Built from what's genuinely known about her
// (competition climber turned painter) and the recurring themes in her own real work
// (soul recognition across lifetimes, courage as a choice, darkness giving way to light).
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
        text: "Verjamem, da nekatera srečanja niso naključna. Da obstaja starejša oblika spomina, ki nima nič opraviti z datumi ali kraji — samo z občutkom, da si nekoga že poznal, še preden si izvedel njegovo ime. Večina mojih slik govori prav o tem: o ljubezni, ki ne potrebuje razlage, ker jo duša prepozna sama.",
      },
      {
        heading: "Ko tema ni sovražnik",
        text: "Nekaj mojih najtemnejših platen je nastalo v obdobjih, ko sem se počutila najbolj izgubljeno. In vsakič znova sem odkrila isto: tema ni nasprotje svetlobe, je le prostor, kjer se svetloba še ni pokazala. Pogum ni odsotnost strahu. Je odločitev, da kljub strahu pokleknemo in začnemo.",
      },
    ],
    closing:
      "To je šele začetek tega prostora. Sčasoma bo rasel — z besedami, mislimi, morda tudi z vprašanji, na katera še nimam odgovora. Hvala, da si tukaj, medtem ko to gradim.",
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
        text: "I believe some meetings aren't accidental. That there's an older kind of memory that has nothing to do with dates or places — only with the feeling that you already knew someone before you learned their name. Most of my paintings are really about this: a love that needs no explanation, because the soul recognizes it on its own.",
      },
      {
        heading: "When darkness isn't the enemy",
        text: "Some of my darkest canvases were made in the seasons I felt most lost. And every time, I discovered the same thing: darkness isn't the opposite of light — it's just the space where light hasn't arrived yet. Courage isn't the absence of fear. It's the decision to kneel down and begin anyway.",
      },
    ],
    closing:
      "This is only the beginning of this space. It will grow over time — with more words, more thoughts, maybe even questions I don't have answers to yet. Thank you for being here while I build it.",
    signature: "— Urška",
  },
};

export default function SpiritualityContent() {
  const [lang, setLang] = useState<Lang>("sl");
  const copy = COPY[lang];

  return (
    <div className="bg-ink">
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

          <motion.div
            key={lang}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
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
            {copy.sections.map((section, i) => (
              <motion.div
                key={`${lang}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="font-heading text-xl md:text-2xl text-bone">{section.heading}</h2>
                <p className="mt-4 text-bone/70 leading-relaxed">{section.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            key={`${lang}-closing`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-20 pt-16 border-t border-bone/10 text-center"
          >
            <p className="font-heading italic text-xl md:text-2xl text-bone leading-relaxed max-w-xl mx-auto">
              {copy.closing}
            </p>
            <p className="mt-6 font-heading text-lg text-bone">{copy.signature}</p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
