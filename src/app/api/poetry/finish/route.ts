import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeClient } from "@/lib/payments";
import { applyPoetrySubscription } from "@/lib/poetry/subscription";
import { sendPoetryWelcome } from "@/lib/poetry/emails";
import { SESSION_COOKIE, SIGNED_IN_HINT, hintCookieOptions, sessionCookieOptions, sessionValue } from "@/lib/starCalendar/session";
import { getMember, saveMember } from "@/lib/starCalendar/store";

/** Stripe returns here after the Poetry checkout: record it, sign them in, welcome them. */
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id") ?? "";
  const fail = NextResponse.redirect(new URL("/poetry?error=checkout", request.url), 303);
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return fail;

  let session: Stripe.Checkout.Session;
  try {
    session = await getStripeClient().checkout.sessions.retrieve(sessionId, { expand: ["subscription"] });
  } catch {
    return fail;
  }
  const email = (session.metadata?.email ?? session.customer_details?.email ?? "").toLowerCase();
  const sub = session.subscription;
  if (!email || !sub || typeof sub === "string" || session.metadata?.product !== "poetry-letters") return fail;

  const member = await getMember(email);
  if (!member) return fail;
  let updated = await applyPoetrySubscription(member, sub);

  if (!updated.poetry?.welcomedAt) {
    await sendPoetryWelcome(updated);
    updated = { ...updated, poetry: { ...updated.poetry!, welcomedAt: new Date().toISOString() } };
    await saveMember(updated);
  }

  const response = NextResponse.redirect(new URL("/poetry/moj?welcome=1", request.url), 303);
  const { value, maxAge } = sessionValue(email);
  response.cookies.set(SESSION_COOKIE, value, { ...sessionCookieOptions, maxAge });
  response.cookies.set(SIGNED_IN_HINT, "1", { ...hintCookieOptions, maxAge });
  return response;
}
