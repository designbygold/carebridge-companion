import { Link, useLocation } from "@tanstack/react-router";
import { Home, HeartPulse, Users, BookOpen, User } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/assessment", label: "Check", icon: HeartPulse },
  { to: "/family", label: "Family", icon: Users },
  { to: "/library", label: "Learn", icon: BookOpen },
  { to: "/profile", label: "Profile", icon: User },
] as const;

interface MobileShellProps {
  children: ReactNode;
  hideNav?: boolean;
  className?: string;
  wide?: boolean;
}

export function MobileShell({ children, hideNav, className, wide }: MobileShellProps) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-dvh bg-background">
      <div className={`mx-auto ${wide ? "w-full max-w-7xl" : "max-w-[480px]"} min-h-dvh bg-background flex flex-col relative`}>
        <main
          key={pathname}
          className={`flex-1 flex flex-col animate-page-enter ${hideNav ? "" : "pb-24"} ${className ?? ""}`}
        >
          {children}
        </main>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}

function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] safe-bottom pt-2 px-3 bg-card/90 backdrop-blur-xl border-t border-border/70 z-40 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.08)]"
    >
      <ul className="grid grid-cols-5 gap-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/home" && pathname.startsWith(to));
          return (
            <li key={to}>
              <Link
                to={to}
                aria-label={label}
                className={`relative flex flex-col items-center gap-1 py-2 rounded-2xl tap-target transition-colors duration-300 ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={`grid place-items-center h-9 w-9 rounded-xl transition-all duration-300 ${
                    active ? "bg-primary-soft scale-105" : "scale-100"
                  }`}
                >
                  <Icon className="h-5 w-5 transition-transform duration-300" strokeWidth={active ? 2.5 : 2} />
                </span>
                <span className="text-[11px] font-semibold tracking-tight">{label}</span>
                <span
                  aria-hidden
                  className={`absolute -top-0.5 h-1 w-6 rounded-full bg-primary transition-all duration-500 ${
                    active ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function PageHeader({
  title,
  subtitle,
  back,
  right,
}: {
  title: string;
  subtitle?: string;
  back?: string | boolean;
  right?: ReactNode;
}) {
  return (
    <header className="px-5 pt-6 pb-4 flex items-start gap-3">
      {back && (
        <Link
          to={typeof back === "string" ? back : "/home"}
          className="tap-target grid place-items-center h-11 w-11 -ml-2 rounded-2xl hover:bg-muted text-foreground"
          aria-label="Go back"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </Link>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-foreground truncate">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
