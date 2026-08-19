"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Category } from "@/content/types";
import { floatTransition } from "@/lib/motion";

const HOLD_DURATION_MS = 4000;
const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function FloatingCategoryItem({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const [holding, setHolding] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const href = `/categories/${category.slug}`;

  function startHold() {
    setHolding(true);
    timeoutRef.current = setTimeout(() => {
      router.push(href);
    }, HOLD_DURATION_MS);
  }

  function cancelHold() {
    setHolding(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        reduceMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -14, 0], x: [0, 6, 0] }
      }
      transition={
        reduceMotion
          ? { duration: 0.7, delay: 1.2 + index * 0.12, ease: "easeOut" }
          : {
              opacity: { duration: 0.7, delay: 1.2 + index * 0.12, ease: "easeOut" },
              scale: { duration: 0.7, delay: 1.2 + index * 0.12, ease: "easeOut" },
              x: floatTransition(index),
              y: floatTransition(index),
            }
      }
    >
      <motion.div
        onMouseEnter={startHold}
        onMouseLeave={cancelHold}
        onFocus={startHold}
        onBlur={cancelHold}
        animate={{ scale: holding ? 1.08 : 1 }}
        transition={{
          duration: holding ? HOLD_DURATION_MS / 1000 : 0.4,
          ease: holding ? "easeOut" : "easeIn",
        }}
        className="relative"
      >
        <Link
          href={href}
          className="group relative flex flex-col items-center justify-center rounded-full aspect-square w-28 md:w-36 border border-ivory/30 bg-ivory/5 backdrop-blur-sm px-4 text-center transition-colors hover:bg-ivory/15 hover:border-gold-400/70"
        >
          {!reduceMotion && (
            <svg
              className="absolute -inset-1 -rotate-90 pointer-events-none"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r={RING_RADIUS}
                fill="none"
                stroke={category.accentColor}
                strokeOpacity={0.6}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={holding ? 0 : RING_CIRCUMFERENCE}
                style={{
                  transition: holding
                    ? `stroke-dashoffset ${HOLD_DURATION_MS}ms linear`
                    : "stroke-dashoffset 0.3s ease-out",
                }}
              />
            </svg>
          )}
          <span
            className="h-2 w-2 rounded-full mb-2"
            style={{ backgroundColor: category.accentColor }}
          />
          <span className="font-heading text-base md:text-lg text-ivory group-hover:text-gold-400 transition-colors">
            {category.name}
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
