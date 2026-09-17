import type { DayReading } from "@/lib/astro/calendar";
import { PRODUCT_NAME, SIGN_NAME, SIGN_SYMBOL, TYPE_EMOJI, TYPE_LABEL, formatDate, monthSummary, moonEmoji } from "@/lib/astro/texts";
import { ownerEmail, sendEmail } from "@/lib/email";
import { getSiteUrl } from "@/lib/siteUrl";
import { memberSunSign } from "./readings";
import { loginToken } from "./session";
import type { Member } from "./store";

/** Every email the Star Business Calendar sends. */

/** Slovenian weekday in the accusative, for "izberi sredo" / "v soboto". */
function weekdaySl(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return ["nedeljo", "ponedeljek", "torek", "sredo", "četrtek", "petek", "soboto"][new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
}

function memberUrl() {
  return `${getSiteUrl()}/zvezdni-koledar/moj`;
}

function footer(member: Member): string {
  return member.lang === "sl"
    ? `\n—\n${PRODUCT_NAME.sl} · Art by Urška\nNaročnino urediš ali odpoveš na ${memberUrl()}\nKoledar je navdih za načrtovanje, ne finančni nasvet.`
    : `\n—\n${PRODUCT_NAME.en} · Art by Urška\nManage or cancel your subscription at ${memberUrl()}\nThe calendar is inspiration for planning, not financial advice.`;
}

export function loginLink(email: string): string {
  const { exp, t } = loginToken(email);
  return `${getSiteUrl()}/api/sbc/login/verify?e=${encodeURIComponent(email.toLowerCase())}&exp=${exp}&t=${t}`;
}

export function sendLoginEmail(member: Member) {
  const sl = member.lang === "sl";
  return sendEmail({
    to: member.email,
    replyTo: ownerEmail(),
    subject: sl ? `🔑 Prijava v ${PRODUCT_NAME.sl}` : `🔑 Sign in to the ${PRODUCT_NAME.en}`,
    text: sl
      ? `Pozdrav,\n\ntukaj je tvoja povezava za prijavo (velja 30 minut):\n${loginLink(member.email)}\n\nČe te prošnje ne prepoznaš, sporočilo preprosto prezri.\n${footer(member)}`
      : `Hi,\n\nhere is your sign-in link (valid for 30 minutes):\n${loginLink(member.email)}\n\nIf you didn't ask for this, just ignore this email.\n${footer(member)}`,
  });
}

export function sendWelcomeEmail(member: Member, feedUrl: string) {
  const sl = member.lang === "sl";
  const sign = memberSunSign(member);
  const until = member.accessUntil ? formatDate(member.accessUntil.slice(0, 10), member.lang, { day: "numeric", month: "long" }) : "";
  return sendEmail({
    to: member.email,
    replyTo: ownerEmail(),
    subject: sl ? "✨ Dobrodošlica v Zvezdnem poslovnem koledarju" : `✨ Welcome to the ${PRODUCT_NAME.en}`,
    text: (sl
      ? [
          "Pozdrav,",
          "",
          `tvoj ${PRODUCT_NAME.sl} je pripravljen. ${SIGN_SYMBOL[sign]} Tvoje sončno znamenje je ${SIGN_NAME[sign].sl}.`,
          "",
          `📅 Tvoj koledar: ${memberUrl()}`,
          `📱 Dodaj ga v telefon (iPhone/Google koledar): ${feedUrl}`,
          "",
          "Kaj te čaka:",
          "🤝 dnevi za pogodbe · 🚀 dnevi za začetke · ⛔ dnevi, ko ne začenjaš ničesar · 🧘 čas zase",
          "💞 ljubezen · 💰 denar · 🌿 zdravje — vse prilagojeno tvoji rojstni karti.",
          "Vsak 1. v mesecu dobiš osebni mesečni horoskop, vsak ponedeljek pa pregled tedna.",
          "",
          member.status === "trialing" && until ? `🎁 Brezplačni preizkus traja do ${until}. Do takrat lahko kadarkoli odpoveš brez plačila.` : "",
          "",
          "Z zvezdami,",
          "Urška",
        ]
      : [
          "Hi,",
          "",
          `your ${PRODUCT_NAME.en} is ready. ${SIGN_SYMBOL[sign]} Your Sun sign is ${SIGN_NAME[sign].en}.`,
          "",
          `📅 Your calendar: ${memberUrl()}`,
          `📱 Add it to your phone (iPhone/Google Calendar): ${feedUrl}`,
          "",
          "What to expect:",
          "🤝 days for contracts · 🚀 days for beginnings · ⛔ days to start nothing · 🧘 time for yourself",
          "💞 love · 💰 money · 🌿 health — all tuned to your birth chart.",
          "Every 1st of the month you get a personal monthly horoscope, and every Monday a look at the week.",
          "",
          member.status === "trialing" && until ? `🎁 Your free trial runs until ${until}. Cancel any time before then and you won't be charged.` : "",
          "",
          "With the stars,",
          "Urška",
        ]
    )
      .join("\n")
      .concat(footer(member)),
  });
}

export function sendMonthlyEmail(member: Member, days: DayReading[]) {
  const summary = monthSummary(days, member.lang, memberSunSign(member));
  return sendEmail({
    to: member.email,
    replyTo: ownerEmail(),
    subject: `🌙 ${summary.title}`,
    text: `${summary.paragraphs.join("\n\n")}\n\n📅 ${memberUrl()}\n${footer(member)}`,
  });
}

export function sendWeeklyEmail(member: Member, week: DayReading[]) {
  const sl = member.lang === "sl";
  const lines = week.map(
    (d) => `${formatDate(d.date, member.lang, { weekday: "short", day: "numeric", month: "numeric" })}  ${TYPE_EMOJI[d.type]} ${TYPE_LABEL[d.type][member.lang]} ${moonEmoji(d.moonPhase)}${d.stars.money >= 2 ? " 💰" : ""}${d.stars.love >= 2 ? " 💞" : ""}${d.stars.health >= 2 ? " 🌿" : ""}`
  );
  const bestContract = week.filter((d) => d.type === "contracts").sort((a, b) => b.scores.contracts - a.scores.contracts)[0];
  const bestStart = week.filter((d) => d.type === "beginnings").sort((a, b) => b.scores.beginnings - a.scores.beginnings)[0];
  const tips: string[] = [];
  if (bestContract) tips.push(sl ? `🤝 Za pomemben podpis izberi ${weekdaySl(bestContract.date)}.` : `🤝 For an important signature, choose ${formatDate(bestContract.date, "en", { weekday: "long" })}.`);
  if (bestStart) tips.push(sl ? `🚀 Nekaj novega zaženi v ${weekdaySl(bestStart.date)}.` : `🚀 Launch something new on ${formatDate(bestStart.date, "en", { weekday: "long" })}.`);
  return sendEmail({
    to: member.email,
    replyTo: ownerEmail(),
    subject: sl ? "✨ Tvoj teden v zvezdah" : "✨ Your week in the stars",
    text: `${sl ? "Pregled tvojega tedna:" : "Your week at a glance:"}\n\n${lines.join("\n")}\n\n${tips.join("\n")}\n\n📅 ${memberUrl()}\n${footer(member)}`,
  });
}
