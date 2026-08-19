"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getPaintingBySlug } from "@/lib/content";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const pieceSlug = searchParams.get("piece");
  const piece = pieceSlug ? getPaintingBySlug(pieceSlug) : undefined;
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="text-center py-16">
        <p className="font-heading text-2xl text-charcoal">Hvala za sporočilo.</p>
        <p className="mt-3 text-charcoal/60">
          Urška se vam bo osebno oglasila v nekaj dneh.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-6"
    >
      {piece && (
        <div className="rounded-sm border border-gold-600/30 bg-gold-400/10 px-4 py-3 text-sm text-charcoal/80">
          Povpraševanje o delu: <strong>{piece.title}</strong>
        </div>
      )}
      <div>
        <label className="block text-xs tracking-widest uppercase text-charcoal/60 mb-2">
          Ime in priimek
        </label>
        <input
          required
          type="text"
          className="w-full border border-charcoal/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-gold-600"
        />
      </div>
      <div>
        <label className="block text-xs tracking-widest uppercase text-charcoal/60 mb-2">
          E-pošta
        </label>
        <input
          required
          type="email"
          className="w-full border border-charcoal/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-gold-600"
        />
      </div>
      <div>
        <label className="block text-xs tracking-widest uppercase text-charcoal/60 mb-2">
          Sporočilo
        </label>
        <textarea
          required
          rows={5}
          className="w-full border border-charcoal/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-gold-600"
        />
      </div>
      <button
        type="submit"
        className="text-sm tracking-widest uppercase bg-charcoal text-ivory hover:bg-gold-600 transition-colors rounded-full px-8 py-3"
      >
        Pošlji povpraševanje
      </button>
      <p className="text-xs text-charcoal/40 italic">
        (Placeholder obrazec — povezava na e-pošto/CRM sledi v naslednji fazi.)
      </p>
    </form>
  );
}
