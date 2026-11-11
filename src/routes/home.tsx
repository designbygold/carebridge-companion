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
    <MobileShell wide bottomNavClearance className="overflow-x-clip bg-brand-ivory">
      <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 py-5 sm:py-7">
          <Link to="/home" aria-label="CareBridge home" className="inline-flex items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-brand-deep-green text-background">
              <HeartPulse className="h-5 w-5" strokeWidth={2.2} />
              <span aria-hidden="true" className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-brand-ivory bg-brand-gold" />
            </span>
            <span className="text-lg font-bold text-brand-midnight">CareBridge</span>
          </Link>
          <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-teal/20 bg-background px-3 text-xs font-semibold text-brand-deep-green sm:px-4 sm:text-sm">
            <MapPin className="h-4 w-4 text-brand-deep-green" />
            Bolori, Maiduguri
          </span>
        </header>

        <section className="mb-5 animate-soft-in sm:mb-7">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-brand-deep-green"><span className="h-2 w-2 rounded-full bg-brand-teal" />Good morning,</p>
          <h1 className="mt-1 text-3xl font-bold text-brand-midnight sm:text-4xl">Aisha Ibrahim</h1>
          <p className="mt-2 text-base text-muted-foreground">How is your family feeling today?</p>
        </section>

        <Link
          to="/assessment"
          aria-label="Open Lafiya Guide for a guided health assessment"
          className="group mb-7 grid overflow-hidden rounded-[24px] border-l-4 border-brand-gold bg-brand-deep-green text-background transition-transform active:scale-[0.995] sm:mb-9 sm:grid-cols-[minmax(0,1.35fr)_minmax(240px,0.65fr)]"
        >
          <div className="p-5 sm:p-8 lg:p-9">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold">
              <Sparkles className="h-4 w-4" /> Lafiya Guide
            </span>
            <h2 className="mt-4 max-w-2xl text-2xl font-bold leading-tight text-background sm:text-3xl lg:text-4xl">
              A clearer next step starts here.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-background/85 sm:text-base">
              Answer a few guided questions to understand what to do next. This is health guidance, not a diagnosis.
            </p>
      <span className="mt-5 inline-flex min-h-12 items-center gap-3 rounded-xl bg-background px-5 text-sm font-bold text-brand-deep-green transition-colors group-hover:bg-brand-champagne sm:mt-6">
              Start a health check <ArrowRight className="h-4 w-4" />
            </span>
          </div>
          <div className="hidden border-l border-background/15 p-6 sm:flex sm:flex-col sm:justify-center lg:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-teal text-brand-deep-green">
                <HeartPulse className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <div>
                <p className="text-sm font-bold text-background">Guided health check</p>
                <p className="mt-1 text-xs text-background/75">Support at your pace</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-background/25 px-3 py-2 text-xs font-semibold text-background">Educational guidance</span>
              <span className="rounded-full border border-background/25 px-3 py-2 text-xs font-semibold text-background">Not a diagnosis</span>
            </div>
          </div>
        </Link>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.85fr)] lg:items-start lg:gap-9">
          <div className="space-y-8 sm:space-y-10">
            <section aria-labelledby="care-actions-heading">
              <SectionHeading id="care-actions-heading" title="How can we help?" detail="Choose the kind of support you need." />
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ActionLink to="/assessment" icon={Baby} title="My child feels sick" detail="Guided symptom check" tone="primary" featured />
                <ActionLink to="/assessment" icon={Thermometer} title="I don’t feel well" detail="Private health guidance" tone="plain" />
                <ActionLink to="/mother-child" icon={HeartPulse} title="Pregnancy & baby care" detail="Care for every stage" tone="warm" />
                <ActionLink to="/finder" icon={MapPin} title="Find nearby care" detail="Clinics and pharmacies" tone="cool" />
              </div>
            </section>

            <section aria-labelledby="family-heading" className="border-y border-border bg-background/70 px-3 py-5 sm:px-5">
              <SectionHeading id="family-heading" title="Your family" detail="A quick look at the people you care for." action={{ to: "/family", label: "Family wallet" }} />
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {family.map((person) => <FamilyRow key={person.name} {...person} />)}
              </div>
            </section>

            <section aria-labelledby="community-heading">
              <SectionHeading id="community-heading" title="Community updates" detail="Local notices for Maiduguri." action={{ to: "/library", label: "Health library" }} />
              <div className="mt-3 grid gap-x-6 sm:grid-cols-2">
                {communityUpdates.map(({ title, detail, icon: Icon }, index) => (
                <article key={title} className="flex gap-3 border-b border-border py-4">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${index % 2 === 0 ? "bg-primary-soft text-brand-deep-green" : "bg-brand-champagne text-accent-foreground"}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-brand-midnight">{title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-6">
            <section aria-labelledby="medication-heading" className="overflow-hidden border border-brand-teal/25 bg-background">
              <div className="flex items-center justify-between gap-3 border-t-4 border-brand-teal bg-primary-soft/60 p-5 sm:p-6">
                <div>
                  <p className="text-xs font-bold uppercase text-brand-deep-green">Next medication</p>
                  <h2 id="medication-heading" className="mt-1 text-xl font-bold text-brand-midnight">Paracetamol</h2>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-brand-deep-green"><Pill className="h-5 w-5" /></span>
              </div>
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm text-muted-foreground">500 mg · Fatima</p>
                <div className="mt-4 flex items-center gap-2 border-y border-border py-3 text-sm font-semibold text-brand-midnight">
                  <Clock3 className="h-4 w-4 text-brand-deep-green" /> 8:00 AM
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Water · after food</p>
                <Link to="/medications" className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-deep-green px-4 text-sm font-bold text-background transition-colors hover:bg-brand-deep-green/90">
                  Open medication reminders <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            <section aria-labelledby="guidance-heading" className="border-l-4 border-brand-gold bg-background px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-brand-deep-green">
                  <Droplets className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase text-accent-foreground">Today’s guidance</p>
                  <h2 id="guidance-heading" className="mt-1 font-bold text-brand-midnight">Clean water saves lives</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Treat drinking water and keep it in a clean, covered container to help protect your household.
                  </p>
                  <Link to="/library" className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-brand-deep-green">
                    Read more <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>

            <Link to="/family" className="group flex min-h-[84px] items-center gap-3 rounded-[18px] bg-primary-soft px-4 py-4 transition-colors hover:bg-brand-teal/20 sm:px-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-background text-brand-deep-green"><Users className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-brand-deep-green">Family Health Wallet</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">Records, reminders and vaccinations</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-brand-deep-green transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link to="/emergency" className="flex items-center gap-3 rounded-[18px] border border-destructive/40 bg-destructive-soft p-4 transition-colors hover:bg-destructive-soft/80 sm:p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-destructive/30 bg-background text-destructive"><ShieldAlert className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-brand-midnight">Emergency support</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">Call, share location or find urgent care.</span>
              </span>
              <span className="inline-flex min-h-10 shrink-0 items-center rounded-lg border border-destructive px-3 text-xs font-bold text-destructive">Get help</span>
            </Link>

            <section aria-labelledby="more-care-heading" className="rounded-[22px] border border-border bg-background px-4 py-4 sm:px-5">
              <SectionHeading id="more-care-heading" title="More care" />
              <div className="mt-2 divide-y divide-border">
                <FeatureRow to="/medications" icon={CalendarDays} label="Smart reminders" detail="Medication timeline" />
                <FeatureRow to="/finder" icon={Stethoscope} label="Healthcare finder" detail="Care around Maiduguri" />
                <FeatureRow to="/library" icon={BookOpen} label="Health library" detail="Guidance in plain language" />
                <FeatureRow to="/assessment" icon={Activity} label="Recent assessment" detail="Child fever · Visit nearby clinic" />
              </div>
            </section>
          </aside>
        </div>

        <footer className="mt-8 flex items-start gap-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep-green" />
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

function ActionLink({ to, icon: Icon, title, detail, tone, featured = false }: { to: "/assessment" | "/mother-child" | "/finder"; icon: LucideIcon; title: string; detail: string; tone: "primary" | "plain" | "warm" | "cool"; featured?: boolean }) {
  const surface = {
    primary: "border-transparent bg-brand-teal text-primary-foreground",
    plain: "border-border bg-background",
    warm: "border-transparent bg-brand-champagne",
    cool: "border-brand-teal/20 bg-primary-soft/60",
  }[tone];
  const iconTone = tone === "primary" ? "bg-background/20 text-primary-foreground" : tone === "warm" ? "bg-background/70 text-accent-foreground" : "bg-background/80 text-brand-deep-green";
  const titleTone = tone === "primary" ? "text-primary-foreground" : "text-brand-midnight";
  const detailTone = tone === "primary" ? "text-primary-foreground/85" : "text-muted-foreground";
  return (
    <Link to={to} className={`group flex ${featured ? "min-h-28 sm:col-span-2 sm:min-h-32" : "min-h-24"} items-center gap-4 rounded-[18px] border ${surface} p-4 transition-colors hover:border-brand-teal/50 ${tone === "primary" ? "hover:bg-brand-deep-green" : "hover:bg-background"} sm:p-5`}>
      <span className={`grid ${featured ? "h-14 w-14 rounded-2xl" : "h-11 w-11 rounded-xl"} shrink-0 place-items-center bg-background/80 ${iconTone}`}><Icon className={featured ? "h-6 w-6" : "h-5 w-5"} strokeWidth={1.9} /></span>
      <span className="min-w-0 flex-1">
        <span className={`block font-bold leading-snug ${titleTone} ${featured ? "text-base sm:text-lg" : "text-sm"}`}>{title}</span>
        <span className={`mt-1 block text-xs sm:text-sm ${detailTone}`}>{detail}</span>
      </span>
      <ChevronRight className={`h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 ${tone === "primary" ? "text-primary-foreground" : "text-brand-deep-green"}`} />
    </Link>
  );
}

function FamilyRow({ name, relation, age, status, tone }: (typeof family)[number]) {
  const isReminder = tone === "reminder";
  return (
    <Link to="/family" className="group flex min-h-[72px] items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-brand-ivory sm:px-3">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-xs font-bold ${isReminder ? "bg-accent-soft text-accent-foreground" : "bg-primary-soft text-brand-deep-green"}`} aria-hidden="true">
        {name.split(" ").slice(0, 2).map((part) => part[0]).join("")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-brand-midnight">{name}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{relation} · {age}</span>
      </span>
      <span className={`inline-flex max-w-[45%] items-start gap-1.5 text-right text-[11px] leading-snug sm:max-w-[48%] sm:text-xs ${isReminder ? "text-warning-foreground" : "text-brand-deep-green"}`}>
        <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${isReminder ? "bg-warning" : "bg-success"}`} />{status}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function FeatureRow({ to, icon: Icon, label, detail }: { to: "/medications" | "/finder" | "/library" | "/assessment"; icon: LucideIcon; label: string; detail: string }) {
  return (
    <Link to={to} className="group flex min-h-16 items-center gap-3 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-brand-deep-green"><Icon className="h-4 w-4" /></span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-brand-midnight">{label}</span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">{detail}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}