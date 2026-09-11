'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Activity } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

interface LoadingScreenProps {
    onComplete?: () => void;
    onExitStart?: () => void;
    duration?: number;
}

const BOOT_LOGS = [
    { text: "Loading core system runtime", tag: "CORE", color: "text-cyan-400" },
    { text: "Initializing Soft Actor-Critic RL models", tag: "RL", color: "text-purple-400" },
    { text: "Connecting AWS SageMaker pipeline", tag: "AWS", color: "text-amber-400" },
    { text: "Preparing Vision-Language edge models", tag: "VLM", color: "text-emerald-400" },
    { text: "Loading verified credentials and research", tag: "DATA", color: "text-cyan-300" },
    { text: "System ready and synchronized", tag: "READY", color: "text-emerald-300" },
];

export function LoadingScreen({ onComplete, onExitStart, duration = 2200 }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [currentLogIndex, setCurrentLogIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const { language } = usePortfolio();
    const isId = language === "id";

    useEffect(() => {
        const interval = 25;
        const totalSteps = duration / interval;
        const stepIncrement = 100 / totalSteps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + stepIncrement;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [duration]);

    useEffect(() => {
        const logIndex = Math.min(
            Math.floor((progress / 100) * BOOT_LOGS.length),
            BOOT_LOGS.length - 1
        );
        setCurrentLogIndex(logIndex);

        if (progress >= 100 && !isExiting) {
            setIsExiting(true);
            onExitStart?.();
            setTimeout(() => {
                onComplete?.();
            }, 800);
        }
    }, [progress, isExiting, onExitStart, onComplete]);

    return (
        <AnimatePresence mode="wait">
            {!isExiting ? (
                <motion.div
                    key="neural-bootloader"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{
                        y: "-100%",
                        transition: {
                            duration: 0.85,
                            ease: [0.76, 0, 0.24, 1],
                        },
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508] text-white overflow-hidden select-none"
                >
                    {/* Ambient Glow Background */}
                    <div 
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                                              linear-gradient(to bottom, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                        }}
                    />
                    <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/15 via-cyan-500/20 to-transparent blur-[120px] pointer-events-none" />

                    {/* Central Terminal HUD */}
                    <div className="relative z-10 w-full max-w-[480px] px-6 flex flex-col gap-6">
                        {/* Header Status */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[10px] tracking-wider text-slate-400">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                                <span className="text-cyan-300 font-bold">RGW Core System</span>
                                <span className="text-slate-500 font-mono">v4.2</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[9px]">
                                <Activity size={12} className="animate-pulse" />
                                <span>ONLINE</span>
                            </div>
                        </div>

                        {/* Title & Identity */}
                        <div className="flex flex-col gap-1.5">
                            <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-cyan-400/80 flex items-center gap-1.5">
                                <Cpu size={13} className="text-cyan-400" />
                                <span>{isId ? "Inisialisasi Portofolio" : "Portfolio Initialization"}</span>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-heading font-black tracking-tight text-white uppercase">
                                RAIHAN GHIFARI WINATA
                            </h1>
                            <p className="text-xs font-mono text-slate-400 tracking-wide">
                                AI &amp; Machine Learning Engineer
                            </p>
                        </div>

                        {/* Progress Bar & Percentage */}
                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-center justify-between font-mono text-xs">
                                <span className="text-slate-400 flex items-center gap-1.5">
                                    <Terminal size={12} className="text-cyan-400" />
                                    <span>{isId ? "Memuat Komponen" : "Loading Components"}</span>
                                </span>
                                <span className="font-bold text-cyan-300 tracking-widest text-sm font-mono">
                                    {Math.round(progress).toString().padStart(3, '0')}%
                                </span>
                            </div>

                            {/* Neon Progress Bar */}
                            <div className="relative h-2 w-full bg-slate-900/80 rounded-full overflow-hidden border border-cyan-500/30 p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                                <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                                    style={{ width: `${progress}%` }}
                                    transition={{ ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        {/* Live Activity Stream */}
                        <div className="bg-black/60 rounded-xl border border-white/10 p-3.5 flex flex-col gap-1.5 font-mono text-[11px] shadow-inner backdrop-blur-md min-h-[72px] justify-center">
                            <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-bold text-cyan-300">
                                    {BOOT_LOGS[currentLogIndex].tag}
                                </span>
                                <span className={`${BOOT_LOGS[currentLogIndex].color} font-medium tracking-tight animate-pulse`}>
                                    {BOOT_LOGS[currentLogIndex].text}
                                </span>
                            </div>
                            <div className="text-[9px] text-slate-500 tracking-wider flex items-center justify-between pt-1 border-t border-white/5">
                                <span>Step {currentLogIndex + 1} of {BOOT_LOGS.length}</span>
                                <span>Latency: 4.2ms</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Subtitle Tags */}
                    <div className="absolute bottom-8 font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase flex items-center gap-4">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">Deep RL</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">Clinical AI</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">MLOps</span>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}