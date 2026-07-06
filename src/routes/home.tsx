import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import {
  AlertCircle, Baby, BookOpen, Calendar, ChevronRight, HeartPulse,
  MapPin, Phone, Pill, ShieldAlert, Sparkles, Sun,
} from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

function HomePage() {
  return (
    <MobileShell>
      <section className="px-5 pt-8 pb-6 bg-gradient-to-b from-primary-soft to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary flex items-center gap-1.5">
              <Sun className="h-4 w-4" /> Good morning
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1">Aisha</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Maiduguri • How's your family today?</p>
          </div>
          <Link to="/profile" className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center font-bold text-lg shadow-soft" aria-label="Profile">
            AI
          </Link>
        </div>

        <Link
          to="/emergency"
          className="mt-5 flex items-center gap-3 rounded-2xl bg-danger text-danger-foreground px-4 py-3 shadow-lift tap-target"
        >
          <ShieldAlert className="h-5 w-5 shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-sm">Emergency help</p>
            <p className="text-xs opacity-90">One tap to call, find, and share your location</p>
          </div>
          <ChevronRight className="h-5 w-5" />
        </Link>
      </section>

      <section className="px-5 pb-6">
        <h2 className="text-sm font-bold text-foreground mb-3">Quick actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <QuickAction to="/assessment" title="Health check" desc="Guided next step" icon={<HeartPulse className="h-5 w-5" />} tone="primary" />
          <QuickAction to="/medications" title="Medicines" desc="Today's reminders" icon={<Pill className="h-5 w-5" />} tone="secondary" />
          <QuickAction to="/mother-child" title="Mother & child" desc="Pregnancy & baby" icon={<Baby className="h-5 w-5" />} tone="accent" />
          <QuickAction to="/finder" title="Find care" desc="Clinics nearby" icon={<MapPin className="h-5 w-5" />} tone="neutral" />
        </div>
      </section>

      <section className="px-5 pb-6">
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-secondary-soft text-secondary grid place-items-center">
              <Pill className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground">Next reminder</p>
              <p className="text-xs text-muted-foreground">In 12 minutes</p>
            </div>
            <span className="text-xs font-semibold text-secondary bg-secondary-soft px-2 py-1 rounded-lg">8:00 AM</span>
          </div>
          <div className="rounded-2xl bg-muted/60 p-4">
            <p className="font-semibold text-foreground">Paracetamol 500mg</p>
            <p className="text-sm text-muted-foreground mt-0.5">For Fatima • 1 tablet with water after food</p>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 tap-target rounded-xl bg-primary text-primary-foreground font-semibold text-sm">Mark taken</button>
            <button className="tap-target rounded-xl border border-border px-4 font-semibold text-sm text-foreground">Snooze</button>
          </div>
        </Card>
      </section>

      <section className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold">Your family</h2>
          <Link to="/family" className="text-xs font-semibold text-primary flex items-center gap-1">See all <ChevronRight className="h-3 w-3" /></Link>
        </div>
        <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-2">
          <FamilyChip name="Ibrahim" role="Husband" initials="IB" alert={false} />
          <FamilyChip name="Fatima" role="Daughter, 5" initials="FA" alert />
          <FamilyChip name="Musa" role="Son, 2" initials="MU" alert={false} />
          <FamilyChip name="Add" role="New member" initials="+" isAdd />
        </div>
      </section>

      <section className="px-5 pb-6">
        <Card>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent-soft text-accent-foreground grid place-items-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-accent-foreground uppercase tracking-wider">Health tip of the day</p>
              <p className="font-bold text-foreground mt-1">Clean water saves lives</p>
              <p className="text-sm text-muted-foreground mt-1">Boil drinking water for at least 3 minutes during the rainy season to prevent cholera in your household.</p>
              <Link to="/library" className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-primary">
                Read more <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Card>
      </section>

      <section className="px-5 pb-8">
        <h2 className="text-sm font-bold mb-3">Recent activity</h2>
        <div className="space-y-3">
          <ActivityRow
            icon={<HeartPulse className="h-4 w-4" />}
            tone="warning"
            title="Fatima — Fever assessment"
            body="Recommended: Visit a nearby clinic"
            time="Yesterday"
          />
          <ActivityRow
            icon={<Calendar className="h-4 w-4" />}
            tone="secondary"
            title="Vaccination reminder"
            body="Musa's measles booster in 2 days"
            time="Upcoming"
          />
          <ActivityRow
            icon={<BookOpen className="h-4 w-4" />}
            tone="primary"
            title="Read: Malaria prevention"
            body="Saved to your library"
            time="3 days ago"
          />
        </div>
      </section>

      <div className="mx-5 mb-4 rounded-2xl bg-muted/60 border border-border px-4 py-3 text-xs text-muted-foreground flex items-start gap-2">
        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
        <span>This guidance does not replace professional medical advice. Always consult a qualified healthcare worker for serious concerns.</span>
      </div>
    </MobileShell>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="card-elevated p-4">{children}</div>;
}

function QuickAction({
  to, title, desc, icon, tone,
}: {
  to: string; title: string; desc: string; icon: React.ReactNode;
  tone: "primary" | "secondary" | "accent" | "neutral";
}) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary-soft text-secondary",
    accent: "bg-accent-soft text-accent-foreground",
    neutral: "bg-muted text-foreground",
  };
  return (
    <Link to={to} className="card-elevated p-4 flex flex-col gap-3 hover:shadow-lift transition-shadow">
      <div className={`h-10 w-10 rounded-xl grid place-items-center ${tones[tone]}`}>{icon}</div>
      <div>
        <p className="font-bold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </Link>
  );
}

function FamilyChip({ name, role, initials, alert, isAdd }: { name: string; role: string; initials: string; alert?: boolean; isAdd?: boolean }) {
  return (
    <Link
      to="/family"
      className={`shrink-0 w-32 card-elevated p-3 flex flex-col items-center text-center ${isAdd ? "border-dashed" : ""}`}
    >
      <div className={`relative h-14 w-14 rounded-2xl grid place-items-center font-bold text-lg ${isAdd ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`}>
        {initials}
        {alert && <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-warning border-2 border-card" />}
      </div>
      <p className="mt-2 font-semibold text-sm text-foreground truncate w-full">{name}</p>
      <p className="text-xs text-muted-foreground truncate w-full">{role}</p>
    </Link>
  );
}

function ActivityRow({ icon, tone, title, body, time }: { icon: React.ReactNode; tone: "primary" | "secondary" | "warning"; title: string; body: string; time: string }) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary-soft text-secondary",
    warning: "bg-accent-soft text-accent-foreground",
  };
  return (
    <div className="card-elevated p-3 flex items-center gap-3">
      <div className={`h-9 w-9 rounded-xl grid place-items-center shrink-0 ${tones[tone]}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{body}</p>
      </div>
      <span className="text-[11px] text-muted-foreground font-medium shrink-0">{time}</span>
    </div>
  );
}
