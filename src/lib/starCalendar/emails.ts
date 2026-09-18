import type { DayReading } from "@/lib/astro/calendar";
import { PRODUCT_NAME, SIGN_NAME, SIGN_SYMBOL, TYPE_EMOJI, TYPE_LABEL, formatDate, monthSummary, moonEmoji } from "@/lib/astro/texts";
import { ownerEmail, sendEmail } from "@/lib/email";
import { getSiteUrl } from "@/lib/siteUrl";
import { memberSunSign } from "./readings";
import { resetToken } from "./password";
import { loginToken } from "./session";
import { EMAIL_STRINGS, weekdayName } from "./emailStrings";
import type { Member } from "./store";

/** Every email the Star Business Calendar sends, in the member's own language. */

function memberUrl() {
  return `${getSiteUrl()}/zvezdni-koledar/moj`;
}

function footer(member: Member): string {
  const t = EMAIL_STRINGS[member.lang];
  return `\n—\n${PRODUCT_NAME[member.lang]} · Art by Urška\n${t.footerManage} ${memberUrl()}\n${t.footerDisclaimer}`;
}

export function loginLink(email: string): string {
  const { exp, t } = loginToken(email);
  return `${getSiteUrl()}/api/sbc/login/verify?e=${encodeURIComponent(email.toLowerCase())}&exp=${exp}&t=${t}`;
}

export function sendLoginEmail(member: Member) {
  const t = EMAIL_STRINGS[member.lang];
  return sendEmail({
    to: member.email,
    replyTo: ownerEmail(),
    subject: `${t.loginSubject} ${PRODUCT_NAME[member.lang]}`,
    text: `${t.loginBody(loginLink(member.email))}\n${footer(member)}`,
  });
}

export function sendWelcomeEmail(member: Member, feedUrl: string) {
  const t = EMAIL_STRINGS[member.lang];
  const product = PRODUCT_NAME[member.lang];
  const sign = memberSunSign(member);
  const until = member.accessUntil ? formatDate(member.accessUntil.slice(0, 10), member.lang, { day: "numeric", month: "long" }) : "";
  return sendEmail({
    to: member.email,
    replyTo: ownerEmail(),
    subject: `${t.welcomeSubject} ${product}`,
    text: [
      t.welcomeGreeting,
      "",
      t.welcomeReady(product, SIGN_SYMBOL[sign], SIGN_NAME[sign][member.lang]),
      "",
      `${t.welcomeCalendar} ${memberUrl()}`,
      `${t.welcomePhone} ${feedUrl}`,
      "",
      t.welcomeWhat,
      t.welcomeDayTypes,
      t.welcomeAreas,
      t.welcomeCadence,
      "",
      member.status === "trialing" && until ? t.welcomeTrial(until) : "",
      "",
      t.welcomeSignOff,
      "Urška",
    ]
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
  const t = EMAIL_STRINGS[member.lang];
  const lines = week.map(
    (d) => `${formatDate(d.date, member.lang, { weekday: "short", day: "numeric", month: "numeric" })}  ${TYPE_EMOJI[d.type]} ${TYPE_LABEL[d.type][member.lang]} ${moonEmoji(d.moonPhase)}${d.stars.money >= 2 ? " 💰" : ""}${d.stars.love >= 2 ? " 💞" : ""}${d.stars.health >= 2 ? " 🌿" : ""}`
  );
  const bestContract = week.filter((d) => d.type === "contracts").sort((a, b) => b.scores.contracts - a.scores.contracts)[0];
  const bestStart = week.filter((d) => d.type === "beginnings").sort((a, b) => b.scores.beginnings - a.scores.beginnings)[0];
  const tips: string[] = [];
  if (bestContract) tips.push(t.tipContract(weekdayName(bestContract.date, member.lang)));
  if (bestStart) tips.push(t.tipStart(weekdayName(bestStart.date, member.lang)));
  return sendEmail({
    to: member.email,
    replyTo: ownerEmail(),
    subject: t.weeklySubject,
    text: `${t.weeklyIntro}\n\n${lines.join("\n")}\n\n${tips.join("\n")}\n\n📅 ${memberUrl()}\n${footer(member)}`,
  });
}

export function passwordResetUrl(member: Member): string {
  const { exp, t } = resetToken(member.email, member.passwordHash);
  return `${getSiteUrl()}/zvezdni-koledar/geslo?e=${encodeURIComponent(member.email.toLowerCase())}&exp=${exp}&t=${t}`;
}

/** "I forgot my password" — a link that works for an hour, and only until the password changes. */
export function sendPasswordResetEmail(member: Member) {
  const t = EMAIL_STRINGS[member.lang];
  return sendEmail({
    to: member.email,
    replyTo: ownerEmail(),
    subject: `${t.resetSubject} ${PRODUCT_NAME[member.lang]}`,
    text: `${t.resetBody(passwordResetUrl(member))}\n${footer(member)}`,
  });
}

/** A quiet confirmation, so a password change nobody made doesn't go unnoticed. */
export function sendPasswordChangedEmail(member: Member) {
  const t = EMAIL_STRINGS[member.lang];
  return sendEmail({
    to: member.email,
    replyTo: ownerEmail(),
    subject: t.changedSubject,
    text: `${t.changedBody(PRODUCT_NAME[member.lang])}\n${footer(member)}`,
  });
}
