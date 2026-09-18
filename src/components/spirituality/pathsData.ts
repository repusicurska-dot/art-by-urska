import type { Lang, Text } from "./lang";

/*
 * Why these sections exist — the research this page was rebuilt around (Sept 2026):
 *
 * - Pew, "Spirituality Among Americans" (2023): 70% of adults are spiritual in some way;
 *   people most often describe it as connection — with nature, others, themselves.
 * - Pew, Religious Landscape Study (2025): the most common spiritual experiences are awe at
 *   nature (93% several times a year), gratitude (91%), wonder about the universe (80%),
 *   deep inner peace (74%) and connection with humanity (72%).
 * - Pew (2025): ~3 in 10 adults use astrology, tarot or fortune tellers; most for reflection
 *   and fun rather than prediction. Tarot research frames the cards as "a mirror, not a
 *   crystal ball" — a tool for self-awareness and emotional clarity.
 * - Gallup (2025): ~4 in 10 young adults say their life lacks meaning or purpose; 23% of
 *   people worldwide felt lonely for much of the previous day.
 *
 * So the page leads with "what are you looking for?" (peace, clarity, self-love, connection,
 * meaning) and gives each answer something to *do* here — breathe, draw a card, write down
 * gratitude, set an intention with the moon, or talk to Urška live — plus a painting.
 *
 * AI-drafted copy, like the rest of this page — for Urška to keep, edit, or replace. The
 * Croatian, German and Italian are mine, not a translator's (see i18n/dictionary.ts).
 */

export type IntentionKey = "calm" | "clarity" | "selfLove" | "connection" | "meaning";

export interface Intention {
  key: IntentionKey;
  label: Text;
  /** "Choose this when…" — the feeling a visitor recognises themselves in. */
  when: Text;
  message: Text;
  practice: Text;
  /** Anchor id of the tool on this page that answers this intention. */
  anchor: string;
  anchorLabel: Text;
  artwork: { slug: string; title: string; image: string };
}

