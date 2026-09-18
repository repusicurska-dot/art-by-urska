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
    paintThanSay: string;
    viewArtwork: string;
    enter: string;
    enterStory: string;
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
    previous: string;
    next: string;
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
    completeOrder: string;
    contactDetails: string;
    orderSummary: string;
    inquiryForm: string;
    agreeTail: string;
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
    regarding: string;
    interestedIn: string;
    networkError: string;
  };
  orderStatus: {
    confirmed: string;
    thankYou: string;
    receivedBody: string;
    paidBody: string;
    yourEmail: string;
    almostThere: string;
    notConfirmedTitle: string;
    notConfirmedBody: string;
    backToCollection: string;
    backToGallery: string;
    notFoundTitle: string;
    notFoundBody: string;
    backHome: string;
  };
  zones: Record<"SI" | "EU" | "EUROPE_NON_EU" | "INTERNATIONAL", { label: string; description: string }>;
  about: {
    eyebrow: string;
    name: string;
    lead: string;
    remembered: string;
    climbing: string;
    shaped: string;
    today: string;
    work: string;
    dialogue: string;
    invitation: string;
    welcome: string;
    alt: { portrait: string; garden: string; lookingBack: string; roses: string };
  };
  climb: { eyebrow: string; title: string; text: string; back: string };
  poetry: {
    eyebrow: string;
    lead: string;
    title: string;
    subtitle: string;
    cta: string;
    loginPrompt: string;
    login: string;
    sampleEyebrow: string;
    sampleNote: string;
    lockedTitle: string;
    lockedText: string;
    whatTitle: string;
    what: { icon: string; title: string; text: string }[];
    quotesTitle: string;
    priceTitle: string;
    priceNote: string;
    formTitle: string;
    email: string;
    password: string;
    passwordRepeat: string;
    passwordHint: string;
    mismatch: string;
    consent: string;
    terms: string;
    submit: string;
    submitting: string;
    exists: string;
    complimentary: string;
    soon: string;
    canceled: string;
    checkoutError: string;
    languageNote: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
    seePaintings: string;
    archiveLink: string;
  };
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
    paintThanSay: "Some things are easier to paint than to say.",
    viewArtwork: "View artwork",
    enter: "Enter →",
    enterStory: "Enter the story →",
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
    previous: "Previous artwork",
    next: "Next artwork",
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
    completeOrder: "Complete your order",
    contactDetails: "Contact details",
    orderSummary: "Order summary",
    inquiryForm: "Go to inquiry form",
    agreeTail: "and understand my right of withdrawal where it applies. Placing this order creates an obligation to pay.",
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
    regarding: "Regarding",
    interestedIn: 'I\u2019m interested in "{title}". ',
    networkError: "Couldn't reach the server. Please try again.",
  },
  orderStatus: {
    confirmed: "Order confirmed",
    thankYou: "Thank you.",
    receivedBody:
      "Your order has been received. A confirmation email is on its way — if it doesn't arrive shortly, please get in touch and we'll make sure everything is in order.",
    paidBody:
      "Your order has been received and the payment confirmed. Urška will be in touch personally at {email} to arrange packaging and shipping.",
    yourEmail: "the email you gave us",
    almostThere: "Almost there",
    notConfirmedTitle: "We couldn't confirm this order",
    notConfirmedBody:
      "If you completed the payment, please write to us with your confirmation email so we can check it by hand.",
    backToCollection: "← Back to the collection",
    backToGallery: "Back to the gallery →",
    notFoundTitle: "Page not found",
    notFoundBody: "The story you're looking for may have moved elsewhere.",
    backHome: "Back home",
  },
  zones: {
    SI: { label: "Slovenia", description: "Delivered within Slovenia." },
    EU: { label: "European Union", description: "Delivered within the European Union." },
    EUROPE_NON_EU: {
      label: "Europe (outside the EU)",
      description:
        "Delivered within Europe, outside the EU. Customs or import charges may apply depending on destination.",
    },
    INTERNATIONAL: {
      label: "International (worldwide)",
      description:
        "Delivered worldwide. Import duties, taxes or customs charges may apply depending on destination and are the recipient's responsibility unless stated otherwise at checkout.",
    },
  },
  about: {
    eyebrow: "About the artist",
    name: "Urška",
    lead: "These paintings are more than art — they are pieces of my spirit, woven into every brushstroke.",
    remembered:
      "My art is not simply something I create — it is something I remember. Perhaps that is why certain paintings feel like silent echoes of something our souls already know.",
    climbing:
      "Before I became an artist, I dedicated my life to climbing. As a professional competition climber, I had the honor of competing at the highest international level. Along the way, I became the European Champion in bouldering, overall National Champion in both bouldering and speed climbing, a European Cup medalist, a World Youth Vice Champion, European Youth Cup overall winner and earned a podium finish at the World Beach Games.",
    shaped:
      "Climbing shaped who I am. It taught me discipline, resilience, presence, and the courage to trust my instincts. Every route was a lesson in perseverance, every challenge an invitation to grow. But as meaningful as that journey was, it eventually led me toward a deeper search — one that could not be expressed through movement alone.",
    today: "Today, I express that journey through art.",
    work:
      "My work is a way of giving form to my soul. Every painting is a reflection of emotions, experiences, and moments that cannot always be put into words. Just as every climb tells a story, every artwork carries a part of my inner world.",
    dialogue:
      "For me, art is more than creating something beautiful. It is a dialogue between the soul, the heart, and the unseen. It is a space where intuition leads, where silence speaks, and where the invisible becomes visible through color, texture, and movement.",
    invitation:
      "Each piece is an invitation to slow down, to feel deeply, and to reconnect with something beyond the surface — something timeless that already lives within us.",
    welcome: "Welcome to my world.",
    alt: {
      portrait: "Urška among roses in front of a historic mansion",
      garden: "Urška in a rose garden in front of a historic mansion",
      lookingBack: "Urška looking back toward the mansion garden",
      roses: "Urška among the roses, softly out of focus",
    },
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
    title: "Letters from the studio",
    subtitle:
      "Every Thursday, one letter from Urška: a poem or a short piece of writing, with one painting standing beside it. Quiet post for people who like words that take their time.",
    cta: "Read 7 days free",
    loginPrompt: "Already subscribed?",
    login: "Sign in",
    sampleEyebrow: "This week's letter — free to read",
    sampleNote: "This is the whole letter, exactly as subscribers receive it.",
    lockedTitle: "The rest of the letters",
    lockedText: "Every letter stays in your archive — open whenever you need it, not only the week it arrives.",
    whatTitle: "What arrives",
    what: [
      { icon: "🕊️", title: "A letter every Thursday", text: "One poem or short piece of writing in your inbox — never more than one, never a newsletter." },
      { icon: "🎨", title: "A painting beside the words", text: "Each letter carries one of Urška's paintings, so the words always have something to stand next to." },
      { icon: "📜", title: "The whole archive", text: "Every letter ever sent stays open to you on your own page, to re-read whenever a line comes back to you." },
      { icon: "✉️", title: "You can write back", text: "Reply to any letter and it goes straight to Urška — not to a mailing tool." },
      { icon: "🌱", title: "It keeps the studio going", text: "The subscription pays for canvas, paint and the hours before the paint dries. Nothing is sold to you in the letters." },
    ],
    quotesTitle: "Her words",
    priceTitle: "€4.99 / month",
    priceNote: "First 7 days free · cancel any time with one click",
    formTitle: "Start reading",
    email: "Email",
    password: "Password (at least 8 characters)",
    passwordRepeat: "Repeat password",
    passwordHint: "You'll sign in to your archive with this email and password.",
    mismatch: "The passwords don't match.",
    consent:
      "I agree to the subscription terms. I understand that after the 7-day free trial the subscription renews automatically at €4.99 per month until I cancel, and that the service starts immediately.",
    terms: "Terms",
    submit: "Continue to payment — 7 days free",
    submitting: "Preparing …",
    exists: "An account with this email already exists. Sign in and add the letters from your page.",
    complimentary: "✨ This address reads everything for free. Sign in whenever you like.",
    soon: "The letters open very soon.",
    canceled: "Payment was cancelled — you haven't been charged. You can try again.",
    checkoutError: "Something went wrong with the payment. Please try again or write to us.",
    languageNote: "The letters are written in Slovenian and English — choose which one you'd like to receive when you sign up.",
    faqTitle: "Questions",
    faq: [
      { q: "How often do the letters come?", a: "Once a week, on Thursday. Some weeks there is no letter — then nothing arrives. Your archive keeps everything either way." },
      { q: "Is this the same account as the Star Business Calendar?", a: "Yes. One email and one password for both; you can hold either subscription on its own or both together." },
      { q: "How do I cancel?", a: "One click on your own page. You keep reading until the end of the period you've paid for. Cancel within the first 7 days and you pay nothing." },
      { q: "Can I buy a painting from the letters?", a: "Nothing is sold in the letters. The paintings live in the collection, and that's where they stay." },
    ],
    seePaintings: "See the paintings these words belong to →",
    archiveLink: "My letters",
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
    paintThanSay: "Nekatere stvari je lažje naslikati kot povedati.",
    viewArtwork: "Poglej sliko",
    enter: "Vstopi →",
    enterStory: "Vstopi v zgodbo →",
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
    previous: "Prej\u0161nja slika",
    next: "Naslednja slika",
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
    completeOrder: "Dokon\u010daj naro\u010dilo",
    contactDetails: "Kontaktni podatki",
    orderSummary: "Povzetek naro\u010dila",
    inquiryForm: "Na obrazec za povpra\u0161evanje",
    agreeTail: "in razumem svojo pravico do odstopa, kjer ta velja. Oddaja naro\u010dila pomeni obveznost pla\u010dila.",
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
    regarding: "Glede",
    interestedIn: "Zanima me slika \u201E{title}\u201C. ",
    networkError: "Povezava s strežnikom ni uspela. Poskusi znova.",
  },
  orderStatus: {
    confirmed: "Naročilo potrjeno",
    thankYou: "Hvala.",
    receivedBody:
      "Tvoje naročilo je prispelo. Potrditev po e-pošti je na poti — če je v kratkem ne dobiš, nam piši in bova uredila.",
    paidBody:
      "Tvoje naročilo je prispelo in plačilo je potrjeno. Urška te bo osebno kontaktirala na {email} glede pakiranja in pošiljanja.",
    yourEmail: "naslov, ki si ga vpisal",
    almostThere: "Še malo",
    notConfirmedTitle: "Tega naročila ne moremo potrditi",
    notConfirmedBody:
      "Če si plačilo zaključil, nam piši in priloži potrdilo iz e-pošte, da ga preverimo ročno.",
    backToCollection: "← Nazaj k zbirki",
    backToGallery: "Nazaj v galerijo →",
    notFoundTitle: "Strani ni mogoče najti",
    notFoundBody: "Zgodba, ki jo iščeš, se je morda preselila drugam.",
    backHome: "Nazaj na domačo stran",
  },
  zones: {
    SI: { label: "Slovenija", description: "Dostava po Sloveniji." },
    EU: { label: "Evropska unija", description: "Dostava po Evropski uniji." },
    EUROPE_NON_EU: {
      label: "Evropa (zunaj EU)",
      description:
        "Dostava po Evropi zunaj EU. Glede na državo lahko nastanejo carinski ali uvozni stroški.",
    },
    INTERNATIONAL: {
      label: "Mednarodno (ves svet)",
      description:
        "Dostava po vsem svetu. Glede na državo lahko nastanejo uvozne dajatve, davki ali carinski stroški, ki jih krije prejemnik, razen če je ob plačilu navedeno drugače.",
    },
  },
  about: {
    eyebrow: "O umetnici",
    name: "Urška",
    lead: "Te slike so več kot umetnost — so koščki mojega duha, vtkani v vsako potezo čopiča.",
    remembered:
      "Moja umetnost ni nekaj, kar preprosto ustvarim — je nekaj, česar se spomnim. Morda zato nekatere slike zvenijo kot tihi odmevi nečesa, kar naše duše že poznajo.",
    climbing:
      "Preden sem postala umetnica, sem svoje življenje posvetila plezanju. Kot poklicna tekmovalna plezalka sem imela čast tekmovati na najvišji mednarodni ravni. Na tej poti sem postala evropska prvakinja v balvanih, skupna državna prvakinja v balvanih in hitrostnem plezanju, dobitnica medalje evropskega pokala, mladinska svetovna podprvakinja, skupna zmagovalka evropskega mladinskega pokala in stopila na oder za zmagovalce na Svetovnih obalnih igrah.",
    shaped:
      "Plezanje me je oblikovalo. Naučilo me je discipline, vztrajnosti, prisotnosti in poguma, da zaupam svojim občutkom. Vsaka smer je bila lekcija iz potrpežljivosti, vsak izziv povabilo k rasti. A čeprav je bila ta pot dragocena, me je sčasoma vodila v globlje iskanje — takšno, ki ga zgolj z gibanjem ni bilo mogoče izraziti.",
    today: "Danes to pot izražam skozi umetnost.",
    work:
      "Moje delo je način, kako dam obliko svoji duši. Vsaka slika je odsev čustev, izkušenj in trenutkov, ki jih ni vedno mogoče ubesediti. Tako kot vsaka smer pripoveduje zgodbo, tudi vsaka slika nosi del mojega notranjega sveta.",
    dialogue:
      "Zame je umetnost več kot ustvarjanje nečesa lepega. Je pogovor med dušo, srcem in nevidnim. Je prostor, kjer vodi intuicija, kjer govori tišina in kjer nevidno postane vidno skozi barvo, teksturo in gib.",
    invitation:
      "Vsako delo je povabilo, da se upočasniš, globoko začutiš in se znova povežeš z nečim onkraj površine — z nečim brezčasnim, kar že živi v nas.",
    welcome: "Dobrodošel v mojem svetu.",
    alt: {
      portrait: "Urška med vrtnicami pred zgodovinskim dvorcem",
      garden: "Urška na vrtnicnem vrtu pred zgodovinskim dvorcem",
      lookingBack: "Urška se ozira nazaj proti vrtu dvorca",
      roses: "Urška med vrtnicami, mehko zamegljena",
    },
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
    title: "Pisma iz ateljeja",
    subtitle:
      "Vsak četrtek eno pismo Urške: pesem ali kratko besedilo in ena slika, ki stoji ob njem. Tiha pošta za tiste, ki imajo radi besede, ki si vzamejo čas.",
    cta: "Beri 7 dni brezplačno",
    loginPrompt: "Že naročen?",
    login: "Prijava",
    sampleEyebrow: "Pismo tega tedna — brezplačno za branje",
    sampleNote: "To je celotno pismo, natanko tako, kot ga prejmejo naročniki.",
    lockedTitle: "Ostala pisma",
    lockedText: "Vsako pismo ostane v tvojem arhivu — odprto takrat, ko ga potrebuješ, ne le v tednu, ko prispe.",
    whatTitle: "Kaj prejmeš",
    what: [
      { icon: "🕊️", title: "Pismo vsak četrtek", text: "Ena pesem ali kratko besedilo v tvojem nabiralniku — nikoli več kot eno in nikoli oglasna pošta." },
      { icon: "🎨", title: "Slika ob besedah", text: "Vsako pismo spremlja ena Urškina slika, da imajo besede vedno nekaj, ob čemer stojijo." },
      { icon: "📜", title: "Celoten arhiv", text: "Vsa poslana pisma ostanejo odprta na tvoji strani, da jih prebereš znova, ko se ti kakšna vrstica vrne." },
      { icon: "✉️", title: "Lahko odpišeš", text: "Na vsako pismo lahko odgovoriš in gre naravnost Urški — ne v orodje za pošiljanje." },
      { icon: "🌱", title: "Podpiraš atelje", text: "Naročnina plača platno, barve in ure, preden se barva posuši. V pismih se ti ne prodaja ničesar." },
    ],
    quotesTitle: "Njene besede",
    priceTitle: "4,99 € / mesec",
    priceNote: "Prvih 7 dni brezplačno · odpoveš kadarkoli z enim klikom",
    formTitle: "Začni brati",
    email: "E-naslov",
    password: "Geslo (vsaj 8 znakov)",
    passwordRepeat: "Ponovi geslo",
    passwordHint: "Z e-naslovom in geslom se pozneje prijaviš do svojega arhiva.",
    mismatch: "Gesli se ne ujemata.",
    consent:
      "Strinjam se s pogoji naročnine. Razumem, da se po 7 dneh brezplačnega preizkusa naročnina samodejno podaljšuje za 4,99 € na mesec, dokler je ne odpovem, in da storitev začne teči takoj.",
    terms: "Pogoji",
    submit: "Nadaljuj na plačilo — 7 dni brezplačno",
    submitting: "Pripravljam …",
    exists: "Račun s tem e-naslovom že obstaja. Prijavi se in pisma dodaj na svoji strani.",
    complimentary: "✨ Ta naslov ima vse brezplačno. Prijavi se, kadar želiš.",
    soon: "Pisma se odprejo zelo kmalu.",
    canceled: "Plačilo je bilo prekinjeno — nič ni bilo zaračunano. Poskusiš lahko znova.",
    checkoutError: "Pri plačilu je šlo nekaj narobe. Poskusi znova ali nam piši.",
    languageNote: "Pisma nastajajo v slovenščini in angleščini — ob naročilu izbereš, v katerem jeziku jih želiš prejemati.",
    faqTitle: "Pogosta vprašanja",
    faq: [
      { q: "Kako pogosto prihajajo pisma?", a: "Enkrat na teden, ob četrtkih. Kakšen teden pisma ni — takrat ne prispe nič. Arhiv v vsakem primeru ostane tvoj." },
      { q: "Je to isti račun kot Zvezdni poslovni koledar?", a: "Da. En e-naslov in eno geslo za oboje; naročnino lahko imaš samo eno ali obe hkrati." },
      { q: "Kako odpovem?", a: "Z enim klikom na svoji strani. Bereš do konca obdobja, ki si ga plačal. Če odpoveš v prvih 7 dneh, ne plačaš nič." },
      { q: "Lahko iz pisem kupim sliko?", a: "V pismih se ne prodaja ničesar. Slike živijo v zbirki in tam tudi ostanejo." },
    ],
    seePaintings: "Poglej slike, ki jim te besede pripadajo →",
    archiveLink: "Moja pisma",
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
    paintThanSay: "Neke je stvari lakše naslikati nego reći.",
    viewArtwork: "Pogledaj sliku",
    enter: "Uđi →",
    enterStory: "Uđi u priču →",
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
    previous: "Prethodna slika",
    next: "Sljede\u0107a slika",
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
    completeOrder: "Dovr\u0161i narud\u017ebu",
    contactDetails: "Podaci za kontakt",
    orderSummary: "Sa\u017eetak narud\u017ebe",
    inquiryForm: "Na obrazac za upit",
    agreeTail: "i razumijem svoje pravo na odustanak, gdje se primjenjuje. Slanje narud\u017ebe stvara obvezu pla\u0107anja.",
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
    regarding: "Vezano uz",
    interestedIn: "Zanima me slika \u201E{title}\u201D. ",
    networkError: "Povezivanje s poslužiteljem nije uspjelo. Pokušaj ponovno.",
  },
  orderStatus: {
    confirmed: "Narudžba potvrđena",
    thankYou: "Hvala.",
    receivedBody:
      "Tvoja narudžba je stigla. Potvrda e-poštom je na putu — ako uskoro ne stigne, javi nam se i sve ćemo riješiti.",
    paidBody:
      "Tvoja narudžba je stigla i plaćanje je potvrđeno. Urška će ti se osobno javiti na {email} radi pakiranja i slanja.",
    yourEmail: "adresu koju si upisao",
    almostThere: "Još malo",
    notConfirmedTitle: "Ovu narudžbu ne možemo potvrditi",
    notConfirmedBody:
      "Ako si dovršio plaćanje, piši nam i priloži potvrdu iz e-pošte da je provjerimo ručno.",
    backToCollection: "← Natrag na zbirku",
    backToGallery: "Natrag u galeriju →",
    notFoundTitle: "Stranica nije pronađena",
    notFoundBody: "Priča koju tražiš možda se preselila drugamo.",
    backHome: "Natrag na početnu",
  },
  zones: {
    SI: { label: "Slovenija", description: "Dostava unutar Slovenije." },
    EU: { label: "Europska unija", description: "Dostava unutar Europske unije." },
    EUROPE_NON_EU: {
      label: "Europa (izvan EU)",
      description:
        "Dostava unutar Europe, izvan EU. Ovisno o odredištu mogu nastati carinski ili uvozni troškovi.",
    },
    INTERNATIONAL: {
      label: "Međunarodno (cijeli svijet)",
      description:
        "Dostava u cijeli svijet. Ovisno o odredištu mogu nastati uvozne pristojbe, porezi ili carinski troškovi, koje snosi primatelj, osim ako pri plaćanju nije navedeno drukčije.",
    },
  },
  about: {
    eyebrow: "O umjetnici",
    name: "Urška",
    lead: "Ove slike su više od umjetnosti — one su djelići mog duha, utkani u svaki potez kista.",
    remembered:
      "Moja umjetnost nije nešto što jednostavno stvorim — ona je nešto čega se sjetim. Možda zato neke slike zvuče kao tihi odjeci nečega što naše duše već poznaju.",
    climbing:
      "Prije nego što sam postala umjetnica, život sam posvetila penjanju. Kao profesionalna natjecateljska penjačica imala sam čast natjecati se na najvišoj međunarodnoj razini. Na tom putu postala sam europska prvakinja u boulderingu, ukupna državna prvakinja u boulderingu i brzinskom penjanju, osvajačica medalje europskog kupa, juniorska svjetska doprvakinja, ukupna pobjednica europskog juniorskog kupa i stala na postolje na Svjetskim obalnim igrama.",
    shaped:
      "Penjanje me oblikovalo. Naučilo me disciplini, otpornosti, prisutnosti i hrabrosti da vjerujem svojim instinktima. Svaki smjer bio je lekcija iz ustrajnosti, svaki izazov poziv na rast. No koliko god je taj put bio vrijedan, na kraju me odveo u dublju potragu — onu koju samo pokretom nije bilo moguće izraziti.",
    today: "Danas taj put izražavam kroz umjetnost.",
    work:
      "Moj rad je način da dam oblik svojoj duši. Svaka slika odraz je emocija, iskustava i trenutaka koje nije uvijek moguće izreći riječima. Kao što svaki uspon priča priču, tako i svaka slika nosi dio mog unutarnjeg svijeta.",
    dialogue:
      "Za mene je umjetnost više od stvaranja nečega lijepog. Ona je razgovor između duše, srca i neviđenog. Prostor je u kojem vodi intuicija, u kojem govori tišina i u kojem nevidljivo postaje vidljivo kroz boju, teksturu i pokret.",
    invitation:
      "Svako je djelo poziv da usporiš, duboko osjetiš i ponovno se povežeš s nečim onkraj površine — s nečim bezvremenskim što već živi u nama.",
    welcome: "Dobro došao u moj svijet.",
    alt: {
      portrait: "Urška među ružama ispred povijesnog dvorca",
      garden: "Urška u ružičnjaku ispred povijesnog dvorca",
      lookingBack: "Urška se osvrće prema vrtu dvorca",
      roses: "Urška među ružama, meko zamućena",
    },
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
    title: "Pisma iz ateljea",
    subtitle:
      "Svakog četvrtka jedno pismo od Urške: pjesma ili kratki tekst i jedna slika koja stoji uz njega. Tiha pošta za one koji vole riječi koje si uzimaju vremena.",
    cta: "Čitaj 7 dana besplatno",
    loginPrompt: "Već si pretplaćen?",
    login: "Prijava",
    sampleEyebrow: "Ovotjedno pismo — besplatno za čitanje",
    sampleNote: "Ovo je cijelo pismo, točno onakvo kakvo primaju pretplatnici.",
    lockedTitle: "Ostala pisma",
    lockedText: "Svako pismo ostaje u tvojoj arhivi — otvoreno kad ti zatreba, ne samo u tjednu kad stigne.",
    whatTitle: "Što stiže",
    what: [
      { icon: "🕊️", title: "Pismo svakog četvrtka", text: "Jedna pjesma ili kratki tekst u tvom sandučiću — nikad više od jednog i nikad reklamna pošta." },
      { icon: "🎨", title: "Slika uz riječi", text: "Svako pismo prati jedna Urškina slika, da riječi uvijek imaju uz što stajati." },
      { icon: "📜", title: "Cijela arhiva", text: "Sva poslana pisma ostaju ti otvorena na tvojoj stranici, da ih pročitaš ponovno kad ti se neki redak vrati." },
      { icon: "✉️", title: "Možeš odgovoriti", text: "Na svako pismo možeš odgovoriti i ide ravno Urški — ne u alat za slanje pošte." },
      { icon: "🌱", title: "Podupireš atelje", text: "Pretplata plaća platno, boje i sate prije nego se boja osuši. U pismima ti se ništa ne prodaje." },
    ],
    quotesTitle: "Njezine riječi",
    priceTitle: "4,99 € / mjesec",
    priceNote: "Prvih 7 dana besplatno · otkazuješ bilo kada jednim klikom",
    formTitle: "Počni čitati",
    email: "E-adresa",
    password: "Lozinka (najmanje 8 znakova)",
    passwordRepeat: "Ponovi lozinku",
    passwordHint: "S ovom e-adresom i lozinkom poslije se prijavljuješ u svoju arhivu.",
    mismatch: "Lozinke se ne podudaraju.",
    consent:
      "Slažem se s uvjetima pretplate. Razumijem da se nakon 7 dana besplatnog probnog razdoblja pretplata automatski obnavlja za 4,99 € mjesečno dok je ne otkažem i da usluga počinje odmah.",
    terms: "Uvjeti",
    submit: "Nastavi na plaćanje — 7 dana besplatno",
    submitting: "Pripremam …",
    exists: "Račun s ovom e-adresom već postoji. Prijavi se i dodaj pisma na svojoj stranici.",
    complimentary: "✨ Ova adresa sve čita besplatno. Prijavi se kad god želiš.",
    soon: "Pisma se otvaraju vrlo brzo.",
    canceled: "Plaćanje je prekinuto — ništa nije naplaćeno. Možeš pokušati ponovno.",
    checkoutError: "Nešto je pošlo po zlu s plaćanjem. Pokušaj ponovno ili nam piši.",
    languageNote: "Pisma nastaju na slovenskom i engleskom — pri pretplati biraš na kojem ih jeziku želiš primati.",
    faqTitle: "Česta pitanja",
    faq: [
      { q: "Koliko često stižu pisma?", a: "Jednom tjedno, četvrtkom. Pokojeg tjedna pisma nema — tada ne stigne ništa. Arhiva u svakom slučaju ostaje tvoja." },
      { q: "Je li to isti račun kao Zvjezdani poslovni kalendar?", a: "Da. Jedna e-adresa i jedna lozinka za oboje; možeš imati samo jednu pretplatu ili obje zajedno." },
      { q: "Kako otkazujem?", a: "Jednim klikom na svojoj stranici. Čitaš do kraja razdoblja koje si platio. Otkažeš li u prvih 7 dana, ne plaćaš ništa." },
      { q: "Mogu li iz pisama kupiti sliku?", a: "U pismima se ništa ne prodaje. Slike žive u zbirci i ondje i ostaju." },
    ],
    seePaintings: "Pogledaj slike kojima te riječi pripadaju →",
    archiveLink: "Moja pisma",
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
    paintThanSay: "Manches lässt sich leichter malen als sagen.",
    viewArtwork: "Bild ansehen",
    enter: "Eintreten →",
    enterStory: "In die Geschichte →",
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
    previous: "Vorheriges Bild",
    next: "N\u00e4chstes Bild",
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
    completeOrder: "Bestellung abschlie\u00dfen",
    contactDetails: "Kontaktdaten",
    orderSummary: "Bestell\u00fcbersicht",
    inquiryForm: "Zum Anfrageformular",
    agreeTail: "und verstehe mein Widerrufsrecht, soweit es gilt. Mit dieser Bestellung entsteht eine Zahlungspflicht.",
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
    regarding: "Betrifft",
    interestedIn: "Ich interessiere mich f\u00fcr \u201E{title}\u201C. ",
    networkError: "Der Server war nicht erreichbar. Bitte versuche es erneut.",
  },
  orderStatus: {
    confirmed: "Bestellung bestätigt",
    thankYou: "Danke.",
    receivedBody:
      "Deine Bestellung ist angekommen. Eine Bestätigung per E-Mail ist unterwegs — falls sie nicht bald eintrifft, melde dich, und wir bringen das in Ordnung.",
    paidBody:
      "Deine Bestellung ist angekommen und die Zahlung ist bestätigt. Urška meldet sich persönlich unter {email}, um Verpackung und Versand zu besprechen.",
    yourEmail: "der angegebenen Adresse",
    almostThere: "Fast geschafft",
    notConfirmedTitle: "Diese Bestellung konnten wir nicht bestätigen",
    notConfirmedBody:
      "Wenn du die Zahlung abgeschlossen hast, schreib uns bitte mit deiner Bestätigungs-E-Mail, damit wir sie von Hand prüfen können.",
    backToCollection: "← Zurück zur Sammlung",
    backToGallery: "Zurück zur Galerie →",
    notFoundTitle: "Seite nicht gefunden",
    notFoundBody: "Die Geschichte, die du suchst, ist vielleicht umgezogen.",
    backHome: "Zur Startseite",
  },
  zones: {
    SI: { label: "Slowenien", description: "Lieferung innerhalb Sloweniens." },
    EU: { label: "Europäische Union", description: "Lieferung innerhalb der Europäischen Union." },
    EUROPE_NON_EU: {
      label: "Europa (außerhalb der EU)",
      description:
        "Lieferung innerhalb Europas, außerhalb der EU. Je nach Zielland können Zoll- oder Einfuhrgebühren anfallen.",
    },
    INTERNATIONAL: {
      label: "International (weltweit)",
      description:
        "Weltweite Lieferung. Je nach Zielland können Einfuhrabgaben, Steuern oder Zollgebühren anfallen; sie trägt die empfangende Person, sofern beim Bezahlen nichts anderes angegeben ist.",
    },
  },
  about: {
    eyebrow: "Über die Künstlerin",
    name: "Urška",
    lead: "Diese Bilder sind mehr als Kunst — sie sind Stücke meines Geistes, in jeden Pinselstrich gewoben.",
    remembered:
      "Meine Kunst ist nicht einfach etwas, das ich erschaffe — sie ist etwas, an das ich mich erinnere. Vielleicht klingen manche Bilder deshalb wie leise Echos von etwas, das unsere Seelen längst kennen.",
    climbing:
      "Bevor ich Künstlerin wurde, widmete ich mein Leben dem Klettern. Als professionelle Wettkampfkletterin hatte ich die Ehre, auf höchstem internationalem Niveau anzutreten. Auf diesem Weg wurde ich Europameisterin im Bouldern, Gesamt-Staatsmeisterin im Bouldern und im Speedklettern, Europacup-Medaillengewinnerin, Junioren-Vizeweltmeisterin, Gesamtsiegerin des Junioren-Europacups und stand bei den World Beach Games auf dem Podium.",
    shaped:
      "Das Klettern hat mich geprägt. Es lehrte mich Disziplin, Widerstandskraft, Gegenwärtigkeit und den Mut, meinem Gefühl zu vertrauen. Jede Route war eine Lektion in Ausdauer, jede Schwierigkeit eine Einladung zu wachsen. So wertvoll dieser Weg war, führte er mich schließlich in eine tiefere Suche — eine, die sich durch Bewegung allein nicht ausdrücken ließ.",
    today: "Heute drücke ich diesen Weg durch Kunst aus.",
    work:
      "Meine Arbeit ist eine Art, meiner Seele Gestalt zu geben. Jedes Bild ist ein Spiegel von Gefühlen, Erfahrungen und Momenten, die sich nicht immer in Worte fassen lassen. So wie jede Kletterroute eine Geschichte erzählt, trägt jedes Bild ein Stück meiner inneren Welt.",
    dialogue:
      "Kunst ist für mich mehr, als etwas Schönes zu schaffen. Sie ist ein Gespräch zwischen der Seele, dem Herzen und dem Ungesehenen. Ein Raum, in dem die Intuition führt, in dem die Stille spricht und in dem das Unsichtbare durch Farbe, Textur und Bewegung sichtbar wird.",
    invitation:
      "Jedes Werk ist eine Einladung, langsamer zu werden, tief zu fühlen und sich wieder mit etwas jenseits der Oberfläche zu verbinden — mit etwas Zeitlosem, das schon in uns lebt.",
    welcome: "Willkommen in meiner Welt.",
    alt: {
      portrait: "Urška zwischen Rosen vor einem historischen Herrenhaus",
      garden: "Urška in einem Rosengarten vor einem historischen Herrenhaus",
      lookingBack: "Urška blickt zurück zum Garten des Herrenhauses",
      roses: "Urška zwischen den Rosen, weich unscharf",
    },
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
    title: "Briefe aus dem Atelier",
    subtitle:
      "Jeden Donnerstag ein Brief von Urška: ein Gedicht oder ein kurzer Text, und ein Bild, das daneben steht. Stille Post für alle, die Worte mögen, die sich Zeit lassen.",
    cta: "7 Tage kostenlos lesen",
    loginPrompt: "Schon abonniert?",
    login: "Anmelden",
    sampleEyebrow: "Der Brief dieser Woche — frei zu lesen",
    sampleNote: "Das ist der ganze Brief, genau so, wie ihn die Abonnentinnen und Abonnenten bekommen.",
    lockedTitle: "Die übrigen Briefe",
    lockedText: "Jeder Brief bleibt in deinem Archiv — offen, wann immer du ihn brauchst, nicht nur in der Woche, in der er ankommt.",
    whatTitle: "Was ankommt",
    what: [
      { icon: "🕊️", title: "Ein Brief jeden Donnerstag", text: "Ein Gedicht oder ein kurzer Text in deinem Postfach — nie mehr als einer und nie Werbung." },
      { icon: "🎨", title: "Ein Bild neben den Worten", text: "Zu jedem Brief gehört eines von Urškas Bildern, damit die Worte immer etwas haben, woneben sie stehen." },
      { icon: "📜", title: "Das ganze Archiv", text: "Alle je verschickten Briefe bleiben auf deiner Seite offen — zum Wiederlesen, wenn eine Zeile zurückkommt." },
      { icon: "✉️", title: "Du kannst antworten", text: "Antworte auf jeden Brief, und er geht direkt an Urška — nicht an ein Versandwerkzeug." },
      { icon: "🌱", title: "Es trägt das Atelier", text: "Das Abo bezahlt Leinwand, Farbe und die Stunden, bevor die Farbe trocknet. In den Briefen wird dir nichts verkauft." },
    ],
    quotesTitle: "Ihre Worte",
    priceTitle: "4,99 € / Monat",
    priceNote: "Die ersten 7 Tage kostenlos · jederzeit mit einem Klick kündbar",
    formTitle: "Zu lesen beginnen",
    email: "E-Mail",
    password: "Passwort (mindestens 8 Zeichen)",
    passwordRepeat: "Passwort wiederholen",
    passwordHint: "Mit dieser E-Mail und diesem Passwort meldest du dich später in deinem Archiv an.",
    mismatch: "Die Passwörter stimmen nicht überein.",
    consent:
      "Ich stimme den Abo-Bedingungen zu. Mir ist bewusst, dass sich das Abo nach den 7 kostenlosen Tagen automatisch für 4,99 € pro Monat verlängert, bis ich kündige, und dass die Leistung sofort beginnt.",
    terms: "Bedingungen",
    submit: "Weiter zur Zahlung — 7 Tage kostenlos",
    submitting: "Einen Moment …",
    exists: "Ein Konto mit dieser E-Mail existiert bereits. Melde dich an und füge die Briefe auf deiner Seite hinzu.",
    complimentary: "✨ Diese Adresse liest alles kostenlos. Melde dich an, wann du magst.",
    soon: "Die Briefe öffnen sehr bald.",
    canceled: "Die Zahlung wurde abgebrochen — es wurde nichts berechnet. Du kannst es erneut versuchen.",
    checkoutError: "Bei der Zahlung ist etwas schiefgegangen. Bitte versuche es erneut oder schreib uns.",
    languageNote: "Die Briefe entstehen auf Slowenisch und Englisch — bei der Anmeldung wählst du, in welcher Sprache du sie bekommst.",
    faqTitle: "Fragen",
    faq: [
      { q: "Wie oft kommen die Briefe?", a: "Einmal pro Woche, donnerstags. In manchen Wochen gibt es keinen Brief — dann kommt nichts. Dein Archiv bleibt so oder so." },
      { q: "Ist das dasselbe Konto wie beim Sternen-Geschäftskalender?", a: "Ja. Eine E-Mail, ein Passwort für beides; du kannst ein Abo allein oder beide zusammen haben." },
      { q: "Wie kündige ich?", a: "Mit einem Klick auf deiner Seite. Du liest bis zum Ende des bezahlten Zeitraums. Kündigst du in den ersten 7 Tagen, zahlst du nichts." },
      { q: "Kann ich aus den Briefen ein Bild kaufen?", a: "In den Briefen wird nichts verkauft. Die Bilder leben in der Sammlung und bleiben dort." },
    ],
    seePaintings: "Sieh die Bilder, zu denen diese Worte gehören →",
    archiveLink: "Meine Briefe",
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
    paintThanSay: "Certe cose è più facile dipingerle che dirle.",
    viewArtwork: "Guarda il dipinto",
    enter: "Entra →",
    enterStory: "Entra nella storia →",
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
    previous: "Dipinto precedente",
    next: "Dipinto successivo",
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
    completeOrder: "Completa l\u2019ordine",
    contactDetails: "Dati di contatto",
    orderSummary: "Riepilogo dell\u2019ordine",
    inquiryForm: "Vai al modulo di richiesta",
    agreeTail: "e comprendo il mio diritto di recesso, ove applicabile. L\u2019invio dell\u2019ordine comporta l\u2019obbligo di pagamento.",
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
    regarding: "Riguardo a",
    interestedIn: "Mi interessa \u201C{title}\u201D. ",
    networkError: "Impossibile raggiungere il server. Riprova.",
  },
  orderStatus: {
    confirmed: "Ordine confermato",
    thankYou: "Grazie.",
    receivedBody:
      "Il tuo ordine è arrivato. La conferma via email è in viaggio — se non arriva a breve, scrivici e sistemiamo tutto.",
    paidBody:
      "Il tuo ordine è arrivato e il pagamento è confermato. Urška ti scriverà personalmente a {email} per concordare imballaggio e spedizione.",
    yourEmail: "l'indirizzo che ci hai dato",
    almostThere: "Ci siamo quasi",
    notConfirmedTitle: "Non siamo riusciti a confermare questo ordine",
    notConfirmedBody:
      "Se hai completato il pagamento, scrivici allegando l'email di conferma così lo verifichiamo a mano.",
    backToCollection: "← Torna alla collezione",
    backToGallery: "Torna alla galleria →",
    notFoundTitle: "Pagina non trovata",
    notFoundBody: "La storia che cerchi potrebbe essersi spostata altrove.",
    backHome: "Torna alla home",
  },
  zones: {
    SI: { label: "Slovenia", description: "Consegna in Slovenia." },
    EU: { label: "Unione Europea", description: "Consegna nell'Unione Europea." },
    EUROPE_NON_EU: {
      label: "Europa (fuori dall'UE)",
      description:
        "Consegna in Europa, fuori dall'UE. A seconda della destinazione possono applicarsi dazi doganali o oneri di importazione.",
    },
    INTERNATIONAL: {
      label: "Internazionale (tutto il mondo)",
      description:
        "Consegna in tutto il mondo. A seconda della destinazione possono applicarsi dazi, imposte od oneri doganali, a carico di chi riceve, salvo diversa indicazione al momento del pagamento.",
    },
  },
  about: {
    eyebrow: "Sull'artista",
    name: "Urška",
    lead: "Questi dipinti sono più che arte — sono pezzi del mio spirito, intrecciati in ogni pennellata.",
    remembered:
      "La mia arte non è semplicemente qualcosa che creo — è qualcosa che ricordo. Forse per questo certi dipinti suonano come echi silenziosi di qualcosa che le nostre anime già conoscono.",
    climbing:
      "Prima di diventare artista ho dedicato la mia vita all'arrampicata. Come arrampicatrice agonistica professionista ho avuto l'onore di gareggiare ai massimi livelli internazionali. Lungo quel cammino sono diventata campionessa europea di boulder, campionessa nazionale assoluta di boulder e di velocità, medaglia di Coppa Europa, vicecampionessa mondiale giovanile, vincitrice assoluta della Coppa Europa giovanile e sono salita sul podio ai World Beach Games.",
    shaped:
      "L'arrampicata mi ha formata. Mi ha insegnato la disciplina, la tenacia, la presenza e il coraggio di fidarmi del mio istinto. Ogni via era una lezione di perseveranza, ogni difficoltà un invito a crescere. Ma per quanto quel percorso fosse prezioso, mi ha portata infine a una ricerca più profonda — una ricerca che il solo movimento non poteva esprimere.",
    today: "Oggi esprimo quel percorso attraverso l'arte.",
    work:
      "Il mio lavoro è un modo di dare forma alla mia anima. Ogni dipinto riflette emozioni, esperienze e momenti che non sempre si possono mettere in parole. Come ogni salita racconta una storia, ogni opera porta con sé una parte del mio mondo interiore.",
    dialogue:
      "Per me l'arte è più che creare qualcosa di bello. È un dialogo tra l'anima, il cuore e l'invisibile. È uno spazio in cui guida l'intuizione, in cui parla il silenzio e in cui l'invisibile diventa visibile attraverso colore, materia e movimento.",
    invitation:
      "Ogni opera è un invito a rallentare, a sentire in profondità e a ricollegarsi a qualcosa oltre la superficie — a qualcosa di senza tempo che vive già in noi.",
    welcome: "Benvenuto nel mio mondo.",
    alt: {
      portrait: "Urška tra le rose davanti a una dimora storica",
      garden: "Urška in un roseto davanti a una dimora storica",
      lookingBack: "Urška si volta verso il giardino della dimora",
      roses: "Urška tra le rose, leggermente sfocata",
    },
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
    title: "Lettere dallo studio",
    subtitle:
      "Ogni giovedì una lettera di Urška: una poesia o un breve testo, con accanto un dipinto. Posta silenziosa per chi ama le parole che si prendono il loro tempo.",
    cta: "Leggi 7 giorni gratis",
    loginPrompt: "Sei già abbonato?",
    login: "Accedi",
    sampleEyebrow: "La lettera di questa settimana — libera da leggere",
    sampleNote: "Questa è la lettera intera, esattamente come la ricevono gli abbonati.",
    lockedTitle: "Le altre lettere",
    lockedText: "Ogni lettera resta nel tuo archivio — aperta quando ti serve, non solo nella settimana in cui arriva.",
    whatTitle: "Cosa arriva",
    what: [
      { icon: "🕊️", title: "Una lettera ogni giovedì", text: "Una poesia o un breve testo nella tua casella — mai più di una e mai pubblicità." },
      { icon: "🎨", title: "Un dipinto accanto alle parole", text: "Ogni lettera porta con sé un dipinto di Urška, così le parole hanno sempre accanto qualcosa." },
      { icon: "📜", title: "Tutto l'archivio", text: "Tutte le lettere inviate restano aperte sulla tua pagina, da rileggere quando un verso ti torna in mente." },
      { icon: "✉️", title: "Puoi rispondere", text: "Rispondi a qualsiasi lettera e arriva direttamente a Urška — non a uno strumento di invio." },
      { icon: "🌱", title: "Sostiene lo studio", text: "L'abbonamento paga la tela, i colori e le ore prima che il colore asciughi. Nelle lettere non ti si vende nulla." },
    ],
    quotesTitle: "Le sue parole",
    priceTitle: "4,99 € / mese",
    priceNote: "I primi 7 giorni gratis · disdici quando vuoi con un clic",
    formTitle: "Inizia a leggere",
    email: "Email",
    password: "Password (almeno 8 caratteri)",
    passwordRepeat: "Ripeti la password",
    passwordHint: "Con questa email e questa password accederai poi al tuo archivio.",
    mismatch: "Le password non coincidono.",
    consent:
      "Accetto le condizioni dell'abbonamento. Ho compreso che dopo i 7 giorni di prova gratuita l'abbonamento si rinnova automaticamente a 4,99 € al mese finché non lo disdico, e che il servizio inizia subito.",
    terms: "Condizioni",
    submit: "Continua al pagamento — 7 giorni gratis",
    submitting: "Un momento …",
    exists: "Esiste già un account con questa email. Accedi e aggiungi le lettere dalla tua pagina.",
    complimentary: "✨ Questo indirizzo legge tutto gratuitamente. Accedi quando vuoi.",
    soon: "Le lettere aprono molto presto.",
    canceled: "Il pagamento è stato annullato — non ti è stato addebitato nulla. Puoi riprovare.",
    checkoutError: "Qualcosa è andato storto con il pagamento. Riprova o scrivici.",
    languageNote: "Le lettere nascono in sloveno e in inglese — al momento dell'abbonamento scegli in quale lingua riceverle.",
    faqTitle: "Domande",
    faq: [
      { q: "Ogni quanto arrivano le lettere?", a: "Una volta a settimana, il giovedì. Qualche settimana non c'è lettera — allora non arriva nulla. L'archivio resta tuo in ogni caso." },
      { q: "È lo stesso account del Calendario stellare d'affari?", a: "Sì. Una email e una password per entrambi; puoi avere un solo abbonamento o tutti e due." },
      { q: "Come disdico?", a: "Con un clic sulla tua pagina. Leggi fino alla fine del periodo pagato. Se disdici entro i primi 7 giorni non paghi nulla." },
      { q: "Posso comprare un dipinto dalle lettere?", a: "Nelle lettere non si vende nulla. I dipinti vivono nella collezione e lì restano." },
    ],
    seePaintings: "Guarda i dipinti a cui appartengono queste parole →",
    archiveLink: "Le mie lettere",
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
