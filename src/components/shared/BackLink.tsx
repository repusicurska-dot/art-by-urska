"use client";

import { useRouter } from "next/navigation";

export default function BackLink({
  label = "Nazaj",
  className = "text-charcoal/60 hover:text-gold-600",
}: {
  label?: string;
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`text-xs tracking-widest uppercase transition-colors ${className}`}
    >
      ← {label}
    </button>
  );
}
