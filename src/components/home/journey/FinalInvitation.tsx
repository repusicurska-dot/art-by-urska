"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const OPTIONS = [
  { label: "Explore original works", href: "/collection", image: "/images/the-prophecy.jpg" },
  { label: "Discover poetry", href: "/poetry", image: "/images/blossoming-love.jpg" },
  { label: "Commission a painting", href: "/contact", image: "/images/birds-of-light.jpg" },
];

export default function FinalInvitation() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink">
      {/* Desktop: full-bleed background crossfades with the hovered/focused option. */}
      <div className="absolute inset-0 hidden md:block">
        {OPTIONS.map((o, i) => (
          <motion.div
            key={o.href}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 0.55 : 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Image src={o.image} alt="" fill sizes="100vw" className="object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      </div>

      <div className="relative hidden h-full flex-col items-center justify-center px-6 text-center md:flex">
        <h2 className="font-gothic text-4xl text-bone md:text-6xl">Which story will find you?</h2>
        <nav aria-label="Explore" className="mt-14 flex flex-col items-center gap-7">
          {OPTIONS.map((o, i) => (
            <Link
              key={o.href}
              href={o.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`border-b pb-1 font-heading text-2xl transition-colors duration-300 ${
                active === i ? "border-bone text-bone" : "border-bone/0 text-bone/60"
              }`}
            >
              {o.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile: three always-visible visual links, no hover dependency. */}
      <div className="flex h-full flex-col md:hidden">
        {OPTIONS.map((o) => (
          <Link key={o.href} href={o.href} className="group relative flex-1 overflow-hidden">
            <Image src={o.image} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/55 transition-colors group-active:bg-ink/40" />
            <span className="relative flex h-full items-center justify-center px-6 text-center font-heading text-xl text-bone">
              {o.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
