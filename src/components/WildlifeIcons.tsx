import { motion } from "framer-motion";
import type { SVGProps } from "react";

/**
 * Hand-drawn style vector icons for the Top Trackers safari theme.
 * Each icon uses strokeWidth 1.2 to match the vintage engraved look,
 * and exposes `currentColor` for theming via Tailwind text-* classes.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (p: IconProps) => ({
  width: p.size ?? 48,
  height: p.size ?? 48,
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export function LionIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      {/* mane */}
      <circle cx="32" cy="28" r="16" />
      <path d="M32 12 L34 6 M32 12 L30 6 M18 22 L12 18 M18 28 L10 28 M46 22 L52 18 M46 28 L54 28 M22 40 L18 46 M42 40 L46 46" />
      {/* face */}
      <circle cx="32" cy="30" r="9" />
      <circle cx="28" cy="29" r="0.8" fill="currentColor" />
      <circle cx="36" cy="29" r="0.8" fill="currentColor" />
      <path d="M30 33 Q32 35 34 33" />
      <path d="M32 31 L32 33" />
    </svg>
  );
}

export function ElephantIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M14 38 Q14 22 30 22 Q46 22 46 36 L46 48" />
      <path d="M14 38 L14 48" />
      <path d="M22 48 L22 52 M18 48 L18 52 M42 48 L42 52 M46 48 L46 52" />
      {/* ear */}
      <path d="M30 22 Q22 22 22 32 Q22 38 30 36" />
      {/* trunk */}
      <path d="M46 36 Q54 36 54 44 Q54 52 48 52 Q44 52 44 48" />
      {/* eye + tusk */}
      <circle cx="28" cy="30" r="0.9" fill="currentColor" />
      <path d="M44 44 L50 48" />
    </svg>
  );
}

export function BuffaloIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      {/* horns */}
      <path d="M12 22 Q4 18 8 30 Q14 28 16 24" />
      <path d="M52 22 Q60 18 56 30 Q50 28 48 24" />
      {/* head */}
      <path d="M16 24 Q20 38 32 40 Q44 38 48 24 Q40 20 32 20 Q24 20 16 24Z" />
      <circle cx="26" cy="30" r="0.9" fill="currentColor" />
      <circle cx="38" cy="30" r="0.9" fill="currentColor" />
      <path d="M30 36 L34 36" />
      <path d="M28 38 Q32 41 36 38" />
    </svg>
  );
}

export function AntelopeIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      {/* spiral horns */}
      <path d="M24 14 Q22 8 26 4 M24 14 Q26 10 22 6" />
      <path d="M40 14 Q42 8 38 4 M40 14 Q38 10 42 6" />
      {/* head + body */}
      <path d="M22 20 Q32 14 42 20 L44 32 Q44 42 32 44 Q20 42 20 32 Z" />
      <circle cx="28" cy="26" r="0.9" fill="currentColor" />
      <circle cx="36" cy="26" r="0.9" fill="currentColor" />
      <path d="M30 34 L34 34" />
      <path d="M24 44 L22 54 M30 44 L30 54 M34 44 L34 54 M40 44 L42 54" />
    </svg>
  );
}

export function LeopardIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M8 44 Q12 30 24 28 L40 28 Q52 30 56 44" />
      <path d="M40 28 Q44 18 48 18 Q50 22 46 28" />
      <path d="M24 28 Q20 18 16 18 Q14 22 18 28" />
      <circle cx="20" cy="38" r="1.2" />
      <circle cx="28" cy="36" r="1.2" />
      <circle cx="36" cy="36" r="1.2" />
      <circle cx="44" cy="38" r="1.2" />
      <circle cx="32" cy="42" r="1.2" />
      <path d="M8 44 L6 52 M56 44 L58 52" />
    </svg>
  );
}

export function RifleIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 40 L52 18" />
      <path d="M52 18 L58 16 L56 22 Z" />
      <path d="M6 40 L4 46 L10 48 L14 42 Z" />
      <path d="M22 32 L26 24" />
      <circle cx="44" cy="22" r="2" />
      <path d="M44 22 L48 26" />
    </svg>
  );
}

export function CompassRoseIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="16" />
      <path d="M32 10 L36 32 L32 54 L28 32 Z" />
      <path d="M10 32 L32 28 L54 32 L32 36 Z" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
      <path d="M32 6 L32 10 M32 54 L32 58 M6 32 L10 32 M54 32 L58 32" />
    </svg>
  );
}

export function PawPrintIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <ellipse cx="32" cy="42" rx="10" ry="8" />
      <ellipse cx="18" cy="28" rx="4" ry="6" />
      <ellipse cx="26" cy="20" rx="4" ry="6" />
      <ellipse cx="38" cy="20" rx="4" ry="6" />
      <ellipse cx="46" cy="28" rx="4" ry="6" />
    </svg>
  );
}

export function AcaciaIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M32 56 L32 30" />
      <path d="M32 30 Q22 28 14 30 Q10 22 18 18 Q22 12 32 14 Q42 12 46 18 Q54 22 50 30 Q42 28 32 30" />
      <path d="M28 56 Q30 50 32 50 Q34 50 36 56" />
    </svg>
  );
}

export function LanternIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M28 8 L36 8 L36 12 L28 12 Z" />
      <path d="M32 12 L32 16" />
      <path d="M22 16 L42 16 L42 20 L22 20 Z" />
      <path d="M24 20 L24 48 L40 48 L40 20" />
      <path d="M22 48 L42 48 L42 52 L22 52 Z" />
      {/* flame */}
      <path
        d="M32 26 Q28 30 30 36 Q32 32 32 36 Q34 32 34 36 Q36 30 32 26 Z"
        fill="currentColor"
        stroke="none"
        opacity="0.7"
      />
    </svg>
  );
}

/* ---------------- Animated wrapper ---------------- */

export function AnimatedIcon({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.15, rotate: 4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
