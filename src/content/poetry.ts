/**
 * Poetry by Urška.
 *
 * `URSKA_QUOTES` are her own words, verbatim from her notes — do not edit or add without her.
 *
 * `LETTERS` are the weekly "Letter from the studio" that paying subscribers receive. The first
 * ones below are AI-drafted in her voice, exactly like the rest of the site's draft copy, and
 * are marked so she can rewrite or replace them before they go out. Each letter pairs a short
 * piece of writing with one of her paintings, so the words always have a picture beside them.
 *
 * Adding a letter is one entry in this array — no other change anywhere.
 */

export interface PoetryLetter {
  /** Stable id, also the anchor in the archive. */
  id: string;
  /** ISO week this letter belongs to, e.g. "2026-W38". The weekly email sends the matching one. */
  week: string;
  title: { sl: string; en: string };
  body: { sl: string; en: string };
  /** Optional painting to stand beside the words. */
  artworkSlug?: string;
  /**
   * False until Urška has read it. Drafts are still shown and sent — the same convention as the
   * rest of the site's drafted copy — so this is the list of what she still has to approve or
   * rewrite. See STANJE.md.
   */
  approvedByUrska: boolean;
}

export const URSKA_QUOTES: string[] = [
  "Poetry is the bridge between what my soul remembers and what my heart longs to say.",
];

export const LETTERS: PoetryLetter[] = [
  {
    id: "letter-01",
    week: "2026-W38",
    title: { sl: "Kar ostane, ko barva pojenja", en: "What stays when the colour fades" },
    body: {
      sl: "Vsaka slika se konča dvakrat. Prvič takrat, ko odložim čopič, in drugič takrat, ko nekdo drug pred njo utihne.\n\nTa teden sem pomislila, da je pesem ista stvar, le brez barve. Tudi ona čaka, da nekdo utihne.\n\nČe ti je ta teden težko, poskusi tole: nič ne popravljaj. Samo poimenuj. Pogosto je dovolj že to, da stvari damo pravo ime.",
      en: "Every painting ends twice. Once when I put the brush down, and once when someone else falls quiet in front of it.\n\nThis week I thought a poem is the same thing without colour. It, too, waits for someone to fall quiet.\n\nIf this week is heavy, try this: don't fix anything. Just name it. Giving a thing its right name is often enough.",
    },
    artworkSlug: "artwork-05",
    approvedByUrska: false,
  },
  {
    id: "letter-02",
    week: "2026-W39",
    title: { sl: "Prazno platno ob polnoči", en: "An empty canvas at midnight" },
    body: {
      sl: "Najlepše stvari se mi zgodijo, ko nehama tekmovati — jaz in platno.\n\nDolgo sem mislila, da moram vedeti, kaj bo nastalo. Zdaj vem, da je prazno platno vprašanje, ne naloga.\n\nTvoje vprašanje za ta teden: kje v svojem življenju še vedno poskušaš vedeti vnaprej?",
      en: "The best things happen when the canvas and I stop competing.\n\nFor a long time I thought I had to know what would appear. Now I know an empty canvas is a question, not an assignment.\n\nYour question for the week: where in your life are you still trying to know in advance?",
    },
    artworkSlug: "artwork-02",
    approvedByUrska: false,
  },
  {
    id: "letter-03",
    week: "2026-W40",
    title: { sl: "Roka se spomni prej kot glava", en: "The hand remembers before the head" },
    body: {
      sl: "Na steni sem se naučila, da telo ve prej, kot um razume. Roka najde oprijem, preden ga oko potrdi.\n\nS čopičem je enako. In z ljudmi tudi — telo ve, ob kom lahko diha.\n\nTa teden zaupaj enemu občutku, ki ga ne znaš razložiti. Samo enemu.",
      en: "On the wall I learned that the body knows before the mind understands. The hand finds the hold before the eye confirms it.\n\nWith a brush it's the same. With people, too — the body knows who it can breathe around.\n\nThis week, trust one feeling you can't explain. Just one.",
    },
    artworkSlug: "artwork-04",
    approvedByUrska: false,
  },
];

/** The letter for a given ISO week, or the most recent one before it. */
export function letterForWeek(week: string): PoetryLetter | null {
  const exact = LETTERS.find((l) => l.week === week);
  if (exact) return exact;
  const past = LETTERS.filter((l) => l.week < week).sort((a, b) => b.week.localeCompare(a.week));
  return past[0] ?? LETTERS[0] ?? null;
}

/** The Thursday of an ISO week ("2026-W38" → "2026-09-17"), the day its letter goes out. */
export function weekThursday(week: string): string {
  const [yearRaw, weekRaw] = week.split("-W");
  const year = Number(yearRaw);
  const number = Number(weekRaw);
  if (!Number.isFinite(year) || !Number.isFinite(number)) return "";
  const jan4 = Date.UTC(year, 0, 4);
  const weekday = new Date(jan4).getUTCDay() || 7;
  const firstMonday = jan4 - (weekday - 1) * 86400000;
  return new Date(firstMonday + ((number - 1) * 7 + 3) * 86400000).toISOString().slice(0, 10);
}
