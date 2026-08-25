"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { fadeInUp } from "@/lib/motion";

export default function AboutContent() {
  return (
    <div>
      <section className="py-24 md:py-32 bg-ink">
        <Container className="max-w-3xl">
          <motion.span
            className="text-xs tracking-widest uppercase text-gold-400 block"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            About the artist
          </motion.span>
          <motion.h1
            className="font-heading text-4xl md:text-5xl text-bone mt-4"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            Urška
          </motion.h1>

          <div className="mt-10 grid md:grid-cols-[280px_1fr] gap-10 items-start">
            <motion.div
              className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            >
              <Image
                src="/images/about-castle-1.jpg"
                alt="Urška among roses in front of a historic mansion"
                fill
                sizes="(min-width: 768px) 280px, 80vw"
                className="object-cover"
                priority
              />
            </motion.div>

            <motion.div
              className="space-y-5 text-bone/75 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <p className="font-heading italic text-xl md:text-2xl text-bone">
                These paintings are more than art — they are pieces of my spirit, woven into
                every brushstroke.
              </p>
              <p>
                My art is not simply something I create — it is something I remember. Perhaps
                that is why certain paintings feel like silent echoes of something our souls
                already know.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 space-y-5 text-bone/75 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p>
              Before I became an artist, I dedicated my life to climbing. As a professional
              competition climber, I had the honor of competing at the highest international
              level. Along the way, I became the European Champion in bouldering, overall
              National Champion in both bouldering and speed climbing, a European Cup medalist,
              a World Youth Vice Champion, European Youth Cup overall winner and earned a podium
              finish at the World Beach Games.
            </p>
            <p>
              Climbing shaped who I am. It taught me discipline, resilience, presence, and the
              courage to trust my instincts. Every route was a lesson in perseverance, every
              challenge an invitation to grow. But as meaningful as that journey was, it
              eventually led me toward a deeper search — one that could not be expressed through
              movement alone.
            </p>
            <p>Today, I express that journey through art.</p>
          </motion.div>

          <motion.div
            className="relative mt-16 aspect-[3/4] md:aspect-[16/9] rounded-sm overflow-hidden max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/about-castle-2.jpg"
              alt="Urška in a rose garden in front of a historic mansion"
              width={1365}
              height={2048}
              className="w-full h-full object-cover object-top"
            />
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 gap-4 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
              <Image
                src="/images/about-castle-4.jpg"
                alt="Urška looking back toward the mansion garden"
                fill
                sizes="(min-width: 768px) 340px, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
              <Image
                src="/images/about-castle-3.jpg"
                alt="Urška among the roses, softly out of focus"
                fill
                sizes="(min-width: 768px) 340px, 45vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="mt-16 space-y-5 text-bone/75 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p>
              My work is a way of giving form to my soul. Every painting is a reflection of
              emotions, experiences, and moments that cannot always be put into words. Just as
              every climb tells a story, every artwork carries a part of my inner world.
            </p>
            <p>
              For me, art is more than creating something beautiful. It is a dialogue between the
              soul, the heart, and the unseen. It is a space where intuition leads, where silence
              speaks, and where the invisible becomes visible through color, texture, and
              movement.
            </p>
            <p>
              Each piece is an invitation to slow down, to feel deeply, and to reconnect with
              something beyond the surface — something timeless that already lives within us.
            </p>
            <p className="font-heading italic text-xl text-bone pt-4">Welcome to my world.</p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
