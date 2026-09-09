"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/context/PortfolioContext";

export type PixelSizeScale =
  | "pixel-xs"
  | "pixel-sm"
  | "pixel-md"
  | "pixel-lg"
  | "pixel-xl"
  | "pixel-2xl"
  | "pixel-3xl"
  | "pixel-4xl";

export type PixelAccent = "cyan" | "amber" | "emerald" | "purple" | "white";

interface Interactive3DPixelTypographyProps {
  children?: React.ReactNode;
  text?: string;
  size?: PixelSizeScale;
  accent?: PixelAccent;
  className?: string;
  glow?: boolean;
  interactive3D?: boolean;
  maxTilt?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "span" | "p";
  onClick?: () => void;
}

const ACCENT_PALETTES: Record<
  PixelAccent,
  {
    main: string;
    shadows: string[];
    glow: string;
  }
> = {
  cyan: {
    main: "#00f0ff",
    shadows: ["#00e5ff", "#00b4c8", "#008291", "#00515b", "#002b30", "#001013"],
    glow: "rgba(0, 240, 255, 0.75)",
  },
  amber: {
    main: "#ff6b00",
    shadows: ["#ff7b00", "#cc6200", "#994a00", "#663100", "#331900", "#170a00"],
    glow: "rgba(255, 107, 0, 0.75)",
  },
  emerald: {
    main: "#10b981",
    shadows: ["#059669", "#047857", "#065f46", "#064e3b", "#022c22", "#011712"],
    glow: "rgba(168, 85, 247, 0.75)",
  },
  purple: {
    main: "#a855f7",
    shadows: ["#9333ea", "#7e22ce", "#6b21a8", "#581c87", "#3b0764", "#1d0236"],
    glow: "rgba(168, 85, 247, 0.75)",
  },
  white: {
    main: "#ffffff",
    shadows: ["#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#334155", "#0f172a"],
    glow: "rgba(255, 255, 255, 0.5)",
  },
};

/* Light-theme variant: darker fills for contrast on light surfaces */
const ACCENT_PALETTES_LIGHT: Record<
  PixelAccent,
  {
    main: string;
    shadows: string[];
    glow: string;
  }
> = {
  cyan: {
    main: "#0e7490",
    shadows: ["#0891b2", "#0e7490", "#155e75", "#164e63", "#083344", "#041a22"],
    glow: "rgba(2, 132, 199, 0.55)",
  },
  amber: {
    main: "#c2410c",
    shadows: ["#ea580c", "#c2410c", "#9a3412", "#7c2d12", "#431407", "#1f0a03"],
    glow: "rgba(234, 88, 12, 0.55)",
  },
  emerald: {
    main: "#047857",
    shadows: ["#059669", "#047857", "#065f46", "#064e3b", "#022c22", "#011712"],
    glow: "rgba(5, 150, 105, 0.55)",
  },
  purple: {
    main: "#7e22ce",
    shadows: ["#9333ea", "#7e22ce", "#6b21a8", "#581c87", "#3b0764", "#1d0236"],
    glow: "rgba(147, 51, 234, 0.55)",
  },
  white: {
    main: "#0f172a",
    shadows: ["#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#020617"],
    glow: "rgba(15, 23, 42, 0.35)",
  },
};

export function Interactive3DPixelTypography({
  children,
  text,
  size = "pixel-4xl",
  accent = "cyan",
  className,
  glow = true,
  interactive3D = true,
  maxTilt = 16,
  as: Component = "div",
  onClick,
}: Interactive3DPixelTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const { theme } = usePortfolio();
  const isLight = theme === "light";

  // Smooth springs for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 24, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Dynamic shadow extrusion calculation based on spring motion values
  const [shadowStyle, setShadowStyle] = useState<string>("");

  const palette = isLight ? ACCENT_PALETTES_LIGHT[accent] : ACCENT_PALETTES[accent];

  useEffect(() => {
    const updateShadow = () => {
      const curX = smoothX.get();
      const curY = smoothY.get();

      // Light source vector points from cursor; shadow extrudes in opposite direction
      const sx = -curX * 8;
      const sy = -curY * 8;

      const layers = palette.shadows.map((color, idx) => {
        const factor = (idx + 1) * 1.5;
        const px = Math.round(sx * (factor / 6));
        const py = Math.round(sy * (factor / 6));
        return `${px}px ${py}px 0px ${color}`;
      });

      const glowShadow = glow ? `0 0 25px ${palette.glow}` : "";
      const base3D = [
        "-1px 1px 0px rgba(0,0,0,0.8)",
        "-2px 2px 0px rgba(0,0,0,0.9)",
        ...layers,
        ...(glowShadow ? [glowShadow] : []),
      ].join(", ");

      setShadowStyle(base3D);
    };

    const unsubscribeX = smoothX.on("change", updateShadow);
    const unsubscribeY = smoothY.on("change", updateShadow);
    updateShadow();

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [smoothX, smoothY, palette, glow, isLight]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive3D || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(Math.max(-0.5, Math.min(0.5, x)));
    mouseY.set(Math.max(-0.5, Math.min(0.5, y)));
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 240);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const content = text || children;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      className={cn(
        "pixel-3d-scene inline-block select-none cursor-default",
        onClick && "cursor-pointer"
      )}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={
          interactive3D
            ? {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        className="relative transform-gpu transition-all"
      >
        {/* Chromatic Aberration RGB Shift on Glitch / Hover */}
        {glitchActive && (
          <>
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 select-none pointer-events-none opacity-70 text-[#ff0055]",
                size,
                "pixel-3d-text"
              )}
              style={{
                transform: "translate(-3px, 1px)",
                clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              }}
            >
              {content}
            </div>
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 select-none pointer-events-none opacity-70 text-[#00f0ff]",
                size,
                "pixel-3d-text"
              )}
              style={{
                transform: "translate(3px, -1px)",
                clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              }}
            >
              {content}
            </div>
          </>
        )}

        {/* Main 3D Text Element */}
        <Component
          className={cn(
            "pixel-3d-text font-display uppercase tracking-wider relative z-10",
            size,
            className
          )}
          style={{
            textShadow: shadowStyle,
            color: palette.main,
            transform: isHovered ? "translateZ(14px)" : "translateZ(0px)",
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {content}
        </Component>

        {/* Holographic Scanline Shimmer Light Sweep on Hover */}
        {isHovered && (
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "200%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-32 pointer-events-none opacity-30 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 z-20"
          />
        )}
      </motion.div>
    </div>
  );
}
