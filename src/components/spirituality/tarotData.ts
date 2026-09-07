export type Lang = "sl" | "en";

export interface TarotCard {
  key: string;
  number: number;
  name: { sl: string; en: string };
  /** 3-4 word association list shown as tags under the card name. */
  keywords: { sl: string[]; en: string[] };
  /** Short evergreen line shown right under the card image. */
  meaning: { sl: string; en: string };
  /** Longer read (~150-220 words, paragraphs separated by blank lines). Evergreen,
   *  upright-only for now — reversed meanings are a natural next addition. */
  profile: { sl: string; en: string };
}

// The 22 Major Arcana. Traditional, evergreen card meanings (not a personalized reading) —
// same category as zodiacData.ts's sign profiles: generic archetypal characterization, safe
// to show without her review, but she's welcome to rewrite the voice. Deliberately upright-
// only for this first pass; reversed meanings and the Minor Arcana are natural follow-ups.
export const TAROT_CARDS: TarotCard[] = [
  {
    key: "fool",
    number: 0,
    name: { sl: "Norec", en: "The Fool" },
    keywords: { sl: ["Nov začetek", "Zaupanje", "Skok"], en: ["New beginnings", "Trust", "The leap"] },
    meaning: {
      sl: "Rob prepada ni znak, da se ustaviš. Je znak, da je čas za prvi korak.",
      en: "The edge of the cliff isn't a sign to stop. It's a sign it's time for the first step.",
    },
    profile: {
      sl: "Norec stoji na robu, z majhno culo čez ramo in psom ob nogah, ki zvesto opozarja — a on gleda navzgor, ne navzdol. Ne pozna še poti, in prav to ga osvobaja. Vsaka pot, ki jo je kdo kdaj prehodil, se je začela z nekom, ki ni vedel, kam pelje.\n\nTa karta ne govori o neumnosti, govori o pogumu, ki ga ima samo tisti, ki še ni bil ranjen z izkušnjo. Kadar se pojavi, te vabi, da stopiš v neznano brez celotnega načrta — da zaupaš, da se odgovori pokažejo med potjo. Ni čas za previdnost. Je čas za skok.",
      en: "The Fool stands at the edge, a small bundle over one shoulder, a dog at his feet loyally warning him — but he's looking up, not down. He doesn't know the path yet, and that's exactly what frees him. Every road anyone has ever walked began with someone who didn't know where it led.\n\nThis card isn't about foolishness — it's about a courage only available to someone who hasn't been wounded by experience yet. When it appears, it invites you to step into the unknown without the whole plan — to trust that the answers will show up along the way. This isn't a time for caution. It's a time to leap.",
    },
  },
  {
    key: "magician",
    number: 1,
    name: { sl: "Mag", en: "The Magician" },
    keywords: { sl: ["Volja", "Ustvarjanje", "Vsa orodja imaš"], en: ["Willpower", "Manifestation", "You have the tools"] },
    meaning: {
      sl: "Vse, kar potrebuješ, že imaš pred sabo na mizi. Vprašanje je, ali boš segel po tem.",
      en: "Everything you need is already on the table in front of you. The question is whether you'll reach for it.",
    },
    profile: {
      sl: "Mag stoji za mizo, na kateri ležijo vsa štiri orodja — čaša, meč, palica, pentagram — čustvo, misel, dejanje, telo. Ena roka kaže proti nebu, druga proti zemlji: povezuje idejo z resničnostjo. Nič ne čaka na naključje. Zna vzeti, kar že ima, in iz tega ustvariti nekaj novega.\n\nKadar se ta karta pojavi, sporoča, da imaš vse potrebne sposobnosti za nalogo pred sabo — vprašanje ni zmožnost, ampak namera. Osredotoči voljo na eno stvar, namesto da jo razpršiš na deset. Svet se ne bo premaknil sam. A ti se lahko premakneš vanj, natanko zdaj.",
      en: "The Magician stands behind a table holding all four tools — cup, sword, wand, pentacle — feeling, thought, action, body. One hand points to the sky, the other to the earth: connecting idea to reality. Nothing here waits for chance. He knows how to take what he already has and make something new from it.\n\nWhen this card appears, it says you already have every skill this task needs — the question isn't ability, it's intention. Focus your will on one thing instead of scattering it across ten. The world won't move on its own. But you can move into it, right now.",
    },
  },
  {
    key: "high-priestess",
    number: 2,
    name: { sl: "Vrhovna Duhovnica", en: "The High Priestess" },
    keywords: { sl: ["Intuicija", "Skrivnost", "Notranje vedenje"], en: ["Intuition", "Mystery", "Inner knowing"] },
    meaning: {
      sl: "Odgovor, ki ga iščeš zunaj, že šepeta znotraj tebe. Utihni dovolj dolgo, da ga slišiš.",
      en: "The answer you're searching for outside is already whispering inside you. Grow quiet enough to hear it.",
    },
    profile: {
      sl: "Vrhovna Duhovnica sedi med dvema stebroma, enim črnim in enim belim, senco in svetlobo, in ne izbere nobenega — ostane vmes, kjer se skrivnost šele oblikuje. Za njo je tanka zavesa; ne prepove ti pogleda, samo prosi, da si pripravljen videti. Njeno znanje ni v knjigah. Je v tišini.\n\nKadar se pojavi, te ta karta vabi, da zaupaš tistemu, česar (še) ne moreš razložiti z razumom. Nekaj že veš, še preden dobiš dokaz. To ni čas za glasne odločitve ali hitro delovanje — je čas za poslušanje. Sanje, slutnje, telesni občutki: vse to je jezik, ki ga vredno je razumeti.",
      en: "The High Priestess sits between two pillars, one black, one white, shadow and light, and chooses neither — she stays in the space between, where the mystery is still forming. Behind her hangs a thin veil; it doesn't forbid you to look, it only asks that you're ready to see. Her knowledge isn't in books. It's in silence.\n\nWhen this card appears, it invites you to trust what you can't yet explain with reason. You already know something before you have proof. This isn't a time for loud decisions or fast action — it's a time for listening. Dreams, hunches, the body's own signals: all of it is a language worth understanding.",
    },
  },
  {
    key: "empress",
    number: 3,
    name: { sl: "Cesarica", en: "The Empress" },
    keywords: { sl: ["Obilje", "Ustvarjalnost", "Nega"], en: ["Abundance", "Creativity", "Nurturing"] },
    meaning: {
      sl: "Nekaj, kar goji, raste. To velja za polja in za ljudi enako.",
      en: "What is nurtured, grows. That's as true of fields as it is of people.",
    },
    profile: {
      sl: "Cesarica sedi sredi bujnega polja, pšenica zori okrog nje, reka teče mimo — vse, kar se je dotakne, raste. Njena krona je iz zvezd, njeno kraljestvo pa ni osvojeno, ampak vzgojeno. Ne sili ničesar. Preprosto ustvarja pogoje, v katerih lahko življenje samo najde pot navzgor.\n\nKadar se pojavi, ta karta govori o obilju, ki prihaja iz nege, ne iz truda za vsako ceno — ustvarjalnem projektu, odnosu, telesu, ki potrebuje pozornost, ne pritiska. Poveži se s čutnostjo sveta: lepoto, okusom, dotikom. Nekaj v tebi je pripravljeno cveteti, če mu daš prostor in čas.",
      en: "The Empress sits in the middle of a lush field, wheat ripening around her, a river running past — everything she touches grows. Her crown is made of stars, and her kingdom wasn't conquered, it was cultivated. She forces nothing. She simply creates the conditions in which life can find its own way up.\n\nWhen this card appears, it speaks of abundance that comes from care, not effort at any cost — a creative project, a relationship, a body that needs attention, not pressure. Reconnect with the sensory world: beauty, taste, touch. Something in you is ready to bloom, if you give it room and time.",
    },
  },
  {
    key: "emperor",
    number: 4,
    name: { sl: "Cesar", en: "The Emperor" },
    keywords: { sl: ["Struktura", "Avtoriteta", "Trdnost"], en: ["Structure", "Authority", "Stability"] },
    meaning: {
      sl: "Svoboda brez oblike se razblini. Cesar zna postaviti mejo, znotraj katere lahko nekaj traja.",
      en: "Freedom without a shape dissolves. The Emperor knows how to set a boundary within which something can last.",
    },
    profile: {
      sl: "Cesar sedi na kamnitem prestolu, oklopljen pod ogrinjalom, pogled trden, roke mirne. Za njim gore, ki jih ni premaknil noben vihar. Ni tam po naključju — zgradil si je oblast s trudom in disciplino, in zdaj varuje to, kar je ustvaril, z jasnimi pravili, ne s tiranijo.\n\nKadar se pojavi, ta karta prinaša potrebo po strukturi — v projektu, ki mu manjka okvir, v odnosu, ki potrebuje jasne meje, v tebi samem, kadar si razpršen. Prevzemi odgovornost za svoje kraljestvo, kakršno koli že je. Red ni nasprotje svobode. Je oder, na katerem svoboda sploh lahko nastopi.",
      en: "The Emperor sits on a stone throne, armor beneath his robe, gaze steady, hands still. Behind him, mountains no storm has moved. He isn't there by accident — he built his authority through effort and discipline, and now he protects what he's created with clear rules, not tyranny.\n\nWhen this card appears, it brings a need for structure — in a project missing a framework, in a relationship that needs clear boundaries, in yourself when you feel scattered. Take responsibility for your own kingdom, whatever shape it takes. Order isn't the opposite of freedom. It's the stage freedom needs in order to perform at all.",
    },
  },
  {
    key: "hierophant",
    number: 5,
    name: { sl: "Hierofant", en: "The Hierophant" },
    keywords: { sl: ["Tradicija", "Učenje", "Skupnost"], en: ["Tradition", "Teaching", "Community"] },
    meaning: {
      sl: "Ne rabiš vedno izumiti kolesa na novo. Nekateri odgovori že obstajajo — pojdi jih vprašat.",
      en: "You don't always have to reinvent the wheel. Some answers already exist — go and ask.",
    },
    profile: {
      sl: "Hierofant sedi med dvema stebroma v templju, dva učenca pred njim poslušata. Njegova roka je dvignjena v blagoslov, njegovo znanje pa je podedovano — prehaja iz generacije v generacijo, preizkušeno, obstojno. Ne zanima ga izvirnost za vsako ceno. Zanima ga, kaj resnično deluje.\n\nKadar se pojavi, ta karta lahko govori o mentorstvu, formalnem izobraževanju, veri ali skupnosti, ki ti ponuja pripadnost. Morda je čas, da poiščeš vodjo, učitelja ali sistem, ki ga ni treba graditi od začetka. Ni vsaka pot samotna. Nekatere se hodijo lažje v vrsti za tistim, ki jo je že prehodil.",
      en: "The Hierophant sits between two pillars in a temple, two students listening before him. His hand is raised in blessing, and his knowledge is inherited — passed from generation to generation, tested, durable. He isn't interested in originality at any cost. He's interested in what actually works.\n\nWhen this card appears, it can speak of mentorship, formal education, faith, or a community offering you belonging. Maybe it's time to find a guide, a teacher, or a system you don't have to build from scratch. Not every path is walked alone. Some are easier walked in line behind someone who's already made the journey.",
    },
  },
  {
    key: "lovers",
    number: 6,
    name: { sl: "Ljubimca", en: "The Lovers" },
    keywords: { sl: ["Izbira", "Povezava", "Usklajenost"], en: ["Choice", "Union", "Alignment"] },
    meaning: {
      sl: "Ni vsaka odločitev enostavna, a nekatere te pripeljejo domov, k sebi.",
      en: "Not every decision is easy, but some lead you home, to yourself.",
    },
    profile: {
      sl: "Dva stojita naga, brez sramu, angel bdi nad njima z rokami, razprtimi kot blagoslov. Za njima drevo znanja in drevo življenja — izbira med tem, kar je varno, in tem, kar je resnično. Ta karta ni samo o romantiki. Je o vsakem trenutku, ko se moraš odločiti, kaj je usklajeno s tabo.\n\nKadar se pojavi, ta karta govori o pomembni izbiri — med dvema potema, dvema ljudema, dvema deloma sebe. Ne izbiraj tistega, kar je pričakovano. Izberi tisto, kar odmeva globoko, tudi če je težje razložiti zakaj. Prava povezava, s človekom ali s poklicno potjo, se čuti kot prepoznavanje, ne kot kompromis.",
      en: "Two stand naked, without shame, an angel watching over them, arms spread like a blessing. Behind them, the tree of knowledge and the tree of life — a choice between what's safe and what's true. This card isn't only about romance. It's about every moment you have to decide what's actually aligned with you.\n\nWhen this card appears, it speaks of an important choice — between two paths, two people, two parts of yourself. Don't choose what's expected. Choose what resonates deeply, even if it's harder to explain why. A real connection, with a person or a calling, feels like recognition, not compromise.",
    },
  },
  {
    key: "chariot",
    number: 7,
    name: { sl: "Voz", en: "The Chariot" },
    keywords: { sl: ["Volja", "Zmaga", "Nadzor"], en: ["Willpower", "Victory", "Control"] },
    meaning: {
      sl: "Dve sili vlečeta v različne smeri. Zmagaš, ko ju usmeriš k isti točki.",
      en: "Two forces are pulling in different directions. You win when you point them both at the same place.",
    },
    profile: {
      sl: "Voznik stoji v vozu, ki ga vlečeta dve sfingi, ena črna, ena bela — ne povezani z vajetmi, samo z njegovo voljo. Ne gre za silo, gre za usmerjenost. Nad glavo ima zvezde, oklep pod oblačilom pripravljenost. Zmaga ni naključje. Je posledica discipline, uporabljene v pravo smer.\n\nKadar se pojavi, ta karta prinaša moč, da premagaš nasprotujoče si sile — v sebi ali okrog sebe — in stopiš naprej z jasnim namenom. Ni čas za dvom. Je čas, da vzameš vajeti v roke in se premakneš, tudi če se dva dela tebe še vedno ne strinjata popolnoma.",
      en: "The charioteer stands in a chariot pulled by two sphinxes, one black, one white — not bound by reins, only by his will. This isn't about force, it's about direction. Stars crown his head, armor waits beneath his clothes. Victory isn't chance. It's the result of discipline pointed the right way.\n\nWhen this card appears, it brings the power to overcome opposing forces — inside you or around you — and move forward with clear intent. This isn't a time for doubt. It's a time to take the reins and move, even if two parts of you still don't fully agree.",
    },
  },
  {
    key: "strength",
    number: 8,
    name: { sl: "Moč", en: "Strength" },
    keywords: { sl: ["Nežnost", "Pogum", "Notranja moč"], en: ["Gentleness", "Courage", "Inner power"] },
    meaning: {
      sl: "Prava moč ne kriči. Položi roko na leva glavo in ga umiri z nežnostjo, ne s silo.",
      en: "Real strength doesn't shout. It rests a hand on the lion's head and calms it with gentleness, not force.",
    },
    profile: {
      sl: "Ženska stoji ob levu, roka mirno na njegovi glavi, nad njo znak neskončnosti. Ne bori se z zverjo. Udomačuje jo z ljubeznijo, ne s strahom. To je slika moči, kakršne svet redko uči — tiste, ki ne potrebuje glasnosti, da bi bila resnična.\n\nKadar se pojavi, ta karta govori o pogumu, ki se sooča z lastnimi nagoni, strahovi ali jezo — ne tako, da jih zatre, ampak tako, da jih razume in vodi. Nežnost ni šibkost. Kadar te nekaj v tebi želi pobegniti ali napasti, poskusi namesto tega ostati — z mehkobo, ki zdrži.",
      en: "A woman stands beside a lion, her hand resting calmly on its head, the infinity symbol above her. She doesn't fight the beast. She tames it with love, not fear. This is a picture of strength the world rarely teaches — the kind that doesn't need volume to be real.\n\nWhen this card appears, it speaks of the courage to face your own instincts, fears, or anger — not by suppressing them, but by understanding and guiding them. Gentleness isn't weakness. When something in you wants to flee or attack, try staying instead — with a softness that holds.",
    },
  },
  {
    key: "hermit",
    number: 9,
    name: { sl: "Puščavnik", en: "The Hermit" },
    keywords: { sl: ["Samota", "Notranje iskanje", "Modrost"], en: ["Solitude", "Inner search", "Wisdom"] },
    meaning: {
      sl: "Svetilka, ki jo nosi, ne razsvetljuje poti drugim. Najprej razsvetli njegovo lastno.",
      en: "The lantern he carries doesn't light the way for others first. It lights his own.",
    },
    profile: {
      sl: "Puščavnik stoji sam na vrhu gore, svetilka v roki, palica za oporo. Ne beži pred svetom — umika se vanj, v tišino, kjer se glasovi vseh drugih naposled utišajo in ostane samo njegov lasten. Njegova luč je majhna, a zadostuje, da vidi naslednji korak.\n\nKadar se pojavi, ta karta vabi k umiku — od hrupa, od pričakovanj drugih, od nenehnega odzivanja. Ni to osamljenost, je namerna samota, v kateri lahko najdeš odgovor, ki ga med ljudmi nikoli ne bi slišal. Nekaterih vprašanj se ne da rešiti v družbi. Rabijo tišino, in tebe, samega s sabo.",
      en: "The Hermit stands alone at the top of a mountain, a lantern in one hand, a staff for support. He isn't fleeing the world — he's withdrawing into it, into a silence where everyone else's voices finally quiet down and only his own remains. His light is small, but enough to see the next step.\n\nWhen this card appears, it invites withdrawal — from noise, from other people's expectations, from constantly reacting. This isn't loneliness, it's deliberate solitude, where you can find an answer you'd never hear among people. Some questions can't be solved in company. They need silence, and you, alone with yourself.",
    },
  },
  {
    key: "wheel-of-fortune",
    number: 10,
    name: { sl: "Kolo Sreče", en: "Wheel of Fortune" },
    keywords: { sl: ["Sprememba", "Cikli", "Usoda"], en: ["Change", "Cycles", "Fate"] },
    meaning: {
      sl: "Kolo se vrti, ne glede na to, ali ga poskušaš ustaviti. Vprašanje je, kako se vrtiš z njim.",
      en: "The wheel turns whether you try to stop it or not. The question is how you turn with it.",
    },
    profile: {
      sl: "Veliko kolo se vrti v zraku, na njem simboli, ki jih ni izumila naša doba — vsak cikel se je že zgodil, v neki obliki, nekomu drugemu prej. Kar je bilo zgoraj, gre navzdol; kar je bilo spodaj, se dvigne. Nič ne ostane isto za vedno, in v tem je pravzaprav olajšanje.\n\nKadar se pojavi, ta karta naznanja premik — nekaj, na kar nisi imel popolnega vpliva, se obrne. Ne oklepaj se tega, kar odhaja, in ne boj se tega, kar prihaja. Cikli obstajajo, da se učimo skozi njih, ne da bi jim ušli. Trenutna sreča ali smola ni trajno stanje. Je samo trenutek na kolesu.",
      en: "A great wheel turns in the air, marked with symbols older than our age — every cycle has already happened, in some form, to someone else before. What was on top goes down; what was below rises. Nothing stays the same forever, and there's real relief in that.\n\nWhen this card appears, it signals a shift — something you didn't have full control over is turning. Don't cling to what's leaving, and don't fear what's arriving. Cycles exist so we can learn through them, not escape them. Current luck or misfortune isn't a permanent state. It's just one moment on the wheel.",
    },
  },
  {
    key: "justice",
    number: 11,
    name: { sl: "Pravičnost", en: "Justice" },
    keywords: { sl: ["Ravnovesje", "Resnica", "Posledice"], en: ["Balance", "Truth", "Consequence"] },
    meaning: {
      sl: "Tehtnica ne laže. Kar poseješ, to na koncu tudi vidiš na drugi strani.",
      en: "The scale doesn't lie. What you sow, you eventually see on the other side.",
    },
    profile: {
      sl: "Pravičnost sedi med dvema stebroma, v eni roki meč, v drugi tehtnico. Meč je dvignjen naravnost, brez naklonjenosti kateri koli strani. Ne odloča po čustvih. Odloča po resnici, kakršna je, ne kakršno bi si kdo želel, da bi bila.\n\nKadar se pojavi, ta karta vabi k pošteni presoji — do sebe in do drugih. Morda prihaja odločitev, pogodba, ali posledica dejanja, ki si ga že storil. Ne izogibaj se odgovornosti in ne pričakuj, da bo nepravičnost trajala večno. Ravnovesje se vedno vzpostavi, čeprav včasih ne na način ali v času, ki bi ga izbral sam.",
      en: "Justice sits between two pillars, a sword in one hand, a scale in the other. The sword is raised straight, favoring no side. She doesn't decide by feeling. She decides by truth as it is, not as anyone might wish it to be.\n\nWhen this card appears, it invites a fair judgment — of yourself and of others. A decision, a contract, or the consequence of an action you've already taken may be arriving. Don't avoid responsibility, and don't expect unfairness to last forever. Balance always restores itself, though sometimes not in the way or the timing you'd have chosen.",
    },
  },
  {
    key: "hanged-man",
    number: 12,
    name: { sl: "Obešenec", en: "The Hanged Man" },
    keywords: { sl: ["Premor", "Nova perspektiva", "Predaja"], en: ["Pause", "New perspective", "Surrender"] },
    meaning: {
      sl: "Svet izgleda drugače, ko ga gledaš narobe. Včasih je to prav tisto, kar potrebuješ videti.",
      en: "The world looks different upside down. Sometimes that's exactly what you need to see.",
    },
    profile: {
      sl: "Obešenec visi za eno nogo z drevesa, obraz miren, skoraj nasmejan. Ni to kazen. Je izbrana predaja — obstanek v neudobnem položaju dovolj dolgo, da se perspektiva obrne. Okoli glave mu sveti tanek sij, znanje, ki ga ne bi dobil na noge postavljen.\n\nKadar se pojavi, ta karta pravi: ne siliš naprej. Namesto tega obstani, počakaj, glej stvari z druge strani. To ni čas za odločitve ali dejanja — je čas za predajo temu, česar ne moreš nadzorovati, in za zaupanje, da premor sam po sebi nosi svojo vrednost, tudi če se od zunaj zdi kot nič.",
      en: "The Hanged Man hangs by one leg from a tree, his face calm, almost smiling. This isn't punishment. It's a chosen surrender — staying in an uncomfortable position long enough for perspective to flip. A thin glow lights his head, a knowledge he wouldn't have gained standing upright.\n\nWhen this card appears, it says: don't push forward. Instead, stay, wait, look at things from the other side. This isn't a time for decisions or action — it's a time for surrendering to what you can't control, and trusting that the pause carries its own value, even if from outside it looks like nothing.",
    },
  },
  {
    key: "death",
    number: 13,
    name: { sl: "Smrt", en: "Death" },
    keywords: { sl: ["Konec", "Preobrazba", "Novo poglavje"], en: ["Ending", "Transformation", "New chapter"] },
    meaning: {
      sl: "Nekaj mora umreti, da lahko nekaj drugo živi. To ni tragedija — je narava.",
      en: "Something has to die so something else can live. That isn't a tragedy — it's nature.",
    },
    profile: {
      sl: "Smrt jaha belega konja, oklep črn, zastava z rožo, ki cveti kljub vsemu. Za njim vsi enako padejo — kralj, otrok, duhovnik — nihče ni izvzet iz spremembe. Toda za njim vzhaja tudi sonce. Konec ene stvari je vedno začetek naslednje.\n\nKadar se pojavi, ta karta redko napoveduje dobesedno smrt — govori o koncu obdobja, odnosa, identitete, ki je služila svojemu namenu in zdaj mora oditi, da nastane prostor za nekaj novega. Ne oklepaj se tega, kar je že mrtvo. Sprememba, ki se zdi kot izguba, je pogosto preobleka za rojstvo.",
      en: "Death rides a white horse, armor black, a flag bearing a rose that blooms regardless. Everyone falls before him equally — king, child, priest — no one is exempt from change. But behind him, the sun is also rising. The end of one thing is always the beginning of the next.\n\nWhen this card appears, it rarely predicts literal death — it speaks of the end of a phase, a relationship, an identity that has served its purpose and now has to leave to make room for something new. Don't cling to what's already gone. Change that feels like loss is often a birth in disguise.",
    },
  },
  {
    key: "temperance",
    number: 14,
    name: { sl: "Zmernost", en: "Temperance" },
    keywords: { sl: ["Ravnovesje", "Potrpežljivost", "Zlivanje"], en: ["Balance", "Patience", "Blending"] },
    meaning: {
      sl: "Ne obe skrajnosti naenkrat. Nekje vmes je tekočina, ki se ne razlije.",
      en: "Not both extremes at once. Somewhere in between is the liquid that doesn't spill.",
    },
    profile: {
      sl: "Angel stoji z eno nogo v vodi, eno na kopnem, in preliva tekočino iz ene čaše v drugo, brez da bi izgubil kapljo. Ne hiti. Ne razdvaja sveta na črno in belo — najde tretji prostor, kjer se stvari, ki se zdijo nasprotujoče, lahko srečajo.\n\nKadar se pojavi, ta karta vabi k potrpežljivosti in zmernosti — v čustvih, ki jih morda želiš izraziti naenkrat, v odločitvah, ki se zdijo kot 'vse ali nič'. Poišči srednjo pot. Nekaj, kar traja, redko nastane v naglici. Mešanje, usklajevanje, počasno prilagajanje — to je alkimija te karte.",
      en: "An angel stands with one foot in water, one on land, pouring liquid from one cup to another without losing a drop. There's no rush here. The world isn't split into black and white — she finds the third space where things that seem opposed can meet.\n\nWhen this card appears, it invites patience and moderation — in feelings you might want to express all at once, in decisions that feel like \"all or nothing.\" Look for the middle path. Something built to last is rarely made in a hurry. Blending, balancing, slow adjustment — that's this card's alchemy.",
    },
  },
  {
    key: "devil",
    number: 15,
    name: { sl: "Vrag", en: "The Devil" },
    keywords: { sl: ["Navezanost", "Senca", "Iluzija ujetosti"], en: ["Attachment", "Shadow", "Illusion of being trapped"] },
    meaning: {
      sl: "Verige okoli vratu para so tako ohlapne, da bi jih lahko sneli. Nihče ju ne drži tam razen njiju samih.",
      en: "The chains around the couple's necks are loose enough to slip off. Nothing holds them there but themselves.",
    },
    profile: {
      sl: "Vrag sedi nad parom, oba priklenjena, a ohlapno — verigi bi lahko zdrsnili čez glavo, če bi le poskusila. Ne gre za resnično ujetost. Gre za navado, strah, odvisnost, prepričanje, da nimata izbire. Vrag ne prisili nikogar. Samo izkorišča to, kar že sama izbereta znova in znova.\n\nKadar se pojavi, ta karta razkriva vzorec, ki te drži ujetega — razmerje, ki ti ne služi, navado, ki jo ponavljaš, misel, ki te prepričuje, da si nemočen. Resnica je neprijetna, a osvobajajoča: veriga je snemljiva. Prvi korak k svobodi je priznati, da si tam ostal po lastni izbiri.",
      en: "The Devil looms over a couple, both chained, but loosely — the chains could slip over their heads if they only tried. This isn't real captivity. It's habit, fear, dependency, the belief that they have no choice. The Devil forces no one. He simply exploits what they keep choosing, again and again.\n\nWhen this card appears, it reveals a pattern that's keeping you trapped — a relationship that doesn't serve you, a habit you keep repeating, a thought convincing you that you're powerless. The truth is uncomfortable but freeing: the chain slips off. The first step to freedom is admitting you stayed there by choice.",
    },
  },
  {
    key: "tower",
    number: 16,
    name: { sl: "Stolp", en: "The Tower" },
    keywords: { sl: ["Nenaden preobrat", "Razkritje", "Podiranje"], en: ["Sudden upheaval", "Revelation", "Collapse"] },
    meaning: {
      sl: "Strela ne uniči tega, kar je bilo trdno. Razkrije, kar je že bilo votlo.",
      en: "Lightning doesn't destroy what was solid. It reveals what was already hollow.",
    },
    profile: {
      sl: "Strela udari v vrh stolpa, krona odleti, dve figuri padata skozi zrak. Zgradba, za katero so mislili, da bo večna, se podre v enem samem trenutku. To je najbolj boleča karta v špilu — a tudi eno najbolj potrebnih.\n\nKadar se pojavi, ta karta napoveduje nenaden preobrat, ki ga nisi izbral — konec iluzije, razkritje resnice, ki jo je bilo lažje ne videti. Ne gre za kaznovanje. Gre za osvoboditev od strukture, ki je bila zgrajena na napačnih temeljih. Kar se poruši, se je moralo podreti, da se lahko zgradi nekaj resničnega na njegovem mestu.",
      en: "Lightning strikes the top of a tower, the crown flies off, two figures fall through the air. A structure believed to be permanent collapses in a single moment. This is the most painful card in the deck — and also one of the most necessary.\n\nWhen this card appears, it predicts a sudden upheaval you didn't choose — the end of an illusion, the revelation of a truth that was easier not to see. This isn't punishment. It's liberation from a structure built on the wrong foundation. What falls had to fall, so something real could be built in its place.",
    },
  },
  {
    key: "star",
    number: 17,
    name: { sl: "Zvezda", en: "The Star" },
    keywords: { sl: ["Upanje", "Obnova", "Vodilna luč"], en: ["Hope", "Renewal", "A guiding light"] },
    meaning: {
      sl: "Po nevihti Stolpa pride tišina, in v tišini ena sama luč, ki kaže pot naprej.",
      en: "After the Tower's storm comes silence, and in the silence, one single light showing the way forward.",
    },
    profile: {
      sl: "Ženska kleči ob vodi, gola, brez sramu, in vlije vodo iz dveh vrčev — enega nazaj v vodo, drugega na zemljo. Nad njo sedem manjših zvezd in ena velika, vodilna. Po vsem, kar je Stolp podrl, prihaja ta karta kot dih po dolgem zadrževanju sape.\n\nKadar se pojavi, ta karta prinaša upanje, ki ni naivno — je zasluženo, po nečem, kar si preživel. Zaupaj, da se stvari izboljšujejo, tudi če počasi. Ta ni čas za dvom vase. Nekje daleč gori luč, ki te vodi, tudi kadar je ne vidiš popolnoma jasno. Nadaljuj v njeno smer.",
      en: "A woman kneels by the water, naked, without shame, pouring water from two jugs — one back into the water, one onto the earth. Above her, seven small stars and one great, guiding one. After everything the Tower tore down, this card arrives like a breath after holding it too long.\n\nWhen this card appears, it brings hope that isn't naive — it's earned, after something survived. Trust that things are getting better, even slowly. This isn't a time to doubt yourself. Somewhere far off a light is guiding you, even when you can't see it perfectly clearly. Keep moving toward it.",
    },
  },
  {
    key: "moon",
    number: 18,
    name: { sl: "Luna", en: "The Moon" },
    keywords: { sl: ["Negotovost", "Podzavest", "Iluzija"], en: ["Uncertainty", "Subconscious", "Illusion"] },
    meaning: {
      sl: "Pot skozi noč je resnična, tudi če ne vidiš, kam pelje. Nadaljuj, korak za korakom.",
      en: "The path through the night is real, even if you can't see where it leads. Keep walking, one step at a time.",
    },
    profile: {
      sl: "Luna sveti nad potjo, ki vodi med dvema stolpoma, v neznano. Pes in volk zavijata vanjo, rak se plazi iz vode — vse, kar je skrito, se ponoči prebudi. To je karta senc, sanj, strahov, ki nimajo popolnoma jasne oblike podnevi.\n\nKadar se pojavi, ta karta opozarja, da stvari morda niso takšne, kot se zdijo — informacije so nepopolne, čustva zmedena, pot ni povsem jasna. Ne siliš k jasnosti, ki je še ni. Namesto tega zaupaj intuiciji, ki vidi v temi bolje kot razum. Negotovost ni znak, da si na napačni poti. Je samo del noči, skozi katero moraš iti.",
      en: "The Moon shines over a path leading between two towers, into the unknown. A dog and a wolf howl at it, a crab crawls from the water — everything hidden wakes at night. This is the card of shadows, dreams, and fears that don't have a fully clear shape in daylight.\n\nWhen this card appears, it warns that things may not be as they seem — information is incomplete, feelings are tangled, the path isn't fully clear. Don't force a clarity that isn't there yet. Instead, trust the intuition that sees better in the dark than reason does. Uncertainty isn't a sign you're on the wrong path. It's just part of the night you have to walk through.",
    },
  },
  {
    key: "sun",
    number: 19,
    name: { sl: "Sonce", en: "The Sun" },
    keywords: { sl: ["Radost", "Jasnost", "Uspeh"], en: ["Joy", "Clarity", "Success"] },
    meaning: {
      sl: "Ni razloga skrivati se v senci, ko je nebo tako jasno.",
      en: "There's no reason to hide in the shade when the sky is this clear.",
    },
    profile: {
      sl: "Otrok jaha belega konja pod velikim, žarečim soncem, roke razprte, sončnice cvetijo za njim. Nič skritega, nič v senci — to je najbolj neposredno vesela karta v celotnem špilu. Radost tukaj ni naivnost. Je zaslužena preprostost, po vsem, kar je bilo prej.\n\nKadar se pojavi, ta karta prinaša jasnost, uspeh, in pristno veselje — v projektu, ki končno obrodi sadove, v odnosu, ki se počuti lahkoten, v tebi samem, ko se počutiš spet cel. Dovoli si uživati brez občutka krivde, brez čakanja na naslednjo skrb. Ta trenutek toplote je zaslužen. Sprejmi ga v celoti.",
      en: "A child rides a white horse under a great, glowing sun, arms open, sunflowers blooming behind. Nothing hidden, nothing in shadow — this is the most directly joyful card in the entire deck. The joy here isn't naive. It's an earned simplicity, after everything that came before.\n\nWhen this card appears, it brings clarity, success, and genuine joy — in a project finally bearing fruit, in a relationship that feels light, in yourself, feeling whole again. Let yourself enjoy it without guilt, without waiting for the next worry. This warmth is earned. Receive it fully.",
    },
  },
  {
    key: "judgement",
    number: 20,
    name: { sl: "Sodba", en: "Judgement" },
    keywords: { sl: ["Prebujenje", "Odpuščanje", "Klic"], en: ["Awakening", "Forgiveness", "A calling"] },
    meaning: {
      sl: "Trobenta ne sodi. Samo kliče tiste, ki so pripravljeni vstati.",
      en: "The trumpet doesn't judge. It just calls those who are ready to rise.",
    },
    profile: {
      sl: "Angel trobi nad odprtimi grobovi, in mrtvi vstajajo, roke dvignjene, pripravljeni na nekaj novega. To ni kazen. Je klic k prebujenju — trenutek, ko postane nemogoče še naprej ignorirati resnico o sebi ali svojem življenju.\n\nKadar se pojavi, ta karta vabi k pošteni presoji preteklosti — ne z obsojanjem, ampak z odpuščanjem, tako sebi kot drugim. Nekaj v tebi je pripravljeno vstati iz tega, kar je bilo. Poslušaj klic, tudi če prihaja ob neprijetnem času. Prebujenje ni vedno udobno. A je vedno vredno odziva.",
      en: "An angel blows a trumpet over open graves, and the dead rise, arms raised, ready for something new. This isn't punishment. It's a call to awaken — the moment it becomes impossible to keep ignoring the truth about yourself or your life.\n\nWhen this card appears, it invites an honest reckoning with the past — not with judgment, but with forgiveness, both of yourself and others. Something in you is ready to rise from what has been. Listen for the call, even if it comes at an inconvenient time. Awakening isn't always comfortable. But it's always worth answering.",
    },
  },
  {
    key: "world",
    number: 21,
    name: { sl: "Svet", en: "The World" },
    keywords: { sl: ["Dopolnitev", "Celovitost", "Nov cikel"], en: ["Completion", "Wholeness", "A new cycle"] },
    meaning: {
      sl: "Krog se zapre. In v istem trenutku se že odpre naslednji.",
      en: "The circle closes. And in the same moment, the next one is already opening.",
    },
    profile: {
      sl: "Figura pleše sredi lovorovega venca, obdana s štirimi bitji vogalov sveta — bik, lev, orel, človek. Vse je tukaj, vse je povezano, nič ne manjka. To je zadnja karta Velikih Arkan, dopolnitev dolgega potovanja, ki se je začelo z Norcem na robu prepada.\n\nKadar se pojavi, ta karta naznanja zaključek — cikel, projekt, poglavje življenja, ki je prišlo do svojega naravnega konca, uspešno. Praznuj to, kar si dosegel. A vedi tudi, da vsak konec nosi seme naslednjega začetka. Svet se ne ustavi. Samo zavrti se naprej, v nov krog, z vsem, kar si se naučil, že vgrajenim vase.",
      en: "A figure dances inside a laurel wreath, surrounded by the four creatures of the world's corners — bull, lion, eagle, human. Everything is here, everything connected, nothing missing. This is the final card of the Major Arcana, the completion of the long journey that began with the Fool at the cliff's edge.\n\nWhen this card appears, it announces a completion — a cycle, a project, a chapter of life that has reached its natural end, successfully. Celebrate what you've achieved. But know too that every ending carries the seed of the next beginning. The world doesn't stop. It just turns forward, into a new circle, with everything you've learned already built into you.",
    },
  },
];

export function getCardOfTheDayKey(): string {
  const now = new Date();
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - start;
  const dayOfYear = Math.floor(diff / 86400000);
  return TAROT_CARDS[dayOfYear % TAROT_CARDS.length].key;
}
