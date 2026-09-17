import { NextResponse } from "next/server";
import { isRedisConfigured } from "@/lib/redis";
import { getTakenSlots, ljubljanaDate } from "@/lib/bookings";

/** Slots already held by a request or booking, so the picker can hide them. */
export async function GET() {
  if (!isRedisConfigured()) return NextResponse.json({ taken: [] });
  try {
    const taken = await getTakenSlots(ljubljanaDate());
    return NextResponse.json({ taken }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[slots] could not read taken slots:", err);
    return NextResponse.json({ taken: [] });
  }
}
