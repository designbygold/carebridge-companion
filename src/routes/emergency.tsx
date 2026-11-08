import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import { AlertTriangle, MapPin, Navigation, Phone, Share2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/emergency")({
  head: () => ({ meta: [
    { title: "Emergency help | CareBridge" },
    { name: "description", content: "Emergency contacts, nearby care and first-aid guidance for your family." },
    { property: "og:title", content: "Emergency help | CareBridge" },
    { property: "og:description", content: "Emergency contacts, nearby care and first-aid guidance for your family." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: EmergencyPage,
});

const contacts = [
  { name: "Nigeria Emergency Line", role: "112 – Free from any phone", number: "112", primary: true },
  { name: "Ibrahim (Husband)", role: "Family contact", number: "+234 803 555 0110" },
  { name: "UMTH Emergency", role: "Nearest hospital", number: "+234 76 231 3000" },
  { name: "Aunt Halima", role: "Relative", number: "+234 802 111 5588" },
];

const checklist = [
  "Stay calm and speak slowly",
  "Share your exact location",
  "Describe what happened in simple words",
  "Do not move a badly injured person",
  "Keep the airway clear if unconscious",
  "Stay with the person until help arrives",
];

function EmergencyPage() {
  return (
    <MobileShell>
      <PageHeader title="Emergency Hub" subtitle="One-tap help when it matters" back="/home" />

      <section className="px-5 mb-5">
        <div className="rounded-3xl bg-gradient-to-br from-danger to-[#a5321f] text-white p-5 shadow-lift">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="h-3.5 w-3.5" /> Emergency ready
          </div>
          <h2 className="text-2xl font-extrabold mt-3 leading-snug">Call 112 for immediate help</h2>
          <p className="text-sm opacity-90 mt-2">Free from any Nigerian phone, 24/7. Share your location to speed up response.</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <a href="tel:112" className="tap-target flex items-center justify-center gap-2 rounded-2xl bg-white text-danger font-bold shadow-soft">
              <Phone className="h-4 w-4" strokeWidth={3} /> Call 112
            </a>
            <button className="tap-target flex items-center justify-center gap-2 rounded-2xl bg-white/15 text-white font-semibold border border-white/30">
              <Share2 className="h-4 w-4" /> Share location
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 mb-6">
        <h2 className="text-sm font-bold mb-3">Emergency contacts</h2>
        <div className="space-y-3">
          {contacts.map((c) => (
            <a href={`tel:${c.number}`} key={c.number} className="card-elevated p-4 flex items-center gap-3">
              <div className={`h-11 w-11 rounded-2xl grid place-items-center shrink-0 ${c.primary ? "bg-danger text-danger-foreground" : "bg-primary-soft text-primary"}`}>
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.role}</p>
              </div>
              <span className="text-xs font-semibold text-primary">Call</span>
            </a>
          ))}
        </div>
      </section>

      <section className="px-5 mb-6">
        <div className="card-elevated p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-secondary-soft text-secondary grid place-items-center">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground">Nearest facility</p>
              <p className="text-xs text-muted-foreground">Bulumkutu PHC • 1.1 km away • Open</p>
            </div>
          </div>
          <button className="w-full tap-target rounded-2xl bg-secondary text-secondary-foreground font-semibold text-sm flex items-center justify-center gap-2">
            <Navigation className="h-4 w-4" /> Get directions
          </button>
        </div>
      </section>

      <section className="px-5 mb-8">
        <h2 className="text-sm font-bold mb-3">First aid checklist</h2>
        <div className="card-elevated p-4">
          <ul className="space-y-3">
            {checklist.map((s, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="h-6 w-6 rounded-full bg-primary-soft text-primary font-bold text-xs grid place-items-center shrink-0">{i + 1}</span>
                <p className="text-sm text-foreground">{s}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-2xl bg-accent-soft border border-accent px-3 py-2 flex items-start gap-2 text-xs text-accent-foreground">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>These steps are general guidance. Always follow instructions from emergency responders.</span>
          </div>
        </div>
      </section>
    </MobileShell>
  );
}
