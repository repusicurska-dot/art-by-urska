import { motion } from "framer-motion";
import { NavigationDirection } from "@/lib/navigationDirection";

const MIDNIGHT = "#121212";

export default function PageTurnTransition({
  accent,
  epigraph,
  direction,
}: {
  accent: string;
  epigraph?: string;
  direction: NavigationDirection;
}) {
  const forward = direction === "forward";
  const duration = forward ? 1.15 : 0.7;
  const panelBg = `color-mix(in srgb, ${accent} 45%, ${MIDNIGHT} 55%)`;
  const origin = forward ? "left" : "right";
  const exitRotate = forward ? -110 : 110;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
      style={{ perspective: 1800 }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: panelBg,
          transformOrigin: origin,
          boxShadow: "12px 0 40px rgba(0,0,0,0.45)",
        }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: exitRotate }}
        transition={{ duration, ease: [0.76, 0, 0.24, 1], delay: forward ? 0.15 : 0 }}
      />
      {forward && (
        <motion.div
          className="absolute inset-y-0 left-0 w-8"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, transparent 100%)",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
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
