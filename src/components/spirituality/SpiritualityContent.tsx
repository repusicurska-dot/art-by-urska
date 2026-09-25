"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { fadeInUp } from "@/lib/motion";
import TarotReading from "./TarotReading";
import LiveReadingBooking from "./LiveReadingBooking";
import IntentionCompass from "./IntentionCompass";
import MoonToday from "./MoonToday";
import BreathingPause from "./BreathingPause";
import GratitudePractice from "./GratitudePractice";
import StarCalendarTeaser from "@/components/starCalendar/StarCalendarTeaser";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Lang } from "./lang";

interface RelatedArtwork {
  slug: string;
  title: string;
  image: string;
  cta: string;
}

interface Section {
  heading: string;
  text: string;
  artwork?: RelatedArtwork;
}

interface Copy {
  eyebrow: string;
  /** Urška's own opening quote, verbatim in EN. The Slovenian is a direct
   *  translation of that same line — flagged for her to correct if she'd word it
   *  differently. Further quotes from her notes go here as she sends them. */
  title: string;
  subtitle: string;
  ctaPath: string;
  ctaLive: string;
  reflectionsEyebrow: string;
  sections: Section[];
  closing: string;
  closingCta: string;
  signature: string;
}

// AI-drafted at Urška's explicit request ("ne vem kaj naj mam na tej strani, ustvari
// zanimivo in da se lahko izražam") — a starting voice for her to keep, edit, or replace,
// not presented as her verbatim words. Built from what's genuinely known about her
// (competition climber turned painter) and the recurring themes in her own real work
// (soul recognition across lifetimes, courage as a choice, darkness giving way to light).
// Each reflection that maps onto a real painting links straight to it, so the page has
// somewhere to go rather than being read once and left.
const COPY: Record<Lang, Copy> = {
  sl: {
    eyebrow: "Duhovnost pri Urški",
    title: "Duhovnost je zame pot nazaj k duši.",
    subtitle:
      "Prostor svetlobe za trenutke, ko iščeš mir, jasnost ali samo znak. Izvleci karto dneva, poglej luno, vzemi si minuto tišine — ali se z Urško pogovori v živo.",
    ctaPath: "Najdi svojo pot danes",
    ctaLive: "Branje v živo z Urško",
    reflectionsEyebrow: "Urškine misli",
    sections: [
      {
        heading: "Tišina pred barvo",
        text: "Preden se dotaknem platna, se za trenutek ustavim. Ne zato, ker bi čakala na navdih, ampak zato, ker vem, da tisto, kar je res moje, ne pride v hrupu. Prihaja v tistem tihem prostoru med enim vdihom in naslednjim — tam, kjer ni več strahu pred tem, kar bo nastalo.",
      },
      {
        heading: "Od skale do platna",
        text: "Dolgo preden sem prvič prijela čopič, sem se učila zaupanja na steni. Plezanje me je naučilo, da telo pozna stvari, ki jih um še ne razume — kam seže roka, preden oko najde oprijem, kako dihanje umiri strah. Danes slikam na podoben način. Ne načrtujem vsake poteze vnaprej. Zaupam, da roka najde pot, tako kot jo je nekoč našla na steni.",
      },
      {
        heading: "Duše, ki se prepoznajo",
        text: "Verjamem, da nekatera srečanja niso naključna. Da obstaja starejša oblika spomina, ki nima nič opraviti z datumi ali kraji — samo z občutkom, da si nekoga že poznal, še preden si izvedel njegovo ime. To platno se je rodilo prav iz tega občutka.",
        artwork: {
          slug: "artwork-05",
          title: "Somehow My Heart Still Remembers You",
          image: "/images/somehow-my-heart.jpg",
          cta: "Poglej to delo →",
        },
      },
      {
        heading: "Ko tema ni sovražnik",
        text: "Nekaj mojih najtemnejših platen je nastalo v obdobjih, ko sem se počutila najbolj izgubljeno. In vsakič znova sem odkrila isto: tema ni nasprotje svetlobe, je le prostor, kjer se svetloba še ni pokazala. Pogum ni odsotnost strahu — je odločitev, da kljub strahu pokleknemo in začnemo. Iz tega je nastala ta slika.",
        artwork: {
          slug: "artwork-02",
          title: "The Prophecy",
          image: "/images/the-prophecy.jpg",
          cta: "Poglej to delo →",
        },
      },
    ],
    closing:
      "Vsaka slika na tej strani se je rodila iz nečesa, kar sem prej začutila kot duhovno resnico, šele nato kot podobo. Če te je katera od zgornjih misli nagovorila, je verjetno platno, ki ji pripada, zate.",
    closingCta: "Razišči vso zbirko →",
    signature: "— Urška",
  },
  en: {
    eyebrow: "Spirituality by Urška",
    title: "Spirituality, for me, is the journey back to the soul.",
    subtitle:
      "A place of light for the moments you are looking for peace, clarity, or simply a sign. Draw your card of the day, check the moon, take a minute of stillness — or talk with Urška live.",
    ctaPath: "Find your path today",
    ctaLive: "Live reading with Urška",
    reflectionsEyebrow: "Reflections from Urška",
    sections: [
      {
        heading: "The silence before color",
        text: "Before I touch the canvas, I stop for a moment. Not because I'm waiting for inspiration, but because I know that whatever is truly mine doesn't arrive in noise. It comes in that quiet space between one breath and the next — where the fear of what might appear no longer lives.",
      },
      {
        heading: "From the rock to the canvas",
        text: "Long before I ever held a brush, I was learning to trust a wall. Climbing taught me that the body knows things the mind hasn't caught up to yet — where the hand reaches before the eye finds the hold, how breath can quiet fear. I paint in much the same way now. I don't plan every stroke in advance. I trust that my hand will find the way, the way it once did on stone.",
      },
      {
        heading: "Souls that recognize each other",
        text: "I believe some meetings aren't accidental. That there's an older kind of memory that has nothing to do with dates or places — only with the feeling that you already knew someone before you learned their name. This canvas was born from exactly that feeling.",
        artwork: {
          slug: "artwork-05",
          title: "Somehow My Heart Still Remembers You",
          image: "/images/somehow-my-heart.jpg",
          cta: "View this piece →",
        },
      },
      {
        heading: "When darkness isn't the enemy",
        text: "Some of my darkest canvases were made in the seasons I felt most lost. And every time, I discovered the same thing: darkness isn't the opposite of light — it's just the space where light hasn't arrived yet. Courage isn't the absence of fear — it's the decision to kneel down and begin anyway. This piece came out of that.",
        artwork: {
          slug: "artwork-02",
          title: "The Prophecy",
          image: "/images/the-prophecy.jpg",
          cta: "View this piece →",
        },
      },
    ],
    closing:
      "Every painting on this site started as something I felt as a spiritual truth before it ever became an image. If one of these reflections spoke to you, the canvas it belongs to probably will too.",
    closingCta: "Explore the full collection →",
    signature: "— Urška",
  },
  hr: {
    eyebrow: "Duhovnost kod Urške",
    title: "Duhovnost je za mene put natrag k duši.",
    subtitle:
      "Prostor svjetla za trenutke kad tražiš mir, jasnoću ili samo znak. Izvuci kartu dana, pogledaj mjesec, uzmi si minutu tišine — ili razgovaraj s Urškom uživo.",
    ctaPath: "Pronađi svoj put danas",
    ctaLive: "Čitanje uživo s Urškom",
    reflectionsEyebrow: "Urškine misli",
    sections: [
      {
        heading: "Tišina prije boje",
        text: "Prije nego dodirnem platno, na trenutak zastanem. Ne zato što čekam nadahnuće, nego zato što znam da ono što je uistinu moje ne dolazi u buci. Dolazi u onom tihom prostoru između jednog udaha i sljedećeg — ondje gdje više nema straha od onoga što će nastati.",
      },
      {
        heading: "Od stijene do platna",
        text: "Davno prije nego sam prvi put uzela kist, učila sam povjerenje na stijeni. Penjanje me naučilo da tijelo zna stvari koje um još ne razumije — kamo ruka seže prije nego oko nađe hvatište, kako dah smiruje strah. Danas slikam na sličan način. Ne planiram svaki potez unaprijed. Vjerujem da će ruka pronaći put, kao što ga je nekoć nalazila na kamenu.",
      },
      {
        heading: "Duše koje se prepoznaju",
        text: "Vjerujem da neki susreti nisu slučajni. Da postoji stariji oblik sjećanja koji nema veze s datumima ni mjestima — samo s osjećajem da si nekoga već poznavao prije nego si saznao njegovo ime. Ovo je platno rođeno upravo iz tog osjećaja.",
        artwork: {
          slug: "artwork-05",
          title: "Somehow My Heart Still Remembers You",
          image: "/images/somehow-my-heart.jpg",
          cta: "Pogledaj ovo djelo →",
        },
      },
      {
        heading: "Kad tama nije neprijatelj",
        text: "Neka od mojih najtamnijih platna nastala su u razdobljima kad sam se osjećala najizgubljenije. I svaki put sam iznova otkrila isto: tama nije suprotnost svjetlu, ona je samo prostor u kojem se svjetlo još nije pokazalo. Hrabrost nije odsutnost straha — hrabrost je odluka da usprkos strahu klekneš i počneš. Iz toga je nastala ova slika.",
        artwork: {
          slug: "artwork-02",
          title: "The Prophecy",
          image: "/images/the-prophecy.jpg",
          cta: "Pogledaj ovo djelo →",
        },
      },
    ],
    closing:
      "Svaka slika na ovoj stranici rodila se iz nečega što sam prvo osjetila kao duhovnu istinu, a tek onda kao sliku. Ako te je neka od ovih misli dotaknula, vjerojatno je platno kojem pripada za tebe.",
    closingCta: "Istraži cijelu zbirku →",
    signature: "— Urška",
  },
  de: {
    eyebrow: "Spiritualität bei Urška",
    title: "Spiritualität ist für mich der Weg zurück zur Seele.",
    subtitle:
      "Ein Ort des Lichts für die Momente, in denen du Frieden, Klarheit oder einfach ein Zeichen suchst. Zieh deine Karte des Tages, schau nach dem Mond, nimm dir eine Minute Stille — oder sprich live mit Urška.",
    ctaPath: "Finde heute deinen Weg",
    ctaLive: "Live-Lesung mit Urška",
    reflectionsEyebrow: "Gedanken von Urška",
    sections: [
      {
        heading: "Die Stille vor der Farbe",
        text: "Bevor ich die Leinwand berühre, halte ich einen Moment inne. Nicht weil ich auf Inspiration warte, sondern weil ich weiß, dass das, was wirklich meins ist, nicht im Lärm ankommt. Es kommt in jenem stillen Raum zwischen einem Atemzug und dem nächsten — dort, wo die Angst vor dem, was entstehen könnte, nicht mehr wohnt.",
      },
      {
        heading: "Vom Fels zur Leinwand",
        text: "Lange bevor ich je einen Pinsel hielt, lernte ich am Fels zu vertrauen. Das Klettern hat mich gelehrt, dass der Körper Dinge weiß, die der Verstand noch nicht eingeholt hat — wohin die Hand greift, bevor das Auge den Griff findet, wie der Atem die Angst beruhigt. Heute male ich auf sehr ähnliche Weise. Ich plane nicht jeden Strich im Voraus. Ich vertraue darauf, dass meine Hand den Weg findet, so wie sie ihn einst am Stein gefunden hat.",
      },
      {
        heading: "Seelen, die einander erkennen",
        text: "Ich glaube, manche Begegnungen sind kein Zufall. Dass es eine ältere Form von Erinnerung gibt, die nichts mit Daten oder Orten zu tun hat — nur mit dem Gefühl, jemanden schon gekannt zu haben, bevor du seinen Namen erfuhrst. Genau aus diesem Gefühl ist dieses Bild entstanden.",
        artwork: {
          slug: "artwork-05",
          title: "Somehow My Heart Still Remembers You",
          image: "/images/somehow-my-heart.jpg",
          cta: "Dieses Werk ansehen →",
        },
      },
      {
        heading: "Wenn Dunkelheit nicht der Feind ist",
        text: "Einige meiner dunkelsten Bilder entstanden in Zeiten, in denen ich mich am verlorensten fühlte. Und jedes Mal entdeckte ich dasselbe: Dunkelheit ist nicht das Gegenteil von Licht, sie ist nur der Raum, in dem das Licht noch nicht angekommen ist. Mut ist nicht die Abwesenheit von Angst — Mut ist die Entscheidung, trotzdem niederzuknien und anzufangen. Daraus ist dieses Bild entstanden.",
        artwork: {
          slug: "artwork-02",
          title: "The Prophecy",
          image: "/images/the-prophecy.jpg",
          cta: "Dieses Werk ansehen →",
        },
      },
    ],
    closing:
      "Jedes Bild auf dieser Seite begann als etwas, das ich zuerst als spirituelle Wahrheit empfand und erst dann als Bild. Wenn dich einer dieser Gedanken angesprochen hat, gehört die Leinwand dazu wahrscheinlich dir.",
    closingCta: "Die ganze Sammlung entdecken →",
    signature: "— Urška",
  },
  it: {
    eyebrow: "Spiritualità secondo Urška",
    title: "La spiritualità, per me, è la via del ritorno all'anima.",
    subtitle:
      "Un luogo di luce per i momenti in cui cerchi pace, chiarezza o solo un segno. Pesca la tua carta del giorno, guarda la luna, prenditi un minuto di quiete — oppure parla dal vivo con Urška.",
    ctaPath: "Trova oggi il tuo cammino",
    ctaLive: "Lettura dal vivo con Urška",
    reflectionsEyebrow: "Pensieri di Urška",
    sections: [
      {
        heading: "Il silenzio prima del colore",
        text: "Prima di toccare la tela mi fermo un istante. Non perché aspetti l'ispirazione, ma perché so che ciò che è davvero mio non arriva nel rumore. Arriva in quello spazio silenzioso tra un respiro e il successivo — là dove non abita più la paura di ciò che potrebbe nascere.",
      },
      {
        heading: "Dalla roccia alla tela",
        text: "Molto prima di tenere in mano un pennello, imparavo a fidarmi su una parete. L'arrampicata mi ha insegnato che il corpo sa cose che la mente non ha ancora raggiunto — dove arriva la mano prima che l'occhio trovi l'appiglio, come il respiro placa la paura. Oggi dipingo in modo molto simile. Non pianifico ogni pennellata in anticipo. Mi fido che la mano trovi la strada, come la trovava un tempo sulla pietra.",
      },
      {
        heading: "Anime che si riconoscono",
        text: "Credo che certi incontri non siano casuali. Che esista una forma di memoria più antica, che non ha nulla a che fare con date o luoghi — solo con la sensazione di aver già conosciuto qualcuno prima di sapere il suo nome. Questa tela è nata esattamente da quella sensazione.",
        artwork: {
          slug: "artwork-05",
          title: "Somehow My Heart Still Remembers You",
          image: "/images/somehow-my-heart.jpg",
          cta: "Guarda quest'opera →",
        },
      },
      {
        heading: "Quando il buio non è il nemico",
        text: "Alcune delle mie tele più scure sono nate nei periodi in cui mi sentivo più persa. E ogni volta ho scoperto la stessa cosa: il buio non è l'opposto della luce, è solo lo spazio in cui la luce non è ancora arrivata. Il coraggio non è l'assenza di paura — è la decisione di inginocchiarsi e cominciare lo stesso. Da qui è nato questo dipinto.",
        artwork: {
          slug: "artwork-02",
          title: "The Prophecy",
          image: "/images/the-prophecy.jpg",
          cta: "Guarda quest'opera →",
        },
      },
    ],
    closing:
      "Ogni dipinto di questo sito è cominciato come qualcosa che ho sentito prima come verità spirituale e solo dopo come immagine. Se uno di questi pensieri ti ha parlato, probabilmente ti parlerà anche la tela a cui appartiene.",
    closingCta: "Esplora tutta la collezione →",
    signature: "— Urška",
  },
};

