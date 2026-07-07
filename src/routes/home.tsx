import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import {
  Baby,
  BookOpen,
  ChevronRight,
  Droplets,
  HeartHandshake,
  MapPin,
  Pill,
  Shield,
  Sparkles,
  Stethoscope,
  Sun,
  Syringe,
  Thermometer,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

/* ---------- Northern Nigerian textile-inspired backdrop ---------- */
function TextilePattern() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-[0.09] text-primary pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="cb-textile" width="42" height="42" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 21h42M21 0v42" stroke="currentColor" strokeWidth="0.6" fill="none" />
          <circle cx="21" cy="21" r="2" fill="currentColor" />
          <circle cx="0" cy="0" r="1" fill="currentColor" />
          <circle cx="42" cy="42" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cb-textile)" />
    </svg>
  );
}

function HomePage() {
  return (
    <MobileShell>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-soft via-accent-soft/40 to-transparent" />
        <TextilePattern />

        <div className="relative px-5 pt-8 pb-6 animate-soft-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary flex items-center gap-1.5">
                <Sun className="h-4 w-4" /> Good morning
                <span aria-hidden>🌿</span>
              </p>
              <h1 className="text-[32px] leading-tight font-extrabold tracking-tight mt-1 text-foreground">
                Aisha Ibrahim
              </h1>
              <p className="text-[15px] text-muted-foreground mt-1.5 max-w-[18rem]">
                How is your family feeling today?
              </p>
            </div>
          </div>

          {/* Lafiya AI Companion Card */}
          <Link
            to="/assessment"
            className="mt-5 flex items-center gap-3 rounded-3xl bg-card border border-border/70 px-4 py-3.5 shadow-soft hover:shadow-lift transition-shadow tap-target animate-slide-up"
            aria-label="Open Lafiya Guide"
          >
            <div className="relative h-12 w-12 rounded-2xl grid place-items-center bg-gradient-to-br from-primary to-secondary text-primary-foreground shrink-0">
              <Sparkles className="h-6 w-6" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent border-2 border-card" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground flex items-center gap-1.5">
                Lafiya Guide <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-soft px-1.5 py-0.5 rounded-md">AI</span>
              </p>
              <p className="text-xs text-muted-foreground truncate">Ask me about symptoms, safely & privately</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>

        {/* ---------- Primary care actions ---------- */}
        <div className="relative px-5 pb-8 grid grid-cols-2 gap-3">
          <CareTile
            to="/assessment"
            emoji="👶"
            title="My child feels sick"
            desc="Guided symptom check"
            tone="primary"
            icon={<Thermometer className="h-4 w-4" />}
          />
          <CareTile
            to="/assessment"
            emoji="🤒"
            title="I don't feel well"
            desc="Private health guidance"
            tone="secondary"
            icon={<Stethoscope className="h-4 w-4" />}
          />
          <CareTile
            to="/mother-child"
            emoji="🤰"
            title="Pregnancy & baby care"
            desc="Track your journey"
            tone="accent"
            icon={<Baby className="h-4 w-4" />}
          />
          <CareTile
            to="/finder"
            emoji="🏥"
            title="Find nearby care"
            desc="Clinics & pharmacies"
            tone="neutral"
            icon={<MapPin className="h-4 w-4" />}
          />
        </div>
      </section>

      {/* ---------- Emergency (soft) ---------- */}
      <section className="px-5 pb-6">
        <Link
          to="/emergency"
          className="flex items-center gap-3 rounded-3xl px-4 py-3.5 border border-destructive/30 bg-destructive-soft tap-target hover:shadow-soft transition-shadow"
        >
          <div className="h-11 w-11 rounded-2xl grid place-items-center bg-card border border-destructive/25 text-destructive shrink-0">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground">Emergency help</p>
            <p className="text-xs text-muted-foreground">Call, share location or find urgent care</p>
          </div>
          <span className="text-xs font-bold text-destructive border border-destructive/50 rounded-full px-3 py-1.5">
            Get help
          </span>
        </Link>
      </section>

      {/* ---------- Quick actions ---------- */}
      <section className="px-5 pb-6">
        <SectionTitle title="Quick actions" hint="Everyday care, one tap away" />
        <div className="grid grid-cols-2 gap-3">
          <QuickAction to="/assessment" title="Check symptoms safely" desc="Guided next step" icon={<HeartHandshake className="h-5 w-5" />} tone="primary" />
          <QuickAction to="/medications" title="Medicines" desc="Today's reminders" icon={<Pill className="h-5 w-5" />} tone="secondary" />
          <QuickAction to="/mother-child" title="Pregnancy & baby care" desc="Milestones & tips" icon={<Baby className="h-5 w-5" />} tone="accent" />
          <QuickAction to="/finder" title="Find nearby clinics" desc="Trusted care near you" icon={<MapPin className="h-5 w-5" />} tone="neutral" />
        </div>
      </section>

      {/* ---------- Medication ---------- */}
      <section className="px-5 pb-6">
        <SectionTitle title="Next medication" hint="A gentle reminder from Lafiya" />
        <div className="card-elevated p-5 rounded-3xl">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl grid place-items-center bg-secondary-soft text-secondary">
              <Pill className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">In 12 minutes</p>
              <p className="text-lg font-extrabold text-foreground leading-tight">Paracetamol</p>
            </div>
            <span className="text-sm font-bold text-secondary bg-secondary-soft px-3 py-1.5 rounded-xl">8:00 AM</span>
          </div>

          <div className="mt-4 rounded-2xl bg-muted/60 p-4 grid grid-cols-3 gap-3">
            <MetaCell label="Dose" value="500 mg" />
            <MetaCell label="For" value="Fatima" />
            <MetaCell label="With" value="Water • after food" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">1 tablet gently after breakfast. Watch for fever coming back within 4 hours.</p>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 tap-target rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-soft active:scale-[0.98] transition-transform">
              Mark as taken
            </button>
            <button className="tap-target rounded-2xl border border-border px-5 font-bold text-sm text-foreground bg-card active:scale-[0.98] transition-transform">
              Snooze
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Family ---------- */}
      <section className="pb-6">
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">Your family</h2>
              <p className="text-xs text-muted-foreground">Everyone's health, in one calm place</p>
            </div>
            <Link to="/family" className="text-xs font-bold text-primary flex items-center gap-1">
              See all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory">
          <FamilyCard name="Ibrahim" role="Husband" age={36} initials="IB" status="healthy" />
          <FamilyCard name="Fatima" role="Daughter" age={5} initials="FA" status="attention" />
          <FamilyCard name="Musa" role="Son" age={2} initials="MU" status="reminder" />
          <FamilyCard name="Aisha" role="You" age={32} initials="AI" status="healthy" />
          <AddFamilyCard />
        </div>
      </section>

      {/* ---------- Today's guidance ---------- */}
      <section className="px-5 pb-6">
        <SectionTitle title="Today's guidance" hint="Small habits, safer families" />
        <div className="relative overflow-hidden card-elevated rounded-3xl p-5">
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-secondary-soft" aria-hidden />
          <div className="absolute -right-2 top-6 h-16 w-16 rounded-full bg-primary-soft" aria-hidden />
          <div className="relative">
            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Tip of the day</span>
            <div className="flex items-start gap-3 mt-2">
              <div className="h-11 w-11 rounded-2xl bg-secondary text-secondary-foreground grid place-items-center shrink-0">
                <Droplets className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-extrabold text-foreground leading-snug">Clean water saves lives 💧</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Boil drinking water for at least 3 minutes during the rainy season to prevent cholera in your household.
                </p>
                <Link to="/library" className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-primary">
                  Read more <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Community updates ---------- */}
      <section className="pb-8">
        <div className="px-5">
          <SectionTitle title="Community updates" hint="What's happening around Maiduguri" />
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-2 snap-x">
          <AlertCard
            title="Malaria prevention week"
            body="Free nets at Bulumkutu PHC this Saturday"
            icon={<Shield className="h-5 w-5" />}
            tone="primary"
          />
          <AlertCard
            title="Cholera awareness"
            body="Wash hands & boil water — cases rising"
            icon={<Droplets className="h-5 w-5" />}
            tone="secondary"
          />
          <AlertCard
            title="Vaccination campaign"
            body="Measles booster clinic runs Aug 10–14"
            icon={<Syringe className="h-5 w-5" />}
            tone="accent"
          />
          <AlertCard
            title="Heat safety tips"
            body="Stay hydrated. Check on elders daily."
            icon={<Sun className="h-5 w-5" />}
            tone="warm"
          />
        </div>
      </section>

      {/* ---------- Trust footer ---------- */}
      <div className="mx-5 mb-4 rounded-3xl bg-muted/50 border border-border px-4 py-3.5 text-xs text-muted-foreground flex items-start gap-2">
        <BookOpen className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
        <span>
          CareBridge offers gentle guidance — not a diagnosis. For serious concerns, always visit a qualified health worker.
        </span>
      </div>
    </MobileShell>
  );
}

