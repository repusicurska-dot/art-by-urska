import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Returns & Cancellations — Art by Urška",
  alternates: { canonical: "/legal/returns" },
};

export default function ReturnsPage() {
  return (
    <LegalPageShell title="Returns & Cancellations Policy" updated="2026-08-25">
      <section>
        <h2>1. This policy depends on what you bought</h2>
        <p>
          Your rights differ depending on whether the artwork you bought is a standard, ready-made
          original; made to order; or genuinely personalized/custom-made to your specification.
          Each artwork&rsquo;s product page states which category it falls into.
        </p>
      </section>
      <section>
        <h2>2. Standard/ready-made artworks — your right of withdrawal</h2>
        <p>
          If you are a consumer buying from within the EU, you generally have the right to
          withdraw from your order within 14 days of receiving the artwork, without giving a
          reason, for artworks that are not made or personalized specifically for you. To
          withdraw, contact us at {business.contactEmail} with your order number before the
          14-day period ends. You are responsible for return shipping costs unless we state
          otherwise, and the artwork must be returned in the condition it was received.
        </p>
      </section>
      <section>
        <h2>3. Made-to-order and personalized artworks — exception</h2>
        <p>
          Where an artwork is genuinely made to order or personalized to your specification after
          you place the order, the statutory right of withdrawal does not apply, as permitted by
          EU consumer law for custom-made and personalized goods. We will state clearly on the
          artwork or order page whenever this exception applies — it is not assumed automatically
          for every piece.
        </p>
      </section>
      <section>
        <h2>4. Digital products</h2>
        <p>
          We do not currently sell digital products. If we introduce any in the future, this
          section will be updated with the applicable withdrawal rules for digital content.
        </p>
      </section>
      <section>
        <h2>5. How to cancel or return an order</h2>
        <p>
          Email {business.contactEmail} with your order number and, if returning a received item,
          confirmation that it is unused and in its original condition. We will confirm the
          return address (see also {business.returnsAddress}) and next steps, including refund
          timing once the return is received and inspected.
        </p>
      </section>
      <section>
        <h2>6. Damaged artwork</h2>
        <p>
          If your artwork arrives damaged, contact us at {business.contactEmail} as soon as
          possible with:
        </p>
        <ul>
          <li>Your order number</li>
          <li>A description of the damage</li>
          <li>Photographs of the outer packaging</li>
          <li>Photographs of the damage itself</li>
        </ul>
        <p>
          We will work with you on a repair, replacement, or refund as appropriate. This does not
          affect your other statutory rights regarding goods that do not conform to their
          description.
        </p>
      </section>
      <section>
        <h2>7. Conformity and statutory rights</h2>
        <p>
          Nothing in this policy limits your statutory rights as a consumer regarding goods that
          do not conform to their description, are defective, or are not as described.
        </p>
      </section>
      <section>
        <h2>8. Contact</h2>
        <p>{business.contactEmail}</p>
      </section>
    </LegalPageShell>
  );
}
