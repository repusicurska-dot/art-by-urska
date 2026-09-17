"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import type { Lang } from "@/lib/astro/texts";

/** The page a reset link opens: choose a new password, then straight into the calendar. */
export default function PasswordReset({ email, exp, token }: { email: string; exp: string; token: string }) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("sl");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "error">("idle");
  const [error, setError] = useState("");
  const sl = lang === "sl";
  const linkLooksValid = !!email && !!exp && !!token;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!navigator.language.toLowerCase().startsWith("sl")) setLang("en");
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== repeat) {
      setError(sl ? "Gesli se ne ujemata." : "The passwords don't match.");
      setStatus("error");
      return;
    }
    setStatus("working");
    setError("");
    const res = await fetch("/api/sbc/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reset", email, exp: Number(exp), token, password, lang }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (!res?.ok) {
      setError((data as { error?: string }).error ?? (sl ? "Ni uspelo." : "That didn't work."));
      setStatus("error");
      return;
    }
    router.push("/zvezdni-koledar/moj");
    router.refresh();
  }

  const field = "w-full rounded-sm border border-bone/20 bg-paper px-4 py-3 text-bone focus:border-bone focus:outline-none";
  const label = "mb-2 block text-xs uppercase tracking-widest text-bone";

  return (
    <div className="spirit-light relative isolate min-h-[70vh]" lang={lang}>
      <Container className="max-w-md px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-smoke">✨ {sl ? "Zvezdni poslovni koledar" : "Star Business Calendar"}</p>
        <h1 className="mt-5 font-heading text-4xl text-bone">{sl ? "Novo geslo" : "New password"}</h1>

        {!linkLooksValid ? (
          <>
            <p className="mt-6 text-bone">
              {sl ? "Povezava ni popolna. Zahtevaj novo na strani za prijavo." : "This link is incomplete. Request a new one from the sign-in page."}
            </p>
            <Link href="/zvezdni-koledar/prijava" className="btn-primary mt-8 inline-block">
              {sl ? "Na prijavo" : "To sign in"}
            </Link>
          </>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-4 text-left">
            <p className="text-sm text-bone">
              {sl ? "Za" : "For"} <strong>{email}</strong>
            </p>
            <div>
              <label htmlFor="sbc-new-password" className={label}>
                {sl ? "Novo geslo (vsaj 8 znakov)" : "New password (at least 8 characters)"}
              </label>
              <input
                id="sbc-new-password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={field}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="sbc-new-password-2" className={label}>
                {sl ? "Ponovi geslo" : "Repeat password"}
              </label>
              <input
                id="sbc-new-password-2"
                type="password"
                required
                minLength={8}
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
                className={field}
                autoComplete="new-password"
              />
            </div>
            {status === "error" && (
              <p role="alert" className="text-sm text-terracotta">
                {error}
              </p>
            )}
            <button type="submit" disabled={status === "working"} className="btn-primary w-full">
              {status === "working" ? "…" : sl ? "Shrani geslo in se prijavi" : "Save password and sign in"}
            </button>
          </form>
        )}
      </Container>
    </div>
  );
}
