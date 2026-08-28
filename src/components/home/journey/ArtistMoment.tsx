"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";

/**
 * A quiet human beat to close the journey — text only. Her actual portrait lives on
 * /about and is deliberately not shown here; this is an invitation to go meet her there.
 */
export default function ArtistMoment() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-smoke">The artist</span>
          <p className="mt-6 font-heading italic text-2xl md:text-3xl leading-snug text-bone">
            These paintings are more than art — they are pieces of my spirit, woven into every
            brushstroke.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-bone/60">
            Before the canvas, there was the climb. Today, I express that journey through art.
          </p>
          <p className="mt-6 font-heading text-lg text-bone">— Urška</p>
          <Link
            href="/about"
            className="mt-8 inline-block border-b border-bone/40 pb-1 text-xs tracking-widest uppercase text-bone/85 transition-colors hover:text-bone hover:border-bone"
          >
            Meet Urška →
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
