export default function PlaceholderBanner() {
  if (process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_BANNER !== "true") return null;

  return (
    <div className="sticky top-0 z-50 bg-gold-600 text-ivory text-center text-xs tracking-wide py-1.5">
      Preview — artwork images, stories, prices, and legal/business details are currently placeholder content.
    </div>
  );
}
