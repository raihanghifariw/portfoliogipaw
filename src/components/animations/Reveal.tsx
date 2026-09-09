"use client";

import React from "react";

export type RevealVariant =
  | "default"   // Fade in + Pop Up (Scale Up + Translate Y)
  | "pop"       // Zoom / Pop Up (Scale 0.82 -> 1)
  | "fade"      // Pure Fade In
  | "slide-up"  // Slide Up
  | "slide-left"
  | "slide-right";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: 100 | 150 | 200 | 250 | 300 | 400 | 500;
  once?: boolean;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Reveal — React wrapper for native IntersectionObserver Scroll Reveal
 *
 * Example:
 * <Reveal variant="pop" delay={200}>
 *   <Card />
 * </Reveal>
 */
export default function Reveal({
  children,
  variant = "default",
  delay,
  once = true,
  className = "",
  as: Component = "div",
  ...rest
}: RevealProps) {
  const variantAttr =
    variant === "pop"
      ? "pop"
      : variant === "fade"
      ? "fade-in"
      : variant === "slide-up"
      ? "slide-up"
      : variant === "slide-left"
      ? "slide-left"
      : variant === "slide-right"
      ? "slide-right"
      : undefined;

  const CustomTag = Component as any;

  return (
    <CustomTag
      className={`section-reveal ${className}`.trim()}
      data-reveal={variantAttr}
      data-reveal-delay={delay}
      data-reveal-once={once ? "true" : "false"}
      {...rest}
    >
      {children}
    </CustomTag>
  );
}
