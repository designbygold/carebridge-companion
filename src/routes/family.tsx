import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import { AlertCircle, Calendar, ChevronRight, Pill, Plus, ShieldAlert, Syringe } from "lucide-react";

export const Route = createFileRoute("/family")({
  component: FamilyPage,
});

const members = [
  { id: "1", name: "Aisha Ibrahim", role: "You", age: 32, initials: "AI", tone: "primary", conditions: ["No known allergies"], next: "Wellness check • Aug 12" },
  { id: "2", name: "Ibrahim Musa", role: "Husband", age: 36, initials: "IB", tone: "secondary", conditions: ["Hypertension"], next: "Blood pressure check • Aug 9" },
  { id: "3", name: "Fatima", role: "Daughter", age: 5, initials: "FA", tone: "accent", conditions: ["Fever recovery"], next: "Follow-up assessment", alert: true },
  { id: "4", name: "Musa", role: "Son", age: 2, initials: "MU", tone: "primary", conditions: ["Vaccination due"], next: "Measles booster • Aug 10", alert: true },
];

const toneMap: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
};

function FamilyPage() {
  return (
    <MobileShell>
      <PageHeader
        title="Family Wallet"
        subtitle="4 members • All records safe & offline"
        right={
          <button aria-label="Add family member" className="tap-target grid place-items-center h-11 w-11 rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <Plus className="h-5 w-5" />
          </button>
        }
      />

      <section className="px-5 grid grid-cols-3 gap-3 mb-6">
        <Stat label="Members" value="4" icon={<ShieldAlert className="h-4 w-4" />} tone="primary" />
        <Stat label="Reminders" value="3" icon={<Pill className="h-4 w-4" />} tone="secondary" />
        <Stat label="Vaccines" value="1" icon={<Syringe className="h-4 w-4" />} tone="accent" />
      </section>

      <section className="px-5 space-y-3 pb-8">
        {members.map((m) => (
          <Link
            key={m.id}
            to="/family"
            className="card-elevated p-4 flex items-center gap-3 hover:shadow-lift"
          >
            <div className={`relative h-14 w-14 rounded-2xl grid place-items-center font-bold text-lg shrink-0 ${toneMap[m.tone]}`}>
              {m.initials}
              {m.alert && <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-warning border-2 border-card" aria-label="Needs attention" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-foreground truncate">{m.name}</p>
                <span className="text-xs text-muted-foreground">• {m.age}</span>
              </div>
              <p className="text-xs text-muted-foreground">{m.role}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {m.conditions.map((c) => (
                  <span key={c} className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-muted text-foreground">{c}</span>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-secondary">
                <Calendar className="h-3.5 w-3.5" /> {m.next}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </Link>
        ))}
      </section>

      <section className="px-5 pb-8">
        <h2 className="text-sm font-bold mb-3">What's stored for each member</h2>
        <div className="grid grid-cols-2 gap-3">
          {["Medical history", "Allergies", "Medications", "Vaccinations", "Appointments", "Emergency contacts"].map((s) => (
            <div key={s} className="card-elevated p-3 text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> {s}
            </div>
          ))}
        </div>
      </section>

      <div className="mx-5 mb-6 rounded-2xl bg-primary-soft border border-primary/20 px-4 py-3 text-xs text-primary flex items-start gap-2">
        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
        <span>Family records are encrypted and stored on your device. You can share them with a health worker anytime.</span>
      </div>
    </MobileShell>
  );
}

function Stat({ label, value, icon, tone }: { label: string; value: string; icon: React.ReactNode; tone: "primary" | "secondary" | "accent" }) {
  const bg = { primary: "bg-primary-soft text-primary", secondary: "bg-secondary-soft text-secondary", accent: "bg-accent-soft text-accent-foreground" }[tone];
  return (
    <div className="card-elevated p-3">
      <div className={`h-8 w-8 rounded-xl grid place-items-center ${bg}`}>{icon}</div>
      <p className="mt-2 text-2xl font-extrabold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
