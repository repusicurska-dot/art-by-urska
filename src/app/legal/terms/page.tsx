import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Terms & Conditions — Art by Urška",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms & Conditions" updated="2026-08-25">
      <section>
        <h2>1. Website operator and scope</h2>
        <p>
          These Terms &amp; Conditions govern the use of this website and the purchase of
          artworks from {business.legalName} ({business.legalForm}), {business.registeredAddress},
          {" "}{business.country} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). See our{" "}
          <a href="/legal/notice">Legal Notice</a> for full business details. These Terms apply to
          all visitors and to anyone who places an order through this website.
        </p>
      </section>
      <section>
        <h2>2. Definitions</h2>
        <p>
          &ldquo;Artwork&rdquo; means an original painting or edition offered for sale on this
          site. &ldquo;Consumer&rdquo; means a natural person acting for purposes outside their
          trade, business, craft, or profession. &ldquo;Order&rdquo; means a request to purchase
          one or more Artworks submitted through the checkout flow.
        </p>
      </section>
      <section>
        <h2>3. Artworks and their representation</h2>
        <p>
          Each Artwork is described with its medium, materials, dimensions, and, where
          applicable, edition information. Photography is provided in good faith but may not
          perfectly reproduce color, texture, or scale across every screen — see the artwork page
          for the disclaimer that applies to all product photography.
        </p>
      </section>
      <section>
        <h2>4. Availability and pricing</h2>
        <p>
          Original artworks are one of a kind; availability can change without notice until an
          order is confirmed. All prices are shown in Euro (€). Prices marked as provisional are
          not final and must be confirmed before an order is placed. VAT/tax treatment is
          indicated per artwork and, where applicable, added at checkout.
        </p>
      </section>
      <section>
        <h2>5. Orders and acceptance</h2>
        <p>
          Submitting an order through checkout is an offer to purchase, which we are free to
          accept or decline (for example if an artwork has just sold, or payment cannot be
          verified). A contract is formed only once we confirm acceptance of your order.
        </p>
      </section>
      <section>
        <h2>6. Payment</h2>
        <p>
          Payment is processed through a third-party payment provider at checkout. We do not
          store full card details. Online payment is not yet live on this site — see the checkout
          flow for current status; until then, orders are arranged individually by inquiry.
        </p>
      </section>
      <section>
        <h2>7. Shipping, international orders, and customs</h2>
        <p>
          See our <a href="/legal/shipping">Shipping &amp; Delivery</a> page for processing times,
          shipping zones, and packaging. For deliveries outside the EU, import duties, taxes, or
          customs charges may apply and are the responsibility of the recipient unless we state
          otherwise for a specific order.
        </p>
      </section>
      <section>
        <h2>8. Delivery and risk</h2>
        <p>
          Risk in an artwork passes to the consumer on receipt of the goods, or on receipt by a
          carrier chosen by the consumer that we did not offer, consistent with applicable EU
          consumer protection rules.
        </p>
      </section>
      <section>
        <h2>9. Withdrawal, cancellations, and returns</h2>
        <p>
          Where you are a consumer ordering from the EU, you may have a statutory right of
          withdrawal, subject to legally valid exceptions (for example genuinely custom-made or
          personalized artworks). Full detail is in our{" "}
          <a href="/legal/returns">Returns &amp; Cancellations Policy</a>. Nothing in these Terms
          removes a right that cannot legally be waived.
        </p>
      </section>
      <section>
        <h2>10. Damaged or non-conforming goods</h2>
        <p>
          If an artwork arrives damaged or does not conform to its description, contact us with
          your order number and photographs as described in the Returns &amp; Cancellations
          Policy. Your statutory rights regarding non-conforming goods are not affected.
        </p>
      </section>
      <section>
        <h2>11. Intellectual property</h2>
        <p>
          All artwork images, text, quotes, and site content are owned by us or Urška unless
          stated otherwise, and are protected by copyright. Purchasing a physical artwork
          transfers ownership of that physical object only — it does not transfer copyright or
          reproduction rights unless expressly agreed in writing.
        </p>
      </section>
      <section>
        <h2>12. Website use</h2>
        <p>
          You agree to use this site lawfully and not to interfere with its operation or attempt
          to circumvent its security.
        </p>
      </section>
      <section>
        <h2>13. Liability</h2>
        <p>
          Nothing in these Terms limits liability where such limitation is not permitted by
          applicable law (for example for death, personal injury caused by negligence, or fraud).
          Subject to that, our liability is limited to the extent permitted by applicable
          consumer protection law.
        </p>
      </section>
      <section>
        <h2>14. Force majeure</h2>
        <p>
          We are not liable for delay or failure to perform caused by events beyond our
          reasonable control.
        </p>
      </section>
      <section>
        <h2>15. Privacy</h2>
        <p>
          Personal data is handled as described in our <a href="/legal/privacy">Privacy Policy</a>.
        </p>
      </section>
      <section>
        <h2>16. Complaints</h2>
        <p>
          Contact us first at {business.contactEmail} to resolve any complaint. See our{" "}
          <a href="/legal/notice">Legal Notice</a> for applicable dispute resolution contacts.
        </p>
      </section>
      <section>
        <h2>17. Governing law and jurisdiction</h2>
        <p>
          These Terms are governed by the laws of Slovenia, without prejudice to any mandatory
          consumer protection provisions of the country in which you, as a consumer, are
          habitually resident, which continue to apply where applicable law requires it.
        </p>
      </section>
      <section>
        <h2>18. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time; the version in effect at the time of your
          order applies to that order.
        </p>
      </section>
      <section>
        <h2>19. Contact</h2>
        <p>{business.contactEmail}</p>
      </section>
    </LegalPageShell>
  );
}
