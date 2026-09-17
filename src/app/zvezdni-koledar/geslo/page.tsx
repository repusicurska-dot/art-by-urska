import type { Metadata } from "next";
import PasswordReset from "@/components/starCalendar/PasswordReset";

export const metadata: Metadata = {
  title: "Novo geslo — Zvezdni poslovni koledar",
  robots: { index: false, follow: false },
};

export default async function PasswordResetPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string; exp?: string; t?: string }>;
}) {
  const { e, exp, t } = await searchParams;
  return <PasswordReset email={e ?? ""} exp={exp ?? ""} token={t ?? ""} />;
}
