"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function MagneticCursor() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<{ title?: string; detail?: string } | null>(null);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 40, stiffness: 800 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!cursorVisible) setCursorVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer");
      setIsHovered(!!interactive);

      const customHover = target.closest("[data-cursor]") as HTMLElement | null;
      setHoverText(customHover?.getAttribute("data-cursor") || null);

      const detailEl = target.closest("[data-detail]") as HTMLElement | null;
      if (detailEl) {
        const title = detailEl.getAttribute("data-title") || undefined;
        const detail = detailEl.getAttribute("data-detail") || undefined;
        setDetailData({ title, detail });
      } else {
        setDetailData(null);
      }
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    const handleMouseEnter = () => {
      setCursorVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [cursorVisible, idleTimer]);

  if (!cursorVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Outer Smooth Morphing Halo */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hoverText ? 2.4 : isHovered ? 1.75 : 1,
          borderColor: isHovered ? "rgba(56, 189, 248, 0.8)" : "rgba(139, 92, 246, 0.4)",
          backgroundColor: isHovered ? "rgba(56, 189, 248, 0.08)" : "rgba(139, 92, 246, 0.03)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="fixed w-9 h-9 rounded-full border border-purple-500/40 backdrop-blur-[1px] flex items-center justify-center"
      >
        {hoverText && (
          <span className="text-[8px] font-mono font-bold text-sky-300 uppercase tracking-widest px-1">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Center Precision Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.4 : 1,
          backgroundColor: isHovered ? "#38bdf8" : "#8b5cf6",
        }}
        className="fixed w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#38bdf8]"
      />

      {/* Idle / Hover Deep Detail Inspection HUD */}
      <AnimatePresence>
        {detailData?.detail && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 22, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              left: smoothX,
              top: smoothY,
            }}
            className="fixed pointer-events-none z-[100000] max-w-xs -translate-x-1/2 p-3 rounded-xl bg-[#09090d]/95 border border-sky-400/30 backdrop-blur-xl shadow-2xl shadow-sky-500/10 text-left font-mono"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest">
                {detailData.title || "SYSTEM_INSPECTOR"}
              </span>
            </div>
            <p className="text-[11px] font-sans text-slate-200 leading-snug">
              {detailData.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
