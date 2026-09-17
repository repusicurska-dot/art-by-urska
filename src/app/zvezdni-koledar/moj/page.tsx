import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { monthSummary } from "@/lib/astro/texts";
import { ljubljanaDate } from "@/lib/bookings";
import { getSiteUrl } from "@/lib/siteUrl";
import { syncMember } from "@/lib/starCalendar/billing";
import { memberMonth, memberSunSign } from "@/lib/starCalendar/readings";
import { currentMemberEmail } from "@/lib/starCalendar/session";
import { feedUrls, getMember, hasAccess, isComplimentary } from "@/lib/starCalendar/store";
import MemberCalendar from "@/components/starCalendar/MemberCalendar";

export const metadata: Metadata = {
  title: "Moj koledar — Zvezdni poslovni koledar",
  robots: { index: false },
};

export default async function MemberPage({
  searchParams,
}: {
  searchParams: Promise<{ m?: string; welcome?: string }>;
}) {
  const email = await currentMemberEmail();
  if (!email) redirect("/zvezdni-koledar/prijava");
  const cached = await getMember(email);
  if (!cached) redirect("/zvezdni-koledar/prijava");
  const member = await syncMember(cached);

  const { m, welcome } = await searchParams;
  const today = ljubljanaDate();
  const [ty, tm] = today.split("-").map(Number);
  let year = ty;
  let month = tm;
  if (m && /^\d{4}-\d{2}$/.test(m)) {
    const [my, mm] = m.split("-").map(Number);
    // Allow browsing from last month up to a year ahead.
    const offset = (my - ty) * 12 + (mm - tm);
    if (offset >= -1 && offset <= 12 && mm >= 1 && mm <= 12) {
      year = my;
      month = mm;
    }
  }

  // A member can reach this page without birth data — someone who subscribed to the Poetry
  // letters first has an account but no chart yet. Nothing astronomical may be computed then.
  const hasBirth = /^\d{4}-\d{2}-\d{2}$/.test(member.birthDate);
  const active = hasAccess(member) && hasBirth;
  const days = active ? memberMonth(member, year, month) : [];
  const sunSign = hasBirth ? memberSunSign(member) : null;

  return (
    <MemberCalendar
      member={{
        email: member.email,
        lang: member.lang,
        birthDate: member.birthDate,
        birthTime: member.birthTime,
        birthTimeZone: member.birthTimeZone,
        status: member.status,
        accessUntil: member.accessUntil ?? null,
        cancelAtPeriodEnd: !!member.cancelAtPeriodEnd,
        complimentary: isComplimentary(member.email),
        hasPassword: !!member.passwordHash,
        hasBirth,
      }}
      active={active}
      year={year}
      month={month}
      today={today}
      days={days}
      summary={
        active && sunSign ? { sl: monthSummary(days, "sl", sunSign), en: monthSummary(days, "en", sunSign) } : null
      }
      sunSign={sunSign}
      feed={feedUrls(member, getSiteUrl())}
      welcome={!!welcome}
    />
  );
}
