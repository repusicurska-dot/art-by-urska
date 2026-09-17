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

/**
 * Same event, but pinned to a named time zone rather than an instant. Used server-side for
 * the .ics attached to Urška's booking notification: the slot picker offers wall-clock
 * times ("10:00") meant as Slovenian time, and the server runs in UTC, so converting through
 * a Date there would shift the reading by an hour or two.
 */
export function buildIcsEventInZone(params: {
  title: string;
  description: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:mm, 24h */
  time: string;
  durationMinutes: number;
  uid: string;
  tzid: string;
}): string {
  const [y, m, d] = params.date.split("-").map(Number);
  const [h, min] = params.time.split(":").map(Number);
  // Date.UTC is only used as a calendar calculator here, so the end can roll past midnight.
  const toLocal = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").split(".")[0];
  const startMs = Date.UTC(y, m - 1, d, h, min);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Art by Urska//Live Tarot Reading//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${params.uid}`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART;TZID=${params.tzid}:${toLocal(startMs)}`,
    `DTEND;TZID=${params.tzid}:${toLocal(startMs + params.durationMinutes * 60000)}`,
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
