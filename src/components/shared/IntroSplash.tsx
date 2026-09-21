"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ArrivalLogo from "./ArrivalLogo";
import { endIntro } from "@/lib/introSplash";

const HOLD_MS = 1200;

/**
 * The monogram alone on a dark screen for the first moment of every visit, then it
 * dissolves into the page. Lives in the root layout, so it plays once per page load
 * and not again on client-side navigation. While it runs, `PageTransition` skips its
 * own veil (see `lib/introSplash.ts`) so the two never stack.
 */
export default function IntroSplash() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(
      () => {
        setVisible(false);
        endIntro();
      },
      reduceMotion ? 0 : HOLD_MS
    );
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-splash"
          aria-hidden="true"
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center"
          style={{ background: "var(--color-ink)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeInOut" }}
        >
          <ArrivalLogo reduceMotion={!!reduceMotion} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
