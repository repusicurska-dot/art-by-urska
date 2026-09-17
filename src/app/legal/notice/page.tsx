import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { business } from "@/content/business";
import ProtectedEmail from "@/components/shared/ProtectedEmail";

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
          <li>Registration number (matična številka): {business.registrationNumber}</li>
          <li>Tax number (davčna številka): {business.taxNumber}</li>
          <li>VAT: not registered for VAT (ni zavezanec za DDV)</li>
          <li>
            Contact email: <ProtectedEmail />
          </li>
          {business.phone && <li>Phone: {business.phone}</li>}
        </ul>
      </section>
      <section>
        <h2>Represented by</h2>
        <p>Urška Repušič, artist and owner.</p>
      </section>
      <section>
        <h2>Responsible economic operator (GPSR)</h2>
        <p>
          For the purposes of EU product safety rules applicable to physical goods sold to EU
          consumers, the economic operator responsible for the products on this site is the
          business identified above, reachable at <ProtectedEmail /> and the registered
          address above.
        </p>
      </section>
      <section>
        <h2>Dispute resolution</h2>
        <p>
          If you have a complaint, please contact us first at <ProtectedEmail /> — we will reply
          and try to resolve it with you directly. We do not currently recognise a specific
          out-of-court (alternative) dispute resolution provider. Consumers can find the list of
          providers recognised in Slovenia on the website of the Slovenian ministry responsible
          for the economy.
        </p>
      </section>
    </LegalPageShell>
  );
}
