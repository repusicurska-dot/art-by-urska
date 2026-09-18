"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getArtworkBySlug } from "@/lib/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Dictionary } from "@/i18n/dictionary";

/**
 * The value sent to the server, paired with the key of its translated label. The values stay
 * English in every language: the server validates against them and Urška reads them in her
 * notification email.
 */
const CATEGORIES: { value: string; key: keyof Dictionary["contact"]["categories"] }[] = [
  { value: "Artwork inquiry", key: "artwork" },
  { value: "Purchase assistance", key: "purchase" },
  { value: "Commission inquiry", key: "commission" },
  { value: "Shipping question", key: "shipping" },
  { value: "Press / collaboration", key: "press" },
  { value: "Other", key: "other" },
];

export default function ContactForm() {
  const { t } = useLanguage();
  const c = t.contact;
  const searchParams = useSearchParams();
  const pieceSlug = searchParams.get("piece");
  const piece = pieceSlug ? getArtworkBySlug(pieceSlug) : undefined;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(piece ? "Artwork inquiry" : "");
  // Null until the visitor types: the opening line has to follow the language, and the language
  // is only known after hydration, so it can't be baked into the initial state.
  const [typed, setMessage] = useState<string | null>(null);
  const message = typed ?? (piece ? c.interestedIn.replace("{title}", piece.title) : "");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  if (status === "sent") {
    return (
      <div className="text-center py-16">
        <p className="font-heading text-2xl text-bone">{c.thanks}</p>
        <p className="mt-3 text-bone/60">{c.thanksBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("submitting");
        setError("");
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, category, message, company, piece: piece?.title }),
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error ?? c.genericError);
            setStatus("error");
            return;
          }
          setStatus("sent");
        } catch {
          setError(c.networkError);
          setStatus("error");
        }
      }}
      className="space-y-6"
    >
      {piece && (
        <div className="rounded-sm border border-gold-600/30 bg-gold-400/10 px-4 py-3 text-sm text-bone/80">
          {c.regarding}: <strong>{piece.title}</strong>
        </div>
      )}

      {/* Honeypot field — hidden from real visitors, catches simple bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
          {c.name}
        </label>
        <input
          id="name"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
          {c.email}
        </label>
        <input
          id="email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
          {c.type}
        </label>
        <select
          id="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
        >
          <option value="" disabled>
            {c.selectOne}
          </option>
          {CATEGORIES.map((option) => (
            <option key={option.value} value={option.value}>
              {c.categories[option.key]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
          {c.message}
        </label>
        <textarea
          id="message"
          required
          minLength={10}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-terracotta">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary"
      >
        {status === "submitting" ? c.sending : c.send}
      </button>
      <p className="text-xs text-bone/40 italic">{c.directNote}</p>
    </form>
  );
}
