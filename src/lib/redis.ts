/**
 * Minimal Upstash Redis client over its REST API — plain fetch, no SDK. Server-only.
 *
 * Created from Vercel → Storage → Upstash for Redis (free tier), connected to this project,
 * which injects KV_REST_API_URL / KV_REST_API_TOKEN (older integrations use the
 * UPSTASH_REDIS_REST_* names — both work). Without them, everything that uses Redis falls
 * back to its pre-database behaviour.
 */

type RedisValue = string | number;

function config() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/+$/, ""), token } : null;
}

export function isRedisConfigured(): boolean {
  return config() !== null;
}

async function call<T>(path: string, body: unknown): Promise<T> {
  const cfg = config();
  if (!cfg) throw new Error("Redis is not configured.");
  const res = await fetch(`${cfg.url}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis ${path || "/"} failed: ${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

/** Runs one command, e.g. redis(["SET", "key", "value", "NX"]). */
export async function redis<T = unknown>(command: RedisValue[]): Promise<T> {
  const data = await call<{ result?: T; error?: string }>("", command.map(String));
  if (data.error) throw new Error(`Redis ${command[0]}: ${data.error}`);
  return data.result as T;
}

/** Runs several commands in one round trip; results come back in the same order. */
export async function pipeline<T = unknown>(commands: RedisValue[][]): Promise<T[]> {
  if (commands.length === 0) return [];
  const data = await call<{ result?: T; error?: string }[]>(
    "/pipeline",
    commands.map((c) => c.map(String))
  );
  return data.map((d) => {
    if (d.error) throw new Error(`Redis pipeline: ${d.error}`);
    return d.result as T;
  });
}
