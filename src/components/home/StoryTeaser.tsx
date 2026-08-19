"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import Container from "@/components/shared/Container";

export default function StoryTeaser() {
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-3xl text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal">
            Slike, ki pripovedujejo
          </h2>
          <p className="mt-6 text-charcoal/70 leading-relaxed">
            Vsaka slika Urške se rodi iz razpoloženja — 21 del, razdeljenih v
            sedem oddelkov, vsak s svojim čustvenim odtenkom. To ni galerija
            izdelkov, temveč zbirka zgodb, ki jih je vredno spoznati počasi,
            preden postanejo del vašega prostora.
          </p>
          <Link
            href="/about"
            className="inline-block mt-8 text-sm tracking-widest uppercase text-gold-600 hover:text-gold-400 transition-colors border-b border-gold-600/40 pb-1"
          >
            Spoznaj Urško
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
