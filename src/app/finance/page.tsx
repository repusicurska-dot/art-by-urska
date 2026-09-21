import type { Metadata } from "next";
import FinanceContent from "@/components/finance/FinanceContent";

export const metadata: Metadata = {
  title: "Finance by Urška",
  description: "Finance by Urška — a degree in finance, and the markets learned in practice on My Edge Official.",
  alternates: { canonical: "/finance" },
};

export default function FinancePage() {
  return <FinanceContent />;
}
