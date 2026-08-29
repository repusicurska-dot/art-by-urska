export default function SpiritualityAurora() {
  return (
    <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute rounded-full"
        style={{
          width: "75vw",
          height: "75vw",
          left: "-18vw",
          top: "-22vw",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-aurora-gold) 40%, transparent) 0%, color-mix(in srgb, var(--color-aurora-violet) 32%, transparent) 45%, transparent 75%)",
          filter: "blur(80px)",
          animation: "aurora-drift-a 52s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "62vw",
          height: "62vw",
          right: "-20vw",
          top: "-8vw",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-aurora-violet) 38%, transparent) 0%, color-mix(in srgb, var(--color-aurora-gold) 20%, transparent) 50%, transparent 75%)",
          filter: "blur(85px)",
          animation: "aurora-drift-b 64s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "68vw",
          height: "68vw",
          left: "8vw",
          bottom: "-28vw",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-aurora-gold) 32%, transparent) 0%, color-mix(in srgb, var(--color-aurora-violet) 30%, transparent) 50%, transparent 75%)",
          filter: "blur(80px)",
          animation: "aurora-drift-c 58s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "48vw",
          height: "48vw",
          right: "2vw",
          bottom: "-12vw",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-aurora-violet) 30%, transparent) 0%, transparent 72%)",
          filter: "blur(65px)",
          animation: "aurora-drift-a 70s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}

