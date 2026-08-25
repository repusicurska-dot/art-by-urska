import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Legal Notice — Art by Urška",
  robots: { index: false },
  alternates: { canonical: "/legal/notice" },
};

export default function LegalNoticePage() {
  return (
    <LegalPageShell title="Legal Notice / Business Information" updated="2026-08-25">
      <section>
        <h2>Operator of this website</h2>
        <p>
          This website is operated by:
          <br />
          {business.legalName} ({business.legalForm})
          <br />
          {business.registeredAddress}
          <br />
          {business.country}
        </p>
        <ul>
          <li>Business registration number: {business.registrationNumber}</li>
          <li>VAT / tax number: {business.vatNumber}</li>
          <li>Contact email: {business.contactEmail}</li>
          <li>Phone: {business.phone}</li>
        </ul>
      </section>
      <section>
        <h2>Represented by</h2>
        <p>Urška, artist and owner.</p>
      </section>
      <section>
        <h2>Responsible economic operator (GPSR)</h2>
        <p>
          For the purposes of EU product safety rules applicable to physical goods sold to EU
          consumers, the economic operator responsible for the products on this site is the
          business identified above, reachable at {business.contactEmail} and the registered
          address above.
        </p>
      </section>
      <section>
        <h2>Dispute resolution</h2>
        <p>
          Consumers in the EU may also refer to the following alternative dispute resolution /
          online dispute resolution contact where applicable: {business.disputeResolutionBody}
        </p>
      </section>
    </LegalPageShell>
  );
}
