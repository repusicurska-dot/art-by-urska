import type { Lang } from "./tarotData";

type Text = Record<Lang, string>;

/*
 * Why these sections exist — the research this page was rebuilt around (Sept 2026):
 *
 * - Pew, "Spirituality Among Americans" (2023): 70% of adults are spiritual in some way;
 *   people most often describe it as connection — with nature, others, themselves.
 * - Pew, Religious Landscape Study (2025): the most common spiritual experiences are awe at
 *   nature (93% several times a year), gratitude (91%), wonder about the universe (80%),
 *   deep inner peace (74%) and connection with humanity (72%).
 * - Pew (2025): ~3 in 10 adults use astrology, tarot or fortune tellers; most for reflection
 *   and fun rather than prediction. Tarot research frames the cards as "a mirror, not a
 *   crystal ball" — a tool for self-awareness and emotional clarity.
 * - Gallup (2025): ~4 in 10 young adults say their life lacks meaning or purpose; 23% of
 *   people worldwide felt lonely for much of the previous day.
 *
 * So the page leads with "what are you looking for?" (peace, clarity, self-love, connection,
 * meaning) and gives each answer something to *do* here — breathe, draw a card, write down
 * gratitude, set an intention with the moon, or talk to Urška live — plus a painting.
 *
 * AI-drafted copy, like the rest of this page — for Urška to keep, edit, or replace.
 */

export type IntentionKey = "calm" | "clarity" | "selfLove" | "connection" | "meaning";

export interface Intention {
  key: IntentionKey;
  label: Text;
  /** "Choose this when…" — the feeling a visitor recognises themselves in. */
  when: Text;
  message: Text;
  practice: Text;
  /** Anchor id of the tool on this page that answers this intention. */
  anchor: string;
  anchorLabel: Text;
  artwork: { slug: string; title: string; image: string };
}

