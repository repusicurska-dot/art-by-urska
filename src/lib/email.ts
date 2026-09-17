/**
 * Email delivery through Resend (https://resend.com) — plain fetch against its REST API,
 * no SDK dependency. Server-only: the API key must never reach the browser.
 *
 * Needs three environment variables in Vercel (and .env.local for local testing):
 *   RESEND_API_KEY  — from resend.com → API Keys
 *   EMAIL_FROM      — a sender on the domain verified in Resend,
 *                     e.g. "Art by Urška <obvestila@byurska.com>"
 *   OWNER_EMAIL     — Urška's own inbox, where new messages and bookings land
 *
 * Until all three are set, the forms keep their old behaviour (validate, accept, deliver
 * nothing) and log a warning, so an unconfigured preview deployment doesn't show visitors
 * an error for something they can't fix.
 */

const RESEND_API = "https://api.resend.com";

export interface EmailAttachment {
  filename: string;
  /** Raw text content — encoded to base64 here. */
  content: string;
  contentType: string;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM && process.env.OWNER_EMAIL);
}

export function ownerEmail(): string {
  return process.env.OWNER_EMAIL ?? "";
}

export function warnEmailNotConfigured(form: string) {
  console.warn(
    `[email] ${form}: RESEND_API_KEY / EMAIL_FROM / OWNER_EMAIL not set — submission accepted but not delivered.`
  );
}

async function resend(path: string, body: unknown): Promise<boolean> {
  try {
    const res = await fetch(`${RESEND_API}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`[email] Resend ${path} failed: ${res.status} ${await res.text()}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[email] Resend ${path} unreachable:`, err);
    return false;
  }
}

export function sendEmail(params: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}): Promise<boolean> {
  return resend("/emails", {
    from: process.env.EMAIL_FROM,
    to: params.to,
    subject: params.subject,
    text: params.text,
    ...(params.replyTo ? { reply_to: params.replyTo } : {}),
    ...(params.attachments
      ? {
          attachments: params.attachments.map((a) => ({
            filename: a.filename,
            content: Buffer.from(a.content, "utf-8").toString("base64"),
            content_type: a.contentType,
          })),
        }
      : {}),
  });
}

/** Adds a contact in Resend (Audience → Contacts), so Urška can send them Broadcasts. */
export function addContact(email: string): Promise<boolean> {
  return resend("/contacts", { email, unsubscribed: false });
}

/** Strips line breaks so user input can't forge extra lines in a subject. */
export function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}
