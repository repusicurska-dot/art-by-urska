"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Painting } from "@/content/types";
import EnquireCTA from "./EnquireCTA";

export default function PriceReveal({ painting }: { painting: Painting }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
    >
      <p className="font-heading text-xl md:text-2xl italic text-charcoal/80 max-w-lg mx-auto">
        Ta slika je pripravljena, da najde svoj dom.
      </p>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.button
            key="reveal"
            onClick={() => setRevealed(true)}
            className="mt-8 text-sm tracking-widest uppercase text-gold-600 hover:text-gold-400 transition-colors border border-gold-600/40 rounded-full px-8 py-3"
            exit={{ opacity: 0, scale: 0.95 }}
          >
            Razkrij ceno
          </motion.button>
        ) : (
          <motion.div
            key="price"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <p className="font-heading text-4xl md:text-5xl text-charcoal">
              {painting.price.toLocaleString("sl-SI")} €
            </p>
            <div className="mt-8">
              <EnquireCTA painting={painting} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
