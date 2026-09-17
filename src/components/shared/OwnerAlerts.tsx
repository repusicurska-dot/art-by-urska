"use client";

import { useEffect, useState } from "react";

interface Alert {
  kind: "oss";
  level: "warning" | "exceeded";
  totalEur: number;
  thresholdEur: number;
}

/**
 * A banner across the top of every page, visible only to the owners while signed in — for now
 * the EU VAT threshold warning. Visitors never see it (the API answers them with nothing).
 */
export default function OwnerAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Only signed-in members can be owners; skip the request for everyone else.
    if (!document.cookie.includes("sbc_signed_in=1")) return;
    fetch("/api/owner/alerts", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { alerts?: Alert[] }) => setAlerts(d.alerts ?? []))
      .catch(() => {});
  }, []);

  if (alerts.length === 0) return null;
  return (
    <div role="alert" className="relative z-[60]">
      {alerts.map((a) => (
        <div
          key={a.kind}
          className="px-4 py-3 text-center text-sm font-medium"
          style={{ background: a.level === "exceeded" ? "#9b1c31" : "#b7791f", color: "#fff" }}
        >
          {a.level === "exceeded" ? "🚨" : "⚠️"} DDV / OSS:{" "}
          {a.totalEur.toLocaleString("sl-SI", { minimumFractionDigits: 2 })} € prodaje kupcem v drugih državah EU letos
          {a.level === "exceeded"
            ? ` — prag ${a.thresholdEur.toLocaleString("sl-SI")} € je presežen. Takoj se posvetuj z računovodjo.`
            : ` — prag je ${a.thresholdEur.toLocaleString("sl-SI")} €. Posvetuj se z računovodjo pred naslednjo prodajo v tujino.`}
        </div>
      ))}
    </div>
  );
}
