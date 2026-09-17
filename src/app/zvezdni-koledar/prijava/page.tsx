import type { Metadata } from "next";
import StarCalendarLogin from "@/components/starCalendar/StarCalendarLogin";

export const metadata: Metadata = {
  title: "Prijava — Art by Urška",
  robots: { index: false },
};

/** The two member pages this form is allowed to send someone to after signing in. */
const DESTINATIONS = ["/zvezdni-koledar/moj", "/poetry/moj"] as const;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string; next?: string }>;
}) {
  const { expired, next } = await searchParams;
  const destination = DESTINATIONS.find((d) => d === next) ?? "/zvezdni-koledar/moj";
  return <StarCalendarLogin expired={!!expired} next={destination} />;
}
