import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Plus,
  Users,
  Syringe,
  Pill,
  Activity,
  PhoneCall,
  ChevronRight,
  X,
  Calendar,
  ClipboardList,
  Droplet,
  Dna,
  ShieldAlert,
  HeartPulse,
  FileText,
  Upload,
  ScanLine,
  Bell,
  Check,
  Clock,
  AlertTriangle,
  Sparkles,
  Share2,
  Phone,
  MapPin,
  MoreHorizontal,
  Mic,
} from "lucide-react";
import { MobileShell, PageHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/family")({
  component: FamilyWallet,
});

// ---------- data ----------

type Status = "healthy" | "reminder" | "attention";

interface Member {
  id: string;
  name: string;
  relation: string;
  age: number;
  gender: "F" | "M";
  bloodGroup: string;
  genotype: string;
  initials: string;
  tone: "primary" | "secondary" | "accent" | "warm";
  status: Status;
  statusNote: string;
  allergies: string[];
  medications: { name: string; dose: string; when: string }[];
  conditions: string[];
  lastAssessment: string;
  vaccinations: { name: string; date: string; done: boolean }[];
  appointments: { title: string; date: string; place: string }[];
  emergencyContact: { name: string; relation: string; phone: string };
  notes: string;
}

const members: Member[] = [
  {
    id: "aisha",
    name: "Aisha Ibrahim",
    relation: "You",
    age: 31,
    gender: "F",
    bloodGroup: "O+",
    genotype: "AA",
    initials: "AI",
    tone: "primary",
    status: "healthy",
    statusNote: "Feeling well today • Bolori, Maiduguri",
    allergies: ["None known"],
    medications: [
      { name: "Iron supplement", dose: "60 mg", when: "Morning • pregnancy support" },
      { name: "Folic acid", dose: "5 mg", when: "Morning" },
    ],
    conditions: [],
    lastAssessment: "Today • Home care advised",
    vaccinations: [
      { name: "Tetanus booster", date: "Feb 2026", done: true },
      { name: "COVID-19", date: "Nov 2025", done: true },
    ],
    appointments: [{ title: "Antenatal check", date: "Aug 12", place: "Bolori PHC" }],
    emergencyContact: { name: "Ibrahim Ibrahim", relation: "Husband", phone: "080 3421 5566" },
    notes: "Tailor in Bolori. Speaks English & Hausa.",
  },
  {
    id: "ibrahim",
    name: "Ibrahim Ibrahim",
    relation: "Husband",
    age: 36,
    gender: "M",
    bloodGroup: "B+",
    genotype: "AS",
    initials: "IB",
    tone: "secondary",
    status: "reminder",
    statusNote: "Hypertension monitoring — check-up Monday",
    allergies: ["Penicillin"],
    medications: [{ name: "Amlodipine", dose: "5 mg", when: "Evening" }],
    conditions: ["Hypertension"],
    lastAssessment: "5 days ago • Visit clinic",
    vaccinations: [{ name: "Tetanus booster", date: "Jan 2025", done: true }],
    appointments: [{ title: "BP check-up", date: "Monday", place: "State Specialist Hospital" }],
    emergencyContact: { name: "Aisha Ibrahim", relation: "Wife", phone: "080 6677 1234" },
    notes: "Carries prescription card in wallet.",
  },
  {
    id: "fatima",
    name: "Fatima Ibrahim",
    relation: "Daughter",
    age: 6,
    gender: "F",
    bloodGroup: "O+",
    genotype: "AA",
    initials: "FA",
    tone: "accent",
    status: "reminder",
    statusNote: "Polio booster due tomorrow",
    allergies: ["None known"],
    medications: [
      { name: "Paracetamol syrup", dose: "5 ml", when: "As needed" },
    ],
    conditions: [],
    lastAssessment: "Yesterday • Visit nearby clinic",
    vaccinations: [
      { name: "Measles", date: "May 2021", done: true },
      { name: "Yellow fever", date: "May 2021", done: true },
      { name: "MenA", date: "Nov 2023", done: true },
      { name: "Polio booster", date: "Due Tomorrow", done: false },
    ],
    appointments: [{ title: "Polio booster", date: "Tomorrow", place: "Bolori PHC" }],
    emergencyContact: { name: "Aisha Ibrahim", relation: "Mother", phone: "080 6677 1234" },
    notes: "Bring vaccination card to every visit.",
  },
  {
    id: "musa",
    name: "Musa Ibrahim",
    relation: "Son",
    age: 10,
    gender: "M",
    bloodGroup: "A+",
    genotype: "AS",
    initials: "MU",
    tone: "warm",
    status: "healthy",
    statusNote: "Recovering well — finishing antibiotics",
    allergies: ["None known"],
    medications: [
      { name: "Amoxicillin", dose: "250 mg", when: "Every 8 hours" },
    ],
    conditions: ["Chest infection — recovering"],
    lastAssessment: "3 days ago • Home care",
    vaccinations: [
      { name: "BCG", date: "Birth", done: true },
      { name: "OPV / Penta 1–3", date: "2016", done: true },
      { name: "Measles", date: "2017", done: true },
    ],
    appointments: [{ title: "Follow-up review", date: "Friday", place: "Bolori PHC" }],
    emergencyContact: { name: "Aisha Ibrahim", relation: "Mother", phone: "080 6677 1234" },
    notes: "Prefers dispersible tablets in water.",
  },
];


