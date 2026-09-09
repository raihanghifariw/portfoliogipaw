"use client";

import React from "react";
import { motion, useTransform, easeInOut, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { BrandScroller, BrandScrollerReverse } from "@/components/ui/brand-scroller";
import { ArrowUpRight } from "lucide-react";
import MagneticEffect from "@/components/ui/MagneticEffect";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/context/PortfolioContext";

const BlurInUpText = ({ text, animate }: { text: string; animate: boolean }) => {
    const words = text.split(" ");
    return (
        <motion.span
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.01 }}
            aria-label={text}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-pre">
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            variants={{
                                hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                                visible: { 
                                    opacity: 1, 
                                    y: 0, 
                                    filter: "blur(0px)", 
                                    transition: { type: "spring", bounce: 0, duration: 0.5 } 
                                }
                            }}
                            className="inline-block"
                            style={{ willChange: "filter, opacity, transform" }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
            ))}
        </motion.span>
    );
};

interface IdentitySequenceProps {
    scrollYProgress: any;
    isVisible: boolean;
}

/**
 * PixelArtGem: Authentic 8-bit stepped pixel star/gem
 * rendered with crisp pixel edges and glowing neon Tron drop shadow.
 */
function PixelArtGem({ color = "#00f0ff" }: { color?: string }) {
    return (
        <div className="relative mx-8 sm:mx-14 md:mx-20 flex items-center justify-center shrink-0">
            <svg
                viewBox="0 0 24 24"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24"
                style={{ shapeRendering: "crispEdges", filter: `drop-shadow(0 0 18px ${color})` }}
            >
                {/* 8-bit stepped pixel star outer shape */}
                <rect x="11" y="1" width="2" height="4" fill={color} />
                <rect x="9" y="3" width="6" height="3" fill={color} />
                <rect x="7" y="5" width="10" height="3" fill={color} />
                <rect x="1" y="11" width="22" height="2" fill={color} />
                <rect x="3" y="9" width="18" height="6" fill={color} />
                <rect x="5" y="7" width="14" height="10" fill={color} />
                <rect x="7" y="16" width="10" height="3" fill={color} />
                <rect x="9" y="18" width="6" height="3" fill={color} />
                <rect x="11" y="19" width="2" height="4" fill={color} />

                {/* Inner glowing white core */}
                <rect x="9" y="9" width="6" height="6" fill="#ffffff" />
                <rect x="11" y="7" width="2" height="10" fill="#ffffff" />
                <rect x="7" y="11" width="10" height="2" fill="#ffffff" />
            </svg>
        </div>
    );
}

interface FramelessPixelRoleProps {
    title: string;
    isOutline?: boolean;
    color: string;
    glowColor: string;
    gradient?: string;
}

/**
 * FramelessPixelRole: Giant, unframed 8-bit pixel typography
 * reminiscent of personal blog marquees, styled with Tron neon glows and wireframe strokes.
 */
function FramelessPixelRole({ title, isOutline = false, color, glowColor, gradient }: FramelessPixelRoleProps) {
    return (
        <div className="flex items-center mx-6 sm:mx-12 md:mx-16 shrink-0 select-none">
            <span
                className={cn(
                    "font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-normal leading-none whitespace-nowrap transition-all duration-300",
                    isOutline
                        ? "text-transparent"
                        : gradient
                        ? "text-transparent bg-clip-text"
                        : ""
                )}
                style={{
                    ...(isOutline
                        ? {
                              WebkitTextStroke: `2px ${color}`,
                              filter: `drop-shadow(0 0 25px ${glowColor})`,
                              textShadow: `4px 4px 0px #020617`
                          }
                        : gradient
                        ? {
                              backgroundImage: gradient,
                              filter: `drop-shadow(0 0 35px ${glowColor})`
                          }
                        : {
                              color: color,
                              textShadow: `4px 4px 0px #020617, 0 0 30px ${glowColor}`
                          })
                }}
            >
                {title}
            </span>
        </div>
    );
}

