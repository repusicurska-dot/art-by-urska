import type { NextRequest } from "next/server";

/**
 * Vercel Cron calls these routes with `Authorization: Bearer <CRON_SECRET>` when CRON_SECRET
 * is set in the project. With it set, anything else is rejected. Without it the jobs still
 * run — both are safe to trigger twice (each remembers what it already sent).
 */
export function isAuthorizedCron(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}
