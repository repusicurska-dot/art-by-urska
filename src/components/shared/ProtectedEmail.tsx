"use client";

import { useEffect, useState } from "react";
import { decodeContactEmail } from "@/content/business";

/**
 * Urška's contact email, rendered only after the page loads in a real browser. The server
 * HTML contains a neutral placeholder instead of the address, which keeps it out of reach of
 * the simple scrapers that harvest emails for spam lists.
 */
export default function ProtectedEmail({ className = "underline" }: { className?: string }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(decodeContactEmail());
  }, []);

  if (!email) return <span className={className}>our contact email</span>;
  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
