import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  // Use high-performance MotionValues to completely bypass React render loop for mouse movement
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Apply spring physics directly to the motion values
  const springConfig = { stiffness: 800, damping: 45, mass: 0.45 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for data-cursor text (e.g. data-cursor="EXPLORE" or data-cursor="VIEW")
      const cursorTextEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTextEl) {
        setCursorText(cursorTextEl.getAttribute("data-cursor") || "");
      } else {
        setCursorText("");
      }

      // If hovering over a clickable element, expand the scope
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);

    // Apply a global style to hide the default cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      document.body.style.cursor = "none";
      const style = document.createElement("style");
      style.innerHTML = `
        * { cursor: none !important; }
      `;
      document.head.appendChild(style);
    }

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // On touch devices, do not render custom cursor
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const hasText = !!cursorText;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference flex items-center justify-center will-change-transform"
      style={{
        x: xSpring,
        y: ySpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: hasText ? 1.2 : (isHovering ? 1.4 : 1),
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 38,
        mass: 0.45,
      }}
    >
      <AnimatePresence mode="wait">
        {hasText ? (
          <motion.div
            key="text-badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-16 h-16 rounded-full border border-white bg-white/10 text-white flex items-center justify-center backdrop-blur-[2px]"
          >
            <span className="text-[9px] font-sans tracking-[0.25em] font-medium text-center pl-[2px] leading-none uppercase">
              {cursorText}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="default-cursor"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="2" fill="currentColor" />
              <line x1="16" y1="0" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
              <line x1="16" y1="24" x2="16" y2="32" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
              <line x1="24" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
