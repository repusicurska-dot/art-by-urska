import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { sign, verify } from "@/lib/signing";

/**
 * Passwords for Star Business Calendar accounts.
 *
 * Hashed with scrypt (built into Node, memory-hard) and a per-password random salt; the stored
 * string is `scrypt$N$r$p$salt$hash`, so the cost can be raised later without invalidating
 * anyone's password. Plain passwords are never stored or logged.
 *
 * Reset links are signed rather than stored: the token covers the address, an expiry, AND the
 * current password hash, so a link stops working the moment the password changes — including
 * after it has been used once.
 */

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number, options: { N: number; r: number; p: number }) => Promise<Buffer>;

const PARAMS = { N: 16384, r: 8, p: 1 };
const KEY_LENGTH = 64;

export const PASSWORD_MIN_LENGTH = 8;

export function passwordProblem(password: unknown, lang: "sl" | "en"): string | null {
  if (typeof password !== "string" || password.length < PASSWORD_MIN_LENGTH) {
    return lang === "sl"
      ? `Geslo naj ima vsaj ${PASSWORD_MIN_LENGTH} znakov.`
      : `Your password needs at least ${PASSWORD_MIN_LENGTH} characters.`;
  }
  if (password.length > 200) {
    return lang === "sl" ? "Geslo je predolgo." : "That password is too long.";
  }
  return null;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scrypt(password.normalize("NFKC"), salt, KEY_LENGTH, PARAMS);
  return `scrypt$${PARAMS.N}$${PARAMS.r}$${PARAMS.p}$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}

export async function verifyPassword(password: string, stored: string | undefined): Promise<boolean> {
  if (!stored) return false;
  const [scheme, n, r, p, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  try {
    const expected = Buffer.from(hash, "base64url");
    const actual = await scrypt(password.normalize("NFKC"), Buffer.from(salt, "base64url"), expected.length, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
    });
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

/** A reset link's token: valid for an hour, and only while the password is still the old one. */
export function resetToken(email: string, currentHash: string | undefined): { exp: number; t: string } {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60;
  return { exp, t: sign(`reset:${email.toLowerCase()}:${exp}:${currentHash ?? "none"}`) };
}

export function verifyResetToken(
  email: string,
  exp: number,
  token: string,
  currentHash: string | undefined
): boolean {
  if (!Number.isFinite(exp) || exp * 1000 <= Date.now()) return false;
  return verify(`reset:${email.toLowerCase()}:${exp}:${currentHash ?? "none"}`, token);
}
