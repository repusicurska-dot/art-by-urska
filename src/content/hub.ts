import type { Locale } from "@/i18n/locales";
import type { World } from "@/lib/worlds";

/**
 * Words for Urška's own home page (/) and the five worlds beneath it, in the five site
 * languages. The facts about her climbing are the ones on the About page; nothing here says
 * more about her than she has said there.
 */

export interface HubCopy {
  roles: string;
  lead: string;
  scroll: string;
  worldsEyebrow: string;
  worldsTitle: string;
  worlds: Record<World, { nav: string; line: string; cta: string }>;
  storyEyebrow: string;
  storyTitle: string;
  story: string[];
  readStory: string;
  milestones: string[];
  beginTitle: string;
  climb: {
    lead: string;
    titlesEyebrow: string;
    shapedEyebrow: string;
    soon: string;
  };
}

export const HUB: Record<Locale, HubCopy> = {
  en: {
    roles: "Painter · Poet · Climber · Seeker",
    lead: "A bouldering champion who traded the rock for the canvas — and never stopped climbing. This is my home: five worlds, one life.",
    scroll: "Scroll",
    worldsEyebrow: "Five worlds",
    worldsTitle: "One life, five ways into it",
    worlds: {
      art: { nav: "Art", line: "Original paintings of mood, memory and light — made in Slovenia, shipped worldwide.", cta: "The gallery" },
      poetry: { nav: "Poetry", line: "A letter from the studio every Thursday — words, with a painting beside them.", cta: "Read a letter" },
      spirituality: { nav: "Spirituality", line: "Tarot, the moon and quiet practices for coming home to yourself.", cta: "Draw a card" },
      climb: { nav: "Climb", line: "Life on the rock — the routes, the titles and what the wall taught me.", cta: "Climb with me" },
      finance: { nav: "Finance", line: "The calm and discipline of the wall, applied to money and the markets.", cta: "Visit My Edge" },
    },
    storyEyebrow: "About Urška",
    storyTitle: "From the wall to the canvas",
    story: [
      "For years my life was climbing. I competed at the highest international level, and the wall taught me discipline, resilience, presence — and the courage to trust my instincts.",
      "That journey led me to a deeper search, one that couldn't be expressed through movement alone. Today I give it form in paint, in words and in quiet practice.",
    ],
    readStory: "Read my whole story",
    milestones: ["European Champion — bouldering", "National Champion — bouldering & speed", "World Youth Vice Champion", "Podium — World Beach Games"],
    beginTitle: "Where would you like to begin?",
    climb: {
      lead: "Before the canvas there was the rock. These are the years that made me.",
      titlesEyebrow: "On the wall",
      shapedEyebrow: "What climbing gave me",
      soon: "Stories from the wall, training and outdoor days are on their way.",
    },
  },
  sl: {
    roles: "Slikarka · Pesnica · Plezalka · Iskalka",
    lead: "Prvakinja v balvanskem plezanju, ki je skalo zamenjala za platno — in nikoli nehala plezati. To je moj dom: pet svetov, eno življenje.",
    scroll: "Naprej",
    worldsEyebrow: "Pet svetov",
    worldsTitle: "Eno življenje, pet poti vanj",
    worlds: {
      art: { nav: "Umetnost", line: "Originalne slike razpoloženja, spomina in svetlobe — ustvarjene v Sloveniji, poslane po svetu.", cta: "V galerijo" },
      poetry: { nav: "Poezija", line: "Vsak četrtek pismo iz ateljeja — besede, ob njih pa slika.", cta: "Preberi pismo" },
      spirituality: { nav: "Duhovnost", line: "Tarot, luna in tihe prakse za vrnitev k sebi.", cta: "Izvleci karto" },
      climb: { nav: "Plezanje", line: "Življenje na skali — smeri, naslovi in vse, kar me je naučila stena.", cta: "Pleziva skupaj" },
      finance: { nav: "Finance", line: "Mir in disciplina stene, preneseni na denar in trge.", cta: "Obišči My Edge" },
    },
    storyEyebrow: "O Urški",
    storyTitle: "S stene na platno",
    story: [
      "Dolga leta je bilo moje življenje plezanje. Tekmovala sem na najvišji mednarodni ravni in stena me je naučila discipline, vztrajnosti, prisotnosti — in poguma, da zaupam svojemu občutku.",
      "Ta pot me je pripeljala do globljega iskanja, ki ga ni bilo mogoče izraziti samo z gibom. Danes mu dajem obliko v barvi, v besedah in v tihi praksi.",
    ],
    readStory: "Preberi mojo celo zgodbo",
    milestones: ["Evropska prvakinja — balvani", "Državna prvakinja — balvani in hitrost", "Mladinska svetovna podprvakinja", "Stopničke — Svetovne igre na plaži"],
    beginTitle: "Kje želiš začeti?",
    climb: {
      lead: "Pred platnom je bila skala. To so leta, ki so me naredila.",
      titlesEyebrow: "Na steni",
      shapedEyebrow: "Kar mi je dalo plezanje",
      soon: "Zgodbe s stene, treningi in dnevi v naravi so na poti.",
    },
  },
  hr: {
    roles: "Slikarica · Pjesnikinja · Penjačica · Tragateljica",
    lead: "Prvakinja u boulderingu koja je stijenu zamijenila platnom — i nikad nije prestala penjati. Ovo je moj dom: pet svjetova, jedan život.",
    scroll: "Dalje",
    worldsEyebrow: "Pet svjetova",
    worldsTitle: "Jedan život, pet putova u njega",
    worlds: {
      art: { nav: "Umjetnost", line: "Originalne slike raspoloženja, sjećanja i svjetla — nastale u Sloveniji, šalju se u cijeli svijet.", cta: "U galeriju" },
      poetry: { nav: "Poezija", line: "Svakog četvrtka pismo iz ateljea — riječi, a uz njih slika.", cta: "Pročitaj pismo" },
      spirituality: { nav: "Duhovnost", line: "Tarot, mjesec i tihe prakse za povratak sebi.", cta: "Izvuci kartu" },
      climb: { nav: "Penjanje", line: "Život na stijeni — smjerovi, naslovi i sve čemu me stijena naučila.", cta: "Penji sa mnom" },
      finance: { nav: "Financije", line: "Mir i disciplina stijene, preneseni na novac i tržišta.", cta: "Posjeti My Edge" },
    },
    storyEyebrow: "O Urški",
    storyTitle: "Sa stijene na platno",
    story: [
      "Godinama je moj život bio penjanje. Natjecala sam se na najvišoj međunarodnoj razini, a stijena me naučila disciplini, upornosti, prisutnosti — i hrabrosti da vjerujem svom instinktu.",
      "Taj put doveo me do dubljeg traženja, koje se nije moglo izraziti samo pokretom. Danas mu dajem oblik u boji, u riječima i u tihoj praksi.",
    ],
    readStory: "Pročitaj cijelu moju priču",
    milestones: ["Europska prvakinja — bouldering", "Državna prvakinja — bouldering i brzina", "Svjetska juniorska viceprvakinja", "Podij — Svjetske igre na plaži"],
    beginTitle: "Gdje želiš započeti?",
    climb: {
      lead: "Prije platna bila je stijena. Ovo su godine koje su me stvorile.",
      titlesEyebrow: "Na stijeni",
      shapedEyebrow: "Što mi je dalo penjanje",
      soon: "Priče sa stijene, treninzi i dani u prirodi su na putu.",
    },
  },
  de: {
    roles: "Malerin · Dichterin · Kletterin · Suchende",
    lead: "Eine Boulder-Meisterin, die den Fels gegen die Leinwand getauscht hat — und nie aufgehört hat zu klettern. Das ist mein Zuhause: fünf Welten, ein Leben.",
    scroll: "Weiter",
    worldsEyebrow: "Fünf Welten",
    worldsTitle: "Ein Leben, fünf Wege hinein",
    worlds: {
      art: { nav: "Kunst", line: "Originalgemälde voller Stimmung, Erinnerung und Licht — in Slowenien gemalt, weltweit versandt.", cta: "Zur Galerie" },
      poetry: { nav: "Poesie", line: "Jeden Donnerstag ein Brief aus dem Atelier — Worte, und ein Bild daneben.", cta: "Einen Brief lesen" },
      spirituality: { nav: "Spiritualität", line: "Tarot, der Mond und stille Übungen, um zu dir zurückzukommen.", cta: "Eine Karte ziehen" },
      climb: { nav: "Klettern", line: "Das Leben am Fels — die Routen, die Titel und was mich die Wand gelehrt hat.", cta: "Klettere mit mir" },
      finance: { nav: "Finanzen", line: "Die Ruhe und Disziplin der Wand, übertragen auf Geld und Märkte.", cta: "Zu My Edge" },
    },
    storyEyebrow: "Über Urška",
    storyTitle: "Von der Wand zur Leinwand",
    story: [
      "Jahrelang war Klettern mein Leben. Ich trat auf höchstem internationalem Niveau an, und die Wand lehrte mich Disziplin, Ausdauer, Gegenwart — und den Mut, meinem Gefühl zu vertrauen.",
      "Dieser Weg führte mich zu einer tieferen Suche, die sich nicht allein in Bewegung ausdrücken ließ. Heute gebe ich ihr Form in Farbe, in Worten und in stiller Praxis.",
    ],
    readStory: "Meine ganze Geschichte lesen",
    milestones: ["Europameisterin — Bouldern", "Staatsmeisterin — Bouldern & Speed", "Jugend-Vizeweltmeisterin", "Podium — World Beach Games"],
    beginTitle: "Wo möchtest du beginnen?",
    climb: {
      lead: "Vor der Leinwand war der Fels. Das sind die Jahre, die mich geprägt haben.",
      titlesEyebrow: "An der Wand",
      shapedEyebrow: "Was mir das Klettern gab",
      soon: "Geschichten von der Wand, Training und Tage draußen sind unterwegs.",
    },
  },
  it: {
    roles: "Pittrice · Poetessa · Arrampicatrice · Cercatrice",
    lead: "Una campionessa di boulder che ha lasciato la roccia per la tela — senza mai smettere di arrampicare. Questa è la mia casa: cinque mondi, una vita.",
    scroll: "Avanti",
    worldsEyebrow: "Cinque mondi",
    worldsTitle: "Una vita, cinque strade per entrarci",
    worlds: {
      art: { nav: "Arte", line: "Dipinti originali di atmosfera, memoria e luce — creati in Slovenia, spediti in tutto il mondo.", cta: "La galleria" },
      poetry: { nav: "Poesia", line: "Ogni giovedì una lettera dall'atelier — parole, con un dipinto accanto.", cta: "Leggi una lettera" },
      spirituality: { nav: "Spiritualità", line: "Tarocchi, la luna e pratiche silenziose per tornare a te stessa.", cta: "Pesca una carta" },
      climb: { nav: "Arrampicata", line: "La vita sulla roccia — le vie, i titoli e ciò che la parete mi ha insegnato.", cta: "Arrampica con me" },
      finance: { nav: "Finanza", line: "La calma e la disciplina della parete, applicate al denaro e ai mercati.", cta: "Visita My Edge" },
    },
    storyEyebrow: "Chi è Urška",
    storyTitle: "Dalla parete alla tela",
    story: [
      "Per anni la mia vita è stata l'arrampicata. Ho gareggiato al massimo livello internazionale, e la parete mi ha insegnato disciplina, tenacia, presenza — e il coraggio di fidarmi del mio istinto.",
      "Quel percorso mi ha portata a una ricerca più profonda, che non si poteva esprimere solo con il movimento. Oggi le do forma con il colore, con le parole e con la pratica silenziosa.",
    ],
    readStory: "Leggi tutta la mia storia",
    milestones: ["Campionessa europea — boulder", "Campionessa nazionale — boulder e speed", "Vicecampionessa mondiale giovanile", "Podio — World Beach Games"],
    beginTitle: "Da dove vuoi cominciare?",
    climb: {
      lead: "Prima della tela c'era la roccia. Questi sono gli anni che mi hanno formata.",
      titlesEyebrow: "Sulla parete",
      shapedEyebrow: "Cosa mi ha dato l'arrampicata",
      soon: "Storie dalla parete, allenamenti e giornate all'aperto sono in arrivo.",
    },
  },
};

