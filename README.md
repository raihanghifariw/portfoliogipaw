# Raihan Ghifari Winata Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.3.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-black?style=flat&logo=framer)](https://www.framer.com/motion/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180-black?style=flat&logo=threedotjs)](https://threejs.org/)

Interactive portfolio web application for **Raihan Ghifari Winata**, an AI and Machine Learning Engineer specializing in Deep Reinforcement Learning, Generative AI (LLMs and VLMs), and clinical MLOps.

The platform showcases research in safety-constrained Soft Actor-Critic (SAC) reinforcement learning for ICU sepsis clinical decision support, edge-quantized vision-language systems, cloud infrastructure architectures on AWS, and production software engineering projects.

---

## Technical Overview

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript.
- **Styling**: Tailwind CSS v4 with adaptive Dark and Light mode design tokens.
- **Animation and 3D**: Framer Motion, GSAP ScrollTrigger, and Three.js for interactive WebGL experiences.
- **Internationalization**: Client-side dual-language support (English and Indonesian).
- **Live Integrations**: Serverless API routes proxying live telemetry from GitHub, Kaggle, and WakaTime.

---

## Key Modules and Pages

- **Home (`/`)**: High-impact interactive landing page featuring an AI system initialization HUD, 3D Hero canvas, interactive identity sequences, live telemetry Bento deck, and flagship project showcases.
- **About (`/about`)**: Background, educational trajectory at Universitas Yarsi (CGPA 3.92 / 4.00), leadership roles, and research philosophy.
- **Projects (`/projects`, `/projects/[id]`)**: Detailed project catalog with deep technical write-ups, architecture breakdowns, GitHub repositories, and live demo links.
- **Experience (`/experience`)**: Chronological journey spanning assistant lectureship, AI research internships, and student governance executive leadership.
- **Skills (`/skills`)**: Radar proficiency matrix, technical directives, toolchain breakdown, and cloud infrastructure capabilities.
- **Achievements (`/achievements`)**: Verified credentials, AWS certifications, CITI research ethics accreditations, and hackathon distinctions.
- **Gallery (`/gallery`)**: Curated archival photography and documentary moments from symposiums, lab mentoring, and international hackathons.
- **Telemetry (`/telemetry`)**: System metrics, verified coding hours, commit activity, and real-time development statistics.
- **AI Neural Assistant**: Integrated floating chat interface trained on resume data, publications, and technical competencies.

---

## Project Structure

```text
portfolio-next/
├── public/
│   ├── assets/              # Static media, icons, and document assets
│   ├── gallery/             # High-resolution WebP gallery images
│   └── tech-icons/          # Technology brand vector assets
└── src/
    ├── app/                 # Next.js App Router pages and API endpoints
    │   ├── api/             # API routes for external metrics proxying
    │   ├── layout.tsx       # Root layout, theme injection, and providers
    │   └── globals.css      # Core design tokens and theme variables
    ├── components/
    │   ├── 3d/              # WebGL canvases, 3D cards, and particle systems
    │   ├── animations/      # Transition providers, HUD indicators, and trackers
    │   ├── layout/          # Navbar, Footer, and System Initialization loader
    │   ├── sections/        # Modular page sections and bento grids
    │   └── ui/              # Reusable atomic UI components and widgets
    ├── context/             # Theme, Language, and Preloader state contexts
    ├── data/                # Typed data models for projects, skills, and timeline
    ├── lib/                 # Utility functions and class mergers
    └── types/               # TypeScript interfaces and type definitions
```

---

## Getting Started

### Prerequisites

- Node.js version 18.17.0 or higher
- npm, pnpm, or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/raihanghifariw/portfoliogipaw.git
cd portfoliogipaw/portfolio-next
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Create and verify an optimized production build:

```bash
npm run build
npm start
```

---

## Deployment Workflow

- **Staging**: Feature updates and bug fixes are pushed to the `staging` branch for preview verification on Vercel preview deployments.
- **Production**: Verified commits are merged into `main` for automatic deployment to the primary domain.

---

## License

This project is licensed under the MIT License.
