'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, useMotionValue } from 'framer-motion';
import { cn } from "@/lib/utils";
import { HoverScrambleText } from '@/components/ui/hover-scramble-text';
import { ChevronDown, Terminal, Sparkles, Activity } from 'lucide-react';
import Loader from './Loader';
import { usePortfolio } from '@/context/PortfolioContext';

interface SlideContent {
    code: string;
    systemTag: string;
    heading: string;
    description: string;
    skills: string[];
    theme: 'cyan' | 'emerald' | 'purple';
    primaryColor: string;
    glowClass: string;
}

interface PageSlideItem {
    leftComponent: React.ReactNode | null;
    rightComponent: React.ReactNode | null;
    leftContent: SlideContent | null;
    rightContent: SlideContent | null;
}

interface BridgeSlideItem {
    isBridge: true;
    heading: string;
    subheading: string;
}

type PageItem = PageSlideItem | BridgeSlideItem;

const pagesEn: PageItem[] = [
    {
        leftComponent: <Loader type="ai" />,
        rightComponent: null,
        leftContent: null,
        rightContent: {
            code: "SYSTEM 01 : AGENT RUNTIME",
            systemTag: "MODULE 01",
            heading: "Autonomous Agents & Reasoning",
            description: "Engineering stateful multi-agent architectures using LangGraph and deterministic execution graphs. Built with hybrid dense-sparse retrieval combining vector embeddings with BM25 keyword matching, structured tool calling, and active prompt defense layers for production stability.",
            skills: ["LangGraph Agents", "Hybrid Vector DB", "Prompt Shields", "Decision Transformers", "VLM Fine-Tuning", "Autonomous Pipelines"],
            theme: "cyan",
            primaryColor: "#00f0ff",
            glowClass: "shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        },
    },
    {
        leftComponent: null,
        rightComponent: <Loader type="software" />,
        leftContent: {
            code: "SYSTEM 02 : REINFORCEMENT LEARNING",
            systemTag: "MODULE 02",
            heading: "Deep RL & Real-Time Vision",
            description: "Developing continuous control models with Soft Actor-Critic and dynamic safety boundaries. Optimized on clinical ICU datasets and low-latency computer vision streams to maintain strict safety margins under sub-50ms inference constraints.",
            skills: ["Soft Actor-Critic", "Lagrangian Safety", "Edge Perception", "PyTorch CUDA", "Clinical Telemetry", "Real-Time OpenCV"],
            theme: "emerald",
            primaryColor: "#00ff88",
            glowClass: "shadow-[0_0_20px_rgba(0,255,136,0.3)]"
        },
        rightContent: null,
    },
    {
        leftComponent: <Loader type="softskill" />,
        rightComponent: null,
        leftContent: null,
        rightContent: {
            code: "SYSTEM 03 : DISTRIBUTED SYSTEMS",
            systemTag: "MODULE 03",
            heading: "High-Throughput ML Infrastructure",
            description: "Building low-latency inference microservices and GPU-accelerated computing backends. Implements vectorized replay buffers yielding 10x training acceleration, containerized FastAPI services, and distributed Qdrant vector indexing.",
            skills: ["CUDA Acceleration", "FastAPI Services", "Docker & Kubernetes", "Qdrant Vector DB", "PostgreSQL", "Cloud Architecture"],
            theme: "purple",
            primaryColor: "#c084fc",
            glowClass: "shadow-[0_0_20px_rgba(192,132,252,0.3)]"
        },
    },
    {
        isBridge: true,
        heading: "Explore Production AI Systems & Research",
        subheading: "SCROLL TO INITIALIZE PROJECT SHOWCASE",
    }
];

const pagesId: PageItem[] = [
    {
        leftComponent: <Loader type="ai" />,
        rightComponent: null,
        leftContent: null,
        rightContent: {
            code: "SISTEM 01 : RUNTIME AGEN",
            systemTag: "MODUL 01",
            heading: "Agen Otonom & Penalaran",
            description: "Merekayasa arsitektur multi-agen dengan LangGraph dan graf eksekusi deterministik. Dibangun dengan retrieval hibrida dense-sparse memadukan embedding vektor dan pencocokan BM25, structured tool calling, serta lapisan pertahanan prompt untuk stabilitas produksi.",
            skills: ["Agen LangGraph", "Vektor DB Hibrida", "Perisai Prompt", "Decision Transformer", "Fine-Tuning VLM", "Pipeline Otonom"],
            theme: "cyan",
            primaryColor: "#00f0ff",
            glowClass: "shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        },
    },
    {
        leftComponent: null,
        rightComponent: <Loader type="software" />,
        leftContent: {
            code: "SISTEM 02 : REINFORCEMENT LEARNING",
            systemTag: "MODUL 02",
            heading: "Deep RL & Vision Real-Time",
            description: "Mengembangkan model kontrol kontinu dengan Soft Actor-Critic dan batasan keselamatan dinamis. Dioptimalkan pada dataset ICU klinis dan stream computer vision latensi rendah untuk menjaga batas keselamatan ketat di bawah batas inferensi 50ms.",
            skills: ["Soft Actor-Critic", "Keselamatan Lagrangian", "Persepsi Edge", "PyTorch CUDA", "Telemetri Klinis", "OpenCV Real-Time"],
            theme: "emerald",
            primaryColor: "#00ff88",
            glowClass: "shadow-[0_0_20px_rgba(0,255,136,0.3)]"
        },
        rightContent: null,
    },
    {
        leftComponent: <Loader type="softskill" />,
        rightComponent: null,
        leftContent: null,
        rightContent: {
            code: "SISTEM 03 : SISTEM TERDISTRIBUSI",
            systemTag: "MODUL 03",
            heading: "Infrastruktur ML Kinerja Tinggi",
            description: "Membangun microservice inferensi latensi rendah dan backend komputasi terakselerasi GPU. Mengimplementasikan buffer replay tervektorisasi untuk akselerasi pelatihan 10x, layanan FastAPI terkontainerisasi, dan pengindeksan vektor Qdrant terdistribusi.",
            skills: ["Akselerasi CUDA", "Layanan FastAPI", "Docker & Kubernetes", "Qdrant Vector DB", "PostgreSQL", "Arsitektur Cloud"],
            theme: "purple",
            primaryColor: "#c084fc",
            glowClass: "shadow-[0_0_20px_rgba(192,132,252,0.3)]"
        },
    },
    {
        isBridge: true,
        heading: "Jelajahi Sistem AI Produksi & Riset",
        subheading: "GULIR UNTUK MEMULAI SHOWCASE PROYEK",
    }
];

export default function ScrollAdventure() {
    const { language } = usePortfolio();
    const pages = language === "id" ? pagesId : pagesEn;
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        mass: 0.1,
        restDelta: 0.001
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const totalPages = pages.length;
        const step = 1 / totalPages;
        const index = Math.min(Math.floor(latest / step) + 1, totalPages);
        if (currentPage !== index) setCurrentPage(index);
    });

    const { scrollYProgress: enterProgressRaw } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    const enterProgress = useSpring(enterProgressRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const enterScale = useTransform(enterProgress, [0, 1], [0.92, 1]);
    const enterOpacity = useTransform(enterProgress, [0, 1], [0, 1]);

    return (
        <div ref={containerRef} className="relative h-[800vh] w-full pointer-events-none">
            <motion.div
                style={{ scale: enterScale, opacity: enterOpacity }}
                className="sticky top-0 h-screen w-full overflow-hidden bg-[#02040a] pointer-events-auto origin-center"
            >
                {/* Tron Ambient Grid Pattern Background */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(0, 240, 255, 0.12) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 240, 255, 0.12) 1px, transparent 1px)
                        `,
                        backgroundSize: '48px 48px',
                        maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 95%)',
                        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 95%)'
                    }}
                />

                {pages.map((page, i) => {
                    if ('isBridge' in page) {
                        return (
                            <BridgeSlide
                                key={i}
                                page={page}
                                isActive={currentPage === i + 1}
                                scrollProgress={smoothProgress}
                                index={i}
                            />
                        );
                    }
                    return (
                        <PageSlide
                            key={i}
                            page={page}
                            isActive={currentPage === i + 1}
                            scrollProgress={smoothProgress}
                            index={i}
                        />
                    );
                })}
            </motion.div>
        </div>
    );
}

function PageSlide({
    page,
    scrollProgress,
    index
}: {
    page: PageSlideItem;
    isActive: boolean;
    scrollProgress: any;
    index: number;
}) {
    const leftHasVisual = !!page.leftComponent;
    const rightHasVisual = !!page.rightComponent;

    // Tightly tuned transition intervals for seamless snap & long stationary reading plateau
    let enterStart: number, enterEnd: number, exitStart: number, exitEnd: number;

    if (index === 0) {
        enterStart = -0.05;
        enterEnd = 0.00;
        exitStart = 0.22;
        exitEnd = 0.28;
    } else if (index === 1) {
        enterStart = 0.22;
        enterEnd = 0.28;
        exitStart = 0.50;
        exitEnd = 0.56;
    } else {
        enterStart = 0.50;
        enterEnd = 0.56;
        exitStart = 0.76;
        exitEnd = 0.82;
    }

    const leftY = useTransform(
        scrollProgress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [leftHasVisual ? "-100%" : "100%", "0%", "0%", leftHasVisual ? "-100%" : "100%"]
    );

    const rightY = useTransform(
        scrollProgress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [rightHasVisual ? "-100%" : "100%", "0%", "0%", rightHasVisual ? "-100%" : "100%"]
    );

    const zIndex = useTransform(
        scrollProgress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [10, 20, 20, 10]
    );

    const activeThemeColor = page.leftContent?.primaryColor || page.rightContent?.primaryColor || "#00f0ff";

    return (
        <motion.div
            style={{ zIndex }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none p-3 sm:p-5 md:p-8 lg:p-10"
        >
            {/* Unified Tron Cyberpunk Card Container */}
            <div className="relative w-full h-full max-w-[1540px] flex flex-col md:flex-row pointer-events-auto bg-[#040814]/90 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)]">
                {/* Tron Glowing Accent Edge Line (Top) */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-75 z-30"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${activeThemeColor}, transparent)`
                    }}
                />

                {/* 4 Pixel Corner Markers */}
                <div className="absolute top-2 left-2 w-2 h-2 z-30" style={{ backgroundColor: activeThemeColor }} />
                <div className="absolute top-2 right-2 w-2 h-2 z-30" style={{ backgroundColor: activeThemeColor }} />
                <div className="absolute bottom-2 left-2 w-2 h-2 z-30" style={{ backgroundColor: activeThemeColor }} />
                <div className="absolute bottom-2 right-2 w-2 h-2 z-30" style={{ backgroundColor: activeThemeColor }} />

                {/* LEFT HALF OF THE SPLIT CARD */}
                <motion.div
                    style={{ y: leftY }}
                    className="relative w-full md:w-1/2 h-full z-10 overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5"
                >
                    <div className="w-full h-full relative flex items-center justify-center">
                        {page.leftComponent ? (
                            <div className="w-full h-full flex items-center justify-center p-3">
                                {page.leftComponent}
                            </div>
                        ) : page.leftContent ? (
                            <div className="w-full h-full flex items-center justify-start p-6 sm:p-8 md:p-10 lg:p-12 relative">
                                <EditorialContent content={page.leftContent} />
                            </div>
                        ) : null}
                    </div>
                </motion.div>

                {/* RIGHT HALF OF THE SPLIT CARD */}
                <motion.div
                    style={{ y: rightY }}
                    className="relative w-full md:w-1/2 h-full z-10 overflow-hidden flex items-center justify-center"
                >
                    <div className="w-full h-full relative flex items-center justify-center">
                        {page.rightComponent ? (
                            <div className="w-full h-full flex items-center justify-center p-3">
                                {page.rightComponent}
                            </div>
                        ) : page.rightContent ? (
                            <div className="w-full h-full flex items-center justify-start p-6 sm:p-8 md:p-10 lg:p-12 relative">
                                <EditorialContent content={page.rightContent} />
                            </div>
                        ) : null}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

