import type { Lang } from "@/components/spirituality/lang";
import { TAROT_CARDS } from "@/components/spirituality/tarotData";
import type { InstantReadingResult, InstantTopic } from "@/components/spirituality/instantReadingData";
import type { Answer, CardTopicText } from "./types";
import { TEXT_SL } from "./text.sl";
import { TEXT_EN } from "./text.en";
import { TEXT_HR } from "./text.hr";
import { TEXT_DE } from "./text.de";
import { TEXT_IT } from "./text.it";

/**
 * Builds an instant reading with no human in the loop: draws distinct cards from the 22 Major
 * Arcana and joins each card's text for the topic with its place in the spread. 22 cards in
 * three positions give 9,240 different three-card spreads per topic, so nobody runs out.
 *
 * The draw is seeded: a paid reading uses its Stripe session id as the seed, so opening the
 * link again (or from the email) shows the same cards instead of a new draw.
 */

const TEXTS: Record<Lang, Record<string, CardTopicText>> = {
  sl: TEXT_SL,
  en: TEXT_EN,
  hr: TEXT_HR,
  de: TEXT_DE,
  it: TEXT_IT,
};

// Fail the build, not a visitor, if a card is missing a text in some language.
for (const card of TAROT_CARDS) {
  for (const lang of Object.keys(TEXTS) as Lang[]) {
    if (!TEXTS[lang][card.key]) throw new Error(`Instant reading text missing: ${card.key} (${lang})`);
  }
}

/** Traditional yes/no leaning of each card, upright. */
const LEANING: Record<string, Answer> = {
  fool: "yes",
  magician: "yes",
  "high-priestess": "maybe",
  empress: "yes",
  emperor: "yes",
  hierophant: "maybe",
  lovers: "yes",
  chariot: "yes",
  strength: "yes",
  hermit: "maybe",
  "wheel-of-fortune": "yes",
  justice: "maybe",
  "hanged-man": "maybe",
  death: "no",
  temperance: "maybe",
  devil: "no",
  tower: "no",
  star: "yes",
  moon: "no",
  sun: "yes",
  judgement: "yes",
  world: "yes",
};

const ANSWER_LABEL: Record<Lang, Record<Answer, string>> = {
  sl: { yes: "Da", no: "Ne", maybe: "Še ne" },
  en: { yes: "Yes", no: "No", maybe: "Not yet" },
  hr: { yes: "Da", no: "Ne", maybe: "Još ne" },
  de: { yes: "Ja", no: "Nein", maybe: "Noch nicht" },
  it: { yes: "Sì", no: "No", maybe: "Non ancora" },
};

