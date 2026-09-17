import type { Planet, Sign, AspectName } from "./ephemeris";
import type { Category, DayReading, DayType, Factor } from "./calendar";

/**
 * Every word the Star Business Calendar says, generated from the readings — in Slovenian and
 * English, with emoji. Written to be clear and grounded: a planning ritual, never a promise.
 */

export type Lang = "sl" | "en";
type T = Record<Lang, string>;

export const PRODUCT_NAME: T = { sl: "Zvezdni poslovni koledar", en: "Star Business Calendar" };

export const TYPE_EMOJI: Record<DayType, string> = { contracts: "🤝", beginnings: "🚀", avoid: "⛔", self: "🧘" };
export const CATEGORY_EMOJI: Record<Category, string> = {
  contracts: "🤝",
  beginnings: "🚀",
  avoid: "⛔",
  self: "🧘",
  love: "💞",
  money: "💰",
  health: "🌿",
};

export const TYPE_LABEL: Record<DayType, T> = {
  contracts: { sl: "Dober za pogodbe", en: "Good for contracts" },
  beginnings: { sl: "Dober za začetke", en: "Good for beginnings" },
  avoid: { sl: "Ne začenjaj ničesar", en: "Start nothing new" },
  self: { sl: "Čas zase", en: "Time for yourself" },
};

export const TYPE_ADVICE: Record<DayType, T> = {
  contracts: {
    sl: "Podpisi, pogajanja, pomembni emaili in dogovori.",
    en: "Signatures, negotiations, important emails and agreements.",
  },
  beginnings: {
    sl: "Zagon projekta, prva objava, nova stranka, prvi korak.",
    en: "Launches, first posts, new clients, first steps.",
  },
  avoid: {
    sl: "Dokončuj, urejaj in čakaj — novega ne začenjaj.",
    en: "Finish, tidy up and wait — don't start anything new.",
  },
  self: {
    sl: "Počitek, pregled, odločitve na hladno.",
    en: "Rest, review, decisions made with a cool head.",
  },
};

export const CATEGORY_LABEL: Record<Category, T> = {
  contracts: { sl: "Pogodbe", en: "Contracts" },
  beginnings: { sl: "Začetki", en: "Beginnings" },
  avoid: { sl: "Ne začenjaj", en: "Start nothing" },
  self: { sl: "Čas zase", en: "Time for yourself" },
  love: { sl: "Ljubezen", en: "Love" },
  money: { sl: "Denar", en: "Money" },
  health: { sl: "Zdravje", en: "Health" },
};

export const SIGN_SYMBOL: Record<Sign, string> = {
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓",
};

export const SIGN_NAME: Record<Sign, T> = {
  aries: { sl: "Oven", en: "Aries" },
  taurus: { sl: "Bik", en: "Taurus" },
  gemini: { sl: "Dvojčka", en: "Gemini" },
  cancer: { sl: "Rak", en: "Cancer" },
  leo: { sl: "Lev", en: "Leo" },
  virgo: { sl: "Devica", en: "Virgo" },
  libra: { sl: "Tehtnica", en: "Libra" },
  scorpio: { sl: "Škorpijon", en: "Scorpio" },
  sagittarius: { sl: "Strelec", en: "Sagittarius" },
  capricorn: { sl: "Kozorog", en: "Capricorn" },
  aquarius: { sl: "Vodnar", en: "Aquarius" },
  pisces: { sl: "Ribi", en: "Pisces" },
};

/** Slovenian locative ("v Devici") for "the Moon in …". */
const SIGN_IN_SL: Record<Sign, string> = {
  aries: "v Ovnu",
  taurus: "v Biku",
  gemini: "v Dvojčkih",
  cancer: "v Raku",
  leo: "v Levu",
  virgo: "v Devici",
  libra: "v Tehtnici",
  scorpio: "v Škorpijonu",
  sagittarius: "v Strelcu",
  capricorn: "v Kozorogu",
  aquarius: "v Vodnarju",
  pisces: "v Ribah",
};

