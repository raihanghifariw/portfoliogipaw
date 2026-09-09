"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

import Testimonial1 from "@/components/ui/testimonial-1";
import { IdentitySequence } from "./IdentitySequence";
import ScrollAdventure from "@/components/ui/animated-scroll";
import Bucket from "@/components/ui/bucket";
import { ArgentLoopInfiniteSlider } from "@/components/ui/argent-loop-infinite-slider";
import { HorizontalTimeline, TimelineEntry } from "@/components/ui/horizontal-timeline";
import { CertificateShowcase } from "@/components/ui/certificate-marquee";
import { GitHubShowcase } from "@/components/ui/github-showcase";
import KaggleShowcase from "@/components/ui/kaggle-showcase";
import { WakaTimeShowcase } from "@/components/ui/wakatime-showcase";
import { ShowcaseStack } from "@/components/ui/showcase-stack";
import { usePortfolio } from "@/context/PortfolioContext";

interface JourneyMember {
    id: string;
    node: string;
    role: string;
    organization: string;
    period: string;
    statusBadge: string;
    description: string;
    skills: string[];
    image: string;
    link: string;
    isEnd?: boolean;
}

const showcaseMembersEn: JourneyMember[] = [
    {
        id: "exp-1",
        node: "01",
        role: "Artificial Intelligence Researcher",
        organization: "Lab AI Universitas Yarsi",
        period: "08/2025 - 01/2026",
        statusBadge: "DEEP RL RESEARCH",
        description: "Engineered Sepsis-3 clinical pipeline filtering 94,458 ICU stays down to 35,608 episodes. Designed denoising Autoencoder (37→24 latent dim). Developed 5-agent Soft Actor-Critic (SAC) ensemble with dynamic Lagrangian safety constraints, reaching 75.31% survival vs 73.55% clinician baseline (ESS 1374).",
        skills: ["Deep RL", "Soft Actor-Critic", "PyTorch", "Autoencoder", "Lagrangian Safety", "MIMIC-III"],
        image: "/gallery/ai-researcher-lab.webp",
        link: "https://github.com/raihanghifariw"
    },
    {
        id: "exp-2",
        node: "02",
        role: "Artificial Intelligence Intern",
        organization: "Lab E-Health Universitas Yarsi",
        period: "02/2025 - 07/2025",
        statusBadge: "CLINICAL AI INTERNSHIP",
        description: "Architected temporal feature extraction on MIMIC-III (20,913 clean trajectories across 37 variables in 4-hr timesteps). Built Ensemble Weighted Dueling Double DQN (EWD3QN) evaluating 25 discrete actions, achieving 92.4% survival rate vs 83.26% baseline and 10× epoch speedup via GPU parallel processing.",
        skills: ["MIMIC-III", "EWD3QN", "Deep Q-Learning", "GPU Parallelism", "Temporal Modeling"],
        image: "/gallery/ai-engineer-intern-1.webp",
        link: "https://yarsi.ac.id"
    },
    {
        id: "exp-3",
        node: "03",
        role: "Assistant Lecturer / Lab Instructor",
        organization: "Universitas Yarsi, Faculty of Information Technology",
        period: "09/2023 - 04/2026",
        statusBadge: "ACADEMIC MENTORSHIP",
        description: "Mentored 100+ CS students across 5 core courses: Specialization AI Track, Artificial Intelligence, Data Structures, OOP, and Algorithm Fundamentals. Led 14 weekly lab sessions per semester in Python/Java, driving a +70% increase in average student project scores.",
        skills: ["AI Mentorship", "Deep Learning Labs", "Data Structures", "Algorithms", "Python / Java"],
        image: "/gallery/assistant-lecturer-mentoring.webp",
        link: "https://yarsi.ac.id"
    },
    {
        id: "exp-4",
        node: "04",
        role: "Head of Infrastructure & Core Engineering",
        organization: "PRAGMA 39 Hackathon",
        period: "10/2024 - 11/2024",
        statusBadge: "TEAMWORK AWARD WINNER",
        description: "Winner Teamwork Award at a 15-university Asia-Pacific hackathon. Co-architected Decision Transformer sequence modeling pipeline predicting continuous ICU drug dosages conditioned on historical patient trajectories and target returns with offline evaluation.",
        skills: ["Decision Transformers", "Sequence Modeling", "Healthcare AI", "Offline Evaluation (OPE)"],
        image: "/gallery/pragma-hackathon-award-4.webp",
        link: "https://pragma-grid.org"
    },
    {
        id: "exp-5",
        node: "05",
        role: "Head of Communication Department",
        organization: "Faculty of IT Student Senate (SEMA FTI)",
        period: "08/2023 - 12/2024",
        statusBadge: "STUDENT SENATE LEADERSHIP",
        description: "Led creative team of 10 members managing digital publications, media archives, and marketing collateral for major campus IT events and academic symposiums serving over 60+ attendees.",
        skills: ["Student Senate", "Media Strategy", "Team Leadership", "Public Relations"],
        image: "/gallery/sema-fti-student-senate-1.webp",
        link: "https://yarsi.ac.id"
    },
    {
        id: "view-more",
        node: "06",
        role: "Explore All Professional Experiences",
        organization: "Full Career Trajectory & Accolades Archive",
        period: "2022 - 2026",
        statusBadge: "SYSTEM DIRECTORY",
        description: "Inspect comprehensive engineering case studies, academic background, undergraduate thesis research, and verified credentials in the dedicated career directory.",
        skills: ["Career Archive", "Thesis Details", "Leadership", "Full Credentials"],
        image: "/gallery/campus-faculty-moment.webp",
        link: "/experience",
        isEnd: true
    }
];

