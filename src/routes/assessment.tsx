import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, Baby, Check, ChevronLeft, Mic, User, Users } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/assessment")({
  component: AssessmentPage,
});

type Answers = {
  who?: string;
  symptoms: string[];
  duration?: string;
  severity?: string;
};

const steps = ["Who", "Symptoms", "Duration", "Severity", "Summary", "Result"] as const;

function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ symptoms: [] });
  const navigate = useNavigate();

  const progress = ((step + 1) / steps.length) * 100;

  function next() { setStep((s) => Math.min(s + 1, steps.length - 1)); }
  function prev() {
    if (step === 0) navigate({ to: "/home" });
    else setStep((s) => s - 1);
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-[480px] min-h-dvh flex flex-col safe-bottom">
        <header className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <button onClick={prev} className="tap-target grid place-items-center h-11 w-11 -ml-2 rounded-2xl hover:bg-muted" aria-label="Back">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <p className="text-xs font-semibold text-muted-foreground">Step {step + 1} of {steps.length}</p>
              <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 flex flex-col animate-soft-in" key={step}>
          {step === 0 && <WhoStep value={answers.who} onSelect={(v) => { setAnswers({ ...answers, who: v }); next(); }} />}
          {step === 1 && <SymptomsStep value={answers.symptoms} onChange={(v) => setAnswers({ ...answers, symptoms: v })} onNext={next} />}
          {step === 2 && <DurationStep onSelect={(v) => { setAnswers({ ...answers, duration: v }); next(); }} />}
          {step === 3 && <SeverityStep onSelect={(v) => { setAnswers({ ...answers, severity: v }); next(); }} />}
          {step === 4 && <SummaryStep answers={answers} onConfirm={next} />}
          {step === 5 && <ResultStep answers={answers} />}
        </main>
      </div>
    </div>
  );
}

function StepHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold text-primary uppercase tracking-wider">{eyebrow}</p>
      <h1 className="text-2xl font-extrabold tracking-tight mt-1">{title}</h1>
      {sub && <p className="text-sm text-muted-foreground mt-1.5">{sub}</p>}
    </div>
  );
}

