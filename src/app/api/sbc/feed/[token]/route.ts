import { NextResponse } from "next/server";
import { syncMember } from "@/lib/starCalendar/billing";
import { buildFeed } from "@/lib/starCalendar/feed";
import { memberUpcoming } from "@/lib/starCalendar/readings";
import { hasAccess, memberByFeedToken } from "@/lib/starCalendar/store";

/** A member's private calendar feed: the last week and the next 60 days. */
export async function GET(_request: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const cleanToken = token.replace(/\.ics$/, "");
  const found = await memberByFeedToken(cleanToken);
  const member = found ? await syncMember(found, 360) : null;
  if (!member || !hasAccess(member)) {
    return new NextResponse("Subscription inactive", { status: 404 });
  }
  const days = memberUpcoming(member, 60);
  return new NextResponse(buildFeed(days, member.lang, cleanToken.slice(0, 8)), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="zvezdni-koledar.ics"',
      "Cache-Control": "private, max-age=3600",
    },
  });
}