export const INTENTIONS: Intention[] = [
  {
    key: "calm",
    label: { sl: "Mir", en: "Peace", hr: "Mir", de: "Frieden", it: "Pace" },
    when: {
      sl: "Ko misli ne utihnejo",
      en: "When your mind won't go quiet",
      hr: "Kad misli ne utihnu",
      de: "Wenn die Gedanken nicht still werden",
      it: "Quando la mente non si acquieta",
    },
    message: {
      sl: "Mir ni nekaj, kar moraš najti. Je nekaj, kar se pokaže, ko za trenutek nehaš bežati. Tvoje telo že ve, kako — začne se pri dihu.",
      en: "Peace isn't something you have to find. It's what appears when you stop running for a moment. Your body already knows how — it begins with the breath.",
      hr: "Mir nije nešto što moraš pronaći. On se pojavi kad na trenutak prestaneš bježati. Tvoje tijelo već zna kako — počinje dahom.",
      de: "Frieden ist nichts, das du finden musst. Er zeigt sich, wenn du einen Moment lang aufhörst zu fliehen. Dein Körper weiß schon, wie — es beginnt mit dem Atem.",
      it: "La pace non è qualcosa da trovare. È ciò che appare quando per un attimo smetti di correre. Il tuo corpo sa già come — comincia dal respiro.",
    },
    practice: {
      sl: "Ena minuta: vdih na štiri, zadrži na dve, izdih na šest. Izdih naj bo daljši od vdiha — to telesu sporoči, da je varno.",
      en: "One minute: breathe in for four, hold for two, out for six. Let the exhale be longer than the inhale — it tells your body it's safe.",
      hr: "Jedna minuta: udah na četiri, zadrži na dva, izdah na šest. Neka izdah bude dulji od udaha — to tijelu govori da je sigurno.",
      de: "Eine Minute: vier Zählzeiten einatmen, zwei halten, sechs ausatmen. Lass das Ausatmen länger sein als das Einatmen — das sagt deinem Körper, dass er sicher ist.",
      it: "Un minuto: inspira per quattro, trattieni per due, espira per sei. Che l'espirazione sia più lunga dell'inspirazione — dice al corpo che è al sicuro.",
    },
    anchor: "pause",
    anchorLabel: {
      sl: "Začni minuto tišine",
      en: "Begin a minute of stillness",
      hr: "Započni minutu tišine",
      de: "Eine Minute Stille beginnen",
      it: "Inizia un minuto di quiete",
    },
    artwork: { slug: "artwork-04", title: "Birds of Light", image: "/images/birds-of-light.jpg" },
  },
  {
    key: "clarity",
    label: { sl: "Jasnost", en: "Clarity", hr: "Jasnoća", de: "Klarheit", it: "Chiarezza" },
    when: {
      sl: "Ko stojiš pred odločitvijo",
      en: "When you're facing a decision",
      hr: "Kad stojiš pred odlukom",
      de: "Wenn eine Entscheidung ansteht",
      it: "Quando sei davanti a una decisione",
    },
    message: {
      sl: "Odgovor pogosto že nosiš v sebi — le glasov okrog njega je preveč. Karta ne odloči namesto tebe. Pokaže ti tisto, kar ti je v resnici že znano.",
      en: "You often already carry the answer — there are just too many voices around it. A card won't decide for you. It shows you what you already knew.",
      hr: "Odgovor često već nosiš u sebi — samo je previše glasova oko njega. Karta ne odlučuje umjesto tebe. Pokazuje ti ono što već znaš.",
      de: "Die Antwort trägst du oft längst in dir — es sind nur zu viele Stimmen darum herum. Eine Karte entscheidet nicht für dich. Sie zeigt dir, was du ohnehin schon wusstest.",
      it: "Spesso la risposta la porti già dentro — ci sono solo troppe voci intorno. Una carta non decide al posto tuo. Ti mostra ciò che già sapevi.",
    },
    practice: {
      sl: "Preden izvlečeš karto, v eni povedi zapiši svoje vprašanje. Nato preberi karto in se vprašaj: kaj me je v tem besedilu najbolj zbodlo?",
      en: "Before you draw, write your question in one sentence. Then read the card and ask yourself: which line stung the most?",
      hr: "Prije nego izvučeš kartu, zapiši svoje pitanje u jednoj rečenici. Zatim pročitaj kartu i pitaj se: koji me redak najviše pogodio?",
      de: "Bevor du ziehst, schreib deine Frage in einem Satz auf. Lies dann die Karte und frag dich: welche Zeile hat am meisten wehgetan?",
      it: "Prima di pescare, scrivi la tua domanda in una frase. Poi leggi la carta e chiediti: quale riga ha punto di più?",
    },
    anchor: "tarot",
    anchorLabel: {
      sl: "Izvleci svojo karto",
      en: "Draw your card",
      hr: "Izvuci svoju kartu",
      de: "Zieh deine Karte",
      it: "Pesca la tua carta",
    },
    artwork: { slug: "artwork-02", title: "The Prophecy", image: "/images/the-prophecy.jpg" },
  },
  {
    key: "selfLove",
    label: {
      sl: "Ljubezen do sebe",
      en: "Self-love",
      hr: "Ljubav prema sebi",
      de: "Selbstliebe",
      it: "Amore per sé",
    },
    when: {
      sl: "Ko se preveč obsojaš",
      en: "When you've been too hard on yourself",
      hr: "Kad si prestrog prema sebi",
      de: "Wenn du zu hart mit dir bist",
      it: "Quando sei troppo duro con te",
    },
    message: {
      sl: "Tudi ti si nekaj, kar raste. Nihče ne kriči na cvet, ker še ni odprt. Danes si dovoli isto nežnost, ki jo tako zlahka podariš drugim.",
      en: "You are something that grows, too. No one shouts at a flower for not being open yet. Today, allow yourself the same gentleness you give others so easily.",
      hr: "I ti si nešto što raste. Nitko ne viče na cvijet jer se još nije otvorio. Danas si dopusti istu nježnost koju tako lako daruješ drugima.",
      de: "Auch du bist etwas, das wächst. Niemand schreit eine Blume an, weil sie noch nicht offen ist. Gönn dir heute dieselbe Sanftheit, die du anderen so leicht schenkst.",
      it: "Anche tu sei qualcosa che cresce. Nessuno grida a un fiore perché non è ancora sbocciato. Oggi concediti la stessa dolcezza che dai agli altri così facilmente.",
    },
    practice: {
      sl: "Zapiši tri majhne svetle stvari današnjega dne — in vsaj ena naj bo tvoje lastno delo.",
      en: "Write down three small lights from today — and let at least one be something you did.",
      hr: "Zapiši tri male svjetlosti današnjeg dana — i neka barem jedna bude nešto što si sam učinio.",
      de: "Schreib drei kleine Lichter des heutigen Tages auf — und lass mindestens eines etwas sein, das du selbst getan hast.",
      it: "Scrivi tre piccole luci di oggi — e che almeno una sia qualcosa che hai fatto tu.",
    },
    anchor: "gratitude",
    anchorLabel: {
      sl: "Zapiši tri luči",
      en: "Write your three lights",
      hr: "Zapiši tri svjetlosti",
      de: "Schreib deine drei Lichter",
      it: "Scrivi le tue tre luci",
    },
    artwork: { slug: "artwork-03", title: "Eternal Love", image: "/images/eternal-love.jpg" },
  },
  {
    key: "connection",
    label: { sl: "Povezanost", en: "Connection", hr: "Povezanost", de: "Verbundenheit", it: "Connessione" },
    when: {
      sl: "Ko te to, kar nosiš, osamlja",
      en: "When you feel alone with what you carry",
      hr: "Kad se s onim što nosiš osjećaš sam",
      de: "Wenn du mit dem, was du trägst, allein bist",
      it: "Quando ti senti solo con ciò che porti",
    },
    message: {
      sl: "Nekatere stvari se razjasnijo šele, ko jih izrečeš na glas nekomu, ki res posluša. Ni ti treba vsega razumeti brez nikogar ob sebi.",
      en: "Some things only become clear once you say them out loud to someone who truly listens. You don't have to figure everything out alone.",
      hr: "Neke se stvari razbistre tek kad ih izgovoriš naglas nekome tko uistinu sluša. Ne moraš sve shvatiti sam.",
      de: "Manches wird erst klar, wenn du es jemandem laut sagst, der wirklich zuhört. Du musst nicht alles allein verstehen.",
      it: "Certe cose si chiariscono solo quando le dici ad alta voce a chi ascolta davvero. Non devi capire tutto da solo.",
    },
    practice: {
      sl: "Pomisli na eno vprašanje, ki ga nosiš že predolgo. Prinesi ga na živo branje z Urško — ali ga danes zaupaj nekomu blizu.",
      en: "Think of one question you've carried for too long. Bring it to a live reading with Urška — or share it with someone close today.",
      hr: "Sjeti se jednog pitanja koje nosiš predugo. Donesi ga na čitanje uživo s Urškom — ili ga danas povjeri nekome bliskom.",
      de: "Denk an eine Frage, die du zu lange mit dir trägst. Bring sie in eine Live-Lesung mit Urška — oder vertrau sie heute jemandem an, der dir nahesteht.",
      it: "Pensa a una domanda che porti da troppo tempo. Portala a una lettura dal vivo con Urška — o affidala oggi a qualcuno di caro.",
    },
    anchor: "live-reading",
    anchorLabel: {
      sl: "Rezerviraj branje v živo",
      en: "Book a live reading",
      hr: "Rezerviraj čitanje uživo",
      de: "Live-Lesung buchen",
      it: "Prenota una lettura dal vivo",
    },
    artwork: { slug: "artwork-01", title: "Blossoming Love", image: "/images/blossoming-love.jpg" },
  },
  {
    key: "meaning",
    label: { sl: "Smisel", en: "Meaning", hr: "Smisao", de: "Sinn", it: "Senso" },
    when: {
      sl: "Ko se sprašuješ, čemu vse to",
      en: "When you wonder what it's all for",
      hr: "Kad se pitaš čemu sve to",
      de: "Wenn du dich fragst, wofür das alles",
      it: "Quando ti chiedi a cosa serva tutto questo",
    },
    message: {
      sl: "Smisel redko pride kot velik odgovor. Pride kot majhna namera, ki jo neguješ dan za dnem — dokler nekega dne ne pogledaš nazaj in vidiš pot.",
      en: "Meaning rarely arrives as one big answer. It comes as a small intention you keep, day after day — until one day you look back and see a path.",
      hr: "Smisao rijetko stiže kao veliki odgovor. Dolazi kao mala namjera koju održavaš dan za danom — dok jednog dana ne pogledaš unatrag i ugledaš put.",
      de: "Sinn kommt selten als eine große Antwort. Er kommt als kleine Absicht, die du Tag für Tag hältst — bis du eines Tages zurückschaust und einen Weg siehst.",
      it: "Il senso arriva di rado come una grande risposta. Arriva come una piccola intenzione che mantieni, giorno dopo giorno — finché un giorno ti volti e vedi un percorso.",
    },
    practice: {
      sl: "Poglej, v kateri fazi je danes luna, in si postavi eno namero za naslednjih nekaj dni. Samo eno.",
      en: "See which phase the moon is in today and set one intention for the next few days. Just one.",
      hr: "Pogledaj u kojoj je fazi mjesec danas i postavi jednu namjeru za sljedećih nekoliko dana. Samo jednu.",
      de: "Schau, in welcher Phase der Mond heute steht, und setz dir eine Absicht für die nächsten Tage. Nur eine.",
      it: "Guarda in che fase è la luna oggi e poniti un'intenzione per i prossimi giorni. Una sola.",
    },
    anchor: "moon",
    anchorLabel: {
      sl: "Postavi namero z luno",
      en: "Set an intention with the moon",
      hr: "Postavi namjeru s mjesecom",
      de: "Eine Absicht mit dem Mond setzen",
      it: "Poni un'intenzione con la luna",
    },
    artwork: {
      slug: "artwork-05",
      title: "Somehow My Heart Still Remembers You",
      image: "/images/somehow-my-heart.jpg",
    },
  },
];

