"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { usePreloader } from "@/context/PreloaderContext";

/**
 * Scroll-down cue homepage — pola "SCROLL TO EXPLORE" interaktif:
 * - Fixed di bawah layar; muncul setelah hero ter-gate preloader.
 * - Label mengikuti bahasa aktif (EN/ID) via PortfolioContext.
 * - ChevronDown memantul (y: [0,8,0] loop).
 * - Hilang saat user mulai menjelajah (scrollY > 65% viewport).
 * - Klik → luncur mulus ke section berikutnya (#core-focus).
 */
export default function HeroScrollCue() {
  const { language } = usePortfolio();
  const { ready } = usePreloader();
  const [visible, setVisible] = useState(true);

  const label =
    language === "id" ? "GULIR UNTUK MENJELAJAH" : "SCROLL TO EXPLORE";

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      setVisible(window.scrollY < window.innerHeight * 0.65);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf = requestAnimationFrame(measure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <AnimatePresence>
      {ready && visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center"
        >
          <button
            type="button"
            aria-label="Scroll ke bawah untuk menjelajah portofolio"
            data-title="SCROLL_CUE"
            data-detail="Click to glide to the Core Focus manifesto"
            onClick={() =>
              document
                .getElementById("core-focus")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="pointer-events-auto flex cursor-pointer flex-col items-center gap-1.5 p-2 text-slate-400 transition-colors hover:text-white"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.45em]">
              {label}
            </span>
            <motion.span
              aria-hidden="true"
              className="block"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={20} strokeWidth={2} />
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
