import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/language")({
  component: LanguagePage,
});

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "ha", label: "Hausa", native: "Hausa" },
  { code: "kr", label: "Kanuri", native: "Kanuri" },
  { code: "ff", label: "Fulfulde", native: "Fulfulde" },
  { code: "ig", label: "Igbo", native: "Igbo" },
  { code: "yo", label: "Yoruba", native: "Yorùbá" },
];

function LanguagePage() {
  const [selected, setSelected] = useState("en");
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-[480px] min-h-dvh flex flex-col px-6 pt-14 pb-8 safe-bottom">
        <div className="animate-soft-in">
          <h1 className="text-3xl font-extrabold tracking-tight">Choose your language</h1>
          <p className="mt-2 text-muted-foreground">You can change this later in Settings.</p>
        </div>
        <ul className="mt-8 space-y-3">
          {languages.map((l) => (
            <li key={l.code}>
              <button
                onClick={() => setSelected(l.code)}
                className={`w-full tap-target flex items-center justify-between rounded-2xl px-5 py-4 border transition-colors text-left ${
                  selected === l.code
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-card hover:bg-muted"
                }`}
              >
                <div>
                  <p className="font-semibold text-foreground">{l.label}</p>
                  <p className="text-sm text-muted-foreground">{l.native}</p>
                </div>
                <span className={`h-7 w-7 rounded-full grid place-items-center ${selected === l.code ? "bg-primary text-primary-foreground" : "bg-muted text-transparent"}`}>
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex-1" />
        <Link
          to="/register"
          className="tap-target flex items-center justify-center rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lift mt-6"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
