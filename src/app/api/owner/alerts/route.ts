import { NextResponse } from "next/server";
import { OSS_ALERT_EMAILS, OSS_THRESHOLD_EUR, cachedOssStatus, ossLevel } from "@/lib/ossThreshold";
import { currentMemberEmail } from "@/lib/starCalendar/session";

/**
 * Alerts for the owners only (Urška and Teo, signed in through the Star Business Calendar):
 * currently the EU VAT (OSS) threshold warning. Everyone else gets an empty answer.
 */
export async function GET() {
  const email = await currentMemberEmail();
  if (!email || !OSS_ALERT_EMAILS.includes(email)) {
    return NextResponse.json({ alerts: [] }, { headers: { "Cache-Control": "private, no-store" } });
  }
  const status = await cachedOssStatus();
  const level = ossLevel(status);
  const alerts =
    level === "ok" || !status
      ? []
      : [{ kind: "oss", level, totalEur: status.totalEur, thresholdEur: OSS_THRESHOLD_EUR, checkedAt: status.checkedAt }];
  return NextResponse.json({ alerts }, { headers: { "Cache-Control": "private, no-store" } });
}
