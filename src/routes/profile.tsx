import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Users,
  Pill,
  Syringe,
  Activity,
  PhoneCall,
  ChevronRight,
  User,
  HeartPulse,
  ShieldCheck,
  Languages,
  Bell,
  Moon,
  Lock,
  Eye,
  Share2,
  FileLock2,
  WifiOff,
  LifeBuoy,
  HelpCircle,
  MessageSquareWarning,
  FileText,
  Info,
  Heart,
  LogOut,
  Check,
  MapPin,
} from "lucide-react";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [
    { title: "Profile and settings | CareBridge" },
    { name: "description", content: "Manage your CareBridge account, preferences and family settings." },
    { property: "og:title", content: "Profile and settings | CareBridge" },
    { property: "og:description", content: "Manage your CareBridge account, preferences and family settings." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "ha">("en");
  const [medReminders, setMedReminders] = useState(true);
  const [apptReminders, setApptReminders] = useState(true);
  const [communityAlerts, setCommunityAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  return (
    <MobileShell>
      <div className="animate-soft-in">
        <PageHeader
          title="Profile"
          subtitle="Manage your account, preferences and family settings."
        />

        {/* Identity */}
        <section className="px-5">
          <div className="card-elevated p-5 flex items-center gap-4">
            <div className="relative">
              <div
                className="h-16 w-16 rounded-full grid place-items-center text-primary-foreground text-xl font-bold shadow-soft"
                style={{ background: "linear-gradient(135deg, var(--color-primary), oklch(0.58 0.14 165))" }}
                aria-hidden
              >
                AI
              </div>
              <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-card grid place-items-center shadow-soft">
                <BadgeCheck className="h-4 w-4 text-primary" strokeWidth={2.4} />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-foreground truncate">Aisha Ibrahim</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3.5 w-3.5" /> Bolori, Maiduguri • Borno State
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Age 31 • Tailor • English & Hausa</p>
              <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-primary bg-primary-soft px-2 py-1 rounded-full">
                <BadgeCheck className="h-3 w-3" /> Verified Account
              </span>
            </div>
          </div>
        </section>

        {/* Health snapshot */}
        <section className="px-5 mt-6">
          <SectionTitle>Health Snapshot</SectionTitle>
          <div className="card-elevated p-4 grid grid-cols-2 gap-3">
            <Stat icon={Users} label="Family Members" value="4" tint="primary" />
            <Stat icon={Pill} label="Medication Reminders" value="3" tint="secondary" />
            <Stat icon={Syringe} label="Upcoming Vaccinations" value="1" tint="accent" />
            <Stat icon={Activity} label="Recent Assessments" value="2" tint="primary" />
            <Stat icon={PhoneCall} label="Emergency Contacts" value="3" tint="destructive" className="col-span-2" />
          </div>
        </section>

        {/* Account */}
        <section className="px-5 mt-6">
          <SectionTitle>Account</SectionTitle>
          <div className="space-y-2.5">
            <Row icon={User} title="Personal Information" desc="Name, phone, date of birth" />
            <Row icon={Users} title="Family Profiles" desc="Manage children and dependents" to="/family" />
            <Row icon={PhoneCall} title="Emergency Contacts" desc="Trusted people to reach in a crisis" to="/emergency" />
            <Row icon={HeartPulse} title="Medical Information" desc="Allergies, conditions, blood group" />
          </div>
        </section>

        {/* Preferences */}
        <section className="px-5 mt-6">
          <SectionTitle>Preferences</SectionTitle>

          <div className="card-elevated p-4">
            <div className="flex items-start gap-3">
              <IconBadge icon={Languages} tint="secondary" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Language</p>
                <p className="text-xs text-muted-foreground mt-0.5">Choose the language you're most comfortable with.</p>
              </div>
            </div>
            <div className="mt-3 grid gap-2">
              <LangOption label="English" active={language === "en"} onClick={() => setLanguage("en")} />
              <LangOption label="Hausa" active={language === "ha"} onClick={() => setLanguage("ha")} />
              <LangOption label="Kanuri" disabled hint="Coming soon" />
            </div>
          </div>

          <div className="card-elevated p-4 mt-3">
            <div className="flex items-start gap-3">
              <IconBadge icon={Bell} tint="accent" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Notifications</p>
                <p className="text-xs text-muted-foreground mt-0.5">Gentle reminders, never noisy.</p>
              </div>
            </div>
            <div className="mt-3 divide-y divide-border">
              <ToggleRow label="Medication reminders" checked={medReminders} onChange={setMedReminders} />
              <ToggleRow label="Appointment reminders" checked={apptReminders} onChange={setApptReminders} />
              <ToggleRow label="Community health alerts" checked={communityAlerts} onChange={setCommunityAlerts} />
            </div>
          </div>

          <div className="card-elevated p-4 mt-3 flex items-center gap-3">
            <IconBadge icon={Moon} tint="primary" />
            <div className="flex-1">
              <p className="font-semibold text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Easier on the eyes at night.</p>
            </div>
            <Toggle checked={darkMode} onChange={setDarkMode} label="Dark mode" />
          </div>
        </section>

        {/* Privacy */}
        <section className="px-5 mt-6">
          <SectionTitle>Privacy & Security</SectionTitle>
          <div className="card-elevated p-4 mb-3 flex items-start gap-3">
            <IconBadge icon={ShieldCheck} tint="primary" />
            <p className="text-sm text-muted-foreground">
              CareBridge keeps your family's health information private and encrypted. Only you decide what to share.
            </p>
          </div>
          <div className="space-y-2.5">
            <Row icon={Lock} title="PIN & Biometrics" desc="Protect the app with Face ID or a PIN" />
            <Row icon={Eye} title="Privacy Settings" desc="Control who sees what" />
            <Row icon={Share2} title="Data Sharing Preferences" desc="Choose what we can use to improve care" />
            <Row icon={FileLock2} title="Health Data Permissions" desc="Manage third-party access" />
          </div>
        </section>

        {/* Offline */}
        <section className="px-5 mt-6">
          <div
            className="rounded-3xl p-5 border border-border shadow-soft relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, var(--color-primary-soft), var(--color-secondary-soft))" }}
          >
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-2xl bg-card grid place-items-center shadow-soft">
                <WifiOff className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground">Offline Access</h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-card px-2 py-0.5 rounded-full">
                    <Check className="h-3 w-3" /> Enabled
                  </span>
                </div>
                <p className="text-sm text-foreground/80 mt-1.5 leading-relaxed">
                  Your medication reminders, emergency contacts and saved health information remain available even without internet access.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="px-5 mt-6">
          <SectionTitle>Support</SectionTitle>
          <div className="space-y-2.5">
            <Row icon={LifeBuoy} title="Help Centre" desc="Guides and quick answers" />
            <Row icon={HelpCircle} title="Frequently Asked Questions" desc="Common questions, clearly answered" />
            <Row icon={MessageSquareWarning} title="Contact Support" desc="We usually reply within a day" />
            <Row icon={MessageSquareWarning} title="Report an Issue" desc="Something's not right? Tell us." />
            <Row icon={FileText} title="Terms & Privacy" desc="How we protect and handle data" />
            <Row icon={Info} title="About CareBridge" desc="Our mission and team" />
          </div>
        </section>

        {/* About */}
        <section className="px-5 mt-6">
          <div className="card-elevated p-5 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-primary-soft grid place-items-center">
              <Heart className="h-6 w-6 text-primary" fill="currentColor" />
            </div>
            <h3 className="mt-3 font-bold text-foreground">CareBridge</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Version 1.0</p>
            <p className="text-sm text-muted-foreground mt-3 max-w-[280px] mx-auto leading-relaxed">
              "Built to help families make informed healthcare decisions."
            </p>
          </div>
        </section>

        {/* Sign out */}
        <section className="px-5 mt-8 mb-4">
          <button
            onClick={() => setConfirmSignOut(true)}
            className="tap-target w-full rounded-2xl border-2 border-destructive/30 text-destructive font-semibold py-3.5 flex items-center justify-center gap-2 hover:bg-destructive-soft active:scale-[0.99] transition-all"
          >
            <LogOut className="h-5 w-5" /> Sign out
          </button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Signed in as Aisha Ibrahim
          </p>
        </section>
      </div>

      {confirmSignOut && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm grid place-items-end sm:place-items-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="signout-title"
          onClick={() => setConfirmSignOut(false)}
        >
          <div
            className="w-full max-w-[420px] bg-card rounded-3xl p-6 shadow-lift animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto h-12 w-12 rounded-2xl bg-destructive-soft grid place-items-center">
              <LogOut className="h-6 w-6 text-destructive" />
            </div>
            <h3 id="signout-title" className="text-center font-bold text-lg text-foreground mt-3">
              Sign out of CareBridge?
            </h3>
            <p className="text-center text-sm text-muted-foreground mt-1">
              You can sign back in anytime with your phone number.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                onClick={() => setConfirmSignOut(false)}
                className="tap-target rounded-2xl border border-border font-semibold text-foreground"
              >
                Stay signed in
              </button>
              <button
                onClick={() => {
                  setConfirmSignOut(false);
                  navigate({ to: "/login" });
                }}
                className="tap-target rounded-2xl bg-destructive text-destructive-foreground font-semibold"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5 px-1">{children}</h2>;
}

type Tint = "primary" | "secondary" | "accent" | "destructive";
const tintClass: Record<Tint, string> = {
  primary: "bg-primary-soft text-primary",
  secondary: "bg-secondary-soft text-secondary",
  accent: "bg-accent-soft text-accent-foreground",
  destructive: "bg-destructive-soft text-destructive",
};

function IconBadge({ icon: Icon, tint = "primary" }: { icon: LucideIcon; tint?: Tint }) {
  return (
    <span className={`h-11 w-11 rounded-2xl grid place-items-center shrink-0 ${tintClass[tint]}`}>
      <Icon className="h-5 w-5" strokeWidth={2.2} />
    </span>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tint = "primary",
  className = "",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tint?: Tint;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-muted/40 p-3 flex items-center gap-3 ${className}`}>
      <span className={`h-10 w-10 rounded-xl grid place-items-center shrink-0 ${tintClass[tint]}`}>
        <Icon className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <p className="text-xl font-bold text-foreground leading-none">{value}</p>
        <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{label}</p>
      </div>
    </div>
  );
}

function Row({
  icon,
  title,
  desc,
  to,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  to?: string;
}) {
  const content = (
    <div className="card-elevated p-4 flex items-center gap-3 tap-target active:scale-[0.99] hover:shadow-card transition-all">
      <IconBadge icon={icon} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{desc}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
    </div>
  );
  if (to) return <Link to={to}>{content}</Link>;
  return <button type="button" className="w-full text-left">{content}</button>;
}

function LangOption({
  label,
  active,
  disabled,
  hint,
  onClick,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  hint?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`tap-target w-full flex items-center justify-between rounded-2xl px-4 border transition-colors ${
        active
          ? "border-primary bg-primary-soft"
          : "border-border bg-card hover:bg-muted/50"
      } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <span className={`font-semibold ${active ? "text-primary" : "text-foreground"}`}>{label}</span>
      {hint ? (
        <span className="text-[11px] text-muted-foreground">{hint}</span>
      ) : active ? (
        <Check className="h-5 w-5 text-primary" />
      ) : (
        <span className="h-5 w-5 rounded-full border-2 border-border" />
      )}
    </button>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-muted-foreground/30"
      }`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow-soft transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
