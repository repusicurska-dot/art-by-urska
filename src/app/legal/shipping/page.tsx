import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import ProtectedEmail from "@/components/shared/ProtectedEmail";
import { ZONE_DESCRIPTIONS, ZONE_LABELS, ZONE_ORDER } from "@/lib/shipping";

export const metadata: Metadata = {
  title: "Shipping & Delivery — Art by Urška",
  alternates: { canonical: "/legal/shipping" },
};

export default function ShippingPage() {
  return (
    <LegalPageShell title="Shipping & Delivery" updated="2026-09-21">
      <section>
        <h2>1. Processing time</h2>
        <p>
          Every painting is packed by hand and handed to the carrier within 7 days of your order.
          Delivery time after that depends on the destination.
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
          Each painting is wrapped in bubble wrap or protected with polystyrene, then packed in a
          sturdy cardboard box, so that the canvas and its corners do not move in transit.
        </p>
        <p>
          Paintings are sent with Pošta Slovenije (the Slovenian national post) with their full
          purchase price declared as the shipment&rsquo;s value, so the shipment is covered for
          loss or damage up to that value under the carrier&rsquo;s conditions. Please check the
          parcel when it arrives and tell us straight away if anything is damaged — keep the
          packaging, as the carrier will need it for the claim.
        </p>
      </section>
      <section>
        <h2>5. Tracking</h2>
        <p>
          You receive a Pošta Slovenije tracking number by email when the painting is sent.
          Tracking works end to end within Slovenia and the EU; for some countries outside the EU
          it may stop at the border, where the destination country&rsquo;s post takes over.
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
        <p>Questions about a shipment: <ProtectedEmail /></p>
      </section>
    </LegalPageShell>
  );
}
