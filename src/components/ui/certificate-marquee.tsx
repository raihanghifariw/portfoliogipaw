"use client";

import { motion, MotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, ExternalLink, Award, Sparkles, Eye } from "lucide-react";
import { CREDLY_BADGES, FOLDER_CERTIFICATES, CredlyBadge, DocumentCertificate } from "@/data/certificates";
import CredentialModal from "@/components/ui/CredentialModal";
import { usePortfolio } from "@/context/PortfolioContext";

// Combine the real credentials for rich vertical parallax columns
type ShowcaseItem = {
  type: "credly" | "doc";
  title: string;
  subtitle: string;
  issuer: string;
  image: string;
  tag: string;
  credlyBadge?: CredlyBadge;
  docCert?: DocumentCertificate;
};

const SHOWCASE_ITEMS_EN: ShowcaseItem[] = [
  // Credly Badges
  {
    type: "credly",
    title: "AWS Certified AI Practitioner",
    subtitle: "Score: 826 / 1000",
    issuer: "Amazon Web Services",
    image: CREDLY_BADGES[0].localImage,
    tag: "AWS CERTIFIED",
    credlyBadge: CREDLY_BADGES[0]
  },
  {
    type: "doc",
    title: "PRAGMA 39 Hackathon Winner",
    subtitle: "Excellence in Team Work Award",
    issuer: "Thammasat, UCSD, Osaka, YARSI",
    image: FOLDER_CERTIFICATES[0].previewImage,
    tag: "HACKATHON 1ST",
    docCert: FOLDER_CERTIFICATES[0]
  },
  {
    type: "credly",
    title: "Engineer AI Agents (ADK)",
    subtitle: "Language Model Research",
    issuer: "Google Cloud",
    image: CREDLY_BADGES[1].localImage,
    tag: "GOOGLE CLOUD",
    credlyBadge: CREDLY_BADGES[1]
  },
  {
    type: "doc",
    title: "Samsung Innovation Campus",
    subtitle: "Stage 3: AI Capstone & Models",
    issuer: "Samsung & Skilvul",
    image: FOLDER_CERTIFICATES[1].previewImage,
    tag: "AI CAPSTONE",
    docCert: FOLDER_CERTIFICATES[1]
  },
  {
    type: "credly",
    title: "Gemini Enterprise Application",
    subtitle: "Multi-Agent & Deep Research",
    issuer: "Google Cloud",
    image: CREDLY_BADGES[2].localImage,
    tag: "GOOGLE CLOUD",
    credlyBadge: CREDLY_BADGES[2]
  },
  {
    type: "doc",
    title: "Dicoding Data Science Specialization",
    subtitle: "Cert ID: 98XW8R9J0PM3",
    issuer: "Dicoding Indonesia",
    image: FOLDER_CERTIFICATES[4].previewImage,
    tag: "DATA SCIENCE",
    docCert: FOLDER_CERTIFICATES[4]
  },
  {
    type: "credly",
    title: "AWS ML Foundations Graduate",
    subtitle: "Cloud ML Pipelines & CV",
    issuer: "Amazon Web Services",
    image: CREDLY_BADGES[3].localImage,
    tag: "AWS ACADEMY",
    credlyBadge: CREDLY_BADGES[3]
  },
  {
    type: "doc",
    title: "CITI Human Research Ethics",
    subtitle: "Clinical Data & MIMIC Governance",
    issuer: "CITI Program",
    image: FOLDER_CERTIFICATES[8].previewImage,
    tag: "ETHICS & GCP",
    docCert: FOLDER_CERTIFICATES[8]
  },
  {
    type: "credly",
    title: "CCNA: Introduction to Networks",
    subtitle: "54 Hands-On Packet Tracer Labs",
    issuer: "Cisco",
    image: CREDLY_BADGES[6].localImage,
    tag: "CISCO CCNA",
    credlyBadge: CREDLY_BADGES[6]
  },
  {
    type: "doc",
    title: "Samsung Innovation Campus",
    subtitle: "Stage 2: IoT & Embedded AI",
    issuer: "Samsung & Skilvul",
    image: FOLDER_CERTIFICATES[2].previewImage,
    tag: "IOT & AI",
    docCert: FOLDER_CERTIFICATES[2]
  },
  {
    type: "credly",
    title: "Introduction to Cybersecurity",
    subtitle: "Defense, Threat Intel & Cryptography",
    issuer: "Cisco",
    image: CREDLY_BADGES[8].localImage,
    tag: "CYBERSECURITY",
    credlyBadge: CREDLY_BADGES[8]
  },
  {
    type: "credly",
    title: "IBM AI Literacy",
    subtitle: "Ethics, Bias & Neural Systems",
    issuer: "IBM SkillsBuild",
    image: CREDLY_BADGES[4].localImage,
    tag: "IBM SKILLS",
    credlyBadge: CREDLY_BADGES[4]
  },
  {
    type: "doc",
    title: "YARSI Teaching Assistant - AI",
    subtitle: "Faculty of IT • AI & ML Practicum",
    issuer: "Universitas YARSI",
    image: FOLDER_CERTIFICATES[12].previewImage,
    tag: "TEACHING ASST",
    docCert: FOLDER_CERTIFICATES[12]
  },
  {
    type: "doc",
    title: "Teaching Assistant - OOP",
    subtitle: "Inheritance, Design Patterns & Java",
    issuer: "Universitas YARSI",
    image: FOLDER_CERTIFICATES[13].previewImage,
    tag: "TEACHING ASST",
    docCert: FOLDER_CERTIFICATES[13]
  },
  {
    type: "doc",
    title: "Teaching Assistant - Programming",
    subtitle: "Algorithms & Syntax Foundations",
    issuer: "Universitas YARSI",
    image: FOLDER_CERTIFICATES[14].previewImage,
    tag: "TEACHING ASST",
    docCert: FOLDER_CERTIFICATES[14]
  }
];