function BigChoice({ label, sub, icon, active, onClick }: { label: string; sub?: string; icon?: React.ReactNode; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full tap-target rounded-2xl border-2 px-4 py-4 text-left flex items-center gap-3 transition-all ${
        active ? "border-primary bg-primary-soft" : "border-border bg-card hover:border-primary/40"
      }`}
    >
      {icon && <div className={`h-11 w-11 rounded-xl grid place-items-center shrink-0 ${active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-foreground">{label}</p>
        {sub && <p className="text-sm text-muted-foreground">{sub}</p>}
      </div>
      {active && <Check className="h-5 w-5 text-primary" strokeWidth={3} />}
    </button>
  );
}

function WhoStep({ value, onSelect }: { value?: string; onSelect: (v: string) => void }) {
  const opts = [
    { v: "me", label: "Myself", sub: "I need guidance for me", icon: <User className="h-5 w-5" /> },
    { v: "child", label: "My child", sub: "Under 12 years old", icon: <Baby className="h-5 w-5" /> },
    { v: "family", label: "Another family member", sub: "Spouse, parent, or relative", icon: <Users className="h-5 w-5" /> },
    { v: "someone", label: "Someone else", sub: "A neighbor or community member", icon: <User className="h-5 w-5" /> },
  ];
  return (
    <>
      <StepHeader eyebrow="Getting started" title="Who needs help today?" sub="Choose the person you'd like guidance for." />
      <div className="space-y-3">
        {opts.map((o) => (
          <BigChoice key={o.v} label={o.label} sub={o.sub} icon={o.icon} active={value === o.v} onClick={() => onSelect(o.v)} />
        ))}
      </div>
    </>
  );
}

const SYMPTOMS = [
  "Fever", "Cough", "Headache", "Vomiting", "Diarrhea", "Stomach pain",
  "Body weakness", "Chills", "Difficulty breathing", "Skin rash", "Loss of appetite", "Dizziness",
];

function SymptomsStep({ value, onChange, onNext }: { value: string[]; onChange: (v: string[]) => void; onNext: () => void }) {
  function toggle(s: string) {
    onChange(value.includes(s) ? value.filter((x) => x !== s) : [...value, s]);
  }
  return (
    <>
      <StepHeader eyebrow="Symptoms" title="What are they feeling?" sub="Tap all that apply." />
      <div className="flex flex-wrap gap-2">
        {SYMPTOMS.map((s) => {
          const active = value.includes(s);
          return (
            <button
              key={s}
              onClick={() => toggle(s)}
              className={`min-h-11 px-4 rounded-2xl border-2 font-semibold text-sm transition-all ${
                active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      <button className="mt-6 tap-target flex items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-3 text-sm font-semibold text-muted-foreground self-start">
        <Mic className="h-4 w-4" /> Describe with voice (coming soon)
      </button>

      <div className="flex-1" />
      <button
        disabled={value.length === 0}
        onClick={onNext}
        className="tap-target flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lift disabled:opacity-50 mt-6 mb-2"
      >
        Continue <ArrowRight className="h-4 w-4" />
      </button>
    </>
  );
}

function DurationStep({ onSelect }: { onSelect: (v: string) => void }) {
  const opts = [
    { v: "hours", label: "A few hours", sub: "Started today" },
    { v: "1-2days", label: "1–2 days", sub: "Recently began" },
    { v: "3-7days", label: "3–7 days", sub: "Has been ongoing" },
    { v: "week+", label: "More than a week", sub: "Persistent" },
  ];
  return (
    <>
      <StepHeader eyebrow="Duration" title="How long has this been happening?" />
      <div className="space-y-3">
        {opts.map((o) => (
          <BigChoice key={o.v} label={o.label} sub={o.sub} onClick={() => onSelect(o.v)} />
        ))}
      </div>
    </>
  );
}

function SeverityStep({ onSelect }: { onSelect: (v: string) => void }) {
  const opts = [
    { v: "mild", label: "Mild", sub: "Still active and eating well", color: "bg-success" },
    { v: "moderate", label: "Moderate", sub: "Uncomfortable, hard to sleep", color: "bg-warning" },
    { v: "severe", label: "Severe", sub: "Cannot do normal activities", color: "bg-danger" },
  ];
  return (
    <>
      <StepHeader eyebrow="Severity" title="How severe is it right now?" />
      <div className="space-y-3">
        {opts.map((o) => (
          <button
            key={o.v}
            onClick={() => onSelect(o.v)}
            className="w-full tap-target rounded-2xl border-2 border-border bg-card px-4 py-4 text-left flex items-center gap-3 hover:border-primary/40"
          >
            <span className={`h-3 w-3 rounded-full ${o.color}`} />
            <div className="flex-1">
              <p className="font-bold text-foreground">{o.label}</p>
              <p className="text-sm text-muted-foreground">{o.sub}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

function SummaryStep({ answers, onConfirm }: { answers: Answers; onConfirm: () => void }) {
  return (
    <>
      <StepHeader eyebrow="Review" title="Let's confirm your answers" sub="Make sure this looks right before we prepare your guidance." />
      <div className="space-y-3">
        <SummaryRow label="Who" value={answers.who ?? "—"} />
        <SummaryRow label="Symptoms" value={answers.symptoms.join(", ") || "—"} />
        <SummaryRow label="Duration" value={answers.duration ?? "—"} />
        <SummaryRow label="Severity" value={answers.severity ?? "—"} />
      </div>
      <div className="flex-1" />
      <button
        onClick={onConfirm}
        className="tap-target flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lift mt-6 mb-2"
      >
        See my next best step <ArrowRight className="h-4 w-4" />
      </button>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-elevated p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-foreground capitalize">{value}</p>
    </div>
  );
}

function ResultStep({ answers }: { answers: Answers }) {
  const rec = getRecommendation(answers);
  return (
    <>
      <div className={`rounded-3xl p-6 ${rec.bg} animate-slide-up`}>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90 bg-white/20 px-3 py-1 rounded-full">
          <span className={`h-2 w-2 rounded-full ${rec.dot}`} /> {rec.tag}
        </div>
        <h1 className="text-2xl font-extrabold text-white mt-4">{rec.title}</h1>
        <p className="text-white/90 mt-2">{rec.body}</p>
      </div>

      <div className="mt-5 card-elevated p-4">
        <p className="text-sm font-bold text-foreground mb-3">What you can do now</p>
        <ul className="space-y-3">
          {rec.steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="h-6 w-6 rounded-full bg-primary-soft text-primary font-bold text-xs grid place-items-center shrink-0">{i + 1}</span>
              <p className="text-sm text-foreground">{s}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-2xl bg-muted/60 border border-border px-4 py-3 text-xs text-muted-foreground flex items-start gap-2">
        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
        <span>This guidance does not replace professional medical advice.</span>
      </div>

      <div className="flex-1" />

      <div className="grid grid-cols-2 gap-3 mt-6 mb-2">
        <Link to={rec.primaryTo} className="tap-target flex items-center justify-center rounded-2xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lift">
          {rec.primaryLabel}
        </Link>
        <Link to="/home" className="tap-target flex items-center justify-center rounded-2xl border border-border bg-card px-4 text-sm font-semibold text-foreground">
          Save and close
        </Link>
      </div>
    </>
  );
}

function getRecommendation(a: Answers) {
  if (a.severity === "severe" || a.symptoms.includes("Difficulty breathing")) {
    return {
      tag: "Red — Emergency",
      title: "Seek emergency care right away",
      body: "The symptoms you described need urgent attention. Please go to the nearest hospital or call for help now.",
      bg: "bg-gradient-to-br from-danger to-[#a5321f]",
      dot: "bg-white",
      steps: [
        "Call your emergency contact and share your location.",
        "Head to the nearest hospital or emergency facility.",
        "Do not give any new medicine unless a health worker approves.",
      ],
      primaryLabel: "Open Emergency Hub",
      primaryTo: "/emergency" as const,
    };
  }
  if (a.severity === "moderate" || a.symptoms.length >= 3) {
    return {
      tag: "Yellow — Visit a clinic",
      title: "Visit a nearby clinic soon",
      body: "Your next best step is a check-up at a primary health centre or clinic within the next 24 hours.",
      bg: "bg-gradient-to-br from-accent to-[#c07f14]",
      dot: "bg-white",
      steps: [
        "Rest and drink clean water frequently.",
        "Note when symptoms started and any medicines taken.",
        "Visit a nearby clinic today if possible.",
      ],
      primaryLabel: "Find nearby clinic",
      primaryTo: "/finder" as const,
    };
  }
  return {
    tag: "Green — Home care",
    title: "Home care should be enough",
    body: "You can manage this at home. Keep an eye on the symptoms — if they worsen, come back and re-check.",
    bg: "bg-gradient-to-br from-primary to-[#158a5c]",
    dot: "bg-white",
    steps: [
      "Rest well and drink plenty of clean water.",
      "Eat light, nutritious meals.",
      "If symptoms get worse or last more than 3 days, visit a clinic.",
    ],
    primaryLabel: "Read home care tips",
    primaryTo: "/library" as const,
  };
}