export const COMPASS_LABELS: Record<
  Lang,
  { eyebrow: string; heading: string; intro: string; practiceLabel: string; artworkLabel: string }
> = {
  sl: {
    eyebrow: "Tvoja pot danes",
    heading: "Kaj danes išče tvoja duša?",
    intro: "Izberi, kar ti je ta trenutek najbližje. Ni napačnega odgovora — samo vrata, skozi katera vstopiš.",
    practiceLabel: "Majhna vaja",
    artworkLabel: "Slika, ki nosi to energijo",
  },
  en: {
    eyebrow: "Your path today",
    heading: "What is your soul looking for today?",
    intro: "Choose whatever feels closest right now. There's no wrong answer — only the door you walk through.",
    practiceLabel: "A small practice",
    artworkLabel: "A painting that holds this energy",
  },
  hr: {
    eyebrow: "Tvoj put danas",
    heading: "Što tvoja duša danas traži?",
    intro: "Odaberi ono što ti je ovog trenutka najbliže. Nema pogrešnog odgovora — samo vrata kroz koja ulaziš.",
    practiceLabel: "Mala vježba",
    artworkLabel: "Slika koja nosi ovu energiju",
  },
  de: {
    eyebrow: "Dein Weg heute",
    heading: "Wonach sucht deine Seele heute?",
    intro: "Wähl, was dir gerade am nächsten ist. Es gibt keine falsche Antwort — nur die Tür, durch die du gehst.",
    practiceLabel: "Eine kleine Übung",
    artworkLabel: "Ein Bild, das diese Energie trägt",
  },
  it: {
    eyebrow: "Il tuo cammino oggi",
    heading: "Cosa cerca oggi la tua anima?",
    intro: "Scegli ciò che senti più vicino in questo momento. Non c'è una risposta sbagliata — solo la porta da cui entri.",
    practiceLabel: "Una piccola pratica",
    artworkLabel: "Un dipinto che porta questa energia",
  },
};

