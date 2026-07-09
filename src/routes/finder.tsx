import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import {
  Accessibility,
  Ambulance,
  Baby,
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  Building2,
  ChevronRight,
  Clock,
  Cross,
  Filter,
  Info,
  Languages,
  MapPin,
  Navigation,
  Phone,
  Pill,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/finder")({
  component: FinderPage,
});

type Category = "PHC" | "Hospital" | "Pharmacy" | "Maternal" | "Emergency";
type Badge = "Government" | "Verified" | "24 Hours" | "Community Recommended";
type Filter =
  | "Nearest"
  | "Open Now"
  | "Maternal Care"
  | "Children"
  | "Emergency"
  | "Pharmacy";

interface Facility {
  id: string;
  name: string;
  category: Category;
  distanceKm: number;
  travelMin: number;
  hours: string;
  open24: boolean;
  openNow: boolean;
  phone: string;
  emergencyPhone?: string;
  rating: number;
  reviews: number;
  services: string[];
  languages: string[];
  walkIns: boolean;
  address: string;
  area: string;
  badges: Badge[];
  tips: string[];
  accessibility: string[];
  coord: { x: string; y: string };
  photoTone: string;
}

const facilities: Facility[] = [
  {
    id: "umth",
    name: "University of Maiduguri Teaching Hospital",
    category: "Hospital",
    distanceKm: 2.4,
    travelMin: 9,
    hours: "Open 24 hours",
    open24: true,
    openNow: true,
    phone: "+234 76 231 3000",
    emergencyPhone: "112",
    rating: 4.6,
    reviews: 1284,
    services: ["Emergency Care", "Surgery", "Paediatrics", "Maternity", "Radiology", "Pharmacy"],
    languages: ["English", "Hausa", "Kanuri", "Fulfulde"],
    walkIns: true,
    address: "Bama Road, Maiduguri",
    area: "Bama Road",
    badges: ["Government", "Verified", "24 Hours"],
    tips: [
      "Bring a valid ID and any past medical records.",
      "Emergency ward entrance is on the east wing.",
      "NHIS accepted at the main billing desk.",
    ],
    accessibility: ["Wheelchair ramps", "Accessible toilets", "Sign language on request"],
    coord: { x: "58%", y: "36%" },
    photoTone: "from-primary/25 via-secondary/20 to-accent/20",
  },
  {
    id: "bulumkutu",
    name: "Bulumkutu Primary Health Centre",
    category: "PHC",
    distanceKm: 1.1,
    travelMin: 5,
    hours: "8:00 AM – 6:00 PM",
    open24: false,
    openNow: true,
    phone: "+234 803 555 0121",
    rating: 4.4,
    reviews: 312,
    services: ["General Consult", "Immunization", "Antenatal", "Malaria Testing"],
    languages: ["English", "Hausa", "Kanuri"],
    walkIns: true,
    address: "Bulumkutu Ward, Maiduguri",
    area: "Bulumkutu",
    badges: ["Government", "Verified", "Community Recommended"],
    tips: [
      "Free immunization for children under 5.",
      "Antenatal clinic runs on Tuesdays and Thursdays.",
    ],
    accessibility: ["Ground-floor access", "Family waiting area"],
    coord: { x: "26%", y: "44%" },
    photoTone: "from-secondary/25 via-primary/20 to-secondary/10",
  },
  {
    id: "state-specialist",
    name: "State Specialist Hospital Maiduguri",
    category: "Hospital",
    distanceKm: 3.8,
    travelMin: 14,
    hours: "Open 24 hours",
    open24: true,
    openNow: true,
    phone: "+234 76 232 0011",
    emergencyPhone: "112",
    rating: 4.5,
    reviews: 902,
    services: ["Emergency", "Surgery", "Internal Medicine", "Diagnostics"],
    languages: ["English", "Hausa", "Kanuri"],
    walkIns: true,
    address: "Shehu Laminu Way, Maiduguri",
    area: "GRA",
    badges: ["Government", "Verified", "24 Hours"],
    tips: ["Referral letter speeds up specialist appointments."],
    accessibility: ["Wheelchair access", "Priority queue for elderly"],
    coord: { x: "70%", y: "58%" },
    photoTone: "from-primary/20 via-primary/10 to-secondary/20",
  },
  {
    id: "alheri",
    name: "Alheri Pharmacy",
    category: "Pharmacy",
    distanceKm: 0.6,
    travelMin: 3,
    hours: "8:00 AM – 10:00 PM",
    open24: false,
    openNow: true,
    phone: "+234 806 000 8899",
    rating: 4.7,
    reviews: 208,
    services: ["Prescription Filling", "OTC Medication", "Blood Pressure Check", "Malaria RDT"],
    languages: ["English", "Hausa"],
    walkIns: true,
    address: "Baga Road, Maiduguri",
    area: "Baga Road",
    badges: ["Verified", "Community Recommended"],
    tips: [
      "Ask for the pharmacist for medication advice.",
      "Home delivery available within 5 km.",
    ],
    accessibility: ["Step-free entrance"],
    coord: { x: "40%", y: "28%" },
    photoTone: "from-accent/25 via-accent/10 to-primary/10",
  },
  {
    id: "gwange",
    name: "Gwange PHC",
    category: "PHC",
    distanceKm: 2.9,
    travelMin: 11,
    hours: "Closed now • Opens 8:00 AM",
    open24: false,
    openNow: false,
    phone: "+234 803 111 0033",
    rating: 4.2,
    reviews: 176,
    services: ["General Consult", "Family Planning", "Immunization"],
    languages: ["English", "Hausa", "Kanuri"],
    walkIns: true,
    address: "Gwange Ward, Maiduguri",
    area: "Gwange",
    badges: ["Government", "Verified"],
    tips: ["Arrive early — queues build up after 9:00 AM."],
    accessibility: ["Ground-floor consult rooms"],
    coord: { x: "48%", y: "72%" },
    photoTone: "from-secondary/20 via-secondary/10 to-primary/10",
  },
  {
    id: "hauwa-maternity",
    name: "Hauwa Memorial Maternal Clinic",
    category: "Maternal",
    distanceKm: 1.8,
    travelMin: 7,
    hours: "7:00 AM – 9:00 PM",
    open24: false,
    openNow: true,
    phone: "+234 805 220 4477",
    emergencyPhone: "+234 805 220 4400",
    rating: 4.8,
    reviews: 421,
    services: ["Antenatal Care", "Safe Delivery", "Postnatal", "Newborn Care", "Family Planning"],
    languages: ["English", "Hausa", "Kanuri", "Fulfulde"],
    walkIns: true,
    address: "Off Damboa Road, Maiduguri",
    area: "Damboa Road",
    badges: ["Verified", "Community Recommended"],
    tips: [
      "Bring antenatal card to every visit.",
      "Free danger-sign screening for pregnant mothers.",
    ],
    accessibility: ["Wheelchair ramp", "Private nursing rooms", "Female staff on request"],
    coord: { x: "34%", y: "60%" },
    photoTone: "from-primary/25 via-accent/15 to-secondary/15",
  },
  {
    id: "red-crescent",
    name: "Borno Red Crescent Emergency Post",
    category: "Emergency",
    distanceKm: 2.1,
    travelMin: 8,
    hours: "Open 24 hours",
    open24: true,
    openNow: true,
    phone: "112",
    emergencyPhone: "112",
    rating: 4.9,
    reviews: 88,
    services: ["Ambulance Dispatch", "First Aid", "Trauma Stabilisation"],
    languages: ["English", "Hausa", "Kanuri"],
    walkIns: true,
    address: "Post Office Area, Maiduguri",
    area: "Post Office",
    badges: ["Verified", "24 Hours", "Community Recommended"],
    tips: [
      "Call 112 first — an ambulance may reach you faster.",
      "Free service for life-threatening emergencies.",
    ],
    accessibility: ["Stretcher access", "24/7 responders"],
    coord: { x: "62%", y: "22%" },
    photoTone: "from-destructive/20 via-destructive/10 to-accent/10",
  },
];

