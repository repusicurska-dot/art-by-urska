"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { fadeIn, fadeInUp } from "@/lib/motion";

const STATEMENTS = [
  "I believe every painting chooses the soul it is meant to find.",
  "My hands hold the brush, but my heart tells the story of who I have been across lifetimes.",
  "Every canvas holds a fragment of my soul, transformed into color, texture, and light.",
  "The soul recognizes what words never can.",
  "If my work touches something within you, then our souls have met in the language of art.",
  "Every piece I create is an offering — a moment of emotion captured forever in paint.",
  "Maybe that is where art truly begins — not in the hands of the artist, but in the silent recognition between two souls.",
];

export default function SpiritualityContent() {
  return (
    <div>
      <section className="relative bg-midnight overflow-hidden h-[70vh] min-h-[480px] flex flex-col items-center justify-center px-6 text-center">
        <motion.span
          className="text-xs tracking-[0.3em] uppercase text-gold-400/90"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.2 }}
        >
          Spirituality
        </motion.span>
        <motion.h1
          className="mt-6 font-heading text-5xl md:text-6xl text-ivory"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.35 }}
        >
          Art from my soul.
        </motion.h1>
      </section>

      <section className="py-24 md:py-32">
        <Container className="max-w-2xl">
          <div className="space-y-20 md:space-y-28">
            {STATEMENTS.map((line, i) => (
              <motion.p
                key={i}
                className="font-heading italic text-2xl md:text-3xl leading-snug text-bone text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={fadeInUp}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="mt-28 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeInUp}
          >
            <p className="text-bone/70 leading-relaxed max-w-md mx-auto">
              Thank you for walking this journey with me and allowing my soul to speak to yours
              through art.
            </p>
            <Link
              href="/collection"
              className="inline-block mt-8 text-sm tracking-widest uppercase text-gold-400 hover:text-bone transition-colors border-b border-gold-400/40 pb-1"
            >
              Explore the paintings these words came from →
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
