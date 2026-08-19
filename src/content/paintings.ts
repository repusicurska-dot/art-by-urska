import { Painting } from "./types";

export const paintings: Painting[] = [
  // ── Dobra volja (Good Mood) ─────────────────────────────────────────────
  {
    slug: "jutranja-svetloba",
    title: "Jutranja svetloba",
    categorySlug: "dobra-volja",
    storyBeats: [
      {
        heading: "Origin",
        text: "Morning light finds the canvas first, before it finds anything else. Urska paints at dawn, when the color has not yet been told what it's supposed to be.",
      },
      {
        heading: "Depth",
        text: "There is a particular yellow that only exists for twenty minutes after sunrise. This piece is an attempt to keep it past its hour.",
      },
      {
        heading: "Resolution",
        text: "It hangs best in a room you pass through often — a hallway, a kitchen — somewhere it can keep surprising you on ordinary days.",
      },
    ],
    price: 2400,
    currency: "EUR",
    dimensions: "80 x 100 cm",
    medium: "Oil on canvas",
    year: 2024,
    available: true,
  },
  {
    slug: "smeh-brez-razloga",
    title: "Smeh brez razloga",
    categorySlug: "dobra-volja",
    storyBeats: [
      {
        heading: "Origin",
        text: "Some laughter needs no joke behind it. This painting began as a doodle during a phone call Urska doesn't remember the subject of — only the feeling.",
      },
      {
        heading: "Depth",
        text: "The brushwork is loose, almost careless, on purpose. Precision would have killed the joke.",
      },
      {
        heading: "Resolution",
        text: "A piece for a room where people gather — it works best overheard, not stared at.",
      },
    ],
    price: 1950,
    currency: "EUR",
    dimensions: "60 x 80 cm",
    medium: "Acrylic on canvas",
    year: 2024,
    available: true,
  },
  {
    slug: "odprto-okno",
    title: "Odprto okno",
    categorySlug: "dobra-volja",
    storyBeats: [
      {
        heading: "Origin",
        text: "An open window, curtain mid-motion. Not a landscape — a held moment of air moving through a house that trusts the weather.",
      },
      {
        heading: "Depth",
        text: "Urska returned to this canvas for three summers before calling it finished, adding warmth each time she found more of it in herself.",
      },
      {
        heading: "Resolution",
        text: "Best placed where morning light actually reaches it — the painting was built to be lived with, not just looked at.",
      },
    ],
    price: 2800,
    currency: "EUR",
    dimensions: "90 x 110 cm",
    medium: "Oil on canvas",
    year: 2025,
    available: true,
  },

  // ── Nervoza (Nervousness) ────────────────────────────────────────────────
  {
    slug: "zadrzan-dih",
    title: "Zadržan dih",
    categorySlug: "nervoza",
    storyBeats: [
      {
        heading: "Origin",
        text: "A held breath. A room too quiet. This piece started as three sharp lines Urska couldn't explain and refused to soften.",
      },
      {
        heading: "Tension",
        text: "The palette narrows on purpose — nowhere for the eye to rest, no exit offered until the very edge of the frame.",
      },
      {
        heading: "Resolution",
        text: "It doesn't resolve so much as release — the tension is the point, and the point is that it's survivable.",
      },
    ],
    price: 2600,
    currency: "EUR",
    dimensions: "70 x 90 cm",
    medium: "Oil on canvas",
    year: 2023,
    available: true,
  },
  {
    slug: "prazna-soba",
    title: "Prazna soba",
    categorySlug: "nervoza",
    storyBeats: [
      {
        heading: "Origin",
        text: "An empty room. Not abandoned — waiting. The kind of quiet that has a pulse to it.",
      },
      {
        heading: "Tension",
        text: "Every surface catches light at the wrong angle, deliberately. Nothing here is allowed to feel settled.",
      },
      {
        heading: "Resolution",
        text: "Some collectors say it calms them, oddly — naming a feeling can do that. It did that for Urska too, painting it.",
      },
    ],
    price: 2200,
    currency: "EUR",
    dimensions: "70 x 70 cm",
    medium: "Oil on canvas",
    year: 2024,
    available: true,
  },
  {
    slug: "utrip-pred-nevihto",
    title: "Utrip pred nevihto",
    categorySlug: "nervoza",
    storyBeats: [
      {
        heading: "Origin",
        text: "The pressure drop before a storm — the sky doesn't move yet, but everything in the body already knows.",
      },
      {
        heading: "Tension",
        text: "Built in layers of near-black and static grey, with one thin vein of white that never quite becomes lightning.",
      },
      {
        heading: "Resolution",
        text: "It stays unresolved by design — the storm is always about to arrive, never quite here.",
      },
    ],
    price: 3100,
    currency: "EUR",
    dimensions: "100 x 120 cm",
    medium: "Oil on canvas",
    year: 2025,
    available: true,
  },

  // ── Mir (Stillness) ──────────────────────────────────────────────────────
  {
    slug: "voda-brez-vetra",
    title: "Voda brez vetra",
    categorySlug: "mir",
    storyBeats: [
      {
        heading: "Origin",
        text: "Water without wind. A surface so still it stops being a surface and becomes a mirror instead.",
      },
      {
        heading: "Depth",
        text: "Painted slowly, in thin translucent layers, so the canvas itself seems to have depth beneath the paint.",
      },
      {
        heading: "Resolution",
        text: "A piece for a room where you already sit quietly — it doesn't ask anything of the space, only agrees with it.",
      },
    ],
    price: 2500,
    currency: "EUR",
    dimensions: "80 x 100 cm",
    medium: "Oil on canvas",
    year: 2023,
    available: true,
  },
  {
    slug: "prostor-brez-nujnosti",
    title: "Prostor brez nujnosti",
    categorySlug: "mir",
    storyBeats: [
      {
        heading: "Origin",
        text: "A space where nothing needs to happen. Urska painted it after a long stretch of not painting at all.",
      },
      {
        heading: "Depth",
        text: "Sage and pale stone tones, almost no contrast — the eye is invited to stop searching for a focal point.",
      },
      {
        heading: "Resolution",
        text: "It rewards being looked at for longer than feels necessary. That's rather the whole exercise.",
      },
    ],
    price: 2900,
    currency: "EUR",
    dimensions: "90 x 90 cm",
    medium: "Oil on canvas",
    year: 2024,
    available: true,
  },
  {
    slug: "tih-dan",
    title: "Tih dan",
    categorySlug: "mir",
    storyBeats: [
      {
        heading: "Origin",
        text: "A quiet day, unremarkable in every way that matters — which is exactly why it was worth keeping.",
      },
      {
        heading: "Depth",
        text: "Soft horizontal bands of muted green and grey, built with a wide dry brush, almost meditative to make.",
      },
      {
        heading: "Resolution",
        text: "Many collectors hang this where they start their morning — it asks for nothing and gives quiet in return.",
      },
    ],
    price: 2100,
    currency: "EUR",
    dimensions: "70 x 90 cm",
    medium: "Acrylic on canvas",
    year: 2025,
    available: true,
  },

  // ── Hrepenenje (Longing) ──────────────────────────────────────────────────
  {
    slug: "vrata-odprta-namenoma",
    title: "Vrata, odprta namenoma",
    categorySlug: "hrepenenje",
    storyBeats: [
      {
        heading: "Origin",
        text: "A door left open on purpose. Something is on its way — not yet arrived, but expected, and that waiting has its own warmth.",
      },
      {
        heading: "Depth",
        text: "The light inside the doorway is warmer than the light outside it, a small, deliberate act of hope disguised as technique.",
      },
      {
        heading: "Resolution",
        text: "For anyone who has waited for someone with the door already open — this piece was painted with you in mind.",
      },
    ],
    price: 2700,
    currency: "EUR",
    dimensions: "80 x 100 cm",
    medium: "Oil on canvas",
    year: 2024,
    available: true,
  },
  {
    slug: "pismo-ki-ni-poslano",
    title: "Pismo, ki ni poslano",
    categorySlug: "hrepenenje",
    storyBeats: [
      {
        heading: "Origin",
        text: "A letter never sent. Not because it wasn't finished — because some things are truer left unspoken.",
      },
      {
        heading: "Depth",
        text: "Faint text-like markings run beneath the surface layers, visible only at an angle, legible to no one but the painter.",
      },
      {
        heading: "Resolution",
        text: "This piece tends to find people who are also holding something they haven't said yet.",
      },
    ],
    price: 2350,
    currency: "EUR",
    dimensions: "60 x 90 cm",
    medium: "Oil on canvas",
    year: 2024,
    available: true,
  },
  {
    slug: "obzorje-ki-se-ne-priblizuje",
    title: "Obzorje, ki se ne približuje",
    categorySlug: "hrepenenje",
    storyBeats: [
      {
        heading: "Origin",
        text: "A horizon that never gets closer, no matter how far you walk toward it — the oldest kind of wanting there is.",
      },
      {
        heading: "Depth",
        text: "Built in soft terracotta gradients that recede without ever fully leaving, layered over months of returning to the same line.",
      },
      {
        heading: "Resolution",
        text: "A quiet companion piece for long transitions — moving house, waiting for news, the space between two lives.",
      },
    ],
    price: 3200,
    currency: "EUR",
    dimensions: "100 x 130 cm",
    medium: "Oil on canvas",
    year: 2025,
    available: true,
  },

  // ── Moč (Strength) ────────────────────────────────────────────────────────
  {
    slug: "korenine-pred-vejami",
    title: "Korenine pred vejami",
    categorySlug: "moc",
    storyBeats: [
      {
        heading: "Origin",
        text: "Roots before branches. What holds a thing up is rarely what's visible from the road.",
      },
      {
        heading: "Depth",
        text: "Built from the ground of the canvas upward, in heavy layered ochre and umber, with the top third left almost bare.",
      },
      {
        heading: "Resolution",
        text: "A piece often chosen by people rebuilding something — a business, a body, a life. It was painted with that in mind.",
      },
    ],
    price: 3400,
    currency: "EUR",
    dimensions: "100 x 120 cm",
    medium: "Oil on canvas",
    year: 2023,
    available: true,
  },
  {
    slug: "teza-brez-prosnje",
    title: "Teža, brez prošnje",
    categorySlug: "moc",
    storyBeats: [
      {
        heading: "Origin",
        text: "Weight carried without asking for help. Not stoicism exactly — more like a decision made once and kept.",
      },
      {
        heading: "Depth",
        text: "Dense, almost sculptural paint application, applied with a palette knife in broad deliberate strokes.",
      },
      {
        heading: "Resolution",
        text: "This one tends to sit best in a study or office — somewhere quiet work gets done.",
      },
    ],
    price: 2950,
    currency: "EUR",
    dimensions: "90 x 100 cm",
    medium: "Oil on canvas",
    year: 2024,
    available: true,
  },
  {
    slug: "stojim-se",
    title: "Stojim še",
    categorySlug: "moc",
    storyBeats: [
      {
        heading: "Origin",
        text: "\"I'm still standing\" — not a triumphant shout, just a fact, stated plainly, which is somehow more powerful.",
      },
      {
        heading: "Depth",
        text: "A single upright form against a field of movement, painted last, after everything around it was already finished.",
      },
      {
        heading: "Resolution",
        text: "Given as a gift more often than bought for oneself — usually to someone who just came through something hard.",
      },
    ],
    price: 3600,
    currency: "EUR",
    dimensions: "110 x 140 cm",
    medium: "Oil on canvas",
    year: 2025,
    available: true,
  },

  // ── Melanholija (Melancholy) ─────────────────────────────────────────────
  {
    slug: "dez-s-hvaleznostjo",
    title: "Dež, s hvaležnostjo",
    categorySlug: "melanholija",
    storyBeats: [
      {
        heading: "Origin",
        text: "Rain remembered fondly. A beauty that aches a little, on purpose — grief that has made peace with staying awhile.",
      },
      {
        heading: "Depth",
        text: "Cool violets and deep blue-greys, softened at the edges as if seen through a window streaked with water.",
      },
      {
        heading: "Resolution",
        text: "Not a sad painting, in the end — a grateful one, which is a different thing entirely.",
      },
    ],
    price: 2450,
    currency: "EUR",
    dimensions: "80 x 100 cm",
    medium: "Oil on canvas",
    year: 2023,
    available: true,
  },
  {
    slug: "spomin-ki-obledi-lepo",
    title: "Spomin, ki obledi lepo",
    categorySlug: "melanholija",
    storyBeats: [
      {
        heading: "Origin",
        text: "A memory fading beautifully. Not every loss needs to look like loss — some just soften at the edges.",
      },
      {
        heading: "Depth",
        text: "Painted with successive thin glazes, each one slightly lighter than the last, so the image seems to recede as you look.",
      },
      {
        heading: "Resolution",
        text: "Often chosen to mark an ending that was, on balance, still worth having happened.",
      },
    ],
    price: 2600,
    currency: "EUR",
    dimensions: "70 x 90 cm",
    medium: "Oil on canvas",
    year: 2024,
    available: true,
  },
  {
    slug: "modra-ura",
    title: "Modra ura",
    categorySlug: "melanholija",
    storyBeats: [
      {
        heading: "Origin",
        text: "The blue hour — that stretch after sunset, before dark, when the day is over but hasn't quite left yet.",
      },
      {
        heading: "Depth",
        text: "Deep indigo built in patient layers, with a single warm ember of window-light in the lower third.",
      },
      {
        heading: "Resolution",
        text: "A piece for evenings — it changes character entirely once the sun that lit the room is gone.",
      },
    ],
    price: 2850,
    currency: "EUR",
    dimensions: "90 x 110 cm",
    medium: "Oil on canvas",
    year: 2025,
    available: true,
  },

  // ── Upanje (Hope) ─────────────────────────────────────────────────────────
  {
    slug: "razpoka-svetlobe",
    title: "Razpoka svetlobe",
    categorySlug: "upanje",
    storyBeats: [
      {
        heading: "Origin",
        text: "A crack of light under a closed door. It doesn't need to be a lot of light — it only needs to be there.",
      },
      {
        heading: "Depth",
        text: "Nearly the whole canvas is dark, save one deliberate seam of warm gold, applied last, in a single confident pass.",
      },
      {
        heading: "Resolution",
        text: "The piece Urska is asked about most often — usually by someone waiting for something to change.",
      },
    ],
    price: 2750,
    currency: "EUR",
    dimensions: "80 x 100 cm",
    medium: "Oil on canvas",
    year: 2024,
    available: true,
  },
  {
    slug: "prva-ura-novega-leta",
    title: "Prva ura novega leta",
    categorySlug: "upanje",
    storyBeats: [
      {
        heading: "Origin",
        text: "The first hour of a new year — not the fireworks, but the quiet that comes right after, full of possibility.",
      },
      {
        heading: "Depth",
        text: "Cool night blues giving way, at the top edge of the canvas, to the first pale hint of an unpainted sunrise.",
      },
      {
        heading: "Resolution",
        text: "A popular choice for new beginnings — a first home, a new chapter, a decision finally made.",
      },
    ],
    price: 3050,
    currency: "EUR",
    dimensions: "100 x 120 cm",
    medium: "Oil on canvas",
    year: 2025,
    available: true,
  },
  {
    slug: "seme-pod-snegom",
    title: "Seme pod snegom",
    categorySlug: "upanje",
    storyBeats: [
      {
        heading: "Origin",
        text: "A seed under snow. Nothing visible is happening — and everything necessary is happening anyway.",
      },
      {
        heading: "Depth",
        text: "A quiet white field conceals, just beneath the surface texture, a single warm ochre form the eye finds slowly.",
      },
      {
        heading: "Resolution",
        text: "A gentle piece, often given rather than bought — a way of telling someone that spring is still coming.",
      },
    ],
    price: 2300,
    currency: "EUR",
    dimensions: "70 x 90 cm",
    medium: "Oil on canvas",
    year: 2024,
    available: true,
  },
];
