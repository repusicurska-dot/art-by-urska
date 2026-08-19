import { motion } from "framer-motion";
import { NavigationDirection } from "@/lib/navigationDirection";

const MIDNIGHT = "#1B1B24";

export default function IrisTransition({
  accent,
  epigraph,
  direction,
}: {
  accent: string;
  epigraph?: string;
  direction: NavigationDirection;
}) {
  const forward = direction === "forward";
  const duration = forward ? 1.5 : 0.8;
  const anchor = forward ? "50% 105%" : "50% -5%";
  const panelBg = `color-mix(in srgb, ${accent} 45%, ${MIDNIGHT} 55%)`;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{ background: panelBg }}
        initial={{ clipPath: `circle(150% at ${anchor})` }}
        animate={{ clipPath: `circle(0% at ${anchor})` }}
        transition={{ duration, ease: [0.83, 0, 0.17, 1] }}
      />
      {forward && epigraph && (
        <motion.p
          className="absolute inset-0 flex items-center justify-center px-10 text-center font-heading italic text-xl md:text-2xl text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration, times: [0, 0.25, 0.6, 1], ease: "easeInOut" }}
        >
          {epigraph}
        </motion.p>
      )}
    </div>
  );
}
