"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Artwork } from "@/content/types";
import PlaceholderArt from "@/components/shared/PlaceholderArt";
import BackLink from "@/components/shared/BackLink";

export default function StoryHero({ artwork }: { artwork: Artwork }) {
  return (
    <section className="grid md:grid-cols-2 md:h-screen bg-ink">
      <div className="relative h-[55vh] md:h-screen order-1 bg-midnight">
        {artwork.heroImage ? (
          <Image
            src={artwork.heroImage}
            alt={artwork.heroImageAlt ?? artwork.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain"
            priority
          />
        ) : (
          <PlaceholderArt
            label={artwork.title}
            accentColor={artwork.accentColor}
            className="h-full w-full"
          />
        )}
      </div>

      <div className="order-2 flex flex-col justify-center px-6 py-16 md:px-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <BackLink label="Back" className="text-bone/50 hover:text-bone" />
        </motion.div>

        <motion.span
          className="inline-block mt-10 text-xs tracking-widest uppercase px-3 py-1 rounded-full border self-start"
          style={{ color: artwork.accentColor, borderColor: `${artwork.accentColor}80` }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {artwork.editionType === "original" ? "Original artwork" : "Edition"}
        </motion.span>

        {artwork.quote && (
          <motion.p
            className="mt-6 font-heading italic text-2xl md:text-3xl lg:text-4xl leading-snug text-bone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          >
            &ldquo;{artwork.quote}&rdquo;
          </motion.p>
        )}

        <motion.h1
          className="mt-6 font-heading text-3xl md:text-4xl text-bone/80"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
        >
          {artwork.title}
        </motion.h1>

        {artwork.shortIntro && (
          <motion.p
            className="mt-6 max-w-md text-bone/60 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          >
            {artwork.shortIntro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
