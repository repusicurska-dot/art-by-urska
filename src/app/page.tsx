import ArtistPresence from "@/components/home/ArtistPresence";
import FloatingCategoryNav from "@/components/home/FloatingCategoryNav";
import Container from "@/components/shared/Container";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative h-[100dvh] min-h-[640px] w-full">
        <ArtistPresence />
        <FloatingCategoryNav />
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
          <span className="text-xs tracking-widest uppercase text-ivory/50 animate-pulse">
            Izberi oddelek
          </span>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <Container className="max-w-3xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal">
            Slike, ki pripovedujejo
          </h2>
          <p className="mt-6 text-charcoal/70 leading-relaxed">
            Vsaka slika Urške se rodi iz razpoloženja — 21 del, razdeljenih v
            sedem oddelkov, vsak s svojim čustvenim odtenkom. To ni galerija
            izdelkov, temveč zbirka zgodb, ki jih je vredno spoznati počasi,
            preden postanejo del vašega prostora.
          </p>
          <Link
            href="/about"
            className="inline-block mt-8 text-sm tracking-widest uppercase text-gold-600 hover:text-gold-400 transition-colors border-b border-gold-600/40 pb-1"
          >
            Spoznaj Urško
          </Link>
        </Container>
      </section>
    </>
  );
}
