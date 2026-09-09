"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Award, 
  Search, 
  Filter, 
  ExternalLink, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  Layers
} from "lucide-react";
import { 
  CREDLY_BADGES, 
  FOLDER_CERTIFICATES, 
  CredlyBadge, 
  DocumentCertificate,
  ALL_VERIFIED_COUNT
} from "@/data/certificates";
import CredlyBadgeCard from "@/components/ui/CredlyBadgeCard";
import DocumentCertificateCard from "@/components/ui/DocumentCertificateCard";
import CredentialModal from "@/components/ui/CredentialModal";
import { usePortfolio } from "@/context/PortfolioContext";

type FilterTab = 
  | "ALL" 
  | "CREDLY" 
  | "ACADEMIC"
  | "HACKATHONS" 
  | "AI_ML" 
  | "DATA_ENG" 
  | "NETWORKS_CYBER" 
  | "ETHICS_RESEARCH";

export default function AchievementsMatrixSection() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [selectedCredly, setSelectedCredly] = useState<CredlyBadge | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DocumentCertificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtered Credly Badges
  const filteredCredly = useMemo(() => {
    return CREDLY_BADGES.filter((badge) => {
      // Tab matching
      let tabMatch = true;
      if (activeTab === "HACKATHONS" || activeTab === "ACADEMIC") tabMatch = false;
      else if (activeTab === "CREDLY") tabMatch = true;
      else if (activeTab === "AI_ML") tabMatch = badge.category === "ai" || badge.category === "cloud";
      else if (activeTab === "DATA_ENG") tabMatch = badge.category === "data";
      else if (activeTab === "NETWORKS_CYBER") tabMatch = badge.category === "network" || badge.category === "security";
      else if (activeTab === "ETHICS_RESEARCH") tabMatch = badge.id.includes("ai-literacy");

      if (!tabMatch) return false;

      // Search matching
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        badge.title.toLowerCase().includes(q) ||
        badge.issuer.toLowerCase().includes(q) ||
        badge.description.toLowerCase().includes(q) ||
        badge.skills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [activeTab, searchQuery]);

  // Filtered Document Certificates
  const filteredDocs = useMemo(() => {
    return FOLDER_CERTIFICATES.filter((doc) => {
      // Tab matching
      let tabMatch = true;
      if (activeTab === "CREDLY") tabMatch = false;
      else if (activeTab === "ACADEMIC") tabMatch = doc.issuerCode === "yarsi";
      else if (activeTab === "HACKATHONS") tabMatch = doc.category === "hackathon";
      else if (activeTab === "AI_ML") tabMatch = doc.category === "ai";
      else if (activeTab === "DATA_ENG") tabMatch = doc.category === "data" || doc.category === "programming";
      else if (activeTab === "NETWORKS_CYBER") tabMatch = false;
      else if (activeTab === "ETHICS_RESEARCH") tabMatch = doc.category === "ethics";

      if (!tabMatch) return false;

      // Search matching
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.issuer.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.skills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [activeTab, searchQuery]);

  const totalFiltered = filteredCredly.length + filteredDocs.length;

  const handleViewCredly = (badge: CredlyBadge) => {
    setSelectedCredly(badge);
    setSelectedDoc(null);
    setIsModalOpen(true);
  };

  const handleViewDoc = (doc: DocumentCertificate) => {
    setSelectedDoc(doc);
    setSelectedCredly(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-12">
      {/* Top Cyber Telemetry Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 bg-[#06080e] border border-cyan-500/30 relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10 text-center sm:text-left">
          <div className="border-r border-zinc-800/80 pr-4 last:border-0">
            <span className="text-[9px] font-display text-cyan-400 block mb-1">
              {isId ? "TOTAL KREDENSIAL" : "TOTAL CREDENTIALS"}
            </span>
            <div className="text-2xl sm:text-3xl font-display text-white">
              {ALL_VERIFIED_COUNT}
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              {isId ? "Terverifikasi & Aktif" : "Verified & Active"}
            </span>
          </div>

          <div className="border-r border-zinc-800/80 pr-4 last:border-0">
            <span className="text-[9px] font-display text-cyan-400 block mb-1">
              {isId ? "LENCANA CREDLY" : "CREDLY BADGES"}
            </span>
            <div className="text-2xl sm:text-3xl font-display text-cyan-300">
              {CREDLY_BADGES.length}
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              AWS • Google • IBM • Cisco
            </span>
          </div>

          <div className="border-r border-zinc-800/80 pr-4 last:border-0">
            <span className="text-[9px] font-display text-emerald-400 block mb-1">
              {isId ? "AKADEMIK / HACKATHON" : "ACADEMIC / HACKATHON"}
            </span>
            <div className="text-2xl sm:text-3xl font-display text-emerald-300">
              {FOLDER_CERTIFICATES.length}
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              PRAGMA • Samsung • Dicoding
            </span>
          </div>

          <div>
            <span className="text-[9px] font-display text-amber-400 block mb-1">
              {isId ? "INTEGRITAS VERIFIKASI" : "VERIFICATION INTEGRITY"}
            </span>
            <div className="text-2xl sm:text-3xl font-display text-amber-300">
              100%
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              {isId ? "Kriptografis & Institusional" : "Cryptographic & Institutional"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs & Real-Time Search Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#070a10] border border-cyan-500/25">
          {[
            { id: "ALL", label: isId ? `SEMUA (${ALL_VERIFIED_COUNT})` : `ALL (${ALL_VERIFIED_COUNT})` },
            { id: "CREDLY", label: isId ? `LENCANA CREDLY (${CREDLY_BADGES.length})` : `CREDLY BADGES (${CREDLY_BADGES.length})` },
            { id: "ACADEMIC", label: isId ? "ASISTEN DOSEN (3)" : "TEACHING ASST (3)" },
            { id: "HACKATHONS", label: "HACKATHONS" },
            { id: "AI_ML", label: "AI & ML" },
            { id: "DATA_ENG", label: "DATA & SQL" },
            { id: "NETWORKS_CYBER", label: isId ? "JARINGAN & CYBER" : "NETWORKS & CYBER" },
            { id: "ETHICS_RESEARCH", label: isId ? "ETIKA & RISET" : "ETHICS & RESEARCH" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as FilterTab)}
              className={`px-3 py-2 text-[9px] font-display tracking-wider uppercase transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isId ? "Cari penerbit, keahlian, atau kredensial..." : "Search issuer, skill, or credential..."}
            className="w-full bg-[#070a10] border border-cyan-500/30 text-white font-mono text-xs pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-zinc-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-400 hover:text-white"
            >
              {isId ? "HAPUS" : "CLEAR"}
            </button>
          )}
        </div>
      </div>

      {/* Main Results Display */}
      {totalFiltered === 0 ? (
        <div className="py-20 text-center border border-zinc-800 bg-[#06080e] p-8">
          <p className="text-zinc-400 font-mono text-sm mb-2">
            {isId ? `Tidak ada kredensial yang sesuai kriteria: "${searchQuery}"` : `No credentials matched filter criteria: "${searchQuery}"`}
          </p>
          <button
            onClick={() => {
              setActiveTab("ALL");
              setSearchQuery("");
            }}
            className="text-xs font-display text-cyan-400 underline hover:text-cyan-300"
          >
            {isId ? "RESET SEMUA FILTER" : "RESET ALL FILTERS"}
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          {/* SECTION 1: CREDLY OFFICIAL DIGITAL BADGES */}
          {filteredCredly.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 animate-pulse" />
                  <h2 className="text-lg sm:text-xl font-display font-bold text-white tracking-wider">
                    {isId ? "LENCANA DIGITAL RESMI CREDLY" : "CREDLY OFFICIAL DIGITAL BADGES"}
                  </h2>
                  <span className="text-xs font-mono text-cyan-400/70 bg-cyan-950/60 px-2 py-0.5 border border-cyan-500/30">
                    {isId ? `${filteredCredly.length} LENCANA` : `${filteredCredly.length} BADGES`}
                  </span>
                </div>
                <span className="hidden sm:block text-[10px] font-mono text-zinc-400">
                  {isId ? "HOST: WWW.CREDLY.COM • METRIK WAKTU-NYATA" : "HOST: WWW.CREDLY.COM • REAL-TIME METRICS"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCredly.map((badge) => (
                  <CredlyBadgeCard
                    key={badge.id}
                    badge={badge}
                    onViewEmbed={handleViewCredly}
                  />
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: ACADEMIC, HACKATHON & SPECIALIZATION VAULT */}
          {filteredDocs.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 animate-pulse" />
                  <h2 className="text-lg sm:text-xl font-display font-bold text-white tracking-wider">
                    {isId ? "VAULT SERTIFIKAT DOKUMEN & PENGHARGAAN" : "DOCUMENT CERTIFICATES & HONORS VAULT"}
                  </h2>
                  <span className="text-xs font-mono text-emerald-400/70 bg-emerald-950/60 px-2 py-0.5 border border-emerald-500/30">
                    {isId ? `${filteredDocs.length} DOKUMEN` : `${filteredDocs.length} DOCUMENTS`}
                  </span>
                </div>
                <span className="hidden sm:block text-[10px] font-mono text-zinc-400">
                  {isId ? "SUMBER: REPO SERTIFIKAT RESMI • PRATINJAU PDF LANGSUNG" : "SOURCE: LOCAL CERTIFICATE REPO • DIRECT PDF PREVIEW"}
                </span>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocs.map((doc) => (
                  <DocumentCertificateCard
                    key={doc.id}
                    certificate={doc}
                    onView={handleViewDoc}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reusable Credential Modal */}
      <CredentialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        credlyBadge={selectedCredly}
        certificate={selectedDoc}
      />
    </div>
  );
}