const SHOWCASE_ITEMS_ID: ShowcaseItem[] = [
  {
    type: "credly",
    title: "AWS Certified AI Practitioner",
    subtitle: "Skor: 826 / 1000",
    issuer: "Amazon Web Services",
    image: CREDLY_BADGES[0].localImage,
    tag: "AWS TERSERTIFIKASI",
    credlyBadge: CREDLY_BADGES[0]
  },
  {
    type: "doc",
    title: "Juara Hackathon PRAGMA 39",
    subtitle: "Penghargaan Keunggulan Kerja Tim",
    issuer: "Thammasat, UCSD, Osaka, YARSI",
    image: FOLDER_CERTIFICATES[0].previewImage,
    tag: "JUARA 1 HACKATHON",
    docCert: FOLDER_CERTIFICATES[0]
  },
  {
    type: "credly",
    title: "Engineer AI Agents (ADK)",
    subtitle: "Riset Model Bahasa AI",
    issuer: "Google Cloud",
    image: CREDLY_BADGES[1].localImage,
    tag: "GOOGLE CLOUD",
    credlyBadge: CREDLY_BADGES[1]
  },
  {
    type: "doc",
    title: "Samsung Innovation Campus",
    subtitle: "Tahap 3: Model & Proyek Capstone AI",
    issuer: "Samsung & Skilvul",
    image: FOLDER_CERTIFICATES[1].previewImage,
    tag: "CAPSTONE AI",
    docCert: FOLDER_CERTIFICATES[1]
  },
  {
    type: "credly",
    title: "Gemini Enterprise Application",
    subtitle: "Sistem Multi-Agent & Riset Mendalam",
    issuer: "Google Cloud",
    image: CREDLY_BADGES[2].localImage,
    tag: "GOOGLE CLOUD",
    credlyBadge: CREDLY_BADGES[2]
  },
  {
    type: "doc",
    title: "Spesialisasi Data Science Dicoding",
    subtitle: "ID Sertifikat: 98XW8R9J0PM3",
    issuer: "Dicoding Indonesia",
    image: FOLDER_CERTIFICATES[4].previewImage,
    tag: "DATA SCIENCE",
    docCert: FOLDER_CERTIFICATES[4]
  },
  {
    type: "credly",
    title: "AWS ML Foundations Graduate",
    subtitle: "Pipeline Cloud ML & Computer Vision",
    issuer: "Amazon Web Services",
    image: CREDLY_BADGES[3].localImage,
    tag: "AWS ACADEMY",
    credlyBadge: CREDLY_BADGES[3]
  },
  {
    type: "doc",
    title: "Etika Riset Manusia CITI",
    subtitle: "Tata Kelola Data Klinis & MIMIC",
    issuer: "CITI Program",
    image: FOLDER_CERTIFICATES[8].previewImage,
    tag: "ETIKA & GCP",
    docCert: FOLDER_CERTIFICATES[8]
  },
  {
    type: "credly",
    title: "CCNA: Introduction to Networks",
    subtitle: "54 Lab Praktik Jaringan Packet Tracer",
    issuer: "Cisco",
    image: CREDLY_BADGES[6].localImage,
    tag: "CISCO CCNA",
    credlyBadge: CREDLY_BADGES[6]
  },
  {
    type: "doc",
    title: "Samsung Innovation Campus",
    subtitle: "Tahap 2: IoT & AI Tertanam",
    issuer: "Samsung & Skilvul",
    image: FOLDER_CERTIFICATES[2].previewImage,
    tag: "IOT & AI",
    docCert: FOLDER_CERTIFICATES[2]
  },
  {
    type: "credly",
    title: "Pengantar Keamanan Siber",
    subtitle: "Pertahanan Siber & Kriptografi",
    issuer: "Cisco",
    image: CREDLY_BADGES[8].localImage,
    tag: "KEAMANAN SIBER",
    credlyBadge: CREDLY_BADGES[8]
  },
  {
    type: "credly",
    title: "Literasi AI IBM",
    subtitle: "Etika, Bias & Sistem Jaringan Saraf",
    issuer: "IBM SkillsBuild",
    image: CREDLY_BADGES[4].localImage,
    tag: "IBM SKILLS",
    credlyBadge: CREDLY_BADGES[4]
  },
  {
    type: "doc",
    title: "Asisten Dosen AI YARSI",
    subtitle: "Fakultas TI • Praktikum AI & ML",
    issuer: "Universitas YARSI",
    image: FOLDER_CERTIFICATES[12].previewImage,
    tag: "ASISTEN DOSEN",
    docCert: FOLDER_CERTIFICATES[12]
  },
  {
    type: "doc",
    title: "Asisten Dosen PBO YARSI",
    subtitle: "Inheritance, Pola Desain & Java",
    issuer: "Universitas YARSI",
    image: FOLDER_CERTIFICATES[13].previewImage,
    tag: "ASISTEN DOSEN",
    docCert: FOLDER_CERTIFICATES[13]
  },
  {
    type: "doc",
    title: "Asisten Dosen Pemrograman",
    subtitle: "Fondasi Algoritma & Pemrograman",
    issuer: "Universitas YARSI",
    image: FOLDER_CERTIFICATES[14].previewImage,
    tag: "ASISTEN DOSEN",
    docCert: FOLDER_CERTIFICATES[14]
  }
];

