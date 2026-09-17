import type { Locale } from "./locales";

/**
 * Every line of interface text on the site, in the five languages.
 *
 * What is NOT here, on purpose: the artworks' own titles and Urška's poems (her words, left as
 * she wrote them), and the long generated texts — tarot readings and the calendar's day
 * readings — which exist in Slovenian and English and fall back to English elsewhere.
 *
 * Translations are mine, not a professional translator's; the legal pages in particular should
 * be read by someone qualified before they are relied on.
 */

export interface Dictionary {
  nav: {
    art: string;
    poetry: string;
    spirituality: string;
    climb: string;
    about: string;
    contact: string;
    cart: string;
    menu: string;
    close: string;
    skipToContent: string;
    tagline: string;
    home: string;
  };
  footer: {
    tagline: string;
    explore: string;
    policies: string;
    language: string;
    instagram: string;
    cookiePreferences: string;
    installApp: string;
    starCalendar: string;
    rights: string;
  };
  home: {
    scrollToEnter: string;
    theArtist: string;
    artistLine: string;
    artistLead: string;
    meetUrska: string;
    worldsTitle: string;
    originalArt: string;
    originalArtDesc: string;
    poetryDesc: string;
    spiritualityDesc: string;
    finalTitle: string;
    exploreWorks: string;
    discoverPoetry: string;
    commission: string;
    chapters: { arrival: string; painting: string; collection: string; poetry: string; artist: string };
  };
  collection: {
    eyebrow: string;
    title: string;
    intro: string;
    originals: string;
    oneOfEach: string;
    shippedWorldwide: string;
    viewFullSize: string;
    readStory: string;
    available: string;
    reserved: string;
    sold: string;
    inquire: string;
    inHomeEyebrow: string;
    inHomeTitle: string;
    inHomeText: string;
  };
  artwork: {
    back: string;
    originalArtwork: string;
    edition: string;
    specs: {
      medium: string;
      materials: string;
      dimensions: string;
      weight: string;
      year: string;
      edition: string;
      originalOneOfAKind: string;
      certificate: string;
      framed: string;
      dispatch: string;
      shipsTo: string;
      vat: string;
      care: string;
      yes: string;
      no: string;
    };
    readyToFindHome: string;
    addToCart: string;
    viewCart: string;
    inquireAbout: string;
    notAvailableOnline: string;
    photographyNote: string;
  };
  cart: {
    eyebrow: string;
    title: string;
    empty: string;
    browse: string;
    subtotal: string;
    remove: string;
    checkout: string;
    shippingNote: string;
  };
  checkout: {
    title: string;
    almostThere: string;
    name: string;
    email: string;
    destination: string;
    vat: string;
    vatValue: string;
    shipping: string;
    shippingValue: string;
    estimatedTotal: string;
    agree: string;
    terms: string;
    returns: string;
    place: string;
    placing: string;
    genericError: string;
    networkError: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    name: string;
    email: string;
    type: string;
    selectOne: string;
    message: string;
    send: string;
    sending: string;
    thanks: string;
    thanksBody: string;
    directNote: string;
    categories: {
      artwork: string;
      purchase: string;
      commission: string;
      shipping: string;
      press: string;
      other: string;
    };
    genericError: string;
    networkError: string;
  };
  climb: { eyebrow: string; title: string; text: string; back: string };
  poetry: { eyebrow: string; lead: string };
  legal: { eyebrow: string; lastUpdated: string; pendingTitle: string; pendingBody: string; englishNote: string };
  cookies: {
    text: string;
    acceptAll: string;
    rejectNonEssential: string;
    manage: string;
    save: string;
    alwaysOn: string;
    policyLink: string;
  };
  common: { close: string; loading: string };
}

