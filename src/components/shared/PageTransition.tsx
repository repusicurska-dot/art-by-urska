"use client";

import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { getArtworkBySlug, getQuoteBySlug } from "@/lib/content";
import { consumeNavigationDirection } from "@/lib/navigationDirection";
import VeilTransition from "./transitions/VeilTransition";
import PageTurnTransition from "./transitions/PageTurnTransition";
import FadeTransition from "./transitions/FadeTransition";

const HOME_EPIGRAPH = "Before every painting, there is silence.";

const ROUTE_EPIGRAPHS: Record<string, string> = {
  about: "Behind every painting is a hand that learned to feel.",
  contact: "Some stories continue once you speak.",
  collection: "Every original, gathered in one room.",
  cart: "What you choose to carry with you.",
  checkout: "The last quiet step before it's yours.",
  poetry: "Some things are easier to write than to paint.",
  spirituality: "Before the brush, there is the soul.",
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const direction = consumeNavigationDirection();

  if (reduceMotion) {
    return <>{children}</>;
  }

  const segments = pathname.split("/").filter(Boolean);
  let overlay: ReactNode;

  if (segments.length === 0) {
    overlay = <VeilTransition epigraph={HOME_EPIGRAPH} direction={direction} />;
  } else if (segments[0] === "artworks" && segments[1]) {
    const artwork = getArtworkBySlug(segments[1]);
    overlay = (
      <PageTurnTransition
        accent={artwork?.accentColor ?? "#121212"}
        epigraph={artwork?.quote}
        direction={direction}
      />
    );
  } else if (segments[0] === "poetry" && segments[1]) {
    const quote = getQuoteBySlug(segments[1]);
    overlay = (
      <PageTurnTransition
        accent={quote?.accentColor ?? "#121212"}
        epigraph={quote?.title}
        direction={direction}
      />
    );
  } else if (ROUTE_EPIGRAPHS[segments[0]]) {
    overlay = (
      <VeilTransition epigraph={ROUTE_EPIGRAPHS[segments[0]]} direction={direction} />
    );
  } else {
    overlay = <FadeTransition />;
  }

  return (
    <>
      {overlay}
      {children}
    </>
  );
}
