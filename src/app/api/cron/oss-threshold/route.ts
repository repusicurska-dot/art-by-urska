import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedCron } from "@/lib/cron";
import { isEmailConfigured, sendEmail } from "@/lib/email";
import { isRedisConfigured } from "@/lib/redis";
import { OSS_ALERT_EMAILS, OSS_THRESHOLD_EUR, OSS_WARNING_EUR, computeOssStatus, ossLevel } from "@/lib/ossThreshold";

const eur = (n: number) => `${n.toLocaleString("sl-SI", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

/**
 * Daily (vercel.json): recomputes this year's cross-border EU consumer sales from Stripe and,
 * from €9,000 on, emails Urška and Teo every day until the year ends.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.STRIPE_SECRET_KEY || !isRedisConfigured()) {
    return NextResponse.json({ skipped: "stripe or database not configured" });
  }

  const status = await computeOssStatus();
  const level = ossLevel(status);

  if (level !== "ok" && isEmailConfigured()) {
    const countries = Object.entries(status.byCountry)
      .sort((a, b) => b[1] - a[1])
      .map(([c, v]) => `  • ${c}: ${eur(v)}`)
      .join("\n");
    const exceeded = level === "exceeded";
    for (const to of OSS_ALERT_EMAILS) {
      await sendEmail({
        to,
        subject: exceeded
          ? `🚨 DDV: prag 10.000 € za prodajo v EU je PRESEŽEN (${eur(status.totalEur)})`
          : `⚠️ DDV: prodaja kupcem v EU je ${eur(status.totalEur)} — prag 10.000 € je blizu`,
        text: [
          exceeded
            ? `Prodaja potrošnikom v drugih državah EU je letos ${eur(status.totalEur)} in je presegla prag ${eur(OSS_THRESHOLD_EUR)}.`
            : `Prodaja potrošnikom v drugih državah EU je letos ${eur(status.totalEur)}. Opozorilo se pošilja od ${eur(OSS_WARNING_EUR)}; prag je ${eur(OSS_THRESHOLD_EUR)}.`,
          "",
          exceeded
            ? "Za nadaljnjo prodajo kupcem v drugih državah EU je treba obračunati DDV države kupca (sistem OSS / VEM). TAKOJ se posvetuj z računovodjo."
            : "Ko prag preseže 10.000 €, se je treba vpisati v sistem OSS / VEM in obračunati DDV države kupca. Posvetuj se z računovodjo zdaj, pred naslednjo prodajo v tujino.",
          "",
          "Po državah:",
          countries || "  (ni podatkov)",
          ...(status.unknownCountryEur > 0
            ? ["", `Plačila brez znane države (niso všteta, preveri v Stripu): ${eur(status.unknownCountryEur)}`]
            : []),
          "",
          "Šteje: naročnina Zvezdni poslovni koledar + slike, plačane prek Stripa, kupci iz EU razen Slovenije. Kupci izven EU se ne štejejo.",
          "To je samodejno opozorilo z byurska.com, ne davčni nasvet. Opozorilo se pošilja vsak dan do konca leta.",
        ].join("\n"),
      });
    }
  }

  return NextResponse.json({ level, ...status });
}
