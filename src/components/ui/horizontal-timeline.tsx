"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";

import { usePortfolio } from "@/context/PortfolioContext";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  isEnd?: boolean;
  period?: string;
  node?: string;
}

export const HorizontalTimeline = ({ data }: { data: TimelineEntry[] }) => {
  const { isIndonesian } = usePortfolio();
  const isId = isIndonesian;
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [scrollWidth, setScrollWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      const updateDimensions = () => {
        if (scrollRef.current) {
          setScrollWidth(scrollRef.current.scrollWidth);
          setViewportWidth(window.innerWidth);
        }
      };

      updateDimensions();

      const resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });

      resizeObserver.observe(scrollRef.current);
      window.addEventListener("resize", updateDimensions);

      return () => {
        if (scrollRef.current) {
          resizeObserver.unobserve(scrollRef.current);
        }
        resizeObserver.disconnect();
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, [data]);

  // Exact hit-testing calculation from personal-blog-ref
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const blueLineTip = latest * window.innerWidth;

    let current = -1;
    for (let i = 0; i < data.length; i++) {
      const el = itemRefs.current[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        const start = rect.left;
        const nextEl = itemRefs.current[i + 1];
        const end = nextEl ? nextEl.getBoundingClientRect().left : rect.left + rect.width;

        if (blueLineTip >= start && blueLineTip < end) {
          current = i;
          break;
        }
      }
    }
    setActiveIndex(current);
  });

  // Transform scroll progress into horizontal movement
  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -Math.max(0, scrollWidth - viewportWidth + 200)] // Stop exactly when the right edge comes into view
  );

  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="w-full bg-background dark:bg-[#05070f] font-sans relative select-none"
      ref={containerRef}
      style={{ height: "400vh" }} // 400vh scroll container matching personal-blog-ref
    >
      {/* Background Tron Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#00f0ff0d_1px,_transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-40" />

      {/* Header/Title Area: Positioned outside sticky container so it naturally scrolls away as the user enters the track */}
      <div className="absolute top-12 md:top-20 left-0 px-6 md:px-12 lg:px-16 z-20 w-full max-w-7xl mx-auto pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/40 rounded text-cyan-700 dark:text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.2em] mb-3 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
            <span>{isId ? "TRAJEKTORI KARIER" : "CAREER TRAJECTORY"}</span>
          </div>

          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl font-black mb-3 text-slate-900 dark:text-white tracking-tight leading-[1.05] drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]"
            whileHover={{ scale: 1.01, originX: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {isId ? "Pengalaman Kerja" : "Work Experience"}
          </motion.h2>

          <motion.p
            className="text-slate-600 dark:text-slate-300 font-sans text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {isId
              ? "Peran riset utama, posisi rekayasa software, dan kepemimpinan akademik."
              : "Key research roles, engineering positions, and academic leadership appointments."}
          </motion.p>
        </motion.div>
      </div>

      {/* Sticky Fullscreen Track Area */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden w-full max-w-[100vw] z-40">
        <div className="relative w-full flex items-center justify-center h-full">

          {/* Cinematic Edge Gradient Overlays to prevent hard text clipping on viewport boundaries */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background via-background/90 to-transparent dark:from-[#05070f] dark:via-[#05070f]/90 dark:to-transparent z-40" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background via-background/90 to-transparent dark:from-[#05070f] dark:via-[#05070f]/90 dark:to-transparent z-40" />

          {/* Background Ambient Line */}
          <div className="absolute left-0 w-full top-1/2 -translate-y-1/2 overflow-hidden h-[2px] bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />

          {/* Glowing Animated Progress Laser Line (Tron Cyan) */}
          <motion.div
            style={{
              width: progressWidth,
              opacity: opacityTransform,
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 shadow-[0_0_20px_rgba(0,240,255,0.95)] z-10"
          />

          {/* Scrolling Content along the laser rail */}
          <motion.div
            ref={scrollRef}
            style={{ x: xTransform }}
            className="flex flex-row items-center px-12 md:px-36 w-max gap-16 md:gap-24 absolute left-0 top-1/2 -translate-y-1/2 z-20"
          >
            {data.map((item, index) => {
              const isEven = index % 2 === 0; // Alternating logic from personal-blog-ref
              const isActive = activeIndex === index;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="relative w-[460px] md:w-[540px] shrink-0 h-0 group cursor-pointer"
                >
                  {/* Diamond Node Marker on the Line */}
                  <div
                    className={cn(
                      "absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background dark:bg-[#05070f] flex items-center justify-center border-none z-20 transition-transform duration-500",
                      isActive ? "scale-125" : "group-hover:scale-125"
                    )}
                  >
                    {/* Pulsing ring on active */}
                    <div
                      className={cn(
                        "absolute -inset-1 rounded-full transition-opacity duration-300",
                        isActive ? "bg-cyan-400/30 animate-ping opacity-100" : "opacity-0 group-hover:opacity-40 bg-cyan-500/20"
                      )}
                    />

                    {/* Diamond Reticle */}
                    <div
                      className={cn(
                        "h-6 w-6 rotate-45 border flex items-center justify-center transition-all duration-500",
                        isActive
                          ? "bg-cyan-100 dark:bg-cyan-950 border-cyan-500 dark:border-cyan-300 shadow-[0_0_18px_rgba(0,240,255,1)]"
                          : "bg-card dark:bg-[#070b16] border-slate-300 dark:border-cyan-500/50 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/60 group-hover:border-cyan-500 dark:group-hover:border-cyan-400"
                      )}
                    >
                      <span
                        className={cn(
                          "-rotate-45 font-mono text-[9px] font-extrabold tracking-tighter",
                          isActive ? "text-cyan-700 dark:text-cyan-300 drop-shadow-[0_0_6px_rgba(0,240,255,0.9)]" : "text-slate-600 dark:text-slate-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300"
                        )}
                      >
                        {item.node || `0${index + 1}`}
                      </span>
                    </div>
                  </div>

                  {item.isEnd ? (
                    <>
                      {/* Mask to hide the line after the end circle */}
                      <div
                        className="absolute top-1/2 left-8 h-[20px] w-full bg-background dark:bg-[#05070f] -translate-y-1/2 z-10"
                      />
                      {/* The content block for View More (clean spacing from node 06 reticle) */}
                      <div
                        className={cn(
                          "absolute left-16 top-1/2 -translate-y-1/2 z-30 transition-transform duration-500",
                          isActive ? "scale-105 translate-x-2" : "group-hover:scale-105 group-hover:translate-x-2"
                        )}
                      >
                        {item.content}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* TITLE - Fades out on active / hover */}
                      <div
                        className={cn(
                          "absolute left-8 w-[380px] md:w-[480px] transition-all duration-500 z-20",
                          !isEven ? "bottom-6" : "top-6"
                        )}
                      >
                        <h3
                          className={cn(
                            "text-base md:text-lg font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-2 transition-all duration-500 drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]",
                            isActive ? "opacity-0 translate-x-2" : "group-hover:opacity-0 group-hover:translate-x-2 text-slate-700 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-cyan-300"
                          )}
                        >
                          {item.title}
                        </h3>
                      </div>

                      {/* DATE - Fades in on active / hover, on the OPPOSITE side */}
                      {item.period && (
                        <div
                          className={cn(
                            "absolute left-8 transition-all duration-500 z-20 pointer-events-none",
                            !isEven ? "top-5" : "bottom-5",
                            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                            !isEven && isActive ? "-translate-y-1" : "",
                            !isEven && !isActive ? "group-hover:-translate-y-1" : "",
                            isEven && isActive ? "translate-y-1" : "",
                            isEven && !isActive ? "group-hover:translate-y-1" : ""
                          )}
                        >
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-50 dark:bg-cyan-950/90 border border-cyan-500/40 rounded-md shadow-[0_0_12px_rgba(0,240,255,0.25)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
                            <span className="text-[10px] md:text-xs font-mono text-cyan-800 dark:text-cyan-300 uppercase tracking-widest">
                              {item.period}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* CARD - Appears on the SAME side as Title, replacing it */}
                      <div
                        className={cn(
                          "absolute left-8 w-full pr-4 transition-all duration-500 ease-out z-30",
                          !isEven ? "bottom-5" : "top-5",
                          isActive
                            ? "opacity-100 pointer-events-auto translate-y-0"
                            : "opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100",
                          !isEven && !isActive ? "translate-y-4 group-hover:translate-y-0" : "",
                          isEven && !isActive ? "-translate-y-4 group-hover:translate-y-0" : ""
                        )}
                      >
                        {item.content}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
