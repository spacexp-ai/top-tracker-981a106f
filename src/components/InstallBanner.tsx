import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

const DISMISSED_KEY = "tt_install_banner_dismissed";

/**
 * Floating install banner — appears at the bottom of the screen when the
 * PWA install criteria are met (Chrome/Edge) or on iOS (with share sheet
 * instructions). Dismissed state is persisted to localStorage.
 */
export function InstallBanner() {
  const { isInstallable, isInstalled, isIOS, triggerInstall } = usePWAInstall();
  const [visible, setVisible] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    if (!isInstallable || isInstalled) return;
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (!dismissed) {
      // Small delay so it doesn't appear immediately on first load
      const t = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(t);
    }
  }, [isInstallable, isInstalled]);

  const handleDismiss = () => {
    setVisible(false);
    setShowIOSGuide(false);
    localStorage.setItem(DISMISSED_KEY, "1");
  };

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
    } else {
      await triggerInstall();
      setVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="install-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[200] pointer-events-auto"
          role="banner"
          aria-label="Install Top Trackers app"
        >
          <div
            className="relative overflow-hidden border border-accent/30 bg-ink/95 backdrop-blur-md shadow-2xl"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(180,140,80,0.15)" }}
          >
            {/* Subtle grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              aria-hidden
              style={{ backgroundImage: "url(/topo-bg.png)", backgroundSize: "cover" }}
            />

            {/* Accent bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

            <div className="relative p-4 pr-12">
              {/* Close */}
              <button
                id="install-banner-dismiss"
                onClick={handleDismiss}
                aria-label="Dismiss install banner"
                className="absolute top-3 right-3 p-1.5 text-bone/40 hover:text-bone transition-colors rounded"
              >
                <X className="h-4 w-4" />
              </button>

              {!showIOSGuide ? (
                <>
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="shrink-0 w-10 h-10 bg-forest/80 border border-accent/30 flex items-center justify-center">
                      <Download className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-display text-[11px] tracking-[0.3em] uppercase text-accent mb-0.5">
                        Install App
                      </p>
                      <p className="font-serif text-sm text-bone leading-snug">
                        Install <strong>Top Trackers</strong> for instant access to your
                        expeditions, portal, and field journal.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      id="install-banner-install-btn"
                      onClick={handleInstall}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-forest text-bone text-[11px] tracking-[0.25em] uppercase hover:bg-ember transition-colors duration-300"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Install Top Trackers
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="px-4 py-2.5 border border-bone/20 text-bone/50 text-[11px] tracking-[0.2em] uppercase hover:text-bone hover:border-bone/40 transition-colors"
                    >
                      Later
                    </button>
                  </div>
                </>
              ) : (
                /* iOS-specific share sheet instructions */
                <>
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 bg-forest/80 border border-accent/30 flex items-center justify-center">
                      <Share className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-display text-[11px] tracking-[0.3em] uppercase text-accent mb-1">
                        Add to Home Screen
                      </p>
                      <p className="font-serif text-sm text-bone leading-relaxed">
                        Tap the <strong className="text-accent">Share</strong> button{" "}
                        <Share className="inline h-3.5 w-3.5 text-accent" /> at the bottom of
                        Safari, then select{" "}
                        <strong className="text-accent">"Add to Home Screen"</strong>.
                      </p>
                    </div>
                  </div>
                  <button
                    id="install-banner-ios-done"
                    onClick={handleDismiss}
                    className="mt-4 w-full py-2.5 bg-forest text-bone text-[11px] tracking-[0.25em] uppercase hover:bg-ember transition-colors"
                  >
                    Got it
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
