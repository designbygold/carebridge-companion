import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-6">
      <div className="max-w-sm text-center animate-soft-in">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-soft text-primary text-3xl font-bold">
          404
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you were looking for isn't here. Let's get you back home.
        </p>
        <Link
          to="/home"
          className="mt-6 inline-flex tap-target items-center justify-center rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-6">
      <div className="max-w-sm text-center">
        <h1 className="text-xl font-semibold text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't complete that action. Please try again in a moment.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="tap-target inline-flex items-center justify-center rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/home"
            className="tap-target inline-flex items-center justify-center rounded-2xl border border-border bg-card px-6 text-sm font-semibold text-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1FA971" },
      { title: "CareBridge — Trusted health guidance for every family" },
      { name: "description", content: "CareBridge is an AI community health companion helping families in Northern Nigeria make informed healthcare decisions with guided assessments, medication reminders, and nearby clinic discovery." },
      { name: "author", content: "CareBridge" },
      { property: "og:title", content: "CareBridge — Trusted health guidance for every family" },
      { property: "og:description", content: "CareBridge is an AI community health companion helping families in Northern Nigeria make informed healthcare decisions with guided assessments, medication reminders, and nearby clinic discovery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CareBridge — Trusted health guidance for every family" },
      { name: "twitter:description", content: "CareBridge is an AI community health companion helping families in Northern Nigeria make informed healthcare decisions with guided assessments, medication reminders, and nearby clinic discovery." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8457cec8-d64d-4b2a-9e41-a0afc58a735b/id-preview-cef3c930--2947d69c-9f8e-4ca1-816e-e60436a1c3f5.lovable.app-1783757494961.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8457cec8-d64d-4b2a-9e41-a0afc58a735b/id-preview-cef3c930--2947d69c-9f8e-4ca1-816e-e60436a1c3f5.lovable.app-1783757494961.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