const en: Dictionary = {
  nav: {
    art: "Art",
    poetry: "Poetry",
    spirituality: "Spirituality",
    climb: "Climb",
    about: "About",
    contact: "Contact",
    cart: "Cart",
    menu: "Menu",
    close: "Close",
    skipToContent: "Skip to content",
    tagline: "Original paintings, made in Slovenia — shipped worldwide",
    home: "Art by Urška — Home",
  },
  footer: {
    tagline: "Original paintings, made in Slovenia, shared with the world.",
    explore: "Explore",
    policies: "Policies",
    language: "Language",
    instagram: "Instagram",
    cookiePreferences: "Cookie Preferences",
    installApp: "📱 Spirituality app",
    starCalendar: "✨ Star Business Calendar",
    rights: "All rights reserved.",
  },
  home: {
    scrollToEnter: "Scroll to enter",
    theArtist: "The artist",
    artistLine: "These paintings are more than art — they are pieces of my spirit, woven into every brushstroke.",
    artistLead: "Before the canvas, there was the climb. Today, I express that journey through art.",
    meetUrska: "Meet Urška →",
    worldsTitle: "Three worlds",
    originalArt: "Original Art",
    originalArtDesc: "The paintings, one by one.",
    poetryDesc: "Words the paintings left behind.",
    spiritualityDesc: "Where the brush meets the soul.",
    finalTitle: "Which story will find you?",
    exploreWorks: "Explore original works",
    discoverPoetry: "Discover poetry",
    commission: "Commission a painting",
    chapters: { arrival: "Arrival", painting: "The Painting", collection: "Collection", poetry: "Poetry", artist: "The Artist" },
  },
  collection: {
    eyebrow: "The collection",
    title: "Every original, in one place",
    intro:
      "Each painting here exists once. Acrylic on canvas, painted by hand in Slovenia, and shipped worldwide — tap any piece to see it full size, or open its story.",
    originals: "originals",
    oneOfEach: "One of each",
    shippedWorldwide: "Shipped worldwide",
    viewFullSize: "View full size",
    readStory: "Read its story",
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
    inquire: "Ask about it",
    inHomeEyebrow: "In a home",
    inHomeTitle: "What they look like on a wall",
    inHomeText:
      "Every piece here is an original, photographed where it actually hangs — so you can see the scale before it ever reaches your own wall.",
  },
  artwork: {
    back: "Back",
    originalArtwork: "Original artwork",
    edition: "Edition",
    specs: {
      medium: "Medium",
      materials: "Materials",
      dimensions: "Dimensions",
      weight: "Weight",
      year: "Year",
      edition: "Edition",
      originalOneOfAKind: "Original, one of a kind",
      certificate: "Certificate of authenticity",
      framed: "Framed",
      dispatch: "Estimated dispatch",
      shipsTo: "Ships to",
      vat: "VAT / tax treatment",
      care: "Care information",
      yes: "Yes",
      no: "No",
    },
    readyToFindHome: "This piece is ready to find its home.",
    addToCart: "Add to cart",
    viewCart: "View cart",
    inquireAbout: "Inquire about this piece",
    notAvailableOnline: "Not currently available to purchase online",
    photographyNote:
      "Artwork photography may not perfectly reproduce physical color, texture, or scale across every screen. Dimensions and materials above are accurate; treat photographs as a close representation rather than an exact match.",
  },
  cart: {
    eyebrow: "Cart",
    title: "Your selection",
    empty: "Your cart is empty.",
    browse: "Browse the collection →",
    subtotal: "Subtotal",
    remove: "Remove",
    checkout: "Checkout",
    shippingNote: "Shipping is confirmed before payment.",
  },
  checkout: {
    title: "Checkout",
    almostThere: "Almost there",
    name: "Full name",
    email: "Email",
    destination: "Shipping destination",
    vat: "VAT / tax",
    vatValue: "See individual artwork specifications",
    shipping: "Shipping",
    shippingValue: "To be confirmed before payment",
    estimatedTotal: "Estimated total (excl. shipping)",
    agree: "I have read and agree to the",
    terms: "Terms & Conditions",
    returns: "Returns & Cancellations Policy",
    place: "Place order — payment required",
    placing: "Placing order…",
    genericError: "Something went wrong.",
    networkError: "Couldn't reach the server. Please try again.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    intro: "Write through the form below, or email Urška directly at",
    name: "Full name",
    email: "Email",
    type: "Inquiry type",
    selectOne: "Select one",
    message: "Message",
    send: "Send message",
    sending: "Sending…",
    thanks: "Thank you for your message.",
    thanksBody: "Urška will get back to you personally within a few days.",
    directNote: "Your message goes straight to Urška, who reads every one personally.",
    categories: {
      artwork: "Artwork inquiry",
      purchase: "Purchase assistance",
      commission: "Commission inquiry",
      shipping: "Shipping question",
      press: "Press / collaboration",
      other: "Other",
    },
    genericError: "Something went wrong. Please try again.",
    networkError: "Couldn't reach the server. Please try again.",
  },
  climb: {
    eyebrow: "Climb by Urška",
    title: "A new chapter, coming soon.",
    text: "This part of Urška's story — her life on the rock, before the canvas — is still being written. Check back soon.",
    back: "← Back to the paintings",
  },
  poetry: {
    eyebrow: "Poetry by Urška",
    lead: "Poetry is the bridge between what my soul remembers and what my heart longs to say.",
  },
  legal: {
    eyebrow: "Legal",
    lastUpdated: "Last updated",
    pendingTitle: "Pending legal review",
    pendingBody:
      "This page describes the intended structure of our policy and has not yet been reviewed by a legal professional. It is not a substitute for legal advice.",
    englishNote: "The binding version of this page is the English one.",
  },
  cookies: {
    text: "We use necessary cookies to run this site. With your consent, we'd also use analytics, marketing, and preference cookies — none are currently active. Read more in our",
    acceptAll: "Accept all",
    rejectNonEssential: "Reject non-essential",
    manage: "Manage preferences",
    save: "Save preferences",
    alwaysOn: " — always on",
    policyLink: "Cookie Policy",
  },
  common: { close: "Close", loading: "Loading…" },
};

