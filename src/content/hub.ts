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
  finance: {
    lead: string;
    intro: string;
    learnedEyebrow: string;
    /** [title, line] — the parts of My Edge Official, as the site names them. */
    topics: [string, string][];
    quote: string;
    visit: string;
    note: string;
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
      finance: { nav: "Finance", line: "The calm and discipline of the wall, applied to money and the markets.", cta: "How I learned" },
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
    finance: {
      lead: "Everything I know about money and the markets, I learned on My Edge Official.",
      intro: "After the wall I wanted to understand money the way I once learned to read a route — calmly, step by step, without guessing. My Edge Official is where I learned it: the concepts, the strategies, the theory behind them and the psychology of staying steady when the market isn't.",
      learnedEyebrow: "What I learned there",
      topics: [
        ["Concepts", "The language of the markets, from the ground up."],
        ["Strategies", "Clear setups, and when not to take them."],
        ["Theory", "Why prices move the way they do."],
        ["Psychology", "The calm the wall taught me, applied to decisions."],
        ["The System", "One way of working, followed every day."],
        ["Sentinel", "A trading journal that keeps me honest."],
      ],
      quote: "Discipline, patience and trusting the process — the same on the rock and in the markets.",
      visit: "Visit My Edge Official",
      note: "My Edge Official is education only, not financial advice. Trading carries risk, including the loss of capital.",
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
      finance: { nav: "Finance", line: "Mir in disciplina stene, preneseni na denar in trge.", cta: "Kako sem se učila" },
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
    finance: {
      lead: "Vse, kar vem o denarju in trgih, sem se naučila na My Edge Official.",
      intro: "Po steni sem želela razumeti denar tako, kot sem se nekoč naučila brati smer — mirno, korak za korakom, brez ugibanja. My Edge Official je kraj, kjer sem se tega naučila: pojmi, strategije, teorija za njimi in psihologija, kako ostati miren, ko trg ni.",
      learnedEyebrow: "Kaj sem se tam naučila",
      topics: [
        ["Pojmi", "Jezik trgov, od začetka."],
        ["Strategije", "Jasne postavitve — in kdaj jih ne vzeti."],
        ["Teorija", "Zakaj se cene gibljejo tako, kot se."],
        ["Psihologija", "Mir, ki me ga je naučila stena, pri odločitvah."],
        ["Sistem", "En način dela, vsak dan."],
        ["Sentinel", "Trgovalni dnevnik, ki me drži iskreno."],
      ],
      quote: "Disciplina, potrpežljivost in zaupanje v proces — enako na skali in na trgih.",
      visit: "Obišči My Edge Official",
      note: "My Edge Official je izobraževanje, ne finančni nasvet. Trgovanje prinaša tveganje, tudi izgubo vloženega denarja.",
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
      finance: { nav: "Financije", line: "Mir i disciplina stijene, preneseni na novac i tržišta.", cta: "Kako sam učila" },
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
    finance: {
      lead: "Sve što znam o novcu i tržištima naučila sam na My Edge Official.",
      intro: "Nakon stijene htjela sam razumjeti novac onako kako sam nekoć naučila čitati smjer — mirno, korak po korak, bez nagađanja. My Edge Official je mjesto gdje sam to naučila: pojmove, strategije, teoriju iza njih i psihologiju kako ostati miran kad tržište nije.",
      learnedEyebrow: "Što sam ondje naučila",
      topics: [
        ["Pojmovi", "Jezik tržišta, od početka."],
        ["Strategije", "Jasne postavke — i kad ih ne uzeti."],
        ["Teorija", "Zašto se cijene kreću kako se kreću."],
        ["Psihologija", "Mir kojem me naučila stijena, u odlukama."],
        ["Sustav", "Jedan način rada, svaki dan."],
        ["Sentinel", "Trgovački dnevnik koji me drži iskrenom."],
      ],
      quote: "Disciplina, strpljenje i povjerenje u proces — isto na stijeni i na tržištima.",
      visit: "Posjeti My Edge Official",
      note: "My Edge Official je edukacija, ne financijski savjet. Trgovanje nosi rizik, uključujući gubitak kapitala.",
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
      finance: { nav: "Finanzen", line: "Die Ruhe und Disziplin der Wand, übertragen auf Geld und Märkte.", cta: "Wie ich gelernt habe" },
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
    finance: {
      lead: "Alles, was ich über Geld und Märkte weiß, habe ich bei My Edge Official gelernt.",
      intro: "Nach der Wand wollte ich Geld so verstehen, wie ich einst lernte, eine Route zu lesen — ruhig, Schritt für Schritt, ohne zu raten. Bei My Edge Official habe ich es gelernt: die Begriffe, die Strategien, die Theorie dahinter und die Psychologie, ruhig zu bleiben, wenn der Markt es nicht ist.",
      learnedEyebrow: "Was ich dort gelernt habe",
      topics: [
        ["Begriffe", "Die Sprache der Märkte, von Grund auf."],
        ["Strategien", "Klare Setups — und wann man sie auslässt."],
        ["Theorie", "Warum sich Preise so bewegen, wie sie es tun."],
        ["Psychologie", "Die Ruhe der Wand, angewandt auf Entscheidungen."],
        ["Das System", "Eine Arbeitsweise, jeden Tag befolgt."],
        ["Sentinel", "Ein Trading-Journal, das mich ehrlich hält."],
      ],
      quote: "Disziplin, Geduld und Vertrauen in den Prozess — am Fels wie an den Märkten.",
      visit: "Zu My Edge Official",
      note: "My Edge Official dient nur der Bildung und ist keine Finanzberatung. Trading birgt Risiken bis hin zum Kapitalverlust.",
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
      finance: { nav: "Finanza", line: "La calma e la disciplina della parete, applicate al denaro e ai mercati.", cta: "Come ho imparato" },
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
    finance: {
      lead: "Tutto ciò che so sul denaro e sui mercati l'ho imparato su My Edge Official.",
      intro: "Dopo la parete volevo capire il denaro come un tempo avevo imparato a leggere una via — con calma, passo dopo passo, senza tirare a indovinare. My Edge Official è dove l'ho imparato: i concetti, le strategie, la teoria che c'è dietro e la psicologia per restare calma quando il mercato non lo è.",
      learnedEyebrow: "Cosa ho imparato lì",
      topics: [
        ["Concetti", "La lingua dei mercati, dalle basi."],
        ["Strategie", "Setup chiari — e quando non prenderli."],
        ["Teoria", "Perché i prezzi si muovono come si muovono."],
        ["Psicologia", "La calma della parete, applicata alle decisioni."],
        ["Il Sistema", "Un solo modo di lavorare, ogni giorno."],
        ["Sentinel", "Un diario di trading che mi mantiene onesta."],
      ],
      quote: "Disciplina, pazienza e fiducia nel processo — uguali sulla roccia e sui mercati.",
      visit: "Visita My Edge Official",
      note: "My Edge Official è solo formazione, non consulenza finanziaria. Il trading comporta rischi, inclusa la perdita del capitale.",
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
