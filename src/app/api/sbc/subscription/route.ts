import { NextResponse } from "next/server";
import { setCancelAtPeriodEnd } from "@/lib/starCalendar/billing";
import { currentMemberEmail } from "@/lib/starCalendar/session";
import { getMember } from "@/lib/starCalendar/store";

/** Cancel (at the end of the paid period / trial) or undo a cancellation. */
export async function POST(request: Request) {
  const email = await currentMemberEmail();
  const member = email ? await getMember(email) : null;
  if (!member?.stripeSubscriptionId) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as { action?: unknown };
  if (body.action !== "cancel" && body.action !== "resume") {
    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }
  try {
    const updated = await setCancelAtPeriodEnd(member, body.action === "cancel");
    return NextResponse.json({ ok: true, cancelAtPeriodEnd: updated.cancelAtPeriodEnd, accessUntil: updated.accessUntil });
  } catch (err) {
    console.error("[sbc] subscription update failed:", err);
    return NextResponse.json(
      { error: member.lang === "sl" ? "Spremembe ni bilo mogoče shraniti. Poskusi znova." : "Couldn't save the change. Please try again." },
      { status: 502 }
    );
  }
}
