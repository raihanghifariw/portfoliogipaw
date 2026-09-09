"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";

/**
 * Tipe varian animasi yang didukung oleh ScrollReveal:
 * - 'fade': Fade in memudar biasa
 * - 'slide-up': Fade in sambil meluncur dari bawah
 * - 'pop-up': Zoom in / membesar dari skala 0.8 ke 1
 * Serta varian pelengkap untuk fleksibilitas kreatif.
 */
export type RevealVariant =
  | "fade"
  | "slide-up"
  | "pop-up"
  // Aliases & extended variants
  | "fadeUp"
  | "fadeDown"
  | "clipUp"
  | "blurIn"
  | "scaleIn"
  | "slideLeft"
  | "slideRight";

const HIDDEN_VARIANTS: Record<RevealVariant, TargetAndTransition> = {
  // 1. Fade in biasa
  fade: { opacity: 0 },
  // 2. Slide up dari bawah
  "slide-up": { opacity: 0, y: 48 },
  fadeUp: { opacity: 0, y: 48 },
  // 3. Pop up (Zoom in dari skala 0.8 ke 1)
  "pop-up": { opacity: 0, scale: 0.8 },
  scaleIn: { opacity: 0, scale: 0.88 },
  // Varian pelengkap
  fadeDown: { opacity: 0, y: -48 },
  clipUp: { opacity: 1, clipPath: "inset(100% 0% 0% 0%)" },
  blurIn: { opacity: 0, filter: "blur(14px)", y: 24 },
  slideLeft: { opacity: 0, x: 90 },
  slideRight: { opacity: 0, x: -90 },
};

const SHOWN_TARGET: TargetAndTransition = {
  opacity: 1,
  y: 0,
  x: 0,
  scale: 1,
  filter: "blur(0px)",
  clipPath: "inset(0% 0% 0% 0%)",
};

export interface ScrollRevealProps {
  /** Elemen anak yang akan dianimasikan */
  children: React.ReactNode;
  /**
   * Tipe animasi:
   * - 'fade': Fade in biasa
   * - 'slide-up': Fade in + meluncur dari bawah (default)
   * - 'pop-up': Zoom in / membesar dari 0.8 ke 1
   */
  variant?: RevealVariant;
  /** Jeda waktu sebelum animasi dimulai dalam satuan detik (contoh: 0.2) */
  delay?: number;
  /** Durasi jalannya animasi dalam satuan detik (default: 0.8s) */
  duration?: number;
  /** Class styling Tailwind CSS tambahan */
  className?: string;
  /** Menentukan apakah animasi hanya dipicu 1 kali saja saat pertama kali masuk layar (default: true) */
  once?: boolean;
  /** Margin viewport pemicu (default: '-60px') */
  viewportMargin?: string;
  /** Tag HTML yang ingin dirender (default: 'div') */
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "main";
}

export default function ScrollReveal({
  children,
  variant = "slide-up",
  delay = 0,
  duration = 0.8,
  className = "",
  once = true,
  viewportMargin = "-60px",
  as: Component = "div",
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  // Aksesibilitas: Jika user mengaktifkan prefers-reduced-motion di sistemnya, tampilkan konten langsung tanpa animasi
  if (reduce) {
    const FallbackTag = Component as any;
    return <FallbackTag className={className}>{children}</FallbackTag>;
  }

  // Pilih motion component sesuai prop 'as'
  const MotionComponent = motion[Component] || motion.div;

  // Easing kustom: gunakan spring pop untuk 'pop-up', dan smooth ease-out untuk lainnya
  const transitionEase =
    variant === "pop-up"
      ? ([0.34, 1.56, 0.64, 1] as const) // Easing pegas memantul lembut (bouncy spring)
      : ([0.23, 1, 0.32, 1] as const);   // Easing quintic ease-out sangat halus

  return (
    <MotionComponent
      className={className}
      initial={HIDDEN_VARIANTS[variant] ?? HIDDEN_VARIANTS["slide-up"]}
      whileInView={SHOWN_TARGET}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: transitionEase,
      }}
    >
      {children}
    </MotionComponent>
  );
}

// =========================================================================
// TYPOGRAPHIC REVEAL HELPERS (Word & Letter Stagger)
// =========================================================================

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.055,
  once = true,
}: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span className={className} role="text" aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%", rotate: 5 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once, margin: "-60px" }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface LetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function LetterReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.022,
  once = true,
}: LetterRevealProps) {
  const reduce = useReducedMotion();
  const letters = Array.from(text);

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span className={className} role="text" aria-label={text}>
      {letters.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "120%", rotate: 8 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once, margin: "-60px" }}
            transition={{
              duration: 0.65,
              delay: delay + i * stagger,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
