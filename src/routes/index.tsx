import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartPulse, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-primary-soft via-background to-background">
      <div className="mx-auto max-w-[480px] min-h-dvh flex flex-col px-6 pt-16 pb-8 safe-bottom">
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-soft-in">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full" aria-hidden />
            <div className="relative h-24 w-24 rounded-[28px] bg-primary text-primary-foreground grid place-items-center shadow-lift">
              <HeartPulse className="h-12 w-12" strokeWidth={2.2} />
            </div>
          </div>
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-foreground">CareBridge</h1>
          <p className="mt-3 text-base text-muted-foreground max-w-xs">
            Trusted health guidance for every family.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-3 w-full max-w-sm text-left">
            <Feature icon={<HeartPulse className="h-5 w-5" />} title="Guided health check" body="Get a next step in minutes — never a diagnosis." />
            <Feature icon={<Users className="h-5 w-5" />} title="Your whole family" body="One safe wallet for records, meds, and reminders." />
            <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Works offline" body="Emergency contacts and saved guides always ready." />
          </div>
        </div>

        <div className="space-y-3 mt-8">
          <Link
            to="/language"
            className="tap-target flex items-center justify-center rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lift"
          >
            Get started
          </Link>
          <Link
            to="/login"
            className="tap-target flex items-center justify-center rounded-2xl bg-card border border-border px-6 text-base font-semibold text-foreground"
          >
            I already have an account
          </Link>
          <p className="text-center text-xs text-muted-foreground pt-2">
            CareBridge guides you toward the right next step. It does not replace professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-3 items-start bg-card/60 backdrop-blur-sm rounded-2xl p-3 border border-border/60">
      <div className="h-10 w-10 shrink-0 grid place-items-center rounded-xl bg-primary-soft text-primary">{icon}</div>
      <div className="min-w-0">
        <p className="font-semibold text-foreground text-sm">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{body}</p>
      </div>
    </div>
  );
}
