import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Ambulance,
  ArrowRight,
  Baby,
  Bell,
  BookOpen,
  CalendarClock,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Droplets,
  Ear,
  Heart,
  HeartPulse,
  Home,
  MapPin,
  Mic,
  MoreHorizontal,
  Navigation,
  Phone,
  Pill,
  Save,
  Search,
  Share2,
  Shield,
  ShieldCheck,
  Siren,
  Sparkles,
  Stethoscope,
  Thermometer,
  User,
  Users,
  Wallet,
  WifiOff,
  Wind,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

export const Route = createFileRoute("/assessment")({
  component: AssessmentPage,
});

type Who = "me" | "child" | "family";
type Age = "infant" | "child" | "teen" | "adult" | "older";
type Severity = "very-mild" | "mild" | "moderate" | "severe" | "emergency";
type Duration = "today" | "1-2" | "3-7" | "week+";

type Answers = {
  who?: Who;
  age?: Age;
  concern?: string;
  duration?: Duration;
  severity?: Severity;
  dangers: string[];
};

// intro + 7 question steps + summary + result = 10 screens; progress uses questions 1..8
const TOTAL_QUESTIONS = 7;

function AssessmentPage() {
  const [step, setStep] = useState(0); // 0 intro, 1..7 questions, 8 summary, 9 result
  const [answers, setAnswers] = useState<Answers>({ dangers: [] });
  const [offline, setOffline] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  function back() {
    if (step === 0) navigate({ to: "/home" });
    else setStep((s) => s - 1);
  }
  function next() {
    setStep((s) => s + 1);
  }
  function jumpTo(q: number) {
    setStep(q);
  }

  const showProgress = step >= 1 && step <= TOTAL_QUESTIONS;

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-[480px] min-h-dvh flex flex-col safe-bottom">
        <header className="px-5 pt-6 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={back}
              className="tap-target grid place-items-center h-11 w-11 -ml-2 rounded-2xl hover:bg-muted"
              aria-label="Back"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Lafiya Guide</p>
              {showProgress && (
                <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                  Question {step} of {TOTAL_QUESTIONS}
                </p>
              )}
            </div>
            {offline && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                <WifiOff className="h-3 w-3" /> Offline
              </span>
            )}
          </div>
          {showProgress && (
            <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / TOTAL_QUESTIONS) * 100}%` }}
              />
            </div>
          )}
        </header>

        <main key={step} className="flex-1 px-5 pb-6 flex flex-col animate-soft-in">
          {step === 0 && <IntroStep onStart={next} />}
          {step === 1 && (
            <WhoStep
              value={answers.who}
              onSelect={(v) => {
                setAnswers({ ...answers, who: v });
                next();
              }}
            />
          )}
          {step === 2 && (
            <AgeStep
              value={answers.age}
              onSelect={(v) => {
                setAnswers({ ...answers, age: v });
                next();
              }}
            />
          )}
          {step === 3 && (
            <ConcernStep
              value={answers.concern}
              onSelect={(v) => {
                setAnswers({ ...answers, concern: v });
                next();
              }}
            />
          )}
          {step === 4 && (
            <DurationStep
              value={answers.duration}
              onSelect={(v) => {
                setAnswers({ ...answers, duration: v });
                next();
              }}
            />
          )}
          {step === 5 && (
            <SeverityStep
              value={answers.severity}
              onSelect={(v) => {
                setAnswers({ ...answers, severity: v });
                next();
              }}
            />
          )}
          {step === 6 && (
            <DangerStep
              value={answers.dangers}
              onChange={(v) => setAnswers({ ...answers, dangers: v })}
              onNext={next}
            />
          )}
          {step === 7 && <ReviewStep answers={answers} onConfirm={next} onEdit={jumpTo} />}
          {step === 8 && <AnalyzingStep onDone={next} />}
          {step === 9 && <ResultStep answers={answers} />}
        </main>
      </div>
    </div>
  );
}

/* -------------------- shared UI -------------------- */

function StepHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
      )}
      <h1 className="text-[26px] leading-tight font-extrabold tracking-tight mt-1 text-foreground">
        {title}
      </h1>
      {sub && <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">{sub}</p>}
    </div>
  );
}

function OptionCard({
  icon,
  label,
  sub,
  active,
  onClick,
  trailing,
}: {
  icon?: ReactNode;
  label: string;
  sub?: string;
  active?: boolean;
  onClick: () => void;
  trailing?: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full tap-target rounded-3xl border-2 px-4 py-4 text-left flex items-center gap-4 transition-all ${
        active
          ? "border-primary bg-primary-soft"
          : "border-border bg-card hover:border-primary/40 shadow-soft"
      }`}
    >
      {icon && (
        <div
          className={`h-12 w-12 rounded-2xl grid place-items-center shrink-0 ${
            active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
          }`}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-foreground text-[15px]">{label}</p>
        {sub && <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{sub}</p>}
      </div>
      {trailing ??
        (active ? (
          <Check className="h-5 w-5 text-primary" strokeWidth={3} />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground/60" />
        ))}
    </button>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="tap-target w-full flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-lift disabled:opacity-40 disabled:shadow-none transition-all active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

function MedicalDisclaimer() {
  return (
    <div className="rounded-2xl bg-muted/60 border border-border px-4 py-3 text-[12px] leading-relaxed text-muted-foreground flex items-start gap-2">
      <Shield className="h-4 w-4 shrink-0 mt-0.5" />
      <span>
        This guidance is educational and should not replace advice from a qualified healthcare
        professional.
      </span>
    </div>
  );
}

/* -------------------- Intro -------------------- */

function IntroIllustration() {
  return (
    <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-primary-soft via-secondary-soft to-accent-soft aspect-[5/4] shadow-soft">
      <svg viewBox="0 0 400 320" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.95 0.04 155)" />
            <stop offset="100%" stopColor="oklch(0.97 0.04 85)" />
          </linearGradient>
          <pattern id="textile" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 12 L12 0 L24 12 L12 24 Z" fill="none" stroke="oklch(0.66 0.14 155 / 0.15)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="320" fill="url(#sky)" />
        <rect width="400" height="320" fill="url(#textile)" />
        {/* sun */}
        <circle cx="330" cy="70" r="34" fill="oklch(0.82 0.14 80 / 0.6)" />
        {/* horizon hill */}
        <path d="M0 240 Q 100 200 200 220 T 400 230 L400 320 L0 320 Z" fill="oklch(0.66 0.14 155 / 0.25)" />
        {/* mother */}
        <g transform="translate(110 130)">
          <circle cx="0" cy="0" r="22" fill="oklch(0.55 0.06 40)" />
          <path d="M-30 24 Q -30 90 0 100 Q 30 90 30 24 Z" fill="oklch(0.66 0.14 155)" />
          {/* headwrap */}
          <path d="M-24 -8 Q -20 -30 0 -28 Q 20 -30 24 -8 Z" fill="oklch(0.62 0.2 25)" />
        </g>
        {/* child */}
        <g transform="translate(170 170)">
          <circle cx="0" cy="0" r="14" fill="oklch(0.6 0.06 40)" />
          <path d="M-18 16 Q -18 60 0 66 Q 18 60 18 16 Z" fill="oklch(0.82 0.14 80)" />
        </g>
        {/* CHW */}
        <g transform="translate(240 130)">
          <circle cx="0" cy="0" r="22" fill="oklch(0.58 0.06 40)" />
          <path d="M-30 24 Q -30 90 0 100 Q 30 90 30 24 Z" fill="oklch(0.7 0.11 235)" />
          {/* cross */}
          <rect x="-6" y="40" width="12" height="4" fill="white" />
          <rect x="-2" y="36" width="4" height="12" fill="white" />
        </g>
        {/* baby */}
        <g transform="translate(290 180)">
          <circle cx="0" cy="0" r="11" fill="oklch(0.62 0.06 40)" />
          <path d="M-14 12 Q -14 46 0 50 Q 14 46 14 12 Z" fill="oklch(0.95 0.04 85)" />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <>
      <div className="mb-5">
        <IntroIllustration />
      </div>
      <h1 className="text-[28px] leading-tight font-extrabold tracking-tight text-foreground">
        Let's understand what's happening.
      </h1>
      <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">
        Answer a few simple questions so we can recommend the safest next step for you and your
        family.
      </p>

      <div className="mt-5 card-elevated p-4 space-y-3">
        <TrustRow>Educational guidance only</TrustRow>
        <TrustRow>Not a medical diagnosis</TrustRow>
        <TrustRow>Your information stays private</TrustRow>
      </div>

      <div className="flex-1" />

      <div className="space-y-3 mt-6">
        <PrimaryButton onClick={onStart}>
          <Sparkles className="h-4 w-4" /> Start Assessment
        </PrimaryButton>
        <p className="text-center text-xs text-muted-foreground">Available in English • Hausa</p>
      </div>
    </>
  );
}

function TrustRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-7 w-7 rounded-full bg-primary-soft grid place-items-center shrink-0">
        <Check className="h-4 w-4 text-primary" strokeWidth={3} />
      </span>
      <p className="text-sm font-semibold text-foreground">{children}</p>
    </div>
  );
}

