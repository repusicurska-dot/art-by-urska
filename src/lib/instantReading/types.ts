/**
 * One card's reading, per life area. Used by the instant readings (see compose.ts): the
 * position in the spread ("what stands in your way", "the other person") comes from the
 * spread, the words from here. Short on purpose — two sentences — so a three-card spread
 * reads in a minute.
 *
 * AI-drafted, evergreen archetype meanings (like the card profiles in tarotData.ts), not
 * Urška's own words and not tied to any real person. She never has to write these.
 */
export interface CardTopicText {
  love: string;
  work: string;
  /** Life in general / the road ahead — used by the general, future and single-question spreads. */
  path: string;
}

export type Answer = "yes" | "no" | "maybe";