/* ---------- Small building blocks ---------- */

function SectionTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-extrabold tracking-tight text-foreground">{title}</h2>
      {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
    </div>
  );
}

function CareTile({
  to, emoji, title, desc, tone, icon,
}: {
  to: string; emoji: string; title: string; desc: string;
  tone: "primary" | "secondary" | "accent" | "neutral";
  icon: ReactNode;
}) {
  const tones: Record<string, string> = {
    primary: "from-primary-soft to-card border-primary/15",
    secondary: "from-secondary-soft to-card border-secondary/15",
    accent: "from-accent-soft to-card border-accent/25",
    neutral: "from-muted to-card border-border",
  };
  const chip: Record<string, string> = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    neutral: "bg-foreground text-background",
  };
  return (
    <Link
      to={to}
      className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br p-4 shadow-soft hover:shadow-lift active:scale-[0.98] transition-all ${tones[tone]}`}
    >
      <div className="flex items-center justify-between">
        <div className="text-3xl leading-none" aria-hidden>{emoji}</div>
        <div className={`h-7 w-7 rounded-xl grid place-items-center ${chip[tone]}`}>{icon}</div>
      </div>
      <p className="mt-6 font-extrabold text-[15px] leading-tight text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      <ChevronRight className="absolute right-3 bottom-3 h-4 w-4 text-muted-foreground" />
    </Link>
  );
}

function QuickAction({
  to, title, desc, icon, tone,
}: {
  to: string; title: string; desc: string; icon: ReactNode;
  tone: "primary" | "secondary" | "accent" | "neutral";
}) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary-soft text-secondary",
    accent: "bg-accent-soft text-accent-foreground",
    neutral: "bg-muted text-foreground",
  } as const;
  return (
    <Link
      to={to}
      className="card-elevated rounded-3xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform"
    >
      <div className={`h-11 w-11 rounded-2xl grid place-items-center ${tones[tone]}`}>{icon}</div>
      <div>
        <p className="font-extrabold text-foreground leading-snug">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground -mt-1" />
    </Link>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-bold text-foreground mt-0.5">{value}</p>
    </div>
  );
}

function FamilyCard({
  name, role, age, initials, status,
}: {
  name: string; role: string; age: number; initials: string;
  status: "healthy" | "reminder" | "attention";
}) {
  const dot = {
    healthy: { bg: "bg-primary", label: "Healthy" },
    reminder: { bg: "bg-accent", label: "Reminder due" },
    attention: { bg: "bg-destructive", label: "Needs attention" },
  }[status];
  return (
    <Link
      to="/family"
      className="snap-start shrink-0 w-40 card-elevated rounded-3xl p-4 flex flex-col items-center text-center active:scale-[0.98] transition-transform"
    >
      <div className="relative">
        <div className="h-16 w-16 rounded-2xl grid place-items-center font-extrabold text-xl bg-gradient-to-br from-primary/90 to-secondary/90 text-primary-foreground">
          {initials}
        </div>
        <span className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full ${dot.bg} border-2 border-card`} aria-label={dot.label} />
      </div>
      <p className="mt-3 font-bold text-sm text-foreground truncate w-full">{name}</p>
      <p className="text-[11px] text-muted-foreground">{role} • {age}</p>
      <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {dot.label}
      </span>
    </Link>
  );
}

