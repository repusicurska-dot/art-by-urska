import type { DayReading } from "@/lib/astro/calendar";
import { CATEGORY_EMOJI, PRODUCT_NAME, TYPE_EMOJI, TYPE_LABEL, moonEmoji, type Lang } from "@/lib/astro/texts";
import { getSiteUrl } from "@/lib/siteUrl";
import { dayDescription } from "./readings";

/**
 * A member's private calendar subscription (iPhone / Google / Outlook "subscribe to calendar"):
 * one all-day event per day, e.g. "🤝 Dober za pogodbe 🌒 💰", refreshed by the calendar app.
 */

function escapeText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** RFC 5545 line folding — continuation lines start with a space. Counts UTF-8 bytes. */
function fold(line: string): string {
  const out: string[] = [];
  let current = "";
  let bytes = 0;
  for (const ch of line) {
    const size = Buffer.byteLength(ch);
    if (bytes + size > 73) {
      out.push(current);
      current = " ";
      bytes = 1;
    }
    current += ch;
    bytes += size;
  }
  out.push(current);
  return out.join("\r\n");
}

function compact(date: string) {
  return date.replace(/-/g, "");
}

function nextDay(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
}

export function buildFeed(days: DayReading[], lang: Lang, feedId: string): string {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Art by Urska//Star Business Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(`✨ ${PRODUCT_NAME[lang]}`)}`,
    "X-WR-TIMEZONE:Europe/Ljubljana",
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    "X-PUBLISHED-TTL:PT12H",
  ];
  for (const day of days) {
    const extras = [
      day.stars.love >= 2 ? CATEGORY_EMOJI.love : "",
      day.stars.money >= 2 ? CATEGORY_EMOJI.money : "",
      day.stars.health >= 2 ? CATEGORY_EMOJI.health : "",
    ].join("");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${day.date}-${feedId}@byurska.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(day.date)}`,
      `DTEND;VALUE=DATE:${compact(nextDay(day.date))}`,
      `SUMMARY:${escapeText(`${TYPE_EMOJI[day.type]} ${TYPE_LABEL[day.type][lang]} ${moonEmoji(day.moonPhase)}${extras ? ` ${extras}` : ""}`)}`,
      `DESCRIPTION:${escapeText(`${dayDescription(day, lang)}\n\n${getSiteUrl()}/zvezdni-koledar/moj`)}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n");
}
