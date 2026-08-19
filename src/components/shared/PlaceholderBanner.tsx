export default function PlaceholderBanner() {
  if (process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_BANNER !== "true") return null;

  return (
    <div className="sticky top-0 z-50 bg-gold-600 text-ivory text-center text-xs tracking-wide py-1.5">
      Predogled — vse slike in besedila zgodb so trenutno placeholder vsebina.
    </div>
  );
}
