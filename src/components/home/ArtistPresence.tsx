"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

export default function ArtistPresence() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-midnight">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, #4A2E3A 0%, #1B1B24 55%, #0f0f14 100%)",
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
      <motion.div
        className="absolute bottom-16 left-0 right-0 px-6 md:px-10 text-center"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <p className="mx-auto max-w-xl font-heading text-xl md:text-2xl text-ivory/90 italic">
          &ldquo;Vsaka slika je zgodba, ki še išče svoj dom.&rdquo;
        </p>
        <p className="mt-3 text-sm tracking-widest uppercase text-ivory/50">
          Urška — slikarka
        </p>
      </motion.div>
    </div>
  );
}
