import { NextResponse } from "next/server";
import { createPoetryCheckout, hasPoetryAccess, setPoetryCancelAtPeriodEnd } from "@/lib/poetry/subscription";
import { currentMemberEmail } from "@/lib/starCalendar/session";
import { getMember } from "@/lib/starCalendar/store";
import { isAvailable } from "@/lib/starCalendar/validate";

/**
 * The Poetry subscription of the signed-in member: start it (for an account that has the
 * calendar but not the letters, or whose letters lapsed), cancel it, or undo a cancellation.
 */
export async function POST(request: Request) {
  const email = await currentMemberEmail();
  const member = email ? await getMember(email) : null;
  if (!member) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const sl = member.lang === "sl";

  const body = (await request.json().catch(() => ({}))) as { action?: unknown };
  const action = body.action;

  if (!isAvailable()) {
    return NextResponse.json({ error: sl ? "Trenutno ni na voljo." : "Not available right now." }, { status: 503 });
  }

  try {
    if (action === "start") {
      if (hasPoetryAccess(member)) {
        return NextResponse.json({ error: sl ? "Naročnina je že aktivna." : "Already active." }, { status: 409 });
      }
      return NextResponse.json({ url: await createPoetryCheckout(member) });
    }
    if (action === "cancel" || action === "resume") {
      const updated = await setPoetryCancelAtPeriodEnd(member, action === "cancel");
      return NextResponse.json({ ok: true, cancelAtPeriodEnd: updated.poetry?.cancelAtPeriodEnd });
    }
  } catch (err) {
    console.error("[poetry] subscription action failed:", err);
    return NextResponse.json(
      { error: sl ? "Ni uspelo. Poskusi znova." : "That didn't work. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
