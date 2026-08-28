"use client";

import { useEffect, useState } from "react";

/** A small "VIEW" ring that follows the pointer while hovering an artwork. Desktop-only (hidden on touch via CSS). */
export default function CustomCursor({ active }: { active: boolean }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!active) return;
    function onMove(e: PointerEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="journey-cursor pointer-events-none fixed z-[60] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/70 text-[10px] tracking-[0.25em] text-bone uppercase mix-blend-difference"
      style={{ left: pos.x, top: pos.y }}
    >
      View
    </div>
  );
}
