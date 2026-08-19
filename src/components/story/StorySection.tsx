"use client";

import { motion } from "framer-motion";
import { StoryBeat } from "@/content/types";
import PlaceholderArt from "@/components/shared/PlaceholderArt";
import Container from "@/components/shared/Container";

export default function StorySection({
  beat,
  index,
  accentColor,
  paintingTitle,
}: {
  beat: StoryBeat;
  index: number;
  accentColor: string;
  paintingTitle: string;
}) {
  const imageFirst = index % 2 === 0;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            className={imageFirst ? "md:order-1" : "md:order-2"}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PlaceholderArt
              label={paintingTitle}
              accentColor={accentColor}
              className="aspect-[4/5] rounded-sm"
            />
          </motion.div>
          <motion.div
            className={imageFirst ? "md:order-2" : "md:order-1"}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            {beat.heading && (
              <span
                className="block text-xs tracking-widest uppercase mb-3"
                style={{ color: accentColor }}
              >
                {beat.heading}
              </span>
            )}
            <p className="font-heading text-2xl md:text-3xl leading-snug text-charcoal">
              {beat.text}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
