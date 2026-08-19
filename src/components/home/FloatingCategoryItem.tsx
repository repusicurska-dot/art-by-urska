"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Category } from "@/content/types";
import { floatTransition } from "@/lib/motion";

export default function FloatingCategoryItem({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        reduceMotion
          ? undefined
          : { y: [0, -14, 0], x: [0, 6, 0] }
      }
      transition={reduceMotion ? undefined : floatTransition(index)}
    >
      <Link
        href={`/categories/${category.slug}`}
        className="group flex flex-col items-center justify-center rounded-full aspect-square w-28 md:w-36 border border-ivory/30 bg-ivory/5 backdrop-blur-sm px-4 text-center transition-colors hover:bg-ivory/15 hover:border-gold-400/70"
        style={{ boxShadow: `0 0 0 1px ${category.accentColor}22 inset` }}
      >
        <span
          className="h-2 w-2 rounded-full mb-2"
          style={{ backgroundColor: category.accentColor }}
        />
        <span className="font-heading text-base md:text-lg text-ivory group-hover:text-gold-400 transition-colors">
          {category.name}
        </span>
      </Link>
    </motion.div>
  );
}
