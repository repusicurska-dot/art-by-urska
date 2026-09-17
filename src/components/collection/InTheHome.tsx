"use client";

import Image from "next/image";
import Container from "@/components/shared/Container";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Urška's own photographs of the originals on real walls — the one thing a catalogue
 * shot can't show a buyer: scale, and how a piece actually lives in a room. Laid out
 * as a masonry column so every frame keeps the proportions it was shot in, and
 * ordered to alternate between pieces rather than running six near-identical frames
 * of the same painting in a row. The two wide "whole collection" shots bookend it.
 */
type Shot = { src: string; width: number; height: number; alt: string };

const GALLERY: Shot[] = [
  { src: "/images/on-wall-heart.jpg", width: 1004, height: 1302, alt: "\"Somehow My Heart Still Remembers You\" on a plain white wall" },
  { src: "/images/on-wall-birds.jpg", width: 1023, height: 1560, alt: "\"Birds of Light\" hanging beside a feathered dreamcatcher" },
  { src: "/images/on-wall-prophecy.jpg", width: 987, height: 1614, alt: "\"The Prophecy\" alone on a white wall" },
  { src: "/images/in-home-heart-1.jpg", width: 1072, height: 1607, alt: "The turquoise canvas above a pale sofa" },
  { src: "/images/in-home-birds-1.jpg", width: 1080, height: 1620, alt: "\"Birds of Light\" above a sofa dressed in rose and plum" },
  { src: "/images/in-home-prophecy-1.jpg", width: 883, height: 1202, alt: "\"The Prophecy\" below a beaded ceiling light" },
  { src: "/images/in-home-heart-2.jpg", width: 1080, height: 1620, alt: "The living room seen past a white orchid" },
  { src: "/images/in-home-birds-2.jpg", width: 1080, height: 1620, alt: "\"Birds of Light\" seen from across the room" },
  { src: "/images/on-wall-blossoming.jpg", width: 1056, height: 1584, alt: "\"Blossoming Love\" resting on a shelf between trailing plants" },
  { src: "/images/in-home-heart-3.jpg", width: 1080, height: 1620, alt: "The full living room, with plants and a low round table" },
  { src: "/images/in-home-shelf-1.jpg", width: 1289, height: 1080, alt: "\"Eternal Love\" and \"Blossoming Love\" on two white shelves" },
  { src: "/images/in-home-heart-4.jpg", width: 1080, height: 1620, alt: "The turquoise canvas in the corner of the room" },
  { src: "/images/in-home-shelf-2.jpg", width: 1078, height: 1146, alt: "The two smaller canvases seen from the side, among plants and crystals" },
  { src: "/images/in-home-heart-5.jpg", width: 1080, height: 1620, alt: "The living room wall seen through trailing ivy" },
];

function WideShot({ src, alt, ratio }: { src: string; alt: string; ratio: string }) {
  return (
    <div className="art-card relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
    </div>
  );
}

export default function InTheHome() {
  const { t } = useLanguage();
  return (
    <section className="border-t border-bone/10 px-2 py-24 md:py-28">
      <Container>
        <span className="block text-xs tracking-[0.35em] uppercase text-accent-warm">{t.collection.inHomeEyebrow}</span>
        <h2 className="font-gothic text-3xl md:text-5xl text-bone mt-5 leading-[1.1]">{t.collection.inHomeTitle}</h2>
        <p className="mt-6 max-w-xl text-lg text-bone/75 leading-relaxed">{t.collection.inHomeText}</p>

        <div className="mt-14">
          <WideShot
            src="/images/collection-together-1.jpg"
            alt="All five originals lined up together against a garden window"
            ratio="1569 / 684"
          />
        </div>

        <div className="mt-6 gap-6 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {GALLERY.map((shot) => (
            <div key={shot.src} className="art-card group mb-6 break-inside-avoid overflow-hidden rounded-2xl">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>

        <WideShot
          src="/images/collection-together-2.jpg"
          alt="Three of the large originals side by side on the terrace"
          ratio="1578 / 679"
        />
      </Container>
    </section>
  );
}
