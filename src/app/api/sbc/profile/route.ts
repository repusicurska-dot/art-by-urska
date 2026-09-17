import { NextResponse } from "next/server";
import { currentMemberEmail } from "@/lib/starCalendar/session";
import { getMember, saveMember } from "@/lib/starCalendar/store";
import { parseBirth, parseLang } from "@/lib/starCalendar/validate";

/** Member updates their birth data or language. */
export async function POST(request: Request) {
  const email = await currentMemberEmail();
  const member = email ? await getMember(email) : null;
  if (!member) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const lang = parseLang(body.lang);
  const birth = parseBirth(body);
  if (!birth) {
    return NextResponse.json(
      { error: lang === "sl" ? "Preveri datum, uro in kraj rojstva." : "Please check your birth date, time and place." },
      { status: 400 }
    );
  }
  await saveMember({ ...member, ...birth, lang });
  return NextResponse.json({ ok: true });
}
