export type Lang = "sl" | "en";

export interface Sign {
  key: string;
  name: { sl: string; en: string };
  dates: { sl: string; en: string };
  element: { sl: string; en: string };
  /** Short evergreen line shown right under the wheel. */
  tagline: { sl: string; en: string };
  /** Longer read (~350-450 words, paragraphs separated by blank lines). Evergreen. */
  profile: { sl: string; en: string };
  /** Pool of short "this week" lines — which one shows rotates automatically with the
   *  calendar (ISO week number), so the page updates on its own, with no manual work. */
  weeklyFocus: { sl: string[]; en: string[] };
  /** Month/day the sign's season starts (inclusive), for figuring out "today". */
  start: [number, number];
}

// Standard tropical zodiac date ranges. All trait/profile text is generic astrological
// characterization (not a personalized daily reading) — evergreen, not invented business
// fact, safe to show without her review, but she's welcome to rewrite the voice.
export const SIGNS: Sign[] = [
  {
    key: "aries",
    name: { sl: "Oven", en: "Aries" },
    dates: { sl: "21. mar – 19. apr", en: "Mar 21 – Apr 19" },
    element: { sl: "Ogenj", en: "Fire" },
    tagline: {
      sl: "Prvi vžig, ne zadnji dvom. Oven ne čaka na popolni trenutek — on ga ustvari s tem, da stopi vanj.",
      en: "The first spark, not the last doubt. Aries doesn't wait for the perfect moment — it creates one by stepping in.",
    },
    profile: {
      sl: "Oven je prvi znak kroga, in to se pozna. Ne prihaja tja, kjer je udobno, ampak tja, kjer se nekaj šele začenja. Njegov element je ogenj, njegova narava pa gibanje — Oven redkeje sprašuje 'kaj če', pogosteje pa preprosto stopi naprej. To ni nepremišljenost, čeprav se od zunaj tako zdi. Je zaupanje, da se odgovori pokažejo med potjo, ne prej.\n\nNjegov dar je pogum, ki ga drugi šele iščejo, ko je Oven že na pol poti. Senca pa je nestrpnost do počasnejših ritmov — svojih in tujih. Oven se uči, da začetek ni isto kot dokončanje, in da prava moč včasih pomeni ostati, ko bi bilo lažje oditi naprej k naslednji stvari.\n\nV ljubezni Oven ne igra iger. Kadar nekoga izbere, to pove naravnost, brez ovinkov — in ravno ta iskrenost je tisto, po čemer ga duše prepoznajo. Ne rabi dolgega dvorjenja, da ve. Njegovo srce se odloči hitro, ker mu zaupa vase.",
      en: "Aries is the first sign of the wheel, and it shows. It doesn't go where things are comfortable — it goes where something is just beginning. Its element is fire, and its nature is motion: Aries rarely asks \"what if\" and far more often simply steps forward. That isn't recklessness, even if it looks that way from outside. It's trust that the answers will show up along the way, not before.\n\nIts gift is a courage other people are still searching for by the time Aries is already halfway there. Its shadow is impatience with slower rhythms — its own and everyone else's. Aries is learning that starting something isn't the same as finishing it, and that real strength sometimes means staying, when it would be easier to move on to the next thing.\n\nIn love, Aries doesn't play games. When it chooses someone, it says so plainly, with no detours — and that honesty is exactly what makes a soul recognize it. It doesn't need a long courtship to know. Its heart decides fast, because it trusts itself.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden te vabi, da narediš prvi korak, še preden imaš popoln načrt. Pogum ne čaka na gotovost.",
        "Nekaj v tebi je nestrpno — poslušaj to, a ne dovoli, da hitrost pomeni nepremišljenost.",
        "Teden je primeren, da poveš, kar čutiš, brez ovinkov. Iskrenost je tvoja najmočnejša oblika ljubezni.",
        "Počitek ni poraz. Ta teden dovoli sebi, da se ne dokazuješ vsem naenkrat.",
      ],
      en: [
        "This week invites you to take the first step before you have the perfect plan. Courage doesn't wait for certainty.",
        "Something in you is impatient — listen to it, but don't let speed become carelessness.",
        "This is a good week to say what you feel, plainly. Honesty is your strongest form of love.",
        "Rest isn't defeat. Let yourself off the hook from proving something to everyone at once, this week.",
      ],
    },
    start: [3, 21],
  },
  {
    key: "taurus",
    name: { sl: "Bik", en: "Taurus" },
    dates: { sl: "20. apr – 20. maj", en: "Apr 20 – May 20" },
    element: { sl: "Zemlja", en: "Earth" },
    tagline: {
      sl: "Korenine, ki jim ne mudi se. Bik zaupa počasnim stvarem — ljubezni, ki raste, delu, ki traja.",
      en: "Roots that aren't in a hurry. Taurus trusts slow things — love that grows, work that lasts.",
    },
    profile: {
      sl: "Bik ne hiti, ker ve, da se najlepše stvari ne dajo pospešiti. Njegov element je zemlja, njegova zvestoba pa najprej velja lastnemu telesu in čutom — dotiku, okusu, udobju, lepoti, ki jo lahko dejansko čutiš, ne le zamisliš. Bik gradi počasi, a to, kar zgradi, redko razpade.\n\nNjegov dar je vztrajnost, ki drugim zgleda skoraj nadnaravno. Senca pa je trma, ki se včasih drži starega samo zato, ker je znano, ne ker še služi. Bik se uči razlikovati med stabilnostjo in obtičanjem — med koreninami in verigami.\n\nV ljubezni je Bik zvest do konca, in ta zvestoba ni tiha obljuba, je dejanje, ponovljeno vsak dan. Ne potrebuje dramatičnih gest, da dokaže, da mu je mar — dokaže to s tem, da ostane. Duše, ki iščejo mir, najpogosteje najdejo prav njega.",
      en: "Taurus doesn't rush, because it knows the best things can't be sped up. Its element is earth, and its loyalty belongs first to its own body and senses — touch, taste, comfort, beauty you can actually feel, not just imagine. Taurus builds slowly, but what it builds rarely falls apart.\n\nIts gift is a persistence that looks almost superhuman to everyone else. Its shadow is a stubbornness that sometimes holds onto the old simply because it's familiar, not because it still serves. Taurus is learning to tell the difference between stability and being stuck — between roots and chains.\n\nIn love, Taurus is loyal to the end, and that loyalty isn't a quiet promise — it's an action, repeated every day. It doesn't need dramatic gestures to prove it cares; it proves it by staying. Souls looking for peace most often find it here.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden ne rabiš dokazovati ničesar naglo. Naredi eno stvar dobro, namesto desetih na hitro.",
        "Nekaj se v tebi upira spremembi. Vprašaj se, ali držiš korenine ali samo staro navado.",
        "Poišči nekaj lepega zase — dotik, okus, mir. Tvoje telo ve, kaj potrebuje, če mu prisluhneš.",
        "Zvestoba, ki jo ponujaš drugim, tokrat ponudi tudi sebi. Ostani na svoji strani.",
      ],
      en: [
        "You don't need to prove anything in a hurry this week. Do one thing well instead of ten things fast.",
        "Something in you is resisting change. Ask whether you're holding onto roots, or just an old habit.",
        "Find something beautiful for yourself — a touch, a taste, a moment of ease. Your body knows what it needs, if you listen.",
        "The loyalty you offer everyone else — offer it to yourself too, this time. Stay on your own side.",
      ],
    },
    start: [4, 20],
  },
  {
    key: "gemini",
    name: { sl: "Dvojčka", en: "Gemini" },
    dates: { sl: "21. maj – 20. jun", en: "May 21 – Jun 20" },
    element: { sl: "Zrak", en: "Air" },
    tagline: {
      sl: "Dva glasova, ena duša, ki se uči same sebe skozi pogovor. Dvojčka najdeta resnico tako, da jo izgovorita naglas.",
      en: "Two voices, one soul learning itself through conversation. Gemini finds truth by speaking it out loud.",
    },
    profile: {
      sl: "Dvojčka nikoli nista samo eno. V njiju živi radovednost, ki preskakuje od misli do misli, od pogovora do pogovora, kot da bi en sam odgovor nikoli ne bil dovolj. Njun element je zrak — lahek, hiter, povsod prisoten. Svet razumeta tako, da o njem govorita naglas.\n\nNjun dar je um, ki poveže stvari, ki se na prvi pogled ne zdijo povezane. Senca pa je razpršenost — tolikšna lakota po novem, da lahko izgubita stik s tistim, kar sta si že zgradila. Dvojčka se učita, da globina ni nasprotje radovednosti, samo njena počasnejša sestra.\n\nV ljubezni Dvojčka potrebujeta nekoga, s komer se lahko pogovarjata o vsem — tudi o tistem, česar še sama ne razumeta. Njuna duša se prepozna v besedah, ne le v tišini. Kdor jih res sliši, dobi dostop do obeh strani, ki ju nosita v sebi.",
      en: "Gemini is never just one thing. There's a curiosity in it that jumps from thought to thought, conversation to conversation, as if a single answer could never be enough. Its element is air — light, quick, everywhere at once. It understands the world by talking about it out loud.\n\nIts gift is a mind that connects things that don't look related at first glance. Its shadow is scatter — such a hunger for the new that it can lose touch with what it's already built. Gemini is learning that depth isn't the opposite of curiosity, just its slower sibling.\n\nIn love, Gemini needs someone it can talk to about everything — including the things it doesn't understand yet itself. Its soul recognizes itself in words, not just in silence. Whoever truly listens gets access to both sides it carries within.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden te bo eno vprašanje spremljalo dlje kot običajno. Ne beži od njega — sedi z njim.",
        "Preveč glasov v tvoji glavi? Izberi enega sogovornika in mu povej resnico do konca.",
        "Tvoja radovednost je dar. Tokrat jo usmeri v nekaj, kar že poznaš, ne le v novo.",
        "Beseda, ki jo dolguješ nekomu, naj bo tokrat izrečena naglas, ne samo premišljena.",
      ],
      en: [
        "One question will stay with you longer than usual this week. Don't run from it — sit with it.",
        "Too many voices in your head? Pick one person to talk to, and tell them the whole truth.",
        "Your curiosity is a gift. This time, point it at something you already know, not just something new.",
        "A word you owe someone deserves to be spoken out loud this time, not just thought.",
      ],
    },
    start: [5, 21],
  },
  {
    key: "cancer",
    name: { sl: "Rak", en: "Cancer" },
    dates: { sl: "21. jun – 22. jul", en: "Jun 21 – Jul 22" },
    element: { sl: "Voda", en: "Water" },
    tagline: {
      sl: "Oklep zunaj, morje znotraj. Rak varuje tiste, ki jih ljubi, tako kot bi varoval samega sebe.",
      en: "A shell outside, an ocean within. Cancer protects the ones it loves the way it protects itself.",
    },
    profile: {
      sl: "Rak nosi dom v sebi, ne glede na to, kje se telesno nahaja. Njegov element je voda, njegov ritem pa sledi nevidnim plimam — čustvom, ki jih ne izbira, ampak jih preprosto čuti, globlje kot večina. Oklep, ki ga kaže navzven, ni hladnost. Je zaščita nečesa mehkega.\n\nNjegov dar je sposobnost, da čuti, kaj drug človek potrebuje, še preden ta to izreče. Senca pa je nagnjenost, da se zapre vase, ko se počuti ranjenega, in tam ostane dlje, kot bi bilo treba. Rak se uči, da ranljivost, pokazana pravemu človeku, ni nevarnost — je most.\n\nV ljubezni Rak varuje tako, kot bi želel biti varovan sam. Njegova naklonjenost se ne kriči, se počasi gradi, dan za dnem, v majhnih dejanjih skrbi. Kdor si prisluži njegovo zaupanje, si prisluži nekaj redkega: dom, ki hodi ob tebi.",
      en: "Cancer carries home inside itself, no matter where it physically is. Its element is water, and its rhythm follows invisible tides — feelings it doesn't choose, just feels, more deeply than most. The shell it shows the world isn't coldness. It's protection for something soft.\n\nIts gift is sensing what another person needs before they've said it. Its shadow is a tendency to close up when hurt, and stay closed longer than it should. Cancer is learning that vulnerability, shown to the right person, isn't danger — it's a bridge.\n\nIn love, Cancer protects the way it wishes it were protected. Its affection doesn't announce itself; it's built slowly, day by day, in small acts of care. Whoever earns its trust earns something rare: a home that walks beside them.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden ne skrivaj, kako se počutiš, pred tistim, ki mu resnično zaupaš. Oklep lahko počiva.",
        "Nekdo v tvoji bližini potrebuje natanko to, kar mu tako naravno znaš dati — pozornost brez besed.",
        "Če se počutiš ranjeno, umik ni napaka. A ne pozabi, kdo te čaka na drugi strani.",
        "Doma ni samo kraj. Tokrat ustvari en majhen kotiček miru, samo zase.",
      ],
      en: [
        "Don't hide how you feel from someone you truly trust this week. The shell can rest.",
        "Someone close to you needs exactly what you already know how to give — attention, without needing words.",
        "If you feel hurt, retreating isn't wrong. Just don't forget who's waiting on the other side.",
        "Home isn't only a place. Build one small corner of peace for yourself this time.",
      ],
    },
    start: [6, 21],
  },
  {
    key: "leo",
    name: { sl: "Lev", en: "Leo" },
    dates: { sl: "23. jul – 22. avg", en: "Jul 23 – Aug 22" },
    element: { sl: "Ogenj", en: "Fire" },
    tagline: {
      sl: "Svetloba, ki ne prosi za dovoljenje, da sveti. Lev ljubi glasno, ker tiha ljubezen zanj ni cela ljubezen.",
      en: "Light that doesn't ask permission to shine. Leo loves loudly, because a quiet love feels unfinished.",
    },
    profile: {
      sl: "Lev ne potrebuje dovoljenja, da zasije — to je njegova narava, ne izbira. Njegov element je ogenj, njegovo srce pa gori navzven, vidno, brez opravičila. Kjer je Lev, tam je toplo. Ne zato, ker bi to zahteval, ampak zato, ker ne zna svetiti na pol.\n\nNjegov dar je velikodušnost, ki ogreje vsakogar v bližini. Senca pa je potreba po potrditvi, ki jo včasih zamenja za ljubezen samo, čeprav gre za dve različni stvari. Lev se uči, da je vreden ljubezni tudi takrat, ko ga nihče ne gleda.\n\nV ljubezni Lev ljubi glasno, brez pridržkov, s celim srcem naenkrat. Ne zna se pretvarjati, da mu ni mar, kadar mu je. Duše, ki iščejo nekoga, ki jih bo branil kot svoje, pogosto najdejo prav njega — zvestega, toplega, brez potrebe, da bi bil karkoli drugega kot to, kar je.",
      en: "Leo doesn't need permission to shine — that's its nature, not a choice. Its element is fire, and its heart burns outward, visibly, without apology. Where Leo is, it's warm. Not because it demands it, but because it doesn't know how to shine at half strength.\n\nIts gift is a generosity that warms everyone nearby. Its shadow is a need for recognition it sometimes mistakes for love itself, though the two are different things. Leo is learning that it's worthy of love even when no one's watching.\n\nIn love, Leo loves loudly, without reservations, with its whole heart at once. It doesn't know how to pretend not to care when it does. Souls looking for someone who will defend them like their own often find exactly that here — loyal, warm, with no need to be anything other than what it is.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden posveti pozornost nekomu drugemu — ne zato, da bi izgubil svojo svetlobo, ampak da jo podeliš.",
        "Vprašaj se: ali to počneš zase, ali za odobravanje drugih? Odgovor je lahko osvobajajoč.",
        "Tvoja toplina je dar. Tokrat jo ponudi nekomu, ki je v senci, ne le tistim, ki te že gledajo.",
        "Počitek od nastopanja je dovoljen. Nihče te ne bo ljubil manj, če danes samo si.",
      ],
      en: [
        "Give someone else the spotlight this week — not to dim your own light, but to share it.",
        "Ask yourself: are you doing this for yourself, or for everyone else's approval? The answer might be freeing.",
        "Your warmth is a gift. Offer it to someone in the shadows this time, not just the ones already watching you.",
        "A rest from performing is allowed. No one will love you less for simply being, today.",
      ],
    },
    start: [7, 23],
  },
  {
    key: "virgo",
    name: { sl: "Devica", en: "Virgo" },
    dates: { sl: "23. avg – 22. sep", en: "Aug 23 – Sep 22" },
    element: { sl: "Zemlja", en: "Earth" },
    tagline: {
      sl: "Ljubezen, izražena v podrobnostih. Devica pokaže, koliko ji je mar, s tem, kako natančno nekaj naredi.",
      en: "Love expressed in the details. Virgo shows how much it cares through the precision of what it does.",
    },
    profile: {
      sl: "Devica ljubi svet tako, da ga izpopolnjuje, en detajl naenkrat. Njen element je zemlja, njen um pa oster kot skalpel — vidi, kar drugi spregledajo, in to popravi, preden kdo sploh opazi, da je bilo narobe. To ni obsesija s popolnostjo. Je oblika skrbi.\n\nNjen dar je natančnost, ki naredi red iz kaosa. Senca pa je kritičnost, najprej do same sebe, nato pogosto tudi do drugih — merilo, ki ga redkokdo doseže, vključno z njo samo. Devica se uči, da ni vse, kar je nepopolno, tudi pokvarjeno.\n\nV ljubezni Devica pokaže skrb tako, da naredi nekaj zate — pripravi, uredi, poskrbi, preden ti sploh rečeš, da rabiš pomoč. Njena ljubezen se ne izraža v velikih besedah, ampak v majhnih dejanjih, ponovljenih tako dolgo, dokler ne postanejo dokaz.",
      en: "Virgo loves the world by improving it, one detail at a time. Its element is earth, and its mind is sharp as a scalpel — it sees what others miss, and fixes it before anyone notices it was wrong. This isn't an obsession with perfection. It's a form of care.\n\nIts gift is a precision that turns chaos into order. Its shadow is a criticism aimed first at itself, then often at others — a standard almost no one meets, including Virgo. It's learning that not everything imperfect is broken.\n\nIn love, Virgo shows it cares by doing something for you — preparing, arranging, taking care of it before you even ask for help. Its love doesn't announce itself in big words, but in small acts, repeated until they become proof.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden si dovoli eno stvar pustiti nepopolno. Svet se ne bo sesul.",
        "Kritični glas v tvoji glavi ni resnica, samo navada. Poskusi si reči nekaj prijaznega.",
        "Nekdo opazi tvojo skrb, tudi če je ne izreče naglas. Ne rabiš dokaza, da veš.",
        "Uredi eno majhno stvar, ki te je dolgo motila. Manjši red prinese večji mir.",
      ],
      en: [
        "Let one thing stay unfinished this week. The world won't fall apart.",
        "The critical voice in your head isn't the truth, just a habit. Try saying something kind to yourself instead.",
        "Someone notices your care, even if they never say it out loud. You don't need proof to know.",
        "Fix one small thing that's been bothering you. A little order brings a lot of peace.",
      ],
    },
    start: [8, 23],
  },
  {
    key: "libra",
    name: { sl: "Tehtnica", en: "Libra" },
    dates: { sl: "23. sep – 22. okt", en: "Sep 23 – Oct 22" },
    element: { sl: "Zrak", en: "Air" },
    tagline: {
      sl: "Iskanje ravnovesja ni šibkost — je disciplina. Tehtnica veruje, da je lepota nekaj, kar se da ustvariti med dvema stranema.",
      en: "Seeking balance isn't weakness — it's a discipline. Libra believes beauty can be built between two sides.",
    },
    profile: {
      sl: "Tehtnica vidi svet skozi razmerja — med ljudmi, med barvami, med tem, kar je pravično in kar ni. Njen element je zrak, njena stalna naloga pa iskanje ravnovesja, ki ga sama, ko ga najde, prepozna kot lepoto. Ne prenaša grobosti. Vedno išče vmesni prostor.\n\nNjen dar je diplomacija, ki zna povezati tudi tiste, ki se sami ne bi nikoli strinjali. Senca pa je odlašanje z odločitvijo, iz strahu, da bo izbira nekoga razočarala. Tehtnica se uči, da tudi neodločenost je odločitev — samo slabša.\n\nV ljubezni Tehtnica išče partnerja, ne le spremljevalca — nekoga, s komer lahko gradi, ne le deli prostor. Njena naklonjenost je nežna, a resnična, in ko se odloči, se odloči v celoti. Duše, ki iščejo mir brez izgube sebe, ga najdejo prav pri njej.",
      en: "Libra sees the world through relationships — between people, between colors, between what's fair and what isn't. Its element is air, and its constant task is finding the balance that, once found, it recognizes as beauty. It can't stand rough edges. It's always looking for the space in between.\n\nIts gift is a diplomacy that can connect even people who'd never agree on their own. Its shadow is delaying decisions out of fear that choosing will disappoint someone. Libra is learning that indecision is also a decision — just a worse one.\n\nIn love, Libra looks for a partner, not just a companion — someone to build with, not just share space with. Its affection is gentle but real, and once it decides, it decides fully. Souls looking for peace without losing themselves find it here.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden sprejmi eno odločitev brez dolgega tehtanja. Tvoj prvi občutek je verjetno pravi.",
        "Ni ti treba ugajati vsem. Poskusi izbrati sebe, tudi če to koga razočara.",
        "Lepota, ki jo iščeš zunaj, je tudi v tebi. Poglej vase z istim očesom.",
        "Ravnovesje ne pomeni, da nikoli ne izbereš strani. Tokrat izberi svojo.",
      ],
      en: [
        "Make one decision this week without weighing it endlessly. Your first instinct is probably right.",
        "You don't have to please everyone. Try choosing yourself, even if it disappoints someone.",
        "The beauty you look for outside is also in you. Look at yourself with the same eye.",
        "Balance doesn't mean never picking a side. This time, pick your own.",
      ],
    },
    start: [9, 23],
  },
  {
    key: "scorpio",
    name: { sl: "Škorpijon", en: "Scorpio" },
    dates: { sl: "23. okt – 21. nov", en: "Oct 23 – Nov 21" },
    element: { sl: "Voda", en: "Water" },
    tagline: {
      sl: "Globina, ki se ne boji teme. Škorpijon zna umreti sebi, ki ga ne služi več, in se roditi znova.",
      en: "A depth that isn't afraid of the dark. Scorpio knows how to let an old self die, and be born again.",
    },
    profile: {
      sl: "Škorpijon ne živi na površini. Njegov element je voda, a globoka, temna, taka, v katero le redki upajo pogledati. Ne zanimajo ga majhni pogovori — želi resnico, tudi kadar boli, ker ve, da se samo tam skriva nekaj resničnega vrednega najti.\n\nNjegov dar je moč preobrazbe — sposobnost, da umre stari različici sebe in se rodi znova, tolikokrat, kolikorkrat je treba. Senca pa je nezaupanje, ki ga včasih zgradi kot zid, še preden ga kdo poskuša podreti. Škorpijon se uči, da ranljivost ni izdaja moči.\n\nV ljubezni Škorpijon ne ljubi na pol. Kadar se preda, se preda popolnoma, z intenzivnostjo, ki jo redki razumejo, dokler je ne izkusijo sami. Njegova duša išče nekoga, ki zdrži globino, ne le lepo površino. Kdor to zmore, dobi ljubezen, ki ji ni enake.",
      en: "Scorpio doesn't live on the surface. Its element is water — deep, dark, the kind few dare to look into. Small talk doesn't interest it; it wants the truth, even when it hurts, because it knows that's the only place something real is worth finding.\n\nIts gift is the power of transformation — the ability to let an old version of itself die and be reborn, as many times as it takes. Its shadow is a distrust it sometimes builds like a wall before anyone even tries to tear it down. Scorpio is learning that vulnerability isn't a betrayal of strength.\n\nIn love, Scorpio doesn't love halfway. When it surrenders, it surrenders completely, with an intensity few understand until they experience it themselves. Its soul looks for someone who can hold depth, not just a pretty surface. Whoever can, gets a love unlike any other.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden nekaj starega v tebi umira, da lahko nekaj novega zaživi. Ne boj se konca.",
        "Zaupanje se gradi počasi. Tokrat ponudi en majhen delček sebe nekomu, ki si ga zaslužil.",
        "Intenzivnost, ki jo nosiš, ni preveč. Samo poišči prostor, ki jo zna sprejeti.",
        "Resnica, ki se ji izogibaš, te čaka. Sooči se z njo, ko bo čas pravi — morda že zdaj.",
      ],
      en: [
        "Something old in you is dying this week so something new can live. Don't fear the ending.",
        "Trust is built slowly. Offer one small piece of yourself to someone who's earned it.",
        "The intensity you carry isn't too much. You just need to find a space that can hold it.",
        "The truth you've been avoiding is waiting. Face it when you're ready — maybe that's now.",
      ],
    },
    start: [10, 23],
  },
  {
    key: "sagittarius",
    name: { sl: "Strelec", en: "Sagittarius" },
    dates: { sl: "22. nov – 21. dec", en: "Nov 22 – Dec 21" },
    element: { sl: "Ogenj", en: "Fire" },
    tagline: {
      sl: "Puščica, ki že leti, preden je tarča jasna. Strelec zaupa poti bolj kot zemljevidu.",
      en: "An arrow already flying before the target is clear. Sagittarius trusts the road more than the map.",
    },
    profile: {
      sl: "Strelec gleda vedno malo dlje od tam, kjer trenutno stoji. Njegov element je ogenj, njegov kompas pa je obzorje — nova dežela, nova ideja, nov način razumevanja sveta. Ne zadovolji se z eno resnico, kadar jih obstaja še tisoč nepoznanih.\n\nNjegov dar je optimizem, ki ga nič dolgo ne potre. Senca pa je nemir, ki ga včasih zamenja za svobodo, čeprav gre pravzaprav za beg. Strelec se uči, da se lahko za nekaj časa ustavi, ne da bi izgubil sebe.\n\nV ljubezni Strelec potrebuje sopotnika, ne ujetnika — nekoga, ki razume, da ljubezen ni kletka, ampak skupna pot. Njegova zvestoba ni v tem, da ostane na enem mestu, ampak v tem, koga izbere, da gre z njim. Duše, ki mu dajo prostor, dobijo v zameno njegovo celotno srce.",
      en: "Sagittarius always looks a little further than where it's currently standing. Its element is fire, and its compass is the horizon — a new land, a new idea, a new way of understanding the world. It doesn't settle for one truth when a thousand unknown ones still exist.\n\nIts gift is an optimism nothing can dampen for long. Its shadow is a restlessness it sometimes mistakes for freedom, though it's really an escape. Sagittarius is learning it can stop for a while without losing itself.\n\nIn love, Sagittarius needs a fellow traveler, not a captor — someone who understands love isn't a cage, but a shared road. Its loyalty isn't about staying in one place, but about who it chooses to walk with. Souls who give it room get its whole heart in return.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden te vabi nekaj novega — pusti si biti radoveden, tudi če nimaš vseh odgovorov.",
        "Nemir, ki ga čutiš, morda ni znak, da moraš oditi. Morda je znak, da moraš pogledati globlje tam, kjer si.",
        "Deli svojo vizijo z nekom, ki ji lahko verjame skupaj s tabo.",
        "Svoboda in bližina se ne izključujeta. Tokrat poskusi obe hkrati.",
      ],
      en: [
        "Something new is calling you this week — let yourself be curious, even without all the answers.",
        "The restlessness you feel might not mean you have to leave. It might mean looking deeper right where you are.",
        "Share your vision with someone who can believe in it alongside you.",
        "Freedom and closeness aren't opposites. Try both at once, this time.",
      ],
    },
    start: [11, 22],
  },
  {
    key: "capricorn",
    name: { sl: "Kozorog", en: "Capricorn" },
    dates: { sl: "22. dec – 19. jan", en: "Dec 22 – Jan 19" },
    element: { sl: "Zemlja", en: "Earth" },
    tagline: {
      sl: "Gora se ne vzpne v enem dnevu. Kozorog gradi tiho, korak za korakom, dokler nekega dne ni več nikogar zraven.",
      en: "A mountain isn't climbed in a day. Capricorn builds quietly, step by step, until one day it's the only one still standing.",
    },
    profile: {
      sl: "Kozorog gradi, ko drugi še sanjajo. Njegov element je zemlja, njegova disciplina pa tiha in vztrajna, brez potrebe po opazovalcih. Vzpenja se počasi, korak za korakom, ker ve, da gora ne nagradi naglice, ampak vztrajnost.\n\nNjegov dar je odgovornost, na katero se lahko zanesejo vsi okoli njega. Senca pa je strah, da vrednost dokazuje samo z dosežki, nikoli s tem, kdo je, kadar ne dosega ničesar. Kozorog se uči, da počitek ni lenoba, in da je vreden ljubezni tudi brez naslova, ki ga nosi.\n\nV ljubezni Kozorog ni hiter, a je zanesljiv. Ne obljublja veliko naenkrat, ampak drži vsako obljubo, ki jo da. Njegova zvestoba se gradi z leti, ne z besedami prvega večera. Kdor je pripravljen počakati nanj, dobi nekoga, ki ne odide, ko postane težko.",
      en: "Capricorn builds while others are still dreaming. Its element is earth, and its discipline is quiet and persistent, with no need for an audience. It climbs slowly, one step at a time, because it knows the mountain doesn't reward haste — it rewards endurance.\n\nIts gift is a reliability everyone around it can count on. Its shadow is a fear of proving its worth only through achievement, never through who it is when it's achieving nothing. Capricorn is learning that rest isn't laziness, and that it's worthy of love even without the title it carries.\n\nIn love, Capricorn isn't fast, but it's dependable. It doesn't promise much all at once, but it keeps every promise it makes. Its loyalty is built over years, not first-night words. Whoever is willing to wait for it gets someone who doesn't leave when things get hard.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden si dovoli počitek, brez potrebe, da si ga prej prislužiš z delom.",
        "Uspeh, ki ga gradiš, je viden tudi tebi samemu — ne rabiš tuje potrditve, da prepoznaš svoj napredek.",
        "Nekomu blizu tebe povej, kaj čutiš, ne samo, kaj načrtuješ.",
        "Gora, ki jo plezaš, ni tekma. Poglej, kako velik del poti je že za tabo.",
      ],
      en: [
        "Let yourself rest this week without having to earn it first through work.",
        "The success you're building is visible to you too — you don't need anyone else's approval to know you've achieved something.",
        "Tell someone close what you feel, not just what you're planning.",
        "The mountain you're climbing isn't a race. Look back and see how far you've already come.",
      ],
    },
    start: [12, 22],
  },
  {
    key: "aquarius",
    name: { sl: "Vodnar", en: "Aquarius" },
    dates: { sl: "20. jan – 18. feb", en: "Jan 20 – Feb 18" },
    element: { sl: "Zrak", en: "Air" },
    tagline: {
      sl: "Zvezda, ki sledi svoji lastni orbiti. Vodnar ne beži od sveta — samo vidi ga eno stopnjo prezgodaj.",
      en: "A star that follows its own orbit. Aquarius isn't running from the world — it just sees it one step ahead of time.",
    },
    profile: {
      sl: "Vodnar hodi po svoji lastni orbiti, tudi kadar to pomeni, da hodi sam. Njegov element je zrak, njegov pogled pa vedno usmerjen malo naprej, k svetu, kot bi lahko bil, ne le kot je. Ne zanima ga, kaj je vedno bilo tako. Zanima ga, kaj bi lahko bilo drugače.\n\nNjegov dar je izvirnost, ki premika stvari naprej, tudi kadar se drugi temu upirajo. Senca pa je čustvena distanca, ki jo uporabi kot zaščito, kadar postane preveč osebno. Vodnar se uči, da pripadanje ne pomeni izgube svobode.\n\nV ljubezni Vodnar ponuja prijateljstvo, ki preraste v nekaj globljega — redko obratno. Ceni um, neodvisnost, prostor, da vsak ostane svoj. Duše, ki mu ne poskušajo priklopiti verige, dobijo zvestobo, kakršne ne pričakujejo: tihe, a trdne.",
      en: "Aquarius walks its own orbit, even when that means walking alone. Its element is air, and its gaze is always fixed a little further ahead, toward the world as it could be, not just as it is. It's not interested in how things have always been. It's interested in how they could be different.\n\nIts gift is an originality that moves things forward, even when others resist it. Its shadow is an emotional distance it uses as protection when things get too personal. Aquarius is learning that belonging doesn't mean losing freedom.\n\nIn love, Aquarius offers friendship that grows into something deeper — rarely the other way around. It values the mind, independence, room for each person to stay themselves. Souls who don't try to chain it get a loyalty they don't expect: quiet, but solid.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden pusti nekomu blizu, da ti pomaga — ni ti treba vsega narediti brez pomoči.",
        "Ideja, ki jo nosiš, si zasluži, da jo poveš naglas, tudi če zveni drugačna od ostalih.",
        "Bližina ni past. Tokrat ostani en trenutek dlje, namesto da odideš.",
        "Svet, ki si ga zamišljaš, se začne z enim majhnim dejanjem — naredi ga danes.",
      ],
      en: [
        "Let someone close help you this week — you don't have to do everything alone.",
        "An idea you're carrying deserves to be said out loud, even if it sounds different from everyone else's.",
        "Closeness isn't a trap. Stay one moment longer this time, instead of leaving.",
        "The world you imagine starts with one small action — take it today.",
      ],
    },
    start: [1, 20],
  },
  {
    key: "pisces",
    name: { sl: "Ribi", en: "Pisces" },
    dates: { sl: "19. feb – 20. mar", en: "Feb 19 – Mar 20" },
    element: { sl: "Voda", en: "Water" },
    tagline: {
      sl: "Meje, ki se stopijo tam, kjer se sanje dotaknejo resničnosti. Ribi čutita, preden razumeta, in imata prav pogosteje, kot bi si mislili.",
      en: "Borders that dissolve where dreams meet reality. Pisces feel before they understand, and are right more often than you'd think.",
    },
    profile: {
      sl: "Ribi plavata med dvema svetovoma — resničnim in tistim, ki ga čutita, še preden ga lahko razložita. Njun element je voda, njuna meja med domišljijo in resničnostjo pa tanjša kot pri kateremkoli drugem znamenju. Razumeta s srcem, preden razumeta z umom.\n\nNjun dar je sočutje, ki ne pozna meja — čutita bolečino drugih, kot bi bila njuna lastna. Senca pa je izguba sebe v tem sočutju, dokler ne pozabita, kje se konča eno in začne drugo. Ribi se učita, da meje niso sebičnost. So preživetje.\n\nV ljubezni Ribi ljubita brezpogojno, včasih bolj, kot je zanju samo dobro. Njuna duša prepozna drugo dušo na način, ki ga ne zna razložiti — samo ve. Kdor jima vrne enako nežnost, dobi ljubezen, ki se ne meri, ampak preprosto je.",
      en: "Pisces swims between two worlds — the real one, and the one it feels before it can explain it. Its element is water, and the line between imagination and reality is thinner for it than for any other sign. It understands with the heart before it understands with the mind.\n\nIts gift is a compassion with no borders — it feels others' pain as if it were its own. Its shadow is losing itself in that compassion, until it forgets where the other person ends and it begins. Pisces is learning that boundaries aren't selfishness. They're survival.\n\nIn love, Pisces loves unconditionally, sometimes more than is good for it. Its soul recognizes another soul in a way it can't explain — it just knows. Whoever returns that same tenderness gets a love that isn't measured. It simply is.",
    },
    weeklyFocus: {
      sl: [
        "Ta teden postavi eno mejo, tudi če se zdi neprijazna. Zaščita sebe ni greh.",
        "Sanje, ki jih nosiš, so vredne, da jih zapišeš, ne le čutiš.",
        "Nekdo potrebuje tvoje sočutje — a najprej ga ponudi sebi.",
        "Zaupaj tistemu, kar čutiš, tudi če ne moreš razložiti, zakaj.",
      ],
      en: [
        "Set one boundary this week, even if it feels unkind. Protecting yourself isn't a sin.",
        "The dreams you carry deserve to be written down, not just felt.",
        "Someone needs your compassion — but offer it to yourself first.",
        "Trust what you feel, even if you can't explain why.",
      ],
    },
    start: [2, 19],
  },
];

export function getCurrentSignKey(): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  // Walk the list in calendar order and find the last sign whose start date has
  // already passed this year (Capricorn wraps across the new year).
  const ordered = [...SIGNS].sort((a, b) => a.start[0] - b.start[0] || a.start[1] - b.start[1]);
  let current = ordered[ordered.length - 1].key;
  for (const sign of ordered) {
    const [m, d] = sign.start;
    if (month > m || (month === m && day >= d)) {
      current = sign.key;
    }
  }
  return current;
}

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/** Index into a weeklyFocus pool that advances on its own every ISO week — no manual updates. */
export function getWeeklyFocusIndex(poolSize: number): number {
  return getISOWeek(new Date()) % poolSize;
}
