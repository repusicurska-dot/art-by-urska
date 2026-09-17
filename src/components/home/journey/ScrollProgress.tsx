"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CHAPTERS, ChapterId } from "@/lib/scrollJourney";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Right-edge chapter navigator on desktop; a thin top progress line on mobile. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { t } = useLanguage();
  const barScale = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 });
  const [active, setActive] = useState<ChapterId>(CHAPTERS[0].id);

  useEffect(() => {
    const markers = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (markers.length === 0) return;

    let ticking = false;
    function update() {
      const centerY = window.scrollY + window.innerHeight / 2;
      let current: ChapterId = CHAPTERS[0].id;
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].offsetTop <= centerY) current = CHAPTERS[i].id;
      }
      setActive(current);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function goTo(id: ChapterId) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Mobile: thin reading-progress line. */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-accent-warm md:hidden"
        style={{ scaleX: barScale }}
      />

      {/* Desktop: labelled chapter dots. */}
      <nav
        aria-label="Chapters"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex"
      >
        {CHAPTERS.map((chapter) => {
          const isActive = chapter.id === active;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => goTo(chapter.id)}
              className="group flex items-center gap-3 rounded-full py-1.5 pl-4 pr-3 transition-colors"
              aria-current={isActive ? "true" : undefined}
              aria-label={t.home.chapters[chapter.id]}
            >
              <span
                className={`rounded-full px-3 py-1 text-sm tracking-[0.18em] uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-paper/85 font-semibold text-bone shadow-[0_10px_24px_-16px_rgba(74,58,88,0.8)] backdrop-blur-sm"
                    : "text-bone/70 group-hover:text-bone group-focus-visible:text-bone"
                }`}
              >
                {t.home.chapters[chapter.id]}
              </span>
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive ? "h-3 w-3 bg-accent-warm ring-4 ring-accent-warm/25" : "h-2 w-2 bg-bone/40 group-hover:bg-bone/80"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
