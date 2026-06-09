import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Lock, Calendar, X } from "lucide-react";
import compassImage from "@/assets/compass.png";

export function CompassGate() {
  const [open, setOpen] = useState(false);
  const scrollY = useMotionValue(0);
  const rotateRaw = useTransform(scrollY, (v) => v * 0.4);
  const rotate = useSpring(rotateRaw, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Floating compass widget */}
      <div className="fixed bottom-6 right-6 z-[60] group">
        <span className="pointer-events-none absolute inset-0 rounded-full animate-ping-slow bg-[rgba(201,168,76,0.35)]" />
        <span className="pointer-events-none absolute -inset-2 rounded-full border border-[rgba(201,168,76,0.35)] animate-pulse-ring" />
        <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#161008] text-[#e8c87a] border border-[rgba(180,140,70,0.4)] px-3 py-1.5 text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Member Portal
        </span>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Member Portal"
          className="relative h-16 w-16 md:h-[72px] md:w-[72px] rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.55)] ring-2 ring-[rgba(201,168,76,0.5)] hover:ring-[rgba(201,168,76,0.9)] transition-all bg-[#161008]"
        >
          <motion.img
            src={compassImage}
            alt="Compass Menu"
            style={{ rotate }}
            className="h-full w-full object-cover scale-[1.15]"
            draggable={false}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 md:p-8"
            style={{ background: "rgba(3,2,1,0.78)", backdropFilter: "blur(10px)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-t-full border-[8px] border-[#2c1e13] bg-[#120c08] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              {/* Close — small, floating outside the arch */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-6 right-6 z-10 h-10 w-10 inline-flex items-center justify-center rounded-full bg-black/40 text-[#e8c87a]/70 hover:text-white transition hover:bg-black/80"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Menu nested inside the arch opening — no card, no overlay */}
              <div
                className="absolute flex flex-col items-center justify-center text-center"
                style={{ top: "26%", bottom: "8%", left: "22%", right: "22%" }}
              >
                <h2
                  className="text-[#f3e3b8] text-xl md:text-2xl leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
                    textShadow: "0 2px 12px rgba(0,0,0,0.95)",
                  }}
                >
                  Enter the Gate
                </h2>
                <p
                  className="mt-1 text-[8px] tracking-[0.4em] uppercase text-[#c9a84c]"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.95)" }}
                >
                  Top Trackers
                </p>

                <div
                  className="mt-4 w-full flex flex-col items-center gap-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <GateLink to="/membership" title="Join the Club" icon={<ArrowRight className="h-3 w-3" />} onClose={() => setOpen(false)} highlighted />
                  <GateLink to="/auth" title="Member Login" icon={<Lock className="h-3 w-3" />} onClose={() => setOpen(false)} />
                  <GateLink to="/contact" title="Book a Safari" icon={<Calendar className="h-3 w-3" />} onClose={() => setOpen(false)} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GateLink({
  to, title, icon, onClose, highlighted,
}: {
  to: string; title: string; icon: React.ReactNode; onClose: () => void; highlighted?: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onClose}
      className={`group inline-flex items-center gap-2 px-2 py-1 transition-all ${
        highlighted ? "text-[#f5e7be]" : "text-[#d9c790]/90 hover:text-[#f5e7be]"
      }`}
      style={{ textShadow: "0 2px 10px rgba(0,0,0,0.95)" }}
    >
      <span className="text-base md:text-lg tracking-wide border-b border-[rgba(201,168,76,0.35)] group-hover:border-[rgba(201,168,76,0.85)] pb-0.5 transition-colors">
        {title}
      </span>
      <span className="text-[#c9a84c] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition">{icon}</span>
    </Link>
  );
}
