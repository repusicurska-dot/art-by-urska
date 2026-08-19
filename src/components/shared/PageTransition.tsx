"use client";

import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { getCategory, getPaintingBySlug } from "@/lib/content";
import { consumeNavigationDirection } from "@/lib/navigationDirection";
import VeilTransition from "./transitions/VeilTransition";
import IrisTransition from "./transitions/IrisTransition";
import CurtainTransition from "./transitions/CurtainTransition";
import FadeTransition from "./transitions/FadeTransition";

const HOME_EPIGRAPH = "Pred vsako sliko je tišina.";

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
  } else if (segments[0] === "categories" && segments[1]) {
    const category = getCategory(segments[1]);
    overlay = (
      <IrisTransition
        accent={category?.accentColor ?? "#1B1B24"}
        epigraph={category?.epigraph}
        direction={direction}
      />
    );
  } else if (segments[0] === "paintings" && segments[1]) {
    const painting = getPaintingBySlug(segments[1]);
    const category = painting ? getCategory(painting.categorySlug) : undefined;
    overlay = (
      <CurtainTransition
        accent={category?.accentColor ?? "#1B1B24"}
        epigraph={painting?.epigraph}
        direction={direction}
      />
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
