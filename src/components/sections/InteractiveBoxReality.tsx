"use client";

import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal, { WordReveal } from "@/components/animations/ScrollReveal";
import { usePortfolio } from "@/context/PortfolioContext";

type Role = "ai" | "data" | "software";

const ROLE_LABELS: Record<Role, string> = {
  ai: "AI Engineer",
  data: "Data Engineer",
  software: "Software Engineer",
};

const STICKERS: Record<Role, string[]> = {
  ai: ["[AI]", "[RL]", "[GPU]", "[VLM]", "[CUDA]", "[NET]"],
  data: ["[SQL]", "[ETL]", "[DATA]", "[PIPE]", "[PANDAS]", "[DB]"],
  software: ["[DOCKER]", "[K8S]", "[FASTAPI]", "[NEXT]", "[REST]", "[API]"],
};

interface Burst {
  id: number;
  role: Role;
}

let burstId = 0;

export default function InteractiveBoxReality() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const [role, setRole] = useState<Role>("ai");
  const [bursts, setBursts] = useState<Burst[]>([]);

  const burst = useCallback((r: Role) => {
    burstId += 1;
    const id = burstId;
    setBursts((b) => [...b, { id, role: r }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 1300);
  }, []);

  const pickRole = (r: Role) => {
    setRole(r);
    burst(r);
  };

  const stickers = bursts.flatMap((b, bi) =>
    STICKERS[b.role].map((emoji, i) => {
      const angle = (i / STICKERS[b.role].length) * Math.PI * 2 + (bi % 3) * 0.4;
      const dist = 110 + seededRand(i * 13 + b.id) * 90;
      return {
        key: `${b.id}-${i}`,
        emoji,
        sx: Math.cos(angle) * dist,
        sy: Math.sin(angle) * dist - 40,
        sr: `${Math.round(seededRand(i * 7 + b.id) * 90 - 45)}deg`,
        delay: i * 0.045,
      };
    })
  );

  return (
    <section id="box-toy" className="relative py-24 sm:py-32 z-10 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12">
        <div className="mb-12 md:mb-16 text-center">
          <p className="font-mono text-[11px] tracking-[0.3em] text-slate-500 uppercase mb-3">
            {isId ? "RUANG EKSPERIMEN • KLIK KOTAK" : "PLAYGROUND • CLICK THE BOX"}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
            {isId ? (
              <>
                <WordReveal text="Merancang" />{" "}
                <span className="italic font-light text-slate-400 lowercase">
                  <WordReveal text="realitas" delay={0.25} />
                </span>{" "}
                <WordReveal text="digital" delay={0.45} />
              </>
            ) : (
              <>
                <WordReveal text="Architecting" />{" "}
                <span className="italic font-light text-slate-400 lowercase">
                  <WordReveal text="digital" delay={0.25} />
                </span>{" "}
                <WordReveal text="reality" delay={0.45} />
              </>
            )}
          </h2>
        </div>

        <ScrollReveal
          variant="scaleIn"
          duration={1}
          className="relative flex flex-col items-center gap-10"
        >
          <div className="relative" style={{ perspective: "1000px" }}>
            <div className="absolute inset-0 -z-10 rounded-full bg-purple-600/15 blur-[100px] scale-150" />

            <AnimatePresence>
              {stickers.map((s) => (
                <motion.span
                  key={s.key}
                  initial={{ opacity: 0, scale: 0.2, x: "-50%", y: "-50%" }}
                  animate={{
                    opacity: [0, 1, 1, 0.95],
                    scale: [0.2, 1.2, 1, 0.9],
                    x: `calc(-50% + ${s.sx}px)`,
                    y: `calc(-50% + ${s.sy}px)`,
                    rotate: s.sr,
                  }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: 1.15, delay: s.delay, ease: [0.2, 0.9, 0.3, 1.2] }}
                  className="absolute left-1/2 top-1/2 font-pixel text-[10px] md:text-xs px-2.5 py-1 bg-black/85 border border-cyan-400/60 text-cyan-300 rounded shadow-[0_0_12px_rgba(0,240,255,0.4)] z-20 pointer-events-none select-none"
                >
                  {s.emoji}
                </motion.span>
              ))}
            </AnimatePresence>

            <motion.button
              whileHover={{ rotateY: -14, rotateX: 8, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => burst(role)}
              className="relative block w-64 h-56 md:w-80 md:h-72 rounded-2xl border border-amber-200/20 bg-gradient-to-br from-[#2a2119] via-[#1c1712] to-[#12100c] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),inset_0_2px_0_rgba(255,255,255,0.08)] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4ff3f]"
              style={{ transformStyle: "preserve-3d" }}
              aria-label={isId ? "Kotak interaktif: klik untuk meluncurkan stiker" : "Interactive box: click to burst stickers"}
              data-detail={isId ? "Pilih peran di bawah atau klik kotak untuk semburan stiker rekayasa" : "Toggle roles below or click the box for a burst of engineering stickers"}
              data-title={isId ? "KOTAK_REALITAS_DIGITAL" : "DIGITAL_REALITY_BOX"}
            >
              <span className="absolute inset-x-0 top-6 text-center font-display font-black uppercase tracking-tight text-2xl md:text-3xl text-[#e8d9b0] select-none">
                {isId ? "Merancang" : "Architecting"}
              </span>
              <span className="absolute inset-x-0 top-16 md:top-20 text-center font-cursive text-4xl md:text-5xl text-[#d4ff3f]/90 select-none">
                {isId ? "realitas digital" : "digital reality"}
              </span>
              <span className="absolute bottom-5 inset-x-0 text-center font-mono text-[9px] tracking-[0.35em] text-amber-200/40 uppercase select-none">
                {isId ? `MODE ${ROLE_LABELS[role].toUpperCase()}` : `${ROLE_LABELS[role].toUpperCase()} MODE`}
              </span>
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-3 rounded-t-md bg-[#3a2f22] border border-amber-200/15" />
            </motion.button>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => pickRole(r)}
                className={`px-5 py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-widest border transition-all ${role === r
                    ? "bg-[#d4ff3f] text-black border-[#d4ff3f] shadow-[0_0_24px_rgba(212,255,63,0.35)]"
                    : "border-white/15 text-slate-300 hover:border-[#d4ff3f]/50 hover:text-[#d4ff3f]"
                  }`}
              >
                {ROLE_LABELS[r]}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function seededRand(n: number): number {
  const x = Math.sin(n * 91.7 + 47.3) * 24634.6345;
  return x - Math.floor(x);
}
