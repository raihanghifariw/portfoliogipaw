# Raihan Ghifari Winata | Interactive Scrollytelling Portfolio

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.4-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.0-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.1-black?style=flat&logo=framer)](https://www.framer.com/motion/)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.14-green?style=flat&logo=greensock)](https://greensock.com/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-success?style=flat&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)

A premier, kinetic brutalism scrollytelling web application representing **Raihan Ghifari Winata** (AI & Machine Learning Engineer / Systems Architect).

The application bridges research-grade Reinforcement Learning (Safety-Constrained continuous SAC models on the MIMIC-III ICU dataset) with distributed systems engineering, high-throughput MLOps pipelines, and full-stack software architecture.

---

## ⚡ Visual Identity: Pixels + Tron Cyberpunk

The visual theme combines:
1. **Retro 8-Bit Pixel Precision**: Stepped pixel typography (`font-pixel` / Press Start 2P), glowing vector `PixelArtGem` stars, and cyber-scanline textures.
2. **Tron Cyberpunk Futurism**: Deep void black backdrops (`#02040a`, `#040814`), laser neon cyan (`#00f0ff`), matrix emerald (`#00ff66`), warning amber (`#ffaa00`), neon purple (`#c084fc`), ambient glows, and interactive hover spotlights.
3. **Frameless Kinetic Marquee**: 6 core engineering roles flowing seamlessly without rigid box framing, matching high-end editorial portfolios:
   - `AI & MACHINE LEARNING ENGINEER`
   - `AI RESEARCHER`
   - `DATA ENGINEER`
   - `MLOPS ENGINEER`
   - `DISTRIBUTED COMPUTE`
   - `SOFTWARE ENGINEER`
4. **Interactive B&W to Color Tech Scroller**: Dual-row infinite marquees containing 23 authentic brand technologies in muted grayscale by default, igniting into vivid original colors with neon cyan halos upon mouse hover.

---

## 🌟 Core Scrollytelling Architecture

- **`HeroVisual`**: Kinetic brutalist typography (`AI & DATA`, `SOFT⚡WARE`, `EN🤖GINEER`) with floating physics icons and an `absolute` opportunity badge that reveals the interactive `ProfileCard` drawer on hover.
- **`AboutLeadIn`**: Pinned quote plane (0-12% scroll) scaling from 1.0 to 0.92 with corner brutalist red tabs and glare sweep.
- **`ScrollHijackSection` (600vh)**: Horizontal translation (`xShift: 0vw -> -100vw`) moving from verified 3.92 CGPA metrics (`CoreEngineeringPanel`) into the elevated `IdentitySequence` deck.
- **`ScrollAdventure` (800vh)**: 3D interactive cube deck cycling across Intelligence Systems, Scalable Cloud Systems, and Strategic Innovation.
- **`ArgentLoopInfiniteSlider` (500vh)**: Vertical flagship project slider with spring physics, parallax image shift, tag filters, and GitHub/Demo deep-links.
- **`HorizontalTimeline` & `CertificateShowcase`**: Milestone timeline covering research lab roles, E-Health internship, assistant lectureship, and hackathon awards.
- **`ShowcaseStack`**: Interactive 3-card stack connecting to live APIs:
  - **GitHub Showcase**: Live commit heatmap and public repositories.
  - **Kaggle Showcase**: Dataset medals and competition standing.
  - **WakaTime Showcase**: 4+ years of verified coding metrics (6 to 9 hours daily).
- **`AuditFunnel` (`Bucket`)**: 3D interactive cardboard box with dynamic sticker burst and cursor trail.
- **`StatsSection` & `CTASection`**: Multi-image Zoom Parallax gallery, pinned 3D Bookshelf with tiltable book covers, and a theatrical curtain slide-over CTA with dual angled ribbons (6° and -6°).

---

## 🛠️ Complete 23-Item Tech Stack Catalog

| Category | Technologies Included |
| :--- | :--- |
| **AI & Deep RL** | Python, PyTorch, TensorFlow, Scikit-learn, CUDA, Google Colab, LangChain |
| **Languages & Web** | Golang, TypeScript, React, Next.js, FastAPI |
| **Cloud & Distributed** | AWS, Docker, Kubernetes, Microsoft Azure, Google Cloud, Microsoft Fabric, Celery, Git |
| **Databases & Vectors** | Qdrant, PostgreSQL, MongoDB |

---

## 📂 Project Directory Structure

```
portfolio-next/
├── plan/                     # Comprehensive architectural documentation suite
│   ├── PRD.md               # Product Requirements Document
│   ├── SYSTEM_DESIGN.md     # Scrollytelling engine & component architecture
│   ├── DESIGN_SYSTEM.md     # Pixels + Tron Cyberpunk design system
│   ├── TECH_STACK.md        # 23-item tech stack catalog & dependencies
│   ├── CODING_STANDARDS.md  # Strict TypeScript & Anti-AI Slop guidelines
│   ├── QA_ENGINEER.md       # Scrollytelling audit checklist & test matrix
│   ├── SECURITY.md          # Serverless API proxy & client hardening
│   ├── DEBUGGING_GUIDE.md   # Diagnostic scenarios & verified solutions
│   └── MEMORY_SESSION.md    # Historical session log & engineering memory
├── public/
│   ├── tech-icons/          # 23 authentic brand vector SVGs
│   └── ...                  # WebP images, certificates, and assets
└── src/
    ├── app/                 # Next.js App Router (pages, layout, API routes)
    │   ├── api/             # /api/github-stats, /api/kaggle-stats, /api/wakatime-stats
    │   ├── layout.tsx       # Root layout, fonts, and theme providers
    │   └── page.tsx         # Scrollytelling state machine homepage
    ├── components/
    │   ├── sections/        # HeroVisual, AboutSection, StatsSection, CTASection, IdentitySequence
    │   └── ui/              # BrandScroller, InfiniteMarquee, ProfileCard, Buttons
    ├── data/
    │   └── portfolio.ts     # Immutable single source of truth data model
    └── lib/                 # Utility helpers (cn, utils)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18.17.0
- npm, pnpm, or bun

### Development Server
```bash
npm run dev
# Server running at http://localhost:3000
```

### Production Build & Type Verification
```bash
npm run build
# Strict compilation across all routes with Turbopack
```

---

## 📖 Technical Documentation

For detailed architectural diagrams, scrollytelling coordinate specifications, and engineering guidelines, consult the files in [`plan/`](./plan/):
- [Product Requirements (PRD)](./plan/PRD.md)
- [System Design & Architecture](./plan/SYSTEM_DESIGN.md)
- [Design System: Pixels + Tron Cyberpunk](./plan/DESIGN_SYSTEM.md)
- [Technology Stack Specification](./plan/TECH_STACK.md)
- [Coding Standards & Clean Copy Rules](./plan/CODING_STANDARDS.md)
- [Quality Assurance & Audit Matrix](./plan/QA_ENGINEER.md)
- [Security & Hardening Policy](./plan/SECURITY.md)
- [Debugging Playbook](./plan/DEBUGGING_GUIDE.md)
- [Historical Session Log](./plan/MEMORY_SESSION.md)
