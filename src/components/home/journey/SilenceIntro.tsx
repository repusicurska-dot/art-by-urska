"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePinnedScroll } from "@/lib/usePinnedScroll";

/** Opening chapter: plain dark space (the site's own star field shows through), a whispered line. */
export default function SilenceIntro() {
  const reduceMotion = useReducedMotion();
  const { ref, progress } = usePinnedScroll();

  // Fully visible at rest (progress 0) — only fades out once the user actually starts scrolling.
  const textScrollOpacity = useTransform(progress, [0, 0.1, 0.85], [1, 1, 0]);
  const textSpacing = useTransform(progress, [0, 0.85], [0, 10]);
  const textSpacingPx = useTransform(textSpacing, (v) => `${v}px`);
  const textY = useTransform(progress, [0, 0.85], [0, -18]);
  const hintOpacity = useTransform(progress, [0, 0.12, 0.5], [1, 1, 0]);

  if (reduceMotion) {
    return (
      <section className="relative flex min-h-[80vh] items-center justify-center bg-ink px-6 py-24 text-center">
        <p className="font-heading italic text-2xl text-bone/90">
          Before every painting,
          <br />
          there is silence.
        </p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[118vh] md:h-[128vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          {/* Mount-triggered fade-in, independent of scroll, so the line is never invisible at rest. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
          >
            <motion.p
              style={{ opacity: textScrollOpacity, y: textY, letterSpacing: textSpacingPx }}
              className="font-heading italic text-3xl md:text-5xl text-bone"
            >
              Before every painting,
              <br />
              there is silence.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-bone/75"
        >
          <span className="text-xs tracking-[0.3em] uppercase">Scroll to enter</span>
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} strokeWidth={1.25} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