const overviewStats = [
  { label: "Members", value: 4, total: 4, icon: Users, tone: "primary" as const },
  { label: "Vaccinations", value: 1, total: 3, icon: Syringe, tone: "secondary" as const },
  { label: "Meds today", value: 2, total: 3, icon: Pill, tone: "accent" as const },
  { label: "Assessments", value: 5, total: 5, icon: Activity, tone: "primary" as const },
  { label: "Emergency", value: 3, total: 3, icon: PhoneCall, tone: "destructive" as const },
];

type TimelineStatus = "done" | "upcoming" | "missed";
const timeline: {
  when: string;
  title: string;
  who: string;
  detail: string;
  status: TimelineStatus;
  icon: LucideIcon;
}[] = [
  { when: "Today • 8:00", title: "Iron supplement", who: "Aisha", detail: "Morning dose", status: "done", icon: Pill },
  { when: "Today • 14:00", title: "Amoxicillin", who: "Musa", detail: "250 mg • every 8 hrs", status: "upcoming", icon: Pill },
  { when: "Today • 20:00", title: "Amlodipine", who: "Ibrahim", detail: "BP medication", status: "upcoming", icon: Pill },
  { when: "Tomorrow", title: "Polio booster", who: "Fatima", detail: "Bolori PHC", status: "upcoming", icon: Syringe },
  { when: "Monday", title: "Hypertension check-up", who: "Ibrahim", detail: "State Specialist Hospital", status: "upcoming", icon: Calendar },
  { when: "Friday", title: "Follow-up review", who: "Musa", detail: "Bolori PHC", status: "upcoming", icon: Calendar },
];

const insights = [
  { title: "Fatima's polio booster is scheduled for tomorrow", tone: "info" as const, icon: Syringe },
  { title: "Musa completes his antibiotic course on Friday", tone: "success" as const, icon: Check },
  { title: "Ibrahim's blood pressure was slightly elevated last week", tone: "warning" as const, icon: AlertTriangle },
];

const documents = [
  { name: "Musa — Amoxicillin prescription", type: "Prescription", date: "Aug 6", icon: FileText },
  { name: "Fatima — Immunisation card", type: "Vaccination record", date: "Jul 2026", icon: FileText },
  { name: "Ibrahim — BP log", type: "Health record", date: "Aug 2026", icon: FileText },
];

// ---------- component ----------

