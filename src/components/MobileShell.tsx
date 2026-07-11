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
}

export function MobileShell({ children, hideNav, className }: MobileShellProps) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-[480px] min-h-dvh bg-background flex flex-col relative">
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
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] safe-bottom pt-2 px-3 bg-card/95 backdrop-blur-lg border-t border-border z-40"
    >
      <ul className="grid grid-cols-5 gap-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/home" && pathname.startsWith(to));
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 py-2 rounded-2xl tap-target transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span className={`grid place-items-center h-8 w-8 rounded-xl transition-colors ${active ? "bg-primary-soft" : ""}`}>
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
                </span>
                <span className="text-[11px] font-semibold">{label}</span>
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
