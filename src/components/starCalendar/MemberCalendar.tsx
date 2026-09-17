"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import type { DayReading } from "@/lib/astro/calendar";
import type { Sign } from "@/lib/astro/ephemeris";
import { SIGN_NAME, SIGN_SYMBOL, TYPE_EMOJI, TYPE_LABEL, formatDate, moonEmoji, type Lang } from "@/lib/astro/texts";
import DayCard, { TYPE_COLOR } from "./DayCard";
import BirthFields, { type BirthValue } from "./BirthFields";

interface MemberView {
  email: string;
  lang: Lang;
  birthDate: string;
  birthTime: string | null;
  birthTimeZone: string;
  status: string;
  accessUntil: string | null;
  cancelAtPeriodEnd: boolean;
}

type Summary = { title: string; paragraphs: string[] };

function shiftMonth(year: number, month: number, by: number) {
  const d = new Date(Date.UTC(year, month - 1 + by, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export default function MemberCalendar({
  member,
  active,
  year,
  month,
  today,
  days,
  summary,
  sunSign,
  feed,
  welcome,
}: {
  member: MemberView;
  active: boolean;
  year: number;
  month: number;
  today: string;
  days: DayReading[];
  summary: Record<Lang, Summary> | null;
  sunSign: Sign;
  feed: { https: string; webcal: string };
  welcome: boolean;
}) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>(member.lang);
  const sl = lang === "sl";
  const [selected, setSelected] = useState<string>(days.find((d) => d.date === today)?.date ?? days[0]?.date ?? "");
  const [birth, setBirth] = useState<BirthValue>({
    birthDate: member.birthDate,
    birthTime: member.birthTime ?? "",
    birthTimeZone: member.birthTimeZone,
  });
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [subState, setSubState] = useState<"idle" | "working" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const selectedDay = days.find((d) => d.date === selected);
  const firstWeekday = days.length ? (new Date(`${days[0].date}T12:00:00Z`).getUTCDay() + 6) % 7 : 0;
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Date(Date.UTC(2024, 0, 1 + i)).toLocaleDateString(sl ? "sl-SI" : "en-GB", { weekday: "short", timeZone: "UTC" })
  );
  const until = member.accessUntil ? formatDate(member.accessUntil.slice(0, 10), lang, { day: "numeric", month: "long", year: "numeric" }) : "";

  async function changeSubscription(action: "cancel" | "resume") {
    if (action === "cancel" && !window.confirm(sl ? "Res želiš odpovedati naročnino?" : "Cancel your subscription?")) return;
    setSubState("working");
    const res = await fetch("/api/sbc/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    }).catch(() => null);
    if (!res?.ok) {
      setSubState("error");
      return;
    }
    setSubState("idle");
    router.refresh();
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaveState("saving");
    const res = await fetch("/api/sbc/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...birth, lang }),
    }).catch(() => null);
    if (!res?.ok) {
      setSaveState("error");
      return;
    }
    setSaveState("saved");
    router.refresh();
  }

  const box = "rounded-3xl bg-paper/85 p-6 md:p-8 shadow-[0_30px_70px_-40px_rgba(75,58,94,0.45)]";

  return (
    <div className="spirit-light spirit-ground relative isolate" lang={lang}>
      <Container className="max-w-5xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-smoke">✨ {sl ? "Zvezdni poslovni koledar" : "Star Business Calendar"}</p>
            <h1 className="mt-3 font-heading text-4xl text-bone md:text-5xl">
              {SIGN_SYMBOL[sunSign]} {sl ? "Tvoj koledar" : "Your calendar"}
            </h1>
            <p className="mt-2 text-bone">
              {sl ? "Sončno znamenje" : "Sun sign"}: {SIGN_NAME[sunSign][lang]} · {member.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(["sl", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-widest ${lang === l ? "border-bone/60 text-bone" : "border-bone/15 text-smoke"}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
            <form method="post" action="/api/sbc/logout">
              <button type="submit" className="ml-2 text-xs uppercase tracking-widest text-bone underline">
                {sl ? "Odjava" : "Sign out"}
              </button>
            </form>
          </div>
        </div>

        {welcome && active && (
          <p className="mt-6 rounded-2xl bg-paper/85 px-5 py-4 text-bone">
            🎉 {sl ? "Dobrodošlica! Tvoj koledar je pripravljen, v nabiralniku pa te čaka email z vsemi povezavami." : "Welcome! Your calendar is ready, and an email with all the links is in your inbox."}
          </p>
        )}

        {!active ? (
          <div className={`${box} mt-10 text-center`}>
            <p className="text-4xl">🌙</p>
            <h2 className="mt-3 font-heading text-3xl text-bone">{sl ? "Naročnina ni aktivna" : "Your subscription isn't active"}</h2>
            <p className="mt-3 text-bone">
              {member.status === "past_due"
                ? sl
                  ? "Zadnje plačilo ni uspelo. Stripe bo poskusil znova — ali pa posodobi kartico ob ponovni naročnini."
                  : "The last payment didn't go through. Stripe will retry — or update your card by subscribing again."
                : sl
                  ? "Ko se znova naročiš, se koledar takoj vrne — z vsemi tvojimi podatki."
                  : "Subscribe again and your calendar is back straight away, with all your details."}
            </p>
            <Link href="/zvezdni-koledar#narocnina" className="btn-primary mt-6 inline-block">
              {sl ? "Znova se naroči" : "Subscribe again"}
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 flex items-center justify-between">
              <Link href={`/zvezdni-koledar/moj?m=${shiftMonth(year, month, -1)}`} className="rounded-full bg-paper/80 px-4 py-2 text-bone" aria-label={sl ? "Prejšnji mesec" : "Previous month"}>
                ←
              </Link>
              <h2 className="font-heading text-3xl capitalize text-bone">
                {formatDate(`${year}-${String(month).padStart(2, "0")}-01`, lang, { month: "long", year: "numeric" })}
              </h2>
              <Link href={`/zvezdni-koledar/moj?m=${shiftMonth(year, month, 1)}`} className="rounded-full bg-paper/80 px-4 py-2 text-bone" aria-label={sl ? "Naslednji mesec" : "Next month"}>
                →
              </Link>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {weekdays.map((w) => (
                    <p key={w} className="pb-1 text-[11px] uppercase text-smoke">
                      {w}
                    </p>
                  ))}
                  {Array.from({ length: firstWeekday }).map((_, i) => (
                    <span key={`pad-${i}`} />
                  ))}
                  {days.map((d) => {
                    const isSelected = d.date === selected;
                    const isToday = d.date === today;
                    return (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => setSelected(d.date)}
                        aria-pressed={isSelected}
                        aria-label={`${formatDate(d.date, lang, { day: "numeric", month: "long" })}: ${TYPE_LABEL[d.type][lang]}`}
                        className="relative flex aspect-square flex-col items-center justify-center rounded-xl border bg-paper/80 transition-transform hover:-translate-y-0.5"
                        style={{
                          borderColor: isSelected ? TYPE_COLOR[d.type] : "transparent",
                          boxShadow: isSelected ? `0 0 0 2px ${TYPE_COLOR[d.type]}` : undefined,
                        }}
                      >
                        <span className={`text-xs ${isToday ? "rounded-full bg-charcoal px-1.5 text-ivory" : "text-bone"}`}>
                          {Number(d.date.slice(8))}
                        </span>
                        <span className="text-lg leading-none sm:text-2xl">{TYPE_EMOJI[d.type]}</span>
                        <span className="hidden text-[11px] leading-none sm:block">
                          {moonEmoji(d.moonPhase)}
                          {d.stars.money >= 2 ? "💰" : ""}
                          {d.stars.love >= 2 ? "💞" : ""}
                        </span>
                        <span className="absolute bottom-1 h-0.5 w-5 rounded-full" style={{ background: TYPE_COLOR[d.type] }} />
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-bone">
                  {(["contracts", "beginnings", "avoid", "self"] as const).map((type) => (
                    <span key={type}>
                      {TYPE_EMOJI[type]} {TYPE_LABEL[type][lang]}
                    </span>
                  ))}
                  <span>💰 {sl ? "denar" : "money"}</span>
                  <span>💞 {sl ? "ljubezen" : "love"}</span>
                </div>
              </div>

              <div>{selectedDay && <DayCard day={selectedDay} lang={lang} />}</div>
            </div>

            {summary && (
              <div className={`${box} mt-10`}>
                <h2 className="font-heading text-3xl text-bone">🌙 {summary[lang].title}</h2>
                <div className="mt-4 space-y-4">
                  {summary[lang].paragraphs.map((p, i) => (
                    <p key={i} className="whitespace-pre-line leading-relaxed text-bone">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className={`${box} mt-6`}>
              <h2 className="font-heading text-2xl text-bone">📱 {sl ? "Koledar v telefonu" : "On your phone"}</h2>
              <p className="mt-2 leading-relaxed text-bone">
                {sl
                  ? "Dodaj koledar v iPhone, Mac ali Outlook z enim klikom. Za Google koledar kopiraj povezavo in jo dodaj pod »Drugi koledarji → Iz URL-ja«. Dnevi se osvežujejo sami."
                  : "Add it to iPhone, Mac or Outlook with one tap. For Google Calendar, copy the link and add it under “Other calendars → From URL”. The days update on their own."}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={feed.webcal} className="btn-primary">
                  {sl ? "Dodaj v koledar" : "Add to calendar"}
                </a>
                <button
                  type="button"
                  className="btn-secondary border-bone/30 text-bone"
                  onClick={async () => {
                    await navigator.clipboard.writeText(feed.https).catch(() => {});
                    setCopied(true);
                  }}
                >
                  {copied ? (sl ? "Kopirano ✓" : "Copied ✓") : sl ? "Kopiraj povezavo" : "Copy link"}
                </button>
              </div>
              <p className="mt-3 text-xs italic text-smoke">
                {sl ? "Povezava je zasebna — ne deli je z drugimi." : "This link is private — don't share it."}
              </p>
            </div>
          </>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <form onSubmit={saveProfile} className={box}>
            <h2 className="font-heading text-2xl text-bone">🪐 {sl ? "Rojstni podatki" : "Birth details"}</h2>
            <p className="mt-2 mb-5 text-sm text-bone">
              {sl ? "Jezik strani, ki ga izbereš zgoraj, velja tudi za emaile." : "The language chosen above is also used for your emails."}
            </p>
            <BirthFields lang={lang} value={birth} onChange={setBirth} />
            <button type="submit" disabled={saveState === "saving"} className="btn-primary mt-5">
              {saveState === "saving" ? "…" : saveState === "saved" ? (sl ? "Shranjeno ✓" : "Saved ✓") : sl ? "Shrani" : "Save"}
            </button>
            {saveState === "error" && <p className="mt-2 text-sm text-terracotta">{sl ? "Preveri podatke." : "Please check the details."}</p>}
          </form>

          <div className={box}>
            <h2 className="font-heading text-2xl text-bone">💳 {sl ? "Naročnina" : "Subscription"}</h2>
            <p className="mt-3 leading-relaxed text-bone">
              {member.status === "trialing" && !member.cancelAtPeriodEnd
                ? sl
                  ? `🎁 Brezplačni preizkus do ${until}. Nato 5,99 € na mesec.`
                  : `🎁 Free trial until ${until}. Then €5.99 per month.`
                : member.cancelAtPeriodEnd
                  ? sl
                    ? `Naročnina je odpovedana. Dostop ostane do ${until}, zaračunano ne bo nič več.`
                    : `Your subscription is cancelled. You keep access until ${until} and won't be charged again.`
                  : member.status === "active"
                    ? sl
                      ? `Aktivna · 5,99 € na mesec · naslednje obdobje od ${until}.`
                      : `Active · €5.99 per month · next period from ${until}.`
                    : ""}
            </p>
            {active &&
              (member.cancelAtPeriodEnd ? (
                <button type="button" disabled={subState === "working"} onClick={() => changeSubscription("resume")} className="btn-primary mt-5">
                  {sl ? "Obnovi naročnino" : "Resume subscription"}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={subState === "working"}
                  onClick={() => changeSubscription("cancel")}
                  className="btn-secondary mt-5 border-bone/30 text-bone"
                >
                  {sl ? "Odpovej naročnino" : "Cancel subscription"}
                </button>
              ))}
            {subState === "error" && <p className="mt-2 text-sm text-terracotta">{sl ? "Ni uspelo. Poskusi znova." : "That didn't work. Please try again."}</p>}
            <p className="mt-5 text-xs italic text-smoke">
              {sl
                ? "Koledar je duhovno orodje za načrtovanje, ne finančni, pravni ali zdravstveni nasvet."
                : "The calendar is a spiritual planning tool, not financial, legal or medical advice."}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