/* -------------------- Step 1: Who -------------------- */

const WHO_OPTIONS: { v: Who; label: string; sub: string; icon: ReactNode }[] = [
  { v: "me", label: "Me", sub: "I need guidance for myself", icon: <User className="h-5 w-5" /> },
  { v: "child", label: "My Child", sub: "A child in my care", icon: <Baby className="h-5 w-5" /> },
  { v: "family", label: "Another Family Member", sub: "Spouse, parent or relative", icon: <Users className="h-5 w-5" /> },
];

function WhoStep({ value, onSelect }: { value?: Who; onSelect: (v: Who) => void }) {
  return (
    <>
      <StepHeader eyebrow="Step 1" title="Who needs help today?" sub="Choose the person you'd like guidance for." />
      <div className="space-y-3">
        {WHO_OPTIONS.map((o) => (
          <OptionCard
            key={o.v}
            label={o.label}
            sub={o.sub}
            icon={o.icon}
            active={value === o.v}
            onClick={() => onSelect(o.v)}
          />
        ))}
      </div>
    </>
  );
}

/* -------------------- Step 2: Age -------------------- */

const AGE_OPTIONS: { v: Age; label: string; sub: string }[] = [
  { v: "infant", label: "Infant", sub: "0 – 1 year" },
  { v: "child", label: "Child", sub: "2 – 12 years" },
  { v: "teen", label: "Teenager", sub: "13 – 17 years" },
  { v: "adult", label: "Adult", sub: "18 – 59 years" },
  { v: "older", label: "Older Adult", sub: "60+ years" },
];

