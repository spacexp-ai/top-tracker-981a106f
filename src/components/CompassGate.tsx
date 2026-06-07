import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Lock, Calendar, X } from "lucide-react";
import compassAsset from "@/assets/compass.png.asset.json";
import archAsset from "@/assets/driftwood-arch.png.asset.json";

const compass = compassAsset.url;
const arch = archAsset.url;

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
            src={compass}
            alt=""
            style={{ rotate }}
            className="h-full w-full object-cover"
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
            className="fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto p-4 md:p-8"
            style={{ background: "rgba(3,2,1,0.88)", backdropFilter: "blur(6px)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md mt-6 md:mt-0"
            >
              {/* Arch */}
              <img
                src={arch}
                alt=""
                className="w-full block select-none pointer-events-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
                draggable={false}
              />

              {/* Card hanging beneath arch */}
              <div
                className="-mt-px bg-[#161008] border border-t-0 px-7 py-8 md:px-9 md:pb-10 md:pt-9 relative"
                style={{ borderColor: "rgba(180,140,70,0.35)" }}
              >
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute top-3 right-3 h-8 w-8 inline-flex items-center justify-center text-[#c9a84c] hover:text-white hover:bg-[rgba(201,168,76,0.1)] transition"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Compass pip */}
                <div className="flex justify-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden ring-1 ring-[rgba(201,168,76,0.5)] bg-[#0d0905]">
                    <img src={compass} alt="" className="h-full w-full object-cover" />
                  </div>
                </div>

                <h2 className="mt-5 text-center font-display text-3xl md:text-4xl text-[#f3e3b8]" style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}>
                  Enter the Gate
                </h2>
                <p className="mt-2 text-center text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]">
                  Member portal — Top Trackers
                </p>

                <div className="mt-7 space-y-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  <GateLink
                    to="/membership"
                    title="Join the Club"
                    subtitle="Apply for an invitation"
                    icon={<ArrowRight className="h-4 w-4" />}
                    onClose={() => setOpen(false)}
                    highlighted
                  />
                  <GateLink
                    to="/auth"
                    title="Member Login"
                    subtitle="Return to the camp"
                    icon={<Lock className="h-4 w-4" />}
                    onClose={() => setOpen(false)}
                  />

                  <div className="flex items-center gap-3 py-1">
                    <span className="h-px flex-1 bg-[rgba(201,168,76,0.2)]" />
                    <span className="text-[9px] tracking-[0.35em] uppercase text-[#7a6a4a]">or</span>
                    <span className="h-px flex-1 bg-[rgba(201,168,76,0.2)]" />
                  </div>

                  <GateLink
                    to="/contact"
                    title="Book your safari"
                    subtitle="Begin planning your expedition"
                    icon={<Calendar className="h-4 w-4" />}
                    onClose={() => setOpen(false)}
                  />
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
  to, title, subtitle, icon, onClose, highlighted,
}: {
  to: string; title: string; subtitle: string; icon: React.ReactNode; onClose: () => void; highlighted?: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onClose}
      className={`group flex items-center justify-between gap-4 px-5 py-3.5 border transition-all ${
        highlighted
          ? "bg-[rgba(201,168,76,0.08)] border-[rgba(201,168,76,0.6)] hover:bg-[rgba(201,168,76,0.16)]"
          : "bg-transparent border-[rgba(201,168,76,0.3)] hover:border-[rgba(201,168,76,0.6)] hover:bg-[rgba(201,168,76,0.05)]"
      }`}
    >
      <div className="text-left">
        <div className="text-[#f3e3b8] text-xl leading-tight">{title}</div>
        <div className="text-[#9a8a6a] text-xs italic mt-0.5">{subtitle}</div>
      </div>
      <span className="text-[#c9a84c] group-hover:translate-x-0.5 transition-transform">{icon}</span>
    </Link>
  );
}
