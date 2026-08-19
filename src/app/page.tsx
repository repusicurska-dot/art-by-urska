import ArtistPresence from "@/components/home/ArtistPresence";
import FloatingCategoryNav from "@/components/home/FloatingCategoryNav";
import StoryTeaser from "@/components/home/StoryTeaser";

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

      <StoryTeaser />
    </>
  );
}
