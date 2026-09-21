"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { WORLD_LOGO, WORLD_NAME, type Place } from "@/lib/worlds";

/**
 * A world's own gold logo. The first time it comes into view it opens from the centre outwards,
 * and a gold light passes across it once it's there.
 *
 * The view is watched on the outer, unclipped span: a target clipped to nothing never counts
 * as intersecting, so watching the circle itself would never start it.
 */
export default function WorldLogo({
  world,
  className = "h-40 w-40",
  delay = 0,
  sizes = "160px",
}: {
  world: Place;
  className?: string;
  delay?: number;
  sizes?: string;
}) {
  const reduceMotion = useReducedMotion();
  const open: Variants = {
    hidden: { clipPath: "circle(0% at 50% 50%)", opacity: 0, scale: 0.92 },
    shown: {
      clipPath: "circle(75% at 50% 50%)",
      opacity: 1,
      scale: 1,
      transition: { duration: 1.3, delay, ease: [0.45, 0, 0.25, 1] },
    },
  };
  const sheen: Variants = {
    hidden: { left: "-40%" },
    shown: { left: "140%", transition: { duration: 1.1, delay: delay + 1.1, ease: "easeInOut" } },
  };
  return (
    <motion.span
      className={`relative block shrink-0 ${className}`}
      initial={reduceMotion ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.span className="absolute inset-0 block overflow-hidden rounded-full" variants={open}>
        <Image src={WORLD_LOGO[world]} alt={WORLD_NAME[world]} fill sizes={sizes} className="object-contain" />
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-y-4 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent mix-blend-soft-light"
            variants={sheen}
          />
        )}
      </motion.span>
    </motion.span>
  );
}
