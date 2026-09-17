import { appIcon } from "@/lib/appIcon";

// PNG icons referenced by the web app manifest (app/manifest.ts).
const ICONS: Record<string, { size: number; padding: number }> = {
  "icon-192.png": { size: 192, padding: 0.14 },
  "icon-512.png": { size: 512, padding: 0.14 },
  "maskable-512.png": { size: 512, padding: 0.24 },
};

export function generateStaticParams() {
  return Object.keys(ICONS).map((name) => ({ name }));
}

export async function GET(_request: Request, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  const icon = ICONS[name];
  if (!icon) return new Response("Not found", { status: 404 });
  return appIcon(icon.size, { padding: icon.padding });
}