/* ---------------------------------- Moon ---------------------------------- */

export interface MoonPhase {
  name: Text;
  intention: Text;
  prompt: Text;
}

/** Eight phases, in order from new moon. */
export const MOON_PHASES: MoonPhase[] = [
  {
    name: { sl: "Mlaj", en: "New Moon", hr: "Mlađak", de: "Neumond", it: "Luna nuova" },
    intention: {
      sl: "Čas za seme",
      en: "A time for seeds",
      hr: "Vrijeme za sjeme",
      de: "Eine Zeit für Samen",
      it: "Un tempo per i semi",
    },
    prompt: {
      sl: "Kaj želiš povabiti v svoje življenje v naslednjem mesecu? Zapiši to kot da se že dogaja.",
      en: "What do you want to invite into your life this coming month? Write it as if it's already happening.",
      hr: "Što želiš pozvati u svoj život sljedećeg mjeseca? Zapiši to kao da se već događa.",
      de: "Was möchtest du im kommenden Monat in dein Leben einladen? Schreib es, als geschähe es bereits.",
      it: "Cosa vuoi invitare nella tua vita nel mese che viene? Scrivilo come se stesse già accadendo.",
    },
  },
  {
    name: {
      sl: "Rastoči srp",
      en: "Waxing Crescent",
      hr: "Mladi srp",
      de: "Zunehmende Sichel",
      it: "Luna crescente",
    },
    intention: {
      sl: "Čas za prvi korak",
      en: "A time for the first step",
      hr: "Vrijeme za prvi korak",
      de: "Eine Zeit für den ersten Schritt",
      it: "Un tempo per il primo passo",
    },
    prompt: {
      sl: "Kateri je najmanjši korak, ki ga lahko narediš že danes proti tistemu, kar si želiš?",
      en: "What's the smallest step you could take today toward what you want?",
      hr: "Koji je najmanji korak koji već danas možeš napraviti prema onome što želiš?",
      de: "Was ist der kleinste Schritt, den du heute auf das zugehen könntest, was du willst?",
      it: "Qual è il passo più piccolo che puoi fare oggi verso ciò che desideri?",
    },
  },
  {
    name: {
      sl: "Prvi krajec",
      en: "First Quarter",
      hr: "Prva četvrt",
      de: "Erstes Viertel",
      it: "Primo quarto",
    },
    intention: {
      sl: "Čas za pogum",
      en: "A time for courage",
      hr: "Vrijeme za hrabrost",
      de: "Eine Zeit für Mut",
      it: "Un tempo per il coraggio",
    },
    prompt: {
      sl: "Kje se ti postavlja upor? Ne umikaj se — vprašaj se, kaj te ta ovira uči.",
      en: "Where are you meeting resistance? Don't back away — ask what this obstacle is teaching you.",
      hr: "Gdje nailaziš na otpor? Nemoj se povlačiti — pitaj se čemu te ta prepreka uči.",
      de: "Wo begegnet dir Widerstand? Weich nicht aus — frag, was dieses Hindernis dich lehrt.",
      it: "Dove incontri resistenza? Non ritrarti — chiediti cosa ti insegna questo ostacolo.",
    },
  },
  {
    name: {
      sl: "Rastoča luna",
      en: "Waxing Gibbous",
      hr: "Rastući mjesec",
      de: "Zunehmender Mond",
      it: "Gibbosa crescente",
    },
    intention: {
      sl: "Čas za potrpežljivost",
      en: "A time for patience",
      hr: "Vrijeme za strpljenje",
      de: "Eine Zeit für Geduld",
      it: "Un tempo per la pazienza",
    },
    prompt: {
      sl: "Kaj v tebi že zori, pa še ni pripravljeno? Kako lahko temu zaupaš še malo dlje?",
      en: "What in you is ripening but not quite ready? How can you trust it a little longer?",
      hr: "Što u tebi već zrije, ali još nije spremno? Kako tome možeš vjerovati još malo dulje?",
      de: "Was in dir reift, ist aber noch nicht so weit? Wie kannst du ihm noch etwas länger vertrauen?",
      it: "Cosa in te sta maturando ma non è ancora pronto? Come puoi fidartene ancora un po'?",
    },
  },
  {
    name: { sl: "Ščip", en: "Full Moon", hr: "Uštap", de: "Vollmond", it: "Luna piena" },
    intention: {
      sl: "Čas za hvaležnost in spuščanje",
      en: "A time for gratitude and release",
      hr: "Vrijeme za zahvalnost i puštanje",
      de: "Eine Zeit für Dankbarkeit und Loslassen",
      it: "Un tempo per la gratitudine e il lasciar andare",
    },
    prompt: {
      sl: "Za kaj čutiš hvaležnost ta mesec? In kaj je čas spustiti, ker ti ne služi več?",
      en: "What are you grateful for this month? And what are you ready to release because it no longer serves you?",
      hr: "Na čemu si zahvalan ovog mjeseca? I što je vrijeme pustiti jer ti više ne služi?",
      de: "Wofür bist du diesen Monat dankbar? Und was ist Zeit loszulassen, weil es dir nicht mehr dient?",
      it: "Per cosa sei grato questo mese? E cosa è tempo di lasciar andare perché non ti serve più?",
    },
  },
  {
    name: {
      sl: "Pojemajoča luna",
      en: "Waning Gibbous",
      hr: "Opadajući mjesec",
      de: "Abnehmender Mond",
      it: "Gibbosa calante",
    },
    intention: {
      sl: "Čas za deljenje",
      en: "A time for sharing",
      hr: "Vrijeme za dijeljenje",
      de: "Eine Zeit für das Teilen",
      it: "Un tempo per condividere",
    },
    prompt: {
      sl: "Katero spoznanje zadnjih tednov je vredno podariti še komu drugemu?",
      en: "What have you learned in recent weeks that you could pass on to someone else?",
      hr: "Koju spoznaju zadnjih tjedana vrijedi darovati nekom drugom?",
      de: "Welche Einsicht der letzten Wochen wäre es wert, sie weiterzugeben?",
      it: "Quale cosa imparata nelle ultime settimane varrebbe la pena passare a qualcun altro?",
    },
  },
  {
    name: {
      sl: "Zadnji krajec",
      en: "Last Quarter",
      hr: "Zadnja četvrt",
      de: "Letztes Viertel",
      it: "Ultimo quarto",
    },
    intention: {
      sl: "Čas za odpuščanje",
      en: "A time for forgiveness",
      hr: "Vrijeme za oprost",
      de: "Eine Zeit für Vergebung",
      it: "Un tempo per il perdono",
    },
    prompt: {
      sl: "Komu — morda sebi — lahko danes vsaj malo odpustiš?",
      en: "Who — perhaps yourself — could you forgive, even a little, today?",
      hr: "Kome — možda sebi — danas možeš barem malo oprostiti?",
      de: "Wem — vielleicht dir selbst — könntest du heute ein wenig vergeben?",
      it: "A chi — forse a te stesso — potresti perdonare oggi, anche solo un poco?",
    },
  },
  {
    name: {
      sl: "Pojemajoči srp",
      en: "Waning Crescent",
      hr: "Stari srp",
      de: "Abnehmende Sichel",
      it: "Luna calante",
    },
    intention: {
      sl: "Čas za počitek",
      en: "A time for rest",
      hr: "Vrijeme za odmor",
      de: "Eine Zeit für Ruhe",
      it: "Un tempo per il riposo",
    },
    prompt: {
      sl: "Kje si lahko ta teden dovoliš manj? Tišina pred novim začetkom je tudi del poti.",
      en: "Where can you allow yourself less this week? The quiet before a new beginning is part of the path too.",
      hr: "Gdje si ovaj tjedan možeš dopustiti manje? Tišina prije novog početka također je dio puta.",
      de: "Wo kannst du dir diese Woche weniger erlauben? Die Stille vor einem Neubeginn gehört auch zum Weg.",
      it: "Dove puoi concederti meno questa settimana? Anche la quiete prima di un nuovo inizio fa parte del cammino.",
    },
  },
];

