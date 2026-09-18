"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/astro/texts";

export interface BirthValue {
  birthDate: string;
  birthTime: string;
  birthTimeZone: string;
}

const COMMON_ZONES = [
  "Europe/Ljubljana",
  "Europe/Zagreb",
  "Europe/Vienna",
  "Europe/Rome",
  "Europe/Berlin",
  "Europe/Budapest",
  "Europe/Belgrade",
  "Europe/Sarajevo",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
  "Australia/Sydney",
];

/**
 * Birth date, optional time, and the time zone of the birth place (which is what turns a
 * wall-clock birth time into the real moment the chart is cast for).
 */
const COPY: Record<Lang, { date: string; time: string; place: string; slovenia: string }> = {
  sl: { date: "Datum rojstva", time: "Ura rojstva (neobvezno)", place: "Kraj rojstva (časovni pas)", slovenia: "Slovenija (Europe/Ljubljana)" },
  en: { date: "Birth date", time: "Birth time (optional)", place: "Birth place (time zone)", slovenia: "Slovenia (Europe/Ljubljana)" },
  hr: { date: "Datum rođenja", time: "Sat rođenja (neobavezno)", place: "Mjesto rođenja (vremenska zona)", slovenia: "Slovenija (Europe/Ljubljana)" },
  de: { date: "Geburtsdatum", time: "Geburtszeit (optional)", place: "Geburtsort (Zeitzone)", slovenia: "Slowenien (Europe/Ljubljana)" },
  it: { date: "Data di nascita", time: "Ora di nascita (facoltativa)", place: "Luogo di nascita (fuso orario)", slovenia: "Slovenia (Europe/Ljubljana)" },
};

export default function BirthFields({
  lang,
  value,
  onChange,
}: {
  lang: Lang;
  value: BirthValue;
  onChange: (v: BirthValue) => void;
}) {
  const t = COPY[lang];
  // The full zone list differs between the server and each browser, so it is only added after
  // hydration — the server and the first client render both show just the common zones.
  const [zones, setZones] = useState<string[]>(() =>
    COMMON_ZONES.includes(value.birthTimeZone) ? COMMON_ZONES : [...COMMON_ZONES, value.birthTimeZone]
  );
  useEffect(() => {
    let all: string[] = [];
    try {
      all = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.("timeZone") ?? [];
    } catch {
      all = [];
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setZones((current) => [...current, ...all.filter((z) => !current.includes(z))]);
  }, []);

  useEffect(() => {
    // Default the birth place's zone to the visitor's own when it's not set yet.
    if (value.birthTimeZone) return;
    onChange({ ...value, birthTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Ljubljana" });
  }, [value, onChange]);

  const field = "w-full rounded-sm border border-bone/20 bg-paper px-4 py-3 text-bone focus:border-bone focus:outline-none";
  const label = "mb-2 block text-xs uppercase tracking-widest text-bone";

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="sbc-birth-date" className={label}>
          {t.date}
        </label>
        <input
          id="sbc-birth-date"
          type="date"
          required
          min="1900-01-01"
          value={value.birthDate}
          onChange={(e) => onChange({ ...value, birthDate: e.target.value })}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="sbc-birth-time" className={label}>
          {t.time}
        </label>
        <input
          id="sbc-birth-time"
          type="time"
          value={value.birthTime}
          onChange={(e) => onChange({ ...value, birthTime: e.target.value })}
          className={field}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="sbc-birth-zone" className={label}>
          {t.place}
        </label>
        <select
          id="sbc-birth-zone"
          value={value.birthTimeZone}
          onChange={(e) => onChange({ ...value, birthTimeZone: e.target.value })}
          className={field}
        >
          {zones.map((z) => (
            <option key={z} value={z}>
              {z === "Europe/Ljubljana" ? t.slovenia : z.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