const showcaseMembersId: JourneyMember[] = [
    {
        id: "exp-1",
        node: "01",
        role: "Peneliti Artificial Intelligence",
        organization: "Lab AI Universitas Yarsi",
        period: "08/2025 - 01/2026",
        statusBadge: "RISET DEEP RL",
        description: "Merekayasa pipeline klinis Sepsis-3 menyaring 94.458 rawat inap ICU menjadi 35.608 episode. Merancang denoising Autoencoder (37→24 dimensi laten). Mengembangkan ensemble 5 agen Soft Actor-Critic (SAC) dengan batasan keselamatan Lagrangian dinamis, mencapai survival rate 75.31% vs 73.55% baseline dokter (ESS 1374).",
        skills: ["Deep RL", "Soft Actor-Critic", "PyTorch", "Autoencoder", "Lagrangian Safety", "MIMIC-III"],
        image: "/gallery/ai-researcher-lab.webp",
        link: "https://github.com/raihanghifariw"
    },
    {
        id: "exp-2",
        node: "02",
        role: "Intern Artificial Intelligence",
        organization: "Lab E-Health Universitas Yarsi",
        period: "02/2025 - 07/2025",
        statusBadge: "MAGANG AI KLINIS",
        description: "Merancang ekstraksi fitur temporal pada MIMIC-III (20.913 trajektori bersih pada 37 variabel interval 4 jam). Membangun Ensemble Weighted Dueling Double DQN (EWD3QN) mengevaluasi 25 aksi diskrit, mencapai survival rate 92.4% vs 83.26% baseline dan akselerasi training 10× via GPU paralel.",
        skills: ["MIMIC-III", "EWD3QN", "Deep Q-Learning", "GPU Parallelism", "Temporal Modeling"],
        image: "/gallery/ai-engineer-intern-1.webp",
        link: "https://yarsi.ac.id"
    },
    {
        id: "exp-3",
        node: "03",
        role: "Asisten Dosen / Instruktur Lab",
        organization: "Universitas Yarsi, Fakultas Teknologi Informasi",
        period: "09/2023 - 04/2026",
        statusBadge: "BIMBINGAN AKADEMIK",
        description: "Membimbing 100+ mahasiswa TI di 5 mata kuliah inti: Peminatan AI, Kecerdasan Buatan, Struktur Data, PBO, dan Dasar Algoritma. Memimpin 14 sesi praktikum per semester dengan Python/Java, mendorong peningkatan nilai proyek rata-rata +70%.",
        skills: ["AI Mentorship", "Deep Learning Labs", "Data Structures", "Algorithms", "Python / Java"],
        image: "/gallery/assistant-lecturer-mentoring.webp",
        link: "https://yarsi.ac.id"
    },
    {
        id: "exp-4",
        node: "04",
        role: "Ketua Infrastruktur & Rekayasa Inti",
        organization: "Hackathon PRAGMA 39",
        period: "10/2024 - 11/2024",
        statusBadge: "JUARA TEAMWORK AWARD",
        description: "Juara Teamwork Award pada hackathon 15 universitas Asia-Pasifik. Merancang pipeline pemodelan sekuensial Decision Transformer memprediksi dosis obat kontinu ICU berdasarkan trajektori riwayat pasien dan target return dengan evaluasi offline.",
        skills: ["Decision Transformers", "Sequence Modeling", "Healthcare AI", "Offline Evaluation (OPE)"],
        image: "/gallery/pragma-hackathon-award-4.webp",
        link: "https://pragma-grid.org"
    },
    {
        id: "exp-5",
        node: "05",
        role: "Ketua Departemen Komunikasi & Informasi",
        organization: "Senat Mahasiswa FTI (SEMA FTI)",
        period: "08/2023 - 12/2024",
        statusBadge: "KEPEMIMPINAN MAHASISWA",
        description: "Memimpin tim kreatif beranggotakan 10 orang mengelola publikasi digital, arsip media, dan materi pemasaran acara teknologi kampus serta simposium akademik untuk 60+ peserta.",
        skills: ["Student Senate", "Media Strategy", "Team Leadership", "Public Relations"],
        image: "/gallery/sema-fti-student-senate-1.webp",
        link: "https://yarsi.ac.id"
    },
    {
        id: "view-more",
        node: "06",
        role: "Jelajahi Seluruh Pengalaman Profesional",
        organization: "Arsip Lengkap Trajektori Karir & Prestasi",
        period: "2022 - 2026",
        statusBadge: "DIREKTORI SISTEM",
        description: "Pelajari studi kasus rekayasa menyeluruh, latar belakang akademik, riset skripsi, dan kredensial terverifikasi di direktori karir.",
        skills: ["Career Archive", "Thesis Details", "Leadership", "Full Credentials"],
        image: "/gallery/campus-faculty-moment.webp",
        link: "/experience",
        isEnd: true
    }
];