export const INTENTIONS: Intention[] = [
  {
    key: "calm",
    label: { sl: "Mir", en: "Peace" },
    when: { sl: "Ko misli ne utihnejo", en: "When your mind won't go quiet" },
    message: {
      sl: "Mir ni nekaj, kar moraš najti. Je nekaj, kar se pokaže, ko za trenutek nehaš bežati. Tvoje telo že ve, kako — začne se pri dihu.",
      en: "Peace isn't something you have to find. It's what appears when you stop running for a moment. Your body already knows how — it begins with the breath.",
    },
    practice: {
      sl: "Ena minuta: vdih na štiri, zadrži na dve, izdih na šest. Izdih naj bo daljši od vdiha — to telesu sporoči, da je varno.",
      en: "One minute: breathe in for four, hold for two, out for six. Let the exhale be longer than the inhale — it tells your body it's safe.",
    },
    anchor: "pause",
    anchorLabel: { sl: "Začni minuto tišine", en: "Begin a minute of stillness" },
    artwork: { slug: "artwork-04", title: "Birds of Light", image: "/images/birds-of-light.jpg" },
  },
  {
    key: "clarity",
    label: { sl: "Jasnost", en: "Clarity" },
    when: { sl: "Ko stojiš pred odločitvijo", en: "When you're facing a decision" },
    message: {
      sl: "Odgovor pogosto že nosiš v sebi — le glasov okrog njega je preveč. Karta ne odloči namesto tebe. Pokaže ti tisto, kar ti je v resnici že znano.",
      en: "You often already carry the answer — there are just too many voices around it. A card won't decide for you. It shows you what you already knew.",
    },
    practice: {
      sl: "Preden izvlečeš karto, v eni povedi zapiši svoje vprašanje. Nato preberi karto in se vprašaj: kaj me je v tem besedilu najbolj zbodlo?",
      en: "Before you draw, write your question in one sentence. Then read the card and ask yourself: which line stung the most?",
    },
    anchor: "tarot",
    anchorLabel: { sl: "Izvleci svojo karto", en: "Draw your card" },
    artwork: { slug: "artwork-02", title: "The Prophecy", image: "/images/the-prophecy.jpg" },
  },
  {
    key: "selfLove",
    label: { sl: "Ljubezen do sebe", en: "Self-love" },
    when: { sl: "Ko se preveč obsojaš", en: "When you've been too hard on yourself" },
    message: {
      sl: "Tudi ti si nekaj, kar raste. Nihče ne kriči na cvet, ker še ni odprt. Danes si dovoli isto nežnost, ki jo tako zlahka podariš drugim.",
      en: "You are something that grows, too. No one shouts at a flower for not being open yet. Today, allow yourself the same gentleness you give others so easily.",
    },
    practice: {
      sl: "Zapiši tri majhne svetle stvari današnjega dne — in vsaj ena naj bo tvoje lastno delo.",
      en: "Write down three small lights from today — and let at least one be something you did.",
    },
    anchor: "gratitude",
    anchorLabel: { sl: "Zapiši tri luči", en: "Write your three lights" },
    artwork: { slug: "artwork-03", title: "Eternal Love", image: "/images/eternal-love.jpg" },
  },
  {
    key: "connection",
    label: { sl: "Povezanost", en: "Connection" },
    when: { sl: "Ko te to, kar nosiš, osamlja", en: "When you feel alone with what you carry" },
    message: {
      sl: "Nekatere stvari se razjasnijo šele, ko jih izrečeš na glas nekomu, ki res posluša. Ni ti treba vsega razumeti brez nikogar ob sebi.",
      en: "Some things only become clear once you say them out loud to someone who truly listens. You don't have to figure everything out alone.",
    },
    practice: {
      sl: "Pomisli na eno vprašanje, ki ga nosiš že predolgo. Prinesi ga na živo branje z Urško — ali ga danes zaupaj nekomu blizu.",
      en: "Think of one question you've carried for too long. Bring it to a live reading with Urška — or share it with someone close today.",
    },
    anchor: "live-reading",
    anchorLabel: { sl: "Rezerviraj branje v živo", en: "Book a live reading" },
    artwork: { slug: "artwork-01", title: "Blossoming Love", image: "/images/blossoming-love.jpg" },
  },
  {
    key: "meaning",
    label: { sl: "Smisel", en: "Meaning" },
    when: { sl: "Ko se sprašuješ, čemu vse to", en: "When you wonder what it's all for" },
    message: {
      sl: "Smisel redko pride kot velik odgovor. Pride kot majhna namera, ki jo neguješ dan za dnem — dokler nekega dne ne pogledaš nazaj in vidiš pot.",
      en: "Meaning rarely arrives as one big answer. It comes as a small intention you keep, day after day — until one day you look back and see a path.",
    },
    practice: {
      sl: "Poglej, v kateri fazi je danes luna, in si postavi eno namero za naslednjih nekaj dni. Samo eno.",
      en: "See which phase the moon is in today and set one intention for the next few days. Just one.",
    },
    anchor: "moon",
    anchorLabel: { sl: "Postavi namero z luno", en: "Set an intention with the moon" },
    artwork: {
      slug: "artwork-05",
      title: "Somehow My Heart Still Remembers You",
      image: "/images/somehow-my-heart.jpg",
    },
  },
];

export const COMPASS_LABELS: Record<
  Lang,
  { eyebrow: string; heading: string; intro: string; practiceLabel: string; artworkLabel: string }
> = {
  sl: {
    eyebrow: "Tvoja pot danes",
    heading: "Kaj danes išče tvoja duša?",
    intro: "Izberi, kar ti je ta trenutek najbližje. Ni napačnega odgovora — samo vrata, skozi katera vstopiš.",
    practiceLabel: "Majhna vaja",
    artworkLabel: "Slika, ki nosi to energijo",
  },
  en: {
    eyebrow: "Your path today",
    heading: "What is your soul looking for today?",
    intro: "Choose whatever feels closest right now. There's no wrong answer — only the door you walk through.",
    practiceLabel: "A small practice",
    artworkLabel: "A painting that holds this energy",
  },
};

