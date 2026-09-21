import type { Metadata } from "next";
import FinanceContent from "@/components/finance/FinanceContent";

export const metadata: Metadata = {
  title: "Finance by Urška",
  description: "Finance by Urška — how Urška learned money and the markets on My Edge Official.",
  alternates: { canonical: "/finance" },
};

export default function FinancePage() {
  return <FinanceContent />;
}
