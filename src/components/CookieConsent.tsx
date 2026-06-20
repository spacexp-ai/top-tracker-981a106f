import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const KEY = "tt_cookie_consent_v1";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setShow(true), 800);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 180 }}
          className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:left-6 z-[60]"
        >
          <div className="mx-auto max-w-5xl bg-ink text-bone border border-accent/40 shadow-[var(--shadow-vintage)] p-5 md:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Cookie className="h-6 w-6 text-accent shrink-0" />
            <p className="text-sm font-serif text-bone/80 flex-1">
              We use cookies to remember your preferences and improve your visit to camp. Read our{" "}
              <Link to="/privacy" className="text-accent underline underline-offset-4">
                privacy policy
              </Link>
              .
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => decide("declined")}
                className="px-4 py-2 border border-bone/30 text-bone text-[10px] tracking-[0.3em] uppercase hover:border-accent hover:text-accent transition"
              >
                Decline
              </button>
              <button
                onClick={() => decide("accepted")}
                className="px-4 py-2 bg-accent text-accent-foreground text-[10px] tracking-[0.3em] uppercase hover:bg-ember hover:text-bone transition"
              >
                Accept
              </button>
              <button
                aria-label="Dismiss"
                onClick={() => decide("declined")}
                className="md:hidden p-2 text-bone/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
