import { NextRequest, NextResponse } from "next/server";
import { isRedisConfigured } from "@/lib/redis";
import { verify } from "@/lib/signing";
import { removeSubscriber } from "@/lib/tarotSubscribers";

/**
 * Unsubscribe from the weekly card. Two callers:
 * - the button on /odjava (form fields e + t) → redirected back to the page with the result;
 * - mail apps' one-click unsubscribe (RFC 8058), which POSTs "List-Unsubscribe=One-Click" to
 *   the List-Unsubscribe URL with e + t in its query string → plain 200.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  const fromPage = form?.has("e") ?? false;
  const email = String(form?.get("e") ?? request.nextUrl.searchParams.get("e") ?? "").toLowerCase();
  const token = String(form?.get("t") ?? request.nextUrl.searchParams.get("t") ?? "");

  const valid = !!email && isRedisConfigured() && verify(`unsub:${email}`, token);
  if (valid) await removeSubscriber(email);

  if (fromPage) {
    return NextResponse.redirect(new URL(`/odjava?result=${valid ? "done" : "invalid"}`, request.url), 303);
  }
  return new NextResponse(valid ? "Unsubscribed" : "Invalid link", { status: valid ? 200 : 400 });
}
