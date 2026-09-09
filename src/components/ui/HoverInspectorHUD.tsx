"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Cpu, Layers } from "lucide-react";

export interface SkillDetail {
  name: string;
  category: string;
  proficiency: number;
  years: string;
  projects: string[];
  keyHighlight: string;
}

export const SKILL_METADATA_MAP: Record<string, SkillDetail> = {
  "PyTorch": {
    name: "PyTorch",
    category: "Deep Learning & RL Framework",
    proficiency: 95,
    years: "3+ Years",
    projects: ["Sepsis SAC Ensemble", "Decision Transformer MIMIC-III", "Autoencoders"],
    keyHighlight: "Custom GPU CUDA tensors, dynamic autograd computation graphs, and 10× AWS training acceleration.",
  },
  "Deep RL (SAC, DQN, TD3)": {
    name: "Deep Reinforcement Learning",
    category: "Decision Support & Control",
    proficiency: 94,
    years: "2.5+ Years",
    projects: ["Sepsis Treatment RL (Thesis)", "EWD3QN Clinical Agent", "OPE Evaluators"],
    keyHighlight: "Lagrangian safety corridor formulation, continuous action spaces, and off-policy evaluation.",
  },
  "LangChain & LangGraph": {
    name: "LangChain & LangGraph",
    category: "Generative AI & Autonomous Agents",
    proficiency: 92,
    years: "2+ Years",
    projects: ["Agentic Ops RAG System", "3-Layer Prompt Shield Defense", "Multi-Agent Workflows"],
    keyHighlight: "Cyclic state graphs, deterministic tool routing, and strict Pydantic structured output validation.",
  },
  "VLMs (LLaVA, Qwen-VL)": {
    name: "Vision-Language Models",
    category: "Multimodal AI & Computer Vision",
    proficiency: 88,
    years: "2+ Years",
    projects: ["Industrial Defect Triage", "Aero-Flare NASA Wildfire Intelligence"],
    keyHighlight: "Edge quantization, zero-shot surface defect classification, and spatial telemetry parsing.",
  },
  "FastAPI": {
    name: "FastAPI",
    category: "High-Throughput Backend & MLOps",
    proficiency: 93,
    years: "3+ Years",
    projects: ["Model Serving Endpoints", "Aero-Flare Ingestion Worker", "Microservice APIs"],
    keyHighlight: "Asynchronous Python routing, Pydantic type safety, and sub-15ms inference latency.",
  },
  "Docker": {
    name: "Docker & Containerization",
    category: "DevOps & Deployment",
    proficiency: 90,
    years: "3+ Years",
    projects: ["On-Prem Defect Triage", "Agentic Ops RAG", "Reproducible Research Envs"],
    keyHighlight: "Multi-stage production Dockerfiles, NVIDIA container toolkit, and isolated runtimes.",
  },
  "AWS (EC2, S3, SageMaker)": {
    name: "AWS Cloud Infrastructure",
    category: "Cloud Compute & Storage",
    proficiency: 89,
    years: "2+ Years",
    projects: ["AWS Certified AI Practitioner", "Distributed PyTorch Clusters", "S3 Data Lake"],
    keyHighlight: "EC2 GPU spot instances, S3 lifecycle policies, and SageMaker model endpoints.",
  },
  "MIMIC-III Data Extraction": {
    name: "MIMIC-III Clinical Database",
    category: "Healthcare Informatics",
    proficiency: 95,
    years: "2+ Years",
    projects: ["Sepsis-3 Temporal Cohorts", "61,532 ICU Admissions Extraction"],
    keyHighlight: "High-volume SQL/Pandas querying, 4-hour temporal binning, and physiological trajectory synthesis.",
  },
  "Next.js 14/15": {
    name: "Next.js (App Router)",
    category: "Frontend & Fullstack UI",
    proficiency: 90,
    years: "2.5+ Years",
    projects: ["Portfolio Site Next.js 15", "Aero-Flare Tactical GIS Dashboard", "Sharing Vision"],
    keyHighlight: "Server Components, Framer Motion animations, TypeScript, and Tailwind CSS design systems.",
  },
  "TypeScript": {
    name: "TypeScript",
    category: "Type-Safe Application Development",
    proficiency: 91,
    years: "3+ Years",
    projects: ["Next.js GIS Maps", "Fullstack REST Clients", "Interactive 3D UI"],
    keyHighlight: "Strict compile-time type safety, generic interfaces, and modular component architectures.",
  },
};

export function InspectableSkill({
  skillName,
  isHighlighted = false,
}: {
  skillName: string;
  isHighlighted?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const detail = SKILL_METADATA_MAP[skillName] || {
    name: skillName,
    category: "Technical Stack Competency",
    proficiency: 85,
    years: "2+ Years",
    projects: ["Core Production & Research Pipelines"],
    keyHighlight: `Verified production proficiency in ${skillName} across academic and applied AI projects.`,
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 120);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className={`text-xs px-3 py-1 rounded-full cursor-help transition-all border inline-flex items-center gap-1.5 ${
          isHighlighted
            ? "bg-purple-500/15 border-purple-500/35 text-white hover:bg-purple-500/30 hover:border-purple-400"
            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/15 hover:border-white/20"
        }`}
      >
        <span>{skillName}</span>
        <span className="w-1 h-1 rounded-full bg-sky-400 opacity-60" />
      </span>

      {/* Floating Cyber Micro-HUD */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 z-[100] bg-[#0b0b12]/95 border border-purple-500/40 p-4 rounded-xl shadow-2xl backdrop-blur-xl pointer-events-none"
          >
            {/* Scanline line effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:100%_4px] rounded-xl overflow-hidden" />

            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-400 font-bold tracking-wider">
                  <Cpu size={12} />
                  <span>{detail.category.toUpperCase()}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{detail.years}</span>
              </div>

              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{detail.name}</h4>
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-sky-400">
                  <Sparkles size={11} />
                  <span>{detail.proficiency}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${detail.proficiency}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 to-sky-400"
                />
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                {detail.keyHighlight}
              </p>

              {detail.projects.length > 0 && (
                <div className="pt-1.5 border-t border-white/10 flex flex-wrap gap-1">
                  {detail.projects.map((p, i) => (
                    <span
                      key={i}
                      className="text-[9.5px] font-mono bg-white/5 border border-white/10 text-slate-300 px-1.5 py-0.5 rounded flex items-center gap-1"
                    >
                      <Layers size={9} className="text-purple-400" />
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Arrow Pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-purple-500/40" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
