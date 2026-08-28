"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "./zodiacData";
import { SCRATCH_REWARDS } from "./scratchRewards";

const LABELS: Record<Lang, { heading: string; hint: string; revealedLabel: string; comeback: string }> = {
  sl: {
    heading: "Tedenska praskanica",
    hint: "Podrgni, da odkriješ",
    revealedLabel: "Tvoje sporočilo tega tedna",
    comeback: "Nova praskanica čez",
  },
  en: {
    heading: "Weekly scratch card",
    hint: "Scratch to reveal",
    revealedLabel: "Your message for this week",
    comeback: "New card in",
  },
};

function getISOWeekKey(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${week}`;
}

function daysUntilNextMonday(): number {
  const day = new Date().getDay();
  const diff = (8 - day) % 7;
  return diff === 0 ? 7 : diff;
}

const STORAGE_KEY = "au-scratch-card-v1";

export default function ScratchCard({ lang }: { lang: Lang }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [weekKey, setWeekKey] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [reward, setReward] = useState<string | null>(null);

  // Deferred to the client so the reward (and whether it's already been revealed this
  // week) is based on the visitor's own clock, not a build-time snapshot.
  useEffect(() => {
    const key = getISOWeekKey(new Date());
    const weekNumber = parseInt(key.split("-W")[1], 10) || 0;
    const rewardText = SCRATCH_REWARDS[lang][weekNumber % SCRATCH_REWARDS[lang].length];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWeekKey(key);
    setReward(rewardText);

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { week?: string; revealed?: boolean };
        if (parsed.week === key && parsed.revealed) {
          setRevealed(true);
        }
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — just always allow scratching.
    }
  }, [lang]);

  useEffect(() => {
    if (revealed || !weekKey) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#c5aa82");
    gradient.addColorStop(1, "#8b5a52");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.font = "600 13px sans-serif";
    ctx.fillStyle = "rgba(3,3,3,0.35)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.save();
    ctx.translate(width / 2, height / 2);
    for (let i = -1; i <= 1; i++) {
      ctx.fillText("✧ ✧ ✧", 0, i * 24);
    }
    ctx.restore();

    ctx.globalCompositeOperation = "destination-out";

    function scratchAt(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      ctx!.beginPath();
      ctx!.arc(x, y, 22, 0, Math.PI * 2);
      ctx!.fill();
    }

    function checkRevealPercent() {
      const { width: w, height: h } = canvas!.getBoundingClientRect();
      const sampleW = 60;
      const sampleH = Math.round((h / w) * sampleW);
      const data = ctx!.getImageData(0, 0, canvas!.width, canvas!.height);
      // Sample a coarse grid instead of every pixel, cheap enough to run per stroke.
      let cleared = 0;
      let total = 0;
      const stepX = Math.max(1, Math.floor(canvas!.width / sampleW));
      const stepY = Math.max(1, Math.floor(canvas!.height / sampleH));
      for (let y = 0; y < canvas!.height; y += stepY) {
        for (let x = 0; x < canvas!.width; x += stepX) {
          const idx = (y * canvas!.width + x) * 4 + 3;
          if (data.data[idx] < 40) cleared++;
          total++;
        }
      }
      return total > 0 ? cleared / total : 0;
    }

    function finishReveal() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      setRevealed(true);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ week: weekKey, revealed: true }));
      } catch {
        // Ignore — reward already shown this session either way.
      }
    }

    function handlePointerDown(e: PointerEvent) {
      drawingRef.current = true;
      canvas!.setPointerCapture(e.pointerId);
      scratchAt(e.clientX, e.clientY);
    }
    function handlePointerMove(e: PointerEvent) {
      if (!drawingRef.current) return;
      scratchAt(e.clientX, e.clientY);
    }
    function handlePointerUp() {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      if (checkRevealPercent() > 0.45) finishReveal();
    }

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [revealed, weekKey]);

  const labels = LABELS[lang];

  return (
    <div className="mt-16 flex flex-col items-center">
      <span className="text-xs tracking-widest uppercase text-smoke">{labels.heading}</span>

      <div className="relative mt-5 h-40 w-72 max-w-full overflow-hidden rounded-lg border border-bone/10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <p className="font-heading italic text-base text-bone">{reward}</p>
        </div>
        {!revealed && weekKey && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full cursor-pointer touch-none select-none"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>

      <span className="mt-4 text-xs tracking-widest uppercase text-smoke">
        {revealed ? labels.revealedLabel : labels.hint}
      </span>
      {revealed && (
        <span className="mt-1 text-xs text-smoke/70">
          {labels.comeback} {daysUntilNextMonday()} {lang === "sl" ? "dneh" : "days"}
        </span>
      )}
    </div>
  );
}
