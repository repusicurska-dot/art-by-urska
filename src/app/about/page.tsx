import Container from "@/components/shared/Container";
import PlaceholderArt from "@/components/shared/PlaceholderArt";

export default function AboutPage() {
  return (
    <div>
      <section className="py-24 md:py-32">
        <Container className="max-w-3xl">
          <span className="text-xs tracking-widest uppercase text-gold-600">
            O umetnici
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-4">
            Urška
          </h1>
          <div className="mt-10 grid md:grid-cols-[280px_1fr] gap-10 items-start">
            <PlaceholderArt
              label="Urška — portret"
              accentColor="#8F6C2C"
              className="aspect-[4/5] rounded-sm"
            />
            <div className="space-y-5 text-charcoal/75 leading-relaxed">
              <p>
                Urška slika razpoloženja, ne predmetov. Vsako platno se začne
                z občutkom — mirom, nervozo, hrepenenjem — in šele nato najde
                obliko.
              </p>
              <p>
                Njeno delo je razdeljeno na sedem čustvenih oddelkov, vsak s
                svojo paleto in ritmom. Znotraj vsakega oddelka nastanejo
                slike, ki druga drugo dopolnjujejo, kot poglavja iste zgodbe.
              </p>
              <p>
                Zanjo slikanje ni beg iz resničnosti, temveč način, kako se ji
                približati počasneje, bolj pošteno. Vsako delo je namenjeno
                nekomu, ki bo v njem prepoznal svoj lasten trenutek.
              </p>
              <p className="text-sm text-charcoal/50 italic">
                (Placeholder besedilo — pravo biografijo dodava kasneje.)
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
