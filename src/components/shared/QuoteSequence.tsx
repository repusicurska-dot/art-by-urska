"use client";

import { motion } from "framer-motion";

/**
 * Urška's quotes, one per screen: each gets the page to itself and fades in as it
 * reaches the middle of the viewport, so scrolling reads as one line at a time
 * rather than a wall of text. Adding a quote is just another entry in the array
 * passed in — no layout work needed.
 */
export default function QuoteSequence({
  quotes,
  className = "",
}: {
  quotes: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      {quotes.map((quote, i) => (
        <section
          key={i}
          className="flex min-h-[75vh] items-center justify-center px-6 py-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.55 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="font-heading italic text-2xl md:text-4xl leading-relaxed text-bone max-w-3xl"
          >
            {quote}
          </motion.p>
        </section>
      ))}
    </div>
  );
}