function AddFamilyCard() {
  return (
    <Link
      to="/family"
      className="snap-start shrink-0 w-40 rounded-3xl border-2 border-dashed border-border p-4 flex flex-col items-center justify-center text-center hover:bg-muted/40 transition-colors"
    >
      <div className="h-16 w-16 rounded-2xl grid place-items-center bg-muted text-muted-foreground text-2xl font-bold">+</div>
      <p className="mt-3 font-bold text-sm text-foreground">Add member</p>
      <p className="text-[11px] text-muted-foreground">Include everyone</p>
    </Link>
  );
}

function AlertCard({
  title, body, icon, tone,
}: {
  title: string; body: string; icon: ReactNode;
  tone: "primary" | "secondary" | "accent" | "warm";
}) {
  const tones = {
    primary: "from-primary-soft to-card text-primary",
    secondary: "from-secondary-soft to-card text-secondary",
    accent: "from-accent-soft to-card text-accent-foreground",
    warm: "from-accent-soft to-card text-accent-foreground",
  } as const;
  return (
    <div className={`snap-start shrink-0 w-64 rounded-3xl p-4 border border-border bg-gradient-to-br shadow-soft ${tones[tone]}`}>
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-2xl grid place-items-center bg-card border border-border">
          {icon}
        </div>
        <Users className="h-4 w-4 opacity-40 ml-auto" />
      </div>
      <p className="mt-3 font-extrabold text-foreground leading-snug">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{body}</p>
      <button className="mt-3 text-xs font-bold text-primary inline-flex items-center gap-1">
        Learn more <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
