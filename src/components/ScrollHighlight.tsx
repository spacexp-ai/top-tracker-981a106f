import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollHighlightProps {
  text: string;
  className?: string;
  highlightColor?: string; // e.g. "text-accent" or gold color
}

export function ScrollHighlight({ text, className, highlightColor = "#c5a880" }: ScrollHighlightProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Track scroll position of this paragraph relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 55%"],
  });

  const words = text.split(/\s+/);

  return (
    <span ref={containerRef} className={`inline-block ${className || ""}`}>
      {words.map((word, i) => {
        // Calculate bounds for this word
        const start = i / words.length;
        const end = (i + 0.8) / words.length; // slightly overlap transitions
        
        // Transform progress to color transitioning from muted bone to active color
        const color = useTransform(
          scrollYProgress,
          [start, end],
          ["rgba(244, 240, 230, 0.2)", highlightColor]
        );

        return (
          <motion.span
            key={i}
            style={{ color }}
            className="inline-block mr-[0.22em] transition-colors duration-75"
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}
