"use client";

import { useState } from "react";
import Link from "next/link";

const OPTIONS = [
  { label: "Explore original works", href: "/collection" },
  { label: "Discover poetry", href: "/poetry" },
  { label: "Commission a painting", href: "/contact" },
];

/** The last screen of the journey — three ways on, standing in the open sky. */
export default function FinalInvitation() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
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

      {/* Mobile: the same three ways on, on the sky. */}
      <div className="flex h-full flex-col items-center justify-center gap-8 px-6 text-center md:hidden">
        <h2 className="font-gothic text-3xl text-bone">Which story will find you?</h2>
        {OPTIONS.map((o) => (
          <Link
            key={o.href}
            href={o.href}
            className="border-b border-bone/40 pb-1 font-heading text-xl text-bone"
          >
            {o.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
