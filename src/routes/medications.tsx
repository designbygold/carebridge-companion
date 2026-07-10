import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import { Check, Clock, Coffee, Moon, MoreHorizontal, Pill, Plus, Sun, Sunset } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/medications")({
  component: MedsPage,
});

type Slot = "morning" | "afternoon" | "evening" | "night";

type Med = { id: string; name: string; dose: string; who: string; time: string; slot: Slot; done?: boolean };

const initialMeds: Med[] = [
  { id: "1", name: "Paracetamol", dose: "500 mg • 1 tablet", who: "Fatima", time: "8:00 AM", slot: "morning", done: true },
  { id: "2", name: "Iron supplement", dose: "60 mg • pregnancy support", who: "Aisha", time: "8:30 AM", slot: "morning" },
  { id: "3", name: "Vitamin A", dose: "Scheduled tomorrow", who: "Fatima", time: "Tomorrow", slot: "morning" },
  { id: "4", name: "Amoxicillin", dose: "250 mg • every 8 hours", who: "Musa", time: "2:00 PM", slot: "afternoon" },
  { id: "5", name: "Amoxicillin", dose: "250 mg • every 8 hours", who: "Musa", time: "10:00 PM", slot: "night" },
  { id: "6", name: "Amlodipine", dose: "5 mg • hypertension", who: "Ibrahim", time: "8:00 PM", slot: "evening" },
];

const slotConfig: Record<Slot, { label: string; icon: React.ReactNode; tone: string }> = {
  morning: { label: "Morning", icon: <Sun className="h-4 w-4" />, tone: "bg-accent-soft text-accent-foreground" },
  afternoon: { label: "Afternoon", icon: <Coffee className="h-4 w-4" />, tone: "bg-primary-soft text-primary" },
  evening: { label: "Evening", icon: <Sunset className="h-4 w-4" />, tone: "bg-secondary-soft text-secondary" },
  night: { label: "Night", icon: <Moon className="h-4 w-4" />, tone: "bg-muted text-foreground" },
};

function MedsPage() {
  const [meds, setMeds] = useState(initialMeds);
  const done = meds.filter((m) => m.done).length;

  function toggle(id: string) {
    setMeds((prev) => prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)));
  }

  return (
    <MobileShell>
      <PageHeader title="Medications" subtitle="Today's timeline" back="/home"
        right={
          <button aria-label="Add medication" className="tap-target grid place-items-center h-11 w-11 rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <Plus className="h-5 w-5" />
          </button>
        }
      />

      <section className="px-5 mb-6">
        <div className="card-elevated p-4 flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-muted)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={`${(done / meds.length) * 94.2} 94.2`} />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-sm font-bold">{done}/{meds.length}</div>
          </div>
          <div>
            <p className="font-bold text-foreground">Great progress today</p>
            <p className="text-sm text-muted-foreground">{meds.length - done} more to go. Keep it up!</p>
          </div>
        </div>
      </section>

      {(["morning", "afternoon", "evening", "night"] as Slot[]).map((slot) => {
        const items = meds.filter((m) => m.slot === slot);
        if (!items.length) return null;
        const cfg = slotConfig[slot];
        return (
          <section key={slot} className="px-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className={`h-8 w-8 rounded-xl grid place-items-center ${cfg.tone}`}>{cfg.icon}</div>
              <h2 className="text-sm font-bold text-foreground">{cfg.label}</h2>
              <span className="text-xs text-muted-foreground">• {items.length} {items.length === 1 ? "dose" : "doses"}</span>
            </div>
            <div className="space-y-3">
              {items.map((m) => <MedCard key={m.id} med={m} onToggle={() => toggle(m.id)} />)}
            </div>
          </section>
        );
      })}
    </MobileShell>
  );
}

function MedCard({ med, onToggle }: { med: Med; onToggle: () => void }) {
  return (
    <div className={`card-elevated p-4 flex items-center gap-3 transition-opacity ${med.done ? "opacity-60" : ""}`}>
      <button
        onClick={onToggle}
        aria-label={med.done ? "Mark as not taken" : "Mark as taken"}
        className={`tap-target h-11 w-11 rounded-2xl grid place-items-center shrink-0 border-2 transition-colors ${
          med.done ? "bg-primary border-primary text-primary-foreground" : "border-border bg-card text-transparent hover:border-primary"
        }`}
      >
        <Check className="h-5 w-5" strokeWidth={3} />
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Pill className="h-4 w-4 text-secondary shrink-0" />
          <p className={`font-bold text-foreground truncate ${med.done ? "line-through" : ""}`}>{med.name}</p>
        </div>
        <p className="text-xs text-muted-foreground">{med.dose} • For {med.who}</p>
        <p className="text-xs text-primary font-semibold flex items-center gap-1 mt-1"><Clock className="h-3 w-3" /> {med.time}</p>
      </div>
      <button aria-label="More options" className="tap-target grid place-items-center h-11 w-11 rounded-xl hover:bg-muted text-muted-foreground shrink-0">
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </div>
  );
}
