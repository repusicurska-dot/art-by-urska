/**
 * Poetry by Urška.
 *
 * `URSKA_QUOTES` are her own words, verbatim from her notes — do not edit or add without her.
 *
 * `LETTERS` are the weekly "Letter from the studio" that subscribers receive, in the order they
 * go out: the first one in the week of LETTER_START_WEEK, then one per week, each exactly once.
 * Because every week maps to its own letter, nobody can ever get the same letter twice — the
 * schedule lives in lib/poetry/schedule.ts.
 *
 * A year's worth is written ahead, following the seasons they arrive in (autumn from October,
 * Advent, New Year, winter, spring, summer). If the list ever runs low, Urška and Teo get an
 * email eight weeks before the end; when it runs out, nothing is sent rather than a repeat.
 *
 * Adding a letter is appending one entry to this array — never reorder or remove entries that
 * have already gone out, or the weeks after them would shift.
 *
 * The letters are AI-drafted in Urška's voice, like the rest of the site's copy.
 */

export interface PoetryLetter {
  /** Stable id, also the anchor in the archive. */
  id: string;
  title: { sl: string; en: string };
  body: { sl: string; en: string };
  /** Optional painting to stand beside the words. */
  artworkSlug?: string;
}

export const URSKA_QUOTES: string[] = [
  "Poetry is the bridge between what my soul remembers and what my heart longs to say.",
];

/** The ISO week the first letter went out in. Never change this once letters have been sent. */
export const LETTER_START_WEEK = "2026-W38";

const BLOSSOMING = "artwork-01";
const PROPHECY = "artwork-02";
const ETERNAL = "artwork-03";
const BIRDS = "artwork-04";
const REMEMBERS = "artwork-05";