function FamilyWallet() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openMember = members.find((m) => m.id === openId) ?? null;

  return (
    <MobileShell>
      <div className="animate-soft-in pb-4">
        <PageHeader
          title="Family Health Wallet"
          subtitle="Keep every member of your family healthy, organised and prepared."
          right={
            <button
              aria-label="Voice input"
              className="tap-target grid place-items-center h-11 w-11 rounded-2xl bg-muted text-foreground shadow-soft"
            >
              <Mic className="h-5 w-5" />
            </button>
          }
        />

        {/* Hero */}
        <section className="px-5">
          <div
            className="rounded-3xl p-5 border border-border shadow-soft relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary-soft), oklch(0.97 0.04 85))",
            }}
          >
            <FamilyIllustration className="absolute -right-6 -bottom-4 h-40 w-40 opacity-95" />
            <div className="relative max-w-[62%]">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-card px-2 py-1 rounded-full shadow-soft">
                <Sparkles className="h-3 w-3" /> Your family, one calm place
              </span>
              <h2 className="mt-3 text-xl font-bold text-foreground leading-snug">
                Care for everyone you love.
              </h2>
              <p className="text-sm text-foreground/70 mt-1.5 leading-relaxed">
                Records, reminders and vaccines — always with you.
              </p>
              <button className="tap-target mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-4 py-2.5 font-semibold text-sm shadow-lift active:scale-[0.98] transition-transform">
                <Plus className="h-4 w-4" /> Add Family Member
              </button>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="px-5 mt-6">
          <SectionTitle>Family Overview</SectionTitle>
          <div className="card-elevated p-4">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
              {overviewStats.map((s) => (
                <OverviewRing key={s.label} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* Members */}
        <section className="mt-6">
          <div className="px-5 flex items-center justify-between mb-2.5">
            <SectionTitle className="mb-0">Your Family</SectionTitle>
            <button className="text-xs font-semibold text-primary">Manage</button>
          </div>
          <div className="flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory no-scrollbar">
            {members.map((m) => (
              <MemberCard key={m.id} member={m} onOpen={() => setOpenId(m.id)} />
            ))}
            <button
              className="snap-start shrink-0 w-40 rounded-3xl border-2 border-dashed border-border grid place-items-center text-center px-3 py-6 hover:bg-muted/40 tap-target"
              aria-label="Add someone you care for"
            >
              <div className="h-11 w-11 rounded-2xl bg-primary-soft grid place-items-center mb-2">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs font-semibold text-foreground">Add Someone</p>
              <p className="text-[11px] text-muted-foreground">You Care For</p>
            </button>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-5 mt-6">
          <div className="flex items-center justify-between mb-2.5">
            <SectionTitle className="mb-0">Health Timeline</SectionTitle>
            <span className="text-[11px] text-muted-foreground">This week</span>
          </div>
          <div className="card-elevated p-4">
            <ol className="relative">
              <span className="absolute left-[19px] top-2 bottom-2 w-px bg-border" aria-hidden />
              {timeline.map((t, i) => (
                <TimelineRow key={i} {...t} delay={i * 60} />
              ))}
            </ol>
          </div>
        </section>

        {/* Emergency */}
        <section className="px-5 mt-6">
          <SectionTitle>Emergency Information</SectionTitle>
          <div
            className="rounded-3xl p-5 border border-destructive/20 shadow-soft"
            style={{
              background:
                "linear-gradient(135deg, var(--color-destructive-soft), oklch(0.97 0.04 85))",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-2xl bg-card grid place-items-center shadow-soft">
                <ShieldAlert className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">In case of emergency</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Show this to a health worker or trusted neighbour.
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <EmergencyTile label="Primary contact" value="Ibrahim Musa" />
              <EmergencyTile label="Phone" value="080 3421 5566" />
              <EmergencyTile label="Nearest hospital" value="UMTH, Maiduguri" />
              <EmergencyTile label="Blood groups" value="O+ · A+" />
              <EmergencyTile label="Allergies" value="Penicillin (Ibrahim)" />
              <EmergencyTile label="Meds in use" value="Amlodipine, ORS" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Link
                to="/emergency"
                className="tap-target rounded-2xl bg-destructive text-destructive-foreground font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" /> Call 112
              </Link>
              <button className="tap-target rounded-2xl bg-card border border-border font-semibold text-sm flex items-center justify-center gap-2 text-foreground">
                <Share2 className="h-4 w-4" /> Share card
              </button>
            </div>
          </div>
        </section>

        {/* Insights */}
        <section className="px-5 mt-6">
          <SectionTitle>Health Insights</SectionTitle>
          <div className="space-y-2.5">
            {insights.map((it, i) => (
              <InsightCard key={i} {...it} />
            ))}
          </div>
        </section>

        {/* Reminders */}
        <section className="px-5 mt-6">
          <div className="flex items-center justify-between mb-2.5">
            <SectionTitle className="mb-0">Upcoming Reminders</SectionTitle>
            <button className="text-xs font-semibold text-primary">See all</button>
          </div>
          <div className="space-y-2.5">
            <ReminderCard
              icon={Pill}
              title="Paracetamol syrup"
              who="Fatima"
              when="Today • 2:00 PM"
              tone="accent"
            />
            <ReminderCard
              icon={Syringe}
              title="Measles booster"
              who="Musa"
              when="Tomorrow • 9:30 AM"
              tone="primary"
            />
            <ReminderCard
              icon={Calendar}
              title="Follow-up appointment"
              who="Fatima"
              when="Friday • 10:00 AM"
              tone="secondary"
            />
          </div>
        </section>

        {/* Documents */}
        <section className="px-5 mt-6">
          <SectionTitle>Medical Documents</SectionTitle>
          <div className="grid grid-cols-2 gap-2.5">
            {documents.map((d) => (
              <div key={d.name} className="card-elevated p-4">
                <div className="h-10 w-10 rounded-xl bg-secondary-soft text-secondary grid place-items-center">
                  <d.icon className="h-5 w-5" />
                </div>
                <p className="mt-2.5 font-semibold text-sm text-foreground line-clamp-1">{d.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{d.type} • {d.date}</p>
              </div>
            ))}
            <button className="card-elevated p-4 text-left hover:shadow-card transition-shadow tap-target">
              <div className="h-10 w-10 rounded-xl bg-primary-soft text-primary grid place-items-center">
                <Upload className="h-5 w-5" />
              </div>
              <p className="mt-2.5 font-semibold text-sm text-foreground">Upload document</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Prescription, lab result…</p>
            </button>
            <button className="card-elevated p-4 text-left hover:shadow-card transition-shadow tap-target">
              <div className="h-10 w-10 rounded-xl bg-accent-soft text-accent-foreground grid place-items-center">
                <ScanLine className="h-5 w-5" />
              </div>
              <p className="mt-2.5 font-semibold text-sm text-foreground">Scan document</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Use your camera</p>
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3 flex items-start gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
            Documents are encrypted on your device. Share only when you choose.
          </p>
        </section>

        <div className="h-6" />
      </div>

      {openMember && <MemberSheet member={openMember} onClose={() => setOpenId(null)} />}
    </MobileShell>
  );
}

// ---------- pieces ----------

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-xs font-bold uppercase tracking-wider text-muted-foreground px-1 mb-2.5 ${className}`}>
      {children}
    </h2>
  );
}

type Tone = "primary" | "secondary" | "accent" | "destructive";
const toneVar: Record<Tone, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
  destructive: "var(--color-destructive)",
};
const toneBg: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary",
  secondary: "bg-secondary-soft text-secondary",
  accent: "bg-accent-soft text-accent-foreground",
  destructive: "bg-destructive-soft text-destructive",
};

function OverviewRing({
  label,
  value,
  total,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  total: number;
  icon: LucideIcon;
  tone: Tone;
}) {
  const pct = Math.max(0, Math.min(1, value / Math.max(total, 1)));
  const r = 22;
  const c = 2 * Math.PI * r;
  const dash = c * pct;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-14 w-14">
        <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
          <circle cx="28" cy="28" r={r} stroke="var(--color-muted)" strokeWidth="5" fill="none" />
          <circle
            cx="28"
            cy="28"
            r={r}
            stroke={toneVar[tone]}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${dash} ${c - dash}`}
            style={{ transition: "stroke-dasharray 700ms ease-out" }}
          />
        </svg>
        <span className={`absolute inset-0 grid place-items-center rounded-full ${toneBg[tone]} m-2`}>
          <Icon className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </div>
      <p className="mt-1.5 text-sm font-bold text-foreground leading-none">{value}</p>
      <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{label}</p>
    </div>
  );
}