function AgeStep({ value, onSelect }: { value?: Age; onSelect: (v: Age) => void }) {
  return (
    <>
      <StepHeader eyebrow="Step 2" title="What is their age group?" />
      <div className="space-y-3">
        {AGE_OPTIONS.map((o) => (
          <OptionCard
            key={o.v}
            label={o.label}
            sub={o.sub}
            active={value === o.v}
            onClick={() => onSelect(o.v)}
          />
        ))}
      </div>
    </>
  );
}

/* -------------------- Step 3: Concern -------------------- */

const CONCERNS: { v: string; icon: ReactNode; tint: string }[] = [
  { v: "Fever", icon: <Thermometer className="h-5 w-5" />, tint: "bg-destructive-soft text-destructive" },
  { v: "Cough", icon: <Wind className="h-5 w-5" />, tint: "bg-secondary-soft text-secondary" },
  { v: "Difficulty Breathing", icon: <Activity className="h-5 w-5" />, tint: "bg-destructive-soft text-destructive" },
  { v: "Headache", icon: <Ear className="h-5 w-5" />, tint: "bg-accent-soft text-accent-foreground" },
  { v: "Vomiting", icon: <Droplets className="h-5 w-5" />, tint: "bg-secondary-soft text-secondary" },
  { v: "Diarrhea", icon: <Droplets className="h-5 w-5" />, tint: "bg-secondary-soft text-secondary" },
  { v: "Body Pain", icon: <HeartPulse className="h-5 w-5" />, tint: "bg-primary-soft text-primary" },
  { v: "Pregnancy Concern", icon: <Heart className="h-5 w-5" />, tint: "bg-accent-soft text-accent-foreground" },
  { v: "Skin Problem", icon: <Stethoscope className="h-5 w-5" />, tint: "bg-accent-soft text-accent-foreground" },
  { v: "Mental Wellbeing", icon: <Heart className="h-5 w-5" />, tint: "bg-primary-soft text-primary" },
  { v: "Other", icon: <MoreHorizontal className="h-5 w-5" />, tint: "bg-muted text-foreground" },
];

function ConcernStep({ value, onSelect }: { value?: string; onSelect: (v: string) => void }) {
  const [q, setQ] = useState("");
  const list = useMemo(
    () => CONCERNS.filter((c) => c.v.toLowerCase().includes(q.trim().toLowerCase())),
    [q]
  );
  return (
    <>
      <StepHeader eyebrow="Step 3" title="What is the main concern?" sub="Pick the symptom that worries you most." />

      <div className="relative mb-4">
        <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search symptoms"
          className="w-full h-12 rounded-2xl bg-card border border-border pl-11 pr-4 text-sm font-medium outline-none focus:border-primary/60"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {list.map((c) => {
          const active = value === c.v;
          return (
            <button
              key={c.v}
              onClick={() => onSelect(c.v)}
              className={`tap-target rounded-3xl border-2 p-4 text-left flex flex-col gap-3 transition-all ${
                active
                  ? "border-primary bg-primary-soft"
                  : "border-border bg-card hover:border-primary/40 shadow-soft"
              }`}
            >
              <span className={`h-11 w-11 rounded-2xl grid place-items-center ${c.tint}`}>
                {c.icon}
              </span>
              <span className="font-bold text-[14px] leading-tight text-foreground">{c.v}</span>
            </button>
          );
        })}
        {list.length === 0 && (
          <p className="col-span-2 text-sm text-muted-foreground text-center py-6">
            No matches. Try a different word.
          </p>
        )}
      </div>

      <button className="mt-5 tap-target inline-flex items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-3 text-sm font-semibold text-muted-foreground self-start">
        <Mic className="h-4 w-4" /> Describe with voice (coming soon)
      </button>
    </>
  );
}

/* -------------------- Step 4: Duration -------------------- */

const DURATIONS: { v: Duration; label: string; sub: string }[] = [
  { v: "today", label: "Today", sub: "Just started" },
  { v: "1-2", label: "1 – 2 Days", sub: "Recently began" },
  { v: "3-7", label: "3 – 7 Days", sub: "Ongoing this week" },
  { v: "week+", label: "More than a Week", sub: "Persistent" },
];

