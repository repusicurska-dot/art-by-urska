import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Cookie Policy — Art by Urška",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPageShell title="Cookie Policy" updated="2026-08-25">
      <section>
        <h2>1. What cookies we use</h2>
        <p>
          When you first visit, a banner lets you Accept All, Reject Non-Essential, or Manage
          Preferences by category. You can revisit your choice at any time via &ldquo;Cookie
          Preferences&rdquo; in the footer.
        </p>
        <ul>
          <li>
            <strong>Necessary</strong> — required for the site to function (e.g. remembering your
            cart and your cookie choice itself). Always on.
          </li>
          <li>
            <strong>Analytics</strong> — would help us understand site usage. Not currently in use.
          </li>
          <li>
            <strong>Marketing</strong> — would be used to personalize offers. Not currently in use.
          </li>
          <li>
            <strong>Preferences</strong> — would remember display choices. Not currently in use.
          </li>
        </ul>
      </section>
      <section>
        <h2>2. Current status</h2>
        <p>
          This site does not currently run any analytics or marketing scripts — only the
          necessary cookies described above. Any analytics or marketing technology added in the
          future will only activate for visitors who have consented to that category, and this
          page will be updated to name it.
        </p>
      </section>
      <section>
        <h2>3. Managing your choice</h2>
        <p>
          Your consent choice is stored in your browser&rsquo;s local storage. You can change it
          at any time via &ldquo;Cookie Preferences&rdquo; in the site footer, or by clearing your
          browser&rsquo;s site data.
        </p>
      </section>
      <section>
        <h2>4. Contact</h2>
        <p>{business.contactEmail}</p>
      </section>
    </LegalPageShell>
  );
}
