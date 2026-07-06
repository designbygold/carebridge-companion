import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-[480px] min-h-dvh flex flex-col px-6 pt-14 pb-8 safe-bottom">
        <Link to="/language" className="text-sm text-muted-foreground">← Back</Link>
        <div className="mt-8 animate-soft-in">
          <h1 className="text-3xl font-extrabold tracking-tight">Create your account</h1>
          <p className="mt-2 text-muted-foreground">A safe place for your family's health.</p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Field label="Full name" placeholder="Aisha Ibrahim" />
          <Field label="Phone number" placeholder="+234 800 000 0000" type="tel" />
          <Field label="Location" placeholder="Maiduguri, Borno" />
          <Field label="Password" placeholder="Create a password" type="password" />
        </form>
        <div className="flex-1" />
        <Link
          to="/otp"
          className="tap-target flex items-center justify-center rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lift"
        >
          Create account
        </Link>
        <p className="text-center text-xs text-muted-foreground mt-4">
          By continuing you agree to CareBridge's community care principles and privacy policy.
        </p>
      </div>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <input
        {...props}
        className="mt-2 w-full tap-target rounded-2xl border border-input bg-card px-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
    </label>
  );
}
