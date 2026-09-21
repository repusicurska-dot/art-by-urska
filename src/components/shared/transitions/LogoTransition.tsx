"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import ArrivalLogo, { ARRIVAL_DRAW_SECONDS, arrivalVariantFor } from "../ArrivalLogo";

/**
 * Arriving at a page from inside the site: the logo first, on the site's cream, with the page's
 * own line underneath when it has one — then the curtain lifts.
 */
export default function LogoTransition({ epigraph }: { epigraph?: string }) {
  const variant = arrivalVariantFor(usePathname());
  return (
    <motion.div
      className="fixed inset-0 z-[250] pointer-events-none flex flex-col items-center justify-center gap-6 px-10 text-center"
      style={{ background: "var(--color-ink)" }}
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: ARRIVAL_DRAW_SECONDS + 0.25 }}
    >
      <ArrivalLogo variant={variant} />
      {epigraph && (
        <motion.p
          className="max-w-xl font-heading italic text-lg md:text-xl text-bone/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {epigraph}
        </motion.p>
      )}
    </motion.div>
  );
}