const PLANET_NAME: Record<Planet, T> = {
  sun: { sl: "Sonce", en: "the Sun" },
  moon: { sl: "Luna", en: "the Moon" },
  mercury: { sl: "Merkur", en: "Mercury" },
  venus: { sl: "Venera", en: "Venus" },
  mars: { sl: "Mars", en: "Mars" },
  jupiter: { sl: "Jupiter", en: "Jupiter" },
  saturn: { sl: "Saturn", en: "Saturn" },
};
/** Instrumental case, "z Jupitrom". */
const PLANET_WITH_SL: Record<Planet, string> = {
  sun: "s Soncem",
  moon: "z Luno",
  mercury: "z Merkurjem",
  venus: "z Venero",
  mars: "z Marsom",
  jupiter: "z Jupitrom",
  saturn: "s Saturnom",
};
/** Accusative for "your natal …", after the verbs in PERSONAL_VERB_SL. */
const NATAL_SL: Record<Planet, string> = {
  sun: "tvoje rojstno Sonce",
  moon: "tvojo rojstno Luno",
  mercury: "tvoj rojstni Merkur",
  venus: "tvojo rojstno Venero",
  mars: "tvoj rojstni Mars",
  jupiter: "tvoj rojstni Jupiter",
  saturn: "tvoj rojstni Saturn",
};

/** Slovenian verb for a transit aspect, taking the accusative: "Jupiter podpira tvoje rojstno Sonce". */
const PERSONAL_VERB_SL: Record<AspectName, string> = {
  conjunction: "prehaja",
  sextile: "podpira",
  trine: "blagoslavlja",
  square: "izziva",
  opposition: "postavlja na preizkušnjo",
};

export const PLANET_SYMBOL: Record<Planet, string> = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
};

const ASPECT: Record<AspectName, { sl: string; en: string; harmony: number }> = {
  conjunction: { sl: "v stiku", en: "joins", harmony: 0 },
  sextile: { sl: "v prijaznem sekstilu", en: "in a friendly sextile to", harmony: 1 },
  trine: { sl: "v harmoničnem trigonu", en: "in a flowing trine to", harmony: 1 },
  square: { sl: "v napetem kvadratu", en: "in a tense square to", harmony: -1 },
  opposition: { sl: "v opoziciji", en: "opposite", harmony: -1 },
};

export function moonEmoji(phase: number): string {
  const icons = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  return icons[Math.round(phase / 45) % 8];
}

export function moonPhaseName(phase: number, lang: Lang): string {
  const names: T[] = [
    { sl: "mlaj", en: "new moon" },
    { sl: "rastoči srp", en: "waxing crescent" },
    { sl: "prvi krajec", en: "first quarter" },
    { sl: "rastoča luna", en: "waxing gibbous" },
    { sl: "ščip", en: "full moon" },
    { sl: "pojemajoča luna", en: "waning gibbous" },
    { sl: "zadnji krajec", en: "last quarter" },
    { sl: "pojemajoči srp", en: "waning crescent" },
  ];
  return names[Math.round(phase / 45) % 8][lang];
}

