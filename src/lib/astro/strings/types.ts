import type { Planet, Sign, AspectName } from "../ephemeris";
import type { Category, DayType } from "../calendar";

/**
 * Everything the Star Business Calendar says, per language.
 *
 * The readings are assembled sentence by sentence from these pieces, and every language builds
 * its sentences with its own grammar — Slovenian needs "Luna v Devici" and "z Jupitrom", German
 * needs "der Mond in der Jungfrau", English just puts the words next to each other. So instead
 * of one template with interchangeable words, each language supplies the phrase it needs in the
 * position it needs it, and the engine in ../texts.ts only joins them.
 */
export interface AstroStrings {
  /** The Intl locale used for dates. */
  locale: string;
  productName: string;
  typeLabel: Record<DayType, string>;
  typeAdvice: Record<DayType, string>;
  categoryLabel: Record<Category, string>;
  signName: Record<Sign, string>;
  /** The phrase after "The Moon": "in Virgo", "v Devici", "in der Jungfrau". */
  moonInSign: Record<Sign, string>;
  /** The planet as the subject of a sentence: "the Moon", "Luna", "der Mond". */
  planetName: Record<Planet, string>;
  /** The planet as the object of an aspect phrase: "Jupiter", "z Jupitrom", "zu Jupiter". */
  planetObject: Record<Planet, string>;
  /** "your natal Sun", in whatever case `personalVerb` governs. */
  natalPlanet: Record<Planet, string>;
  /** Verb for a personal transit, between the planet and the natal planet. */
  personalVerb: Record<AspectName, string>;
  /** Phrase between two transiting planets, before `planetObject`. */
  aspectPhrase: Record<AspectName, string>;
  /** Eight phases, starting at the new moon. */
  moonPhaseName: string[];
  moonSignHint: Record<Sign, string>;
  /** Keyed "<planet>-<planet>", e.g. "mercury-jupiter". */
  pairHintGood: Record<string, string>;
  pairHintTense: Record<string, string>;
  pairHintFallback: string;
  personalHintGood: Partial<Record<Planet, string>>;
  personalHintHard: Partial<Record<Planet, string>>;
  personalHintFallback: string;
  factor: {
    mercuryRetro: string;
    mercuryDirect: string;
    venusRetro: string;
    marsRetro: string;
    planetStation: (planet: string) => string;
    moonVoid: string;
    /** `kind` is already `eclipseSolar` or `eclipseLunar`. */
    eclipseToday: (kind: string) => string;
    eclipseApproaching: (kind: string) => string;
    eclipsePassed: (kind: string) => string;
    eclipseSolar: string;
    eclipseLunar: string;
    newMoon: string;
    fullMoon: string;
    waxing: string;
    waning: string;
    balsamic: string;
    moonOverNatalSun: string;
    lunarReturn: string;
  };
  month: {
    intro: Record<DayType, string>;
    /** Prefix naming the reader's sun sign, before the month's opening line. */
    forSign: (sign: string) => string;
    mercuryRetro: string;
    venusRetro: string;
    marsRetro: string;
    eclipseOn: (date: string, kind: string) => string;
    bestContracts: string;
    bestBeginnings: string;
    forMoney: string;
    forLove: string;
    forHealth: string;
    startNothing: string;
    disclaimer: string;
    titlePersonal: (month: string) => string;
    titleOverview: (month: string) => string;
  };
}
