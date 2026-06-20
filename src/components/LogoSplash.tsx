import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { X, ArrowRight } from "lucide-react";
import logoEn from "@/assets/logo_en.webp";
import logoHu from "@/assets/logo_hu.webp";

export function LogoSplash() {
  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if session exists or if they already dismissed it this session
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) return;
      if (sessionStorage.getItem("tt_auth_prompt_seen")) return;

      // Delay slightly to let the site load and create a premium feel
      const timer = setTimeout(() => {
        setShow(true);
        sessionStorage.setItem("tt_auth_prompt_seen", "1");
      }, 1800);
      return () => clearTimeout(timer);
    });
  }, []);

  const logo = i18n.language === "hu" ? logoHu : logoEn;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="auth-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-[#2d2d2d] border border-accent/30 p-8 md:p-10 max-w-md w-full shadow-2xl relative text-center flex flex-col items-center"
          >
            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-bone/50 hover:text-accent transition-colors p-1"
              aria-label="Close prompt"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Logo */}
            <img src={logo} alt="Top Trackers" className="h-[70px] w-[210px] object-contain mb-6" />

            {/* Content */}
            <h2 className="font-display text-2xl md:text-3xl text-bone mb-4">
              {i18n.language === "hu"
                ? "Egy privát vadon, megosztva"
                : "A Private Wilderness, Shared"}
            </h2>

            <p className="font-serif text-bone/70 text-sm md:text-base mb-8 leading-relaxed">
              {i18n.language === "hu"
                ? "A teljes szafari élményért jelentkezzen be a Tagi Portálra, vagy igényeljen egy ingyenes Observer bérletet."
                : "For the full safari experience, log in to your Member Portal or request a complimentary Observer Pass."}
            </p>

            {/* Actions */}
            <div className="w-full flex flex-col gap-3">
              <Link
                to="/auth"
                onClick={() => setShow(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-ember text-ink hover:text-bone tracking-[0.2em] text-xs uppercase font-semibold py-3.5 transition"
              >
                {i18n.language === "hu" ? "Belépés a Portálra" : "Enter Member Portal"}{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/auth"
                onClick={() => setShow(false)}
                className="w-full inline-flex items-center justify-center gap-2 border border-accent/40 hover:border-accent text-accent hover:text-bone tracking-[0.18em] text-xs uppercase py-3.5 transition bg-transparent"
              >
                {i18n.language === "hu" ? "Observer Pass Igénylése" : "Request Observer Pass"}
              </Link>

              <button
                onClick={() => setShow(false)}
                className="mt-2 text-[10px] tracking-[0.25em] uppercase text-bone/40 hover:text-accent transition-colors"
              >
                {i18n.language === "hu" ? "Továbblépés vendégként ↗" : "Continue as Guest ↗"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
