"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Phase = "idle" | "exit" | "enter";

interface PageTransitionContextValue {
  navigate: (href: string) => void;
  phase: Phase;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function usePageTransition(): PageTransitionContextValue {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within PageTransitionProvider");
  return ctx;
}

const PANELS = 5;
const EXIT_MS = 700;

const PANEL_LABELS: Record<string, string> = {
  "/": "HOME",
  "/about": "ABOUT",
  "/projects": "PROJECTS",
  "/skills": "SKILLS",
  "/experience": "EXPERIENCE",
  "/achievements": "HONORS",
  "/resume": "RESUME",
  "/contact": "CONTACT",
};

function labelFor(href: string): string {
  const clean = href.split("?")[0].replace(/\/$/, "") || "/";
  if (PANEL_LABELS[clean]) return PANEL_LABELS[clean];
  const seg = clean.split("/").filter(Boolean).pop();
  return seg ? seg.replace(/-/g, " ").toUpperCase() : "LOADING";
}

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const firstRender = useRef(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setPhase("enter");
    const t = setTimeout(() => setPhase("idle"), 950);
    timers.current.push(t);
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (
        reduce ||
        phase !== "idle" ||
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto")
      ) {
        if (href.startsWith("http") || href.startsWith("mailto")) {
          window.open(href, "_blank", "noopener");
          return;
        }
        if (reduce && !href.startsWith("#")) {
          router.push(href);
          window.scrollTo(0, 0);
        }
        return;
      }

      setLabel(labelFor(href));
      setPhase("exit");
      const t = setTimeout(() => {
        router.push(href);
        window.scrollTo(0, 0);
      }, EXIT_MS);
      timers.current.push(t);
    },
    [phase, reduce, router]
  );

  const panels = React.useMemo(
    () => Array.from({ length: PANELS }, (_, i) => i),
    []
  );

  return (
    <PageTransitionContext.Provider value={{ navigate, phase }}>
      {children}

      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="transition-overlay"
            className="fixed inset-0 z-[99990] pointer-events-none flex"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            {panels.map((p) => (
              <motion.div
                key={p}
                className="h-full flex-1 bg-gradient-to-b from-[#0c0913] via-[#09090d] to-[#100d1c] border-r border-white/[0.04] last:border-r-0"
                initial={{ scaleY: 0, originY: 1 }}
                animate={
                  phase === "exit"
                    ? { scaleY: 1, originY: 1, transition: { duration: 0.55, delay: p * 0.055, ease: [0.76, 0, 0.24, 1] } }
                    : { scaleY: 0, originY: 0, transition: { duration: 0.6, delay: 0.18 + p * 0.05, ease: [0.76, 0, 0.24, 1] } }
                }
                exit={{ opacity: 0 }}
              />
            ))}

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={
                phase === "exit"
                  ? { opacity: 1, transition: { duration: 0.35, delay: 0.3 } }
                  : { opacity: 0, transition: { duration: 0.25 } }
              }
            >
              <div className="flex flex-col items-center gap-3 select-none">
                <motion.span
                  className="font-display font-black text-5xl md:text-7xl tracking-tighter bg-gradient-to-r from-purple-400 via-sky-300 to-sky-400 bg-clip-text text-transparent"
                  initial={{ scale: 1.25, filter: "blur(10px)" }}
                  animate={
                    phase === "exit"
                      ? { scale: 1, filter: "blur(0px)", transition: { duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] } }
                      : { scale: 1.1, filter: "blur(6px)", transition: { duration: 0.3 } }
                  }
                >
                  {label}
                </motion.span>
                <div className="w-40 h-[2px] bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-sky-400 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={
                      phase === "exit"
                        ? { scaleX: 1, transition: { duration: 0.55, delay: 0.25, ease: "easeInOut" } }
                        : { scaleX: 0 }
                    }
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
}