export const MOON_LABELS: Record<Lang, { eyebrow: string; illuminated: string; nextFull: string; days: string }> = {
  sl: { eyebrow: "Luna danes", illuminated: "osvetljenost", nextFull: "Do ščipa še", days: "dni" },
  en: { eyebrow: "The moon today", illuminated: "illuminated", nextFull: "Full moon in", days: "days" },
  hr: { eyebrow: "Mjesec danas", illuminated: "osvijetljenost", nextFull: "Do uštapa još", days: "dana" },
  de: { eyebrow: "Der Mond heute", illuminated: "beleuchtet", nextFull: "Vollmond in", days: "Tagen" },
  it: { eyebrow: "La luna oggi", illuminated: "illuminata", nextFull: "Luna piena tra", days: "giorni" },
};

const SYNODIC_MONTH = 29.530588853;
// A known new moon: 6 Jan 2000, 18:14 UTC.
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

/** Position in the lunar cycle, 0 = new moon, 0.5 = full moon. */
export function getMoonCycle(date: Date): number {
  const days = (date.getTime() - KNOWN_NEW_MOON) / 86400000;
  const cycle = (days % SYNODIC_MONTH) / SYNODIC_MONTH;
  return cycle < 0 ? cycle + 1 : cycle;
}

/**
 * New, first quarter, full and last quarter are moments, not week-long stretches — they only
 * get their name within about a day of the exact point; everything between is a crescent or
 * gibbous phase (the way almanacs name them).
 */
