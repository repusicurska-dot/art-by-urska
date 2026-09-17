import type { Metadata } from "next";
import { URSKA_QUOTES, letterForWeek } from "@/content/poetry";
import { letterView } from "@/lib/poetry/view";
import { currentMemberEmail } from "@/lib/starCalendar/session";
import { isAvailable } from "@/lib/starCalendar/validate";
import { isoWeek } from "@/lib/tarotSubscribers";
import PoetryLanding from "@/components/poetry/PoetryLanding";

export const metadata: Metadata = {
  title: "Poetry by Urška — Letters from the studio",
  description:
    "One letter from the studio every Thursday: a poem or a short piece of writing, with a painting beside it. Read this week's letter free; €4.99 a month for the ones that follow.",
  alternates: { canonical: "/poetry" },
};

// This week's letter has to be this week's.
export const dynamic = "force-dynamic";

export default async function PoetryPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string; error?: string }>;
}) {
  const { canceled, error } = await searchParams;
  const letter = letterForWeek(isoWeek().key);
  return (
    <PoetryLanding
      sample={letter ? { sl: letterView(letter, "sl"), en: letterView(letter, "en") } : null}
      quotes={URSKA_QUOTES}
      available={isAvailable()}
      notice={canceled ? "canceled" : error ? "error" : null}
      signedIn={!!(await currentMemberEmail())}
    />
  );
}
