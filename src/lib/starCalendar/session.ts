import { cookies } from "next/headers";
import { sign, verify } from "@/lib/signing";

/**
 * A member's login: a signed, httpOnly cookie holding their email and an expiry. No passwords —
 * members sign in with a link sent to their email.
 */

export const SESSION_COOKIE = "sbc_session";
const SESSION_DAYS = 60;

export function sessionValue(email: string): { value: string; maxAge: number } {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400;
  const e = email.toLowerCase();
  return { value: `${Buffer.from(e).toString("base64url")}.${exp}.${sign(`session:${e}:${exp}`)}`, maxAge: SESSION_DAYS * 86400 };
}

export function readSession(value: string | undefined): string | null {
  if (!value) return null;
  const [encoded, expRaw, token] = value.split(".");
  if (!encoded || !expRaw || !token) return null;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return null;
  const email = Buffer.from(encoded, "base64url").toString();
  return verify(`session:${email}:${exp}`, token) ? email : null;
}

export async function currentMemberEmail(): Promise<string | null> {
  const jar = await cookies();
  return readSession(jar.get(SESSION_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
};

/** Magic sign-in link token, valid for 30 minutes. */
export function loginToken(email: string): { exp: number; t: string } {
  const exp = Math.floor(Date.now() / 1000) + 30 * 60;
  return { exp, t: sign(`login:${email.toLowerCase()}:${exp}`) };
}

export function verifyLoginToken(email: string, exp: number, token: string): boolean {
  return Number.isFinite(exp) && exp * 1000 > Date.now() && verify(`login:${email.toLowerCase()}:${exp}`, token);
}
