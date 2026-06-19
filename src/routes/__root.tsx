import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/lib/i18n";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { LogoSplash } from "@/components/LogoSplash";
import { WildlifePopup } from "@/components/WildlifePopup";
import { CookieConsent } from "@/components/CookieConsent";
import { CompassGate } from "@/components/CompassGate";
import { CustomCursor } from "@/components/CustomCursor";
import { InstallBanner } from "@/components/InstallBanner";
import { useTranslation } from "react-i18next";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center paper-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-forest">404</h1>
        <p className="mt-4 font-serif text-xl text-muted-foreground">This trail has gone cold.</p>
        <Link to="/" className="inline-block mt-8 px-6 py-3 bg-forest text-bone tracking-[0.25em] text-xs uppercase">Return to camp</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center paper-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-forest">The trail broke off</h1>
        <p className="mt-3 text-muted-foreground">Something went wrong. Try again or head back.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={() => { router.invalidate(); reset(); }} className="px-5 py-2.5 bg-forest text-bone tracking-[0.2em] text-xs uppercase">Try again</button>
          <a href="/" className="px-5 py-2.5 border border-forest text-forest tracking-[0.2em] text-xs uppercase">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Top Trackers — Premium Hunting Club, Tanzania" },
      { name: "description", content: "An invitation-only African safari & hunting club rooted in Tanzania. Ethical hunts, conservation heritage, and unforgettable expeditions." },
      { property: "og:title", content: "Top Trackers — Premium Hunting Club, Tanzania" },
      { property: "og:description", content: "An invitation-only African safari & hunting club rooted in Tanzania. Ethical hunts, conservation heritage, and unforgettable expeditions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Top Trackers — Premium Hunting Club, Tanzania" },
      { name: "twitter:description", content: "An invitation-only African safari & hunting club rooted in Tanzania. Ethical hunts, conservation heritage, and unforgettable expeditions." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/JyGsTAOQ23TQxYWaD0RvuQ1Yn9A2/social-images/social-1779975367064-f5a3388c-7776-44e0-92d7-55cf79b6b35a-2026-05-16.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/JyGsTAOQ23TQxYWaD0RvuQ1Yn9A2/social-images/social-1779975367064-f5a3388c-7776-44e0-92d7-55cf79b6b35a-2026-05-16.webp" },
      { name: "theme-color", content: "#1e2a22" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Top Trackers" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
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

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && window.location.hostname !== "localhost") {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
          .then((reg) => console.log("Service Worker registered on scope:", reg.scope))
          .catch((err) => console.error("Service Worker registration failed:", err));
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LogoSplash />
      <Outlet />
      <WildlifePopup />
      <CompassGate />
      <CookieConsent />
      <CustomCursor />
      <InstallBanner />
    </QueryClientProvider>
  );
}
