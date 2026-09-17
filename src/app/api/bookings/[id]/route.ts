import { NextRequest, NextResponse } from "next/server";
import { getBooking, setBookingStatus } from "@/lib/bookings";
import { sendVisitorConfirmed, sendVisitorDeclined } from "@/lib/bookingEmails";
import { verify } from "@/lib/signing";

/**
 * Urška's confirm/decline action, posted from the form on /rezervacija/[id]. A POST rather
 * than a link in the email itself, because mail scanners open links on their own and would
 * otherwise confirm bookings nobody looked at.
 */
export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const form = await request.formData();
  const token = String(form.get("t") ?? "");
  const action = String(form.get("action") ?? "");
  const back = (result: string) =>
    NextResponse.redirect(new URL(`/rezervacija/${id}?t=${encodeURIComponent(token)}&result=${result}`, request.url), 303);

  if (!verify(`booking:${id}`, token)) return back("invalid");
  if (action !== "confirm" && action !== "decline") return back("invalid");

  const booking = await getBooking(id);
  if (!booking) return back("invalid");
  if (booking.status !== "pending") return back(booking.status);

  if (action === "confirm") {
    const updated = await setBookingStatus(booking, "confirmed");
    const sent = await sendVisitorConfirmed(updated);
    return back(sent ? "confirmed" : "confirmed-email-failed");
  }

  const updated = await setBookingStatus(booking, "declined");
  const sent = await sendVisitorDeclined(updated);
  return back(sent ? "declined" : "declined-email-failed");
}
