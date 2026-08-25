"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getArtworkBySlug, getQuoteBySlug } from "@/lib/content";

const CATEGORIES = [
  "Artwork inquiry",
  "Purchase assistance",
  "Commission inquiry",
  "Shipping question",
  "Press / collaboration",
  "Other",
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const pieceSlug = searchParams.get("piece");
  const piece = pieceSlug ? getArtworkBySlug(pieceSlug) : undefined;
  const quoteSlug = searchParams.get("quote");
  const quote = quoteSlug ? getQuoteBySlug(quoteSlug) : undefined;
  const referenced = piece ?? quote;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(referenced ? "Artwork inquiry" : "");
  const [message, setMessage] = useState(
    piece
      ? `I'm interested in "${piece.title}". `
      : quote
        ? `I'm interested in the "${quote.title}" print. `
        : ""
  );
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  if (status === "sent") {
    return (
      <div className="text-center py-16">
        <p className="font-heading text-2xl text-bone">Thank you for your message.</p>
        <p className="mt-3 text-bone/60">Urška will get back to you personally within a few days.</p>
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
            body: JSON.stringify({ name, email, category, message, company }),
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error ?? "Something went wrong. Please try again.");
            setStatus("error");
            return;
          }
          setStatus("sent");
        } catch {
          setError("Couldn't reach the server. Please try again.");
          setStatus("error");
        }
      }}
      className="space-y-6"
    >
      {referenced && (
        <div className="rounded-sm border border-gold-600/30 bg-gold-400/10 px-4 py-3 text-sm text-bone/80">
          Regarding: <strong>{piece ? piece.title : quote?.title}</strong>
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
          Full name
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
          Email
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
          Inquiry type
        </label>
        <select
          id="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
        >
          <option value="" disabled>
            Select one
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
          Message
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
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      <p className="text-xs text-bone/40 italic">
        This form does not yet deliver to an inbox or CRM — that connection is still pending.
      </p>
    </form>
  );
}
