import type { Metadata } from "next";
import CartContent from "@/components/cart/CartContent";

export const metadata: Metadata = {
  title: "Cart — Art by Urška",
  robots: { index: false },
};

export default function CartPage() {
  return <CartContent />;
}
