import { motion } from "framer-motion";
import { PawPrintIcon } from "./WildlifeIcons";

/**
 * Subtle paw-prints drifting diagonally across a section as a decorative,
 * non-interactive background. Pointer-events disabled.
 */
export function FloatingTracks({ count = 6 }: { count?: number }) {
  const prints = Array.from({ length: count }, (_, i) => ({
    top: `${((i * 73) % 90) + 5}%`,
    left: `${((i * 41) % 80) + 5}%`,
    size: 22 + ((i * 7) % 20),
    delay: i * 0.6,
    rotate: ((i * 37) % 90) - 45,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden text-accent/30">
      {prints.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: [0, 0.7, 0.7, 0], x: 60, y: -40 }}
          transition={{
            duration: 9,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
          style={{ position: "absolute", top: p.top, left: p.left, rotate: `${p.rotate}deg` }}
        >
          <PawPrintIcon size={p.size} />
        </motion.div>
      ))}
    </div>
  );
}
