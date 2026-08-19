export default function PlaceholderArt({
  label,
  accentColor,
  className = "",
}: {
  label: string;
  accentColor: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${accentColor}33 0%, ${accentColor}cc 60%, ${accentColor}55 100%)`,
      }}
    >
      <span className="font-heading text-lg md:text-xl text-ivory/90 text-center px-6 drop-shadow-sm">
        {label}
      </span>
    </div>
  );
}
