import { Artwork } from "@/content/types";
import Container from "@/components/shared/Container";
import { ZONE_LABELS } from "@/lib/shipping";

function Row({ label, value }: { label: string; value?: string | number | boolean }) {
  if (value === undefined || value === "") return null;
  const display =
    typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);
  return (
    <div className="flex justify-between gap-6 py-3 border-b border-bone/10 text-sm">
      <dt className="text-bone/50">{label}</dt>
      <dd className="text-bone text-right">{display}</dd>
    </div>
  );
}

export default function ArtworkSpecs({ artwork }: { artwork: Artwork }) {
  return (
    <section className="py-16 md:py-20 bg-ink">
      <Container className="max-w-2xl">
        <span className="block text-xs tracking-widest uppercase text-gold-400 mb-6">
          Specifications
        </span>
        <dl>
          <Row label="Year" value={artwork.year ?? "[YEAR PENDING]"} />
          <Row label="Medium" value={artwork.medium} />
          <Row label="Materials" value={artwork.materials} />
          <Row label="Dimensions" value={artwork.dimensions} />
          <Row label="Weight" value={artwork.weight} />
          <Row
            label="Edition"
            value={
              artwork.editionType === "original"
                ? "Original, one of a kind"
                : `Edition${artwork.editionNumber ? ` — ${artwork.editionNumber}` : ""}`
            }
          />
          <Row label="Certificate of authenticity" value={artwork.certificateOfAuthenticity} />
          <Row label="Framed" value={artwork.framed} />
          <Row label="SKU" value={artwork.sku} />
          <Row label="Estimated dispatch" value={artwork.dispatchTime} />
          <Row
            label="Ships to"
            value={artwork.shipsTo.map((z) => ZONE_LABELS[z]).join(", ")}
          />
          <Row label="VAT / tax treatment" value={artwork.vatNote} />
          <Row label="Care information" value={artwork.careInfo} />
        </dl>
        <p className="mt-6 text-xs text-bone/40 italic">
          Artwork photography may not perfectly reproduce physical color, texture, or scale
          across every screen. Dimensions and materials above are accurate; treat photographs as
          a close representation rather than an exact match.
        </p>
      </Container>
    </section>
  );
}
