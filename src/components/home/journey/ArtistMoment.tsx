"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/shared/Container";

/** A quiet human beat after the sensory chapters — a place for the eye, and the pace, to rest. */
export default function ArtistMoment() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [40, -40]);

  return (
    <section ref={ref} className="bg-ink py-24 md:py-36">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-16">
          <motion.div
            className="relative aspect-[6/5] w-full overflow-hidden rounded-sm"
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
              <Image
                src="/images/about-castle-5.jpg"
                alt="Urška among roses in front of a historic mansion"
                fill
                sizes="(min-width: 768px) 55vw, 90vw"
                className="scale-110 object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
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
        </div>
      </Container>
    </section>
  );
}
