import { motion } from "framer-motion";
import { NavigationDirection } from "@/lib/navigationDirection";

const MIDNIGHT = "#1B1B24";

export default function CurtainTransition({
  accent,
  epigraph,
  direction,
}: {
  accent: string;
  epigraph?: string;
  direction: NavigationDirection;
}) {
  const forward = direction === "forward";
  const duration = forward ? 1.3 : 0.7;
  const panelBg = `color-mix(in srgb, ${accent} 45%, ${MIDNIGHT} 55%)`;
  const topExit = forward ? "-100vh" : "100vh";
  const bottomExit = forward ? "100vh" : "-100vh";

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{ background: panelBg }}
        initial={{ y: "0vh" }}
        animate={{ y: topExit }}
        transition={{ duration, ease: [0.76, 0, 0.24, 1], delay: forward ? 0.15 : 0 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: panelBg }}
        initial={{ y: "0vh" }}
        animate={{ y: bottomExit }}
        transition={{ duration, ease: [0.76, 0, 0.24, 1], delay: forward ? 0.15 : 0 }}
      />
      {forward && (
        <motion.div
          className="absolute left-0 right-0 top-1/2 h-px bg-gold-400/70"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
      )}
      {forward && epigraph && (
        <motion.p
          className="absolute inset-0 flex items-center justify-center px-10 text-center font-heading italic text-xl md:text-2xl text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration, times: [0, 0.3, 0.65, 1], ease: "easeInOut" }}
        >
          {epigraph}
        </motion.p>
      )}
    </div>
  );
}