const AboutLeadIn = () => {
    const { language } = usePortfolio();
    const isId = language === "id";

    return (
        <div className="w-full max-w-[1650px] mx-auto px-6 py-6 flex justify-center items-center">
            <motion.div
                initial="hidden"
                whileInView="show"
                whileHover="hover"
                viewport={{ once: false, amount: 0.2 }}
                variants={{
                    hidden: { opacity: 0, y: 80, scale: 0.96 },
                    show: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
                    }
                }}
                className="relative w-full bg-zinc-950/90 border border-cyan-500/30 p-6 md:p-12 lg:p-16 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.08)] backdrop-blur-2xl transition-all duration-500 group"
            >
                {/* 1. Tron Grid Texture */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_#00f0ff10_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

                {/* 2. Tron Cyan Pixel Corner Tabs */}
                <div className="absolute top-0 left-0 w-3 h-3 bg-cyan-400 -translate-x-1.5 translate-y-[-50%] z-10 shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 translate-x-1.5 translate-y-[-50%] z-10 shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-cyan-400 -translate-x-1.5 translate-y-[50%] z-10 shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400 translate-x-1.5 translate-y-[50%] z-10 shadow-[0_0_10px_rgba(0,240,255,0.8)]" />

                {/* 3. Glare Sweep Effect */}
                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                    <motion.div
                        variants={{
                            hidden: { left: "-150%" },
                            show: { left: "-150%" },
                            hover: { left: "150%" }
                        }}
                        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-y-0 w-[150%] md:w-[75%] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-[-25deg]"
                    />
                </div>

                {/* 4. Content Layer */}
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6 md:mb-10">
                        <span className="text-cyan-400 text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.25em] bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded">
                            {isId ? "[BABAK 01 • MANIFESTO ARSITEKTURAL]" : "[ACT 01 • ARCHITECTURAL MANIFESTO]"}
                        </span>
                        <span className="text-zinc-400 text-[9px] font-mono tracking-widest uppercase hidden md:block">
                            {isId ? "AI, DATA & PENELITI SISTEM" : "AI, DATA & SOFTWARE ENGINEER & RESEARCHER"}
                        </span>
                    </div>

                    <div className="mb-8 md:mb-14 relative cursor-default">
                        <h2 className="text-[32px] sm:text-[46px] md:text-[60px] lg:text-[72px] xl:text-[80px] font-black tracking-tight leading-[0.96] text-white transition-all duration-700 group-hover:drop-shadow-[0_0_25px_rgba(0,240,255,0.25)]">
                            {isId ? "Kecerdasan Otonom." : "Autonomous Intelligence."} <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                                {isId ? "Infrastruktur Data Kinerja Tinggi." : "High-Throughput Data Infrastructure."}
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-cyan-500/20 pt-8 md:pt-12">
                        <div className="md:col-span-5">
                            <p className="text-base md:text-lg lg:text-xl font-normal text-zinc-300 leading-relaxed tracking-tight">
                                {isId ? (
                                    <>Menjembatani formulasi matematika dan sistem produksi pada <strong className="text-white font-semibold">Agen Generatif</strong>, <strong className="text-white font-semibold">Computer Vision Real-Time</strong>, dan <strong className="text-white font-semibold">Deep Reinforcement Learning</strong> kontinu.</>
                                ) : (
                                    <>Bridging mathematical formulation and production systems across <strong className="text-white font-semibold">Generative Agents</strong>, <strong className="text-white font-semibold">Real-Time Computer Vision</strong>, and continuous <strong className="text-white font-semibold">Deep Reinforcement Learning</strong>.</>
                                )}
                            </p>
                        </div>

                        <div className="md:col-span-7 flex flex-col sm:flex-row gap-8 text-[13px]">
                            <div className="flex-1 space-y-3">
                                <span className="text-cyan-300 font-mono font-bold uppercase tracking-widest block border-b border-cyan-500/20 pb-3">
                                    {isId ? "Sistem & Paradigma" : "Systems & Paradigms"}
                                </span>
                                <p className="text-zinc-400 leading-relaxed font-sans">
                                    {isId ? "Graf penalaran multi-agen, triase edge VLM sub-50ms, dan ensemble kebijakan SAC/TD3 kontinu dengan batasan keselamatan Lagrangian adaptif." : "Multi-agent reasoning graphs, sub-50ms edge VLM triage, and continuous SAC/TD3 policy ensembles with adaptive Lagrangian safety bounds."}
                                </p>
                                <p className="text-cyan-400/90 font-mono text-xs tracking-wider">
                                    {isId ? "Direkayasa untuk skala deterministik." : "Engineered for deterministic scale."}
                                </p>
                            </div>
                            <div className="flex-1 space-y-3 flex flex-col">
                                <span className="text-cyan-300 font-mono font-bold uppercase tracking-widest block border-b border-cyan-500/20 pb-3">
                                    {isId ? "Pipeline Terdistribusi" : "Distributed Pipeline"}
                                </span>
                                <p className="text-zinc-400 leading-relaxed font-sans">
                                    {isId ? "Worker pelatihan terparalelisasi CUDA, microservice Docker kontainer, pencarian vektor hibrida Qdrant, dan arsitektur FastAPI latensi mikro." : "CUDA-parallelized training workers, containerized Docker microservices, Qdrant hybrid vector search, and micro-latency FastAPI architectures."}
                                </p>
                                <div className="mt-6 md:mt-auto pt-4">
                                    <span className="text-2xl lg:text-3xl font-serif italic text-white/90">
                                        Raihan Ghifari Winata
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const CoreEngineeringPanel = ({ scrollYProgress }: { scrollYProgress: any }) => {
    // Panel 1 stays fully visible during horizontal slide (0.1 to 0.4), then exits gracefully
    const opacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.45, 0.6], [1, 0.9]);
    const blur = useTransform(scrollYProgress, [0.45, 0.6], [0, 10]);

    return (
        <div className="w-screen h-full flex items-center justify-center bg-background dark:bg-black transition-colors duration-500 overflow-hidden">
            <motion.div
                style={{
                    opacity,
                    scale,
                    filter: `blur(${blur}px)`,
                    willChange: "transform, opacity, filter",
                }}
                className="w-full h-full flex items-center justify-center"
            >
                <Testimonial1 />
            </motion.div>
        </div>
    );
};

const ScrollHijackSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });
    const [isComp2Visible, setIsComp2Visible] = React.useState(false);
    const [showBorder, setShowBorder] = React.useState(true);

    const borderOpacity = useTransform(smoothProgress, [0.1, 0.15], [1, 0]);
    const xShift = useTransform(smoothProgress, [0, 0.1, 0.4, 1], ["0vw", "0vw", "-100vw", "-100vw"]);

    useMotionValueEvent(smoothProgress, "change", (v: any) => {
        if (v >= 0.20 && showBorder) setShowBorder(false);
        if (v < 0.15 && !showBorder) setShowBorder(true);
        if (v >= 0.30 && !isComp2Visible) setIsComp2Visible(true);
        if (v < 0.25 && isComp2Visible) setIsComp2Visible(false);
    });

    const { scrollYProgress: exitProgressRaw } = useScroll({
        target: sectionRef,
        offset: ["end end", "end start"]
    });
    const exitProgress = useSpring(exitProgressRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const exitScale = useTransform(exitProgress, [0, 1], [1, 0.85]);
    const exitOpacity = useTransform(exitProgress, [0, 1], [1, 0]);
    const exitBorderRadius = useTransform(exitProgress, [0, 1], ["0px", "40px"]);

    return (
        <div ref={sectionRef} className="relative h-[600vh] bg-background dark:bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden z-10 bg-background dark:bg-black">
                <motion.div
                    style={{ scale: exitScale, opacity: exitOpacity, borderRadius: exitBorderRadius }}
                    className="w-full h-full relative origin-center"
                >
                    <AnimatePresence>
                        {showBorder && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                style={{
                                    opacity: borderOpacity,
                                    maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)"
                                }}
                                className="absolute top-0 left-0 right-0 h-48 border-t-2 border-x-2 border-neutral-200 dark:border-zinc-800 rounded-t-[50px] md:rounded-t-[80px] pointer-events-none z-[100]"
                            />
                        )}
                    </AnimatePresence>
                    <motion.div
                        className="flex h-full"
                        style={{
                            width: "200vw",
                            x: xShift
                        }}
                    >
                        <div className="h-full w-screen flex-shrink-0">
                            <CoreEngineeringPanel scrollYProgress={smoothProgress} />
                        </div>
                        <div className="h-full w-screen flex-shrink-0">
                            <IdentitySequence isVisible={isComp2Visible} scrollYProgress={smoothProgress} />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