export function getMoonPhaseIndex(cycle: number): number {
  const day = cycle * SYNODIC_MONTH;
  const quarter = SYNODIC_MONTH / 4;
  for (let i = 0; i <= 4; i++) {
    if (Math.abs(day - i * quarter) <= 1) return (i * 2) % 8;
  }
  return Math.floor(day / quarter) * 2 + 1;
}

export function getIllumination(cycle: number): number {
  return (1 - Math.cos(2 * Math.PI * cycle)) / 2;
}

export function getDaysUntilFull(cycle: number): number {
  const toFull = cycle <= 0.5 ? 0.5 - cycle : 1.5 - cycle;
  return Math.round(toFull * SYNODIC_MONTH);
}

/* ------------------------------ Breathing pause ------------------------------ */

export const BREATH_LABELS: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    intro: string;
    start: string;
    stop: string;
    again: string;
    inhale: string;
    hold: string;
    exhale: string;
    done: string;
    ready: string;
  }
> = {
  sl: {
    eyebrow: "Minuta tišine",
    heading: "Ustavi se za en dih.",
    intro: "Pet mirnih dihov, približno ena minuta. Sledi krogu — ko se širi, vdihni; ko se krči, izdihni.",
    start: "Začni",
    stop: "Ustavi",
    again: "Še enkrat",
    inhale: "Vdih",
    hold: "Zadrži",
    exhale: "Izdih",
    done: "Spet si tu. Opazi, kako se zdaj počutiš.",
    ready: "Kadar začutiš, da je čas",
  },
  en: {
    eyebrow: "A minute of stillness",
    heading: "Pause for a single breath.",
    intro: "Five calm breaths, about one minute. Follow the circle — breathe in as it grows, out as it softens.",
    start: "Begin",
    stop: "Stop",
    again: "Once more",
    inhale: "Breathe in",
    hold: "Hold",
    exhale: "Breathe out",
    done: "Welcome back. Notice how you feel now.",
    ready: "Whenever you're ready",
  },
  hr: {
    eyebrow: "Minuta tišine",
    heading: "Zastani na jedan dah.",
    intro: "Pet mirnih udaha, otprilike jedna minuta. Prati krug — dok se širi, udahni; dok se steže, izdahni.",
    start: "Započni",
    stop: "Zaustavi",
    again: "Još jednom",
    inhale: "Udah",
    hold: "Zadrži",
    exhale: "Izdah",
    done: "Opet si tu. Primijeti kako se sada osjećaš.",
    ready: "Kad osjetiš da je vrijeme",
  },
  de: {
    eyebrow: "Eine Minute Stille",
    heading: "Halt inne für einen Atemzug.",
    intro: "Fünf ruhige Atemzüge, etwa eine Minute. Folge dem Kreis — atme ein, wenn er wächst, aus, wenn er weicher wird.",
    start: "Beginnen",
    stop: "Anhalten",
    again: "Noch einmal",
    inhale: "Einatmen",
    hold: "Halten",
    exhale: "Ausatmen",
    done: "Willkommen zurück. Merk, wie du dich jetzt fühlst.",
    ready: "Wann immer du bereit bist",
  },
  it: {
    eyebrow: "Un minuto di quiete",
    heading: "Fermati per un respiro.",
    intro: "Cinque respiri calmi, circa un minuto. Segui il cerchio — inspira mentre cresce, espira mentre si distende.",
    start: "Inizia",
    stop: "Ferma",
    again: "Ancora una volta",
    inhale: "Inspira",
    hold: "Trattieni",
    exhale: "Espira",
    done: "Bentornato. Nota come ti senti adesso.",
    ready: "Quando te la senti",
  },
};

