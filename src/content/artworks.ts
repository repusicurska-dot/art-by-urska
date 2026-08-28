import { Artwork } from "./types";

// AI-drafted, at Urška's explicit request ("imagine how she felt while painting
// this, make it spiritual") — NOT her verbatim words like the poems above. Meant
// as a starting draft for her to rewrite in her own voice, or approve as-is.
// Deliberately echoes the "soul recognizes soul" language from her own
// "Backgrounds and me.docx" so this ties into the future Spirituality section.
// "Meaning"/"For the collector" beats below are the same kind of draft.
const BLOSSOMING_LOVE_NOTE =
  "I painted this one slowly, over many quiet evenings, because I didn't want to rush a love that has already waited lifetimes. Every layer of purple and gold felt less like paint and more like memory — as if my hand already knew this embrace before I did. I don't think love like this begins when two people meet. I think it just remembers itself.";

const THE_PROPHECY_NOTE =
  "This canvas came from a restless place in me — a night I felt very small and very afraid, and needed to paint my way back to courage. The dragon isn't the danger here; it's what stays beside you once you finally kneel and face what frightens you. I painted the lightning last, in a single breath, because that's how courage usually arrives — all at once, and only after you've already decided to stand.";

const ETERNAL_LOVE_NOTE =
  "I kept returning to blue for this one — the color of something that doesn't ask to be noticed, only trusted. While I painted the rose, I kept thinking about the difference between loving someone and choosing them again, deliberately, after everything. This piece is my answer to that. It isn't about the crown or the kingdom. It's about the choosing.";

const BIRDS_OF_LIGHT_NOTE =
  "Some paintings ask for control, and this one asked for the opposite — I had to let the brush move faster than my thinking, the way birds move faster than doubt. I made it after a difficult season, when I needed proof that darkness doesn't get the last word. These aren't just birds to me. They're every quiet hope I was too tired to say out loud, given wings instead.";

const SOMEHOW_MY_HEART_NOTE =
  "There's a kind of recognition that has nothing to do with memory in the ordinary sense — you meet someone and some older part of you already knows their face. I painted the two colors close but never quite touching, to hold that exact moment before recognition becomes certainty. I don't fully understand where paintings like this come from. I just try to stay quiet enough to let them through.";

const BLOSSOMING_LOVE_MEANING =
  "This piece means, to me, that love isn't something we build from nothing — it's something we recognize. Every time I added another rose, another star, I was really asking myself what stays the same in someone across a hundred different versions of a life.";
const BLOSSOMING_LOVE_COLLECTOR =
  "For anyone who has loved the same person through more than one season of their own life — through change, distance, or simply time — and found that the feeling never actually left.";

const THE_PROPHECY_MEANING =
  "I don't see the dragon as the danger here, and I never did while painting it. It's closer to an old fear finally standing where you can look at it directly. The prophecy isn't really about darkness ending — it's about the moment you stop waiting for someone else to be brave first.";
const THE_PROPHECY_COLLECTOR =
  "For someone standing at the edge of their own hard decision, who needs a reminder that courage rarely feels dramatic from the inside — it just feels like finally kneeling down and starting.";

const ETERNAL_LOVE_MEANING =
  "The blue in this piece is deliberate — the color of loyalty that doesn't need proving. To me, this painting is less about a knight and more about the quiet decision to keep choosing someone, long after the initial spark alone could explain it.";
const ETERNAL_LOVE_COLLECTOR =
  "For a couple who has already weathered something together, or for anyone who believes real love is a daily choice more than a single, dramatic moment.";

const BIRDS_OF_LIGHT_MEANING =
  "I painted these birds while trying to relearn how to hope without needing proof first. They aren't flying toward anything specific in the piece — they're just flying, which felt like the whole point. Hope doesn't wait for a guarantee.";
const BIRDS_OF_LIGHT_COLLECTOR =
  "For anyone coming out of a hard year who wants a small, daily reminder in their home that light returns — usually quietly, and usually before you feel ready for it.";

const SOMEHOW_MY_HEART_MEANING =
  "This one is about the kind of familiarity that has no explanation — meeting someone and feeling like you're mid-conversation with them, not starting one. I don't fully know if I believe in past lives, but I believe in that feeling, and I trust it more than most things I can explain.";
const SOMEHOW_MY_HEART_COLLECTOR =
  "For someone who has felt that instant, wordless recognition with another person, and has always wanted a quiet way to hold onto it.";

// Sourced verbatim from Urška's own Word documents in the project folder — her
// real words for all 5 flagship pieces. Re-sync by hand if she revises those
// files. Two more of her docs ("ANGEL OF LIGHT", "ENCHANTED SWAN") are marked
// "NOT AVAILABLE" by her with no poem text yet, so they aren't used here.
const BLOSSOMING_LOVE_POEM = `For love like ours
does not belong to one lifetime.
It blooms again and again,
like a rose returning each spring,
more beautiful than before,
its fragrance carried through eternity.

In a thousand different lifetimes,
I would choose you.

In a thousand different worlds,
I would love you.

And if forever were not enough,
I would ask eternity
for just one more lifetime—
only to find you again,
place a single red rose in your hands,
and whisper,

"My love, I have been searching for you
since the beginning of time."`;