/**
 * Authentic 8-bit stepped pixel gem/star separator based on DESIGN_SYSTEM.md
 */
function PixelArtGemMini({ color = "#00f0ff" }: { color?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 shrink-0"
            style={{ shapeRendering: "crispEdges", filter: `drop-shadow(0 0 8px ${color})` }}
        >
            <rect x="11" y="1" width="2" height="4" fill={color} />
            <rect x="9" y="3" width="6" height="3" fill={color} />
            <rect x="7" y="5" width="10" height="3" fill={color} />
            <rect x="1" y="11" width="22" height="2" fill={color} />
            <rect x="3" y="9" width="18" height="6" fill={color} />
            <rect x="5" y="7" width="14" height="10" fill={color} />
            <rect x="7" y="16" width="10" height="3" fill={color} />
            <rect x="9" y="18" width="6" height="3" fill={color} />
            <rect x="11" y="19" width="2" height="4" fill={color} />
            <rect x="9" y="9" width="6" height="6" fill="#ffffff" />
        </svg>
    );
}

function BridgeSlide({
    page,
    isActive,
    scrollProgress
}: {
    page: BridgeSlideItem;
    isActive: boolean;
    scrollProgress: any;
    index: number;
}) {
    const { language } = usePortfolio();
    const isId = language === "id";
    const opacity = useTransform(scrollProgress, [0.76, 0.82, 0.98, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollProgress, [0.76, 0.82, 0.98, 1], [30, 0, 0, -30]);

    return (
        <motion.div
            style={{ opacity, zIndex: 30 }}
            className={cn(
                "absolute inset-0 bg-[#02040a]/95 flex flex-col items-center justify-center p-8 md:p-16 text-center backdrop-blur-xl",
                isActive ? "pointer-events-auto" : "pointer-events-none"
            )}
        >
            {/* Tron Ambient Crosshairs */}
            <div className="absolute inset-12 md:inset-24 pointer-events-none border border-cyan-500/10 flex flex-col justify-between">
                <div className="flex justify-between p-2">
                    <span className="text-cyan-400/40 text-xs font-mono">+</span>
                    <span className="text-cyan-400/40 text-xs font-mono">+</span>
                </div>
                <div className="flex justify-between p-2">
                    <span className="text-cyan-400/40 text-xs font-mono">+</span>
                    <span className="text-cyan-400/40 text-xs font-mono">+</span>
                </div>
            </div>

            <motion.div style={{ y }} className="space-y-12 max-w-[1100px] w-full relative z-10 px-4">
                {/* Cyberpunk Telemetry Tag (font-pixel as per design_system.md) */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-cyan-950/70 border border-cyan-500/50 rounded shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                    <PixelArtGemMini color="#00f0ff" />
                    <span className="font-pixel text-[8px] md:text-[9px] tracking-[0.25em] text-cyan-300 uppercase">
                        {isId ? "DIREKTIF TRANSISI : TERINISIALISASI" : "TRANSITION DIRECTIVE : INITIALIZED"}
                    </span>
                </div>

                {/* Display Title (font-heading as per design_system.md) */}
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold uppercase tracking-tight text-white leading-[1.08]">
                    <HoverScrambleText text={page.heading} />
                </h2>

                <div className="flex flex-col items-center gap-4 pt-6">
                    <span className="font-pixel text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cyan-400">
                        {page.subheading}
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="p-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    >
                        <ChevronDown className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function EditorialContent({ content }: { content: SlideContent }) {
    return (
        <div className="flex flex-col items-start text-left space-y-5 md:space-y-6 max-w-xl w-full relative z-10">
            {/* Architectural Directive / System Tag (font-pixel as per design_system.md) */}
            <div className="flex items-center gap-3">
                <div
                    className="flex items-center gap-2 px-3 py-1.5 bg-black/85 border text-[8px] md:text-[9px] font-pixel tracking-[0.2em] uppercase rounded-sm"
                    style={{
                        borderColor: `${content.primaryColor}66`,
                        boxShadow: `0 0 16px ${content.primaryColor}33`,
                        color: content.primaryColor
                    }}
                >
                    <PixelArtGemMini color={content.primaryColor} />
                    <span>{content.code}</span>
                </div>
                <div
                    className="h-[1px] w-12"
                    style={{
                        background: `linear-gradient(to right, ${content.primaryColor}, transparent)`
                    }}
                />
            </div>

            {/* Section Title (font-heading as per design_system.md) */}
            <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-heading font-bold uppercase tracking-[-0.02em] leading-[1.08] text-white transition-colors duration-300"
            >
                {content.heading}
            </h2>

            {/* Narrative Body (font-sans as per design_system.md) */}
            <p className="text-sm sm:text-base md:text-[16px] text-zinc-300 font-sans font-normal leading-relaxed">
                {content.description}
            </p>

            {/* Skills / Pixel Tron Chips (font-mono as per design_system.md) */}
            {content.skills && (
                <div className="flex flex-wrap gap-2 pt-1">
                    {content.skills.map((skill: string, idx: number) => (
                        <TronPixelChip
                            key={skill}
                            text={skill}
                            index={idx}
                            themeColor={content.primaryColor}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function TronPixelChip({
    text,
    index,
    themeColor
}: {
    text: string;
    index: number;
    themeColor: string;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.3);
        y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer pointer-events-auto"
        >
            <motion.div
                style={{ x: springX, y: springY }}
                className="group/chip relative flex items-center gap-2 px-3.5 py-2 bg-[#050914] border border-white/10 hover:border-white/30 rounded-md transition-all duration-300 backdrop-blur-md overflow-hidden"
            >
                {/* Stepped pixel notch corners on hover */}
                <div
                    className="absolute top-0 right-0 w-1.5 h-1.5 opacity-0 group-hover/chip:opacity-100 transition-opacity"
                    style={{ backgroundColor: themeColor }}
                />

                {/* Pixel Icon Dot */}
                <span
                    className="w-1.5 h-1.5 shrink-0 transition-transform duration-300 group-hover/chip:scale-125"
                    style={{ backgroundColor: themeColor }}
                />

                {/* Label (font-mono as per design_system.md) */}
                <span className="text-[11px] font-mono font-medium tracking-[0.05em] uppercase text-zinc-300 group-hover/chip:text-white transition-colors duration-200">
                    {text}
                </span>

                {/* Glowing border highlight on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover/chip:opacity-15 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: themeColor }}
                />
            </motion.div>
        </div>
    );
}


