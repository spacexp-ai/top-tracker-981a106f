import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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

    window.addEventListener("mousemove", updateMousePosition);
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
  }, []);

  // On touch devices, do not render custom cursor
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 700,
        damping: 40,
        mass: 0.5,
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white opacity-80"
      >
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
        <line x1="16" y1="0" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
        <line x1="16" y1="24" x2="16" y2="32" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
}
