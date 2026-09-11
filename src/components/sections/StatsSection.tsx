"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { Book } from "@/components/ui/book";
import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogArchive3D } from "@/components/sections/BlogArchive3D";
import { usePortfolio } from "@/context/PortfolioContext";

const CATEGORY_COLORS: Record<string, string> = {
    "applied-ai": "#9D2127",
    "software-development": "#7DC1C1",
    "more": "#FED954",
};

export default function StatsSection({ showOnly }: { scrollYProgress?: any; showOnly?: "top" | "bottom" }) {
    const { language } = usePortfolio();
    const isId = language === "id";
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const blogs = portfolioData.blogs.slice(0, 6);
    const visibleCount = 3;

    useEffect(() => {
        const galleryImages = [
            { src: "/gallery/pragma-hackathon-award-4.webp", alt: "PRAGMA 39 Hackathon Teamwork Award Winner" },
            { src: "/gallery/ai-researcher-lab.webp", alt: "Sepsis-3 Continuous RL Training Workstation" },
            { src: "/gallery/raker-lab-ai-strategic-1.webp", alt: "AI Laboratory Strategic Board & Infrastructure" },
            { src: "/gallery/dana-fintech-hq-1.webp", alt: "DANA Indonesia Fintech Headquarters Immersion" },
            { src: "/gallery/pkm-re-national-research-grant.webp", alt: "PKM-RE National Clinical AI Research Grant" },
            { src: "/gallery/assistant-lecturer-mentoring.webp", alt: "Informatics Assistant Lecturer Mentoring Lab" },
            { src: "/gallery/sema-fti-student-senate-2.webp", alt: "Senat Mahasiswa FTI Executive Leadership Cabinet" },
            { src: "/gallery/profile-portrait-official.webp", alt: "Raihan Ghifari Winata Official Portrait" },
        ];
        const shuffledImages = [...galleryImages].sort(() => 0.5 - Math.random());
        setImages(shuffledImages);
        setLoading(false);
    }, []);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % blogs.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
    };

    const getVisibleBlogs = () => {
        const result = [];
        for (let i = 0; i < visibleCount; i++) {
            result.push(blogs[(currentIndex + i) % blogs.length]);
        }
        return result;
    };

    if (loading || images.length === 0) return (
        <div className="h-[400px] w-full flex items-center justify-center bg-background">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
    );

    return (
        <section className="relative z-20 bg-background dark:bg-[#02040a] text-foreground dark:text-white overflow-visible flex flex-col items-center transition-colors duration-500">
            {/* Header for the Gallery Section */}
            {(showOnly === "top" || !showOnly) && (
                <>
                    <div className="max-w-6xl mx-auto px-6 w-full pt-32 pb-16 text-center space-y-5">
                        {/* Eyebrow Directive */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 dark:bg-cyan-950/70 border border-cyan-500/40 rounded-md text-cyan-600 dark:text-cyan-400 font-pixel text-[9px] sm:text-[10px] tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                            <span>{isId ? "RISET & ARSIP" : "RESEARCH & ARCHIVE"}</span>
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight text-slate-900 dark:text-white uppercase drop-shadow-[0_0_35px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_35px_rgba(0,0,0,0.8)]"
                        >
                            JOURNAL &amp;{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 dark:from-cyan-400 via-teal-600 dark:via-emerald-400 to-cyan-500 dark:to-cyan-300 drop-shadow-[0_0_30px_rgba(0,240,255,0.35)]">
                                {isId ? "INSIGHT" : "INSIGHTS"}
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-600 dark:text-slate-300 font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                        >
                            {isId 
                                ? "Cetak biru riset pilihan, investigasi reinforcement learning klinis, dan telemetri sistem terdistribusi produksi."
                                : "Curated research blueprints, clinical reinforcement learning investigations, and production distributed system telemetry."}
                        </motion.p>
                    </div>

                    <div className="w-full">
                        <ZoomParallax images={images}>
                            <Link 
                                href="/projects" 
                                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-black/60 dark:bg-[#06152b]/80 backdrop-blur-md text-white dark:text-cyan-300 border border-white/20 dark:border-cyan-500/60 rounded-full font-mono font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-300 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.3)]"
                            >
                                <span>{isId ? "Lihat Karya Unggulan" : "View Flagship Work"}</span>
                                <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </Link>
                        </ZoomParallax>
                    </div>
                </>
            )}

            {/* Neural Archive 3D Integration (from NewYorkOver reference) */}
            {(showOnly === "bottom" || !showOnly) && (
                <div className="w-full relative z-10">
                    <BlogArchive3D />
                </div>
            )}
        </section>
    );
}