/** One sentence explaining a single factor. */
export function factorText(f: Factor, lang: Lang): string {
  const sl = lang === "sl";
  switch (f.kind) {
    case "mercuryRetro":
      return sl
        ? "☿℞ Merkur je retrogradno — pogodbe, tehnika in sporočila radi zaidejo. Dvakrat preveri drobni tisk."
        : "☿℞ Mercury is retrograde — contracts, tech and messages easily go astray. Read the small print twice.";
    case "mercuryDirect":
      return sl ? "☿ Merkur teče naprej, besede in dogovori gredo gladko." : "☿ Mercury moves forward; words and agreements flow.";
    case "venusRetro":
      return sl
        ? "♀℞ Venera je retrogradno — ni čas za velike nakupe ali nove ljubezenske zaveze; dober čas za obujanje starih vezi."
        : "♀℞ Venus is retrograde — not the time for big purchases or new romantic commitments; good for reviving old bonds.";
    case "marsRetro":
      return sl ? "♂℞ Mars je retrogradno — energija se obrača navznoter, ne sili z glavo skozi zid." : "♂℞ Mars is retrograde — energy turns inward; don't force your way through.";
    case "planetStation":
      return sl
        ? `⏸️ ${PLANET_NAME[f.planet].sl} danes obrača smer — dan negotovosti, ko se stvari še premikajo.`
        : `⏸️ ${cap(PLANET_NAME[f.planet].en)} changes direction today — an unsettled day while things shift.`;
    case "moonVoid":
      return sl
        ? "🕳️ Luna je „brez smeri“ (void of course) — kar se začne zdaj, redko pride do cilja."
        : "🕳️ The Moon is void of course — what starts now rarely reaches its goal.";
    case "eclipse":
      if (f.daysAway === 0)
        return sl
          ? `🌘 Danes je ${f.eclipse === "solar" ? "sončev" : "lunin"} mrk — dan za opazovanje, ne za odločitve.`
          : `🌘 A ${f.eclipse === "solar" ? "solar" : "lunar"} eclipse today — a day to observe, not decide.`;
      return sl
        ? `🌘 ${f.daysAway > 0 ? "Bliža se" : "Za nami je"} ${f.eclipse === "solar" ? "sončev" : "lunin"} mrk — energija je nemirna.`
        : `🌘 ${f.daysAway > 0 ? "An" : "A recent"} ${f.eclipse} eclipse ${f.daysAway > 0 ? "is approaching" : "stirs the air"} — energy is restless.`;
    case "newMoon":
      return sl ? "🌑 Mlaj — seme, ki ga posadiš zdaj, ima ves mesec za rast." : "🌑 New moon — a seed planted now has the whole month to grow.";
    case "fullMoon":
      return sl ? "🌕 Ščip — čas za zaključke, hvaležnost in odkrite pogovore." : "🌕 Full moon — a time for completion, gratitude and honest talks.";
    case "waxing":
      return sl ? "🌒 Luna raste — kar začneš, dobiva moč." : "🌒 The Moon is waxing — what you start gathers strength.";
    case "waning":
      return sl ? "🌖 Luna pojema — dobro za dokončevanje in čiščenje." : "🌖 The Moon is waning — good for finishing and clearing out.";
    case "balsamic":
      return sl ? "🌘 Zadnji dnevi pred mlajem — spusti, počivaj, pripravi prostor." : "🌘 The last days before the new moon — release, rest, make room.";
    case "moonSign":
      return sl ? `${SIGN_SYMBOL[f.sign]} Luna ${SIGN_IN_SL[f.sign]} — ${MOON_SIGN_HINT[f.sign].sl}` : `${SIGN_SYMBOL[f.sign]} The Moon in ${SIGN_NAME[f.sign].en} — ${MOON_SIGN_HINT[f.sign].en}`;
    case "transitAspect": {
      const a = ASPECT[f.aspect];
      const icon = a.harmony > 0 ? "✨" : a.harmony < 0 ? "⚡" : "🔗";
      return sl
        ? `${icon} ${PLANET_NAME[f.a].sl} je ${a.sl} ${PLANET_WITH_SL[f.b]} — ${PAIR_HINT(f.a, f.b, a.harmony).sl}`
        : `${icon} ${cap(PLANET_NAME[f.a].en)} ${f.aspect === "conjunction" ? "joins" : `is ${a.en}`} ${PLANET_NAME[f.b].en} — ${PAIR_HINT(f.a, f.b, a.harmony).en}`;
    }
    case "personalAspect": {
      const a = ASPECT[f.aspect];
      const icon = a.harmony > 0 ? "🌟" : a.harmony < 0 ? "🔥" : "💫";
      return sl
        ? `${icon} Osebno: ${PLANET_NAME[f.transit].sl} ${PERSONAL_VERB_SL[f.aspect]} ${NATAL_SL[f.natal]} — ${PERSONAL_HINT(f.transit, a.harmony).sl}`
        : `${icon} Personal: ${PLANET_NAME[f.transit].en} ${f.aspect === "conjunction" ? "joins" : `is ${a.en}`} your natal ${PLANET_NAME[f.natal].en.replace("the ", "")} — ${PERSONAL_HINT(f.transit, a.harmony).en}`;
    }
    case "moonOverNatalSun":
      return sl ? "🌞 Luna prehaja tvoje rojstno Sonce — tvoj mesečni osebni nov začetek." : "🌞 The Moon crosses your natal Sun — your personal monthly fresh start.";
    case "lunarReturn":
      return sl ? "🌙 Luna se vrača na mesto ob tvojem rojstvu — prisluhni čustvom." : "🌙 The Moon returns to its place at your birth — listen to your feelings.";
  }
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const MOON_SIGN_HINT: Record<Sign, T> = {
  aries: { sl: "pogum in hiter zagon.", en: "courage and a quick start." },
  taurus: { sl: "vztrajnost, denar in užitek.", en: "patience, money and pleasure." },
  gemini: { sl: "pogovori, pisanje in mreženje.", en: "conversations, writing and networking." },
  cancer: { sl: "dom, čustva in skrb zase.", en: "home, feelings and self-care." },
  leo: { sl: "samozavest in nastop.", en: "confidence and presence." },
  virgo: { sl: "natančnost, red in podrobnosti.", en: "precision, order and detail." },
  libra: { sl: "partnerstva in pošteni dogovori.", en: "partnerships and fair agreements." },
  scorpio: { sl: "globina, strategija in zaupanje.", en: "depth, strategy and trust." },
  sagittarius: { sl: "vizija, širjenje in optimizem.", en: "vision, expansion and optimism." },
  capricorn: { sl: "struktura, odgovornost in dolgi cilji.", en: "structure, responsibility and long goals." },
  aquarius: { sl: "ideje, skupnost in drugačnost.", en: "ideas, community and doing things differently." },
  pisces: { sl: "intuicija, sanje in umik.", en: "intuition, dreams and retreat." },
};

function PAIR_HINT(a: Planet, b: Planet, harmony: number): T {
  const key = `${a}-${b}`;
  const good: Record<string, T> = {
    "mercury-jupiter": { sl: "velikodušni dogovori in dobre novice.", en: "generous deals and good news." },
    "mercury-saturn": { sl: "trdni, premišljeni dogovori.", en: "solid, well-considered agreements." },
    "mercury-mars": { sl: "jasne besede in hitre odločitve.", en: "clear words and quick decisions." },
    "sun-jupiter": { sl: "sreča je na strani drznih.", en: "luck favours the bold." },
    "venus-jupiter": { sl: "obilje v ljubezni in financah.", en: "abundance in love and money." },
    "venus-saturn": { sl: "zvestoba in dolgoročne vrednosti.", en: "loyalty and lasting value." },
    "venus-mars": { sl: "privlačnost in strast.", en: "attraction and passion." },
    "mars-saturn": { sl: "disciplina, ki premika gore.", en: "discipline that moves mountains." },
    "mars-jupiter": { sl: "energija za velike korake.", en: "energy for big moves." },
    "moon-jupiter": { sl: "optimizem in podpora.", en: "optimism and support." },
    "moon-saturn": { sl: "zanesljivost in resnost.", en: "reliability and focus." },
    "moon-venus": { sl: "nežnost in lepota.", en: "tenderness and beauty." },
    "moon-mars": { sl: "zagon in odločnost.", en: "drive and determination." },
  };
  const tense: Record<string, T> = {
    "mercury-jupiter": { sl: "obljube so lahko prevelike.", en: "promises may be too big." },
    "mercury-saturn": { sl: "ovire, zamude in dvomi.", en: "obstacles, delays and doubts." },
    "mercury-mars": { sl: "ostre besede — premisli, preden pošlješ.", en: "sharp words — think before you hit send." },
    "sun-jupiter": { sl: "pazi na pretiravanje.", en: "watch out for overdoing it." },
    "venus-jupiter": { sl: "pazi na impulzivne nakupe.", en: "beware of impulse buys." },
    "venus-saturn": { sl: "hladnost in občutek pomanjkanja.", en: "coolness and a sense of lack." },
    "venus-mars": { sl: "trenja v odnosih.", en: "friction in relationships." },
    "mars-saturn": { sl: "frustracija — ne sili stvari.", en: "frustration — don't force things." },
    "mars-jupiter": { sl: "preveč naenkrat.", en: "too much at once." },
    "moon-jupiter": { sl: "preveč optimizma.", en: "a little too much optimism." },
    "moon-saturn": { sl: "težja čustva, potreba po umiku.", en: "heavier feelings, a need to withdraw." },
    "moon-venus": { sl: "občutljivost.", en: "sensitivity." },
    "moon-mars": { sl: "razdražljivost.", en: "irritability." },
  };
  return (harmony < 0 ? tense[key] : good[key]) ?? { sl: "poudarjena energija dneva.", en: "a highlighted energy today." };
}

function PERSONAL_HINT(transit: Planet, harmony: number): T {
  const good: Partial<Record<Planet, T>> = {
    mercury: { sl: "tvoje besede danes prepričajo.", en: "your words convince today." },
    jupiter: { sl: "obdobje priložnosti in rasti zate.", en: "a season of opportunity and growth for you." },
    saturn: { sl: "trud, ki ga vložiš, ostane.", en: "the effort you put in lasts." },
    mars: { sl: "imaš energijo za pogumen korak.", en: "you have the energy for a bold move." },
    venus: { sl: "privlačiš ljudi in priložnosti.", en: "you attract people and opportunities." },
    sun: { sl: "sijaš — pokaži se.", en: "you shine — show up." },
    moon: { sl: "čustveno si v ravnovesju.", en: "you feel emotionally balanced." },
  };
  const hard: Partial<Record<Planet, T>> = {
    mercury: { sl: "nesporazumi so bolj verjetni — piši jasno.", en: "misunderstandings are likelier — write clearly." },
    jupiter: { sl: "ne obljubljaj preveč.", en: "don't overpromise." },
    saturn: { sl: "obdobje preizkušenj — upočasni in utrdi temelje.", en: "a testing season — slow down and strengthen foundations." },
    mars: { sl: "pazi na prepire in preutrujenost.", en: "watch for conflict and burnout." },
    venus: { sl: "ne kupuj in ne obljubljaj iz občutka.", en: "don't buy or promise on a feeling." },
    sun: { sl: "vzemi si več počitka.", en: "take more rest." },
    moon: { sl: "čustva so bližje površju.", en: "feelings are close to the surface." },
  };
  return (harmony < 0 ? hard[transit] : good[transit]) ?? { sl: "poudarjen dan zate.", en: "a highlighted day for you." };
}

export function starsText(n: number): string {
  return "★".repeat(n) + "☆".repeat(3 - n);
}

/** Short headline for a day, e.g. "🤝 Dober za pogodbe · 🌒 ♍". */
export function dayHeadline(day: DayReading, lang: Lang): string {
  return `${TYPE_EMOJI[day.type]} ${TYPE_LABEL[day.type][lang]} · ${moonEmoji(day.moonPhase)} ${SIGN_SYMBOL[day.moonSign]}`;
}

export function formatDate(date: string, lang: Lang, opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" }): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString(lang === "sl" ? "sl-SI" : "en-GB", { timeZone: "UTC", ...opts });
}

const MONTH_INTRO: Record<DayType, T> = {
  contracts: {
    sl: "Ta mesec je naklonjen dogovorom: jasna beseda in podpisi prinašajo več kot običajno.",
    en: "This month favours agreements: a clear word and a signature carry more weight than usual.",
  },
  beginnings: {
    sl: "Ta mesec odpira vrata novemu: ideje, ki čakajo v predalu, imajo veter v hrbet.",
    en: "This month opens doors to the new: ideas waiting in a drawer have the wind at their back.",
  },
  avoid: {
    sl: "Ta mesec prosi za potrpežljivost: več dni je primernih za dokončevanje kot za začenjanje.",
    en: "This month asks for patience: more days suit finishing than starting.",
  },
  self: {
    sl: "Ta mesec je mesec notranjega dela: počitek in premislek sta tvoja najboljša strategija.",
    en: "This month is for inner work: rest and reflection are your best strategy.",
  },
};

/** The month overview / personal monthly horoscope, as plain paragraphs. */
export function monthSummary(days: DayReading[], lang: Lang, sunSign?: Sign): { title: string; paragraphs: string[] } {
  const sl = lang === "sl";
  const count: Record<DayType, number> = { contracts: 0, beginnings: 0, avoid: 0, self: 0 };
  for (const d of days) count[d.type]++;
  const dominant = (Object.keys(count) as DayType[]).sort((a, b) => count[b] - count[a])[0];

  const best = (cat: Category, n = 3) =>
    [...days]
      .sort((a, b) => b.scores[cat] - a.scores[cat])
      .filter((d) => d.scores[cat] > 0 && d.type !== "avoid")
      .slice(0, n)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((d) => formatDate(d.date, lang, { day: "numeric", month: "numeric" }));

  const avoidDays = days.filter((d) => d.type === "avoid").map((d) => formatDate(d.date, lang, { day: "numeric", month: "numeric" }));
  const retro = new Set(days.flatMap((d) => d.retrograde));
  const eclipses = days.filter((d) => d.eclipse);
  const personal = days.flatMap((d) => d.factors.filter((f) => f.factor.kind === "personalAspect").map((f) => f.factor));
  const personalCounts = new Map<string, { f: Factor; n: number }>();
  for (const f of personal) {
    const key = JSON.stringify(f);
    personalCounts.set(key, { f, n: (personalCounts.get(key)?.n ?? 0) + 1 });
  }
  const longTransits = [...personalCounts.values()].filter((x) => x.n >= 5).map((x) => x.f).slice(0, 2);

  const monthName = formatDate(days[0].date, lang, { month: "long", year: "numeric" });
  const paragraphs: string[] = [];

  paragraphs.push(
    (sunSign
      ? sl
        ? `${SIGN_SYMBOL[sunSign]} Za znamenje ${SIGN_NAME[sunSign].sl}: `
        : `${SIGN_SYMBOL[sunSign]} For ${SIGN_NAME[sunSign].en}: `
      : "") + MONTH_INTRO[dominant][lang]
  );

  if (longTransits.length) {
    paragraphs.push(longTransits.map((f) => factorText(f, lang)).join(" "));
  }

  const notes: string[] = [];
  if (retro.has("mercury")) notes.push(sl ? "☿℞ Del meseca je Merkur retrogradno — pogodbe beri dvakrat, tehniko varnostno kopiraj." : "☿℞ Mercury is retrograde for part of the month — read contracts twice and back up your tech.");
  if (retro.has("venus")) notes.push(sl ? "♀℞ Venera je retrogradno — premisli vsak večji nakup in novo zavezo." : "♀℞ Venus is retrograde — think twice about big purchases and new commitments.");
  if (retro.has("mars")) notes.push(sl ? "♂℞ Mars je retrogradno — energijo usmeri v dokončevanje." : "♂℞ Mars is retrograde — channel energy into finishing.");
  for (const e of eclipses) notes.push(factorText({ kind: "eclipse", eclipse: e.eclipse!, daysAway: 0 }, lang).replace(sl ? "Danes je" : "A", sl ? `${formatDate(e.date, lang, { day: "numeric", month: "numeric" })} je` : `${formatDate(e.date, lang, { day: "numeric", month: "numeric" })}: a`));
  if (notes.length) paragraphs.push(notes.join(" "));

  const line = (emoji: string, label: string, list: string[]) => (list.length ? `${emoji} ${label}: ${list.join(", ")}` : null);
  paragraphs.push(
    [
      line("🤝", sl ? "Najboljši dnevi za pogodbe" : "Best days for contracts", best("contracts")),
      line("🚀", sl ? "Najboljši dnevi za začetke" : "Best days for beginnings", best("beginnings")),
      line("💰", sl ? "Za denar" : "For money", best("money")),
      line("💞", sl ? "Za ljubezen" : "For love", best("love")),
      line("🌿", sl ? "Za zdravje" : "For health", best("health")),
      line("⛔", sl ? "Ne začenjaj ničesar" : "Start nothing", avoidDays),
    ]
      .filter(Boolean)
      .join("\n")
  );

  paragraphs.push(
    sl
      ? "✨ Koledar je navdih za načrtovanje, ne finančni nasvet — zadnja beseda je vedno tvoja."
      : "✨ The calendar is inspiration for planning, not financial advice — the last word is always yours."
  );

  return {
    title: sunSign
      ? sl
        ? `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} — tvoj osebni horoskop`
        : `${monthName} — your personal horoscope`
      : sl
        ? `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} — pregled meseca`
        : `${monthName} — month overview`,
    paragraphs,
  };
}
