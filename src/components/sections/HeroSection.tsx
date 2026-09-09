"use client";

import React, { useRef } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Bot, Zap, ArrowDownRight } from "lucide-react";
import TextScramble from "@/components/animations/TextScramble";
import RobotCompanion from "@/components/3d/RobotCompanion";
import RotatingStamp from "@/components/animations/RotatingStamp";

export default function HeroSection() {
  const { t, language } = usePortfolio();
  const isId = language === "id";
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scroll parallax — each layer drifts at a different speed as hero exits
  const textScrollY1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const textScrollY2 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const textScrollY3 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const stampY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const robotScrollY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const robotScrollRotate = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const raysScrollY = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const raysScrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 55, damping: 18, mass: 0.6 };
  const sx = useSpring(mx, springCfg);
  const sy = useSpring(my, springCfg);

  const layer1X = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const layer1Y = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const layer2X = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const layer2Y = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const layer3X = useTransform(sx, [-0.5, 0.5], [-34, 34]);
  const layer3Y = useTransform(sy, [-0.5, 0.5], [-16, 16]);
  const orbX = useTransform(sx, [-0.5, 0.5], [46, -46]);
  const orbY = useTransform(sy, [-0.5, 0.5], [28, -28]);
  const rayX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const rayY = useTransform(sy, [-0.5, 0.5], [-14, 14]);

  const handleMouse = (e: React.MouseEvent) => {
    if (reduce) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 z-10 overflow-hidden"
    >
      {/* Robot Companion — flies at the viewer once, then perches here (scrolls away with page) */}
      <motion.div
        style={
          reduce
            ? undefined
            : {
              x: orbX,
              y: robotScrollY,
              rotate: robotScrollRotate,
              translateY: "-50%",
            }
        }
        className="hidden xl:block absolute right-[1%] top-1/2 -translate-y-1/2 z-10 pointer-events-none"
      >
        <RobotCompanion size={330} />
      </motion.div>

      {/* 3D Volumetric Studio Light Rays — mouse parallax + slow scroll drift */}
      <motion.div
        style={
          reduce ? undefined : { x: rayX, y: raysScrollY, scale: raysScrollScale }
        }
        className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Left Ray Cone -45deg */}
        <div className="absolute top-0 left-0 w-screen h-screen pointer-events-none">
          <div
            style={{
              transform: "translateY(-300px) rotate(-45deg)",
              background: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 100%, .15) 0, hsla(0, 0%, 100%, .05) 50%, transparent 80%)",
              width: "560px",
              height: "1380px",
            }}
            className="absolute top-0 left-0"
          />
          <div
            style={{
              transform: "rotate(-45deg) translate(5%, -50%)",
              background: "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .1) 0, hsla(0, 0%, 100%, .02) 80%, transparent 100%)",
              width: "240px",
              height: "1380px",
            }}
            className="absolute top-0 left-0 origin-top-left"
          />
          <div
            style={{
              transform: "rotate(-45deg) translate(-180%, -70%)",
              background: "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .08) 0, hsla(0, 0%, 100%, 0) 80%, transparent 100%)",
              width: "240px",
              height: "1380px",
            }}
            className="absolute top-0 left-0 origin-top-left"
          />
        </div>

        {/* Right Ray Cone 45deg */}
        <div className="absolute top-0 right-0 w-screen h-screen pointer-events-none">
          <div
            style={{
              transform: "translateY(-300px) rotate(45deg)",
              background: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 100%, .15) 0, hsla(0, 0%, 100%, .05) 50%, transparent 80%)",
              width: "560px",
              height: "1380px",
            }}
            className="absolute top-0 right-0"
          />
          <div
            style={{
              transform: "rotate(45deg) translate(-5%, -50%)",
              background: "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .1) 0, hsla(0, 0%, 100%, .02) 80%, transparent 100%)",
              width: "240px",
              height: "1380px",
            }}
            className="absolute top-0 right-0 origin-top-right"
          />
          <div
            style={{
              transform: "rotate(45deg) translate(180%, -70%)",
              background: "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .08) 0, hsla(0, 0%, 100%, 0) 80%, transparent 100%)",
              width: "240px",
              height: "1380px",
            }}
            className="absolute top-0 right-0 origin-top-right"
          />
        </div>
      </motion.div>

      {/* Fixed Sticky Left Edge Badge */}
      <div className="fixed left-0 top-1/2 z-50 hidden md:flex items-center transform -translate-y-1/2 group/container">
        <a
          href="#contact"
          data-detail="Click to initiate transmission or discuss engineering opportunities"
          data-title="OPPORTUNITY_STATUS"
          className="bg-white text-black py-10 px-4 text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl rounded-r-3xl border-r border-y border-zinc-200 cursor-pointer hover:pl-6 transition-all block"
        >
          <span className="rotate-0 [writing-mode:vertical-rl] select-none">
            {t("badge.available")}
          </span>
        </a>
      </div>

      {/* Main Monumental Stage Container */}
      <motion.div
        style={reduce ? undefined : { opacity: heroOpacity }}
        className="relative z-10 max-w-[105rem] w-full mx-auto px-6 sm:px-12 flex flex-col justify-center"
      >
        {/* Kinetic Segmented Typography Grid — mouse parallax layers */}
        <div className="flex relative gap-2 md:gap-4 md:items-center w-full flex-col justify-center">
          {/* Row 1: Greeting + AI & DATA + Orbiting GitHub */}
          <motion.div
            style={
              reduce ? undefined : { x: layer1X, y: layer1Y }
            }
            className="md:flex gap-8 items-center relative"
          >
            <motion.div style={reduce ? undefined : { y: textScrollY1 }} className="md:flex gap-8 items-center relative w-full">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="text-[10px] md:text-xs text-slate-400 text-start md:text-right leading-relaxed max-w-[200px] md:max-w-[220px] font-medium uppercase tracking-[0.2em]"
              >
                <TextScramble text={t("hero.greeting")} speed={20} />
              </motion.p>

              <div className="relative">
                {/* Floating GitHub Orb */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute -top-4 right-0 md:right-2 text-sky-400 hover:text-white z-20"
                >
                  <a
                    href="https://github.com/raihanghifariw"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-detail="View repositories, research benchmarks, and PyTorch architectures"
                    data-title="GITHUB_REPOSITORIES"
                    className="block p-1 cursor-pointer"
                    aria-label="GitHub Profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </a>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="text-[clamp(3rem,11vw,13rem)] font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-2 md:px-4 select-none"
                >
                  AI &amp; DATA
                </motion.h1>
              </div>
            </motion.div>
          </motion.div>

          {/* Row 2: Orbiting LinkedIn + SOFT [⚡] WARE + Orbiting Instagram */}
          <motion.div
            style={
              reduce ? undefined : { x: layer2X, y: layer2Y }
            }
            className="md:flex gap-8 items-center relative"
          >
            <motion.div style={reduce ? undefined : { y: textScrollY2 }} className="md:flex gap-8 items-center relative w-full">
              <div className="relative">
                {/* Floating LinkedIn Orb */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="absolute -top-8 left-2 md:left-4 text-purple-400 hover:text-white z-20"
                >
                  <a
                    href="https://linkedin.com/in/raihan-ghifari-553a1a26a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-detail="Connect on LinkedIn for professional network and verified credentials"
                    data-title="LINKEDIN_PROFILE"
                    className="block p-1 cursor-pointer"
                    aria-label="LinkedIn Profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </motion.div>

                {/* Floating Instagram Orb */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="absolute -bottom-10 right-20 md:right-32 text-pink-400 hover:text-white z-20"
                >
                  <a
                    href="https://instagram.com/pawwdanyap"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-detail="Connect on Instagram @pawwdanyap"
                    data-title="INSTAGRAM"
                    className="block p-1 cursor-pointer"
                    aria-label="Instagram Profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                  className="text-[clamp(3rem,11vw,13rem)] md:flex items-center font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-2 md:px-4 select-none"
                >
                  <span>SOFT</span>
                  <div
                    data-detail="High-speed asynchronous Python & FastAPI microservices"
                    data-title="SYSTEM_ENERGY"
                    className="mx-[0.05em] relative cursor-pointer group inline-flex items-center"
                  >
                    <Zap className="w-[0.8em] h-[0.8em] text-sky-400 group-hover:text-sky-300 group-hover:scale-125 transition-all drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]" />
                  </div>
                  <span>WARE</span>
                </motion.h1>
              </div>
            </motion.div>
          </motion.div>

          {/* Row 3: EN [🤖] GINEER + Collaboration Callout */}
          <motion.div
            style={
              reduce ? undefined : { x: layer3X, y: layer3Y }
            }
            className="md:flex gap-8 items-center relative"
          >
            <motion.div style={reduce ? undefined : { y: textScrollY3 }} className="md:flex gap-8 items-center relative w-full">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="text-[clamp(3rem,11vw,13rem)] md:flex items-center font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-2 md:px-4 select-none"
              >
                <span>EN</span>
                <div
                  data-detail="Autonomous AI Agents, Multi-Agent LangGraph & Clinical Decision Systems"
                  data-title="INTELLIGENCE_CORE"
                  className="mx-[0.05em] relative cursor-pointer group inline-flex items-center"
                >
                  <Bot className="w-[0.85em] h-[0.85em] text-yellow-500 fill-yellow-500/10 group-hover:text-yellow-400 group-hover:fill-yellow-400/30 group-hover:scale-125 transition-all drop-shadow-[0_0_15px_rgba(245,158,11,0.7)]" />
                </div>
                <span>GINEER</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-[10px] md:text-xs text-slate-400 pt-2 md:pt-6 leading-relaxed max-w-[250px] md:max-w-[220px] font-medium uppercase tracking-widest"
              >
                Open to all forms of collaboration, research, and production AI engineering.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Editorial Strip & Expanding Resume Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="w-full mt-10 md:mt-20"
        >
          <div className="flex items-center gap-6">
            <div className="w-full flex-1 h-[1px] bg-white/10 hidden md:block" />

            <div
              data-detail={
                isId
                  ? "Tersinkronisasi dengan WIB (Waktu Indonesia Barat / UTC+7)"
                  : "Synchronized with WIB (Western Indonesia Time / UTC+7)"
              }
              data-title={isId ? "TELEMETRI_LOKASI" : "LOCATION_TELEMETRY"}
              className="text-[10px] md:text-xs whitespace-nowrap font-bold tracking-[0.3em] text-slate-400 uppercase cursor-pointer"
            >
              BEKASI / JAKARTA, ID • 2026
            </div>

            {/* Pulsing Scroll-to-Trigger Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-[10px] font-mono font-bold tracking-widest text-[#d4ff3f] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff3f] animate-ping" />
              {isId ? "GULIR UNTUK MENAMPILKAN ↓" : "SCROLL TO REVEAL ↓"}
            </div>

            {/* Expanding Action Pill */}
            <a
              href="https://www.linkedin.com/in/raihan-ghifari-553a1a26a/"
              target="_blank"
              rel="noopener noreferrer"
              data-detail={
                isId
                  ? "Periksa kualifikasi terverifikasi & curriculum vitae di LinkedIn"
                  : "Inspect verified qualifications & curriculum vitae on LinkedIn"
              }
              data-title={isId ? "CV_TERVERIFIKASI" : "VERIFIED_CV"}
              className="group flex items-center cursor-pointer"
            >
              <div className="relative flex items-center bg-zinc-100 dark:bg-white h-12 w-12 group-hover:w-44 rounded-full transition-all duration-500 ease-[0.23,1,0.32,1] overflow-hidden shadow-2xl">
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:delay-150 text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-black pl-6 pr-12 select-none">
                  {isId ? "Lihat Resume" : "View Resume"}
                </span>
                <div className="absolute right-0 flex items-center justify-center size-12 text-zinc-900 dark:text-black group-hover:rotate-45 transition-transform duration-500">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
              </div>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Rotating Scroll Stamp — drifts up & spins while leaving hero */}
      <motion.div
        style={reduce ? undefined : { y: stampY }}
        className="absolute bottom-24 right-10 xl:right-24 z-20 hidden md:block pointer-events-none"
      >
        <RotatingStamp size={118} />
      </motion.div>
    </section>
  );
}
