import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { weekThursday } from "@/content/poetry";
import { lettersSentBy } from "@/lib/poetry/schedule";
import { letterView } from "@/lib/poetry/view";
import { hasPoetryAccess, syncPoetry } from "@/lib/poetry/subscription";
import { currentMemberEmail } from "@/lib/starCalendar/session";
import { getMember, hasAccess, isComplimentary } from "@/lib/starCalendar/store";
import { isoWeek } from "@/lib/tarotSubscribers";
import PoetryArchive, { type ArchiveLetter } from "@/components/poetry/PoetryArchive";

export const metadata: Metadata = {
  title: "Moja pisma — Poezija Urške",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function PoetryArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const email = await currentMemberEmail();
  if (!email) redirect("/zvezdni-koledar/prijava?next=/poetry/moj");
  const cached = await getMember(email);
  if (!cached) redirect("/zvezdni-koledar/prijava?next=/poetry/moj");
  const member = await syncPoetry(cached);
  const { welcome } = await searchParams;

  // Only letters that have actually gone out — a letter dated next week isn't a letter yet.
  const thisWeek = isoWeek().key;
  const letters: ArchiveLetter[] = lettersSentBy(thisWeek).map(({ letter, week }) => ({
    id: letter.id,
    week,
    date: weekThursday(week),
    sl: letterView(letter, "sl"),
    en: letterView(letter, "en"),
  }));

  return (
    <PoetryArchive
      member={{
        email: member.email,
        // The letters are written in Slovenian and English; anyone else reads them in English.
        lang: member.lang === "sl" ? "sl" : "en",
        status: member.poetry?.status ?? "pending",
        accessUntil: member.poetry?.accessUntil ?? null,
        cancelAtPeriodEnd: !!member.poetry?.cancelAtPeriodEnd,
        complimentary: isComplimentary(member.email),
        hasCalendar: hasAccess(member),
      }}
      active={hasPoetryAccess(member)}
      letters={letters}
      welcome={!!welcome}
    />
  );
}
