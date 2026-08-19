import { motion } from "framer-motion";
import { NavigationDirection } from "@/lib/navigationDirection";

export default function VeilTransition({
  epigraph,
  direction,
}: {
  epigraph?: string;
  direction: NavigationDirection;
}) {
  const forward = direction === "forward";
  const duration = forward ? 1.8 : 0.7;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute inset-0 bg-midnight"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration, ease: [0.65, 0, 0.35, 1], delay: forward ? 0.9 : 0.1 }}
      />
      {forward && epigraph && (
        <motion.p
          className="absolute inset-0 flex items-center justify-center px-10 text-center font-heading italic text-xl md:text-2xl text-ivory/90"
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