const AuditFunnel = () => {
    const isMobile = useIsMobile();
    const { language } = usePortfolio();
    const isId = language === "id";
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

    const { scrollYProgress: exitProgressRaw } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });
    const exitProgress = useSpring(exitProgressRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const yExit = useTransform(exitProgress, [0, 1], ["0%", "40%"]);
    const scaleExit = useTransform(exitProgress, [0, 1], [1, 0.85]);
    const opacityExit = useTransform(exitProgress, [0, 1], [1, 0]);

    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const galleryItems = [
            "/tech-icons/pytorch.svg",
            "/tech-icons/python.svg",
            "/tech-icons/typescript.svg",
            "/tech-icons/nextjs.svg",
            "/tech-icons/fastapi.svg",
            "/tech-icons/docker.svg",
            "/tech-icons/cuda.svg",
            "/tech-icons/postgresql.svg"
        ];
        const shuffled = [...galleryItems].sort(() => 0.5 - Math.random());
        setImages(shuffled.slice(0, 8));
    }, []);

    return (
        <div ref={sectionRef} className="relative overflow-visible group min-h-[80vh] md:min-h-[120vh] flex items-center justify-center bg-[#02040a] z-10 pb-10 md:pb-32 border-t border-cyan-500/20">
            {/* Tron Ambient Grid & Laser Halo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,_#00f0ff0f_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

            <div className="flex flex-col items-center text-center py-20 md:py-36 space-y-8 md:space-y-12 pointer-events-none w-full origin-top relative z-10">
                <motion.div
                    style={{ y: yExit, scale: scaleExit, opacity: opacityExit }}
                    className="space-y-4 md:space-y-6 flex flex-col items-center px-6 relative z-10 w-full"
                >
                    {/* Eyebrow Directive */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-950/70 border border-cyan-500/40 rounded-md text-cyan-400 font-pixel text-[9px] sm:text-[10px] tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(0,240,255,0.25)]">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        <span>{isId ? "KHAZANAH KONVERGENSI INTI" : "CORE CONVERGENCE VAULT"}</span>
                    </div>

                    {/* Headline */}
                    <motion.h4
                        style={{ scale, willChange: "transform" }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-heading font-black tracking-tight text-white max-w-7xl leading-[0.92] lg:px-6 uppercase text-center drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
                    >
                        {isId ? "KONVERGENSI" : "CONVERGING"} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 drop-shadow-[0_0_35px_rgba(0,240,255,0.35)]">
                            {isId ? "ALGORITMA & SISTEM" : "ALGORITHMS & SYSTEMS"}
                        </span>
                    </motion.h4>

                    {/* Subtitle */}
                    <p className="font-body text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mt-2">
                        {isId
                            ? "Titik temu jaminan kontrol matematis dengan eksekusi neural terdistribusi real-time."
                            : "Where mathematical control guarantees converge with real-time distributed neural execution."}
                    </p>
                </motion.div>

                <motion.div
                    style={{ y: yExit, scale: scaleExit, opacity: opacityExit }}
                    className="flex flex-col items-center gap-8 pt-8 md:pt-14 pointer-events-auto w-full px-6"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="w-full max-w-4xl mx-auto"
                    >
                        <Bucket trailImages={!isMobile ? images : undefined} />
                    </motion.div>
                </motion.div>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('/noise.svg')]" />
            </div>
        </div>
    );
};

