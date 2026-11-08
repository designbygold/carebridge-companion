import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/otp")({
  head: () => ({
    meta: [
      { title: "Verify your phone | CareBridge" },
      { name: "description", content: "Confirm your phone number to continue to CareBridge." },
      { property: "og:title", content: "Verify your phone | CareBridge" },
      { property: "og:description", content: "Confirm your phone number to continue to CareBridge." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OtpPage,
});

function OtpPage() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const complete = digits.every((d) => d);

  function update(i: number, v: string) {
    const c = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = c;
    setDigits(next);
    if (c && i < 5) refs.current[i + 1]?.focus();
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-[480px] min-h-dvh flex flex-col px-6 pt-14 pb-8 safe-bottom">
        <Link to="/login" className="text-sm text-muted-foreground">← Back</Link>
        <div className="mt-8 animate-soft-in">
          <h1 className="text-3xl font-extrabold tracking-tight">Enter verification code</h1>
          <p className="mt-2 text-muted-foreground">We sent a 6-digit code to your phone.</p>
        </div>

        <div className="mt-10 flex gap-2 justify-between">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={d}
              onChange={(e) => update(i, e.target.value)}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              className="h-14 w-12 rounded-2xl border-2 border-input bg-card text-center text-2xl font-bold text-foreground outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          ))}
        </div>

        <button className="mt-6 text-sm font-semibold text-primary self-start">Resend code in 0:45</button>

        <div className="flex-1" />

        <Link
          to="/home"
          className={`tap-target flex items-center justify-center rounded-2xl px-6 text-base font-semibold shadow-lift transition-opacity ${
            complete ? "bg-primary text-primary-foreground" : "bg-primary/40 text-primary-foreground pointer-events-none opacity-70"
          }`}
        >
          Verify and continue
        </Link>
      </div>
    </div>
  );
}
