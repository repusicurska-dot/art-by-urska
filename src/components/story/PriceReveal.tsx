"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Artwork } from "@/content/types";
import EnquireCTA from "./EnquireCTA";
import ProvisionalPriceNote from "./ProvisionalPriceNote";

const AVAILABILITY_LABEL: Record<Artwork["availability"], string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
  inquire: "Inquire for availability",
};

export default function PriceReveal({ artwork }: { artwork: Artwork }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      className="text-center py-8 bg-ink"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
    >
      <p className="font-heading text-xl md:text-2xl italic text-bone/80 max-w-lg mx-auto">
        This piece is ready to find its home.
      </p>

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="btn-secondary mt-8 text-bone hover:text-bone border-bone/30 hover:border-bone"
        >
          Reveal price
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <p className="font-heading text-4xl md:text-5xl text-bone">
            {artwork.price.toLocaleString("en-IE")} €
          </p>
          {!artwork.priceConfirmed && <ProvisionalPriceNote className="mt-2" />}
          <p className="mt-3 text-xs tracking-widest uppercase text-bone/50">
            {AVAILABILITY_LABEL[artwork.availability]} · VAT: {artwork.vatNote}
          </p>
          <div className="mt-8">
            <EnquireCTA artwork={artwork} />
          </div>
        </motion.div>
      )}

      {!revealed && (
        <motion.div
          className="h-px w-full"
          onViewportEnter={() => setRevealed(true)}
          viewport={{ amount: 0, margin: "-200px 0px 0px 0px" }}
        />
      )}
    </motion.div>
  );
}
