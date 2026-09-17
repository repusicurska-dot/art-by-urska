"use client";

import { Artwork } from "@/content/types";
import Container from "@/components/shared/Container";
import { ZONE_LABELS } from "@/lib/shipping";
import { useLanguage } from "@/i18n/LanguageProvider";

function Row({ label, value, yes, no }: { label: string; value?: string | number | boolean; yes: string; no: string }) {
  if (value === undefined || value === "") return null;
  const display = typeof value === "boolean" ? (value ? yes : no) : String(value);
  return (
    <div className="flex justify-between gap-6 py-3 border-b border-bone/10 text-sm">
      <dt className="text-bone/50">{label}</dt>
      <dd className="text-bone text-right">{display}</dd>
    </div>
  );
}

export default function ArtworkSpecs({ artwork }: { artwork: Artwork }) {
  const { t } = useLanguage();
  const s = t.artwork.specs;
  const yes = s.yes;
  const no = s.no;
  return (
    <section className="py-16 md:py-20">
      <Container className="max-w-2xl">
        <span className="block text-xs tracking-widest uppercase text-gold-400 mb-6">{t.artwork.originalArtwork}</span>
        <dl>
          <Row yes={yes} no={no} label={s.year} value={artwork.year ?? "[YEAR PENDING]"} />
          <Row yes={yes} no={no} label={s.medium} value={artwork.medium} />
          <Row yes={yes} no={no} label={s.materials} value={artwork.materials} />
          <Row yes={yes} no={no} label={s.dimensions} value={artwork.dimensions} />
          <Row yes={yes} no={no} label={s.weight} value={artwork.weight} />
          <Row
            yes={yes}
            no={no}
            label={s.edition}
            value={
              artwork.editionType === "original"
                ? s.originalOneOfAKind
                : `${s.edition}${artwork.editionNumber ? ` — ${artwork.editionNumber}` : ""}`
            }
          />
          <Row yes={yes} no={no} label={s.certificate} value={artwork.certificateOfAuthenticity} />
          <Row yes={yes} no={no} label={s.framed} value={artwork.framed} />
          <Row yes={yes} no={no} label="SKU" value={artwork.sku} />
          <Row yes={yes} no={no} label={s.dispatch} value={artwork.dispatchTime} />
          <Row yes={yes} no={no} label={s.shipsTo} value={artwork.shipsTo.map((z) => ZONE_LABELS[z]).join(", ")} />
          <Row yes={yes} no={no} label={s.vat} value={artwork.vatNote} />
          <Row yes={yes} no={no} label={s.care} value={artwork.careInfo} />
        </dl>
        <p className="mt-6 text-xs text-bone/40 italic">{t.artwork.photographyNote}</p>
      </Container>
    </section>
  );
}
