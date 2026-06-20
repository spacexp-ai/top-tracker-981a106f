import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PawPrintIcon, LionIcon, ElephantIcon, AcaciaIcon, CompassRoseIcon } from "./WildlifeIcons";

type Dispatch = {
  Icon: React.FC<{ size?: number }>;
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; to: string };
};

const dispatches: Dispatch[] = [
  {
    Icon: PawPrintIcon,
    eyebrow: "Field dispatch",
    title: "Fresh leopard tracks at Selous",
    body: "Our scouts logged a male leopard moving the Rufiji riverbed two dawns running. Limited window — July dates open.",
    cta: { label: "See expeditions", to: "/experience" },
  },
  {
    Icon: LionIcon,
    eyebrow: "Conservation note",
    title: "12% of every hunt feeds the land",
    body: "A standing portion of each safari funds anti-poaching patrols and community rangers across our concessions.",
    cta: { label: "Our story", to: "/our-story" },
  },
  {
    Icon: ElephantIcon,
    eyebrow: "Members only",
    title: "Members save up to 18% per hunt",
    body: "Estimate your cost — membership tiers automatically apply discounts to PH fees, camps, and trophy logistics.",
    cta: { label: "Open the estimator", to: "/estimator" },
  },
  {
    Icon: AcaciaIcon,
    eyebrow: "From the camp",
    title: "Brass, canvas & lantern light",
    body: "A new dispatch from base camp at Esilalei is in the journal — read the chef's notes on a Maasai harvest feast.",
    cta: { label: "Read the journal", to: "/journal" },
  },
  {
    Icon: CompassRoseIcon,
    eyebrow: "Trail update",
    title: "Iringa highlands — buffalo season",
    body: "Cold mornings, long stalks, fewer guns in the bush. A few windows remain through August.",
    cta: { label: "Plan a chase", to: "/contact" },
  },
];

export function WildlifePopup() {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("tt_popup_dismissed")) return;

    // pick a random dispatch each session
    setIndex(Math.floor(Math.random() * dispatches.length));

    const open = setTimeout(() => setShow(true), 14000);
    return () => clearTimeout(open);
  }, []);

  function dismiss() {
    setShow(false);
    try {
      sessionStorage.setItem("tt_popup_dismissed", "1");
    } catch {}
  }

  const d = dispatches[index];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="wildlife-popup"
          initial={{ opacity: 0, y: 40, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30, transition: { duration: 0.4 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-sm"
        >
          <div className="relative bg-bone border border-forest/20 shadow-[0_30px_60px_-20px_oklch(0.20_0.03_60/0.5)] p-6">
            {/* corner brass detail */}
            <span className="absolute -top-px -left-px w-3 h-3 border-t border-l border-accent" />
            <span className="absolute -top-px -right-px w-3 h-3 border-t border-r border-accent" />
            <span className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-accent" />
            <span className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-accent" />

            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute top-3 right-3 text-forest/50 hover:text-ember transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-4">
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-ember shrink-0"
              >
                <d.Icon size={44} />
              </motion.div>
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.35em] uppercase text-accent">
                  {d.eyebrow}
                </div>
                <h4 className="mt-2 font-display text-lg text-forest leading-snug">{d.title}</h4>
                <p className="mt-2 font-serif text-sm text-foreground/75 leading-relaxed">
                  {d.body}
                </p>
                <Link
                  to={d.cta.to}
                  onClick={dismiss}
                  className="inline-flex items-center gap-2 mt-4 text-forest text-[11px] tracking-[0.3em] uppercase border-b border-forest/40 hover:text-ember hover:border-ember transition pb-0.5"
                >
                  {d.cta.label} →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
