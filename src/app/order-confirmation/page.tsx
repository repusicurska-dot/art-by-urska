import type { Metadata } from "next";
import OrderStatus from "@/components/checkout/OrderStatus";

export const metadata: Metadata = {
  title: "Order confirmed — Art by Urška",
  robots: { index: false },
};

export default function OrderConfirmationPage() {
  return <OrderStatus variant="received" />;
}
