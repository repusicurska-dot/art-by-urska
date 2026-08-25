"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { fadeIn, fadeInUp } from "@/lib/motion";
import { QuotePrint } from "@/content/types";

export default function PoetryIndexContent({ quotes }: { quotes: QuotePrint[] }) {
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
          Poetry by Urška
        </motion.span>
        <motion.h1
          className="mt-6 font-heading text-5xl md:text-6xl text-ivory"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.35 }}
        >
          Words, kept as close as the paint.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-md font-heading italic text-lg text-ivory/70"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.55 }}
        >
          [INTRO TEXT PENDING — a short line on why the words exist alongside the paintings.]
        </motion.p>
      </section>

      <section className="py-24 md:py-32 bg-ivory">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {quotes.map((quote, i) => (
              <motion.div
                key={quote.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeInUp}
                transition={{ delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/poetry/${quote.slug}`}
                  className="group block h-full border border-charcoal/10 rounded-sm p-8 hover:border-gold-600/50 transition-colors"
                >
                  <span
                    className="block h-1.5 w-1.5 rounded-full mb-6"
                    style={{ backgroundColor: quote.accentColor }}
                  />
                  <p className="font-heading italic text-xl leading-snug text-charcoal line-clamp-4">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="mt-6 text-xs tracking-widest uppercase text-charcoal/40 group-hover:text-gold-600 transition-colors">
                    {quote.title} · {quote.format}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
