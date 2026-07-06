import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import { Clock, MapPin, Navigation, Phone, Search, Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/finder")({
  component: FinderPage,
});

const facilities = [
  { id: "1", name: "University of Maiduguri Teaching Hospital", type: "Hospital", distance: "2.4 km", hours: "24/7", phone: "+234 76 231 3000", rating: 4.6, open: true, tone: "primary" },
  { id: "2", name: "Bulumkutu Primary Health Centre", type: "PHC", distance: "1.1 km", hours: "8:00 AM – 6:00 PM", phone: "+234 803 555 0121", rating: 4.4, open: true, tone: "secondary" },
  { id: "3", name: "State Specialist Hospital Maiduguri", type: "Hospital", distance: "3.8 km", hours: "24/7", phone: "+234 76 232 0011", rating: 4.5, open: true, tone: "primary" },
  { id: "4", name: "Alheri Pharmacy", type: "Pharmacy", distance: "0.6 km", hours: "8:00 AM – 10:00 PM", phone: "+234 806 000 8899", rating: 4.7, open: true, tone: "accent" },
  { id: "5", name: "Gwange PHC", type: "PHC", distance: "2.9 km", hours: "Closed now • Opens 8:00 AM", phone: "+234 803 111 0033", rating: 4.2, open: false, tone: "secondary" },
];

const filters = ["All", "Hospital", "PHC", "Pharmacy"] as const;

function FinderPage() {
  const [active, setActive] = useState<typeof filters[number]>("All");
  const [view, setView] = useState<"list" | "map">("list");
  const items = active === "All" ? facilities : facilities.filter((f) => f.type === active);

  return (
    <MobileShell>
      <PageHeader title="Find care nearby" subtitle="Maiduguri, Borno State" back="/home" />

      <section className="px-5 mb-4">
        <label className="relative block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input placeholder="Search clinics, hospitals, pharmacies"
            className="w-full tap-target rounded-2xl bg-card border border-input pl-12 pr-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </label>
      </section>

      <section className="px-5 mb-4 flex items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
          {filters.map((f) => (
            <button key={f} onClick={() => setActive(f)}
              className={`shrink-0 min-h-9 px-4 rounded-full text-sm font-semibold transition-colors ${active === f ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex bg-muted rounded-full p-1 shrink-0">
          <button onClick={() => setView("list")} className={`h-8 px-3 rounded-full text-xs font-semibold ${view === "list" ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"}`}>List</button>
          <button onClick={() => setView("map")} className={`h-8 px-3 rounded-full text-xs font-semibold ${view === "map" ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"}`}>Map</button>
        </div>
      </section>

      {view === "map" && (
        <section className="px-5 mb-4">
          <div className="relative h-56 rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-secondary-soft via-primary-soft to-accent-soft">
            <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none">
              <path d="M0 120 Q100 60 200 100 T400 80" stroke="var(--color-secondary)" strokeWidth="2" fill="none" />
              <path d="M0 60 Q120 140 240 90 T400 140" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
            </svg>
            {[
              { x: "22%", y: "38%", tone: "bg-primary" },
              { x: "55%", y: "58%", tone: "bg-secondary" },
              { x: "72%", y: "30%", tone: "bg-accent" },
              { x: "40%", y: "70%", tone: "bg-primary" },
            ].map((p, i) => (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: p.x, top: p.y }}>
                <div className={`h-6 w-6 rounded-full ${p.tone} border-2 border-card shadow-lift grid place-items-center`}>
                  <MapPin className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
              </div>
            ))}
            <div className="absolute top-3 left-3 rounded-full bg-card/95 backdrop-blur px-3 py-1 text-xs font-semibold shadow-soft">Maiduguri</div>
          </div>
        </section>
      )}

      <section className="px-5 pb-8 space-y-3">
        {items.map((f) => <FacilityCard key={f.id} f={f} />)}
      </section>
    </MobileShell>
  );
}

function FacilityCard({ f }: { f: typeof facilities[number] }) {
  const tones: Record<string, string> = {
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary-soft text-secondary",
    accent: "bg-accent-soft text-accent-foreground",
  };
  return (
    <div className="card-elevated p-4">
      <div className="flex items-start gap-3">
        <div className={`h-12 w-12 rounded-2xl grid place-items-center shrink-0 ${tones[f.tone]}`}>
          <MapPin className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-bold text-foreground text-sm leading-snug">{f.name}</p>
              <p className="text-xs text-muted-foreground">{f.type} • {f.distance}</p>
            </div>
            <span className={`text-[11px] font-bold px-2 py-1 rounded-lg shrink-0 ${f.open ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground"}`}>
              {f.open ? "Open" : "Closed"}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {f.hours}</span>
            <span className="flex items-center gap-1"><Star className="h-3 w-3 text-accent" strokeWidth={2.5} /> {f.rating}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <a href={`tel:${f.phone}`} className="flex-1 tap-target rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2">
          <Phone className="h-4 w-4" /> Call
        </a>
        <button className="tap-target rounded-xl border border-border text-foreground font-semibold text-sm px-4 flex items-center gap-2">
          <Navigation className="h-4 w-4" /> Directions
        </button>
      </div>
    </div>
  );
}