/** Every climbing title from the About page, for the Climb page. */
export const CLIMB_TITLES: Record<Locale, string[]> = {
  en: [
    "European Champion in bouldering",
    "Overall National Champion in bouldering",
    "Overall National Champion in speed climbing",
    "European Cup medalist",
    "World Youth Vice Champion",
    "European Youth Cup overall winner",
    "Podium at the World Beach Games",
  ],
  sl: [
    "Evropska prvakinja v balvanskem plezanju",
    "Skupna državna prvakinja v balvanskem plezanju",
    "Skupna državna prvakinja v hitrostnem plezanju",
    "Dobitnica medalje evropskega pokala",
    "Mladinska svetovna podprvakinja",
    "Skupna zmagovalka mladinskega evropskega pokala",
    "Stopničke na Svetovnih igrah na plaži",
  ],
  hr: [
    "Europska prvakinja u boulderingu",
    "Ukupna državna prvakinja u boulderingu",
    "Ukupna državna prvakinja u brzinskom penjanju",
    "Osvajačica medalje Europskog kupa",
    "Svjetska juniorska viceprvakinja",
    "Ukupna pobjednica juniorskog Europskog kupa",
    "Podij na Svjetskim igrama na plaži",
  ],
  de: [
    "Europameisterin im Bouldern",
    "Gesamtstaatsmeisterin im Bouldern",
    "Gesamtstaatsmeisterin im Speedklettern",
    "Medaillengewinnerin im Europacup",
    "Jugend-Vizeweltmeisterin",
    "Gesamtsiegerin des Jugend-Europacups",
    "Podium bei den World Beach Games",
  ],
  it: [
    "Campionessa europea di boulder",
    "Campionessa nazionale assoluta di boulder",
    "Campionessa nazionale assoluta di speed",
    "Medaglia in Coppa Europa",
    "Vicecampionessa mondiale giovanile",
    "Vincitrice assoluta della Coppa Europa giovanile",
    "Podio ai World Beach Games",
  ],
};
