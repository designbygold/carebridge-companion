import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-[480px] min-h-dvh flex flex-col px-6 pt-14 pb-8 safe-bottom">
        <Link to="/" className="text-sm text-muted-foreground">← Back</Link>
        <div className="mt-8 animate-soft-in">
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to continue caring for your family.</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Field label="Phone number" placeholder="+234 800 000 0000" type="tel" />
          <Field label="Password" placeholder="Enter your password" type="password" />
          <div className="flex justify-end">
            <button type="button" className="text-sm font-semibold text-primary">Forgot password?</button>
          </div>
        </form>

        <div className="flex-1" />

        <Link
          to="/otp"
          className="tap-target flex items-center justify-center rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lift"
        >
          Sign in
        </Link>
        <p className="text-center text-sm text-muted-foreground mt-4">
          New to CareBridge?{" "}
          <Link to="/register" className="text-primary font-semibold">Create account</Link>
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
