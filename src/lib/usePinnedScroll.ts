"use client";

import { useRef } from "react";
import { useScroll, useSpring, MotionValue } from "framer-motion";

/**
 * Scroll progress (0→1) across a tall wrapper section, meant to be paired with an
 * inner `position: sticky` panel. Lightly spring-smoothed so fast scrolling/trackpad
 * flicks don't look stepped, without introducing perceptible lag.
 */
export function usePinnedScroll(): { ref: React.RefObject<HTMLDivElement | null>; progress: MotionValue<number> } {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 38, mass: 0.2 });
  return { ref, progress };
}
