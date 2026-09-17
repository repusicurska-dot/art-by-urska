import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeClient } from "@/lib/payments";
import { getSiteUrl } from "@/lib/siteUrl";
import { applySubscription } from "@/lib/starCalendar/billing";
import { sendWelcomeEmail } from "@/lib/starCalendar/emails";
import { SESSION_COOKIE, SIGNED_IN_HINT, hintCookieOptions, sessionCookieOptions, sessionValue } from "@/lib/starCalendar/session";
import { feedUrls, getMember, saveMember } from "@/lib/starCalendar/store";

/** Stripe Checkout returns here: record the subscription, sign the member in, welcome them. */
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id") ?? "";
  const fail = NextResponse.redirect(new URL("/zvezdni-koledar?error=checkout", request.url), 303);
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return fail;

  let session: Stripe.Checkout.Session;
  try {
    session = await getStripeClient().checkout.sessions.retrieve(sessionId, { expand: ["subscription"] });
  } catch {
    return fail;
  }
  const email = (session.metadata?.email ?? session.customer_details?.email ?? "").toLowerCase();
  const sub = session.subscription;
  if (!email || !sub || typeof sub === "string" || session.metadata?.product !== "star-business-calendar") return fail;

  const member = await getMember(email);
  if (!member) return fail;
  let updated = await applySubscription(member, sub);

  if (!updated.welcomedAt) {
    await sendWelcomeEmail(updated, feedUrls(updated, getSiteUrl()).webcal);
    updated = { ...updated, welcomedAt: new Date().toISOString() };
    await saveMember(updated);
  }

  const response = NextResponse.redirect(new URL("/zvezdni-koledar/moj?welcome=1", request.url), 303);
  const { value, maxAge } = sessionValue(email);
  response.cookies.set(SESSION_COOKIE, value, { ...sessionCookieOptions, maxAge });
  response.cookies.set(SIGNED_IN_HINT, "1", { ...hintCookieOptions, maxAge });
  return response;
}
