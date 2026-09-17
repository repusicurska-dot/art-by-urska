import { randomBytes } from "node:crypto";
import { pipeline, redis } from "./redis";

/**
 * Live reading bookings, stored in Upstash Redis.
 *
 *   booking:<id>          JSON of the booking
 *   slot:<date>T<time>    id of the booking holding that slot (SET NX, so two visitors can
 *                         never hold the same time — the first request wins)
 *   bookings:date:<date>  set of booking ids on that day, for the day-before reminder
 *
 * A request holds its slot straight away (so it disappears from the picker), Urška confirms
 * or declines from the link in her notification email, and declining frees the slot again.
 */

export type BookingStatus = "pending" | "confirmed" | "declined";

export interface Booking {
  id: string;
  name: string;
  email: string;
  message: string;
  packageKey: string;
  format: string;
  lang: "sl" | "en";
  /** YYYY-MM-DD, Slovenian time */
  date: string;
  /** HH:mm, Slovenian time */
  time: string;
  status: BookingStatus;
  createdAt: string;
  reminderSentAt?: string;
}

export const BOOKING_TIME_ZONE = "Europe/Ljubljana";

const bookingKey = (id: string) => `booking:${id}`;
const slotKey = (date: string, time: string) => `slot:${date}T${time}`;
const dateKey = (date: string) => `bookings:date:${date}`;

/** Today's date in Ljubljana, shifted by `offsetDays`, as YYYY-MM-DD. */
export function ljubljanaDate(offsetDays = 0, now = new Date()): string {
  const shifted = new Date(now.getTime() + offsetDays * 86400000);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(shifted);
}

/**
 * Creates a pending booking and holds its slot. Returns null if someone else already holds
 * that slot.
 */
export async function createBooking(
  input: Omit<Booking, "id" | "status" | "createdAt">
): Promise<Booking | null> {
  const booking: Booking = {
    ...input,
    id: randomBytes(9).toString("base64url"),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const held = await redis<string | null>(["SET", slotKey(booking.date, booking.time), booking.id, "NX"]);
  if (held !== "OK") return null;
  await pipeline([
    ["SET", bookingKey(booking.id), JSON.stringify(booking)],
    ["SADD", dateKey(booking.date), booking.id],
  ]);
  return booking;
}

export async function getBooking(id: string): Promise<Booking | null> {
  if (!/^[A-Za-z0-9_-]{6,32}$/.test(id)) return null;
  const raw = await redis<string | null>(["GET", bookingKey(id)]);
  return raw ? (JSON.parse(raw) as Booking) : null;
}

async function saveBooking(booking: Booking) {
  await redis(["SET", bookingKey(booking.id), JSON.stringify(booking)]);
}

export async function setBookingStatus(booking: Booking, status: "confirmed" | "declined"): Promise<Booking> {
  const updated = { ...booking, status };
  await saveBooking(updated);
  if (status === "declined") {
    // Only free the slot if this booking is still the one holding it.
    const holder = await redis<string | null>(["GET", slotKey(booking.date, booking.time)]);
    if (holder === booking.id) await redis(["DEL", slotKey(booking.date, booking.time)]);
  }
  return updated;
}

export async function markReminderSent(booking: Booking) {
  await saveBooking({ ...booking, reminderSentAt: new Date().toISOString() });
}

/** Slots held by pending or confirmed bookings from `fromDate` on, as "YYYY-MM-DDTHH:mm". */
export async function getTakenSlots(fromDate: string): Promise<string[]> {
  const taken: string[] = [];
  let cursor = "0";
  do {
    const [next, keys] = await redis<[string, string[]]>(["SCAN", cursor, "MATCH", "slot:*", "COUNT", 200]);
    cursor = next;
    for (const key of keys) {
      const slot = key.slice("slot:".length);
      if (slot.slice(0, 10) >= fromDate) taken.push(slot);
    }
  } while (cursor !== "0");
  return taken.sort();
}

export async function getBookingsOnDate(date: string): Promise<Booking[]> {
  const ids = await redis<string[]>(["SMEMBERS", dateKey(date)]);
  if (ids.length === 0) return [];
  const raws = await pipeline<string | null>(ids.map((id) => ["GET", bookingKey(id)]));
  return raws
    .filter((raw): raw is string => !!raw)
    .map((raw) => JSON.parse(raw) as Booking)
    .sort((a, b) => a.time.localeCompare(b.time));
}
