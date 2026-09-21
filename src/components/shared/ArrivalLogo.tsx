"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * The gold "UR — Art by Urška" logo that greets every arrival: on the first load of any page
 * (IntroSplash) and on every page reached from inside the site (LogoTransition).
 * public/images/logo-ur.webp is Teo's logo from 2026-09-21 with its white background removed,
 * so it sits on the site's own cream.
 */
export default function ArrivalLogo({ reduceMotion = false }: { reduceMotion?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
      className="relative h-56 w-56 md:h-72 md:w-72"
    >
      <Image
        src="/images/logo-ur.webp"
        alt="Art by Urška"
        fill
        priority
        sizes="(min-width: 768px) 288px, 224px"
        className="object-contain drop-shadow-[0_10px_30px_rgba(143,103,45,0.25)]"
      />
    </motion.div>
  );
}
