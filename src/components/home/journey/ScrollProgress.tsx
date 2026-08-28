"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CHAPTERS, ChapterId } from "@/lib/scrollJourney";

/** Right-edge chapter navigator on desktop; a thin top progress line on mobile. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
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
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-bone/70 md:hidden"
        style={{ scaleX: barScale }}
      />

      {/* Desktop: labelled chapter dots. */}
      <nav
        aria-label="Chapters"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 md:flex"
      >
        {CHAPTERS.map((chapter) => {
          const isActive = chapter.id === active;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => goTo(chapter.id)}
              className="group flex items-center gap-3"
              aria-current={isActive ? "true" : undefined}
              aria-label={chapter.label}
            >
              <span
                className={`text-[11px] tracking-widest uppercase transition-all duration-300 ${
                  isActive ? "text-bone opacity-100" : "text-bone/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                }`}
              >
                {chapter.label}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  isActive ? "scale-125 bg-bone" : "bg-bone/35 group-hover:bg-bone/70"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