export default function AboutSection() {
    const { language } = usePortfolio();
    const isId = language === "id";
    const showcaseMembers = isId ? showcaseMembersId : showcaseMembersEn;
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0.03, 0.12], [1, 0]);
    const yLeadIn = useTransform(scrollYProgress, [0, 0.12], [0, -80]);

    const leadInTriggerRef = useRef(null);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative bg-background text-foreground dark:bg-black dark:text-white transition-colors duration-500"
        >
            {/* 1. STICKY PLANE - Lead-in */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center z-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ scale, opacity, y: yLeadIn }}
                    className="relative px-4 md:px-6 w-full max-w-[1700px] mx-auto pointer-events-auto"
                    ref={leadInTriggerRef}
                >
                    <AboutLeadIn />
                </motion.div>
            </div>

            {/* 2. OVERLAY LAYER - Hijack Zone & Footer */}
            <div className="relative pointer-events-none mt-[20vh] md:mt-[20vh]">
                <div className="bg-background dark:bg-black transition-colors duration-500 pointer-events-auto relative">
                    <ScrollHijackSection />
                    <ScrollAdventure />
                    
                    <div id="argent-slider">
                        <ArgentLoopInfiniteSlider />
                    </div>

                {/* Seamless solid background section overlapping the slider's dead space */}
                <div className="-mt-[50vh] flex flex-col items-center w-full bg-[#05070f] relative z-20">
                    <div className="w-full">
                        <HorizontalTimeline
                            data={showcaseMembers.map((member) => ({
                                title: member.id === 'view-more' ? (isId ? 'Jelajahi Seluruh Pengalaman' : 'Explore All Experiences') : member.role,
                                node: member.node,
                                period: member.period,
                                isEnd: member.isEnd,
                                content: member.isEnd ? (
                                    <Link
                                        href={member.link || '/experience'}
                                        className="relative flex items-center h-[120px] w-[260px] z-30 group/link"
                                    >
                                        <div className="relative w-full flex items-center gap-3.5 px-5 py-4 bg-[#070b16]/95 border border-cyan-500/50 rounded-xl backdrop-blur-xl shadow-[0_0_25px_rgba(0,240,255,0.25)] group-hover/link:border-cyan-300 group-hover/link:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-500 overflow-hidden">
                                            {/* Corner tabs */}
                                            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-cyan-400" />
                                            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-cyan-400" />
                                            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-cyan-400" />
                                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-cyan-400" />

                                            <div className="w-10 h-10 rounded-full bg-cyan-950/90 border border-cyan-400/60 shadow-[0_0_12px_rgba(0,240,255,0.4)] flex items-center justify-center shrink-0 transition-all duration-500 group-hover/link:scale-110 group-hover/link:bg-cyan-400 group-hover/link:text-black">
                                                <ArrowUpRight className="w-5 h-5 text-cyan-300 group-hover/link:text-black group-hover/link:rotate-45 transition-all duration-500" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">{isId ? "[DIREKTORI]" : "[DIRECTORY]"}</span>
                                                <span className="text-sm font-bold font-heading text-white group-hover/link:text-cyan-300 transition-colors truncate">
                                                    {isId ? "Jelajahi Semua" : "Explore All"}
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-sans truncate">
                                                    {isId ? "Arsip 6+ Posisi" : "6+ Roles Archive"}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="w-[450px] md:w-[500px] h-[210px] md:h-[220px] bg-[#070b16]/95 border border-cyan-500/40 backdrop-blur-2xl rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(0,240,255,0.15)] flex overflow-hidden group/card transition-all duration-500 hover:border-cyan-400 relative">
                                        {/* Tron Cyan Pixel Corner Tabs */}
                                        <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 -translate-x-0.5 -translate-y-0.5 z-20" />
                                        <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 translate-x-0.5 -translate-y-0.5 z-20" />
                                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-400 -translate-x-0.5 translate-y-0.5 z-20" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-400 translate-x-0.5 translate-y-0.5 z-20" />

                                        {/* Background Grid Pattern */}
                                        <div className="absolute inset-0 bg-[radial-gradient(circle,_#00f0ff0d_1px,_transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40 z-0" />

                                        {/* Left Side: Authentic Gallery Photo with Hover Verify Overlay */}
                                        <div className="relative w-[150px] md:w-[175px] h-full shrink-0 border-r border-cyan-500/30 overflow-hidden group/img z-10">
                                            <img
                                                src={member.image}
                                                alt={member.role}
                                                className="w-full h-full object-cover opacity-85 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500"
                                            />
                                            {member.link && (
                                                <div className="absolute inset-0 bg-[#05070f]/85 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 backdrop-blur-xs">
                                                    <Link
                                                        href={member.link}
                                                        target="_blank"
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-400 text-black text-[10px] font-bold font-mono uppercase tracking-wider rounded shadow-[0_0_12px_rgba(0,240,255,0.6)] hover:scale-105 transition-transform"
                                                    >
                                                        <span>{isId ? "Verifikasi" : "Verify"}</span>
                                                        <ArrowUpRight className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Side: Dossier Details */}
                                        <div className="relative z-10 flex-1 p-3.5 md:p-4 flex flex-col justify-between overflow-hidden">
                                            {/* Top Row: Status Badge + Node */}
                                            <div className="flex items-center justify-between gap-1.5">
                                                <span className="text-[8.5px] md:text-[9px] font-mono font-bold tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded truncate max-w-[75%] shadow-[0_0_8px_rgba(0,240,255,0.15)]">
                                                    [{member.statusBadge}]
                                                </span>
                                                <span className="text-[9px] font-mono text-slate-400 shrink-0">
                                                    NODE {member.node}
                                                </span>
                                            </div>

                                            {/* Title & Role */}
                                            <div className="mt-1">
                                                <h4 className="text-xs md:text-sm font-bold font-heading text-white leading-tight truncate drop-shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                                                    {member.organization}
                                                </h4>
                                                <p className="text-[11px] md:text-xs font-mono text-cyan-300 truncate mt-0.5">
                                                    {member.role}
                                                </p>
                                            </div>

                                            {/* Description (max 3 compact lines) */}
                                            <p className="text-[10px] md:text-[11px] text-slate-300 leading-snug line-clamp-3 mt-1">
                                                {member.description}
                                            </p>

                                            {/* Tech Stack Chips */}
                                            {member.skills && member.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-auto pt-1.5">
                                                    {member.skills.slice(0, 3).map((skill, sIdx) => (
                                                        <span
                                                            key={sIdx}
                                                            className="text-[8.5px] md:text-[9px] font-mono px-1.5 py-0.5 bg-[#0b1222] text-cyan-300/90 border border-cyan-800/40 rounded truncate max-w-[120px]"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            }))}
                        />
                    </div>

                    {/* Certificate Showcase Section */}
                    <div className="w-full mt-8 md:mt-12">
                        <CertificateShowcase />
                    </div>

                    {/* Stacking Card Showcases */}
                    <ShowcaseStack>
                        <div className="w-full">
                            <GitHubShowcase />
                        </div>
                        <div className="w-full">
                            <KaggleShowcase />
                        </div>
                        <div className="w-full">
                            <WakaTimeShowcase />
                        </div>
                    </ShowcaseStack>
                </div>

                <AuditFunnel />
                </div>
            </div>
        </section>
    );
}