const filters: { key: Filter; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "Nearest", icon: MapPin },
  { key: "Open Now", icon: Clock },
  { key: "Maternal Care", icon: Baby },
  { key: "Children", icon: Users },
  { key: "Emergency", icon: Ambulance },
  { key: "Pharmacy", icon: Pill },
];

const categoryMeta: Record<Category, { label: string; icon: React.ComponentType<{ className?: string }>; tone: string; softTone: string }> = {
  PHC: { label: "Primary Health Centre", icon: Stethoscope, tone: "text-secondary", softTone: "bg-secondary-soft" },
  Hospital: { label: "General Hospital", icon: Building2, tone: "text-primary", softTone: "bg-primary-soft" },
  Pharmacy: { label: "Pharmacy", icon: Pill, tone: "text-accent-foreground", softTone: "bg-accent-soft" },
  Maternal: { label: "Maternal Clinic", icon: Baby, tone: "text-primary", softTone: "bg-primary-soft" },
  Emergency: { label: "Emergency Facility", icon: Ambulance, tone: "text-destructive", softTone: "bg-destructive-soft" },
};

const badgeMeta: Record<Badge, { icon: React.ComponentType<{ className?: string }>; tone: string }> = {
  Government: { icon: ShieldCheck, tone: "bg-secondary-soft text-secondary" },
  Verified: { icon: BadgeCheck, tone: "bg-primary-soft text-primary" },
  "24 Hours": { icon: Clock, tone: "bg-accent-soft text-accent-foreground" },
  "Community Recommended": { icon: Sparkles, tone: "bg-primary-soft text-primary" },
};

function FinderPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Filter>("Nearest");
  const [view, setView] = useState<"list" | "map">("list");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Facility | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = facilities.slice();
    if (q) {
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.area.toLowerCase().includes(q) ||
          f.services.some((s) => s.toLowerCase().includes(q)),
      );
    }
    switch (active) {
      case "Open Now":
        list = list.filter((f) => f.openNow);
        break;
      case "Maternal Care":
        list = list.filter((f) => f.category === "Maternal" || f.services.some((s) => /matern|antenatal|deliver/i.test(s)));
        break;
      case "Children":
        list = list.filter((f) => f.services.some((s) => /paed|immun|newborn|child/i.test(s)));
        break;
      case "Emergency":
        list = list.filter((f) => f.category === "Emergency" || f.open24);
        break;
      case "Pharmacy":
        list = list.filter((f) => f.category === "Pharmacy");
        break;
      case "Nearest":
      default:
        list.sort((a, b) => a.distanceKm - b.distanceKm);
    }
    return list;
  }, [query, active]);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <MobileShell>
      <PageHeader
        title="Find care nearby"
        subtitle="Maiduguri, Borno State"
        back="/home"
        right={
          <button
            className="tap-target grid place-items-center h-11 w-11 rounded-2xl bg-card border border-border text-foreground"
            aria-label="Filter"
          >
            <Filter className="h-5 w-5" />
          </button>
        }
      />

      <section className="px-5 mb-3">
        <label className="relative block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clinics, hospitals, pharmacies"
            className="w-full tap-target rounded-2xl bg-card border border-input pl-12 pr-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </label>
      </section>

      <section className="px-5 mb-3 flex items-center gap-3">
        <div className="flex gap-2 overflow-x-auto -mx-1 px-1 flex-1 scrollbar-none">
          {filters.map(({ key, icon: Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`shrink-0 h-10 px-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {key}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-5 mb-4 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-bold text-foreground">{filtered.length}</span> {filtered.length === 1 ? "facility" : "facilities"} near you
        </p>
        <div className="flex bg-muted rounded-full p-1 shrink-0" role="tablist">
          <button
            onClick={() => setView("list")}
            role="tab"
            aria-selected={view === "list"}
            className={`h-8 px-3 rounded-full text-xs font-semibold ${view === "list" ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"}`}
          >
            List
          </button>
          <button
            onClick={() => setView("map")}
            role="tab"
            aria-selected={view === "map"}
            className={`h-8 px-3 rounded-full text-xs font-semibold ${view === "map" ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"}`}
          >
            Map
          </button>
        </div>
      </section>

      {view === "map" && (
        <MapView facilities={filtered} onSelect={setSelected} />
      )}

      <section className="px-5 pb-8 space-y-3">
        {filtered.length === 0 ? (
          <div className="card-elevated p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-muted grid place-items-center mb-3">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">No facilities match your filters</p>
            <p className="text-xs text-muted-foreground mt-1">Try a different filter or search term.</p>
          </div>
        ) : (
          filtered.map((f) => (
            <FacilityCard
              key={f.id}
              f={f}
              saved={saved.has(f.id)}
              onSave={() => toggleSave(f.id)}
              onOpen={() => setSelected(f)}
            />
          ))
        )}
      </section>

      {selected && (
        <FacilityDetail
          f={selected}
          saved={saved.has(selected.id)}
          onSave={() => toggleSave(selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </MobileShell>
  );
}

function MapView({ facilities, onSelect }: { facilities: Facility[]; onSelect: (f: Facility) => void }) {
  return (
    <section className="px-5 mb-4">
      <div className="relative h-72 rounded-3xl overflow-hidden border border-border shadow-card bg-gradient-to-br from-secondary-soft via-primary-soft to-accent-soft">
        {/* Streets */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grid)" opacity="0.6" />
          <path d="M0 140 Q120 60 240 120 T400 100" stroke="var(--color-secondary)" strokeWidth="3" fill="none" opacity="0.55" />
          <path d="M0 80 Q140 200 260 130 T400 200" stroke="var(--color-primary)" strokeWidth="3" fill="none" opacity="0.5" />
          <path d="M60 0 Q80 150 40 300" stroke="var(--color-accent)" strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M320 0 Q290 150 340 300" stroke="var(--color-secondary)" strokeWidth="2" fill="none" opacity="0.4" />
        </svg>

        {/* You marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 h-6 w-6 rounded-full bg-secondary/40 animate-ping" />
            <div className="relative h-6 w-6 rounded-full bg-secondary border-2 border-card shadow-lift" />
          </div>
        </div>

        {/* Facility pins */}
        {facilities.map((f) => {
          const meta = categoryMeta[f.category];
          const Icon = meta.icon;
          const tone =
            f.category === "Emergency"
              ? "bg-destructive"
              : f.category === "Hospital"
              ? "bg-primary"
              : f.category === "Pharmacy"
              ? "bg-accent"
              : f.category === "Maternal"
              ? "bg-primary"
              : "bg-secondary";
          return (
            <button
              key={f.id}
              onClick={() => onSelect(f)}
              className="absolute -translate-x-1/2 -translate-y-full group"
              style={{ left: f.coord.x, top: f.coord.y }}
              aria-label={`Open ${f.name}`}
            >
              <div className={`h-9 w-9 rounded-full ${tone} border-[3px] border-card shadow-lift grid place-items-center group-hover:scale-110 transition-transform`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div className={`mx-auto h-2 w-2 -mt-0.5 rotate-45 ${tone}`} />
            </button>
          );
        })}

        <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-card/95 backdrop-blur px-3 py-1.5 text-xs font-semibold shadow-soft">
          <MapPin className="h-3.5 w-3.5 text-primary" /> Maiduguri
        </div>
        <div className="absolute bottom-3 right-3 flex flex-col gap-2">
          <button className="h-9 w-9 rounded-2xl bg-card/95 backdrop-blur grid place-items-center shadow-soft text-foreground font-bold">+</button>
          <button className="h-9 w-9 rounded-2xl bg-card/95 backdrop-blur grid place-items-center shadow-soft text-foreground font-bold">−</button>
        </div>
        <div className="absolute bottom-3 left-3 rounded-2xl bg-card/95 backdrop-blur px-3 py-2 text-[11px] shadow-soft">
          <p className="font-bold text-foreground mb-1">Legend</p>
          <div className="flex flex-col gap-1 text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Hospital</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary" /> PHC</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /> Pharmacy</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /> Emergency</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilityCard({
  f,
  saved,
  onSave,
  onOpen,
}: {
  f: Facility;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
}) {
  const meta = categoryMeta[f.category];
  const Icon = meta.icon;
  return (
    <article className="card-elevated overflow-hidden animate-soft-in">
      <button onClick={onOpen} className="w-full text-left">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className={`h-12 w-12 rounded-2xl grid place-items-center shrink-0 ${meta.softTone} ${meta.tone}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-bold text-foreground text-[15px] leading-snug truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{meta.label} • {f.area}</p>
                </div>
                <span
                  className={`text-[11px] font-bold px-2 py-1 rounded-lg shrink-0 ${
                    f.openNow ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {f.openNow ? (f.open24 ? "24 Hrs" : "Open") : "Closed"}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {f.distanceKm} km</span>
                <span className="flex items-center gap-1"><Navigation className="h-3 w-3" /> {f.travelMin} min</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-accent" strokeWidth={2.5} /> {f.rating}</span>
                {f.walkIns && <span className="flex items-center gap-1 text-primary font-semibold">Walk-ins OK</span>}
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {f.badges.slice(0, 3).map((b) => {
                  const bm = badgeMeta[b];
                  const BIcon = bm.icon;
                  return (
                    <span key={b} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${bm.tone}`}>
                      <BIcon className="h-3 w-3" /> {b}
                    </span>
                  );
                })}
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {f.services.slice(0, 3).map((s) => (
                  <span key={s} className="text-[10px] font-medium rounded-md px-1.5 py-0.5 bg-muted text-muted-foreground">
                    {s}
                  </span>
                ))}
                {f.services.length > 3 && (
                  <span className="text-[10px] font-medium text-muted-foreground">+{f.services.length - 3} more</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </button>

      <div className="flex gap-2 px-4 pb-4">
        <a
          href={`tel:${f.phone}`}
          className="flex-1 tap-target rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <button
          className="tap-target rounded-xl border border-border text-foreground font-semibold text-sm px-4 flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Navigation className="h-4 w-4" /> Directions
        </button>
        <button
          onClick={onSave}
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved" : "Save facility"}
          className={`tap-target grid place-items-center h-11 w-11 rounded-xl border ${
            saved ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground"
          }`}
        >
          {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>
    </article>
  );
}

function FacilityDetail({
  f,
  saved,
  onSave,
  onClose,
}: {
  f: Facility;
  saved: boolean;
  onSave: () => void;
  onClose: () => void;
}) {
  const meta = categoryMeta[f.category];
  const Icon = meta.icon;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-soft-in" onClick={onClose} />
      <div className="relative w-full max-w-[480px] max-h-[92dvh] bg-background rounded-t-[28px] sm:rounded-3xl overflow-hidden flex flex-col animate-slide-up shadow-lift">
        {/* Cover */}
        <div className={`relative h-40 bg-gradient-to-br ${f.photoTone}`}>
          <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 160" preserveAspectRatio="none">
            <defs>
              <pattern id="dp" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="400" height="160" fill="url(#dp)" className="text-foreground" />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className={`h-20 w-20 rounded-3xl grid place-items-center bg-card shadow-lift ${meta.tone}`}>
              <Icon className="h-10 w-10" />
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 h-10 w-10 rounded-full bg-card/95 backdrop-blur grid place-items-center shadow-soft"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={onSave}
            aria-label={saved ? "Remove from saved" : "Save facility"}
            className="absolute top-3 left-3 h-10 w-10 rounded-full bg-card/95 backdrop-blur grid place-items-center shadow-soft"
          >
            {saved ? <BookmarkCheck className="h-5 w-5 text-primary" /> : <Bookmark className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-32">
          {/* Title */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{meta.label}</p>
              <h2 className="text-xl font-bold text-foreground leading-tight mt-1">{f.name}</h2>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {f.address}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 justify-end">
                <Star className="h-4 w-4 text-accent" strokeWidth={2.5} />
                <span className="text-sm font-bold">{f.rating}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{f.reviews} reviews</p>
            </div>
          </div>

          {/* Quick facts */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <QuickFact icon={Navigation} label={`${f.distanceKm} km`} sub={`${f.travelMin} min`} />
            <QuickFact
              icon={Clock}
              label={f.openNow ? (f.open24 ? "24 Hours" : "Open now") : "Closed"}
              sub={f.hours}
              tone={f.openNow ? "primary" : "muted"}
            />
            <QuickFact icon={Users} label={f.walkIns ? "Walk-ins" : "Booking"} sub={f.walkIns ? "Accepted" : "Required"} />
          </div>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {f.badges.map((b) => {
              const bm = badgeMeta[b];
              const BIcon = bm.icon;
              return (
                <span key={b} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${bm.tone}`}>
                  <BIcon className="h-3.5 w-3.5" /> {b}
                </span>
              );
            })}
          </div>

          <Section title="Services offered" icon={Cross}>
            <div className="flex flex-wrap gap-1.5">
              {f.services.map((s) => (
                <span key={s} className="text-xs font-medium rounded-lg px-2.5 py-1 bg-muted text-foreground">
                  {s}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Opening hours" icon={Clock}>
            <p className="text-sm text-foreground">{f.hours}</p>
            {f.open24 && (
              <p className="text-xs text-muted-foreground mt-1">Open every day, including public holidays.</p>
            )}
          </Section>

          <Section title="Languages spoken" icon={Languages}>
            <div className="flex flex-wrap gap-1.5">
              {f.languages.map((l) => (
                <span key={l} className="text-xs font-semibold rounded-full px-2.5 py-1 bg-secondary-soft text-secondary">
                  {l}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Emergency contacts" icon={Ambulance}>
            <div className="space-y-2">
              <ContactRow label="Main line" number={f.phone} />
              {f.emergencyPhone && <ContactRow label="Emergency" number={f.emergencyPhone} urgent />}
              <ContactRow label="National emergency" number="112" urgent />
            </div>
          </Section>

          <Section title="Patient tips" icon={Info}>
            <ul className="space-y-2">
              {f.tips.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Accessibility" icon={Accessibility}>
            <ul className="space-y-2">
              {f.accessibility.map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm text-foreground">
                  <BadgeCheck className="h-4 w-4 text-primary shrink-0" /> {a}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Payment & coverage" icon={Wallet}>
            <p className="text-sm text-foreground">NHIS accepted • Cash & transfer • Discounted fees for children under 5.</p>
          </Section>
        </div>

        {/* Sticky action bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border safe-bottom px-4 pt-3">
          <div className="flex gap-2">
            <button
              className="flex-1 tap-target rounded-2xl border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Navigation className="h-4 w-4" /> Directions
            </button>
            <a
              href={`tel:${f.phone}`}
              className="flex-[1.4] tap-target rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-lift"
            >
              <Phone className="h-4 w-4" /> Call {f.category === "Emergency" ? "now" : "facility"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickFact({
  icon: Icon,
  label,
  sub,
  tone = "muted",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  tone?: "primary" | "muted";
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className={`h-8 w-8 rounded-xl grid place-items-center ${tone === "primary" ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground"}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-sm font-bold text-foreground mt-2 leading-tight">{label}</p>
      <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{sub}</p>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-7 w-7 rounded-lg bg-primary-soft text-primary grid place-items-center">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function ContactRow({ label, number, urgent }: { label: string; number: string; urgent?: boolean }) {
  return (
    <a
      href={`tel:${number}`}
      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
        urgent ? "border-destructive/30 bg-destructive-soft" : "border-border bg-card"
      }`}
    >
      <div>
        <p className={`text-[11px] font-semibold uppercase tracking-wider ${urgent ? "text-destructive" : "text-muted-foreground"}`}>{label}</p>
        <p className={`text-sm font-bold ${urgent ? "text-destructive" : "text-foreground"}`}>{number}</p>
      </div>
      <span className={`h-9 w-9 rounded-xl grid place-items-center ${urgent ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}>
        <Phone className="h-4 w-4" />
      </span>
      <ChevronRight className="hidden" />
    </a>
  );
}
