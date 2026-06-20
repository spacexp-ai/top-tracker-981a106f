import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrollHighlightProps {
  text: string;
  className?: string;
  highlightColor?: string; // e.g. "text-accent" or gold color
}

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  highlightColor: string;
}

function Word({ word, index, total, progress, highlightColor }: WordProps) {
  // Calculate bounds for this word
  const start = index / total;
  const end = (index + 0.8) / total; // slightly overlap transitions

  // Transform progress to color transitioning from muted bone to active color
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(244, 240, 230, 0.2)", highlightColor]
  );

  return (
    <motion.span
      style={{ color }}
      className="inline-block mr-[0.22em] transition-colors duration-75"
    >
      {word}
    </motion.span>
  );
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
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          index={i}
          total={words.length}
          progress={scrollYProgress}
          highlightColor={highlightColor}
        />
      ))}
    </span>
  );
}