const sl: Dictionary = {
  nav: {
    art: "Slike",
    poetry: "Poezija",
    spirituality: "Duhovnost",
    climb: "Plezanje",
    about: "O meni",
    contact: "Kontakt",
    cart: "Košarica",
    menu: "Meni",
    close: "Zapri",
    skipToContent: "Skoči na vsebino",
    tagline: "Originalne slike, ustvarjene v Sloveniji — poslane po vsem svetu",
    home: "Art by Urška — domov",
  },
  footer: {
    tagline: "Originalne slike, ustvarjene v Sloveniji, deljene s svetom.",
    explore: "Razišči",
    policies: "Pravno",
    language: "Jezik",
    instagram: "Instagram",
    cookiePreferences: "Nastavitve piškotkov",
    installApp: "📱 Aplikacija Spirituality",
    starCalendar: "✨ Zvezdni poslovni koledar",
    rights: "Vse pravice pridržane.",
  },
  home: {
    scrollToEnter: "Podrsaj za vstop",
    theArtist: "Umetnica",
    artistLine: "Te slike so več kot umetnost — so koščki mojega duha, vtkani v vsako potezo čopiča.",
    artistLead: "Pred platnom je bila stena. Danes to pot izražam skozi umetnost.",
    meetUrska: "Spoznaj Urško →",
    worldsTitle: "Trije svetovi",
    originalArt: "Originalne slike",
    originalArtDesc: "Slike, eno za drugo.",
    poetryDesc: "Besede, ki so jih pustile slike.",
    spiritualityDesc: "Kjer se čopič sreča z dušo.",
    finalTitle: "Katera zgodba bo našla tebe?",
    exploreWorks: "Razišči originalna dela",
    discoverPoetry: "Odkrij poezijo",
    commission: "Naroči sliko po želji",
    chapters: { arrival: "Prihod", painting: "Slika", collection: "Zbirka", poetry: "Poezija", artist: "Umetnica" },
  },
  collection: {
    eyebrow: "Zbirka",
    title: "Vsi originali na enem mestu",
    intro:
      "Vsaka slika obstaja samo enkrat. Akril na platnu, naslikan ročno v Sloveniji, poslan po vsem svetu — tapni katerokoli sliko za pogled v polni velikosti ali odpri njeno zgodbo.",
    originals: "originalov",
    oneOfEach: "Vsaka samo enkrat",
    shippedWorldwide: "Dostava po vsem svetu",
    viewFullSize: "Poglej v polni velikosti",
    readStory: "Preberi zgodbo",
    available: "Na voljo",
    reserved: "Rezervirano",
    sold: "Prodano",
    inquire: "Povprašaj",
    inHomeEyebrow: "V domu",
    inHomeTitle: "Kako izgledajo na steni",
    inHomeText:
      "Vsako delo tukaj je original, fotografiran tam, kjer dejansko visi — da vidiš velikost, še preden pride na tvojo steno.",
  },
  artwork: {
    back: "Nazaj",
    originalArtwork: "Originalno delo",
    edition: "Izdaja",
    specs: {
      medium: "Tehnika",
      materials: "Materiali",
      dimensions: "Mere",
      weight: "Teža",
      year: "Leto",
      edition: "Izdaja",
      originalOneOfAKind: "Original, edini primerek",
      certificate: "Potrdilo o pristnosti",
      framed: "Uokvirjeno",
      dispatch: "Predviden rok odpreme",
      shipsTo: "Dostava v",
      vat: "Obravnava DDV",
      care: "Navodila za nego",
      yes: "Da",
      no: "Ne",
    },
    readyToFindHome: "To delo je pripravljeno najti svoj dom.",
    addToCart: "Dodaj v košarico",
    viewCart: "Poglej košarico",
    inquireAbout: "Povprašaj o tem delu",
    notAvailableOnline: "Trenutno ni na voljo za spletni nakup",
    photographyNote:
      "Fotografija morda ne prikaže barve, teksture in velikosti popolnoma natančno na vsakem zaslonu. Mere in materiali zgoraj so točni; fotografije so blizu izvirniku, a ne popoln prikaz.",
  },
  cart: {
    eyebrow: "Košarica",
    title: "Tvoj izbor",
    empty: "Košarica je prazna.",
    browse: "Razišči zbirko →",
    subtotal: "Skupaj",
    remove: "Odstrani",
    checkout: "Na blagajno",
    shippingNote: "Dostava se potrdi pred plačilom.",
  },
  checkout: {
    title: "Blagajna",
    almostThere: "Še korak do cilja",
    name: "Ime in priimek",
    email: "Email",
    destination: "Kam pošljemo",
    vat: "DDV",
    vatValue: "Glej podatke pri posamezni sliki",
    shipping: "Dostava",
    shippingValue: "Potrdimo pred plačilom",
    estimatedTotal: "Predviden skupni znesek (brez dostave)",
    agree: "Prebral sem in se strinjam s",
    terms: "Pogoji poslovanja",
    returns: "Pravili o vračilih in odpovedi",
    place: "Oddaj naročilo — sledi plačilo",
    placing: "Oddajam naročilo …",
    genericError: "Nekaj je šlo narobe.",
    networkError: "Povezava s strežnikom ni uspela. Poskusi znova.",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Stopi v stik",
    intro: "Piši prek obrazca spodaj ali neposredno na Urškin e-naslov",
    name: "Ime in priimek",
    email: "Email",
    type: "Vrsta povpraševanja",
    selectOne: "Izberi",
    message: "Sporočilo",
    send: "Pošlji sporočilo",
    sending: "Pošiljam …",
    thanks: "Hvala za tvoje sporočilo.",
    thanksBody: "Urška ti bo osebno odgovorila v nekaj dneh.",
    directNote: "Sporočilo gre naravnost Urški, ki vsako prebere osebno.",
    categories: {
      artwork: "Vprašanje o sliki",
      purchase: "Pomoč pri nakupu",
      commission: "Naročilo slike po želji",
      shipping: "Vprašanje o dostavi",
      press: "Mediji / sodelovanje",
      other: "Drugo",
    },
    genericError: "Nekaj je šlo narobe. Poskusi znova.",
    networkError: "Povezava s strežnikom ni uspela. Poskusi znova.",
  },
  climb: {
    eyebrow: "Plezanje z Urško",
    title: "Novo poglavje, kmalu.",
    text: "Ta del Urškine zgodbe — njeno življenje na steni, pred platnom — se še piše. Vrni se kmalu.",
    back: "← Nazaj k slikam",
  },
  poetry: {
    eyebrow: "Poezija Urške",
    lead: "Poezija je most med tem, česar se moja duša spominja, in tem, kar si moje srce želi povedati.",
  },
  legal: {
    eyebrow: "Pravno",
    lastUpdated: "Zadnja posodobitev",
    pendingTitle: "Čaka na pravni pregled",
    pendingBody:
      "Ta stran opisuje predvideno vsebino naših pravil in je pravnik še ni pregledal. Ne nadomešča pravnega nasveta.",
    englishNote: "Zavezujoča je angleška različica te strani.",
  },
  cookies: {
    text: "Nujne piškotke uporabljamo za delovanje strani. Z vašim soglasjem bi uporabljali tudi analitične, tržne in prilagoditvene piškotke — trenutno ni aktiven noben. Več v",
    acceptAll: "Sprejmi vse",
    rejectNonEssential: "Zavrni nenujne",
    manage: "Uredi nastavitve",
    save: "Shrani nastavitve",
    alwaysOn: " — vedno vklopljeno",
    policyLink: "Pravilih o piškotkih",
  },
  common: { close: "Zapri", loading: "Nalagam …" },
};

