import { LETTERS, type PoetryLetter } from "@/content/poetry";
import { ownerEmail, sendEmail } from "@/lib/email";
import { getSiteUrl } from "@/lib/siteUrl";
import type { Member } from "@/lib/starCalendar/store";

/** The emails of the Poetry subscription. */

function archiveUrl() {
  return `${getSiteUrl()}/poetry/moj`;
}

function footer(member: Member): string {
  return member.lang === "sl"
    ? `\n—\nPisma iz ateljeja · Art by Urška\nNaročnino urediš ali odpoveš na ${archiveUrl()}`
    : `\n—\nLetters from the studio · Art by Urška\nManage or cancel your subscription at ${archiveUrl()}`;
}

export function sendPoetryWelcome(member: Member) {
  const sl = member.lang === "sl";
  const first = LETTERS[0];
  return sendEmail({
    to: member.email,
    replyTo: ownerEmail(),
    subject: sl ? "🕊️ Dobrodošlica — Pisma iz ateljeja" : "🕊️ Welcome — Letters from the studio",
    text: (sl
      ? [
          "Pozdrav,",
          "",
          "hvala, ker si tukaj. Vsak četrtek ti pošljem eno pismo iz ateljeja: kratko besedilo ali pesem in eno sliko ob njej.",
          "",
          `📜 Vsa pisma na enem mestu: ${archiveUrl()}`,
          first ? `\nPrvo pismo, ki te čaka: „${first.title.sl}“` : "",
          "",
          "Če ti kdaj katera vrstica sede, mi lahko preprosto odgovoriš na to sporočilo.",
          "",
          "Z besedami,",
          "Urška",
        ]
      : [
          "Hi,",
          "",
          "thank you for being here. Every Thursday I send one letter from the studio: a short piece of writing or a poem, with one painting beside it.",
          "",
          `📜 Every letter in one place: ${archiveUrl()}`,
          first ? `\nThe first letter waiting for you: “${first.title.en}”` : "",
          "",
          "If a line ever lands, you can simply reply to this email.",
          "",
          "In words,",
          "Urška",
        ]
    )
      .join("\n")
      .concat(footer(member)),
  });
}

export function sendPoetryLetter(member: Member, letter: PoetryLetter) {
  const sl = member.lang === "sl";
  const lang = sl ? "sl" : "en";
  return sendEmail({
    to: member.email,
    replyTo: ownerEmail(),
    subject: `🕊️ ${letter.title[lang]}`,
    text: `${letter.title[lang]}\n\n${letter.body[lang]}\n\n📜 ${archiveUrl()}#${letter.id}${footer(member)}`,
  });
}
