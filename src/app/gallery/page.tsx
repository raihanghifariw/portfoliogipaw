"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Download, 
  Tag, 
  MapPin, 
  Calendar, 
  Sparkles,
  Layers,
  Check,
  Share2
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import FooterMarquee from "@/components/ui/FooterMarquee";
import NeuralConstellation from "@/components/3d/NeuralConstellation";
import ClickSpark from "@/components/animations/ClickSpark";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import NextPageTransition from "@/components/animations/NextPageTransition";
import TextScramble from "@/components/animations/TextScramble";
import { GALLERY_ITEMS, GALLERY_ITEMS_ID, GALLERY_CATEGORIES, GALLERY_CATEGORIES_ID, GalleryItem, GalleryCategory } from "@/data/gallery";
import { usePortfolio } from "@/context/PortfolioContext";

export default function GalleryPage() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const categories = isId ? GALLERY_CATEGORIES_ID : GALLERY_CATEGORIES;
  const currentItems = isId ? GALLERY_ITEMS_ID : GALLERY_ITEMS;

  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync activeItem when language switches
  useEffect(() => {
    if (activeItem) {
      const updated = currentItems.find((i) => i.id === activeItem.id);
      if (updated) setActiveItem(updated);
    }
  }, [isId, currentItems]);

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return currentItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [currentItems, selectedCategory, searchQuery]);

  // Keyboard navigation for active modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === "Escape") {
        setActiveItem(null);
      } else if (e.key === "ArrowRight") {
        const idx = filteredItems.findIndex((i) => i.id === activeItem.id);
        if (idx < filteredItems.length - 1) {
          setActiveItem(filteredItems[idx + 1]);
        } else {
          setActiveItem(filteredItems[0]);
        }
      } else if (e.key === "ArrowLeft") {
        const idx = filteredItems.findIndex((i) => i.id === activeItem.id);
        if (idx > 0) {
          setActiveItem(filteredItems[idx - 1]);
        } else {
          setActiveItem(filteredItems[filteredItems.length - 1]);
        }
      }
    },
    [activeItem, filteredItems]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Copy link handler
  const handleCopyLink = (item: GalleryItem) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${item.image}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const activeIndex = activeItem
    ? filteredItems.findIndex((i) => i.id === activeItem.id)
    : -1;

  return (
    <div className="relative min-h-screen bg-[#05070c] text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <NeuralConstellation />
      <ClickSpark />
      <Navbar />

      {/* Cyber Grid Background Matrix */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[linear-gradient(to_right,#00f0ff0d_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0d_1px,transparent_1px)] bg-[size:40px_40px]" />

      <main className="relative z-10 pt-32 pb-24 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12">
        {/* HUD Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 mb-3 uppercase flex items-center gap-2">
            <Camera size={15} className="animate-pulse" />
            <TextScramble text={isId ? "ARSIP VISUAL & DOKUMENTASI RISET" : "VISUAL ARCHIVE & LAB ARTIFACTS"} speed={20} />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tight leading-tight">
                {isId ? "Dokumentasi Lapangan & Lab" : "Field & Lab Vault"}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-body">
                {isId
                  ? "Dokumentasi fotografi yang mengabadikan eksperimen reinforcement learning berspesifikasi keselamatan, podium hackathon internasional, bimbingan sarjana, kepemimpinan senat mahasiswa, serta riset infrastruktur komputasi terdistribusi."
                  : "Photographic records capturing safety-critical reinforcement learning experiments, international hackathon podium finishes, undergraduate mentorship, student senate leadership, and high-throughput fintech infrastructure immersions."}
              </p>
            </div>

            {/* Live Telemetry Stats HUD */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 p-3.5 rounded-xl border border-white/10 bg-[#070b14]/80 backdrop-blur-md shrink-0">
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">{isId ? "ARSIP" : "ARTIFACTS"}</div>
                <div className="text-xl font-display font-black text-cyan-400">
                  {currentItems.length}
                </div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">{isId ? "SEKTOR" : "SECTORS"}</div>
                <div className="text-xl font-display font-black text-emerald-400">
                  {categories.length - 1}
                </div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">{isId ? "ERA" : "ERA"}</div>
                <div className="text-xl font-display font-black text-purple-400">2023-26</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Filters & Search Matrix */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between border-y border-white/10 py-5">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat.id === "all"
                  ? currentItems.length
                  : currentItems.filter((i) => i.category === cat.id).length;
              const active = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-md font-mono text-[11px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                      : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded ${
                      active ? "bg-cyan-400/30 text-white" : "bg-black/40 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Real-Time Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder={isId ? "Cari tag, laboratorium, atau topik..." : "Search by tag, lab, or topic..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#070b14]/80 border border-white/10 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-500 tracking-wider">
          <div>
            {isId
              ? `MENAMPILKAN [${filteredItems.length} DARI ${currentItems.length}] ARSIP`
              : `DISPLAYING [${filteredItems.length} OF ${currentItems.length}] ARTIFACTS`}
          </div>
          {searchQuery && (
            <div className="text-cyan-400">
              FILTER: &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>

        {/* Responsive Cyber Masonry Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
            <p className="font-mono text-sm text-slate-400 mb-2">
              {isId ? "TIDAK ADA ARSIP YANG SESUAI KRITERIA PENCARIAN" : "NO ARTIFACTS MATCH YOUR CRITERIA"}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 text-xs font-mono hover:bg-cyan-400/30 transition-colors"
            >
              {isId ? "RESET FILTER" : "RESET FILTERS"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.03 }}
                layout
                onClick={() => setActiveItem(item)}
                className="group relative cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-[#070b14] hover:border-cyan-400/50 hover:shadow-[0_0_24px_rgba(0,240,255,0.25)] transition-all flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/60">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Scanline & Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-black/30" />
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-[linear-gradient(rgba(0,240,255,0.06)_1px,transparent_1px)] bg-[size:100%_4px]" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-cyan-500/40 text-[9px] font-mono tracking-widest text-cyan-300 uppercase">
                      {item.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-slate-300">
                      {item.date}
                    </span>
                  </div>

                  {/* Hover Inspect Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <span className="px-3 py-1.5 rounded-md bg-cyan-400 text-black font-mono text-[10px] font-bold tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.7)] flex items-center gap-1.5">
                      <Sparkles size={12} />
                      {isId ? "INSPEKSI DOKUMEN" : "INSPECT ARTIFACT"}
                    </span>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mb-2">
                      <MapPin size={11} className="text-cyan-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tag Chips */}
                  <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-mono text-slate-400 group-hover:border-cyan-500/20 group-hover:text-cyan-200 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono text-slate-500">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Cyber Lightbox Modal */}
      {mounted &&
        activeItem &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
            onClick={() => setActiveItem(null)}
          >
            {/* Modal Dialog Card */}
            <div
              className="relative w-full max-w-5xl max-h-[92vh] rounded-2xl border border-cyan-500/40 bg-[#06080e] shadow-[0_0_50px_rgba(0,240,255,0.25)] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#090d18]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="font-mono text-xs font-bold tracking-widest text-cyan-300 uppercase">
                    {isId
                      ? `ARSIP [${String(activeIndex + 1).padStart(2, "0")} / ${String(filteredItems.length).padStart(2, "0")}]`
                      : `ARTIFACT [${String(activeIndex + 1).padStart(2, "0")} / ${String(filteredItems.length).padStart(2, "0")}]`}
                  </span>
                  <span className="text-slate-600 font-mono">|</span>
                  <span className="font-mono text-xs text-slate-400 uppercase hidden sm:inline">
                    {activeItem.categoryLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(activeItem)}
                    className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-400/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Copy Image URL"
                  >
                    {copiedLink ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-emerald-400 text-[10px]">{isId ? "TERCOPY" : "COPIED"}</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={12} />
                        <span className="text-[10px] hidden sm:inline">{isId ? "BAGIKAN" : "SHARE"}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={activeItem.image}
                    download
                    className="p-1.5 rounded bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                    title="Download Photo"
                  >
                    <Download size={14} />
                  </a>

                  <a
                    href={activeItem.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                    title="Open Full Size"
                  >
                    <ExternalLink size={14} />
                  </a>

                  <button
                    onClick={() => setActiveItem(null)}
                    className="p-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/40 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body: Image & Metadata */}
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Large Preview Pane */}
                <div className="lg:col-span-2 relative bg-black/80 flex items-center justify-center p-3 sm:p-6 min-h-[350px] sm:min-h-[480px]">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg border border-white/10 shadow-2xl"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => {
                      const prevIdx =
                        activeIndex > 0 ? activeIndex - 1 : filteredItems.length - 1;
                      setActiveItem(filteredItems[prevIdx]);
                    }}
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-cyan-500 text-white hover:text-black border border-white/20 hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
                    title="Previous Artifact (Left Arrow)"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => {
                      const nextIdx =
                        activeIndex < filteredItems.length - 1 ? activeIndex + 1 : 0;
                      setActiveItem(filteredItems[nextIdx]);
                    }}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-cyan-500 text-white hover:text-black border border-white/20 hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
                    title="Next Artifact (Right Arrow)"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Metadata Sidebar Pane */}
                <div className="p-6 bg-[#070b14] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between gap-5">
                  <div className="space-y-4">
                    <div>
                      <span className="px-2.5 py-1 rounded bg-cyan-500/15 border border-cyan-500/30 text-[10px] font-mono tracking-widest text-cyan-300 uppercase">
                        {activeItem.categoryLabel}
                      </span>
                      <h2 className="mt-3 font-heading text-xl sm:text-2xl font-bold text-white leading-snug">
                        {activeItem.title}
                      </h2>
                    </div>

                    <div className="space-y-2 py-3 border-y border-white/10 text-xs font-mono text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-cyan-400 shrink-0" />
                        <span>{activeItem.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-purple-400 shrink-0" />
                        <span>{activeItem.location}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-mono text-slate-400 tracking-wider uppercase mb-1.5">
                        {isId ? "KONTEKS & CATATAN RISET" : "CONTEXT & RESEARCH LOG"}
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-body">
                        {activeItem.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-mono text-slate-400 tracking-wider uppercase mb-2 flex items-center gap-1.5">
                        <Tag size={12} className="text-cyan-400" />
                        {isId ? "LABEL KLASIFIKASI" : "CLASSIFICATION TAGS"}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeItem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Helper Bottom Bar */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{isId ? "GUNAKAN [← / →] UNTUK NAVIGASI" : "USE [← / →] TO NAVIGATE"}</span>
                    <span>{isId ? "[ESC] UNTUK TUTUP" : "[ESC] TO CLOSE"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Monumental Next Chapter Banner */}
      <NextPageTransition
        nextChapterNum="09"
        nextChapterTitle={isId ? "KURIKULUM VITAE LENGKAP" : "COMPLETE RESUME"}
        nextChapterSubtitle={isId ? "Tinjau Kurikulum Vitae Terverifikasi, Pendidikan Formal & Kredensial Resmi" : "Inspect the Verified Curriculum Vitae, Formal Education & Credentials"}
        nextHref="/resume"
      />

      <ChatBotWidget />
      <FooterMarquee />
    </div>
  );
}
