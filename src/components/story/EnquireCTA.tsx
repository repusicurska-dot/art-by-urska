import Link from "next/link";
import { Painting } from "@/content/types";

export default function EnquireCTA({ painting }: { painting: Painting }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        href={`/contact?piece=${painting.slug}`}
        className="text-sm tracking-widest uppercase bg-charcoal text-ivory hover:bg-gold-600 transition-colors rounded-full px-8 py-3"
      >
        Povpraševanje o delu
      </Link>
      <button
        type="button"
        disabled
        title="Plačila prihajajo kmalu"
        className="text-sm tracking-widest uppercase text-charcoal/40 border border-charcoal/20 rounded-full px-8 py-3 cursor-not-allowed"
      >
        Kupi zdaj — kmalu na voljo
      </button>
    </div>
  );
}