const hr: Dictionary = {
  nav: {
    art: "Slike",
    poetry: "Poezija",
    spirituality: "Duhovnost",
    climb: "Penjanje",
    about: "O meni",
    contact: "Kontakt",
    cart: "Košarica",
    menu: "Izbornik",
    close: "Zatvori",
    skipToContent: "Preskoči na sadržaj",
    tagline: "Originalne slike, nastale u Sloveniji — dostava u cijeli svijet",
    home: "Art by Urška — početna",
  },
  footer: {
    tagline: "Originalne slike, nastale u Sloveniji, podijeljene sa svijetom.",
    explore: "Istraži",
    policies: "Pravno",
    language: "Jezik",
    instagram: "Instagram",
    cookiePreferences: "Postavke kolačića",
    installApp: "📱 Aplikacija Spirituality",
    starCalendar: "✨ Zvjezdani poslovni kalendar",
    rights: "Sva prava pridržana.",
  },
  home: {
    scrollToEnter: "Pomakni za ulaz",
    theArtist: "Umjetnica",
    artistLine: "Ove su slike više od umjetnosti — one su dijelovi mojega duha, utkani u svaki potez kista.",
    artistLead: "Prije platna bila je stijena. Danas taj put izražavam kroz umjetnost.",
    meetUrska: "Upoznaj Uršku →",
    worldsTitle: "Tri svijeta",
    originalArt: "Originalne slike",
    originalArtDesc: "Slike, jedna po jedna.",
    poetryDesc: "Riječi koje su slike ostavile za sobom.",
    spiritualityDesc: "Ondje gdje se kist susreće s dušom.",
    finalTitle: "Koja će priča pronaći tebe?",
    exploreWorks: "Istraži originalna djela",
    discoverPoetry: "Otkrij poeziju",
    commission: "Naruči sliku po želji",
    chapters: { arrival: "Dolazak", painting: "Slika", collection: "Zbirka", poetry: "Poezija", artist: "Umjetnica" },
  },
  collection: {
    eyebrow: "Zbirka",
    title: "Svi originali na jednom mjestu",
    intro:
      "Svaka slika postoji samo jednom. Akril na platnu, oslikan ručno u Sloveniji, s dostavom u cijeli svijet — dodirni bilo koje djelo za prikaz u punoj veličini ili otvori njegovu priču.",
    originals: "originala",
    oneOfEach: "Svaka samo jednom",
    shippedWorldwide: "Dostava u cijeli svijet",
    viewFullSize: "Prikaži u punoj veličini",
    readStory: "Pročitaj priču",
    available: "Dostupno",
    reserved: "Rezervirano",
    sold: "Prodano",
    inquire: "Upitaj",
    inHomeEyebrow: "U domu",
    inHomeTitle: "Kako izgledaju na zidu",
    inHomeText:
      "Svako je djelo original, fotografiran ondje gdje zaista visi — da vidiš veličinu prije nego što stigne na tvoj zid.",
  },
  artwork: {
    back: "Natrag",
    originalArtwork: "Originalno djelo",
    edition: "Izdanje",
    specs: {
      medium: "Tehnika",
      materials: "Materijali",
      dimensions: "Dimenzije",
      weight: "Težina",
      year: "Godina",
      edition: "Izdanje",
      originalOneOfAKind: "Original, jedini primjerak",
      certificate: "Potvrda o autentičnosti",
      framed: "Uokvireno",
      dispatch: "Predviđeni rok slanja",
      shipsTo: "Dostava u",
      vat: "PDV",
      care: "Upute za održavanje",
      yes: "Da",
      no: "Ne",
    },
    readyToFindHome: "Ovo je djelo spremno pronaći svoj dom.",
    addToCart: "Dodaj u košaricu",
    viewCart: "Pogledaj košaricu",
    inquireAbout: "Upitaj o ovom djelu",
    notAvailableOnline: "Trenutačno nije dostupno za kupnju putem interneta",
    photographyNote:
      "Fotografija možda neće savršeno prenijeti boju, teksturu i veličinu na svakom zaslonu. Dimenzije i materijali iznad su točni; fotografije shvati kao blizak, ali ne i savršen prikaz.",
  },
  cart: {
    eyebrow: "Košarica",
    title: "Tvoj odabir",
    empty: "Košarica je prazna.",
    browse: "Istraži zbirku →",
    subtotal: "Ukupno",
    remove: "Ukloni",
    checkout: "Na naplatu",
    shippingNote: "Dostava se potvrđuje prije plaćanja.",
  },
  checkout: {
    title: "Naplata",
    almostThere: "Još samo korak",
    name: "Ime i prezime",
    email: "Email",
    destination: "Adresa dostave",
    vat: "PDV",
    vatValue: "Vidi podatke uz pojedinu sliku",
    shipping: "Dostava",
    shippingValue: "Potvrđujemo prije plaćanja",
    estimatedTotal: "Predviđeni ukupni iznos (bez dostave)",
    agree: "Pročitao sam i prihvaćam",
    terms: "Uvjete poslovanja",
    returns: "Pravila o povratu i otkazivanju",
    place: "Pošalji narudžbu — slijedi plaćanje",
    placing: "Šaljem narudžbu …",
    genericError: "Nešto je pošlo po zlu.",
    networkError: "Povezivanje s poslužiteljem nije uspjelo. Pokušaj ponovno.",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Javi se",
    intro: "Piši putem obrasca ispod ili izravno na Urškinu e-adresu",
    name: "Ime i prezime",
    email: "Email",
    type: "Vrsta upita",
    selectOne: "Odaberi",
    message: "Poruka",
    send: "Pošalji poruku",
    sending: "Šaljem …",
    thanks: "Hvala na poruci.",
    thanksBody: "Urška će ti osobno odgovoriti u nekoliko dana.",
    directNote: "Poruka ide izravno Urški, koja svaku pročita osobno.",
    categories: {
      artwork: "Upit o slici",
      purchase: "Pomoć pri kupnji",
      commission: "Narudžba slike po želji",
      shipping: "Pitanje o dostavi",
      press: "Mediji / suradnja",
      other: "Ostalo",
    },
    genericError: "Nešto je pošlo po zlu. Pokušaj ponovno.",
    networkError: "Povezivanje s poslužiteljem nije uspjelo. Pokušaj ponovno.",
  },
  climb: {
    eyebrow: "Penjanje s Urškom",
    title: "Novo poglavlje, uskoro.",
    text: "Taj dio Urškine priče — život na stijeni, prije platna — još se piše. Vrati se uskoro.",
    back: "← Natrag na slike",
  },
  poetry: {
    eyebrow: "Poezija Urške",
    lead: "Poezija je most između onoga čega se moja duša sjeća i onoga što moje srce želi reći.",
  },
  legal: {
    eyebrow: "Pravno",
    lastUpdated: "Zadnja izmjena",
    pendingTitle: "Čeka pravni pregled",
    pendingBody:
      "Ova stranica opisuje predviđeni sadržaj naših pravila i pravnik je još nije pregledao. Ne zamjenjuje pravni savjet.",
    englishNote: "Obvezujuća je engleska inačica ove stranice.",
  },
  cookies: {
    text: "Nužne kolačiće koristimo za rad stranice. Uz vaš pristanak koristili bismo i analitičke, marketinške i kolačiće postavki — nijedan trenutačno nije aktivan. Više u",
    acceptAll: "Prihvati sve",
    rejectNonEssential: "Odbij nenužne",
    manage: "Uredi postavke",
    save: "Spremi postavke",
    alwaysOn: " — uvijek uključeno",
    policyLink: "Pravilima o kolačićima",
  },
  common: { close: "Zatvori", loading: "Učitavam …" },
};

