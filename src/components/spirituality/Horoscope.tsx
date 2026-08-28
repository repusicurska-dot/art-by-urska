"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/shared/Container";

type Lang = "sl" | "en";

interface Sign {
  key: string;
  symbol: string;
  name: { sl: string; en: string };
  dates: { sl: string; en: string };
  element: { sl: string; en: string };
  text: { sl: string; en: string };
  /** Month/day the sign's season starts (inclusive), for figuring out "today". */
  start: [number, number];
}

// Standard tropical zodiac date ranges. Trait text is generic astrological
// characterization (not a personalized daily reading) — evergreen, not invented
// business fact, safe to show without her review, but she's welcome to rewrite the voice.
const SIGNS: Sign[] = [
  {
    key: "aries",
    symbol: "♈",
    name: { sl: "Oven", en: "Aries" },
    dates: { sl: "21. mar – 19. apr", en: "Mar 21 – Apr 19" },
    element: { sl: "Ogenj", en: "Fire" },
    text: {
      sl: "Prvi vžig, ne zadnji dvom. Oven ne čaka na popolni trenutek — on ga ustvari s tem, da stopi vanj.",
      en: "The first spark, not the last doubt. Aries doesn't wait for the perfect moment — it creates one by stepping in.",
    },
    start: [3, 21],
  },
  {
    key: "taurus",
    symbol: "♉",
    name: { sl: "Bik", en: "Taurus" },
    dates: { sl: "20. apr – 20. maj", en: "Apr 20 – May 20" },
    element: { sl: "Zemlja", en: "Earth" },
    text: {
      sl: "Korenine, ki jim ne mudi se. Bik zaupa počasnim stvarem — ljubezni, ki raste, delu, ki traja.",
      en: "Roots that aren't in a hurry. Taurus trusts slow things — love that grows, work that lasts.",
    },
    start: [4, 20],
  },
  {
    key: "gemini",
    symbol: "♊",
    name: { sl: "Dvojčka", en: "Gemini" },
    dates: { sl: "21. maj – 20. jun", en: "May 21 – Jun 20" },
    element: { sl: "Zrak", en: "Air" },
    text: {
      sl: "Dva glasova, ena duša, ki se uči same sebe skozi pogovor. Dvojčka najdeta resnico tako, da jo izgovorijo naglas.",
      en: "Two voices, one soul learning itself through conversation. Gemini finds truth by speaking it out loud.",
    },
    start: [5, 21],
  },
  {
    key: "cancer",
    symbol: "♋",
    name: { sl: "Rak", en: "Cancer" },
    dates: { sl: "21. jun – 22. jul", en: "Jun 21 – Jul 22" },
    element: { sl: "Voda", en: "Water" },
    text: {
      sl: "Oklep zunaj, morje znotraj. Rak varuje tiste, ki jih ljubi, tako kot bi varoval samega sebe.",
      en: "A shell outside, an ocean within. Cancer protects the ones it loves the way it protects itself.",
    },
    start: [6, 21],
  },
  {
    key: "leo",
    symbol: "♌",
    name: { sl: "Lev", en: "Leo" },
    dates: { sl: "23. jul – 22. avg", en: "Jul 23 – Aug 22" },
    element: { sl: "Ogenj", en: "Fire" },
    text: {
      sl: "Svetloba, ki ne prosi za dovoljenje, da sveti. Lev ljubi glasno, ker tiha ljubezen zanj ni cela ljubezen.",
      en: "Light that doesn't ask permission to shine. Leo loves loudly, because a quiet love feels unfinished.",
    },
    start: [7, 23],
  },
  {
    key: "virgo",
    symbol: "♍",
    name: { sl: "Devica", en: "Virgo" },
    dates: { sl: "23. avg – 22. sep", en: "Aug 23 – Sep 22" },
    element: { sl: "Zemlja", en: "Earth" },
    text: {
      sl: "Ljubezen, izražena v podrobnostih. Devica pokaže, koliko ji je mar, s tem, kako natančno nekaj naredi.",
      en: "Love expressed in the details. Virgo shows how much it cares through the precision of what it does.",
    },
    start: [8, 23],
  },
  {
    key: "libra",
    symbol: "♎",
    name: { sl: "Tehtnica", en: "Libra" },
    dates: { sl: "23. sep – 22. okt", en: "Sep 23 – Oct 22" },
    element: { sl: "Zrak", en: "Air" },
    text: {
      sl: "Iskanje ravnovesja ni šibkost — je disciplina. Tehtnica veruje, da je lepota nekaj, kar se da ustvariti med dvema stranema.",
      en: "Seeking balance isn't weakness — it's a discipline. Libra believes beauty can be built between two sides.",
    },
    start: [9, 23],
  },
  {
    key: "scorpio",
    symbol: "♏",
    name: { sl: "Škorpijon", en: "Scorpio" },
    dates: { sl: "23. okt – 21. nov", en: "Oct 23 – Nov 21" },
    element: { sl: "Voda", en: "Water" },
    text: {
      sl: "Globina, ki se ne boji teme. Škorpijon zna umreti sebi, ki ga ne služi več, in se roditi znova.",
      en: "A depth that isn't afraid of the dark. Scorpio knows how to let an old self die, and be born again.",
    },
    start: [10, 23],
  },
  {
    key: "sagittarius",
    symbol: "♐",
    name: { sl: "Strelec", en: "Sagittarius" },
    dates: { sl: "22. nov – 21. dec", en: "Nov 22 – Dec 21" },
    element: { sl: "Ogenj", en: "Fire" },
    text: {
      sl: "Puščica, ki že leti, preden je tarča jasna. Strelec zaupa poti bolj kot zemljevidu.",
      en: "An arrow already flying before the target is clear. Sagittarius trusts the road more than the map.",
    },
    start: [11, 22],
  },
  {
    key: "capricorn",
    symbol: "♑",
    name: { sl: "Kozorog", en: "Capricorn" },
    dates: { sl: "22. dec – 19. jan", en: "Dec 22 – Jan 19" },
    element: { sl: "Zemlja", en: "Earth" },
    text: {
      sl: "Gora se ne vzpne v enem dnevu. Kozorog gradi tiho, korak za korakom, dokler nekega dne ni več nikogar zraven.",
      en: "A mountain isn't climbed in a day. Capricorn builds quietly, step by step, until one day it's the only one still standing.",
    },
    start: [12, 22],
  },
  {
    key: "aquarius",
    symbol: "♒",
    name: { sl: "Vodnar", en: "Aquarius" },
    dates: { sl: "20. jan – 18. feb", en: "Jan 20 – Feb 18" },
    element: { sl: "Zrak", en: "Air" },
    text: {
      sl: "Zvezda, ki sledi svoji lastni orbiti. Vodnar ne beži od sveta — samo vidi ga eno stopnjo prezgodaj.",
      en: "A star that follows its own orbit. Aquarius isn't running from the world — it just sees it one step ahead of time.",
    },
    start: [1, 20],
  },
  {
    key: "pisces",
    symbol: "♓",
    name: { sl: "Ribi", en: "Pisces" },
    dates: { sl: "19. feb – 20. mar", en: "Feb 19 – Mar 20" },
    element: { sl: "Voda", en: "Water" },
    text: {
      sl: "Meje, ki se stopijo tam, kjer se sanje dotaknejo resničnosti. Ribi čutijo, preden razumejo, in imajo prav pogosteje, kot bi si mislili.",
      en: "Borders that dissolve where dreams meet reality. Pisces feel before they understand, and are right more often than you'd think.",
    },
    start: [2, 19],
  },
];