export const LETTERS: PoetryLetter[] = [
  /* ------------------------------ September ------------------------------ */
  {
    id: "letter-01",
    title: { sl: "Kar ostane, ko barva pojenja", en: "What stays when the colour fades" },
    body: {
      sl: "Vsaka slika se konča dvakrat. Prvič takrat, ko odložim čopič, in drugič takrat, ko nekdo drug pred njo utihne.\n\nTa teden sem pomislila, da je pesem ista stvar, le brez barve. Tudi ona čaka, da nekdo utihne.\n\nČe ti je ta teden težko, poskusi tole: nič ne popravljaj. Samo poimenuj. Pogosto je dovolj že to, da stvari damo pravo ime.",
      en: "Every painting ends twice. Once when I put the brush down, and once when someone else falls quiet in front of it.\n\nThis week I thought a poem is the same thing without colour. It, too, waits for someone to fall quiet.\n\nIf this week is heavy, try this: don't fix anything. Just name it. Giving a thing its right name is often enough.",
    },
    artworkSlug: REMEMBERS,
  },
  {
    id: "letter-02",
    title: { sl: "Prazno platno ob polnoči", en: "An empty canvas at midnight" },
    body: {
      sl: "Najlepše stvari se mi zgodijo, ko nehava tekmovati — jaz in platno.\n\nDolgo sem mislila, da moram vedeti, kaj bo nastalo. Zdaj vem, da je prazno platno vprašanje, ne naloga.\n\nTvoje vprašanje za ta teden: kje v svojem življenju še vedno poskušaš vedeti vnaprej?",
      en: "The best things happen when the canvas and I stop competing.\n\nFor a long time I thought I had to know what would appear. Now I know an empty canvas is a question, not an assignment.\n\nYour question for the week: where in your life are you still trying to know in advance?",
    },
    artworkSlug: PROPHECY,
  },
  {
    id: "letter-03",
    title: { sl: "Roka se spomni prej kot glava", en: "The hand remembers before the head" },
    body: {
      sl: "Na steni sem se naučila, da telo ve prej, kot um razume. Roka najde oprijem, preden ga oko potrdi.\n\nS čopičem je enako. In z ljudmi tudi — telo ve, ob kom lahko diha.\n\nTa teden zaupaj enemu občutku, ki ga ne znaš razložiti. Samo enemu.",
      en: "On the wall I learned that the body knows before the mind understands. The hand finds the hold before the eye confirms it.\n\nWith a brush it's the same. With people, too — the body knows who it can breathe around.\n\nThis week, trust one feeling you can't explain. Just one.",
    },
    artworkSlug: BIRDS,
  },

  /* ------------------------------- Autumn -------------------------------- */
  {
    id: "letter-04",
    title: { sl: "Listje ne joče", en: "Leaves don't cry" },
    body: {
      sl: "Oktober je mesec, ko drevesa pokažejo, kako se spušča brez drame. List ne prosi, naj ostane. Zasveti v najlepši barvi, potem pa pade.\n\nVčasih si želim, da bi znala tako končevati stvari — z barvo, ne s strahom.\n\nKaj je tvoje listje letos? Kaj bi lahko spustil v najlepši barvi, namesto da ga držiš, dokler ne zbledi?",
      en: "October is the month trees show how to let go without drama. A leaf doesn't beg to stay. It burns in its most beautiful colour, and then it falls.\n\nSometimes I wish I knew how to end things like that — with colour, not with fear.\n\nWhat are your leaves this year? What could you release in its best colour, instead of holding on until it fades?",
    },
    artworkSlug: ETERNAL,
  },
  {
    id: "letter-05",
    title: { sl: "Počasna svetloba", en: "Slow light" },
    body: {
      sl: "Jesenska svetloba pride pozno in odide zgodaj, a ko je tu, pade nizko in toplo, kot bi vsako stvar posebej pobožala.\n\nV ateljeju zdaj slikam bolj počasi. Ne zato, ker bi morala, ampak zato, ker svetloba to dovoli.\n\nTa teden si privošči eno počasno stvar. Kavo brez telefona. Sprehod brez cilja. Opazi, kaj se zgodi, ko nehaš prehitevati dan.",
      en: "Autumn light arrives late and leaves early, but while it's here it falls low and warm, as if touching each thing on its own.\n\nIn the studio I paint more slowly now. Not because I have to, but because the light allows it.\n\nThis week, give yourself one slow thing. Coffee without the phone. A walk with no destination. Notice what happens when you stop overtaking the day.",
    },
    artworkSlug: BIRDS,
  },
  {
    id: "letter-06",
    title: { sl: "Plasti", en: "Layers" },
    body: {
      sl: "Nobena moja slika ne nastane v enem zamahu. Pod vsako barvo, ki jo vidiš, so tri, ki jih ne. Nekatere sem prekrila, ker so bile napačne. Brez njih pa zgornja ne bi bila prava.\n\nTudi mi smo iz plasti. Tisto, česar se sramujemo, pogosto nosi tisto, na kar smo ponosni.\n\nNe zavrzi svojih spodnjih plasti. Nosijo te.",
      en: "None of my paintings happen in one stroke. Under every colour you see are three you don't. Some I covered because they were wrong. Without them, the top one wouldn't be right.\n\nWe're made of layers too. What we're ashamed of often holds up what we're proud of.\n\nDon't throw away your lower layers. They're carrying you.",
    },
    artworkSlug: PROPHECY,
  },
  {
    id: "letter-07",
    title: { sl: "Za tiste, ki jih ni več", en: "For the ones no longer here" },
    body: {
      sl: "Začetek novembra je čas, ko prižigamo sveče za tiste, ki jih pogrešamo. Vedno se mi je zdelo lepo, da za spomin uporabimo ogenj — nekaj, kar sveti in greje hkrati.\n\nVerjamem, da ljubezen ne potrebuje telesa, da bi ostala. Spremeni samo naslov.\n\nČe koga pogrešaš, mu ta teden povej nekaj na glas. Ne za odgovor. Samo zato, da ljubezen dobi pot ven.",
      en: "Early November is when we light candles for the people we miss. It has always seemed beautiful to me that we use fire for remembering — something that gives light and warmth at once.\n\nI believe love doesn't need a body to stay. It only changes its address.\n\nIf you miss someone, say something to them out loud this week. Not for an answer. Just so the love has a way out.",
    },
    artworkSlug: REMEMBERS,
  },
  {
    id: "letter-08",
    title: { sl: "Megla", en: "Fog" },
    body: {
      sl: "Zjutraj je bila megla tako gosta, da nisem videla drevesa pred oknom. Vedela pa sem, da je tam.\n\nNekateri tedni so taki. Ne vidimo, kam gremo, in to ne pomeni, da poti ni.\n\nČe je tvoj teden meglen, ne sili v daljavo. Poglej samo naslednji korak. Megla se vedno dvigne — ponavadi takrat, ko nehamo buljiti vanjo.",
      en: "This morning the fog was so thick I couldn't see the tree outside my window. But I knew it was there.\n\nSome weeks are like that. We can't see where we're going, and that doesn't mean there's no path.\n\nIf your week is foggy, don't strain towards the distance. Look only at the next step. Fog always lifts — usually once we stop staring into it.",
    },
    artworkSlug: PROPHECY,
  },
  {
    id: "letter-09",
    title: { sl: "Topla dlan", en: "A warm palm" },
    body: {
      sl: "Ko je zunaj mraz, se vrnemo k majhnim toplotam. Skodelica v dlaneh. Odeja. Roka nekoga, ki jo stisneš pod mizo.\n\nMislim, da ljubezen večinoma ni velika. Je vsota malih toplot, ki jih nekdo ponavlja, ne da bi ga kdo prosil.\n\nKomu bi ta teden lahko dal eno malo toploto? Brez razloga. Brez priložnosti.",
      en: "When it's cold outside, we return to small warmths. A cup between the palms. A blanket. Someone's hand you squeeze under the table.\n\nI think love mostly isn't big. It's the sum of small warmths someone keeps repeating without being asked.\n\nWho could you give one small warmth to this week? For no reason. For no occasion.",
    },
    artworkSlug: BLOSSOMING,
  },
  {
    id: "letter-10",
    title: { sl: "Kaj ostane na paleti", en: "What's left on the palette" },
    body: {
      sl: "Na koncu dneva na paleti vedno ostanejo barve, ki jih nisem uporabila. Včasih so najlepše. Ne zavržem jih — z njimi naslednji dan začnem.\n\nMislim, da z dnevi ni drugače. Kar danes ni prišlo na vrsto, ni izgubljeno. Samo čaka jutro.\n\nNe glej ta teden samo na to, česar nisi naredil. Poglej, kaj ti je ostalo za jutri.",
      en: "At the end of a day, there are always colours left on the palette that I didn't use. Sometimes they're the most beautiful. I don't throw them away — I start the next day with them.\n\nI don't think days are any different. What didn't get its turn today isn't lost. It's just waiting for morning.\n\nThis week, don't only look at what you didn't do. Look at what you have left for tomorrow.",
    },
    artworkSlug: ETERNAL,
  },
  {
    id: "letter-11",
    title: { sl: "Zadnji zlati dan", en: "The last golden day" },
    body: {
      sl: "Vsako jesen pride en dan, ko se zdi, da je poletje pozabilo oditi. Sonce je toplo, listje še zlato, in vsi gremo ven, ker vemo, da je zadnji.\n\nZanimivo, kako drugače živimo dan, za katerega vemo, da je zadnji.\n\nPoskusi ta teden en navaden dan živeti tako, kot da je zadnji zlati. Ne zato, ker je. Zato, ker si zasluži.",
      en: "Every autumn there's one day when summer seems to have forgotten to leave. The sun is warm, the leaves still gold, and everyone goes outside because we know it's the last.\n\nIt's strange how differently we live a day we know is the last.\n\nThis week, try living one ordinary day as if it were the last golden one. Not because it is. Because it deserves it.",
    },
    artworkSlug: BIRDS,
  },

  /* ------------------------------- Advent -------------------------------- */
  {
    id: "letter-12",
    title: { sl: "Prva sveča", en: "The first candle" },
    body: {
      sl: "December se začne s temo. Dnevi so najkrajši in prav zato prižigamo luči — eno za drugo, teden za tednom.\n\nNikoli ne prižgemo vseh naenkrat. Mislim, da je v tem modrost: upanje raste počasi, ena svetloba naenkrat.\n\nKaj je tvoja prva sveča ta mesec? Ena stvar, ki jo prižgeš zdaj, da bo do konca leta svetleje.",
      en: "December begins in darkness. The days are at their shortest, and that's exactly why we light candles — one after another, week after week.\n\nWe never light them all at once. I think there's wisdom in that: hope grows slowly, one light at a time.\n\nWhat is your first candle this month? One thing you light now so that the end of the year is brighter.",
    },
    artworkSlug: BIRDS,
  },
  {
    id: "letter-13",
    title: { sl: "Darilo, ki ga ni v trgovini", en: "A gift you can't buy" },
    body: {
      sl: "V tem času vsi iščemo darila. Najlepše, kar sem jih kdaj dobila, pa niso bile stvari. Bilo je pismo. Bila je ura, ki mi jo je nekdo namenil. Bil je stavek, ki si ga je nekdo zapomnil.\n\nPozornost je edino darilo, ki ga ne moreš kupiti ali ponarediti.\n\nTa teden podari nekomu uro svoje cele pozornosti. Brez telefona. To bo ostalo dlje kot karkoli v papirju.",
      en: "This time of year we're all looking for gifts. The most beautiful ones I've ever received weren't things. It was a letter. It was an hour someone set aside for me. It was a sentence someone remembered.\n\nAttention is the only gift you can't buy or fake.\n\nThis week, give someone an hour of your whole attention. No phone. It will last longer than anything wrapped in paper.",
    },
    artworkSlug: BLOSSOMING,
  },
  {
    id: "letter-14",
    title: { sl: "Najdaljša noč", en: "The longest night" },
    body: {
      sl: "V teh dneh prihaja najdaljša noč v letu. Po njej se dnevi, tiho in skoraj neopazno, začnejo daljšati.\n\nVedno me gane, da se svetloba vrne prav takrat, ko je najbolj temno. Ne kasneje. Takoj po tem.\n\nČe je v tebi zdaj najdaljša noč, vedi tole: to je točka obrata. Od tu naprej je vsak dan malo več svetlobe, četudi je še ne vidiš.",
      en: "The longest night of the year is almost here. After it, quietly and almost unnoticed, the days begin to lengthen.\n\nIt always moves me that the light returns exactly when it's darkest. Not later. Right after.\n\nIf you're in your longest night right now, know this: it's the turning point. From here on, every day holds a little more light, even if you can't see it yet.",
    },
    artworkSlug: PROPHECY,
  },
  {
    id: "letter-15",
    title: { sl: "Tiha noč v ateljeju", en: "A quiet night in the studio" },
    body: {
      sl: "Na božični večer v ateljeju ne slikam. Samo sedim med slikami in jih gledam, kot bi obiskala stare prijatelje.\n\nVsaka nosi en del leta. Eno sem slikala v žalosti, eno v zaljubljenosti, eno v jezi, ki se je med slikanjem spremenila v nekaj mehkejšega.\n\nNocoj si vzemi trenutek in poglej svoje leto kot galerijo. Ne sodi slik. Samo jih poglej. Vse so tvoje.",
      en: "On Christmas Eve I don't paint in the studio. I just sit among the paintings and look at them, like visiting old friends.\n\nEach one carries a part of the year. One I painted in sadness, one in love, one in anger that turned into something softer while I worked.\n\nTonight, take a moment to look at your year as a gallery. Don't judge the pictures. Just look at them. They're all yours.",
    },
    artworkSlug: ETERNAL,
  },
  {
    id: "letter-16",
    title: { sl: "Zadnji dan leta", en: "The last day of the year" },
    body: {
      sl: "Nocoj bomo šteli do nič. Rada imam ta trenutek — tisto sekundo, ko staro leto še ni čisto odšlo in novo še ni čisto prišlo.\n\nNe delam več velikih zaobljub. Namesto tega si vsako leto izberem eno besedo, ki me bo spremljala.\n\nKakšna bo tvoja beseda za prihodnje leto? Ne cilj. Beseda. Nekaj, k čemur se lahko vrneš, ko se izgubiš.",
      en: "Tonight we'll count down to zero. I love that moment — the one second when the old year hasn't quite gone and the new one hasn't quite arrived.\n\nI don't make big resolutions anymore. Instead, every year I choose one word to walk with me.\n\nWhat will your word be for the coming year? Not a goal. A word. Something you can return to when you lose your way.",
    },
    artworkSlug: BIRDS,
  },

  /* ------------------------------- Winter -------------------------------- */
  {
    id: "letter-17",
    title: { sl: "Belo platno januarja", en: "January's white canvas" },
    body: {
      sl: "Januar je kot novo platno — bel, nekoliko strašljiv in poln obljub, ki jih še nismo prelomili.\n\nNaučila sem se, da prve poteze ni treba narediti lepo. Treba jo je samo narediti. Lepota pride kasneje, v plasteh.\n\nNaredi ta teden eno grdo prvo potezo. Pomembno je samo, da platno ni več prazno.",
      en: "January is like a new canvas — white, a little frightening, and full of promises we haven't broken yet.\n\nI've learned the first stroke doesn't need to be beautiful. It only needs to be made. Beauty comes later, in layers.\n\nMake one ugly first stroke this week. All that matters is that the canvas isn't empty anymore.",
    },
    artworkSlug: PROPHECY,
  },
  {
    id: "letter-18",
    title: { sl: "Sneg utiša", en: "Snow makes things quiet" },
    body: {
      sl: "Ko sneži, se svet utiša. Sneg pogoltne zvoke, kot bi kdo nežno položil roko na vse naenkrat.\n\nV takih dneh slišim stvari, ki jih sicer preglasim. Svoj dih. Svoje misli. Tisto tiho vprašanje, ki ga nosim že dolgo.\n\nČe ta teden zapade sneg — ali pa ne — si ustvari svojo tišino. Petnajst minut brez zvoka. Poslušaj, kaj se oglasi.",
      en: "When it snows, the world goes quiet. Snow swallows sound, as if someone had gently laid a hand on everything at once.\n\nOn days like that I hear things I usually drown out. My breath. My thoughts. That quiet question I've been carrying for a long time.\n\nWhether or not it snows this week, make your own silence. Fifteen minutes without sound. Listen to what speaks up.",
    },
    artworkSlug: REMEMBERS,
  },
  {
    id: "letter-19",
    title: { sl: "Korenine pozimi", en: "Roots in winter" },
    body: {
      sl: "Pozimi se zdi, da drevo ne dela ničesar. Pa ni res. Vse delo se dogaja spodaj, v temi, kjer korenine rastejo globlje.\n\nObdobja, ko se navzven nič ne zgodi, so pogosto tista, ko se največ utrdi.\n\nČe se ti zdi, da stojiš na mestu, se vprašaj: kaj v meni ta čas raste v globino? Pomlad bo pokazala, česa zdaj še ne vidiš.",
      en: "In winter a tree seems to do nothing. It isn't true. All the work happens underground, in the dark, where the roots grow deeper.\n\nThe seasons when nothing happens on the outside are often the ones when the most takes hold.\n\nIf you feel you're standing still, ask yourself: what in me is growing downward right now? Spring will show what you can't see yet.",
    },
    artworkSlug: ETERNAL,
  },
  {
    id: "letter-20",
    title: { sl: "Oprijem, ki ga ne vidiš", en: "The hold you can't see" },
    body: {
      sl: "Pri plezanju so najtežji gibi tisti, pri katerih moraš spustiti en oprijem, preden vidiš naslednjega. Za trenutek visiš v zraku in zaupaš.\n\nMislim, da je vsaka večja sprememba v življenju tak gib. Staro spustiš, preden je novo v roki.\n\nČe ta teden stojiš pred takim gibom, vedi, da je tisti trenutek v zraku del poti. Ni napaka. Je pogum.",
      en: "In climbing, the hardest moves are the ones where you have to let go of one hold before you can see the next. For a moment you hang in the air and trust.\n\nI think every big change in life is a move like that. You release the old before the new is in your hand.\n\nIf you're facing a move like that this week, know that the moment in the air is part of the route. It isn't a mistake. It's courage.",
    },
    artworkSlug: BIRDS,
  },
  {
    id: "letter-21",
    title: { sl: "Barve, ki jih imam rada", en: "Colours I love" },
    body: {
      sl: "Vijolična je moja najljubša barva, ker je sestavljena iz dveh nasprotij — hladne modre in vroče rdeče. Nikoli ni samo eno ali drugo.\n\nMorda imam zato tako rada ljudi, ki so tudi taki. Nežni in močni. Resni in smešni. Ne čisto ene barve.\n\nKateri dve nasprotji nosiš ti? Ne izbiraj med njima ta teden. Bodi obe.",
      en: "Purple is my favourite colour because it's made of two opposites — cool blue and hot red. It's never just one or the other.\n\nMaybe that's why I love people who are like that too. Gentle and strong. Serious and funny. Not quite one colour.\n\nWhich two opposites do you carry? Don't choose between them this week. Be both.",
    },
    artworkSlug: BLOSSOMING,
  },
  {
    id: "letter-22",
    title: { sl: "Pismo ljubezni", en: "A letter about love" },
    body: {
      sl: "Ta teden je dan zaljubljenih. Ljubezen ni samo za pare. Obstaja ljubezen do prijateljice, ki te pozna dvajset let. Do starša. Do psa. Do kraja. Do samega sebe, ki jo je najtežje priznati.\n\nMoje slike o ljubezni niso o romanci. So o prepoznavanju — trenutku, ko te nekdo vidi.\n\nKoga vidiš ti? Povej mu. Ne na roza kartici. S svojimi besedami.",
      en: "Valentine's Day is this week. Love isn't only for couples. There's love for a friend who has known you for twenty years. For a parent. For a dog. For a place. For yourself, which is the hardest one to admit.\n\nMy paintings about love aren't about romance. They're about recognition — the moment someone sees you.\n\nWho do you see? Tell them. Not on a pink card. In your own words.",
    },
    artworkSlug: BLOSSOMING,
  },
  {
    id: "letter-23",
    title: { sl: "Počitek ni lenoba", en: "Rest isn't laziness" },
    body: {
      sl: "Dolgo sem mislila, da je počitek nagrada, ki si jo moraš zaslužiti. Na steni so me naučili drugače: brez počitka mišica ne zraste. Rast se zgodi med treningi, ne med njimi.\n\nTudi ustvarjalnost potrebuje pavze. Najboljše ideje so mi prišle, ko sem nehala iskati.\n\nTa teden si dovoli počivati brez krivde. Ne kot nagrado. Kot del dela.",
      en: "For a long time I thought rest was a reward you had to earn. The wall taught me otherwise: without rest, a muscle doesn't grow. Growth happens between the sessions, not during them.\n\nCreativity needs pauses too. My best ideas have come when I stopped looking for them.\n\nThis week, let yourself rest without guilt. Not as a reward. As part of the work.",
    },
    artworkSlug: REMEMBERS,
  },
  {
    id: "letter-24",
    title: { sl: "Konec februarja", en: "The end of February" },
    body: {
      sl: "Februar je najkrajši mesec, pa se včasih zdi najdaljši. Zima je utrujena, mi smo utrujeni, pomlad pa še ni prišla.\n\nPrav v takem času se splača vedeti, da se stvari že premikajo. Popki so na vejah. Ptice pojejo prej. Samo mi tega še ne opazimo.\n\nPoišči ta teden en znak pomladi. Enega. Majhen je čisto dovolj.",
      en: "February is the shortest month, yet sometimes it feels like the longest. Winter is tired, we're tired, and spring hasn't come yet.\n\nIt's exactly at times like this that it helps to know things are already moving. There are buds on the branches. Birds sing earlier. We just haven't noticed yet.\n\nFind one sign of spring this week. Just one. A small one is plenty.",
    },
    artworkSlug: BIRDS,
  },

  /* ------------------------------- Spring -------------------------------- */
  {
    id: "letter-25",
    title: { sl: "Prvi zvonček", en: "The first snowdrop" },
    body: {
      sl: "Zvonček ne čaka, da se sneg stopi. Prebije se skozenj, majhen in bel, in se ne opraviči, ker je prezgoden.\n\nObčudujem to. Toliko stvari odlašamo, ker čakamo pravi trenutek, pravi pogoj, pravo dovoljenje.\n\nKaj bi naredil ta teden, če ne bi čakal, da se sneg stopi? Mogoče je pravi trenutek že tu.",
      en: "A snowdrop doesn't wait for the snow to melt. It pushes through, small and white, and doesn't apologise for being early.\n\nI admire that. We put off so many things because we're waiting for the right moment, the right conditions, the right permission.\n\nWhat would you do this week if you didn't wait for the snow to melt? Maybe the right moment is already here.",
    },
    artworkSlug: ETERNAL,
  },
  {
    id: "letter-26",
    title: { sl: "Odprto okno", en: "An open window" },
    body: {
      sl: "Danes sem prvič letos odprla okno v ateljeju in ga pustila odprtega cel dan. Z zrakom je prišel vonj po zemlji in po nečem novem.\n\nNi treba vsega spremeniti, da se počutiš drugače. Včasih je dovolj eno okno.\n\nKaj je tvoje okno ta teden? Ena majhna stvar, ki jo odpreš, da pride noter svež zrak.",
      en: "Today, for the first time this year, I opened the studio window and left it open all day. With the air came the smell of earth and of something new.\n\nYou don't have to change everything to feel different. Sometimes one window is enough.\n\nWhat's your window this week? One small thing you open so fresh air can come in.",
    },
    artworkSlug: BIRDS,
  },
  {
    id: "letter-27",
    title: { sl: "Enakonočje", en: "Equinox" },
    body: {
      sl: "Ta teden sta dan in noč enako dolga. Samo dvakrat na leto se to zgodi — trenutek popolnega ravnovesja, preden svetloba prevlada.\n\nRavnovesje ni stanje, v katerem ostaneš. Je trenutek, skozi katerega greš.\n\nNe išči ta teden popolnega ravnovesja. Opazi samo, kam se tvoja tehtnica nagiba. In ali je to smer, v katero želiš iti.",
      en: "This week day and night are the same length. It happens only twice a year — a moment of perfect balance before the light takes over.\n\nBalance isn't a state you stay in. It's a moment you pass through.\n\nDon't look for perfect balance this week. Just notice which way your scale is tipping. And whether that's the direction you want to go.",
    },
    artworkSlug: PROPHECY,
  },
  {
    id: "letter-28",
    title: { sl: "Popki", en: "Buds" },
    body: {
      sl: "Popek je obljuba, ki še ni izpolnjena. Trd je, zaprt in skoraj neviden. A v njem je že cel list, cel cvet, zložen kot pismo.\n\nMislim, da imamo vsi v sebi take popke. Stvari, ki so že cele, a še ne odprte.\n\nKaj v tebi je ta pomlad popek? Ne sili ga, da se odpre. Samo mu daj svetlobo.",
      en: "A bud is a promise not yet kept. It's hard, closed, almost invisible. But inside it is already a whole leaf, a whole flower, folded like a letter.\n\nI think we all carry buds like that. Things that are already whole, but not yet open.\n\nWhat in you is a bud this spring? Don't force it open. Just give it light.",
    },
    artworkSlug: ETERNAL,
  },
  {
    id: "letter-29",
    title: { sl: "Aprilski dež", en: "April rain" },
    body: {
      sl: "April nikoli ne ve, kaj hoče. Sonce, dež, sonce, toča. Nekoč me je to jezilo. Zdaj se mi zdi iskreno — tako pač je, ko se nekaj spreminja.\n\nSpremembe niso nikoli ravne. So kot aprilsko vreme, polne preobratov.\n\nČe je tvoj teden aprilski, ga ne obsojaj. Dež in sonce skupaj delata mavrico.",
      en: "April never knows what it wants. Sun, rain, sun, hail. It used to annoy me. Now it seems honest — that's just how things are when something is changing.\n\nChange is never straight. It's like April weather, full of turns.\n\nIf your week is an April week, don't judge it. Rain and sun together make a rainbow.",
    },
    artworkSlug: BIRDS,
  },
  {
    id: "letter-30",
    title: { sl: "Začeti znova", en: "Beginning again" },
    body: {
      sl: "Nekatere slike sem začela trikrat. Ne zato, ker bi bila prva dva začetka slaba, ampak ker sem vmes postala nekdo drug.\n\nZačeti znova ni poraz. Je priznanje, da si zrasel.\n\nČe moraš ta teden nekaj začeti znova, ne šteti, kolikokrat že. Šteje samo, da začneš.",
      en: "Some paintings I've started three times. Not because the first two beginnings were bad, but because I became someone else in between.\n\nBeginning again isn't defeat. It's admitting you've grown.\n\nIf you have to start something over this week, don't count how many times. All that counts is that you start.",
    },
    artworkSlug: PROPHECY,
  },
  {
    id: "letter-31",
    title: { sl: "Ptice se vračajo", en: "The birds come back" },
    body: {
      sl: "Lastovke se vsako leto vrnejo pod isti napušč. Prepotujejo celine, pa vseeno najdejo pot do istega kotička.\n\nKo sem slikala Ptice svetlobe, sem mislila prav na to — da vse, kar ljubimo, pozna pot domov.\n\nKaj se ta pomlad vrača k tebi? Stara navada, stara ljubezen, star del tebe? Pozdravi ga.",
      en: "Every year the swallows return to the same eaves. They cross continents, and still find their way to the same corner.\n\nWhen I painted Birds of Light, that's exactly what I was thinking — that everything we love knows the way home.\n\nWhat is coming back to you this spring? An old habit, an old love, an old part of you? Welcome it.",
    },
    artworkSlug: BIRDS,
  },
  {
    id: "letter-32",
    title: { sl: "Zemlja pod nohti", en: "Earth under the nails" },
    body: {
      sl: "Ta vikend sem sadila rože in zvečer nisem mogla očistiti zemlje izpod nohtov. Pomislila sem, da imam barvo pod nohti skoraj vedno. Samo da je danes rjava.\n\nMislim, da smo najbolj živi, ko imamo umazane roke. Ko se nečesa dotaknemo zares.\n\nČesa se boš ta teden dotaknil z rokami? Ne s telefonom. Z rokami.",
      en: "This weekend I planted flowers and by evening I couldn't get the earth out from under my nails. I thought: I almost always have paint under my nails. Today it's just brown.\n\nI think we're most alive when our hands are dirty. When we really touch something.\n\nWhat will you touch with your hands this week? Not with a phone. With your hands.",
    },
    artworkSlug: ETERNAL,
  },
  {
    id: "letter-33",
    title: { sl: "Majska jutra", en: "May mornings" },
    body: {
      sl: "Maja se zbujam prej, ker me zbudijo ptice. Nekoč sem se jezila nanje. Zdaj jim hvaležno prisluhnem — kot bi mi kdo vsak dan zapel, da je jutro spet prišlo.\n\nJutra so najbolj iskren del dneva. Še nismo nikomur nič dolžni.\n\nTa teden si podari eno jutro zase, preden začne dan zahtevati svoje. Deset minut je dovolj.",
      en: "In May I wake earlier because the birds wake me. I used to be annoyed with them. Now I listen gratefully — as if someone sang to me every day that morning has come again.\n\nMornings are the most honest part of the day. We don't owe anyone anything yet.\n\nThis week, give yourself one morning before the day starts making its demands. Ten minutes is enough.",
    },
    artworkSlug: BIRDS,
  },
  {
    id: "letter-34",
    title: { sl: "Cvetenje ni tekma", en: "Blooming isn't a race" },
    body: {
      sl: "Na vrtu ne cveti vse hkrati. Češnja cveti marca, vrtnica junija, astra septembra. Nobena ne misli, da zamuja.\n\nTakrat sem naslikala Cvetočo ljubezen — o ljubezni, ki se vrača v svojem času.\n\nČe se ti zdi, da vsi okrog tebe cvetijo, ti pa ne, pomisli: morda si vrtnica, ne češnja. Tvoj junij še pride.",
      en: "In the garden, nothing blooms all at once. The cherry blooms in March, the rose in June, the aster in September. None of them thinks it's late.\n\nThat's when I painted Blossoming Love — about a love that returns in its own time.\n\nIf it feels like everyone around you is blooming and you're not, consider: maybe you're a rose, not a cherry. Your June is still coming.",
    },
    artworkSlug: BLOSSOMING,
  },
  {
    id: "letter-35",
    title: { sl: "Vonj po dežju", en: "The smell of rain" },
    body: {
      sl: "Tisti vonj, ki pride pred dežjem, ima celo ime — petrikor. Zemlja diši, ker ve, da prihaja voda.\n\nRada imam, da ima tudi pričakovanje svoj vonj. Da se nekaj lepega začne, še preden se zgodi.\n\nKaj pričakuješ ta teden? Uživaj v vonju pred dežjem. Tudi čakanje je lahko lepo.",
      en: "The smell that comes before rain even has a name — petrichor. The earth smells because it knows water is coming.\n\nI love that anticipation has its own scent too. That something beautiful begins before it even happens.\n\nWhat are you looking forward to this week? Enjoy the smell before the rain. Waiting can be beautiful too.",
    },
    artworkSlug: REMEMBERS,
  },
  {
    id: "letter-36",
    title: { sl: "Strah pred višino", en: "Fear of heights" },
    body: {
      sl: "Veliko ljudi me vpraša, ali me je bilo na steni kdaj strah. Vedno. Strah ni izginil nikoli. Samo naučila sem se, da ne sedi za volanom.\n\nPogum ni odsotnost strahu. Je odločitev, kdo vodi.\n\nČesa se ta teden bojiš? Ni ti ga treba pregnati. Samo posedi ga na zadnji sedež.",
      en: "People often ask me whether I was ever afraid on the wall. Always. The fear never went away. I just learned it doesn't get to drive.\n\nCourage isn't the absence of fear. It's deciding who's at the wheel.\n\nWhat are you afraid of this week? You don't have to chase it away. Just move it to the back seat.",
    },
    artworkSlug: PROPHECY,
  },
  {
    id: "letter-37",
    title: { sl: "Hvala, ki je nisem rekla", en: "The thank-you I never said" },
    body: {
      sl: "Nekoč me je trenerka pobrala s tal po padcu in samo rekla: »Še enkrat.« Nikoli se ji nisem zahvalila. Šele leta kasneje sem razumela, da mi je tisti dan dala nekaj, kar nosim še danes.\n\nToliko zahval nosimo s sabo, neizrečenih.\n\nKomu dolguješ zahvalo, ki je še nisi izrekel? Ta teden jo pošlji. Nikoli ni prepozno.",
      en: "Once, a coach picked me up off the floor after a fall and only said: \"Again.\" I never thanked her. Only years later did I understand that she gave me something that day that I still carry.\n\nWe carry so many thank-yous around, unsaid.\n\nWho do you owe a thank-you you haven't said yet? Send it this week. It's never too late.",
    },
    artworkSlug: REMEMBERS,
  },
  {
    id: "letter-38",
    title: { sl: "Dolgi večeri", en: "Long evenings" },
    body: {
      sl: "Junija je svetlo še ob devetih. Zdi se, kot bi nam nekdo podaril nekaj ur. In vendar jih pogosto zapravimo, kot da jih ni.\n\nTa mesec slikam zvečer, pri zadnji svetlobi, ko je vse zlato in mehko.\n\nNaredi ta teden en dolgi večer za nekaj, kar imaš rad. Ne za nekaj, kar moraš. Za nekaj, kar imaš rad.",
      en: "In June it's still light at nine. It feels like someone has given us a few extra hours. And yet we often waste them as if they didn't exist.\n\nThis month I paint in the evenings, in the last light, when everything is golden and soft.\n\nThis week, make one long evening for something you love. Not something you have to do. Something you love.",
    },
    artworkSlug: BIRDS,
  },

  /* ------------------------------- Summer -------------------------------- */
  {
    id: "letter-39",
    title: { sl: "Morje v glavi", en: "The sea in my head" },
    body: {
      sl: "Že samo misel na morje me umiri. Ne vem, ali je to zaradi valov, ki prihajajo in odhajajo, ali zaradi obzorja, ki nikoli ne konča.\n\nMorda je v nas vseh prostor, ki potrebuje obzorje. Nekaj, kar je večje od naših skrbi.\n\nKje je tvoje morje? Če ne moreš tja, si ga ta teden vsaj za pet minut predstavljaj. Deluje bolje, kot misliš.",
      en: "Just thinking about the sea calms me. I don't know whether it's the waves coming and going, or the horizon that never ends.\n\nMaybe there's a place in all of us that needs a horizon. Something bigger than our worries.\n\nWhere is your sea? If you can't go there, imagine it for five minutes this week. It works better than you'd think.",
    },
    artworkSlug: REMEMBERS,
  },
  {
    id: "letter-40",
    title: { sl: "Najdaljši dan", en: "The longest day" },
    body: {
      sl: "V teh dneh prihaja najdaljši dan v letu. Pozimi sem vam pisala o najdaljši noči. Zdaj je krog sklenjen.\n\nOd tu naprej se dnevi začnejo krajšati. Ne zato, ker bi bilo nekaj narobe. Zato, ker se vse vrti.\n\nUživaj ta teden v polni svetlobi. In ne boj se, da bo odšla. Vrnila se bo, kot se je že vedno.",
      en: "The longest day of the year is almost here. In winter I wrote to you about the longest night. Now the circle is closed.\n\nFrom here on the days begin to shorten. Not because anything is wrong. Because everything turns.\n\nEnjoy the full light this week. And don't be afraid it will leave. It will come back, as it always has.",
    },
    artworkSlug: BIRDS,
  },
  {
    id: "letter-41",
    title: { sl: "Poletna lenoba", en: "Summer idleness" },
    body: {
      sl: "Poleti si dovolim nekaj, česar si drugače ne: dneve brez načrta. Ležim v senci in gledam listje. In prav takrat se mi rodijo slike za jesen.\n\nNepoklicana misel je pogosto najboljša.\n\nPusti ta teden en popoldan prazen. Ne zapolni ga. Poglej, kaj priplava na površje, ko ne loviš ničesar.",
      en: "In summer I allow myself something I don't otherwise: days with no plan. I lie in the shade and watch the leaves. And that's exactly when the paintings for autumn are born.\n\nThe thought you didn't call for is often the best one.\n\nLeave one afternoon empty this week. Don't fill it. See what floats to the surface when you're not chasing anything.",
    },
    artworkSlug: ETERNAL,
  },
  {
    id: "letter-42",
    title: { sl: "Nevihta", en: "The storm" },
    body: {
      sl: "Poletne nevihte pridejo hitro in odidejo hitro. Nebo potemni, strela, naliv — in pol ure kasneje je zrak čist, kot bi ga kdo umil.\n\nNekatere naše jeze so take. Potrebujejo trenutek, da se izrazijo, in potem pustijo čist zrak.\n\nČe se v tebi ta teden nabira nevihta, ji ne zapiraj vrat. Samo poskrbi, da je nikogar ne poškoduje. Po njej bo svetleje.",
      en: "Summer storms arrive fast and leave fast. The sky darkens, lightning, a downpour — and half an hour later the air is clean, as if someone had washed it.\n\nSome of our anger is like that. It needs a moment to be expressed, and then it leaves the air clear.\n\nIf a storm is gathering in you this week, don't shut the door on it. Just make sure it hurts no one. It will be brighter afterwards.",
    },
    artworkSlug: PROPHECY,
  },
  {
    id: "letter-43",
    title: { sl: "Zvezde nad goro", en: "Stars above the mountain" },
    body: {
      sl: "Najlepše zvezde sem videla na gori, daleč od mest. Tam ni ničesar, kar bi jih preglasilo. So tako goste, da se zdijo blizu.\n\nMorda je tudi s sanjami tako — jih vidimo šele, ko ugasnemo vse druge luči.\n\nPoišči ta teden en temen kraj in poglej gor. Ne išči odgovorov. Samo poglej.",
      en: "The most beautiful stars I've ever seen were on a mountain, far from the cities. Nothing there drowns them out. They're so dense they seem close.\n\nMaybe dreams are like that too — we only see them once we turn off all the other lights.\n\nFind a dark place this week and look up. Don't look for answers. Just look.",
    },
    artworkSlug: REMEMBERS,
  },
  {
    id: "letter-44",
    title: { sl: "Počasna voda", en: "Slow water" },
    body: {
      sl: "Reka ne teče naravnost. Ovinka se ne boji. Obide skalo, ne da bi se z njo prepirala.\n\nKo sem bila mlajša, sem se hotela skozi vse prebiti. Zdaj se učim obiti, kjer se da, in se boriti samo, kjer se mora.\n\nKatera skala ti je ta teden na poti? Morda je ni treba premakniti. Morda jo lahko samo obideš.",
      en: "A river doesn't run straight. It isn't afraid of a bend. It flows around a rock without arguing with it.\n\nWhen I was younger I wanted to break through everything. Now I'm learning to go around where I can, and to fight only where I must.\n\nWhich rock is in your way this week? Maybe it doesn't need to be moved. Maybe you can just flow around it.",
    },
    artworkSlug: ETERNAL,
  },
  {
    id: "letter-45",
    title: { sl: "Poletje, ki ga ne bom ponovila", en: "A summer I won't repeat" },
    body: {
      sl: "Vsako poletje je samo enkrat. To poletje, s temi ljudmi, v tej svetlobi, ne bo nikoli več.\n\nNe pišem tega, da bi bilo žalostno. Pišem, da bi bilo dragoceno.\n\nKaj bi rad, da ostane od tega poletja? Ne na fotografiji. V tebi. Naredi ta teden prostor zanj.",
      en: "Every summer happens only once. This summer, with these people, in this light, will never come again.\n\nI'm not writing this to make it sad. I'm writing it to make it precious.\n\nWhat would you like to remain from this summer? Not in a photograph. In you. Make room for it this week.",
    },
    artworkSlug: BLOSSOMING,
  },
  {
    id: "letter-46",
    title: { sl: "Toplo kamenje", en: "Warm stones" },
    body: {
      sl: "Zvečer, ko sonce zaide, kamni še dolgo oddajajo toploto, ki so jo nabrali čez dan. Rada se naslonim nanje in čutim, kako mi vračajo sonce.\n\nMislim, da smo tudi mi taki. Toplina, ki jo prejmemo, ostane v nas še dolgo, ko je vir že odšel.\n\nKomu ta teden vračaš toplino, ki si jo nekoč prejel?",
      en: "In the evening, when the sun has set, the stones keep giving off the warmth they gathered during the day. I like to lean against them and feel them returning the sun to me.\n\nI think we're like that too. The warmth we receive stays in us long after its source has gone.\n\nWho are you returning some of your once-received warmth to this week?",
    },
    artworkSlug: ETERNAL,
  },
  {
    id: "letter-47",
    title: { sl: "Ko se vrneš domov", en: "When you come home" },
    body: {
      sl: "Po vsakem potovanju je trenutek, ko odklenem vrata ateljeja in me pozdravi vonj po barvi. Takrat vem, da sem doma.\n\nDom ni kraj. Je vonj, zvok, občutek, da ti ni treba ničesar dokazovati.\n\nKje se ti počutiš doma? Pojdi tja ta teden, četudi samo v mislih.",
      en: "After every trip there's a moment when I unlock the studio door and the smell of paint greets me. That's when I know I'm home.\n\nHome isn't a place. It's a smell, a sound, the feeling that you don't have to prove anything.\n\nWhere do you feel at home? Go there this week, even if only in your thoughts.",
    },
    artworkSlug: REMEMBERS,
  },
  {
    id: "letter-48",
    title: { sl: "Padajoče zvezde", en: "Falling stars" },
    body: {
      sl: "Sredi avgusta padajo zvezde. Ljudje ležimo na travi in čakamo, da si zaželimo nekaj.\n\nNe verjamem, da se želje izpolnijo zato, ker pade zvezda. Verjamem pa, da je dobro vsaj enkrat na leto na glas vedeti, kaj si želiš.\n\nKaj si želiš? Ne tisto, kar bi moral želeti. Tisto, kar si res želiš. Ta teden si to povej na glas.",
      en: "In the middle of August the stars fall. We lie on the grass waiting to make a wish.\n\nI don't believe wishes come true because a star falls. But I do believe it's good, at least once a year, to know out loud what you wish for.\n\nWhat do you wish for? Not what you ought to wish for. What you really wish for. Say it out loud this week.",
    },
    artworkSlug: REMEMBERS,
  },
  {
    id: "letter-49",
    title: { sl: "Konec poletja", en: "The end of summer" },
    body: {
      sl: "Zadnji dnevi avgusta imajo posebno svetlobo — še topla, a že nekoliko utrujena. Kot bi poletje vedelo, da odhaja.\n\nNe maram poslavljanj, a sem se naučila, da so prehodi pogosto najlepši del. Ne začetek, ne konec. Vmes.\n\nUživaj ta teden v tem vmes. Nisi več tam, kjer si bil, in še nisi tam, kamor greš. In to je v redu.",
      en: "The last days of August have a special light — still warm, but already a little tired. As if summer knew it was leaving.\n\nI don't like goodbyes, but I've learned that transitions are often the most beautiful part. Not the beginning, not the end. The in-between.\n\nEnjoy the in-between this week. You're no longer where you were, and not yet where you're going. And that's all right.",
    },
    artworkSlug: BIRDS,
  },
  {
    id: "letter-50",
    title: { sl: "Nova mapa", en: "A new folder" },
    body: {
      sl: "Septembra vedno kupim nov zvezek za skice. Ne zato, ker bi stari bil poln. Zato, ker jeseni začnem znova, kot da sem spet v šoli.\n\nV nas ostane ritem šolskega leta še dolgo po tem, ko šolo končamo. Morda ga je vredno uporabiti.\n\nKaj bi rad ta jesen začel? Kupi si nov zvezek — pravi ali namišljeni — in zapiši prvo stran.",
      en: "Every September I buy a new sketchbook. Not because the old one is full. Because in autumn I start over, as if I were back at school.\n\nThe rhythm of the school year stays in us long after school is over. Maybe it's worth using.\n\nWhat would you like to begin this autumn? Get yourself a new notebook — real or imagined — and write the first page.",
    },
    artworkSlug: PROPHECY,
  },
  {
    id: "letter-51",
    title: { sl: "Leto pisem", en: "A year of letters" },
    body: {
      sl: "Kmalu bo leto, odkar sem vam začela pisati. Leto četrtkov, leto slik, leto tihih vprašanj, na katera mi mnogi odgovarjate.\n\nVaša pisma berem vsa. Nekatera so me ganila do solz. Hvala, da jih pišete.\n\nPoglej ta teden nazaj na svoje leto. Ne na to, kaj si dosegel. Na to, kdo si postal.",
      en: "It will soon be a year since I started writing to you. A year of Thursdays, a year of paintings, a year of quiet questions — and many of you write back.\n\nI read all your letters. Some have moved me to tears. Thank you for writing them.\n\nThis week, look back at your year. Not at what you achieved. At who you've become.",
    },
    artworkSlug: ETERNAL,
  },
  {
    id: "letter-52",
    title: { sl: "Krog se sklene", en: "The circle closes" },
    body: {
      sl: "Moje prvo pismo je govorilo o tem, da se vsaka slika konča dvakrat — ko odložim čopič in ko nekdo pred njo utihne.\n\nTo je zadnje pismo prvega leta. In spet vidim, da se konec in začetek dotikata. Jutri bom začela novo platno.\n\nHvala, da si bil ob meni to leto. Vsak četrtek si utihnil pred mojimi besedami. To je bil moj drugi konec vsake slike.",
      en: "My first letter was about how every painting ends twice — when I put the brush down, and when someone falls quiet in front of it.\n\nThis is the last letter of the first year. And again I see that the end and the beginning touch. Tomorrow I'll start a new canvas.\n\nThank you for being with me this year. Every Thursday, you fell quiet in front of my words. That was the second ending of every painting.",
    },
    artworkSlug: REMEMBERS,
  },
];

/** The Thursday of an ISO week ("2026-W38" → "2026-09-17"), the day its letter goes out. */
export function weekThursday(week: string): string {
  const [yearRaw, weekRaw] = week.split("-W");
  const year = Number(yearRaw);
  const number = Number(weekRaw);
  if (!Number.isFinite(year) || !Number.isFinite(number)) return "";
  const jan4 = Date.UTC(year, 0, 4);
  const weekday = new Date(jan4).getUTCDay() || 7;
  const firstMonday = jan4 - (weekday - 1) * 86400000;
  return new Date(firstMonday + ((number - 1) * 7 + 3) * 86400000).toISOString().slice(0, 10);
}