function DurationStep({ value, onSelect }: { value?: Duration; onSelect: (v: Duration) => void }) {
  return (
    <>
      <StepHeader eyebrow="Step 4" title="How long has this been happening?" />
      <div className="space-y-3">
        {DURATIONS.map((o) => (
          <OptionCard
            key={o.v}
            label={o.label}
            sub={o.sub}
            active={value === o.v}
            onClick={() => onSelect(o.v)}
          />
        ))}
      </div>
    </>
  );
}

/* -------------------- Step 5: Severity -------------------- */

const SEVERITIES: { v: Severity; label: string; sub: string; dot: string }[] = [
  { v: "very-mild", label: "Very Mild", sub: "Barely noticeable, active as usual", dot: "bg-success" },
  { v: "mild", label: "Mild", sub: "Some discomfort, still eating and playing", dot: "bg-primary" },
  { v: "moderate", label: "Moderate", sub: "Uncomfortable, hard to sleep or eat", dot: "bg-warning" },
  { v: "severe", label: "Severe", sub: "Cannot do normal activities", dot: "bg-accent" },
  { v: "emergency", label: "Emergency", sub: "Very worrying, needs urgent help", dot: "bg-danger" },
];

function SeverityStep({
  value,
  onSelect,
}: {
  value?: Severity;
  onSelect: (v: Severity) => void;
}) {
  return (
    <>
      <StepHeader eyebrow="Step 5" title="How severe is it right now?" sub="Choose what best describes how they feel." />
      <div className="space-y-3">
        {SEVERITIES.map((o) => (
          <button
            key={o.v}
            onClick={() => onSelect(o.v)}
            className={`w-full tap-target rounded-3xl border-2 px-4 py-4 text-left flex items-center gap-4 transition-all ${
              value === o.v
                ? "border-primary bg-primary-soft"
                : "border-border bg-card hover:border-primary/40 shadow-soft"
            }`}
          >
            <span className={`h-3 w-3 rounded-full ${o.dot} shrink-0`} />
            <div className="flex-1">
              <p className="font-bold text-foreground text-[15px]">{o.label}</p>
              <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{o.sub}</p>
            </div>
            {value === o.v && <Check className="h-5 w-5 text-primary" strokeWidth={3} />}
          </button>
        ))}
      </div>
    </>
  );
}

/* -------------------- Step 6: Danger signs -------------------- */

const DANGERS = [
  "Difficulty breathing",
  "Loss of consciousness",
  "Convulsions",
  "Heavy bleeding",
  "Chest pain",
  "Severe dehydration",
  "High fever in infant",
  "Persistent vomiting",
];

