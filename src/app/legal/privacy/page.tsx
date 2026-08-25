import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Privacy Policy — Art by Urška",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy Policy" updated="2026-08-25">
      <section>
        <h2>1. Who controls your data</h2>
        <p>
          {business.legalName} ({business.legalForm}), {business.registeredAddress},
          {" "}{business.country}, is the data controller for personal data processed through
          this website. Contact: {business.dataProtectionContact}.
        </p>
      </section>
      <section>
        <h2>2. What we collect and why</h2>
        <ul>
          <li>
            <strong>Order and inquiry data</strong> (name, email, message, shipping destination,
            and — once payment is live — billing/shipping address) to process orders and respond
            to inquiries. Legal basis: performance of a contract / steps prior to entering one.
          </li>
          <li>
            <strong>Payment data</strong>: handled directly by our payment provider once online
            payment is live; we do not store full card numbers. Legal basis: performance of a
            contract.
          </li>
          <li>
            <strong>Cookie data</strong>: see our <a href="/legal/cookies">Cookie Policy</a>. Only
            strictly necessary cookies are currently used. Legal basis: legitimate interest
            (necessary cookies) or consent (any future analytics/marketing cookies).
          </li>
        </ul>
      </section>
      <section>
        <h2>3. Recipients and processors</h2>
        <p>
          We only list services actually in use. As of this writing, the technologies used to
          run this site are: Next.js hosting/infrastructure (host TBC), and — once enabled — a
          payment processor for checkout. This list will be updated as soon as analytics, email,
          or other processors are actually added; none are in use today.
        </p>
      </section>
      <section>
        <h2>4. International transfers</h2>
        <p>
          Where a processor we use is located outside the EU/EEA, we rely on an appropriate
          safeguard (such as the EU Standard Contractual Clauses) as required by GDPR. This
          section will be completed with the specific processors once they are selected.
        </p>
      </section>
      <section>
        <h2>5. Retention</h2>
        <p>
          Order and contract-related data is kept for as long as required by applicable tax and
          commercial law. Inquiry messages are kept only as long as needed to respond and for a
          reasonable follow-up period.
        </p>
      </section>
      <section>
        <h2>6. Your rights</h2>
        <p>
          Under GDPR, you may have the right to access, correct, delete, or port your personal
          data, to object to or restrict certain processing, and to withdraw consent at any time.
          Contact {business.dataProtectionContact} to exercise these rights. You also have the
          right to lodge a complaint with your local data protection supervisory authority — in
          Slovenia, the Information Commissioner (Informacijski pooblaščenec).
        </p>
      </section>
      <section>
        <h2>7. Contact</h2>
        <p>{business.dataProtectionContact}</p>
      </section>
    </LegalPageShell>
  );
}
