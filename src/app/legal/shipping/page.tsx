import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { business } from "@/content/business";
import { ZONE_DESCRIPTIONS, ZONE_LABELS, ZONE_ORDER } from "@/lib/shipping";

export const metadata: Metadata = {
  title: "Shipping & Delivery — Art by Urška",
  alternates: { canonical: "/legal/shipping" },
};

export default function ShippingPage() {
  return (
    <LegalPageShell title="Shipping & Delivery" updated="2026-08-25">
      <section>
        <h2>1. Processing time</h2>
        <p>
          Each artwork lists its own estimated dispatch time on its product page — original
          paintings can require additional preparation and packaging time compared to standard
          goods.
        </p>
      </section>
      <section>
        <h2>2. Where we ship</h2>
        <ul>
          {ZONE_ORDER.map((zone) => (
            <li key={zone}>
              <strong>{ZONE_LABELS[zone]}:</strong> {ZONE_DESCRIPTIONS[zone]}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>3. Shipping cost</h2>
        <p>
          Shipping cost depends on destination, artwork size, and packaging requirements, and is
          confirmed with you before payment is finalized — see the checkout flow. We do not add
          undisclosed charges after an order is placed.
        </p>
      </section>
      <section>
        <h2>4. Packaging and insurance</h2>
        <p>
          Original artworks are packaged for transit using materials appropriate to their size
          and medium. [PACKAGING METHOD / MATERIALS — TO BE CONFIRMED.] [INSURANCE COVERAGE — TO
          BE CONFIRMED — state whether shipments are insured and up to what value.]
        </p>
      </section>
      <section>
        <h2>5. Tracking</h2>
        <p>
          [TRACKING PROVISION — TO BE CONFIRMED — state whether a tracking number is provided and
          through which carrier.]
        </p>
      </section>
      <section>
        <h2>6. Customs, import duties, and local taxes</h2>
        <p>
          For deliveries within the EU, no customs formalities apply. For deliveries to Europe
          outside the EU or internationally, the shipment may be subject to import duties, taxes,
          or customs clearance fees imposed by the destination country. These charges are set by
          the destination country, are outside our control, and — unless we state otherwise for a
          specific order — are the responsibility of the recipient.
        </p>
      </section>
      <section>
        <h2>7. Contact</h2>
        <p>Questions about a shipment: {business.contactEmail}</p>
      </section>
    </LegalPageShell>
  );
}
