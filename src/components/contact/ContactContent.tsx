"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import ContactForm from "@/components/contact/ContactForm";
import ProtectedEmail from "@/components/shared/ProtectedEmail";
import { fadeInUp } from "@/lib/motion";

export default function ContactContent() {
  return (
    <section className="py-24 md:py-32">
      <Container className="reading-panel max-w-xl rounded-3xl px-6 py-10 md:px-10 md:py-12">
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
        <p className="-mt-4 mb-10 text-bone/80">
          Write through the form below, or email Urška directly at <ProtectedEmail />.
        </p>
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
