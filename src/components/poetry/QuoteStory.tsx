"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import BackLink from "@/components/shared/BackLink";
import ProvisionalPriceNote from "@/components/story/ProvisionalPriceNote";
import { QuotePrint } from "@/content/types";

export default function QuoteStory({ quote }: { quote: QuotePrint }) {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center bg-ivory py-24">
      <Container className="max-w-3xl text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <BackLink label="Back to Poetry" className="text-charcoal/50 hover:text-gold-600" />
        </motion.div>

        <motion.span
          className="block mt-10 text-xs tracking-widest uppercase"
          style={{ color: quote.accentColor }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {quote.format}
        </motion.span>

        <motion.p
          className="mt-8 font-heading italic text-3xl md:text-5xl leading-snug text-charcoal whitespace-pre-line"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          &ldquo;{quote.text}&rdquo;
        </motion.p>

        <motion.h1
          className="mt-8 font-heading text-2xl text-charcoal/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {quote.title}
        </motion.h1>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <p className="font-heading text-3xl text-charcoal">
            {quote.price.toLocaleString("en-IE")} €
          </p>
          {!quote.priceConfirmed && <ProvisionalPriceNote className="mt-2" />}
          <Link href={`/contact?quote=${quote.slug}`} className="btn-primary inline-block mt-8">
            Inquire to purchase
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
