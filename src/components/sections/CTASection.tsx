"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, FileText, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import { InfiniteRibbon } from "@/components/ui/infinite-ribbon";
import { usePortfolio } from "@/context/PortfolioContext";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
    const { language, t } = usePortfolio();
    const sectionRef = useRef<HTMLElement>(null);
    const systemParadigms = language === "id"
        ? [
            "SISTEM CERDAS",
            "AGEN OTONOM",
            "RUNTIME TERDISTRIBUSI",
            "PIPELINE KINERJA TINGGI",
          ]
        : [
            "INTELLIGENT SYSTEMS",
            "AUTONOMOUS AGENTS",
            "DISTRIBUTED RUNTIMES",
            "HIGH-THROUGHPUT PIPELINES",
          ];
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % systemParadigms.length);
        }, 2800);
        return () => clearInterval(interval);
    }, [systemParadigms.length]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".cta-console",
                { y: 60, opacity: 0, scale: 0.96 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-16 lg:py-24 overflow-hidden bg-background dark:bg-[#02040a] border-t border-slate-200 dark:border-cyan-500/20"
        >
            {/* Ambient Volumetric Flares */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />
            <div className="absolute top-1/3 left-1/3 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,_#00f0ff0d_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-45 -z-10" />

            {/* Glowing Neon Cyber Conduits (Ribbons) */}
            <div className="relative flex h-[280px] sm:h-[320px] w-full items-center justify-center pointer-events-none mb-6">
                {/* Conduit 1 (Cyan Glow) */}
                <InfiniteRibbon
                    rotation={4}
                    baseVelocity={1.0}
                    className="z-10 py-4.5 bg-slate-100/95 dark:bg-[#031326]/90 backdrop-blur-md border-y-2 border-cyan-500 dark:border-cyan-400 shadow-[0_0_35px_rgba(0,240,255,0.25)] dark:shadow-[0_0_35px_rgba(0,240,255,0.45)]"
                    textColor="text-cyan-700 dark:text-cyan-300 font-mono font-bold tracking-[0.2em] text-xs sm:text-sm"
                >
                    {language === "id"
                        ? "REINFORCEMENT LEARNING • ENSEMBLE CONTINUOUS SAC • FORMULASI SEPSIS-3 • BATASAN KESELAMATAN LAGRANGIAN • "
                        : "REINFORCEMENT LEARNING • CONTINUOUS SAC ENSEMBLE • SEPSIS-3 FORMULATION • LAGRANGIAN BOUNDARIES • "}
                </InfiniteRibbon>

                {/* Conduit 2 (Emerald Glow) */}
                <InfiniteRibbon
                    rotation={-4}
                    reverse={true}
                    baseVelocity={1.2}
                    className="z-20 py-4.5 bg-slate-100/95 dark:bg-[#021812]/90 backdrop-blur-md border-y-2 border-emerald-500 dark:border-emerald-400 shadow-[0_0_35px_rgba(0,255,102,0.25)] dark:shadow-[0_0_35px_rgba(0,255,102,0.4)]"
                    textColor="text-emerald-700 dark:text-emerald-300 font-mono font-bold tracking-[0.2em] text-xs sm:text-sm"
                >
                    {language === "id"
                        ? "EDGE VLM • PIPELINE KINERJA TINGGI • PYTORCH TERDISTRIBUSI • NEXT.JS • FASTAPI • "
                        : "EDGE VLMS • HIGH-THROUGHPUT PIPELINES • DISTRIBUTED PYTORCH • NEXT.JS • FASTAPI • "}
                </InfiniteRibbon>
            </div>

            {/* Glassmorphic Cyber Command Chassis */}
            <div className="max-w-5xl mx-auto relative z-20 px-6 sm:px-10 py-12 sm:py-16 bg-card/95 dark:bg-[#040916]/95 border border-slate-200 dark:border-cyan-500/40 rounded-2xl backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(0,240,255,0.15)] text-center cta-console">
                {/* Stepped Pixel Corner Reticles [ + ] */}
                <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-500 dark:border-cyan-400 -translate-x-1 -translate-y-1" />
                <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-500 dark:border-cyan-400 translate-x-1 -translate-y-1" />
                <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-500 dark:border-cyan-400 -translate-x-1 translate-y-1" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-500 dark:border-cyan-400 translate-x-1 translate-y-1" />

                {/* Top Console Telemetry Bar */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-cyan-500/20 mb-8 text-[9.5px] sm:text-[10.5px] font-mono">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_#00ff66] animate-pulse" />
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">{t("cta.consoleHeader", "COMMAND CONSOLE : ONLINE")}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 tracking-wider">
                        <span className="hidden sm:inline">BUFFER: 100%</span>
                        <span className="text-cyan-600 dark:text-cyan-300 font-bold">{t("nav.port", "PORT 443")} [TLS]</span>
                    </div>
                </div>

                {/* Eyebrow Directive Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 dark:bg-cyan-950/70 border border-cyan-500/40 rounded-md text-cyan-600 dark:text-cyan-400 font-pixel text-[9px] sm:text-[10px] tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(0,240,255,0.15)] mb-6">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
                    <span>[ {t("cta.eyebrow", "INITIATE COLLABORATION")} ]</span>
                </div>

                {/* Master Heading */}
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[0.95] max-w-4xl mx-auto drop-shadow-[0_0_35px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_0_35px_rgba(0,0,0,0.8)]">
                    {t("cta.headline", "LET'S ARCHITECT")} <br />
                    <span className="inline-grid place-items-center mt-2">
                        {/* Static placeholder for layout stability */}
                        <span className="col-start-1 row-start-1 invisible pointer-events-none pb-2">
                            {systemParadigms[0]}
                        </span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={systemParadigms[currentWord]}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="col-start-1 row-start-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 dark:from-cyan-400 via-teal-600 dark:via-emerald-400 to-cyan-500 dark:to-cyan-300 drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]"
                            >
                                {systemParadigms[currentWord]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </h2>

                {/* Subtitle */}
                <p className="font-body text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mt-5 mb-10">
                    {t("cta.subtitle", "Open to strategic engineering collaborations in autonomous AI agents, continuous deep reinforcement learning, and distributed high-throughput infrastructure.")}
                </p>

                {/* Tron Cyber Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    {/* Primary Button */}
                    <Link
                        href="/contact"
                        className="group/btn relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black font-heading font-black tracking-wider uppercase text-xs sm:text-sm rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:shadow-[0_0_45px_rgba(0,240,255,0.8)] hover:scale-105 active:scale-95 transition-all"
                    >
                        <Mail className="w-4 h-4 text-black group-hover/btn:rotate-12 transition-transform" />
                        <span>{t("cta.btnPrimary", "INITIATE CONTACT")}</span>
                        <ArrowUpRight className="w-4 h-4 text-black group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>

                    {/* Secondary Button */}
                    <Link
                        href="/resume"
                        className="group/btn relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-card dark:bg-[#06152b]/90 border-2 border-slate-300 dark:border-cyan-500/60 hover:border-cyan-500 text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-white font-mono font-bold tracking-wider uppercase text-xs sm:text-sm rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 transition-all"
                    >
                        <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                        <span>{t("cta.btnSecondary", "CURRICULUM VITAE")}</span>
                        <ArrowUpRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Console Footer Telemetry Bar */}
                <div className="mt-10 pt-6 border-t border-slate-200 dark:border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-[9px] sm:text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span className="text-slate-700 dark:text-slate-300">{t("cta.footerStatus", "STATUS: OPEN FOR STRATEGIC ROLES")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{t("cta.footerLatency", "RESPONSE LATENCY: <24H")}</span>
                    </div>
                    <div className="text-cyan-700 dark:text-cyan-400 font-semibold">
                        {t("cta.footerZone", "ZONE: JAKARTA & BEKASI [UTC+7]")}
                    </div>
                </div>
            </div>
        </section>
    );
}