/* ------------------------------- Gratitude ------------------------------- */

export const GRATITUDE_LABELS: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    intro: string;
    placeholders: [string, string, string];
    save: string;
    saved: string;
    streak: (n: number) => string;
    privacy: string;
  }
> = {
  sl: {
    eyebrow: "Tri luči",
    heading: "Kaj je danes prineslo svetlobo?",
    intro:
      "Hvaležnost je najpogostejša duhovna izkušnja med ljudmi — in najlažja za vadbo. Zapiši tri majhne stvari. Ni jih treba razlagati.",
    placeholders: ["Topla kava zjutraj …", "Nekdo, ki se je nasmehnil …", "Nekaj lepega zase …"],
    save: "Prižgi luči",
    saved: "Tvoje tri luči za danes gorijo.",
    streak: (n) => (n === 1 ? "Prvi dan hvaležnosti." : `Dnevi hvaležnosti: ${n}`),
    privacy: "Ostane samo v tvojem brskalniku — nihče drug tega ne vidi.",
  },
  en: {
    eyebrow: "Three lights",
    heading: "What brought light into today?",
    intro:
      "Gratitude is the most common spiritual experience people share — and the easiest to practise. Write down three small things. No need to explain them.",
    placeholders: ["Warm coffee this morning …", "Someone who smiled …", "Something I did for myself …"],
    save: "Light them",
    saved: "Your three lights for today are glowing.",
    streak: (n) => (n === 1 ? "Your first day of gratitude." : `Days of gratitude: ${n}`),
    privacy: "It stays only in your browser — no one else sees it.",
  },
  hr: {
    eyebrow: "Tri svjetlosti",
    heading: "Što je danas donijelo svjetlo?",
    intro:
      "Zahvalnost je najčešće duhovno iskustvo među ljudima — i najlakše za vježbanje. Zapiši tri male stvari. Ne treba ih objašnjavati.",
    placeholders: ["Topla kava jutros …", "Netko tko se nasmiješio …", "Nešto lijepo za sebe …"],
    save: "Upali svjetlosti",
    saved: "Tvoje tri svjetlosti za danas gore.",
    streak: (n) => (n === 1 ? "Prvi dan zahvalnosti." : `Dani zahvalnosti: ${n}`),
    privacy: "Ostaje samo u tvom pregledniku — nitko drugi to ne vidi.",
  },
  de: {
    eyebrow: "Drei Lichter",
    heading: "Was hat heute Licht gebracht?",
    intro:
      "Dankbarkeit ist die häufigste spirituelle Erfahrung, die Menschen teilen — und die einfachste zu üben. Schreib drei kleine Dinge auf. Sie müssen nicht erklärt werden.",
    placeholders: ["Warmer Kaffee heute Morgen …", "Jemand, der gelächelt hat …", "Etwas Schönes für mich …"],
    save: "Anzünden",
    saved: "Deine drei Lichter für heute brennen.",
    streak: (n) => (n === 1 ? "Dein erster Tag der Dankbarkeit." : `Tage der Dankbarkeit: ${n}`),
    privacy: "Es bleibt nur in deinem Browser — niemand sonst sieht es.",
  },
  it: {
    eyebrow: "Tre luci",
    heading: "Cosa ha portato luce nella giornata?",
    intro:
      "La gratitudine è l'esperienza spirituale più comune fra le persone — e la più facile da praticare. Scrivi tre piccole cose. Non serve spiegarle.",
    placeholders: ["Il caffè caldo stamattina …", "Qualcuno che ha sorriso …", "Qualcosa di bello per me …"],
    save: "Accendile",
    saved: "Le tue tre luci di oggi sono accese.",
    streak: (n) => (n === 1 ? "Il tuo primo giorno di gratitudine." : `Giorni di gratitudine: ${n}`),
    privacy: "Resta solo nel tuo browser — nessun altro lo vede.",
  },
};
