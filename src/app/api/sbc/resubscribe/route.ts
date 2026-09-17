import { NextResponse } from "next/server";
import { createSubscriptionCheckout } from "@/lib/starCalendar/billing";
import { currentMemberEmail } from "@/lib/starCalendar/session";
import { getMember, hasAccess } from "@/lib/starCalendar/store";
import { isAvailable } from "@/lib/starCalendar/validate";

/**
 * Checkout for someone who already has an account: whoever abandoned the first payment, or
 * whose subscription ended. The sign-up form refuses an address that already has a password,
 * so this is the way back in — no second account, no second set of birth details.
 */
export async function POST() {
  const email = await currentMemberEmail();
  const member = email ? await getMember(email) : null;
  if (!member) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const sl = member.lang === "sl";

  if (!isAvailable()) {
    return NextResponse.json({ error: sl ? "Trenutno ni na voljo." : "Not available right now." }, { status: 503 });
  }
  if (hasAccess(member)) {
    return NextResponse.json(
      { error: sl ? "Naročnina je že aktivna." : "Your subscription is already active.", code: "already_active" },
      { status: 409 }
    );
  }

  try {
    return NextResponse.json({ url: await createSubscriptionCheckout(member) });
  } catch (err) {
    console.error("[sbc] resubscribe checkout failed:", err);
    return NextResponse.json(
      { error: sl ? "Plačila ni bilo mogoče začeti. Poskusi znova čez nekaj minut." : "Couldn't start checkout. Please try again in a few minutes." },
      { status: 502 }
    );
  }
}
