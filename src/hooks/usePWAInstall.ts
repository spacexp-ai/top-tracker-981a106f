import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Captures the browser's `beforeinstallprompt` event and exposes
 * a trigger function + install state.
 *
 * Only fires when the PWA criteria are met (HTTPS, manifest, service worker).
 * On iOS the event doesn't exist — we detect that separately so the
 * banner can show iOS-specific instructions.
 */
export function usePWAInstall() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Already running as standalone PWA — don't show banner
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // iOS detection (Safari on iPhone/iPad)
    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(window.navigator as unknown as { standalone?: boolean }).standalone;
    setIsIOS(ios);
    if (ios) {
      setIsInstallable(true);
      return;
    }

    // Chrome / Edge / Samsung Browser — beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Track if user installs via native dialog
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const triggerInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsInstallable(false);
      setPrompt(null);
    }
  };

  return { isInstallable, isInstalled, isIOS, triggerInstall };
}
