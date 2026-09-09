"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollRevealObserver — "CCTV Layar" Native Intersection Observer
 *
 * Automatically monitors all DOM elements with class `.section-reveal`
 * or attribute `[data-reveal]`. When the element scrolls into the viewport,
 * it attaches the `.muncul` class, triggering the hardware-accelerated
 * CSS transitions (Fade In, Pop Up / Scale In, Slide Up).
 */
export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // Fallback for ancient browsers: show all immediately
      document
        .querySelectorAll(".section-reveal, [data-reveal]")
        .forEach((el) => el.classList.add("muncul"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const once = el.getAttribute("data-reveal-once") !== "false";

          if (entry.isIntersecting) {
            el.classList.add("muncul");
            if (once) {
              obs.unobserve(el);
            }
          } else if (!once) {
            el.classList.remove("muncul");
          }
        });
      },
      {
        rootMargin: "-20px 0px -50px 0px",
        threshold: 0.08,
      }
    );

    const observeAll = () => {
      const targets = document.querySelectorAll(
        ".section-reveal:not(.muncul), [data-reveal]:not(.muncul)"
      );
      targets.forEach((target) => observer.observe(target));
    };

    // Initial pass
    observeAll();

    // Re-observe when DOM mutates (e.g. Next.js dynamic routing or lazy components)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
