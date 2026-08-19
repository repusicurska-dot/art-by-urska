import { motion } from "framer-motion";

export default function FadeTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none bg-ivory"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  );
}
