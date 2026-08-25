"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import ContactForm from "@/components/contact/ContactForm";
import { fadeInUp } from "@/lib/motion";

export default function ContactContent() {
  return (
    <section className="py-24 md:py-32 bg-ink">
      <Container className="max-w-xl">
        <motion.span
          className="text-xs tracking-widest uppercase text-gold-400 block"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Contact
        </motion.span>
        <motion.h1
          className="font-heading text-4xl md:text-5xl text-bone mt-4 mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          Get in touch
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </motion.div>
      </Container>
    </section>
  );
}