const ETERNAL_LOVE_POEM = `In a thousand different lifetimes,
beneath a thousand different skies,
I would still search for you.

I would find you
where the first rose awakens to the morning,
its beauty untouched by time—
for no flower has ever bloomed
as beautifully as your soul.

If fate made me a king,
I would lay every crown at your feet.
If it made me a wanderer,
I would cross every sea and every shadow
just to hold your hand for a single moment.

The stars may forget their places,
the moon may lose her light,
and centuries may turn kingdoms into dust,
but my heart would remember yours.`;

const THE_PROPHECY_POEM = `When darkness consumes the land,
the final knight shall rise.

With lightning tearing through the sky,
he will face the shadows without fear.

His sword shall burn with light,
his heart with courage.

For darkness may be ancient,
but bravery is stronger.

And when the knight stands against the night,
the light shall rise with him—
and the prophecy shall end.`;

const BIRDS_OF_LIGHT_POEM = `Birds of light drift through the sky,
with golden wings held open wide.
They carry dreams on winds of gold,
and stories that the stars have told.

Above the shadows, soft and bright,
they turn the darkness into light.
Their golden feathers softly gleam,
like fragments of a beautiful dream.`;

const SOMEHOW_MY_HEART_POEM = `In another life, we loved beneath the stars,
two souls together, never truly apart.
Time may have changed the path we knew,
but somehow, my heart still remembers you.

Perhaps past lives leave traces behind—
a familiar soul, a love we cannot define.
And if we meet again when this life is through,
maybe I'll remember
why I always found my way to you.`;

const ALL_ZONES: Artwork["shipsTo"] = ["SI", "EU", "EUROPE_NON_EU", "INTERNATIONAL"];

/**
 * Exactly 5 flagship artworks, all using Urška's real titles and poems
 * (sourced from her Word docs — see note above the poem constants). Their
 * "Meaning" / "For the collector" beats and artist's notes are AI-drafted at
 * her request (see note above) — real content, but not her verbatim words,
 * pending her review. Specs (medium/dimensions/year/price/etc.) are still
 * bracketed placeholders — do not invent that content. Prices are
 * demo/provisional values used to exercise the cart → checkout flow; see
 * `priceConfirmed`.
 */
