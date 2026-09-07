"use client";

import { useMemo, useState } from "react";
import Container from "@/components/shared/Container";
import { buildIcsEvent, downloadIcs } from "@/lib/ics";
import type { Lang } from "./tarotData";
import {
  LIVE_READING_PACKAGES,
  LIVE_READING_FORMATS,
  LIVE_READING_LABELS,
  generateCandidateSlots,
  formatSlotDate,
  type TimeSlot,
} from "./liveReadingData";

export default function LiveReadingBooking({ lang }: { lang: Lang }) {
  const labels = LIVE_READING_LABELS[lang];
  const slots = useMemo(() => generateCandidateSlots(3), []);
  const slotsByDate = useMemo(() => {
    const map = new Map<string, TimeSlot[]>();
    for (const slot of slots) {
      const list = map.get(slot.date) ?? [];
      list.push(slot);
      map.set(slot.date, list);
    }
    return map;
  }, [slots]);

  const [packageKey, setPackageKey] = useState(LIVE_READING_PACKAGES[0].key);
  const [format, setFormat] = useState<"video" | "phone">("video");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const selectedPackage = LIVE_READING_PACKAGES.find((p) => p.key === packageKey) ?? LIVE_READING_PACKAGES[0];

  function handleAddToCalendar() {
    if (!selectedSlot) return;
    const [y, m, d] = selectedSlot.date.split("-").map(Number);
    const [h, min] = selectedSlot.time.split(":").map(Number);
    const start = new Date(y, m - 1, d, h, min);
    const durationMinutes = selectedPackage.key === "deep" ? 50 : 20;
    const ics = buildIcsEvent({
      title: `${selectedPackage.title[lang]} — Art by Urška`,
      description:
        lang === "sl"
          ? "Predlagan termin za živo tarot branje. Urška bo termin potrdila po emailu."
          : "Proposed time for a live tarot reading. Urška will confirm it by email.",
      start,
      durationMinutes,
      uid: `${selectedSlot.date}-${selectedSlot.time}-${Date.now()}@byurska.com`,
    });
    downloadIcs(`tarot-reading-${selectedSlot.date}.ics`, ics);
  }

  return (
    <section className="border-t border-bone/10 py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">{labels.heading}</span>
        <p className="mt-6 text-bone/90 leading-relaxed max-w-xl mx-auto">{labels.intro}</p>

        {status === "sent" ? (
          <div className="mt-12 flex flex-col items-center rounded-lg border border-bone/10 bg-raised/40 px-7 py-10">
            <h3 className="font-heading text-2xl text-bone">{labels.successTitle}</h3>
            <p className="mt-3 max-w-sm text-bone/70 leading-relaxed">{labels.successBody}</p>
            {selectedSlot && (
              <button type="button" onClick={handleAddToCalendar} className="btn-secondary mt-6">
                {labels.addToCalendar}
              </button>
            )}
          </div>
        ) : (
          <form
            className="mt-12 w-full max-w-lg mx-auto text-left"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus("submitting");
              setError("");
              try {
                const res = await fetch("/api/live-reading-booking", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name,
                    email,
                    message,
                    company,
                    package: packageKey,
                    format,
                    slot: selectedSlot,
                  }),
                });
                const data = await res.json();
                if (!res.ok) {
                  setError(data.error ?? "Something went wrong.");
                  setStatus("error");
                  return;
                }
                setStatus("sent");
              } catch {
                setError("Couldn't reach the server.");
                setStatus("error");
              }
            }}
          >
            {/* Honeypot field — hidden from real visitors, catches simple bots. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="lrb-company">Company</label>
              <input
                id="lrb-company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div>
              <span className="block text-xs tracking-widest uppercase text-bone/60 mb-3">
                {labels.packageLabel}
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {LIVE_READING_PACKAGES.map((pkg) => {
                  const isSelected = pkg.key === packageKey;
                  return (
                    <button
                      key={pkg.key}
                      type="button"
                      onClick={() => setPackageKey(pkg.key)}
                      aria-pressed={isSelected}
                      className="rounded-lg border px-4 py-4 text-left transition-colors"
                      style={{
                        borderColor: isSelected
                          ? "var(--color-accent-warm)"
                          : "color-mix(in srgb, var(--color-bone) 15%, transparent)",
                        background: isSelected
                          ? "color-mix(in srgb, var(--color-accent-warm) 12%, transparent)"
                          : "transparent",
                      }}
                    >
                      <span className="block font-heading text-base text-bone">{pkg.title[lang]}</span>
                      <span className="mt-1 block text-xs tracking-widest uppercase text-smoke">
                        {pkg.duration[lang]} · {pkg.price}
                      </span>
                      <span className="mt-2 block text-sm text-bone/60 leading-relaxed">
                        {pkg.description[lang]}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-bone/40 italic">{labels.priceNote}</p>
            </div>

            <div className="mt-8">
              <span className="block text-xs tracking-widest uppercase text-bone/60 mb-3">
                {labels.formatLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {LIVE_READING_FORMATS.map((fmt) => {
                  const isSelected = format === fmt.key;
                  return (
                    <button
                      key={fmt.key}
                      type="button"
                      disabled={fmt.comingSoon}
                      onClick={() => setFormat(fmt.key)}
                      aria-pressed={isSelected}
                      className="rounded-full border px-4 py-2 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        borderColor: isSelected
                          ? "var(--color-accent-warm)"
                          : "color-mix(in srgb, var(--color-bone) 15%, transparent)",
                        background: isSelected
                          ? "color-mix(in srgb, var(--color-accent-warm) 12%, transparent)"
                          : "transparent",
                        color: isSelected ? "var(--color-accent-warm)" : "var(--color-bone)",
                      }}
                    >
                      {fmt.label[lang]}
                      {fmt.comingSoon && (
                        <span className="ml-1.5 text-[10px] uppercase tracking-widest text-smoke">
                          ({labels.comingSoonTag})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <span className="block text-xs tracking-widest uppercase text-bone/60 mb-3">{labels.slotLabel}</span>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {Array.from(slotsByDate.entries()).map(([date, daySlots]) => (
                  <div key={date} className="shrink-0">
                    <p className="mb-2 text-center text-xs tracking-widest uppercase text-smoke">
                      {formatSlotDate(date, lang)}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {daySlots.map((slot) => {
                        const isSelected =
                          selectedSlot?.date === slot.date && selectedSlot?.time === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            aria-pressed={isSelected}
                            className="rounded-sm border px-3 py-1.5 text-xs whitespace-nowrap transition-colors"
                            style={{
                              borderColor: isSelected
                                ? "var(--color-accent-warm)"
                                : "color-mix(in srgb, var(--color-bone) 15%, transparent)",
                              background: isSelected
                                ? "var(--color-accent-warm)"
                                : "transparent",
                              color: isSelected ? "var(--color-ink)" : "var(--color-bone)",
                            }}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-bone/40 italic">{labels.slotHint}</p>
            </div>

            <div className="mt-8">
              <label htmlFor="lrb-name" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
                {labels.nameLabel}
              </label>
              <input
                id="lrb-name"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="lrb-email" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
                {labels.emailLabel}
              </label>
              <input
                id="lrb-email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="lrb-message" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
                {labels.messageLabel}
              </label>
              <textarea
                id="lrb-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={labels.messagePlaceholder}
                className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
              />
            </div>

            {status === "error" && (
              <p role="alert" className="mt-4 text-sm text-terracotta">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting" || !selectedSlot}
              className="btn-primary mt-8"
            >
              {status === "submitting" ? labels.submitting : labels.submit}
            </button>
            <p className="mt-4 text-xs text-bone/40 italic">{labels.disclaimer}</p>
          </form>
        )}
      </Container>
    </section>
  );
}
