"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { Github } from '@/components/ui/social-icons';
import {
  Gift,
  Plus,
  Minus,
  ArrowRight,
  Maximize2,
  Minimize2,
  ArrowUpRight,
  GitCommit,
  GitPullRequest,
  BookOpen,
  PlusCircle,
  Star,
  GitFork,
  Code2,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { GithubCalendar } from './retro-space-shooter-git-hub-calendar';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { usePortfolio } from "@/context/PortfolioContext";

const GITHUB_USER = "raihanghifariw";

const Counter = ({ value, duration = 1.5, trigger = true }: { value: number, duration?: number, trigger?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && trigger && value > 0) {
      const controls = animate(0, value, {
        duration,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut"
      });
      return () => controls.stop();
    } else {
      setCount(value);
    }
  }, [isInView, trigger, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

interface GitHubStats {
  followers: number;
  totalCommits: number;
  allTimeCommits: number;
  totalRepos: number;
  stars: number;
}

interface LanguageStat {
  name: string;
  percent: number;
  color: string;
}

interface GitHubActivity {
  type: "Commit" | "Repo" | "PR" | "Other";
  repo: string;
  msg: string;
  time: string;
  stats?: { add: number; del: number };
  count?: number;
}

interface RepoItem {
  name: string;
  desc: string | null;
  stars: number;
  forks: number;
  lang: string;
  url: string;
  updatedAt: string;
}

export const GitHubShowcase = () => {
  const { isIndonesian } = usePortfolio();
  const isId = isIndonesian;
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const lenis = useLenis();

  // Scroll locking logic
  useEffect(() => {
    if (isExpanded) {
      if (lenis) lenis.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isExpanded, lenis]);

  const [data, setData] = useState<{
    user: any;
    repos: RepoItem[];
    activity: GitHubActivity[];
    stats: GitHubStats;
    topLanguages: LanguageStat[];
  }>({
    user: null,
    repos: [],
    activity: [],
    stats: {
      followers: 0,
      totalCommits: 108,
      allTimeCommits: 219,
      totalRepos: 14,
      stars: 1
    },
    topLanguages: []
  });

  useEffect(() => {
    setMounted(true);
    const fetchLiveGitHubData = async () => {
      try {
        const [userRes, reposRes, eventsRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`).catch(() => null),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`).catch(() => null),
          fetch(`https://api.github.com/users/${GITHUB_USER}/events?per_page=15`).catch(() => null),
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}`).catch(() => null),
        ]);

        const userData = userRes?.ok ? await userRes.json() : null;
        const reposData = reposRes?.ok ? await reposRes.json() : [];
        const eventsData = eventsRes?.ok ? await eventsRes.json() : [];
        const contribData = contribRes?.ok ? await contribRes.json() : null;

        // 1. Calculate Real Live Contributions
        let rollingContributions = 108;
        let allTimeContributions = 219;
        if (contribData?.contributions && Array.isArray(contribData.contributions)) {
          const now = new Date();
          const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          let sumRolling = 0;
          let sumAll = 0;
          contribData.contributions.forEach((c: any) => {
            sumAll += c.count || 0;
            const d = new Date(c.date);
            if (d >= oneYearAgo && d <= now) sumRolling += c.count || 0;
          });
          rollingContributions = sumRolling > 0 ? sumRolling : (contribData.total?.['2026'] || 108);
          allTimeContributions = sumAll > 0 ? sumAll : 219;
        }

        // 2. Real Repositories & Language Breakdown
        const validRepos: any[] = Array.isArray(reposData) ? reposData : [];
        let totalStars = 0;
        const languagesMap: Record<string, number> = {};

        const parsedRepos: RepoItem[] = validRepos.map((r: any) => {
          totalStars += r.stargazers_count || 0;
          if (r.language) {
            languagesMap[r.language] = (languagesMap[r.language] || 0) + 1;
          }
          return {
            name: r.name,
            desc: r.description || "Public open-source repository",
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            lang: r.language || "Code",
            url: r.html_url || `https://github.com/${GITHUB_USER}/${r.name}`,
            updatedAt: r.updated_at ? new Date(r.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Recent"
          };
        });

        // 3. Dynamic Real Top Languages
        const langColors: Record<string, string> = {
          Python: "#3572A5",
          "Jupyter Notebook": "#DA5B0B",
          TypeScript: "#3178C6",
          Go: "#00ADD8",
          JavaScript: "#F7DF1E",
          Java: "#B07219",
          HTML: "#E34F26"
        };

        const sortedLangs = Object.entries(languagesMap)
          .sort(([, a], [, b]) => b - a)
          .map(([name, count]) => ({
            name: name.toUpperCase(),
            percent: Math.round((count / (validRepos.length || 1)) * 100),
            color: langColors[name] || "#39d353"
          }));

        // 4. Real Live Events
        const validEvents = Array.isArray(eventsData) ? eventsData : [];
        const parsedActivity = validEvents
          .filter((e: any) => e.type === "PushEvent" || e.type === "PullRequestEvent" || e.type === "CreateEvent")
          .slice(0, 15)
          .map((e: any) => {
            let type: "Commit" | "Repo" | "PR" | "Other" = "Other";
            let msg = "Updated repository";
            let stats = undefined;

            if (e.type === "PushEvent") {
              type = "Commit";
              const commitCount = e.payload.size || (e.payload.commits ? e.payload.commits.length : 0);
              const branch = e.payload.ref ? e.payload.ref.replace('refs/heads/', '') : 'main';

              if (commitCount > 0 && e.payload.commits && e.payload.commits.length > 0) {
                msg = e.payload.commits[0].message || `Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''} to ${branch}`;
              } else {
                msg = `Pushed updates to ${branch}`;
              }
            } else if (e.type === "PullRequestEvent") {
              type = "PR";
              const action = e.payload.action;
              let actionText = "Updated";
              if (action === "opened") actionText = "Opened";
              else if (action === "closed") actionText = "Closed";
              else if (action === "merged" || (action === "closed" && e.payload.pull_request?.merged)) actionText = "Merged";

              const prNum = e.payload.number ? `#${e.payload.number}` : "PR";
              const title = e.payload.pull_request?.title;
              msg = title ? `${actionText} ${prNum}: ${title}` : `${actionText} ${prNum}`;

              if (e.payload.pull_request) {
                stats = {
                  add: e.payload.pull_request.additions || 0,
                  del: e.payload.pull_request.deletions || 0
                };
              }
            } else if (e.type === "CreateEvent") {
              type = e.payload.ref_type === "repository" ? "Repo" : "Other";
              msg = `Created ${e.payload.ref_type || "repository"} ${e.payload.ref || ""}`.trim();
            }

            return {
              type,
              repo: e.repo?.name ? (e.repo.name.split("/")[1] || e.repo.name) : "repo",
              msg,
              time: formatDistanceToNow(new Date(e.created_at)) + " ago",
              stats
            };
          });

        setData({
          user: userData,
          repos: parsedRepos,
          activity: parsedActivity as GitHubActivity[],
          stats: {
            followers: userData?.followers ?? 0,
            totalCommits: rollingContributions,
            allTimeCommits: allTimeContributions,
            totalRepos: userData?.public_repos ?? parsedRepos.length ?? 14,
            stars: totalStars
          },
          topLanguages: sortedLangs.length > 0 ? sortedLangs : [
            { name: "PYTHON", percent: 50, color: "#3572A5" },
            { name: "GO", percent: 14, color: "#00ADD8" },
            { name: "TYPESCRIPT", percent: 14, color: "#3178C6" },
            { name: "JAVASCRIPT", percent: 14, color: "#F7DF1E" },
            { name: "JAVA", percent: 8, color: "#B07219" }
          ]
        });
        setLoading(false);
      } catch (error) {
        console.error("GitHub Live Fetch Error:", error);
        setLoading(false);
      }
    };
    fetchLiveGitHubData();
  }, []);

  const formatDistanceToNow = (date: Date) => {
    const diffInSeconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  if (!mounted) return null;

  const springTransition = { type: "spring" as const, damping: 25, stiffness: 120 };

  return (
    <section id='github-stats' className='w-full max-w-[1700px] mx-auto px-4 md:px-6 py-4 md:py-6'>
      <motion.div
        layout
        transition={springTransition}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onClick={() => !isExpanded && setIsExpanded(true)}
        className={cn(
          "relative bg-[#040813]/95 border-2 border-[#00ff66]/40 backdrop-blur-2xl overflow-hidden transition-all duration-700",
          "hover:border-[#00ff66] hover:shadow-[0_0_40px_rgba(0,255,102,0.25)] group/github cursor-pointer",
          "cyber-chamfer-green cyber-scanlines tron-grid-bg",
          isExpanded ? "p-6 md:p-12" : "p-8 md:p-12"
        )}
      >
        {/* Ambient Matrix Neon Glow */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#00ff66]/8 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40 animate-circuit-pulse" />

        {/* Cyberpunk HUD Corner Telemetry Brackets */}
        <div className="absolute top-3 left-6 font-mono text-[10px] text-[#00ff66]/70 tracking-widest pointer-events-none hidden sm:flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-[#00ff66] animate-ping" />
          <span>{isId ? "JARINGAN REPOSITORI GITHUB" : "GITHUB REPOSITORY NETWORK"}</span>
        </div>
        <div className="absolute top-3 right-20 font-mono text-[10px] text-[#00ff66]/60 tracking-widest pointer-events-none hidden md:block">
          {isId ? "TELEMETRI REAL-TIME" : "REAL-TIME TELEMETRY"}
        </div>
        <div className="absolute bottom-3 left-6 font-mono text-[9px] text-[#00ff66]/50 tracking-wider pointer-events-none hidden sm:block">
          COORDS: 106.8456° E, 6.2088° S [EDGE_NODE_JKT]
        </div>
        <div className="absolute bottom-3 right-6 font-mono text-[9px] text-[#00ff66]/50 tracking-wider pointer-events-none hidden sm:block">
          {isId ? "API HTTPS TERENKRIPSI" : "SECURE HTTPS API"}
        </div>

        {/* Expand / Minimize Button */}
        <motion.button
          layout
          onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-6 right-6 z-50 px-3.5 py-2 bg-[#050c1b] border-2 border-[#00ff66] text-[#00ff66] hover:bg-[#00ff66] hover:text-black font-pixel text-[10px] tracking-wider transition-all shadow-[3px_3px_0px_#00ff66] cursor-pointer"
        >
          {isExpanded ? (isId ? "[- KONSOL]" : "[- DECK]") : (isId ? "[+ KONSOL]" : "[+ DECK]")}
        </motion.button>

        <motion.div layout className='flex flex-col md:flex-row items-start justify-between w-full gap-8 relative z-10 pt-4 sm:pt-2'>
          <motion.div layout className="space-y-6 max-w-2xl">
            <motion.div layout className="flex items-center gap-3 text-[#00ff66]">
              <Github className="w-7 h-7 text-[#00ff66]" />
              <span className="font-pixel text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#00ff66] drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]">
                {isId ? "EKOSISTEM GITHUB" : "GITHUB ECOSYSTEM"}
              </span>
            </motion.div>

            <motion.h2 layout className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[0.95em] text-white uppercase">
              {loading ? (isId ? "MENGHUBUNGKAN KE API GITHUB..." : "CONNECTING TO GITHUB API...") : (
                <>
                  {isId ? "BASIS KODE OPEN SOURCE" : "OPEN SOURCE CODEBASE"} <br />
                  <span className="text-[#00ff66] font-pixel text-xl sm:text-2xl md:text-3xl block mt-2 drop-shadow-[0_0_15px_rgba(0,255,102,0.8)]">
                    {isId ? "REPOSITORI & KOMIT AKTIF" : "LIVE REPOSITORIES & COMMITS"}
                  </span>
                </>
              )}
            </motion.h2>

            <motion.div layout className='flex flex-wrap gap-4 sm:gap-6 items-center pt-2'>
              {/* Live Contributions */}
              <div className="bg-[#02050f] border-2 border-[#00ff66]/40 p-3 sm:p-4 shadow-[0_0_15px_rgba(0,255,102,0.08)] relative">
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00ff66]" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00ff66]" />
                <span className="font-pixel text-xl sm:text-2xl font-black text-[#00ff66] tracking-wider drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]">
                  <Counter value={data.stats.totalCommits} trigger={!loading} />
                </span>
                <span className="font-pixel text-[8px] sm:text-[9px] uppercase text-zinc-400 block mt-1 tracking-wider">
                  {isId ? "[ KOMIT (THN) ]" : "[ COMMITS (YR) ]"}
                </span>
              </div>

              {/* Live Public Repositories */}
              <div className="bg-[#02050f] border-2 border-[#00ff66]/40 p-3 sm:p-4 shadow-[0_0_15px_rgba(0,255,102,0.08)] relative">
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00ff66]" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00ff66]" />
                <span className="font-pixel text-xl sm:text-2xl font-black text-[#00ff66] tracking-wider drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]">
                  <Counter value={data.stats.totalRepos} trigger={!loading} />
                </span>
                <span className="font-pixel text-[8px] sm:text-[9px] uppercase text-zinc-400 block mt-1 tracking-wider">
                  {isId ? "[ REPOSITORI ]" : "[ REPOSITORIES ]"}
                </span>
              </div>

              {/* Live Followers */}
              <div className="bg-[#02050f] border-2 border-[#00ff66]/40 p-3 sm:p-4 shadow-[0_0_15px_rgba(0,255,102,0.08)] relative">
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00ff66]" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00ff66]" />
                <span className="font-pixel text-xl sm:text-2xl font-black text-[#00ff66] tracking-wider drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]">
                  <Counter value={data.stats.followers} trigger={!loading} />
                </span>
                <span className="font-pixel text-[8px] sm:text-[9px] uppercase text-zinc-400 block mt-1 tracking-wider">
                  {isId ? "[ PENGIKUT ]" : "[ FOLLOWERS ]"}
                </span>
              </div>

              {/* Live Stars */}
              <div className="bg-[#02050f] border-2 border-[#00ff66]/40 p-3 sm:p-4 shadow-[0_0_15px_rgba(0,255,102,0.08)] relative">
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00ff66]" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00ff66]" />
                <span className="font-pixel text-xl sm:text-2xl font-black text-[#00ff66] tracking-wider drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]">
                  <Counter value={data.stats.stars} trigger={!loading} />
                </span>
                <span className="font-pixel text-[8px] sm:text-[9px] uppercase text-zinc-400 block mt-1 tracking-wider">
                  {isId ? "[ BINTANG ]" : "[ STARGAZERS ]"}
                </span>
              </div>
            </motion.div>
          </motion.div>

          <div className="max-w-sm flex flex-col justify-between pt-4 md:pt-14">
            <motion.p layout className='font-mono text-sm md:text-base text-zinc-300 leading-relaxed border-l-2 border-[#00ff66]/40 pl-3'>
              {isId
                ? "Data langsung yang dialirkan dari REST API GitHub. Riwayat komit real-time, repositori open-source, dan aktivitas publik."
                : "Live data streamed directly from GitHub's REST API. Real-time commit history, open-source repositories, and public activity."}
            </motion.p>
            <div className="mt-5 flex items-center gap-2.5 px-3.5 py-2 bg-[#050c1b] border border-[#00ff66]/50 shadow-[0_0_10px_rgba(0,255,102,0.2)] w-fit">
              <span className="w-2 h-2 bg-[#00ff66] animate-ping" />
              <span className="font-pixel text-[9px] text-[#00ff66]">
                @{GITHUB_USER} • {isId ? "AKTIF" : "ONLINE"}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Fullscreen Cyberpunk Mainframe Terminal Deck Modal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] bg-[#02050e]/90 backdrop-blur-xl overflow-y-auto p-3 sm:p-6 md:p-8"
              onClick={() => setIsExpanded(false)}
              data-lenis-prevent
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={springTransition}
                className="relative w-full max-w-[1600px] mx-auto my-4 bg-[#050914] border-2 border-[#00ff66] shadow-[0_0_50px_rgba(0,255,102,0.3)] p-5 sm:p-8 md:p-12 overflow-hidden cyber-scanlines tron-grid-bg"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-6 right-6 z-50 px-4 py-2 bg-[#00ff66] text-black font-pixel text-xs tracking-wider transition-all shadow-[3px_3px_0px_#fff] cursor-pointer"
                >
                  {isId ? "[✕ TUTUP KONSOL]" : "[✕ CLOSE DECK]"}
                </motion.button>

                <div className='flex flex-col md:flex-row items-start justify-between w-full gap-6 mb-8 border-b-2 border-[#00ff66]/20 pb-6'>
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-3 text-[#00ff66]">
                      <Github className="w-7 h-7" />
                      <span className="font-pixel text-xs tracking-[0.25em] uppercase text-[#00ff66]">
                        {isId ? "PENJELAJAH REPOSITORI GITHUB" : "GITHUB REPOSITORY EXPLORER"}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black font-heading text-white tracking-tight uppercase">
                      {isId ? "PROFIL AKTIF:" : "ACTIVE PROFILE:"} <span className="text-[#00ff66] font-pixel text-xl md:text-2xl">@{GITHUB_USER}</span>
                    </h2>
                    <p className="text-zinc-400 text-xs font-mono">
                      {isId
                        ? `[ ${data.stats.totalRepos} REPOSITORI • ${data.stats.allTimeCommits} TOTAL KOMIT • ARCADE SNAKE DIAKTIFKAN ]`
                        : `[ ${data.stats.totalRepos} REPOSITORIES • ${data.stats.allTimeCommits} ALL-TIME COMMITS • ARCADE SNAKE ENABLED ]`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* 1. Contribution Map + Snake Game */}
                  <div className="lg:col-span-2 bg-[#02050f] border-2 border-[#00ff66]/30 p-4 sm:p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(0,255,102,0.05)]">
                    <div className="flex items-center justify-between mb-4 border-b border-[#00ff66]/20 pb-3">
                      <div className="flex items-center gap-2 text-white">
                        <Code2 className="w-5 h-5 text-[#00ff66]" />
                        <h3 className="font-pixel text-xs text-[#00ff66] uppercase tracking-wider">
                          {isId
                            ? `PETA KONTRIBUSI (${data.stats.totalCommits} KOMIT)`
                            : `CONTRIBUTION HEATMAP (${data.stats.totalCommits} COMMITS)`}
                        </h3>
                      </div>
                      <span className="font-pixel text-[9px] text-[#00ff66] px-2.5 py-1 bg-[#00ff66]/10 border border-[#00ff66]/40">
                        {isId ? "PAPAN RETRO SNAKE" : "RETRO SNAKE BOARD"}
                      </span>
                    </div>

                    <div className="w-full overflow-x-auto py-2">
                      <GithubCalendar username={GITHUB_USER} cellSize={15} cellGap={4} />
                    </div>
                  </div>

                  {/* 2. Live Stack Breakdown */}
                  <div className="bg-[#02050f] border-2 border-[#00ff66]/30 p-4 sm:p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(0,255,102,0.05)]">
                    <div className="flex items-center justify-between mb-4 border-b border-[#00ff66]/20 pb-3">
                      <h3 className="font-pixel text-xs text-white uppercase tracking-wider">
                        {isId ? "KOMPOSISI BAHASA" : "LANGUAGE BREAKDOWN"}
                      </h3>
                      <span className="font-pixel text-[9px] text-[#00ff66]">
                        {isId ? "LANGSUNG" : "LIVE"}
                      </span>
                    </div>

                    <div className="space-y-4 flex-1">
                      {data.topLanguages.map((lang, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-mono font-bold text-white">
                            <span className="font-pixel text-[10px] text-zinc-300">{lang.name}</span>
                            <span className="text-[#00ff66] font-pixel text-[10px]">{lang.percent}%</span>
                          </div>
                          <div className="h-2 w-full bg-[#0a1224] border border-[#00ff66]/30 p-[1px]">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${lang.percent}%` }}
                              transition={{ duration: 1, delay: idx * 0.1 }}
                              className="h-full bg-[#00ff66] shadow-[0_0_8px_#00ff66]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-5 border-t border-[#00ff66]/20 mt-5">
                      <span className="font-pixel text-[9px] text-zinc-400 block mb-2">
                        {isId ? "[ TAUTAN LANGSUNG ]" : "[ DIRECT LINK ]"}
                      </span>
                      <a
                        href={`https://github.com/${GITHUB_USER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#050c1b] hover:bg-[#00ff66] text-[#00ff66] hover:text-black border border-[#00ff66] text-[10px] font-pixel transition-all shadow-[2px_2px_0px_#00ff66]"
                      >
                        <span>GITHUB.COM/{GITHUB_USER}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  {/* 3. Live Repositories */}
                  <div className="lg:col-span-2 bg-[#02050f] border-2 border-[#00ff66]/30 p-4 sm:p-6 shadow-[0_0_20px_rgba(0,255,102,0.05)]">
                    <div className="flex items-center justify-between mb-4 border-b border-[#00ff66]/20 pb-3">
                      <div className="flex items-center gap-2 text-white">
                        <BookOpen className="w-5 h-5 text-[#00ff66]" />
                        <h3 className="font-pixel text-xs text-white uppercase tracking-wider">
                          {isId
                            ? `REPOSITORI PUBLIK (${data.repos.length})`
                            : `PUBLIC REPOSITORIES (${data.repos.length})`}
                        </h3>
                      </div>
                      <span className="font-pixel text-[9px] text-[#00ff66]">
                        {isId ? "ALIRAN API LANGSUNG" : "LIVE API STREAM"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[420px] overflow-y-auto pr-1">
                      {data.repos.map((repo, idx) => (
                        <a
                          key={idx}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-[#050c1b] border border-[#00ff66]/30 flex flex-col gap-2 hover:border-[#00ff66] hover:shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all group/repo"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BookOpen size={13} className="text-[#00ff66]" />
                              <span className="font-mono text-sm font-bold text-white group-hover/repo:text-[#00ff66] transition-colors truncate">
                                {repo.name}
                              </span>
                            </div>
                            <ExternalLink size={12} className="opacity-0 group-hover/repo:opacity-100 transition-opacity text-[#00ff66]" />
                          </div>
                          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-mono">
                            {repo.desc}
                          </p>
                          <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                            <span className="flex items-center gap-1 text-amber-400"><Star size={11} />{repo.stars}</span>
                            <span className="flex items-center gap-1"><GitFork size={11} />{repo.forks}</span>
                            <span className="text-[#00ff66] font-bold">{repo.lang}</span>
                            <span className="text-zinc-500 ml-auto">{repo.updatedAt}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* 4. Live Event Activity */}
                  <div className="bg-[#02050f] border-2 border-[#00ff66]/30 p-4 sm:p-6 flex flex-col shadow-[0_0_20px_rgba(0,255,102,0.05)]">
                    <div className="flex items-center justify-between mb-4 border-b border-[#00ff66]/20 pb-3">
                      <div className="flex items-center gap-2 text-white">
                        <GitCommit className="w-5 h-5 text-[#00ff66]" />
                        <h3 className="font-pixel text-xs text-white uppercase tracking-wider">
                          {isId ? "AKTIVITAS TERBARU" : "RECENT ACTIVITY"}
                        </h3>
                      </div>
                      <span className="font-pixel text-[9px] text-[#00ff66] animate-pulse">
                        {isId ? "MEREKAM" : "RECORDING"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[420px] pr-1">
                      {data.activity.length === 0 ? (
                        <div className="text-xs text-zinc-400 font-mono py-4 text-center">
                          &gt; {isId ? "TIDAK ADA AKTIVITAS PUBLIK TERBARU" : "NO RECENT PUBLIC EVENTS"}
                        </div>
                      ) : data.activity.map((act, i) => (
                        <div
                          key={i}
                          className="p-3 bg-[#050c1b] border border-[#00ff66]/20 flex flex-col gap-1 hover:border-[#00ff66]/50 transition-all"
                        >
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-[#00ff66] font-bold flex items-center gap-1.5">
                              &gt; {act.type === 'Commit' && <GitCommit size={12} />}
                              {act.type === 'PR' && <GitPullRequest size={12} />}
                              {act.type === 'Repo' && <BookOpen size={12} />}
                              {act.type === 'Other' && <PlusCircle size={12} />}
                              {act.repo}
                            </span>
                            <span className="text-[10px] text-zinc-500">{act.time}</span>
                          </div>
                          <p className="text-xs text-zinc-300 line-clamp-1 font-mono">{act.msg}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default GitHubShowcase;
