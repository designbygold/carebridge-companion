import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import { Bookmark, ChevronRight, Clock, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/library")({
  head: () => ({ meta: [
    { title: "Health Library | CareBridge" },
    { name: "description", content: "Explore practical health articles for families and caregivers." },
    { property: "og:title", content: "Health Library | CareBridge" },
    { property: "og:description", content: "Explore practical health articles for families and caregivers." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: LibraryPage,
});

const categories = [
  { key: "malaria", label: "Malaria", color: "bg-primary text-primary-foreground", emoji: "🦟" },
  { key: "cholera", label: "Cholera", color: "bg-secondary text-secondary-foreground", emoji: "💧" },
  { key: "pregnancy", label: "Pregnancy", color: "bg-accent text-accent-foreground", emoji: "🤰" },
  { key: "nutrition", label: "Nutrition", color: "bg-primary text-primary-foreground", emoji: "🥗" },
  { key: "mental", label: "Mental health", color: "bg-secondary text-secondary-foreground", emoji: "🧠" },
  { key: "water", label: "Water safety", color: "bg-secondary text-secondary-foreground", emoji: "🚰" },
  { key: "firstaid", label: "First aid", color: "bg-destructive text-destructive-foreground", emoji: "🩹" },
];

const articles = [
  { id: "1", cat: "Malaria", title: "Preventing malaria during the rainy season", read: "4 min", featured: true },
  { id: "2", cat: "First aid", title: "Recognising dehydration in children", read: "3 min" },
  { id: "3", cat: "Water safety", title: "Safe drinking water: boil, treat, store", read: "3 min" },
  { id: "4", cat: "First aid", title: "Managing childhood fever at home", read: "4 min" },
  { id: "5", cat: "Pregnancy", title: "Nutrition during pregnancy — a Maiduguri kitchen guide", read: "5 min" },
  { id: "6", cat: "Pregnancy", title: "Breastfeeding tips for the first six months", read: "5 min" },
  { id: "7", cat: "Nutrition", title: "Heat safety: keeping your family cool and hydrated", read: "4 min" },
  { id: "8", cat: "Mental health", title: "Mental wellbeing for busy caregivers", read: "6 min" },
];

function LibraryPage() {
  const [q, setQ] = useState("");
  const filtered = articles.filter((a) => a.title.toLowerCase().includes(q.toLowerCase()) || a.cat.toLowerCase().includes(q.toLowerCase()));

  return (
    <MobileShell>
      <PageHeader title="Health Library" subtitle="Trusted articles in plain language" />

      <section className="px-5 mb-5">
        <label className="relative block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles or topics"
            className="w-full tap-target rounded-2xl bg-card border border-input pl-12 pr-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </label>
      </section>

      <section className="px-5 mb-6">
        <h2 className="text-sm font-bold mb-3">Categories</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((c) => (
            <button key={c.key} className="flex flex-col items-center gap-2 tap-target">
              <div className={`h-14 w-14 rounded-2xl grid place-items-center text-2xl shadow-soft ${c.color}`}>{c.emoji}</div>
              <span className="text-[11px] font-semibold text-foreground text-center leading-tight">{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      {!q && (
        <section className="px-5 mb-6">
          <FeaturedCard article={articles[0]} />
        </section>
      )}

      <section className="px-5 pb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold">{q ? "Results" : "For your family"}</h2>
          <button className="text-xs font-semibold text-primary">Saved</button>
        </div>
        <div className="space-y-3">
          {filtered.slice(q ? 0 : 1).map((a) => <ArticleRow key={a.id} article={a} />)}
          {filtered.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No articles match "{q}"</p>}
        </div>
      </section>
    </MobileShell>
  );
}

function FeaturedCard({ article }: { article: typeof articles[number] }) {
  return (
    <Link to="/library" className="block rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-[#158a5c] text-white p-5 shadow-lift">
      <p className="text-xs font-bold uppercase tracking-wider opacity-90">Featured • {article.cat}</p>
      <h3 className="mt-2 text-xl font-extrabold leading-snug">{article.title}</h3>
      <div className="mt-4 flex items-center gap-3 text-sm opacity-90">
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {article.read}</span>
        <span>•</span>
        <span>Includes prevention & when to visit a clinic</span>
      </div>
    </Link>
  );
}

function ArticleRow({ article }: { article: typeof articles[number] }) {
  return (
    <Link to="/library" className="card-elevated p-4 flex items-center gap-3">
      <div className="h-12 w-12 rounded-2xl bg-primary-soft text-primary grid place-items-center font-bold shrink-0">
        {article.cat[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{article.cat}</p>
        <p className="font-semibold text-foreground text-sm leading-snug mt-0.5 line-clamp-2">{article.title}</p>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Clock className="h-3 w-3" /> {article.read}</p>
      </div>
      <button aria-label="Save article" className="tap-target grid place-items-center h-10 w-10 rounded-xl hover:bg-muted text-muted-foreground shrink-0">
        <Bookmark className="h-4 w-4" />
      </button>
      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
    </Link>
  );
}