const memberTone: Record<Member["tone"], string> = {
  primary: "linear-gradient(135deg, var(--color-primary), oklch(0.58 0.14 165))",
  secondary: "linear-gradient(135deg, var(--color-secondary), oklch(0.6 0.14 235))",
  accent: "linear-gradient(135deg, var(--color-accent), oklch(0.72 0.16 55))",
  warm: "linear-gradient(135deg, oklch(0.72 0.14 30), oklch(0.62 0.14 20))",
};

const statusDot: Record<Status, { bg: string; label: string; ring: string }> = {
  healthy: { bg: "bg-primary", label: "Healthy", ring: "ring-primary/30" },
  reminder: { bg: "bg-accent", label: "Reminder due", ring: "ring-accent/40" },
  attention: { bg: "bg-destructive", label: "Needs attention", ring: "ring-destructive/30" },
};

function MemberCard({ member, onOpen }: { member: Member; onOpen: () => void }) {
  const s = statusDot[member.status];
  return (
    <button
      onClick={onOpen}
      className="snap-start shrink-0 w-44 text-left card-elevated p-4 hover:shadow-lift active:scale-[0.98] transition-all"
    >
      <div className="flex items-start justify-between">
        <div
          className="relative h-14 w-14 rounded-2xl grid place-items-center text-primary-foreground font-bold shadow-soft"
          style={{ background: memberTone[member.tone] }}
          aria-hidden
        >
          {member.initials}
          <span className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card ${s.bg}`} />
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="mt-3 font-bold text-foreground truncate">{member.name}</p>
      <p className="text-[11px] text-muted-foreground">{member.relation} • {member.age}</p>
      <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-foreground inline-flex items-center gap-1">
          <Droplet className="h-2.5 w-2.5" /> {member.bloodGroup}
        </span>
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full inline-flex items-center gap-1 ${toneBg[member.status === "healthy" ? "primary" : member.status === "reminder" ? "accent" : "destructive"]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${s.bg}`} /> {s.label}
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground mt-2 line-clamp-2">{member.statusNote}</p>
    </button>
  );
}