const ANSWER_TEXT: Record<Lang, Record<Answer, string[]>> = {
  sl: {
    yes: [
      "Karte se nagibajo k da. Energija je odprta — če si pripravljen narediti svoj del, se stvari lahko premaknejo.",
      "Odgovor je da. Ne čakaj na še en znak; ta je dovolj jasen.",
    ],
    no: [
      "Karte se nagibajo k ne — vsaj ne v tej obliki. To ni konec, ampak namig, da pogledaš drugam.",
      "Odgovor je ne. Včasih je ne zaščita pred nečim, kar bi te oddaljilo od tvoje poti.",
    ],
    maybe: [
      "Odgovor še ni zrel. Nekaj se mora najprej pokazati ali spremeniti — potrpežljivost ti bo koristila.",
      "Ne da ne ne, ampak še ne. Vprašaj znova, ko se stvari razjasnijo.",
    ],
  },
  en: {
    yes: [
      "The cards lean towards yes. The energy is open — if you're ready to do your part, things can move.",
      "The answer is yes. Don't wait for another sign; this one is clear enough.",
    ],
    no: [
      "The cards lean towards no — at least not in this form. It isn't an ending, just a hint to look elsewhere.",
      "The answer is no. Sometimes a no protects you from something that would lead you away from your path.",
    ],
    maybe: [
      "The answer isn't ripe yet. Something has to show itself or change first — patience will serve you.",
      "Not yes or no, but not yet. Ask again once things are clearer.",
    ],
  },
  hr: {
    yes: [
      "Karte naginju prema da. Energija je otvorena — ako si spreman učiniti svoj dio, stvari se mogu pokrenuti.",
      "Odgovor je da. Ne čekaj još jedan znak; ovaj je dovoljno jasan.",
    ],
    no: [
      "Karte naginju prema ne — barem ne u ovom obliku. To nije kraj, nego naznaka da pogledaš drugamo.",
      "Odgovor je ne. Ponekad te ne štiti od nečega što bi te udaljilo od tvog puta.",
    ],
    maybe: [
      "Odgovor još nije sazrio. Nešto se najprije mora pokazati ili promijeniti — strpljenje će ti koristiti.",
      "Ni da ni ne, nego još ne. Pitaj ponovno kad se stvari razjasne.",
    ],
  },
  de: {
    yes: [
      "Die Karten neigen zu Ja. Die Energie ist offen — wenn du bereit bist, deinen Teil zu tun, kann sich etwas bewegen.",
      "Die Antwort ist Ja. Warte nicht auf ein weiteres Zeichen; dieses ist klar genug.",
    ],
    no: [
      "Die Karten neigen zu Nein — zumindest nicht in dieser Form. Das ist kein Ende, nur ein Hinweis, woanders hinzuschauen.",
      "Die Antwort ist Nein. Manchmal schützt dich ein Nein vor etwas, das dich von deinem Weg abbringen würde.",
    ],
    maybe: [
      "Die Antwort ist noch nicht reif. Erst muss sich etwas zeigen oder ändern — Geduld wird dir helfen.",
      "Weder Ja noch Nein, sondern noch nicht. Frag noch einmal, wenn die Dinge klarer sind.",
    ],
  },
  it: {
    yes: [
      "Le carte pendono verso il sì. L'energia è aperta — se sei pronto a fare la tua parte, le cose possono muoversi.",
      "La risposta è sì. Non aspettare un altro segno; questo è abbastanza chiaro.",
    ],
    no: [
      "Le carte pendono verso il no — almeno non in questa forma. Non è una fine, solo un invito a guardare altrove.",
      "La risposta è no. A volte un no ti protegge da qualcosa che ti porterebbe lontano dal tuo cammino.",
    ],
    maybe: [
      "La risposta non è ancora matura. Prima qualcosa deve mostrarsi o cambiare — la pazienza ti aiuterà.",
      "Né sì né no, ma non ancora. Chiedi di nuovo quando le cose saranno più chiare.",
    ],
  },
};

type Tone = "open" | "mixed" | "heavy";

/** The last line of a reading, by the overall leaning of the cards drawn. */
const CLOSING: Record<Lang, Record<Tone, string[]>> = {
  sl: {
    open: [
      "Skupna energija branja je odprta in naklonjena. Vrata so priprta — tvoj korak jih odpre.",
      "Karte govorijo o gibanju naprej. Zaupaj temu, kar se že začenja.",
    ],
    mixed: [
      "Branje nosi svetlobo in senco hkrati. Ne izberi samo ene — obe ti nekaj povesta.",
      "Nekaj se odpira, nekaj še zahteva potrpljenje. Pojdi počasi in pozorno.",
    ],
    heavy: [
      "Branje je zahtevno, a ne brezupno. Kar se zdaj ruši ali ustavlja, pripravlja prostor za nekaj boljšega.",
      "Karte te prosijo za iskrenost do sebe. Ko pogledaš resnici v oči, postane pot lažja.",
    ],
  },
  en: {
    open: [
      "The overall energy of this reading is open and kind. The door is ajar — your step opens it.",
      "The cards speak of moving forward. Trust what is already beginning.",
    ],
    mixed: [
      "This reading carries light and shadow at once. Don't pick just one — both have something to tell you.",
      "Something is opening, something still asks for patience. Go slowly and pay attention.",
    ],
    heavy: [
      "This is a demanding reading, but not a hopeless one. What is falling or stalling now is making room for something better.",
      "The cards ask you to be honest with yourself. Once you look the truth in the eye, the road gets easier.",
    ],
  },
  hr: {
    open: [
      "Ukupna energija čitanja otvorena je i naklonjena. Vrata su odškrinuta — tvoj ih korak otvara.",
      "Karte govore o kretanju naprijed. Vjeruj onome što već počinje.",
    ],
    mixed: [
      "Čitanje nosi svjetlo i sjenu istodobno. Ne biraj samo jedno — oboje ti nešto govore.",
      "Nešto se otvara, a nešto još traži strpljenje. Idi polako i pažljivo.",
    ],
    heavy: [
      "Čitanje je zahtjevno, ali ne i beznadno. Ono što se sada ruši ili zastaje priprema mjesto za nešto bolje.",
      "Karte te mole za iskrenost prema sebi. Kad pogledaš istini u oči, put postaje lakši.",
    ],
  },
  de: {
    open: [
      "Die Gesamtenergie dieser Lesung ist offen und freundlich. Die Tür steht einen Spalt offen — dein Schritt öffnet sie.",
      "Die Karten sprechen von Vorwärtsbewegung. Vertrau dem, was schon beginnt.",
    ],
    mixed: [
      "Diese Lesung trägt Licht und Schatten zugleich. Wähl nicht nur eines — beide haben dir etwas zu sagen.",
      "Etwas öffnet sich, etwas verlangt noch Geduld. Geh langsam und achtsam.",
    ],
    heavy: [
      "Eine fordernde Lesung, aber keine hoffnungslose. Was jetzt fällt oder stockt, schafft Raum für etwas Besseres.",
      "Die Karten bitten dich, ehrlich zu dir zu sein. Wenn du der Wahrheit ins Auge schaust, wird der Weg leichter.",
    ],
  },
  it: {
    open: [
      "L'energia complessiva di questa lettura è aperta e favorevole. La porta è socchiusa — il tuo passo la apre.",
      "Le carte parlano di andare avanti. Fidati di ciò che sta già cominciando.",
    ],
    mixed: [
      "Questa lettura porta luce e ombra insieme. Non sceglierne solo una — entrambe hanno qualcosa da dirti.",
      "Qualcosa si apre, qualcosa chiede ancora pazienza. Procedi piano e con attenzione.",
    ],
    heavy: [
      "È una lettura impegnativa, ma non senza speranza. Ciò che ora cade o si ferma sta facendo spazio a qualcosa di meglio.",
      "Le carte ti chiedono sincerità verso te stesso. Quando guardi la verità negli occhi, la strada diventa più facile.",
    ],
  },
};