function getCurrentSignKey(): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  // Walk the list in calendar order and find the last sign whose start date has
  // already passed this year (Capricorn wraps across the new year).
  const ordered = [...SIGNS].sort((a, b) => a.start[0] - b.start[0] || a.start[1] - b.start[1]);
  let current = ordered[ordered.length - 1].key;
  for (const sign of ordered) {
    const [m, d] = sign.start;
    if (month > m || (month === m && day >= d)) {
      current = sign.key;
    }
  }
  return current;
}

const LABELS: Record<Lang, { heading: string; intro: string; today: string; element: string }> = {
  sl: {
    heading: "Horoskop",
    intro:
      "Zvezde ne pišejo usode namesto naju — samo ponujajo jezik za tisto, kar že čutiva. Izberi svoje znamenje, ali poglej, katero trenutno vodi nebo.",
    today: "Trenutno znamenje",
    element: "Element",
  },
  en: {
    heading: "Horoscope",
    intro:
      "The stars don't write our fate for us — they just offer a language for what we already feel. Pick your sign, or see which one the sky is currently moving through.",
    today: "Today's sign",
    element: "Element",
  },
};

export default function Horoscope({ lang }: { lang: Lang }) {
  const reduceMotion = useReducedMotion();
  const [todayKey, setTodayKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  // Deliberately deferred to the client's clock: this page can be statically
  // generated, so computing "today" during render would freeze it at build time.
  useEffect(() => {
    const key = getCurrentSignKey();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayKey(key);
    setSelectedKey(key);
  }, []);

  const labels = LABELS[lang];
  const selected = SIGNS.find((s) => s.key === selectedKey) ?? null;

  return (
    <section className="border-t border-bone/10 py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">{labels.heading}</span>
        <p className="mt-6 text-bone/70 leading-relaxed max-w-xl mx-auto">{labels.intro}</p>

        {selected && (
          <div className="mt-14 flex flex-col items-center">
            {selected.key === todayKey && (
              <span className="text-xs tracking-widest uppercase text-smoke mb-6">
                {labels.today}
              </span>
            )}

            <div style={{ perspective: 800 }}>
              <motion.div
                key={selected.key}
                className="relative flex h-32 w-32 items-center justify-center rounded-full"
                style={{
                  transformStyle: "preserve-3d",
                  background:
                    "radial-gradient(circle at 35% 30%, var(--color-accent-warm) 0%, var(--color-raised) 70%)",
                  boxShadow: "0 20px 50px -15px rgba(0,0,0,0.6)",
                }}
                animate={
                  selected.key === todayKey && !reduceMotion ? { rotateY: 360 } : { rotateY: 0 }
                }
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              >
                <span className="font-heading text-6xl text-ink drop-shadow-sm">
                  {selected.symbol}
                </span>
              </motion.div>
            </div>

            <h3 className="mt-8 font-heading text-2xl text-bone">
              {selected.name[lang]}
            </h3>
            <p className="mt-1 text-xs tracking-widest uppercase text-smoke">
              {selected.dates[lang]} · {labels.element}: {selected.element[lang]}
            </p>
            <p className="mt-6 max-w-md text-bone/75 leading-relaxed italic font-heading text-lg">
              {selected.text[lang]}
            </p>
          </div>
        )}

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {SIGNS.map((sign) => (
            <button
              key={sign.key}
              type="button"
              onClick={() => setSelectedKey(sign.key)}
              aria-pressed={selectedKey === sign.key}
              aria-label={sign.name[lang]}
              className={`flex h-11 w-11 items-center justify-center rounded-full border font-heading text-xl transition-colors ${
                selectedKey === sign.key
                  ? "border-bone/60 text-bone bg-raised"
                  : "border-bone/15 text-smoke hover:text-bone hover:border-bone/40"
              }`}
            >
              {sign.symbol}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
