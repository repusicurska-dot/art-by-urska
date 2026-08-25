import type { Metadata } from "next";
import CheckoutContent from "@/components/checkout/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout — Art by Urška",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