export const artworks: Artwork[] = [
  {
    slug: "artwork-01",
    order: 1,
    layout: "fullscreen-reveal",
    title: "Blossoming Love",
    quote: "In a thousand different lifetimes, I would choose you.",
    shortIntro: "A love that returns, season after season, like a rose that blooms again.",
    storyBeats: [
      {
        heading: "Her words",
        text: BLOSSOMING_LOVE_POEM,
        image: "/images/blossoming-love-story-1.jpg",
        imageAlt: "Urška holding the finished 'Blossoming Love' canvas",
      },
      {
        heading: "Meaning",
        text: BLOSSOMING_LOVE_MEANING,
        image: "/images/blossoming-love-story-2.jpg",
        imageAlt: "'Blossoming Love' held up against the castle gates",
      },
      { heading: "For the collector", text: BLOSSOMING_LOVE_COLLECTOR },
    ],
    artistNote: BLOSSOMING_LOVE_NOTE,
    heroImage: "/images/blossoming-love.jpg",
    heroImageAlt:
      "Photograph of an original painting by Urška depicting a couple embracing beneath a canopy of falling stars, one holding a red rose, over a rose-patterned ground.",
    detailImages: [
      {
        src: "/images/blossoming-love-holding.jpg",
        alt: "Urška holding the finished 'Blossoming Love' canvas outdoors",
        label: "In the artist's hands",
      },
    ],
    accentColor: "#4A4A4A",
    year: 2023,
    medium: "Acrylic on canvas",
    dimensions: "35 × 45 cm",
    editionType: "original",
    certificateOfAuthenticity: true,
    framed: false,
    price: 1111,
    currency: "EUR",
    priceConfirmed: true,
    vatNote: "[VAT TREATMENT TO BE CONFIRMED]",
    availability: "available",
    sku: "AU-ART-01",
    dispatchTime: "[DISPATCH TIME PENDING]",
    shipsTo: ALL_ZONES,
    careInfo: "[CARE INFORMATION PENDING]",
  },
  {
    slug: "artwork-02",
    order: 2,
    layout: "split",
    title: "The Prophecy",
    quote: "When darkness consumes the land, the final knight shall rise.",
    shortIntro: "A knight kneels before a great dragon as lightning bridges his sword to a glowing beacon.",
    storyBeats: [
      { heading: "Her words", text: THE_PROPHECY_POEM },
      { heading: "Meaning", text: THE_PROPHECY_MEANING },
      { heading: "For the collector", text: THE_PROPHECY_COLLECTOR },
    ],
    artistNote: THE_PROPHECY_NOTE,
    heroImage: "/images/the-prophecy.jpg",
    heroImageAlt:
      "Photograph of an original painting by Urška depicting a large pale dragon coiled protectively above a kneeling knight, connected by a bolt of lightning running from a glowing orb to the knight's sword.",
    accentColor: "#1A1A1A",
    year: 2024,
    medium: "Acrylic on canvas",
    dimensions: "80 × 100 cm",
    editionType: "original",
    certificateOfAuthenticity: true,
    framed: false,
    price: 2400,
    currency: "EUR",
    priceConfirmed: true,
    vatNote: "[VAT TREATMENT TO BE CONFIRMED]",
    availability: "available",
    sku: "AU-ART-02",
    dispatchTime: "[DISPATCH TIME PENDING]",
    shipsTo: ALL_ZONES,
    careInfo: "[CARE INFORMATION PENDING]",
  },
  {
    slug: "artwork-03",
    order: 3,
    layout: "quote-first",
    title: "Eternal Love",
    quote: "No flower has ever bloomed as beautifully as your soul.",
    shortIntro: "A knight offers a bride a blue rose beneath a starry, triangular arch of night sky.",
    storyBeats: [
      { heading: "Her words", text: ETERNAL_LOVE_POEM },
      { heading: "Meaning", text: ETERNAL_LOVE_MEANING },
      { heading: "For the collector", text: ETERNAL_LOVE_COLLECTOR },
    ],
    artistNote: ETERNAL_LOVE_NOTE,
    heroImage: "/images/eternal-love.jpg",
    heroImageAlt:
      "Photograph of an original painting by Urška depicting a knight kneeling before a bride in a flowing pale gown, offering her a blue rose, under a starry night sky rendered in blue tones.",
    accentColor: "#5C5C5C",
    year: 2023,
    medium: "Acrylic on canvas",
    dimensions: "40 × 50 cm",
    editionType: "original",
    certificateOfAuthenticity: true,
    framed: false,
    price: 1111,
    currency: "EUR",
    priceConfirmed: true,
    vatNote: "[VAT TREATMENT TO BE CONFIRMED]",
    availability: "available",
    sku: "AU-ART-03",
    dispatchTime: "[DISPATCH TIME PENDING]",
    shipsTo: ALL_ZONES,
    careInfo: "[CARE INFORMATION PENDING]",
  },
  {
    slug: "artwork-04",
    order: 4,
    layout: "cinematic-macro",
    title: "Birds of Light",
    quote: "They turn the darkness into light.",
    shortIntro: "Four white doves drift through a rose-gold sky lined with light and scattered stars.",
    storyBeats: [
      { heading: "Her words", text: BIRDS_OF_LIGHT_POEM },
      { heading: "Meaning", text: BIRDS_OF_LIGHT_MEANING },
      { heading: "For the collector", text: BIRDS_OF_LIGHT_COLLECTOR },
    ],
    artistNote: BIRDS_OF_LIGHT_NOTE,
    heroImage: "/images/birds-of-light.jpg",
    heroImageAlt:
      "Photograph of an original painting by Urška depicting four white doves in flight across a soft pink and rose-gold sky, with light rays and small sparkling stars.",
    accentColor: "#8A8A8A",
    year: 2025,
    medium: "Acrylic on canvas",
    dimensions: "80 × 100 cm",
    editionType: "original",
    certificateOfAuthenticity: true,
    framed: false,
    price: 2400,
    currency: "EUR",
    priceConfirmed: true,
    vatNote: "[VAT TREATMENT TO BE CONFIRMED]",
    availability: "available",
    sku: "AU-ART-04",
    dispatchTime: "[DISPATCH TIME PENDING]",
    shipsTo: ALL_ZONES,
    careInfo: "[CARE INFORMATION PENDING]",
  },
  {
    slug: "artwork-05",
    order: 5,
    layout: "minimal",
    title: "Somehow My Heart Still Remembers You",
    quote: "Somehow, my heart still remembers you.",
    shortIntro: "Two faces, teal and blue, meet in profile in a quiet moment just before a kiss.",
    storyBeats: [
      { heading: "Her words", text: SOMEHOW_MY_HEART_POEM },
      { heading: "Meaning", text: SOMEHOW_MY_HEART_MEANING },
      { heading: "For the collector", text: SOMEHOW_MY_HEART_COLLECTOR },
    ],
    artistNote: SOMEHOW_MY_HEART_NOTE,
    heroImage: "/images/somehow-my-heart.jpg",
    heroImageAlt:
      "Photograph of an original painting by Urška depicting two faces in profile, rendered in teal and blue tones, close together as if about to kiss.",
    accentColor: "#6E6E6E",
    year: 2024,
    medium: "Acrylic on canvas",
    dimensions: "80 × 100 cm",
    editionType: "original",
    certificateOfAuthenticity: true,
    framed: false,
    price: 2400,
    currency: "EUR",
    priceConfirmed: true,
    vatNote: "[VAT TREATMENT TO BE CONFIRMED]",
    availability: "available",
    sku: "AU-ART-05",
    dispatchTime: "[DISPATCH TIME PENDING]",
    shipsTo: ALL_ZONES,
    careInfo: "[CARE INFORMATION PENDING]",
  },
];
