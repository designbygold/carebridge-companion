import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import {
  Activity,
  ArrowRight,
  Baby,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Droplets,
  HeartPulse,
  MapPin,
  Pill,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Syringe,
  Thermometer,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home | CareBridge" },
      { name: "description", content: "Aisha’s family health dashboard with guided health support, reminders, family updates and nearby care." },
      { property: "og:title", content: "Home | CareBridge" },
      { property: "og:description", content: "Aisha’s family health dashboard with guided health support, reminders, family updates and nearby care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

const family = [
  { name: "Aisha Ibrahim", relation: "You", age: "31", status: "Healthy", tone: "healthy" },
  { name: "Ibrahim Ibrahim", relation: "Husband", age: "36", status: "Check-up Monday", tone: "reminder" },
  { name: "Fatima Ibrahim", relation: "Daughter", age: "6", status: "Polio booster tomorrow", tone: "reminder" },
  { name: "Musa Ibrahim", relation: "Son", age: "10", status: "Healthy", tone: "healthy" },
] as const;

const communityUpdates = [
  { title: "Malaria prevention week", detail: "Free treated nets at Bolori PHC this Saturday", icon: ShieldAlert },
  { title: "Free immunisation campaign", detail: "Polio and measles boosters across Maiduguri PHCs", icon: Syringe },
  { title: "Maternal health outreach", detail: "Antenatal check-ups at Gwange PHC this Thursday", icon: HeartPulse },
  { title: "Heat wave advisory", detail: "Hydrate and check on elders during hot weather", icon: Activity },
  { title: "Safe water awareness", detail: "Keep drinking water treated and safely stored", icon: Droplets },
] satisfies { title: string; detail: string; icon: LucideIcon }[];

function HomePage() {
  return (
    <MobileShell wide className="bg-brand-ivory">
      <div className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
        <header className="flex items-center justify-between gap-4 py-6 sm:py-8">
          <Link to="/home" aria-label="CareBridge home" className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-teal text-background">
              <HeartPulse className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="text-lg font-bold text-brand-midnight">CareBridge</span>
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-champagne bg-background px-3 py-2 text-xs font-medium text-brand-midnight sm:text-sm">
            <MapPin className="h-4 w-4 text-brand-teal" />
            Bolori, Maiduguri
          </span>
        </header>

        <section className="mb-7 animate-soft-in">
          <p className="text-sm font-semibold text-brand-teal">Good morning</p>
          <h1 className="mt-1 text-3xl font-bold text-brand-midnight sm:text-4xl">Aisha Ibrahim</h1>
          <p className="mt-2 text-base text-muted-foreground">How is your family feeling today?</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.85fr)] lg:items-start">
          <div className="space-y-7">
            <Link
              to="/assessment"
              aria-label="Open Lafiya Guide for a guided health assessment"
              className="group relative block overflow-hidden rounded-[20px] bg-brand-midnight p-6 text-background transition-transform active:scale-[0.99] sm:p-8"
            >
              <div className="relative max-w-xl">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-champagne">
                  <Sparkles className="h-4 w-4" /> Lafiya Guide
                </div>
                <h2 className="mt-5 max-w-lg text-2xl font-semibold leading-tight sm:text-3xl">
                  A clearer next step starts with a conversation.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-background/75 sm:text-base">
                  Answer a few guided questions to understand what to do next. This is health guidance, not a diagnosis.
                </p>
                <span className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-xl bg-brand-teal px-5 text-sm font-semibold text-background transition-colors group-hover:bg-brand-teal/90">
                  Start a health check <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            <section aria-labelledby="care-actions-heading">
              <SectionHeading id="care-actions-heading" title="How can we help?" detail="Choose the kind of support you need." />
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ActionLink to="/assessment" icon={Baby} title="My child feels sick" detail="Guided symptom check" />
                <ActionLink to="/assessment" icon={Thermometer} title="I don’t feel well" detail="Private health guidance" />
                <ActionLink to="/mother-child" icon={HeartPulse} title="Pregnancy & baby care" detail="Care for every stage" />
                <ActionLink to="/finder" icon={MapPin} title="Find nearby care" detail="Clinics and pharmacies" />
              </div>
            </section>

            <section aria-labelledby="family-heading">
              <SectionHeading id="family-heading" title="Your family" detail="A quick look at the people you care for." action={{ to: "/family", label: "Family wallet" }} />
              <div className="mt-3 divide-y divide-border border-y border-border">
                {family.map((person) => <FamilyRow key={person.name} {...person} />)}
              </div>
            </section>

            <section aria-labelledby="guidance-heading">
              <SectionHeading id="guidance-heading" title="Today’s guidance" detail="A small habit for a healthier home." />
              <div className="mt-4 flex items-start gap-4 rounded-[20px] border border-brand-champagne bg-brand-ivory p-5 sm:p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-background text-brand-teal">
                  <Droplets className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-brand-midnight">Clean water saves lives</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Treat drinking water and keep it in a clean, covered container to help protect your household.
                  </p>
                  <Link to="/library" className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-teal">
                    Read more <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>

            <section aria-labelledby="community-heading">
              <SectionHeading id="community-heading" title="Community updates" detail="Local notices for Maiduguri." action={{ to: "/library", label: "Health library" }} />
              <div className="mt-3 grid gap-x-6 sm:grid-cols-2">
                {communityUpdates.map(({ title, detail, icon: Icon }) => (
                  <article key={title} className="flex gap-3 border-b border-border py-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-ivory text-brand-teal">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-brand-midnight">{title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6">
            <section aria-labelledby="medication-heading" className="rounded-[20px] border border-border bg-background p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Next medication</p>
                  <h2 id="medication-heading" className="mt-1 text-lg font-semibold text-brand-midnight">Paracetamol</h2>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-ivory text-brand-teal"><Pill className="h-5 w-5" /></span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">500 mg · Fatima</p>
              <div className="mt-4 flex items-center gap-2 border-y border-border py-3 text-sm text-brand-midnight">
                <Clock3 className="h-4 w-4 text-brand-teal" /> 8:00 AM
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Water · after food</p>
              <Link to="/medications" className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-teal px-4 text-sm font-semibold text-background transition-colors hover:bg-brand-teal/90">
                Open medication reminders <ArrowRight className="h-4 w-4" />
              </Link>
            </section>

            <Link to="/family" className="group flex items-center gap-3 border-y border-border py-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-ivory text-brand-teal"><Users className="h-5 w-5" /></span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-brand-midnight">Family Health Wallet</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">Records, reminders and vaccinations</span>
              </span>
              <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link to="/emergency" className="flex items-center gap-3 rounded-[20px] border border-destructive/40 bg-destructive-soft p-4 transition-colors hover:bg-destructive-soft/80">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-destructive/30 bg-background text-destructive"><ShieldAlert className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-brand-midnight">Emergency support</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">Call, share location or find urgent care.</span>
              </span>
              <span className="inline-flex min-h-10 items-center rounded-lg border border-destructive px-3 text-xs font-semibold text-destructive">Get help</span>
            </Link>

            <section aria-labelledby="more-care-heading">
              <SectionHeading id="more-care-heading" title="More care" />
              <div className="mt-2 divide-y divide-border border-y border-border">
                <FeatureRow to="/medications" icon={CalendarDays} label="Smart reminders" detail="Medication timeline" />
                <FeatureRow to="/finder" icon={Stethoscope} label="Healthcare finder" detail="Care around Maiduguri" />
                <FeatureRow to="/library" icon={BookOpen} label="Health library" detail="Guidance in plain language" />
                <FeatureRow to="/assessment" icon={Activity} label="Recent assessment" detail="Child fever · Visit nearby clinic" />
              </div>
            </section>
          </aside>
        </section>

        <footer className="mt-8 flex items-start gap-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
          CareBridge offers guidance, not a diagnosis. For serious concerns, speak with a qualified health worker.
        </footer>
      </div>
    </MobileShell>
  );
}

function SectionHeading({
  id,
  title,
  detail,
  action,
}: {
  id: string;
  title: string;
  detail?: string;
  action?: { to: "/family" | "/library"; label: string };
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 id={id} className="text-lg font-semibold text-brand-midnight">{title}</h2>
        {detail && <p className="mt-1 text-sm text-muted-foreground">{detail}</p>}
      </div>
      {action && <Link to={action.to} className="inline-flex min-h-11 shrink-0 items-center gap-1 text-xs font-semibold text-brand-teal">{action.label}<ChevronRight className="h-4 w-4" /></Link>}
    </div>
  );
}

function ActionLink({ to, icon: Icon, title, detail }: { to: "/assessment" | "/mother-child" | "/finder"; icon: LucideIcon; title: string; detail: string }) {
  return (
    <Link to={to} className="group flex min-h-24 items-center gap-4 rounded-[18px] border border-border bg-background p-4 transition-colors hover:border-brand-teal/40 hover:bg-brand-ivory/60">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-ivory text-brand-teal"><Icon className="h-5 w-5" /></span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold leading-snug text-brand-midnight">{title}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{detail}</span>
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function FamilyRow({ name, relation, age, status, tone }: (typeof family)[number]) {
  const isReminder = tone === "reminder";
  return (
    <Link to="/family" className="group flex min-h-[68px] items-center gap-3 py-3">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-semibold ${isReminder ? "bg-brand-champagne text-brand-midnight" : "bg-brand-ivory text-brand-teal"}`} aria-hidden="true">
        {name.split(" ").slice(0, 2).map((part) => part[0]).join("")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-brand-midnight">{name}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{relation} · {age}</span>
      </span>
      <span className={`hidden items-center gap-1.5 text-xs sm:inline-flex ${isReminder ? "text-warning-foreground" : "text-success"}`}>
        <span className={`h-2 w-2 rounded-full ${isReminder ? "bg-warning" : "bg-success"}`} />{status}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}

function FeatureRow({ to, icon: Icon, label, detail }: { to: "/medications" | "/finder" | "/library" | "/assessment"; icon: LucideIcon; label: string; detail: string }) {
  return (
    <Link to={to} className="group flex min-h-16 items-center gap-3 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-ivory text-brand-teal"><Icon className="h-4 w-4" /></span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-brand-midnight">{label}</span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">{detail}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}