/* ---------------------------------- Moon ---------------------------------- */

export interface MoonPhase {
  name: Text;
  intention: Text;
  prompt: Text;
}

/** Eight phases, in order from new moon. */
export const MOON_PHASES: MoonPhase[] = [
  {
    name: { sl: "Mlaj", en: "New Moon" },
    intention: { sl: "Čas za seme", en: "A time for seeds" },
    prompt: {
      sl: "Kaj želiš povabiti v svoje življenje v naslednjem mesecu? Zapiši to kot da se že dogaja.",
      en: "What do you want to invite into your life this coming month? Write it as if it's already happening.",
    },
  },
  {
    name: { sl: "Rastoči srp", en: "Waxing Crescent" },
    intention: { sl: "Čas za prvi korak", en: "A time for the first step" },
    prompt: {
      sl: "Kateri je najmanjši korak, ki ga lahko narediš že danes proti tistemu, kar si želiš?",
      en: "What's the smallest step you could take today toward what you want?",
    },
  },
  {
    name: { sl: "Prvi krajec", en: "First Quarter" },
    intention: { sl: "Čas za pogum", en: "A time for courage" },
    prompt: {
      sl: "Kje se ti postavlja upor? Ne umikaj se — vprašaj se, kaj te ta ovira uči.",
      en: "Where are you meeting resistance? Don't back away — ask what this obstacle is teaching you.",
    },
  },
  {
    name: { sl: "Rastoča luna", en: "Waxing Gibbous" },
    intention: { sl: "Čas za potrpežljivost", en: "A time for patience" },
    prompt: {
      sl: "Kaj v tebi že zori, pa še ni pripravljeno? Kako lahko temu zaupaš še malo dlje?",
      en: "What in you is ripening but not quite ready? How can you trust it a little longer?",
    },
  },
  {
    name: { sl: "Ščip", en: "Full Moon" },
    intention: { sl: "Čas za hvaležnost in spuščanje", en: "A time for gratitude and release" },
    prompt: {
      sl: "Za kaj čutiš hvaležnost ta mesec? In kaj je čas spustiti, ker ti ne služi več?",
      en: "What are you grateful for this month? And what are you ready to release because it no longer serves you?",
    },
  },
  {
    name: { sl: "Pojemajoča luna", en: "Waning Gibbous" },
    intention: { sl: "Čas za deljenje", en: "A time for sharing" },
    prompt: {
      sl: "Katero spoznanje zadnjih tednov je vredno podariti še komu drugemu?",
      en: "What have you learned in recent weeks that you could pass on to someone else?",
    },
  },
  {
    name: { sl: "Zadnji krajec", en: "Last Quarter" },
    intention: { sl: "Čas za odpuščanje", en: "A time for forgiveness" },
    prompt: {
      sl: "Komu — morda sebi — lahko danes vsaj malo odpustiš?",
      en: "Who — perhaps yourself — could you forgive, even a little, today?",
    },
  },
  {
    name: { sl: "Pojemajoči srp", en: "Waning Crescent" },
    intention: { sl: "Čas za počitek", en: "A time for rest" },
    prompt: {
      sl: "Kje si lahko ta teden dovoliš manj? Tišina pred novim začetkom je tudi del poti.",
      en: "Where can you allow yourself less this week? The quiet before a new beginning is part of the path too.",
    },
  },
];

export const MOON_LABELS: Record<Lang, { eyebrow: string; illuminated: string; nextFull: string; days: string }> = {
  sl: { eyebrow: "Luna danes", illuminated: "osvetljenost", nextFull: "Do ščipa še", days: "dni" },
  en: { eyebrow: "The moon today", illuminated: "illuminated", nextFull: "Full moon in", days: "days" },
};

const SYNODIC_MONTH = 29.530588853;
// A known new moon: 6 Jan 2000, 18:14 UTC.
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