function DangerStep({
  value,
  onChange,
  onNext,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
}) {
  function toggle(s: string) {
    onChange(value.includes(s) ? value.filter((x) => x !== s) : [...value, s]);
  }
  const none = value.length === 0;
  return (
    <>
      <StepHeader
        eyebrow="Step 6"
        title="Any danger signs right now?"
        sub="Tap any that apply. If none, continue."
      />

      <div className="space-y-2.5">
        {DANGERS.map((d) => {
          const active = value.includes(d);
          return (
            <button
              key={d}
              onClick={() => toggle(d)}
              className={`w-full tap-target rounded-2xl border-2 px-4 py-3 text-left flex items-center gap-3 transition-all ${
                active
                  ? "border-destructive bg-destructive-soft"
                  : "border-border bg-card hover:border-destructive/40"
              }`}
            >
              <span
                className={`h-6 w-6 rounded-md border-2 grid place-items-center shrink-0 ${
                  active ? "bg-destructive border-destructive" : "border-border"
                }`}
              >
                {active && <Check className="h-4 w-4 text-destructive-foreground" strokeWidth={3} />}
              </span>
              <span className="font-semibold text-[14.5px] text-foreground">{d}</span>
            </button>
          );
        })}
      </div>

      {!none && (
        <div className="mt-5 rounded-2xl bg-destructive-soft border border-destructive/30 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-[13px] font-semibold text-destructive leading-snug">
            Danger signs selected. We'll prepare urgent guidance for you.
          </p>
        </div>
      )}

      <div className="flex-1" />
      <div className="mt-6">
        <PrimaryButton onClick={onNext}>
          {none ? "No danger signs — continue" : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </>
  );
}

/* -------------------- Step 7: Review -------------------- */

function labelForWho(w?: Who) {
  return w === "me" ? "Myself" : w === "child" ? "My child" : w === "family" ? "Family member" : "—";
}
function labelForAge(a?: Age) {
  return AGE_OPTIONS.find((o) => o.v === a)?.label ?? "—";
}
function labelForDuration(d?: Duration) {
  return DURATIONS.find((o) => o.v === d)?.label ?? "—";
}
function labelForSeverity(s?: Severity) {
  return SEVERITIES.find((o) => o.v === s)?.label ?? "—";
}

function ReviewStep({
  answers,
  onConfirm,
  onEdit,
}: {
  answers: Answers;
  onConfirm: () => void;
  onEdit: (step: number) => void;
}) {
  const rows = [
    { label: "Who needs help", value: labelForWho(answers.who), step: 1 },
    { label: "Age", value: labelForAge(answers.age), step: 2 },
    { label: "Main concern", value: answers.concern ?? "—", step: 3 },
    { label: "Duration", value: labelForDuration(answers.duration), step: 4 },
    { label: "Severity", value: labelForSeverity(answers.severity), step: 5 },
    {
      label: "Danger signs",
      value: answers.dangers.length ? answers.dangers.join(", ") : "None reported",
      step: 6,
    },
  ];
  return (
    <>
      <StepHeader
        eyebrow="Review"
        title="Let's confirm your answers"
        sub="Tap Edit to change anything before we prepare your guidance."
      />
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="card-elevated p-4 flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {r.label}
              </p>
              <p className="mt-1 font-semibold text-foreground text-[15px] leading-snug break-words">
                {r.value}
              </p>
            </div>
            <button
              onClick={() => onEdit(r.step)}
              className="text-xs font-bold text-primary rounded-full px-3 py-1.5 bg-primary-soft"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <div className="flex-1" />
      <div className="mt-6 space-y-3">
        <PrimaryButton onClick={onConfirm}>
          See your next best step <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
        <MedicalDisclaimer />
      </div>
    </>
  );
}

/* -------------------- Step 8: Analyzing transition -------------------- */

function AnalyzingStep({ onDone }: { onDone: () => void }) {
  const steps = [
    "Understanding your symptoms",
    "Checking for warning signs",
    "Preparing your next best step",
  ];
  const [done, setDone] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setDone(i + 1), 700 * (i + 1)));
    });
    timers.push(setTimeout(onDone, 700 * steps.length + 500));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
      <div className="relative h-24 w-24 mb-8">
        <span className="absolute inset-0 rounded-full bg-primary-soft animate-ping opacity-60" />
        <span className="absolute inset-2 rounded-full bg-primary-soft" />
        <span className="absolute inset-0 grid place-items-center">
          <Sparkles className="h-9 w-9 text-primary" strokeWidth={2.2} />
        </span>
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-primary">Lafiya Guide</p>
      <h1 className="mt-2 text-[26px] leading-tight font-extrabold tracking-tight text-foreground">
        Reviewing your responses
      </h1>
      <p className="mt-2 text-[14.5px] text-muted-foreground max-w-xs">
        We're preparing calm, careful guidance just for you.
      </p>

      <ul className="mt-8 w-full max-w-sm space-y-3">
        {steps.map((label, i) => {
          const complete = i < done;
          const active = i === done;
          return (
            <li
              key={label}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-500 ${
                complete
                  ? "border-primary/30 bg-primary-soft opacity-100"
                  : active
                    ? "border-border bg-card opacity-100"
                    : "border-border bg-card opacity-40"
              }`}
            >
              <span
                className={`h-7 w-7 rounded-full grid place-items-center shrink-0 transition-colors ${
                  complete ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {complete ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
                )}
              </span>
              <span className="text-[14px] font-semibold text-foreground text-left">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* -------------------- Step 9: Result / Recommendation -------------------- */

type Level = "green" | "yellow" | "red";

function classify(a: Answers): Level {
  if (a.dangers.length > 0) return "red";
  if (a.severity === "emergency") return "red";
  if (a.severity === "severe") return "red";
  if (
    a.age === "infant" &&
    (a.concern === "Fever" || a.concern === "Difficulty Breathing" || a.concern === "Diarrhea")
  )
    return "red";
  if (a.severity === "moderate") return "yellow";
  if (a.duration === "week+") return "yellow";
  if (a.concern === "Pregnancy Concern") return "yellow";
  return "green";
}

function ResultStep({ answers }: { answers: Answers }) {
  const level = classify(answers);
  return (
    <div className="animate-soft-in">
      <ResultIllustration level={level} />

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          We've prepared your next best step
        </p>
        <h1 className="text-[28px] leading-tight font-extrabold tracking-tight mt-1 text-foreground">
          Your Next Best Step
        </h1>
      </div>

      {level === "green" && <GreenCard />}
      {level === "yellow" && <YellowCard />}
      {level === "red" && <RedCard />}

      <WhyAccordion level={level} answers={answers} />

      <LearnMore level={level} concern={answers.concern} />

      <FamilyActions />

      <div className="mt-6">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}

/* -------------------- Result illustration -------------------- */

function ResultIllustration({ level }: { level: Level }) {
  const gradient =
    level === "red"
      ? "from-destructive-soft via-accent-soft to-background"
      : level === "yellow"
        ? "from-accent-soft via-primary-soft to-background"
        : "from-primary-soft via-secondary-soft to-background";
  return (
    <div className={`relative rounded-[28px] overflow-hidden bg-gradient-to-br ${gradient} aspect-[16/10] shadow-soft`}>
      <svg viewBox="0 0 400 250" className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <pattern id="tx" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M0 11 L11 0 L22 11 L11 22 Z" fill="none" stroke="oklch(0.66 0.14 155 / 0.15)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="250" fill="url(#tx)" />
        {/* sun / lamp */}
        <circle cx="320" cy="60" r="30" fill={level === "red" ? "oklch(0.62 0.2 25 / 0.55)" : "oklch(0.82 0.14 80 / 0.65)"} />
        {/* hill */}
        <path d="M0 190 Q 100 150 200 170 T 400 180 L400 250 L0 250 Z" fill="oklch(0.66 0.14 155 / 0.28)" />
        {/* mother with child */}
        <g transform="translate(120 110)">
          <circle cx="0" cy="0" r="20" fill="oklch(0.55 0.06 40)" />
          <path d="M-28 22 Q -28 82 0 92 Q 28 82 28 22 Z" fill="oklch(0.66 0.14 155)" />
          <path d="M-22 -8 Q -18 -28 0 -26 Q 18 -28 22 -8 Z" fill="oklch(0.62 0.2 25)" />
        </g>
        <g transform="translate(170 148)">
          <circle cx="0" cy="0" r="12" fill="oklch(0.6 0.06 40)" />
          <path d="M-16 14 Q -16 52 0 56 Q 16 52 16 14 Z" fill="oklch(0.82 0.14 80)" />
        </g>
        {/* health worker */}
        <g transform="translate(250 110)">
          <circle cx="0" cy="0" r="20" fill="oklch(0.58 0.06 40)" />
          <path d="M-28 22 Q -28 82 0 92 Q 28 82 28 22 Z" fill="oklch(0.7 0.11 235)" />
          <rect x="-5" y="36" width="10" height="3.5" fill="white" />
          <rect x="-1.75" y="32.75" width="3.5" height="10" fill="white" />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}

/* -------------------- Green (home care) -------------------- */

function GreenCard() {
  return (
    <div className="mt-4 rounded-[28px] p-6 bg-card border-2 border-primary/25 shadow-lift animate-slide-up">
      <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-primary-soft text-primary rounded-full px-3 py-1">
        <ShieldCheck className="h-3.5 w-3.5" /> Recommendation
      </div>
      <h2 className="mt-3 text-[22px] font-extrabold text-foreground leading-tight">
        Home Care May Be Appropriate
      </h2>
      <p className="mt-2 text-muted-foreground text-[14.5px] leading-relaxed">
        Based on what you've shared, your symptoms do not currently suggest an immediate emergency.
        Continue to monitor symptoms carefully.
      </p>

      <ul className="mt-4 space-y-2.5">
        <TipRow tone="green">Drink enough clean water</TipRow>
        <TipRow tone="green">Rest and eat light, nutritious meals</TipRow>
        <TipRow tone="green">Continue monitoring symptoms</TipRow>
        <TipRow tone="green">Return if symptoms worsen</TipRow>
      </ul>

      <div className="mt-5 grid grid-cols-1 gap-2.5">
        <Link
          to="/library"
          className="tap-target rounded-2xl bg-primary text-primary-foreground font-bold text-[15px] flex items-center justify-center gap-2 py-3.5 shadow-lift active:scale-[0.98] transition"
        >
          <BookOpen className="h-4 w-4" /> Read Health Advice
        </Link>
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            to="/finder"
            className="tap-target rounded-2xl bg-card border border-border font-semibold text-sm flex items-center justify-center gap-1.5 py-3 text-foreground"
          >
            <Pill className="h-4 w-4 text-primary" /> Nearby Pharmacy
          </Link>
          <button className="tap-target rounded-2xl bg-card border border-border font-semibold text-sm flex items-center justify-center gap-1.5 py-3 text-foreground">
            <Save className="h-4 w-4 text-primary" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Yellow (visit clinic soon) -------------------- */

const NEARBY_FACILITIES = [
  {
    name: "Maiduguri Primary Health Centre",
    distance: "1.2 km",
    open: true,
    hours: "Open until 6:00 PM",
    phone: "+234 803 000 0001",
    eta: "6 min drive",
  },
  {
    name: "Shehu Sanda Kyarimi Clinic",
    distance: "2.8 km",
    open: true,
    hours: "Open 24 hours",
    phone: "+234 803 000 0002",
    eta: "12 min drive",
  },
];

function YellowCard() {
  return (
    <div className="mt-4 rounded-[28px] p-6 bg-card border-2 border-accent/40 shadow-lift animate-slide-up">
      <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-accent-soft text-accent-foreground rounded-full px-3 py-1">
        <Stethoscope className="h-3.5 w-3.5" /> Recommendation
      </div>
      <h2 className="mt-3 text-[22px] font-extrabold text-foreground leading-tight">
        Visit a Healthcare Facility Soon
      </h2>
      <p className="mt-2 text-muted-foreground text-[14.5px] leading-relaxed">
        Your symptoms should be assessed by a qualified healthcare professional within the next 24
        hours.
      </p>

      <p className="mt-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Nearest facilities
      </p>
      <div className="mt-2 space-y-3">
        {NEARBY_FACILITIES.map((f) => (
          <FacilityCard key={f.name} f={f} />
        ))}
      </div>

      <Link
        to="/finder"
        className="mt-4 tap-target rounded-2xl bg-primary text-primary-foreground font-bold text-[15px] flex items-center justify-center gap-2 py-3.5 shadow-lift active:scale-[0.98] transition"
      >
        <MapPin className="h-4 w-4" /> View on Map
      </Link>
    </div>
  );
}

function FacilityCard({ f }: { f: (typeof NEARBY_FACILITIES)[number] }) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-bold text-[15px] text-foreground leading-snug">{f.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> {f.distance} · {f.eta}
          </p>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
            <Clock className="h-3 w-3" /> {f.hours}
          </p>
        </div>
        <span
          className={`text-[11px] font-bold rounded-full px-2 py-1 shrink-0 ${
            f.open ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground"
          }`}
        >
          {f.open ? "Open" : "Closed"}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="tap-target rounded-xl bg-primary text-primary-foreground text-sm font-bold py-2.5 flex items-center justify-center gap-1.5">
          <Navigation className="h-4 w-4" /> Directions
        </button>
        <a
          href={`tel:${f.phone}`}
          className="tap-target rounded-xl bg-muted text-foreground text-sm font-bold py-2.5 flex items-center justify-center gap-1.5"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
      </div>
    </div>
  );
}

/* -------------------- Red (immediate) -------------------- */

function RedCard() {
  return (
    <div className="mt-4 rounded-[28px] p-6 bg-gradient-to-br from-destructive to-[#a5321f] shadow-lift text-destructive-foreground animate-slide-up">
      <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-white/25 rounded-full px-3 py-1">
        <Siren className="h-3.5 w-3.5" /> Urgent
      </div>
      <h2 className="mt-3 text-[22px] font-extrabold leading-tight">
        Seek Immediate Medical Attention
      </h2>
      <p className="mt-2 text-white/90 text-[14.5px] leading-relaxed">
        Some of the symptoms you reported may require urgent medical assessment. Please act now — do
        not wait.
      </p>

      <a
        href="tel:112"
        className="mt-5 tap-target w-full rounded-2xl bg-white text-destructive font-extrabold text-lg flex items-center justify-center gap-2 py-4 shadow-lift active:scale-[0.98] transition"
      >
        <Phone className="h-5 w-5" /> Emergency Call · 112
      </a>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <EmergencyAction icon={<Ambulance className="h-5 w-5" />} label="Nearest Hospital" to="/finder" />
        <EmergencyAction icon={<MapPin className="h-5 w-5" />} label="Share Location" />
        <EmergencyAction icon={<Users className="h-5 w-5" />} label="Notify Contact" to="/emergency" />
        <EmergencyAction icon={<BookOpen className="h-5 w-5" />} label="Instructions" to="/emergency" />
      </div>

      <div className="mt-4 rounded-2xl bg-white/15 backdrop-blur p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">
          Nearest emergency facility
        </p>
        <p className="mt-1 font-bold text-white">UMTH Emergency Unit</p>
        <p className="text-xs text-white/85">3.4 km · Open 24 hours</p>
      </div>
    </div>
  );
}

function EmergencyAction({
  icon,
  label,
  to,
}: {
  icon: ReactNode;
  label: string;
  to?: string;
}) {
  const cls =
    "tap-target rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-3 flex flex-col items-start gap-1.5 text-white font-bold text-[13px] leading-tight text-left transition";
  if (to) {
    return (
      <Link to={to} className={cls}>
        {icon}
        {label}
      </Link>
    );
  }
  return (
    <button className={cls}>
      {icon}
      {label}
    </button>
  );
}

/* -------------------- Shared bits -------------------- */

function TipRow({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "white" }) {
  const isGreen = tone === "green";
  return (
    <li className="flex items-start gap-2.5">
      <span
        className={`h-5 w-5 rounded-full grid place-items-center shrink-0 mt-0.5 ${
          isGreen ? "bg-primary-soft" : "bg-white/25"
        }`}
      >
        <Check className={`h-3 w-3 ${isGreen ? "text-primary" : "text-white"}`} strokeWidth={3} />
      </span>
      <span className={`text-[14px] ${isGreen ? "text-foreground" : "text-white/95"}`}>{children}</span>
    </li>
  );
}

/* -------------------- Why this recommendation -------------------- */

function buildWhyReasons(a: Answers, level: Level): string[] {
  const reasons: string[] = [];
  if (a.dangers.length > 0) {
    reasons.push(`You reported ${a.dangers.length === 1 ? "a warning sign" : "warning signs"}: ${a.dangers.join(", ")}.`);
  }
  if (a.severity === "emergency" || a.severity === "severe") {
    reasons.push(`You described the symptoms as ${labelForSeverity(a.severity).toLowerCase()}.`);
  } else if (a.severity === "moderate") {
    reasons.push("You described the symptoms as moderate and uncomfortable.");
  }
  if (a.duration === "week+") {
    reasons.push("The symptoms have been going on for more than a week.");
  } else if (a.duration === "3-7") {
    reasons.push("The symptoms have been ongoing for several days.");
  }
  if (a.age === "infant") {
    reasons.push("The person affected is under 1 year old, so we take extra care.");
  }
  if (a.concern) {
    reasons.push(`The main concern you shared is ${a.concern.toLowerCase()}.`);
  }
  if (reasons.length === 0) {
    reasons.push(
      level === "green"
        ? "No danger signs were reported and the symptoms sound mild."
        : "Your answers suggest it is safer to seek professional guidance."
    );
  }
  return reasons;
}

function WhyAccordion({ level, answers }: { level: Level; answers: Answers }) {
  const [open, setOpen] = useState(false);
  const reasons = buildWhyReasons(answers, level);
  return (
    <div className="mt-5 card-elevated overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full tap-target px-4 py-4 flex items-center gap-3 text-left"
        aria-expanded={open}
      >
        <span className="h-9 w-9 rounded-xl bg-secondary-soft grid place-items-center shrink-0">
          <HeartPulse className="h-4 w-4 text-secondary" />
        </span>
        <span className="flex-1 font-bold text-foreground text-[15px]">
          Why did I receive this recommendation?
        </span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 -mt-1 animate-soft-in">
          <ul className="space-y-2.5 border-t border-border pt-4">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-[14px] text-foreground leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            This is guidance, not a diagnosis. A qualified health worker can give you a full
            assessment.
          </p>
        </div>
      )}
    </div>
  );
}

/* -------------------- Learn more articles -------------------- */

type Article = { title: string; category: string; read: string; emoji: string; tint: string };

const ARTICLE_LIBRARY: Record<string, Article> = {
  fever: {
    title: "Managing Fever at Home",
    category: "Fever care",
    read: "4 min read",
    emoji: "🌡️",
    tint: "bg-destructive-soft",
  },
  malaria: {
    title: "Preventing Malaria This Season",
    category: "Prevention",
    read: "5 min read",
    emoji: "🦟",
    tint: "bg-primary-soft",
  },
  water: {
    title: "Safe Drinking Water at Home",
    category: "Water & sanitation",
    read: "3 min read",
    emoji: "💧",
    tint: "bg-secondary-soft",
  },
  dehydration: {
    title: "Recognising Dehydration Early",
    category: "Warning signs",
    read: "4 min read",
    emoji: "🥤",
    tint: "bg-accent-soft",
  },
  breathing: {
    title: "When Breathing Feels Difficult",
    category: "Emergency care",
    read: "3 min read",
    emoji: "🫁",
    tint: "bg-destructive-soft",
  },
  pregnancy: {
    title: "Safe Pregnancy Checkpoints",
    category: "Mother & child",
    read: "6 min read",
    emoji: "🤰",
    tint: "bg-accent-soft",
  },
};

function pickArticles(concern?: string): Article[] {
  const lib = ARTICLE_LIBRARY;
  const c = concern?.toLowerCase() ?? "";
  if (c.includes("fever")) return [lib.fever, lib.malaria, lib.dehydration, lib.water];
  if (c.includes("breath")) return [lib.breathing, lib.fever, lib.malaria, lib.water];
  if (c.includes("diarr") || c.includes("vomit")) return [lib.dehydration, lib.water, lib.fever, lib.malaria];
  if (c.includes("pregnan")) return [lib.pregnancy, lib.water, lib.dehydration, lib.fever];
  return [lib.fever, lib.water, lib.malaria, lib.dehydration];
}

function LearnMore({ level: _level, concern }: { level: Level; concern?: string }) {
  const articles = pickArticles(concern);
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Learn more
          </p>
          <h3 className="font-bold text-foreground text-[17px] mt-0.5">Articles for your family</h3>
        </div>
        <Link to="/library" className="text-xs font-bold text-primary">
          See all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {articles.map((a) => (
          <Link
            key={a.title}
            to="/library"
            className="card-elevated p-3 flex flex-col gap-3 active:scale-[0.98] transition"
          >
            <div
              className={`h-20 rounded-2xl grid place-items-center text-4xl ${a.tint}`}
              aria-hidden
            >
              {a.emoji}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                {a.category}
              </p>
              <p className="mt-1 font-bold text-foreground text-[13.5px] leading-tight line-clamp-2">
                {a.title}
              </p>
              <p className="mt-1.5 text-[11px] text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {a.read}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Family actions -------------------- */

function FamilyActions() {
  return (
    <div className="mt-6">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
        Care with your family
      </p>
      <div className="grid grid-cols-2 gap-3">
        <FamilyTile icon={<Share2 className="h-5 w-5" />} label="Share with Family" />
        <FamilyTile icon={<Wallet className="h-5 w-5" />} label="Save to Health Wallet" />
        <FamilyTile icon={<Bell className="h-5 w-5" />} label="Medication Reminder" to="/medications" />
        <FamilyTile icon={<CalendarClock className="h-5 w-5" />} label="Follow-up Reminder" />
      </div>
    </div>
  );
}

function FamilyTile({ icon, label, to }: { icon: ReactNode; label: string; to?: string }) {
  const inner = (
    <>
      <span className="h-10 w-10 rounded-2xl bg-primary-soft text-primary grid place-items-center">
        {icon}
      </span>
      <span className="font-bold text-[13.5px] text-foreground leading-tight">{label}</span>
    </>
  );
  const cls =
    "card-elevated p-4 flex flex-col gap-3 text-left active:scale-[0.98] transition tap-target";
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <button className={cls}>{inner}</button>;
}