function TimelineRow({
  when,
  title,
  who,
  detail,
  status,
  icon: Icon,
  delay,
}: {
  when: string;
  title: string;
  who: string;
  detail: string;
  status: TimelineStatus;
  icon: LucideIcon;
  delay: number;
}) {
  const style: Record<TimelineStatus, { badge: string; text: string; iconBg: string }> = {
    done: { badge: "bg-primary text-primary-foreground", text: "text-muted-foreground line-through", iconBg: "bg-primary-soft text-primary" },
    upcoming: { badge: "bg-secondary-soft text-secondary", text: "text-foreground", iconBg: "bg-secondary-soft text-secondary" },
    missed: { badge: "bg-accent-soft text-accent-foreground", text: "text-foreground", iconBg: "bg-accent-soft text-accent-foreground" },
  };
  const s = style[status];
  const StatusIcon = status === "done" ? Check : status === "missed" ? AlertTriangle : Clock;
  return (
    <li
      className="relative pl-12 py-2.5 animate-soft-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
    >
      <span className={`absolute left-2 top-3 h-8 w-8 rounded-xl grid place-items-center ${s.iconBg}`}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex items-center gap-2">
        <p className={`text-sm font-semibold ${s.text}`}>{title}</p>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-flex items-center gap-1 ${s.badge}`}>
          <StatusIcon className="h-2.5 w-2.5" />
          {status === "done" ? "Done" : status === "missed" ? "Missed" : "Upcoming"}
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground">{when} • {who}</p>
      <p className="text-[11px] text-muted-foreground/80 mt-0.5">{detail}</p>
    </li>
  );
}

function EmergencyTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card p-3 border border-border">
      <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">{label}</p>
      <p className="text-sm font-bold text-foreground mt-0.5 leading-tight">{value}</p>
    </div>
  );
}

function InsightCard({
  title,
  tone,
  icon: Icon,
}: {
  title: string;
  tone: "success" | "warning" | "info";
  icon: LucideIcon;
}) {
  const map = {
    success: "bg-primary-soft text-primary",
    warning: "bg-accent-soft text-accent-foreground",
    info: "bg-secondary-soft text-secondary",
  } as const;
  return (
    <div className="card-elevated p-4 flex items-start gap-3">
      <span className={`h-10 w-10 rounded-2xl grid place-items-center shrink-0 ${map[tone]}`}>
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-sm text-foreground leading-snug flex-1">{title}</p>
      <MoreHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
    </div>
  );
}

function ReminderCard({
  icon: Icon,
  title,
  who,
  when,
  tone,
}: {
  icon: LucideIcon;
  title: string;
  who: string;
  when: string;
  tone: Tone;
}) {
  return (
    <div className="card-elevated p-4">
      <div className="flex items-start gap-3">
        <span className={`h-11 w-11 rounded-2xl grid place-items-center shrink-0 ${toneBg[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground">{title}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{who} • {when}</p>
        </div>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        <MiniAction label="Done" icon={Check} tone="primary" />
        <MiniAction label="Snooze" icon={Clock} tone="secondary" />
        <MiniAction label="Reschedule" icon={Calendar} tone="accent" />
        <MiniAction label="Edit" icon={ClipboardList} tone="secondary" />
      </div>
    </div>
  );
}

function MiniAction({ label, icon: Icon, tone }: { label: string; icon: LucideIcon; tone: Tone }) {
  return (
    <button className={`tap-target rounded-xl py-2 text-[11px] font-semibold inline-flex items-center justify-center gap-1 ${toneBg[tone]}`}>
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

// ---------- Member sheet ----------

function MemberSheet({ member, onClose }: { member: Member; onClose: () => void }) {
  const s = statusDot[member.status];
  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-sheet-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] bg-background rounded-t-3xl sm:rounded-3xl max-h-[92dvh] overflow-y-auto shadow-lift animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div
          className="relative px-5 pt-5 pb-6"
          style={{ background: memberTone[member.tone] }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-16 w-16 rounded-2xl bg-card/20 backdrop-blur grid place-items-center text-primary-foreground font-bold text-xl shadow-soft">
                {member.initials}
              </div>
              <div className="min-w-0">
                <h2 id="member-sheet-title" className="text-xl font-bold text-primary-foreground truncate">
                  {member.name}
                </h2>
                <p className="text-xs text-primary-foreground/85">{member.relation} • {member.age} yrs • {member.gender === "F" ? "Female" : "Male"}</p>
                <span className={`mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-card/25 text-primary-foreground backdrop-blur`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${s.bg}`} /> {s.label}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="tap-target grid place-items-center h-10 w-10 rounded-2xl bg-card/25 text-primary-foreground backdrop-blur"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* vitals */}
          <div className="grid grid-cols-2 gap-2.5">
            <VitalTile icon={Droplet} label="Blood group" value={member.bloodGroup} tone="primary" />
            <VitalTile icon={Dna} label="Genotype" value={member.genotype} tone="secondary" />
            <VitalTile icon={ShieldAlert} label="Allergies" value={member.allergies.join(", ")} tone="accent" />
            <VitalTile icon={HeartPulse} label="Last assessment" value={member.lastAssessment} tone="primary" />
          </div>

          {/* medications */}
          <DetailCard icon={Pill} title="Current medications" tone="accent">
            {member.medications.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active medications.</p>
            ) : (
              <ul className="space-y-2">
                {member.medications.map((m) => (
                  <li key={m.name} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-semibold text-foreground">{m.name}</p>
                      <p className="text-[11px] text-muted-foreground">{m.dose} • {m.when}</p>
                    </div>
                    <button className="text-[11px] font-semibold text-primary">Edit</button>
                  </li>
                ))}
              </ul>
            )}
          </DetailCard>

          {/* conditions */}
          <DetailCard icon={ClipboardList} title="Medical conditions" tone="secondary">
            {member.conditions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No known conditions.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {member.conditions.map((c) => (
                  <span key={c} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary-soft text-secondary">
                    {c}
                  </span>
                ))}
              </div>
            )}
          </DetailCard>

          {/* vaccinations */}
          <DetailCard icon={Syringe} title="Vaccination history" tone="primary">
            <ul className="space-y-2">
              {member.vaccinations.map((v) => (
                <li key={v.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`h-6 w-6 rounded-lg grid place-items-center ${v.done ? "bg-primary-soft text-primary" : "bg-accent-soft text-accent-foreground"}`}>
                      {v.done ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{v.name}</p>
                      <p className="text-[11px] text-muted-foreground">{v.date}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.done ? "bg-primary-soft text-primary" : "bg-accent-soft text-accent-foreground"}`}>
                    {v.done ? "Complete" : "Due"}
                  </span>
                </li>
              ))}
            </ul>
          </DetailCard>

          {/* appointments */}
          <DetailCard icon={Calendar} title="Upcoming appointments" tone="secondary">
            <ul className="space-y-2">
              {member.appointments.map((a) => (
                <li key={a.title} className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground">{a.date} • {a.place}</p>
                  </div>
                </li>
              ))}
            </ul>
          </DetailCard>

          {/* emergency */}
          <DetailCard icon={PhoneCall} title="Emergency contact" tone="destructive">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{member.emergencyContact.name}</p>
                <p className="text-[11px] text-muted-foreground">{member.emergencyContact.relation} • {member.emergencyContact.phone}</p>
              </div>
              <a
                href={`tel:${member.emergencyContact.phone.replace(/\s/g, "")}`}
                className="tap-target rounded-2xl bg-destructive text-destructive-foreground font-semibold text-sm px-4 inline-flex items-center gap-2"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>
          </DetailCard>

          {/* notes */}
          <DetailCard icon={FileText} title="Health notes" tone="primary">
            <p className="text-sm text-foreground/80 leading-relaxed">{member.notes}</p>
          </DetailCard>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button className="tap-target rounded-2xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" /> Add record
            </button>
            <button className="tap-target rounded-2xl bg-card border border-border font-semibold text-sm text-foreground flex items-center justify-center gap-2">
              <Share2 className="h-4 w-4" /> Share profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VitalTile({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: Tone;
}) {
  return (
    <div className="card-elevated p-3 flex items-start gap-2.5">
      <span className={`h-9 w-9 rounded-xl grid place-items-center shrink-0 ${toneBg[tone]}`}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">{label}</p>
        <p className="text-sm font-bold text-foreground leading-tight mt-0.5 truncate">{value}</p>
      </div>
    </div>
  );
}

function DetailCard({
  icon: Icon,
  title,
  tone,
  children,
}: {
  icon: LucideIcon;
  title: string;
  tone: Tone;
  children: React.ReactNode;
}) {
  return (
    <div className="card-elevated p-4">
      <div className="flex items-center gap-2.5 mb-3">
        <span className={`h-9 w-9 rounded-xl grid place-items-center ${toneBg[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="font-bold text-foreground text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ---------- illustration ----------

function FamilyIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <linearGradient id="famSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.95 0.05 85)" />
          <stop offset="100%" stopColor="oklch(0.92 0.06 70)" />
        </linearGradient>
        <pattern id="famPat" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 7 H14" stroke="oklch(0.66 0.14 155 / 0.15)" strokeWidth="1" />
        </pattern>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#famSky)" />
      <circle cx="100" cy="100" r="90" fill="url(#famPat)" />
      {/* sun */}
      <circle cx="150" cy="55" r="16" fill="oklch(0.82 0.14 80)" opacity="0.85" />

      {/* Mother w/ hijab */}
      <g transform="translate(40 70)">
        <path d="M25 30 Q25 5 45 5 Q65 5 65 30 L65 55 Q45 62 25 55 Z" fill="oklch(0.55 0.13 20)" />
        <circle cx="45" cy="35" r="14" fill="oklch(0.82 0.06 55)" />
        <path d="M31 35 Q45 22 59 35 L59 26 Q45 14 31 26 Z" fill="oklch(0.55 0.13 20)" />
        <rect x="20" y="55" width="50" height="55" rx="10" fill="oklch(0.66 0.14 155)" />
        <path d="M20 68 Q45 62 70 68" stroke="oklch(0.55 0.11 155)" strokeWidth="2" fill="none" />
      </g>

      {/* Father */}
      <g transform="translate(95 78)">
        <circle cx="30" cy="26" r="13" fill="oklch(0.78 0.06 55)" />
        <path d="M17 22 Q30 8 43 22 L43 18 Q30 4 17 18 Z" fill="oklch(0.28 0.03 55)" />
        <rect x="8" y="40" width="44" height="52" rx="10" fill="oklch(0.7 0.11 235)" />
        <path d="M20 40 L30 52 L40 40" stroke="oklch(0.98 0 0)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Child */}
      <g transform="translate(85 130)">
        <circle cx="18" cy="18" r="10" fill="oklch(0.84 0.05 55)" />
        <rect x="4" y="30" width="28" height="30" rx="8" fill="oklch(0.82 0.14 80)" />
        <circle cx="14" cy="16" r="2" fill="oklch(0.28 0.03 55)" />
        <circle cx="22" cy="16" r="2" fill="oklch(0.28 0.03 55)" />
        <path d="M14 22 Q18 25 22 22" stroke="oklch(0.28 0.03 55)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Small child */}
      <g transform="translate(130 140)">
        <circle cx="14" cy="14" r="9" fill="oklch(0.8 0.06 55)" />
        <rect x="2" y="24" width="26" height="26" rx="8" fill="oklch(0.62 0.14 20)" />
      </g>

      {/* Heart */}
      <g transform="translate(150 90)">
        <path d="M8 4 C4 0 -2 4 2 10 L8 18 L14 10 C18 4 12 0 8 4 Z" fill="oklch(0.66 0.14 155)" />
      </g>
    </svg>
  );
}
