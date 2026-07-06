import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import { Apple, Baby, Calendar, Heart, ShieldAlert, Syringe } from "lucide-react";

export const Route = createFileRoute("/mother-child")({
  component: MotherChildPage,
});

function MotherChildPage() {
  const week = 24;
  const total = 40;
  const pct = (week / total) * 100;

  return (
    <MobileShell>
      <PageHeader title="Mother & Child" subtitle="Care for you and your little ones" back="/home" />

      <section className="px-5 mb-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-[#158a5c] text-white p-5 shadow-lift">
          <p className="text-xs font-bold uppercase tracking-wider opacity-90">Pregnancy tracker</p>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-4xl font-extrabold">Week {week}</p>
              <p className="text-sm opacity-90">Second trimester • 16 weeks to go</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/15 grid place-items-center">
              <Baby className="h-8 w-8" />
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/25 overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-3 text-sm opacity-90">Baby is about the size of a mango. Focus on iron-rich foods this week.</p>
        </div>
      </section>

      <section className="px-5 mb-6">
        <h2 className="text-sm font-bold mb-3">This week's care</h2>
        <div className="grid grid-cols-2 gap-3">
          <CareCard icon={<Calendar className="h-5 w-5" />} title="Antenatal visit" desc="Sat, Aug 9 • UMTH clinic" tone="primary" />
          <CareCard icon={<Apple className="h-5 w-5" />} title="Nutrition plan" desc="Iron, folate, leafy greens" tone="secondary" />
          <CareCard icon={<Heart className="h-5 w-5" />} title="Wellness check" desc="Track kicks & rest" tone="accent" />
          <CareCard icon={<ShieldAlert className="h-5 w-5" />} title="Danger signs" desc="Learn the warnings" tone="danger" />
        </div>
      </section>

      <section className="px-5 mb-6">
        <h2 className="text-sm font-bold mb-3">Baby growth — Musa (2y)</h2>
        <div className="card-elevated p-4">
          <div className="grid grid-cols-3 gap-3">
            <Metric label="Weight" value="12.4kg" trend="+0.3" />
            <Metric label="Height" value="86cm" trend="+1.5" />
            <Metric label="Head" value="48cm" trend="Normal" />
          </div>
          <div className="mt-4 rounded-2xl bg-primary-soft p-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center">
              <Heart className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <p className="text-sm text-foreground"><span className="font-bold">Growing well.</span> Keep varied meals and regular sleep.</p>
          </div>
        </div>
      </section>

      <section className="px-5 mb-8">
        <h2 className="text-sm font-bold mb-3">Vaccination schedule</h2>
        <div className="space-y-3">
          <VaxRow name="Measles booster" who="Musa" due="Aug 10, 2026" status="due" />
          <VaxRow name="Yellow fever" who="Musa" due="Completed" status="done" />
          <VaxRow name="Vitamin A" who="Fatima" due="Sep 2, 2026" status="upcoming" />
        </div>
      </section>

      <section className="px-5 mb-8">
        <div className="card-elevated p-4 border-l-4 border-danger">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="h-5 w-5 text-danger" />
            <p className="font-bold text-foreground">Know the danger signs</p>
          </div>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex gap-2"><span className="text-danger">•</span> Heavy bleeding or severe abdominal pain</li>
            <li className="flex gap-2"><span className="text-danger">•</span> Baby's kicks noticeably reduced</li>
            <li className="flex gap-2"><span className="text-danger">•</span> Severe headache or blurred vision</li>
            <li className="flex gap-2"><span className="text-danger">•</span> High fever or convulsions</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">If any of these appear, go to the nearest clinic immediately.</p>
        </div>
      </section>
    </MobileShell>
  );
}

function CareCard({ icon, title, desc, tone }: { icon: React.ReactNode; title: string; desc: string; tone: "primary" | "secondary" | "accent" | "danger" }) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary-soft text-secondary",
    accent: "bg-accent-soft text-accent-foreground",
    danger: "bg-destructive-soft text-danger",
  };
  return (
    <div className="card-elevated p-4">
      <div className={`h-10 w-10 rounded-xl grid place-items-center ${tones[tone]}`}>{icon}</div>
      <p className="mt-3 font-bold text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
    </div>
  );
}

function Metric({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-extrabold text-lg text-foreground mt-1">{value}</p>
      <p className="text-[11px] text-primary font-semibold">{trend}</p>
    </div>
  );
}

function VaxRow({ name, who, due, status }: { name: string; who: string; due: string; status: "due" | "done" | "upcoming" }) {
  const style = {
    due: { bg: "bg-warning", label: "Due soon" },
    done: { bg: "bg-success", label: "Completed" },
    upcoming: { bg: "bg-secondary", label: "Upcoming" },
  }[status];
  return (
    <div className="card-elevated p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-secondary-soft text-secondary grid place-items-center shrink-0">
        <Syringe className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-foreground text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">{who} • {due}</p>
      </div>
      <span className={`text-[11px] font-bold text-white px-2 py-1 rounded-lg ${style.bg}`}>{style.label}</span>
    </div>
  );
}
