"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function MagneticCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "badge">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useSpring(0, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 28, stiffness: 350 });

  const dotX = useSpring(0, { damping: 45, stiffness: 600 });
  const dotY = useSpring(0, { damping: 45, stiffness: 600 });

  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
        setCursorVariant("badge");
        return;
      }

      const isInteractive = target.closest("button, a, input, textarea, select, [role='button']");
      if (isInteractive) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer context ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full border border-cyan-400/40"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: cursorVariant === "badge" ? 92 : cursorVariant === "hover" ? 48 : 26,
          height: cursorVariant === "badge" ? 92 : cursorVariant === "hover" ? 48 : 26,
          backgroundColor:
            cursorVariant === "badge"
              ? "rgba(0, 242, 254, 0.12)"
              : cursorVariant === "hover"
              ? "rgba(255, 255, 255, 0.04)"
              : "rgba(0, 242, 254, 0.0)",
          borderColor:
            cursorVariant === "badge"
              ? "rgba(0, 242, 254, 0.6)"
              : cursorVariant === "hover"
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(0, 242, 254, 0.3)",
          backdropFilter: cursorVariant === "badge" ? "blur(4px)" : "none",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-cyan-300 text-center px-1">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner precision core dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-1.5 w-1.5 rounded-full bg-cyan-400"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible && cursorVariant !== "badge" ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}

