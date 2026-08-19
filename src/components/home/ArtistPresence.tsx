"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

const blobs = [
  { color: "#4A2E3A", top: "8%", left: "12%", size: 560, duration: 46, delay: 0 },
  { color: "#B5654A", top: "58%", left: "72%", size: 500, duration: 58, delay: 4 },
  { color: "#8F6C2C", top: "72%", left: "18%", size: 440, duration: 52, delay: 8 },
  { color: "#8A9A82", top: "14%", left: "76%", size: 400, duration: 64, delay: 2 },
  { color: "#C97B4B", top: "40%", left: "45%", size: 460, duration: 70, delay: 6 },
];

export default function ArtistPresence() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-midnight">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen"
          style={{
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color}99 0%, ${blob.color}00 70%)`,
            filter: "blur(70px)",
          }}
          animate={{
            x: [0, 40, -25, 0],
            y: [0, -30, 25, 0],
            scale: [1, 1.15, 0.92, 1],
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-midnight/10" />

      <motion.div
        className="absolute bottom-16 left-0 right-0 px-6 md:px-10 text-center"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
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