function CyberScrambleButton({ href, text }: { href: string; text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#<>";

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 2;
    }, 25);
  };

  return (
    <Link
      href={href}
      onMouseEnter={scramble}
      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#00f0ff] hover:bg-[#38bdf8] text-black font-display text-[11px] font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] border-2 border-white/60 active:scale-95 overflow-hidden"
    >
      <span className="relative z-10">{displayText}</span>
      <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1.5 text-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:animate-[move-x_1.5s_infinite] pointer-events-none" />
    </Link>
  );
}

type ColumnProps = {
  items: ShowcaseItem[];
  y: MotionValue<number>;
  onItemClick: (item: ShowcaseItem) => void;
  isId?: boolean;
};

const Column = ({ items, y, onItemClick, isId }: ColumnProps) => {
  return (
    <motion.div
      className="relative flex h-full w-1/3 min-w-[280px] flex-col gap-6 will-change-transform"
      style={{ y, translateZ: 0 }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onItemClick(item);
          }}
          className="group relative w-full overflow-hidden bg-[#06080e] border border-cyan-500/30 hover:border-cyan-400 p-4 transition-all duration-300 cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] select-none"
        >
          {/* Cyber Corner Accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

          {/* Scanline pattern */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-40" />

          {/* Tag header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[8px] font-display text-cyan-400 tracking-wider uppercase px-2 py-0.5 bg-cyan-950/60 border border-cyan-500/30">
              {item.tag}
            </span>
            <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-400">
              <ShieldCheck size={10} />
              <span>{isId ? "TERVERIFIKASI" : "VERIFIED"}</span>
            </div>
          </div>

          {/* Media container */}
          <div className="relative w-full aspect-[16/10] bg-[#020408] border border-zinc-800/80 overflow-hidden flex items-center justify-center p-2">
            {item.type === "credly" ? (
              <div className="relative w-full h-full max-w-[150px] mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-md group-hover:bg-cyan-400/20 transition-all" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ) : (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 pointer-events-none">
              <span className="text-[9px] font-display text-cyan-300 text-center tracking-wider bg-[#06080e] border-2 border-cyan-400 px-3.5 py-2 shadow-[0_0_20px_rgba(0,240,255,0.7)] flex items-center gap-1.5">
                <Eye size={12} className="text-cyan-400" />
                <span>{isId ? "KLIK UNTUK INSPEKSI" : "CLICK TO INSPECT"}</span>
              </span>
            </div>
          </div>

          {/* Title and Issuer */}
          <div className="mt-3 space-y-1">
            <h4 className="text-xs sm:text-sm font-heading font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
              {item.title}
            </h4>
            <p className="text-[10px] font-mono text-zinc-400 truncate">
              {item.issuer} • {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export function CertificateShowcase() {
  const { isIndonesian } = usePortfolio();
  const isId = isIndonesian;
  const gallery = useRef<HTMLDivElement>(null);

  // Modal State
  const [selectedCredly, setSelectedCredly] = useState<CredlyBadge | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DocumentCertificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 20,
    mass: 0.2,
    restDelta: 0.001
  });

  // Smooth, subtle parallax shifts
  const y1 = useTransform(smoothProgress, [0, 1], [-60, 60]);
  const y2 = useTransform(smoothProgress, [0, 1], [60, -60]);
  const y3 = useTransform(smoothProgress, [0, 1], [-40, 40]);

  const handleItemClick = (item: ShowcaseItem) => {
    if (item.credlyBadge) {
      setSelectedCredly(item.credlyBadge);
      setSelectedDoc(null);
      setIsModalOpen(true);
    } else if (item.docCert) {
      setSelectedDoc(item.docCert);
      setSelectedCredly(null);
      setIsModalOpen(true);
    }
  };

  // Select items based on language
  const items = isId ? SHOWCASE_ITEMS_ID : SHOWCASE_ITEMS_EN;

  // Split showcase items into 3 columns (5 items each)
  const col1 = [items[0], items[1], items[2], items[3], items[4]];
  const col2 = [items[5], items[6], items[7], items[8], items[9]];
  const col3 = [items[10], items[11], items[12], items[13], items[14]];

  return (
    <section className="relative w-full bg-[#05070c] border-y border-cyan-500/20 overflow-hidden pb-28 pt-20">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Intro Header Section */}
      <div className="container mx-auto px-4 md:px-12 lg:px-24 relative z-10 max-w-[1750px] mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center justify-center gap-6 w-full"
        >
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono tracking-widest uppercase rounded">
              <ShieldCheck size={13} className="text-cyan-400" />
              <span>{isId ? "PRESTASI & SERTIFIKASI" : "HONORS & CERTIFICATIONS"}</span>
            </div>

            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight tracking-tight">
              {isId ? (
                <>
                  Prestasi &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300">Kredensial Terverifikasi</span>
                </>
              ) : (
                <>
                  Verified Honors &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300">Credentials</span>
                </>
              )}
            </h3>

            <p className="text-sm md:text-base font-body text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              {isId
                ? "Lencana digital resmi Credly dan kredensial riset tersertifikasi dari AWS, Cisco, PRAGMA 39, dan Samsung Innovation Campus."
                : "Official Credly digital badges and certified research credentials across AWS, Cisco, PRAGMA 39, and Samsung Innovation Campus."}
            </p>
          </div>

          <div className="flex justify-center mt-2">
            <CyberScrambleButton
              href="/achievements"
              text={isId ? "LIHAT SEMUA KREDENSIAL" : "VIEW ALL CREDENTIALS"}
            />
          </div>
        </motion.div>
      </div>

      {/* Gallery with top and bottom fade masks */}
      <div className="w-full max-w-[1700px] mx-auto px-4 md:px-8 lg:px-12 relative">
        {/* Soft cyber fade on top and bottom so items fade smoothly in and out */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#05070c] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#05070c] to-transparent z-20" />

        <div
          ref={gallery}
          className="relative box-border flex min-h-[750px] gap-6 md:gap-8 overflow-hidden py-6"
        >
          <Column items={col1} y={y1} onItemClick={handleItemClick} isId={isId} />
          <Column items={col2} y={y2} onItemClick={handleItemClick} isId={isId} />
          <Column items={col3} y={y3} onItemClick={handleItemClick} isId={isId} />
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-[20%] left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Reusable Credential Modal (Portal directly to document.body) */}
      <CredentialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        credlyBadge={selectedCredly}
        certificate={selectedDoc}
      />
    </section>
  );
}
