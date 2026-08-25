export default function ProvisionalPriceNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs tracking-wide text-bone/50 italic ${className}`}>
      Provisional pricing — final price to be confirmed before purchase.
    </p>
  );
}
