import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import { LIVE_READING_PACKAGES, formatSlotDate } from "@/components/spirituality/liveReadingData";
import { getBooking } from "@/lib/bookings";
import { isRedisConfigured } from "@/lib/redis";
import { verify } from "@/lib/signing";

// Urška's private page for one booking request, reached from the link in her notification
// email. Signed link, not indexed, Slovenian only.
export const metadata: Metadata = {
  title: "Rezervacija — Art by Urška",
  robots: { index: false, follow: false },
};

const RESULTS: Record<string, string> = {
  confirmed: "Termin je potrjen. Stranka je dobila potrdilo s terminom za koledar, dan prej pa dobi še opomnik.",
  "confirmed-email-failed": "Termin je potrjen, a potrdila stranki ni bilo mogoče poslati — piši ji sama.",
  declined: "Termin je zavrnjen in spet prost. Stranka je dobila sporočilo, da lahko izbere drugega.",
  "declined-email-failed": "Termin je zavrnjen in spet prost, a sporočila stranki ni bilo mogoče poslati — piši ji sama.",
  invalid: "Povezava ni veljavna ali rezervacija ne obstaja.",
};

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ t?: string; result?: string }>;
}) {
  const { id } = await params;
  const { t, result } = await searchParams;

  const valid = isRedisConfigured() && verify(`booking:${id}`, t);
  const booking = valid ? await getBooking(id) : null;
  const pkg = booking ? LIVE_READING_PACKAGES.find((p) => p.key === booking.packageKey) : null;

  return (
    <section className="min-h-[70vh] px-6 py-24">
      <Container className="max-w-xl">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">Rezervacija branja</span>

        {result && RESULTS[result] && (
          <p role="status" className="mt-6 rounded-md border border-bone/20 px-5 py-4 text-bone">
            {RESULTS[result]}
          </p>
        )}

        {!booking || !pkg ? (
          <p className="mt-6 text-bone">{RESULTS.invalid}</p>
        ) : (
          <>
            <h1 className="mt-6 font-heading text-4xl text-bone">{booking.name}</h1>
            <dl className="mt-8 space-y-3 text-bone">
              <div>
                <dt className="text-xs tracking-widest uppercase text-smoke">Termin</dt>
                <dd>
                  {formatSlotDate(booking.date, "sl")} ob {booking.time} (slovenski čas)
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest uppercase text-smoke">Branje</dt>
                <dd>
                  {pkg.title.sl} — {pkg.duration.sl}, {pkg.price}
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest uppercase text-smoke">Email</dt>
                <dd>
                  <a href={`mailto:${booking.email}`} className="underline">
                    {booking.email}
                  </a>
                </dd>
              </div>
              {booking.message && (
                <div>
                  <dt className="text-xs tracking-widest uppercase text-smoke">Vprašanje</dt>
                  <dd className="whitespace-pre-wrap">{booking.message}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs tracking-widest uppercase text-smoke">Stanje</dt>
                <dd>
                  {booking.status === "pending" ? "čaka na potrditev" : booking.status === "confirmed" ? "potrjeno" : "zavrnjeno"}
                </dd>
              </div>
            </dl>

            {booking.status === "pending" && (
              <form method="post" action={`/api/bookings/${booking.id}`} className="mt-10 flex flex-wrap gap-3">
                <input type="hidden" name="t" value={t} />
                <button type="submit" name="action" value="confirm" className="btn-primary bg-bone text-ink">
                  Potrdi termin
                </button>
                <button type="submit" name="action" value="decline" className="btn-secondary border-bone/40 text-bone">
                  Zavrni in sprosti termin
                </button>
              </form>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