const de: Dictionary = {
  nav: {
    art: "Kunst",
    poetry: "Poesie",
    spirituality: "Spiritualität",
    climb: "Klettern",
    about: "Über mich",
    contact: "Kontakt",
    cart: "Warenkorb",
    menu: "Menü",
    close: "Schließen",
    skipToContent: "Zum Inhalt springen",
    tagline: "Originalgemälde aus Slowenien — weltweiter Versand",
    home: "Art by Urška — Startseite",
  },
  footer: {
    tagline: "Originalgemälde aus Slowenien, mit der Welt geteilt.",
    explore: "Entdecken",
    policies: "Rechtliches",
    language: "Sprache",
    instagram: "Instagram",
    cookiePreferences: "Cookie-Einstellungen",
    installApp: "📱 Spirituality-App",
    starCalendar: "✨ Sternen-Geschäftskalender",
    rights: "Alle Rechte vorbehalten.",
  },
  home: {
    scrollToEnter: "Scrollen zum Eintreten",
    theArtist: "Die Künstlerin",
    artistLine: "Diese Bilder sind mehr als Kunst — sie sind Teile meines Geistes, in jeden Pinselstrich gewoben.",
    artistLead: "Vor der Leinwand war der Fels. Heute drücke ich diesen Weg durch Kunst aus.",
    meetUrska: "Urška kennenlernen →",
    worldsTitle: "Drei Welten",
    originalArt: "Originalbilder",
    originalArtDesc: "Die Gemälde, eines nach dem anderen.",
    poetryDesc: "Worte, die die Bilder zurückgelassen haben.",
    spiritualityDesc: "Wo der Pinsel die Seele trifft.",
    finalTitle: "Welche Geschichte findet dich?",
    exploreWorks: "Originalwerke entdecken",
    discoverPoetry: "Poesie entdecken",
    commission: "Ein Bild in Auftrag geben",
    chapters: { arrival: "Ankunft", painting: "Das Bild", collection: "Sammlung", poetry: "Poesie", artist: "Die Künstlerin" },
  },
  collection: {
    eyebrow: "Die Sammlung",
    title: "Alle Originale an einem Ort",
    intro:
      "Jedes Bild gibt es nur einmal. Acryl auf Leinwand, in Slowenien von Hand gemalt, weltweit versandt — tippe auf ein Werk für die volle Größe oder öffne seine Geschichte.",
    originals: "Originale",
    oneOfEach: "Jedes nur einmal",
    shippedWorldwide: "Weltweiter Versand",
    viewFullSize: "In voller Größe ansehen",
    readStory: "Geschichte lesen",
    available: "Verfügbar",
    reserved: "Reserviert",
    sold: "Verkauft",
    inquire: "Anfragen",
    inHomeEyebrow: "Zu Hause",
    inHomeTitle: "So wirken sie an der Wand",
    inHomeText:
      "Jedes Werk hier ist ein Original, fotografiert dort, wo es tatsächlich hängt — damit du die Größe siehst, bevor es an deine Wand kommt.",
  },
  artwork: {
    back: "Zurück",
    originalArtwork: "Originalwerk",
    edition: "Auflage",
    specs: {
      medium: "Technik",
      materials: "Materialien",
      dimensions: "Maße",
      weight: "Gewicht",
      year: "Jahr",
      edition: "Auflage",
      originalOneOfAKind: "Original, Unikat",
      certificate: "Echtheitszertifikat",
      framed: "Gerahmt",
      dispatch: "Voraussichtlicher Versand",
      shipsTo: "Versand nach",
      vat: "Umsatzsteuer",
      care: "Pflegehinweise",
      yes: "Ja",
      no: "Nein",
    },
    readyToFindHome: "Dieses Werk ist bereit, sein Zuhause zu finden.",
    addToCart: "In den Warenkorb",
    viewCart: "Warenkorb ansehen",
    inquireAbout: "Zu diesem Werk anfragen",
    notAvailableOnline: "Derzeit nicht online erhältlich",
    photographyNote:
      "Fotografien geben Farbe, Textur und Größe nicht auf jedem Bildschirm exakt wieder. Maße und Materialien oben sind korrekt; die Fotos sind eine nahe, aber keine exakte Wiedergabe.",
  },
  cart: {
    eyebrow: "Warenkorb",
    title: "Deine Auswahl",
    empty: "Dein Warenkorb ist leer.",
    browse: "Sammlung ansehen →",
    subtotal: "Zwischensumme",
    remove: "Entfernen",
    checkout: "Zur Kasse",
    shippingNote: "Der Versand wird vor der Zahlung bestätigt.",
  },
  checkout: {
    title: "Kasse",
    almostThere: "Fast geschafft",
    name: "Vor- und Nachname",
    email: "E-Mail",
    destination: "Lieferziel",
    vat: "Umsatzsteuer",
    vatValue: "Siehe Angaben beim einzelnen Werk",
    shipping: "Versand",
    shippingValue: "Wird vor der Zahlung bestätigt",
    estimatedTotal: "Voraussichtliche Summe (ohne Versand)",
    agree: "Ich habe gelesen und akzeptiere die",
    terms: "AGB",
    returns: "Widerrufs- und Rückgaberichtlinie",
    place: "Bestellung abschicken — Zahlung folgt",
    placing: "Bestellung wird gesendet …",
    genericError: "Etwas ist schiefgelaufen.",
    networkError: "Der Server war nicht erreichbar. Bitte versuche es erneut.",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Schreib mir",
    intro: "Schreibe über das Formular unten oder direkt an Urškas E-Mail-Adresse",
    name: "Vor- und Nachname",
    email: "E-Mail",
    type: "Art der Anfrage",
    selectOne: "Bitte wählen",
    message: "Nachricht",
    send: "Nachricht senden",
    sending: "Senden …",
    thanks: "Danke für deine Nachricht.",
    thanksBody: "Urška meldet sich innerhalb weniger Tage persönlich bei dir.",
    directNote: "Deine Nachricht geht direkt an Urška, die jede einzelne persönlich liest.",
    categories: {
      artwork: "Frage zu einem Werk",
      purchase: "Hilfe beim Kauf",
      commission: "Auftragsarbeit",
      shipping: "Frage zum Versand",
      press: "Presse / Zusammenarbeit",
      other: "Sonstiges",
    },
    genericError: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    networkError: "Der Server war nicht erreichbar. Bitte versuche es erneut.",
  },
  climb: {
    eyebrow: "Klettern mit Urška",
    title: "Ein neues Kapitel, bald.",
    text: "Dieser Teil von Urškas Geschichte — ihr Leben am Fels, vor der Leinwand — wird noch geschrieben. Schau bald wieder vorbei.",
    back: "← Zurück zu den Bildern",
  },
  poetry: {
    eyebrow: "Poesie von Urška",
    lead: "Poesie ist die Brücke zwischen dem, woran meine Seele sich erinnert, und dem, was mein Herz sagen möchte.",
  },
  legal: {
    eyebrow: "Rechtliches",
    lastUpdated: "Zuletzt aktualisiert",
    pendingTitle: "Juristische Prüfung ausstehend",
    pendingBody:
      "Diese Seite beschreibt den vorgesehenen Inhalt unserer Richtlinie und wurde noch nicht juristisch geprüft. Sie ersetzt keine Rechtsberatung.",
    englishNote: "Verbindlich ist die englische Fassung dieser Seite.",
  },
  cookies: {
    text: "Notwendige Cookies brauchen wir für den Betrieb der Seite. Mit deiner Einwilligung würden wir auch Analyse-, Marketing- und Präferenz-Cookies nutzen — derzeit ist keines aktiv. Mehr dazu in unserer",
    acceptAll: "Alle akzeptieren",
    rejectNonEssential: "Nicht notwendige ablehnen",
    manage: "Einstellungen verwalten",
    save: "Einstellungen speichern",
    alwaysOn: " — immer aktiv",
    policyLink: "Cookie-Richtlinie",
  },
  common: { close: "Schließen", loading: "Lädt …" },
};