export default function SpiritualityContent() {
  // This page used to carry its own Slovenian/English switch, because the tarot readings
  // only existed in those two. They exist in all five now, so it follows the site-wide
  // switcher like every other page. The live reading is still held in Slovenian or
  // English — the booking form asks which, separately (see lang.ts).
  const { locale } = useLanguage();
  const lang: Lang = locale;
  const copy = COPY[lang];

  return (
    // lang follows the site switcher: without it a screen reader would read every language
    // with the document's voice. spirit-light flips the whole site, header and footer
    // included, to the light dawn palette while this page is open (see globals.css).
    // `isolate` + the backdrops' -z-10 keep the aurora and stars behind the content —
    // without it the fixed aurora painted over every non-positioned section and washed
    // the text out.
    <div className="spirit-light relative isolate" lang={lang}>
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-24 text-center">
        <Container className="max-w-2xl">
          <motion.div key={lang} initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="block text-xs tracking-[0.3em] uppercase text-smoke">
              {copy.eyebrow}
            </span>
            <h1 className="font-heading italic text-3xl md:text-5xl text-bone mt-6 leading-snug">
              &ldquo;{copy.title}&rdquo;
            </h1>
            <p className="mt-6 text-bone leading-relaxed max-w-xl mx-auto">{copy.subtitle}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a href="#intention" className="btn-primary">
                {copy.ctaPath}
              </a>
              <a href="#live-reading" className="btn-secondary border-accent-warm/50 text-bone hover:border-accent-warm">
                {copy.ctaLive}
              </a>
            </div>
          </motion.div>
        </Container>
      </section>

      <IntentionCompass lang={lang} />

      <MoonToday lang={lang} />

      <div id="tarot" className="scroll-mt-24">
        <TarotReading lang={lang} />
      </div>

      <BreathingPause lang={lang} />

      <GratitudePractice lang={lang} />

      <div id="live-reading" className="scroll-mt-24">
        <LiveReadingBooking lang={lang} />
      </div>

      <StarCalendarTeaser lang={lang} />

      <section id="reflections" className="border-t border-bone/10 pt-24 pb-24 md:pt-32 md:pb-32">
        <Container className="max-w-2xl">
          <span className="mb-14 block text-center text-xs tracking-[0.3em] uppercase text-smoke">
            {copy.reflectionsEyebrow}
          </span>
          <div className="space-y-16">
            {copy.sections.map((section: Section, i: number) => (
              <motion.div
                key={`${lang}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="font-heading text-xl md:text-2xl text-bone">{section.heading}</h2>
                <p className="mt-4 text-bone leading-relaxed">{section.text}</p>

                {section.artwork && (
                  <Link
                    href={`/artworks/${section.artwork.slug}`}
                    className="group mt-6 flex items-center gap-4 rounded-sm border border-bone/10 p-3 transition-colors hover:border-bone/30"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-raised">
                      <Image
                        src={section.artwork.image}
                        alt={section.artwork.title}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <p className="font-heading text-base text-bone">{section.artwork.title}</p>
                      <span className="text-xs tracking-widest uppercase text-bone group-hover:text-bone transition-colors">
                        {section.artwork.cta}
                      </span>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container className="max-w-2xl">
          <motion.div
            key={`${lang}-closing`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pt-16 border-t border-bone/10 text-center"
          >
            <p className="font-heading italic text-xl md:text-2xl text-bone leading-relaxed max-w-xl mx-auto">
              {copy.closing}
            </p>
            <Link
              href="/collection"
              className="inline-block mt-8 text-xs tracking-widest uppercase text-bone hover:text-bone transition-colors border-b border-bone/40 pb-1"
            >
              {copy.closingCta}
            </Link>
            <p className="mt-8 font-heading text-lg text-bone">{copy.signature}</p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
