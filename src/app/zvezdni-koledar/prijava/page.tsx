import type { Metadata } from "next";
import StarCalendarLogin from "@/components/starCalendar/StarCalendarLogin";

export const metadata: Metadata = {
  title: "Prijava — Zvezdni poslovni koledar",
  robots: { index: false },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ expired?: string }> }) {
  const { expired } = await searchParams;
  return <StarCalendarLogin expired={!!expired} />;
}
