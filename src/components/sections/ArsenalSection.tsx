"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import TiltCard from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { Brain, BarChart3, Server, Layout } from "lucide-react";
import TextScramble from "@/components/animations/TextScramble";

export default function ArsenalSection() {
  const { t } = usePortfolio();

  const groups = [
    {
      icon: <Brain size={26} className="text-purple-400" />,
      title: "AI & Machine Learning Engineering",
      sub: "Deep RL • LLMs • VLMs • Neural Architectures",
      skills: [
        { name: "PyTorch", highlight: true, detail: "Core framework for continuous SAC policy networks, Custom Autograd & CUDA acceleration" },
        { name: "TensorFlow", highlight: true, detail: "Deep learning models, CNN feature extraction & distributed training pipelines" },
        { name: "Scikit-learn", detail: "Baseline regression, classification, clustering, PCA & statistical benchmarking" },
        { name: "Deep RL (SAC, DQN, TD3)", highlight: true, detail: "Soft Actor-Critic with Lagrangian safety constraints for ICU clinical decision support" },
        { name: "LangChain & LangGraph", highlight: true, detail: "Multi-agent graph orchestration, tool routing, memory checkpointing & RAG" },
        { name: "Langflow", detail: "Visual prototyping of agentic workflows and LLM execution graphs" },
        { name: "Computer Vision (YOLO, CNN)", detail: "Real-time object detection, defect inspection & spatial feature extraction" },
        { name: "VLMs (LLaVA, Qwen-VL)", highlight: true, detail: "Vision-Language multimodal reasoning for zero-shot assembly inspection" },
        { name: "OpenCV", detail: "Image processing, contour analysis, morphology & edge filtering" },
        { name: "Prompt Engineering", detail: "Structured JSON outputs, few-shot conditioning & 3-layer prompt defense" },
        { name: "Offline RL Eval (OPE, WIS, DR)", detail: "Off-Policy Evaluation using Weighted Importance Sampling & Doubly Robust estimators" },
      ],
    },
    {
      icon: <BarChart3 size={26} className="text-sky-400" />,
      title: "Data Analytics & Clinical Modeling",
      sub: "MIMIC-III • Time-Series • Feature Pipelines",
      skills: [
        { name: "Pandas", highlight: true, detail: "High-volume data wrangling, groupbys & temporal window aggregations" },
        { name: "NumPy", highlight: true, detail: "Vectorized mathematical computations, tensor ops & linear algebra" },
        { name: "Feature Engineering", detail: "Physiological cohort extraction, outlier imputation & continuous scaling" },
        { name: "Exploratory Data Analysis (EDA)", detail: "Hypothesis testing, variance correlation & cohort distribution profiling" },
        { name: "MIMIC-III Data Extraction", highlight: true, detail: "Structured query extraction across 60,000+ ICU admissions from Beth Israel Deaconess" },
        { name: "Sepsis-3 Temporal Cohorts", detail: "Clinical consensus definition matching (SOFA score trajectory + suspected infection)" },
        { name: "Power BI", detail: "Interactive enterprise dashboards, KPI tracking & DAX analytics" },
        { name: "Tableau", detail: "Visual storytelling, multi-dimensional filtering & executive reports" },
        { name: "Matplotlib & Seaborn", detail: "Publication-grade research figures, reward curves & confusion matrices" },
      ],
    },
    {
      icon: <Server size={26} className="text-emerald-400" />,
      title: "Backend, Cloud & MLOps Infrastructure",
      sub: "FastAPI • Docker • AWS • CUDA Acceleration",
      skills: [
        { name: "Python", highlight: true, detail: "Primary programming language for research, backend systems & algorithmic pipelines" },
        { name: "FastAPI", highlight: true, detail: "Asynchronous microservices, Pydantic schemas & sub-50ms inference latency" },
        { name: "Flask REST API", detail: "Lightweight API endpoints for model inference & telemetry ingestion" },
        { name: "Go (Golang)", detail: "High-concurrency backend services, Gin HTTP engine & telemetry workers" },
        { name: "Docker", highlight: true, detail: "Multi-stage container builds, reproducible environments & CUDA base images" },
        { name: "AWS (EC2, S3, SageMaker)", highlight: true, detail: "GPU compute instances, artifact buckets & cloud training pipeline automation" },
        { name: "GPU Parallel CUDA", detail: "Hardware-accelerated tensor matrix multiplication and gradient backpropagation" },
        { name: "PostgreSQL", detail: "Relational data modeling, ACID transactions & relational time-series indexing" },
        { name: "MongoDB Atlas", detail: "Document store for semi-structured logs, agent conversation states & telemetry" },
        { name: "Git & GitHub Actions", detail: "Automated CI/CD workflows, automated unit testing & semantic releases" },
        { name: "Linux / Bash", detail: "Shell automation scripts, cron jobs & headless remote server orchestration" },
      ],
    },
    {
      icon: <Layout size={26} className="text-amber-400" />,
      title: "Frontend & Interface Engineering",
      sub: "Next.js • React • TypeScript • Tailwind",
      skills: [
        { name: "Next.js 14/15", highlight: true, detail: "App Router, Server Components, Streaming SSR & Edge API routes" },
        { name: "React.js", highlight: true, detail: "Stateful reactive interfaces, custom hooks & component modularity" },
        { name: "TypeScript", detail: "Strict type safety, generic interfaces & robust developer ergonomics" },
        { name: "JavaScript (ES6+)", detail: "Async/await patterns, DOM manipulation & modern browser APIs" },
        { name: "Tailwind CSS", detail: "Utility-first design systems, responsive layouts & custom animation tokens" },
        { name: "Three.js / WebGL", highlight: true, detail: "Interactive 3D particle constellations, shaders & 3D space parallax" },
        { name: "HTML5 / Vanilla CSS3", detail: "Semantic accessibility, fluid clamp typography & glassmorphism shaders" },
        { name: "Leaflet GIS Maps", detail: "Geospatial coordinate visualization & real-time sensor node mapping" },
        { name: "RESTful API Integration", detail: "Secure JWT auth, TanStack Query caching & client-side telemetry sync" },
      ],
    },
  ];

  return (
    <section id="competency" className="relative py-24 z-10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400 mb-3 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <TextScramble text="TECHNICAL ARSENAL" speed={20} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight max-w-4xl mb-4">
            {t("skills.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {t("skills.lead")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <TiltCard className="p-8 flex flex-col gap-5 h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-0.5">{group.title}</h3>
                    <span className="text-[11px] font-mono text-slate-400">{group.sub}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      data-detail={skill.detail}
                      data-title={skill.name}
                      className={`text-xs px-3 py-1.5 rounded-full transition-all border cursor-pointer select-none ${
                        skill.highlight
                          ? "bg-purple-500/15 border-purple-500/40 text-white hover:bg-purple-500/30 shadow-[0_0_12px_rgba(139,92,246,0.2)]"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/15 hover:border-sky-400/40 hover:text-white"
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
