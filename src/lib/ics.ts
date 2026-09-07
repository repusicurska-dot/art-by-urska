/**
 * Minimal .ics (iCalendar) generator for a single event — no library needed. Used to
 * let a visitor add a proposed reading time to their own calendar app (Apple/Google/
 * Outlook all understand this format) immediately after requesting a time, without
 * needing any backend. This does NOT get emailed anywhere yet — see
 * OWNER_ACTION_REQUIRED.md for wiring up a real reminder + Urška's own calendar sync.
 */
function toIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

export function buildIcsEvent(params: {
  title: string;
  description: string;
  start: Date;
  durationMinutes: number;
  uid: string;
}): string {
  const end = new Date(params.start.getTime() + params.durationMinutes * 60000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Art by Urska//Live Tarot Reading//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${params.uid}`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(params.start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcsText(params.title)}`,
    `DESCRIPTION:${escapeIcsText(params.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs(filename: string, icsContent: string) {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