/** Position in the lunar cycle, 0 = new moon, 0.5 = full moon. */
export function getMoonCycle(date: Date): number {
  const days = (date.getTime() - KNOWN_NEW_MOON) / 86400000;
  const cycle = (days % SYNODIC_MONTH) / SYNODIC_MONTH;
  return cycle < 0 ? cycle + 1 : cycle;
}

/**
 * New, first quarter, full and last quarter are moments, not week-long stretches — they only
 * get their name within about a day of the exact point; everything between is a crescent or
 * gibbous phase (the way almanacs name them).
 */
export function getMoonPhaseIndex(cycle: number): number {
  const day = cycle * SYNODIC_MONTH;
  const quarter = SYNODIC_MONTH / 4;
  for (let i = 0; i <= 4; i++) {
    if (Math.abs(day - i * quarter) <= 1) return (i * 2) % 8;
  }
  return Math.floor(day / quarter) * 2 + 1;
}

export function getIllumination(cycle: number): number {
  return (1 - Math.cos(2 * Math.PI * cycle)) / 2;
}

export function getDaysUntilFull(cycle: number): number {
  const toFull = cycle <= 0.5 ? 0.5 - cycle : 1.5 - cycle;
  return Math.round(toFull * SYNODIC_MONTH);
}

/* ------------------------------ Breathing pause ------------------------------ */

export const BREATH_LABELS: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    intro: string;
    start: string;
    stop: string;
    again: string;
    inhale: string;
    hold: string;
    exhale: string;
    done: string;
    ready: string;
  }
> = {
  sl: {
    eyebrow: "Minuta tišine",
    heading: "Ustavi se za en dih.",
    intro: "Pet mirnih dihov, približno ena minuta. Sledi krogu — ko se širi, vdihni; ko se krči, izdihni.",
    start: "Začni",
    stop: "Ustavi",
    again: "Še enkrat",
    inhale: "Vdih",
    hold: "Zadrži",
    exhale: "Izdih",
    done: "Spet si tu. Opazi, kako se zdaj počutiš.",
    ready: "Kadar začutiš, da je čas",
  },
  en: {
    eyebrow: "A minute of stillness",
    heading: "Pause for a single breath.",
    intro: "Five calm breaths, about one minute. Follow the circle — breathe in as it grows, out as it softens.",
    start: "Begin",
    stop: "Stop",
    again: "Once more",
    inhale: "Breathe in",
    hold: "Hold",
    exhale: "Breathe out",
    done: "Welcome back. Notice how you feel now.",
    ready: "Whenever you're ready",
  },
};

/* ------------------------------- Gratitude ------------------------------- */

export const GRATITUDE_LABELS: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    intro: string;
    placeholders: [string, string, string];
    save: string;
    saved: string;
    streak: (n: number) => string;
    privacy: string;
  }
> = {
  sl: {
    eyebrow: "Tri luči",
    heading: "Kaj je danes prineslo svetlobo?",
    intro:
      "Hvaležnost je najpogostejša duhovna izkušnja med ljudmi — in najlažja za vadbo. Zapiši tri majhne stvari. Ni jih treba razlagati.",
    placeholders: ["Topla kava zjutraj …", "Nekdo, ki se je nasmehnil …", "Nekaj lepega zase …"],
    save: "Prižgi luči",
    saved: "Tvoje tri luči za danes gorijo.",
    streak: (n) => (n === 1 ? "Prvi dan hvaležnosti." : `Dnevi hvaležnosti: ${n}`),
    privacy: "Ostane samo v tvojem brskalniku — nihče drug tega ne vidi.",
  },
  en: {
    eyebrow: "Three lights",
    heading: "What brought light into today?",
    intro:
      "Gratitude is the most common spiritual experience people share — and the easiest to practise. Write down three small things. No need to explain them.",
    placeholders: ["Warm coffee this morning …", "Someone who smiled …", "Something I did for myself …"],
    save: "Light them",
    saved: "Your three lights for today are glowing.",
    streak: (n) => (n === 1 ? "Your first day of gratitude." : `Days of gratitude: ${n}`),
    privacy: "It stays only in your browser — no one else sees it.",
  },
};
