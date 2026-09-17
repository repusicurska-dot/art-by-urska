import type { Metadata } from "next";
import { dayReading } from "@/lib/astro/calendar";
import { ljubljanaDate } from "@/lib/bookings";
import StarCalendarLanding from "@/components/starCalendar/StarCalendarLanding";
import { isAvailable } from "@/lib/starCalendar/validate";

export const metadata: Metadata = {
  title: "Zvezdni poslovni koledar — Art by Urška",
  description:
    "Osebni astrološki koledar za posel in življenje: dnevi za pogodbe, začetke, počitek, ljubezen, denar in zdravje — prilagojen tvoji rojstni karti. 7 dni brezplačno, nato 5,99 € na mesec.",
  alternates: { canonical: "/zvezdni-koledar" },
};

// "Today" has to be today, not the day the site was built.
export const dynamic = "force-dynamic";

export default async function StarCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string; error?: string }>;
}) {
  const { canceled, error } = await searchParams;
  const week = Array.from({ length: 7 }, (_, i) => dayReading(ljubljanaDate(i)));
  return (
    <StarCalendarLanding
      week={week}
      available={isAvailable()}
      notice={canceled ? "canceled" : error ? "error" : null}
    />
  );
}