export const IdentitySequence = ({ scrollYProgress }: IdentitySequenceProps) => {
    const { language } = usePortfolio();
    const isId = language === "id";
    const [isHovered, setIsHovered] = React.useState(false);
    const [isTextAnimated, setIsTextAnimated] = React.useState(false);

    const localProgress = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);

    const cardScale = useTransform(localProgress, [0, 0.4], [0.8, 1], { ease: easeInOut });
    const cardY = useTransform(localProgress, [0, 0.4], ["60vh", "0vh"], { ease: easeInOut });
    const cardBorderRadius = useTransform(localProgress, [0.1, 0.4], ["60px", "0px"], { ease: easeInOut });

    const contentY = useTransform(localProgress, [0.35, 1], ["0%", "-70%"], { ease: easeInOut });
    const imageParallaxY = useTransform(localProgress, [0.35, 1], ["-5%", "5%"], { ease: easeInOut });

    const phase0Opacity = useTransform(localProgress, [0, 0.15], [1, 0]);
    const cardContentOpacity = useTransform(localProgress, [0.1, 0.3], [0, 1]);
    const photoScale = useTransform(localProgress, [0.3, 0.8], [1.15, 1], { ease: easeInOut });
    const textOpacity = useTransform(localProgress, [0.85, 1], [0, 1]);

    useMotionValueEvent(localProgress, "change", (latest) => {
        if (latest > 0.85 && !isTextAnimated) {
            setIsTextAnimated(true);
        }
    });

    const cardBgDark = useTransform(
        localProgress,
        [0.8, 1],
        ["#091329", "#02040a"]
    );

    // Giant Frameless Pixel Typography for the 6 requested roles with Tron Cyberpunk styling
    const marqueeItems = [
        <FramelessPixelRole
            key="role-1"
            title="AI & MACHINE LEARNING ENGINEER"
            gradient="linear-gradient(to right, #00f0ff, #ffffff, #00ff66)"
            color="#00f0ff"
            glowColor="rgba(0,240,255,0.6)"
        />,
        <PixelArtGem key="gem-1" color="#00f0ff" />,
        <FramelessPixelRole
            key="role-2"
            title={isId ? "PENELITI AI" : "AI RESEARCHER"}
            isOutline={true}
            color="#00ff66"
            glowColor="rgba(0,255,102,0.6)"
        />,
        <PixelArtGem key="gem-2" color="#00ff66" />,
        <FramelessPixelRole
            key="role-3"
            title="DATA ENGINEER"
            gradient="linear-gradient(to right, #ffaa00, #fef08a, #ff6b00)"
            color="#ffaa00"
            glowColor="rgba(255,170,0,0.6)"
        />,
        <PixelArtGem key="gem-3" color="#ffaa00" />,
        <FramelessPixelRole
            key="role-4"
            title="MLOPS ENGINEER"
            isOutline={true}
            color="#c084fc"
            glowColor="rgba(192,132,252,0.6)"
        />,
        <PixelArtGem key="gem-4" color="#c084fc" />,
        <FramelessPixelRole
            key="role-5"
            title={isId ? "KOMPUTASI TERDISTRIBUSI" : "DISTRIBUTED COMPUTE"}
            gradient="linear-gradient(to right, #38bdf8, #a5f3fc, #00f0ff)"
            color="#38bdf8"
            glowColor="rgba(56,189,248,0.6)"
        />,
        <PixelArtGem key="gem-5" color="#38bdf8" />,
        <FramelessPixelRole
            key="role-6"
            title="SOFTWARE ENGINEER"
            isOutline={true}
            color="#f8fafc"
            glowColor="rgba(255,255,255,0.5)"
        />,
        <PixelArtGem key="gem-6" color="#00f0ff" />
    ];

    return (
        <div className="relative w-screen h-full flex flex-col items-center justify-center overflow-hidden bg-[#040814] cyber-scanlines">
            {/* Phase 0: The Lead-in UI */}
            <motion.div
                style={{ opacity: phase0Opacity }}
                className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none -translate-y-12"
            >
                <div className="mb-16 pointer-events-auto">
                    <MagneticEffect>
                        <div 
                            onClick={() => {
                                const el = document.getElementById("argent-slider");
                                el?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="group flex items-center gap-2 cursor-pointer"
                        >
                            <div className="relative px-10 py-5 rounded-full bg-[#050c1b] border-2 border-[#00f0ff]/40 group-hover:border-[#00f0ff] group-hover:bg-[#00f0ff] overflow-hidden transition-all duration-500 shadow-[0_0_25px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]">
                                <div className="relative z-10 h-7 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <span className="text-white group-hover:text-black font-heading font-bold text-lg leading-7 transition-colors duration-500 uppercase tracking-wider">
                                            {isId ? "Tentang Saya" : "About Me"}
                                        </span>
                                        <span className="text-black font-heading font-bold text-lg leading-7 transition-colors duration-500 uppercase tracking-wider">
                                            {isId ? "Tentang Saya" : "About Me"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-16 h-16 rounded-full bg-[#050c1b] border-2 border-[#00f0ff]/40 group-hover:border-[#00f0ff] group-hover:bg-[#00f0ff] overflow-hidden flex items-center justify-center transition-all duration-500 shadow-[0_0_25px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]">
                                <div className="relative z-10 h-8 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <ArrowUpRight className="w-8 h-8 text-[#00f0ff] group-hover:text-black transition-colors duration-500" />
                                        <ArrowUpRight className="w-8 h-8 text-black transition-colors duration-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MagneticEffect>
                </div>

                <div className="w-full max-w-[1200px] flex items-center justify-between px-12 font-heading">
                    <div className="flex items-center gap-3 text-[#00f0ff] text-xs font-mono font-medium tracking-wider uppercase">
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-4 h-4 flex items-center justify-center"
                        >
                            ↓
                        </motion.span>
                        <span>{isId ? "Gulir untuk Menjelajah" : "Scroll to Explore"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider uppercase text-zinc-400">
                        <span className="w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_6px_#00ff66] animate-pulse" />
                        <span className="font-pixel text-[8px] sm:text-[9px] text-[#00f0ff] tracking-widest uppercase">
                            {isId ? "[ PROFIL ARSITEKTURAL • IDENTITAS UTAMA ]" : "[ ARCHITECTURAL PROFILE • CORE IDENTITY ]"}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* The Main Card Container */}
            <motion.div
                style={{
                    scale: cardScale,
                    y: cardY,
                    borderRadius: cardBorderRadius,
                    backgroundColor: cardBgDark,
                    willChange: "transform, background-color",
                }}
                className="relative w-full h-full flex flex-col overflow-hidden origin-bottom z-10 border-t border-x border-[#00f0ff]/30 shadow-[0_-20px_50px_rgba(0,240,255,0.1)]"
            >
                {/* Scrolling Content Wrapper */}
                <motion.div
                    style={{ y: contentY }}
                    className="relative w-full flex flex-col items-center"
                >
                    {/* Phase 1: Giant Frameless Pixels + Tron Marquee Header */}
                    <div className="w-full h-screen flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                        {/* Ambient Neon Void Glow behind Marquee */}
                        <div className="absolute w-[800px] h-[350px] bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <motion.div style={{ opacity: cardContentOpacity }} className="w-full relative z-10">
                            <InfiniteMarquee
                                items={marqueeItems}
                                speed={30}
                                className="w-full py-10"
                                itemClassName="py-4"
                            />
                        </motion.div>
                    </div>

                    {/* Phase 2: The Large Portrait with Cyberpunk HUD Frame */}
                    <div className="relative w-full h-[100vh] flex flex-col items-center flex-shrink-0 px-4 md:px-10 lg:px-20">
                        <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="relative w-full h-full max-w-[1500px] group/photo cursor-pointer"
                        >
                            <div className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-[#00f0ff]/30 group-hover/photo:border-[#00f0ff]/80 transition-all duration-500 shadow-[0_0_40px_rgba(0,240,255,0.15)] group-hover/photo:shadow-[0_0_60px_rgba(0,240,255,0.3)]">
                                {/* 4 Neon Pixel Corner Tabs */}
                                <div className="absolute top-0 left-0 w-3.5 h-3.5 bg-[#00f0ff] z-20 shadow-[0_0_10px_#00f0ff]" />
                                <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#00f0ff] z-20 shadow-[0_0_10px_#00f0ff]" />
                                <div className="absolute bottom-0 left-0 w-3.5 h-3.5 bg-[#00f0ff] z-20 shadow-[0_0_10px_#00f0ff]" />
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00f0ff] z-20 shadow-[0_0_10px_#00f0ff]" />

                                {/* Floating Corner HUD Telemetry */}
                                <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#050c1b]/90 border border-[#00f0ff]/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping" />
                                    <span className="font-pixel text-[8px] text-[#00f0ff] uppercase tracking-widest">
                                        SUBJECT: RAIHAN GHIFARI WINATA
                                    </span>
                                </div>

                                <motion.div
                                    style={{ scale: photoScale }}
                                    animate={{
                                        filter: isHovered ? "contrast(1.08) brightness(1.05)" : "contrast(1)",
                                    }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="relative w-full h-full"
                                >
                                    <div className="absolute inset-0">
                                        <div className="absolute w-[calc(100%+40px)] h-[115%] -top-[7.5%] -left-[20px]">
                                            <motion.div 
                                                className="relative h-full w-full" 
                                                style={{ y: imageParallaxY }}
                                            >
                                                <Image
                                                    src={portfolioData.personal.avatar}
                                                    alt="Raihan Ghifari Winata"
                                                    fill
                                                    className="object-cover object-center"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                                                    priority
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Phase 3: Final Layout Text with Pixel Badge */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="w-full max-w-[1700px] mx-auto px-8 md:px-16 lg:px-24 pt-24 pb-8 md:pt-32 md:pb-12 flex-shrink-0"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
                            <span className="font-pixel text-[8px] sm:text-[9px] text-[#00f0ff] tracking-widest uppercase">
                                {isId ? "[ DIREKTIF ARSITEKTURAL UTAMA ]" : "[ CORE ARCHITECTURAL DIRECTIVE ]"}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
                            <div className="md:col-span-7">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-black tracking-tight leading-snug text-white uppercase">
                                    {isId ? (
                                        <>
                                            Spesialisasi dalam <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-teal-300 to-[#00ff66] font-heading font-black">deep RL kritis keselamatan</span>, komputasi terdistribusi, dan <span className="text-white font-black">sistem data kinerja tinggi</span>.
                                        </>
                                    ) : (
                                        <>
                                            Specializing in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-teal-300 to-[#00ff66] font-heading font-black">safety-critical deep RL</span>, distributed compute, and <span className="text-white font-black">high-throughput data systems</span>.
                                        </>
                                    )}
                                </h3>
                            </div>

                            <div className="md:col-span-5 pt-1">
                                <p className="font-mono text-sm md:text-base text-zinc-400 leading-relaxed font-normal">
                                    <BlurInUpText 
                                        text={
                                            isId
                                                ? "Berspesialisasi dalam offline reinforcement learning, ensemble kebijakan continuous-action, dan inferensi terdistribusi terakselerasi GPU. Saya merancang pipeline data berkecepatan tinggi dan microservice latensi rendah yang menghubungkan formulasi matematika dengan skala produksi."
                                                : "Specializing in offline reinforcement learning, continuous-action policy ensembles, and GPU-accelerated distributed inference. I architect high-throughput data pipelines and low-latency microservices that bridge rigorous mathematical formulation with production scale."
                                        } 
                                        animate={isTextAnimated} 
                                    />
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Phase 4: Tech Stack Scrollers */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="w-full max-w-[1700px] mx-auto py-20 flex flex-col gap-8 flex-shrink-0"
                    >
                        <div className="px-8 md:px-16 lg:px-24 mb-6">
                            <h4 className="font-pixel text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#00f0ff] flex items-center gap-2">
                                <span className="inline-block w-2.5 h-2.5 bg-[#00f0ff] shadow-[0_0_8px_#00ff66]" />
                                <span>{isId ? "[ STACK TEKNOLOGI & EKOSISTEM TERDISTRIBUSI ]" : "[ TECH STACK & DISTRIBUTED ECOSYSTEM ]"}</span>
                            </h4>
                        </div>
                        <BrandScroller />
                        <BrandScrollerReverse />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};
