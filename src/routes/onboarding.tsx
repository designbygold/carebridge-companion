import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import img1 from "@/assets/onboarding-1.jpg";
import img2 from "@/assets/onboarding-2.jpg";
import img3 from "@/assets/onboarding-3.jpg";
import img4 from "@/assets/onboarding-4.jpg";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
  head: () => ({
    meta: [
      { title: "Welcome to CareBridge" },
      { name: "description", content: "A calm, trusted health companion for every family." },
    ],
  }),
});

const slides = [
  {
    img: img1,
    tint: "from-primary-soft via-background to-accent-soft/40",
    eyebrow: "Welcome",
    title: "Healthcare guidance you can trust.",
    body: "Helping families make safer healthcare decisions every day.",
  },
  {
    img: img2,
    tint: "from-accent-soft/60 via-background to-primary-soft",
    eyebrow: "For your family",
    title: "Care for everyone you love.",
    body: "Store family health records, reminders and vaccinations in one secure place.",
  },
  {
    img: img3,
    tint: "from-secondary-soft via-background to-primary-soft",
    eyebrow: "Care nearby",
    title: "Find care nearby.",
    body: "Locate nearby clinics, pharmacies and healthcare facilities when you need them most.",
  },
  {
    img: img4,
    tint: "from-primary-soft via-background to-secondary-soft",
    eyebrow: "Always with you",
    title: "You're never alone.",
    body: "Lafiya Guide helps you understand your next best step.",
  },
];

function OnboardingPage() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const slide = slides[i];
  const isLast = i === slides.length - 1;

  const next = () => (isLast ? navigate({ to: "/home" }) : setI((v) => v + 1));

  return (
    <div className={`min-h-dvh bg-gradient-to-b ${slide.tint} transition-colors duration-700`}>
      <div className="mx-auto max-w-[480px] min-h-dvh flex flex-col px-6 pt-6 pb-8 safe-bottom">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            CareBridge
          </span>
          {!isLast && (
            <button
              onClick={() => navigate({ to: "/home" })}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip
            </button>
          )}
        </div>

        {/* Illustration */}
        <div className="mt-6 relative">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[40px] bg-primary/10 blur-3xl"
          />
          <div
            key={i}
            className="relative animate-soft-in rounded-[32px] overflow-hidden shadow-lift border border-border/60 bg-card aspect-square"
          >
            <img
              src={slide.img}
              alt=""
              width={1200}
              height={1200}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>

        {/* Copy */}
        <div key={`copy-${i}`} className="mt-8 animate-slide-up">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary/80">
            {slide.eyebrow}
          </p>
          <h1 className="mt-3 text-[28px] leading-[1.15] font-extrabold tracking-tight text-foreground">
            {slide.title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground max-w-[38ch]">
            {slide.body}
          </p>
        </div>

        <div className="flex-1" />

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 pt-8" role="tablist" aria-label="Onboarding progress">
          {slides.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === i}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === i
                  ? "w-8 bg-primary"
                  : idx < i
                    ? "w-2 bg-primary/50"
                    : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 space-y-3">
          {isLast ? (
            <>
              <button
                onClick={() => navigate({ to: "/home" })}
                className="tap-target w-full flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lift active:scale-[0.99] transition-transform"
              >
                Get Started
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
              <Link
                to="/home"
                className="tap-target w-full flex items-center justify-center rounded-2xl bg-card border border-border px-6 text-base font-semibold text-foreground"
              >
                Continue in Hausa
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={next}
                className="tap-target w-full flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lift active:scale-[0.99] transition-transform"
              >
                Continue
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
              <p className="text-center text-xs text-muted-foreground">
                {i + 1} of {slides.length}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
