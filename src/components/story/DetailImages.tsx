import Image from "next/image";
import Container from "@/components/shared/Container";
import { Artwork } from "@/content/types";

/** Extra provenance photos beyond the main hero shot — e.g. Urška holding the finished piece. */
export default function DetailImages({ images }: { images: Artwork["detailImages"] }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-ink">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <figure key={i}>
              {img.src && (
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
              )}
              <figcaption className="mt-3 text-xs tracking-widest uppercase text-smoke text-center">
                {img.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