const TOPIC_FIELD: Record<InstantTopic["key"], keyof CardTopicText> = {
  yesno: "path",
  single: "path",
  love: "love",
  career: "work",
  general: "path",
  future: "path",
};

/** A small, fast seeded generator (mulberry32) over a string hash — same seed, same cards. */
function seededRandom(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function composeReading(params: {
  topic: InstantTopic;
  lang: Lang;
  question: string;
  seed: string;
  paid: boolean;
}): InstantReadingResult {
  const { topic, lang, question, seed, paid } = params;
  const random = seededRandom(seed);
  const deck = TAROT_CARDS.map((c) => c.key);
  const drawn: string[] = [];
  for (let i = 0; i < topic.positions.length; i++) {
    const idx = Math.floor(random() * deck.length);
    drawn.push(deck.splice(idx, 1)[0]);
  }
  const pick = <T,>(list: T[]) => list[Math.floor(random() * list.length)];

  const field = TOPIC_FIELD[topic.key];
  const cards = drawn.map((key, i) => ({
    key,
    position: topic.positions[i][lang],
    text: TEXTS[lang][key][field],
  }));

  const leanings = drawn.map((k) => LEANING[k] ?? "maybe");
  const yes = leanings.filter((l) => l === "yes").length;
  const no = leanings.filter((l) => l === "no").length;
  const tone: Tone = yes > no && yes >= Math.ceil(drawn.length / 2) ? "open" : no > yes ? "heavy" : "mixed";

  const result: InstantReadingResult = {
    topic: topic.key,
    lang,
    question,
    cards,
    closing: pick(CLOSING[lang][tone]),
    paid,
  };

  if (topic.key === "yesno") {
    const answer = leanings[0];
    result.answer = answer;
    result.answerLabel = ANSWER_LABEL[lang][answer];
    result.answerText = pick(ANSWER_TEXT[lang][answer]);
  }
  return result;
}

/** The reading as plain text, for the copy sent by email after a paid reading. */
export function readingAsText(r: InstantReadingResult, topicTitle: string): string {
  const names = new Map(TAROT_CARDS.map((c) => [c.key, c.name[r.lang]]));
  const lines = [topicTitle.toUpperCase(), ""];
  if (r.question) lines.push(`„${r.question}“`, "");
  if (r.answerLabel) lines.push(`${r.answerLabel}. ${r.answerText}`, "");
  for (const card of r.cards) {
    lines.push(`${card.position} — ${names.get(card.key)}`, card.text, "");
  }
  lines.push(r.closing);
  return lines.join("\n");
}
