"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export type PreloaderPhase = "loading" | "reveal" | "done";

interface PreloaderState {
  /** Fase preloader saat ini. */
  phase: PreloaderPhase;
  /** true ketika tirai mulai terangkat — aman memicu animasi hero. */
  ready: boolean;
  setPhase: (phase: PreloaderPhase) => void;
}

const PreloaderContext = createContext<PreloaderState | null>(null);

/**
 * Sinyal fase preloader state machine:
 * - "loading": preloader masih menggambar / menutupi layar.
 * - "reveal" : tirai mulai terangkat — konten hero mulai dianimasikan.
 * - "done"   : preloader benar-benar hilang (atau dilewati via sessionStorage).
 */
export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhaseState] = useState<PreloaderPhase>("loading");

  const setPhase = useCallback((p: PreloaderPhase) => setPhaseState(p), []);

  return (
    <PreloaderContext.Provider
      value={{ phase, ready: phase === "reveal" || phase === "done", setPhase }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const ctx = useContext(PreloaderContext);
  if (!ctx) {
    throw new Error("usePreloader harus dipakai di dalam PreloaderProvider");
  }
  return ctx;
}