const it: Dictionary = {
  nav: {
    art: "Arte",
    poetry: "Poesia",
    spirituality: "Spiritualità",
    climb: "Arrampicata",
    about: "Chi sono",
    contact: "Contatto",
    cart: "Carrello",
    menu: "Menu",
    close: "Chiudi",
    skipToContent: "Vai al contenuto",
    tagline: "Dipinti originali, creati in Slovenia — spedizione in tutto il mondo",
    home: "Art by Urška — home",
  },
  footer: {
    tagline: "Dipinti originali, creati in Slovenia, condivisi con il mondo.",
    explore: "Esplora",
    policies: "Note legali",
    language: "Lingua",
    instagram: "Instagram",
    cookiePreferences: "Preferenze cookie",
    installApp: "📱 App Spirituality",
    starCalendar: "✨ Calendario stellare per gli affari",
    rights: "Tutti i diritti riservati.",
  },
  home: {
    scrollToEnter: "Scorri per entrare",
    theArtist: "L'artista",
    artistLine: "Questi dipinti sono più che arte — sono pezzi del mio spirito, intrecciati in ogni pennellata.",
    artistLead: "Prima della tela c'era la roccia. Oggi esprimo quel cammino attraverso l'arte.",
    meetUrska: "Conosci Urška →",
    worldsTitle: "Tre mondi",
    originalArt: "Opere originali",
    originalArtDesc: "I dipinti, uno per uno.",
    poetryDesc: "Le parole lasciate dai dipinti.",
    spiritualityDesc: "Dove il pennello incontra l'anima.",
    finalTitle: "Quale storia troverà te?",
    exploreWorks: "Esplora le opere originali",
    discoverPoetry: "Scopri la poesia",
    commission: "Commissiona un dipinto",
    chapters: { arrival: "Arrivo", painting: "Il dipinto", collection: "Collezione", poetry: "Poesia", artist: "L'artista" },
  },
  collection: {
    eyebrow: "La collezione",
    title: "Tutti gli originali in un solo luogo",
    intro:
      "Ogni dipinto esiste una volta sola. Acrilico su tela, dipinto a mano in Slovenia e spedito in tutto il mondo — tocca un'opera per vederla a grandezza intera o apri la sua storia.",
    originals: "originali",
    oneOfEach: "Ognuno unico",
    shippedWorldwide: "Spedizione mondiale",
    viewFullSize: "Guarda a grandezza intera",
    readStory: "Leggi la storia",
    available: "Disponibile",
    reserved: "Riservato",
    sold: "Venduto",
    inquire: "Chiedi informazioni",
    inHomeEyebrow: "In una casa",
    inHomeTitle: "Come stanno su una parete",
    inHomeText:
      "Ogni opera qui è un originale, fotografata dove è realmente appesa — così vedi le proporzioni prima che arrivi sulla tua parete.",
  },
  artwork: {
    back: "Indietro",
    originalArtwork: "Opera originale",
    edition: "Edizione",
    specs: {
      medium: "Tecnica",
      materials: "Materiali",
      dimensions: "Dimensioni",
      weight: "Peso",
      year: "Anno",
      edition: "Edizione",
      originalOneOfAKind: "Originale, pezzo unico",
      certificate: "Certificato di autenticità",
      framed: "Incorniciato",
      dispatch: "Spedizione prevista",
      shipsTo: "Spedizione verso",
      vat: "IVA",
      care: "Cura dell'opera",
      yes: "Sì",
      no: "No",
    },
    readyToFindHome: "Quest'opera è pronta a trovare la sua casa.",
    addToCart: "Aggiungi al carrello",
    viewCart: "Vedi il carrello",
    inquireAbout: "Chiedi informazioni su quest'opera",
    notAvailableOnline: "Al momento non acquistabile online",
    photographyNote:
      "Le fotografie possono non riprodurre perfettamente colore, texture e dimensioni su ogni schermo. Misure e materiali indicati sopra sono esatti; le foto sono una resa fedele ma non identica.",
  },
  cart: {
    eyebrow: "Carrello",
    title: "La tua selezione",
    empty: "Il carrello è vuoto.",
    browse: "Sfoglia la collezione →",
    subtotal: "Totale parziale",
    remove: "Rimuovi",
    checkout: "Vai al pagamento",
    shippingNote: "La spedizione viene confermata prima del pagamento.",
  },
  checkout: {
    title: "Pagamento",
    almostThere: "Ci siamo quasi",
    name: "Nome e cognome",
    email: "Email",
    destination: "Destinazione di spedizione",
    vat: "IVA",
    vatValue: "Vedi i dati della singola opera",
    shipping: "Spedizione",
    shippingValue: "Da confermare prima del pagamento",
    estimatedTotal: "Totale stimato (spedizione esclusa)",
    agree: "Ho letto e accetto i",
    terms: "Termini e condizioni",
    returns: "Politica di reso e annullamento",
    place: "Invia l'ordine — segue il pagamento",
    placing: "Invio dell'ordine …",
    genericError: "Qualcosa è andato storto.",
    networkError: "Impossibile raggiungere il server. Riprova.",
  },
  contact: {
    eyebrow: "Contatto",
    title: "Scrivimi",
    intro: "Scrivi con il modulo qui sotto oppure direttamente all'email di Urška",
    name: "Nome e cognome",
    email: "Email",
    type: "Tipo di richiesta",
    selectOne: "Scegli",
    message: "Messaggio",
    send: "Invia il messaggio",
    sending: "Invio …",
    thanks: "Grazie per il tuo messaggio.",
    thanksBody: "Urška ti risponderà personalmente entro pochi giorni.",
    directNote: "Il messaggio arriva direttamente a Urška, che legge personalmente ognuno.",
    categories: {
      artwork: "Domanda su un'opera",
      purchase: "Aiuto per l'acquisto",
      commission: "Opera su commissione",
      shipping: "Domanda sulla spedizione",
      press: "Stampa / collaborazione",
      other: "Altro",
    },
    genericError: "Qualcosa è andato storto. Riprova.",
    networkError: "Impossibile raggiungere il server. Riprova.",
  },
  climb: {
    eyebrow: "Arrampicata con Urška",
    title: "Un nuovo capitolo, presto.",
    text: "Questa parte della storia di Urška — la sua vita sulla roccia, prima della tela — è ancora in scrittura. Torna presto.",
    back: "← Torna ai dipinti",
  },
  poetry: {
    eyebrow: "Poesia di Urška",
    lead: "La poesia è il ponte tra ciò che la mia anima ricorda e ciò che il mio cuore desidera dire.",
  },
  legal: {
    eyebrow: "Note legali",
    lastUpdated: "Ultimo aggiornamento",
    pendingTitle: "In attesa di revisione legale",
    pendingBody:
      "Questa pagina descrive il contenuto previsto della nostra informativa e non è ancora stata rivista da un professionista legale. Non sostituisce una consulenza legale.",
    englishNote: "La versione vincolante di questa pagina è quella inglese.",
  },
  cookies: {
    text: "Usiamo cookie necessari per far funzionare il sito. Con il tuo consenso useremmo anche cookie analitici, di marketing e di preferenza — al momento nessuno è attivo. Maggiori informazioni nella nostra",
    acceptAll: "Accetta tutti",
    rejectNonEssential: "Rifiuta i non necessari",
    manage: "Gestisci preferenze",
    save: "Salva preferenze",
    alwaysOn: " — sempre attivi",
    policyLink: "Informativa sui cookie",
  },
  common: { close: "Chiudi", loading: "Caricamento …" },
};

export const DICTIONARIES: Record<Locale, Dictionary> = { en, sl, hr, de, it };
