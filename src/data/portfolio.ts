export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
    username: string;
}

export interface PersonalInfo {
    name: string;
    title: string;
    subtitle: string;
    bio: string;
    avatar: string;
    location: string;
    email: string;
    phone: string;
    resumeUrl: string;
    website: string;
    languages: { name: string; level: string }[];
    socialLinks: SocialLink[];
}

export interface ProjectItem {
    id: string;
    slug: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    category: string;
    year?: string;
    techStack: string[];
    tools: string[];
    status: 'ongoing' | 'completed' | 'planned';
    repoUrl?: string;
    demoUrl?: string;
    startDate?: string;
    role?: string;
    customTimeline?: string;
    team?: string;
    highlights?: string[];
    features?: { title: string; items: string[] }[];
}

export interface ExperienceItem {
    id: string;
    company: string;
    position: string;
    description: string;
    skills: string[];
    period?: string;
    startDate?: string;
    endDate?: string;
    isOngoing?: boolean;
    image?: string;
    externalLink?: string | string[];
}

export interface BlogItem {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    coverImage?: string;
}

export interface AchievementItem {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
    tags: string[];
    category: 'certification' | 'award' | 'publication';
}

export interface PortfolioData {
    personal: PersonalInfo;
    projects: ProjectItem[];
    experiences: ExperienceItem[];
    blogs: BlogItem[];
    achievements: AchievementItem[];
}

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Raihan Ghifari Winata',
        title: 'AI, Data, & Software Engineer & Researcher',
        subtitle: 'Safety-Critical Deep RL • Distributed Systems Architect • Clinical AI Researcher',
        bio: 'AI, Data, & Software Engineer & Researcher pioneering continuous-action Soft Actor-Critic (SAC) ensembles with Lagrangian safety boundaries for clinical ICU decision support (MIMIC-III, 20,913 trajectories, 75.31% survival vs 73.55% clinician baseline). Architect of low-latency edge Vision-Language triage engines, distributed MLOps pipelines on GPU clusters, and high-throughput data infrastructure.',
        avatar: '/about/raihan-profile.webp',
        location: 'Bekasi, Indonesia',
        email: 'ghifariwinata@gmail.com',
        phone: '+62 898-9641-777',
        resumeUrl: '/resume',
        website: 'https://raihanghifari.vercel.app',
        languages: [
            { name: 'Indonesian', level: 'Native' },
            { name: 'English', level: 'Professional Working (TOEIC: 605)' }
        ],
        socialLinks: [
            {
                platform: 'GitHub',
                url: 'https://github.com/raihanghifariw',
                icon: 'github',
                username: 'raihanghifariw'
            },
            {
                platform: 'LinkedIn',
                url: 'https://linkedin.com/in/raihan-ghifari-winata',
                icon: 'linkedin',
                username: 'Raihan Ghifari Winata'
            },
            {
                platform: 'Instagram',
                url: 'https://instagram.com/raihanghifari',
                icon: 'instagram',
                username: 'raihanghifari'
            }
        ]
    },
    projects: [
        {
            id: 'project-1',
            slug: 'transformer-clinical',
            title: 'Transformer Clinical Decision Support',
            description: 'Decision Transformer for continuous ICU drug dosages conditioned on physiological trajectories (MIMIC-III).',
            longDescription: 'Co-developed with teams from Thammasat University, UC San Diego, and Osaka University. Formulated ICU clinical action recommendation as autoregressive sequence modeling conditioned on returns-to-go and state histories.',
            image: '/gallery/FotoSC1.webp',
            category: 'Deep RL & Healthcare',
            year: '2026',
            techStack: ['PyTorch', 'Decision Transformer', 'MIMIC-III', 'CUDA', 'Python 3.11'],
            tools: ['VS Code', 'Git', 'Linux'],
            status: 'completed',
            repoUrl: 'https://github.com/raihanghifariw/Transformers_TreatmentRecommendation',
            highlights: ['PRAGMA Hackathon Winner', 'Doubly Robust OPE Validation', 'Autoregressive Trajectory Conditioning'],
            role: 'Lead AI Engineer'
        },
        {
            id: 'project-2',
            slug: 'sepsis-rl-ensemble',
            title: 'Ensemble SAC Sepsis Recommendation',
            description: '5-agent Soft Actor-Critic continuous action ensemble with Lagrangian safety boundaries on MAP and fluid balance.',
            longDescription: 'Undergraduate thesis at Universitas Yarsi. Denoising Autoencoder compresses 37 clinical features into 24-D latent space. Attained 75.31% estimated survival rate outperforming historical clinician baseline of 73.55% with Calibrated Doubly Robust ESS = 1374.',
            image: '/project/Sepsis_Treatment_Recommendation.jpeg',
            category: 'Safety-Critical RL',
            year: '2025-2026',
            techStack: ['PyTorch', 'Soft Actor-Critic (SAC)', 'Lagrangian Constraints', 'MIMIC-III', 'Autoencoder'],
            tools: ['PyTorch', 'AWS EC2', 'Docker'],
            status: 'completed',
            repoUrl: 'https://github.com/raihanghifariw/RLEnsembleSepsiRecommendations',
            highlights: ['75.31% Survival Rate', 'Lagrangian Safety Corridors', '5-Agent Ensemble'],
            role: 'Sole Researcher'
        },
        {
            id: 'project-3',
            slug: 'vlm-defect-triage',
            title: 'VLM Edge Industrial Defect Triage',
            description: 'Edge-quantized Vision-Language Models (LLaVA) + OpenCV for automated smartphone defect classification.',
            longDescription: 'Hybrid on-premises inspection pipeline coupling OpenCV spatial anomaly extraction with local quantized 4-bit LLaVA inference, outputting structured Pydantic-validated JSON triage reports at ~42ms latency.',
            image: '/project/AI-Defect_Triage.png',
            category: 'Computer Vision & VLMs',
            year: '2026',
            techStack: ['Computer Vision', 'LLaVA', 'Ollama', 'OpenCV', 'Docker', 'FastAPI'],
            tools: ['Docker', 'Ollama', 'Python'],
            status: 'completed',
            repoUrl: 'https://github.com/raihanghifariw/vlm-cv-defect-triage',
            highlights: ['Zero Cloud Leakage', '~42ms Edge Latency', 'Pydantic Validation'],
            role: 'Computer Vision Engineer'
        },
        {
            id: 'project-4',
            slug: 'agentic-ops-rag',
            title: 'Agentic Ops Enterprise Hybrid RAG',
            description: 'Deterministic LangGraph orchestrator with hybrid vector + BM25 retrieval and 3-layer prompt injection defense.',
            longDescription: 'Architected enterprise agent system with confidence routing, deterministic fallback gates, and multi-tenant telemetry for mission-critical documentation retrieval.',
            image: '/project/terraflowplatform1.webp',
            category: 'Agentic AI & GenAI',
            year: '2025',
            techStack: ['LangGraph', 'LangChain', 'FastAPI', 'Qdrant Vector DB', 'Next.js', 'PostgreSQL'],
            tools: ['Docker', 'LangSmith', 'TypeScript'],
            status: 'completed',
            repoUrl: 'https://github.com/raihanghifariw/agentic-ops-rag',
            highlights: ['Hybrid Vector/BM25', '3-Layer Prompt Defense', 'Confidence Fallback'],
            role: 'Systems Architect'
        },
        {
            id: 'project-5',
            slug: 'aero-flare-wildfire',
            title: 'Aero-Flare Autonomous Wildfire AI',
            description: 'Real-time satellite thermal anomaly intelligence powered by NASA FIRMS telemetry and geospatial deep learning.',
            longDescription: 'Full-stack geospatial risk engine that streams satellite telemetry, computes thermal spread vectors with PyTorch, and serves interactive heatmaps with sub-second response times.',
            image: '/project/Aero-flare-project.png',
            category: 'Geospatial & Deep Learning',
            year: '2026',
            techStack: ['Python', 'FastAPI', 'PyTorch', 'NASA FIRMS API', 'Next.js', 'Mapbox GL'],
            tools: ['Mapbox', 'Docker', 'AWS'],
            status: 'completed',
            repoUrl: 'https://github.com/raihanghifariw/aero-flare',
            highlights: ['Sub-Second Telemetry Streaming', 'NASA FIRMS Ingestion', 'Geospatial Spread Modeling'],
            role: 'Full Stack & AI Engineer'
        }
    ],
    experiences: [
        {
            id: 'prof-1',
            company: 'Lab AI Universitas Yarsi',
            position: 'Artificial Intelligence Researcher',
            description: 'Engineered clinical data pipeline filtering 94,458 ICU stays down to 35,608 Sepsis-3 episodes. Designed denoising Autoencoder (37→24 latent dim). Developed 5-agent Soft Actor-Critic (SAC) ensemble with dynamic Lagrangian safety constraints, reaching 75.31% survival vs 73.55% clinician baseline (ESS 1374).',
            skills: ['Deep RL', 'Soft Actor-Critic', 'PyTorch', 'Autoencoder', 'Lagrangian Safety', 'MIMIC-III'],
            period: '08/2025 - 01/2026',
            image: '/gallery/ai-researcher-lab.webp',
            externalLink: 'https://github.com/raihanghifariw'
        },
        {
            id: 'prof-2',
            company: 'Lab E-Health Universitas Yarsi',
            position: 'Artificial Intelligence Intern',
            description: 'Architected temporal clinical feature extraction from MIMIC-III (20,913 clean trajectories across 37 variables in 4-hr timesteps). Built Ensemble Weighted Dueling Double Deep Q-Network (EWD3QN), achieving 92.4% survival rate vs 83.26% baseline and 10× epoch speedup via GPU parallel processing.',
            skills: ['MIMIC-III', 'EWD3QN', 'Deep Q-Learning', 'GPU Parallelism', 'Temporal Modeling'],
            period: '02/2025 - 07/2025',
            image: '/gallery/ai-engineer-intern-1.webp',
            externalLink: 'https://yarsi.ac.id'
        },
        {
            id: 'prof-3',
            company: 'Universitas Yarsi : Faculty of Information Technology',
            position: 'Assistant Lecturer / Lab Instructor',
            description: 'Mentored 100+ CS students across 5 core courses: Specialization AI Track, Artificial Intelligence, Data Structures, OOP, and Algorithm Fundamentals. Led 14 weekly lab sessions per semester in Python/Java, driving a +70% increase in average student project scores.',
            skills: ['AI Mentorship', 'Deep Learning Labs', 'Data Structures', 'Algorithms', 'Python / Java'],
            period: '09/2023 - 04/2026',
            image: '/gallery/assistant-lecturer-mentoring.webp',
            externalLink: 'https://yarsi.ac.id'
        },
        {
            id: 'prof-4',
            company: 'Thammasat University, UCSD & Osaka University',
            position: 'Team Lead & Decision Transformer Developer (PRAGMA Hackathon Winner)',
            description: 'Winner Teamwork Award at 15-university Asia-Pacific hackathon. Co-architected Decision Transformer sequence modeling pipeline predicting continuous ICU drug dosages conditioned on historical patient trajectories and target returns.',
            skills: ['Decision Transformers', 'Sequence Modeling', 'Healthcare AI', 'Offline Evaluation (OPE)'],
            period: '01/2026',
            image: '/gallery/pragma-hackathon-award-4.webp',
            externalLink: 'https://pragma-grid.org'
        },
        {
            id: 'prof-5',
            company: 'Faculty of Information Technology Student Senate (SEMA FTI), YARSI University',
            position: 'Head of Communication Department',
            description: 'Led creative team of 10 members managing digital publications, media archives, and marketing collateral for major campus IT events and academic symposiums serving over 60+ attendees.',
            skills: ['Student Senate', 'Media Strategy', 'Team Leadership', 'Public Relations'],
            period: '08/2023 - 12/2024',
            image: '/gallery/sema-fti-student-senate-1.webp',
            externalLink: 'https://yarsi.ac.id'
        }
    ],
    blogs: [
        {
            id: 'blog-1',
            slug: 'lagrangian-sac-sepsis',
            title: 'Lagrangian Continuous Soft Actor-Critic for Clinical Sepsis Intervention',
            excerpt: 'How dynamic Lagrangian multipliers enforce strict physiological safety corridors (MAP & fluids) in off-policy reinforcement learning.',
            category: 'applied-ai',
            date: 'Jan 2026',
            readTime: '8 min read'
        },
        {
            id: 'blog-2',
            slug: 'decision-transformers-icu',
            title: 'Decision Transformers in Real-Time ICU Care: Autoregressive Sequence Modeling',
            excerpt: 'Shifting from traditional offline Bellman backups to causal self-attention over patient return-to-go and observation trajectories.',
            category: 'applied-ai',
            date: 'Dec 2025',
            readTime: '10 min read'
        },
        {
            id: 'blog-3',
            slug: 'edge-quantized-vlms',
            title: 'Edge-Quantized VLMs: Real-Time Industrial Defect Triage Without Cloud Leakage',
            excerpt: 'Coupling local 4-bit LLaVA with classical OpenCV contour extraction for deterministic on-prem manufacturing inspection.',
            category: 'software-development',
            date: 'Nov 2025',
            readTime: '7 min read'
        },
        {
            id: 'blog-4',
            slug: 'hardened-enterprise-rag',
            title: 'Hardening Enterprise RAG: Multi-Agent Confidence Routing & Prompt Defense',
            excerpt: 'Architecting 3-tier prompt injection shields with hybrid vector/BM25 retrieval and deterministic fallback gates in LangGraph.',
            category: 'software-development',
            date: 'Oct 2025',
            readTime: '9 min read'
        },
        {
            id: 'blog-5',
            slug: 'mimic-iii-gpu-acceleration',
            title: 'Scaling 20,913 MIMIC-III ICU Trajectories: 10× Training Acceleration with CUDA Parallelism',
            excerpt: 'Overcoming memory bottlenecks and state space volatility in clinical longitudinal electronic health records.',
            category: 'more',
            date: 'Sep 2025',
            readTime: '6 min read'
        }
    ],
    achievements: [
        {
            id: 'achieve-1',
            title: 'PRAGMA Collaborative Hackathon Winner (Teamwork Award)',
            issuer: 'Thammasat University, UCSD & Osaka University',
            date: 'January 2026',
            description: 'Won international collaborative AI hackathon for Decision Transformer clinical decision support modeling.',
            tags: ['International Hackathon', 'Decision Transformer', 'ICU AI'],
            category: 'award'
        },
        {
            id: 'achieve-2',
            title: 'Highest Academic Distinction (CGPA 3.92 / 4.00)',
            issuer: 'Universitas Yarsi : Faculty of Information Technology',
            date: '2026',
            description: 'Graduated with highest distinction in Computer Science, authoring thesis on continuous action Deep RL for sepsis.',
            tags: ['Valedictorian Rank', 'CGPA 3.92', 'Computer Science'],
            category: 'award'
        },
        {
            id: 'achieve-3',
            title: 'AWS Certified AI Practitioner',
            issuer: 'Amazon Web Services (AWS)',
            date: '2025',
            description: 'Validated foundational AI/ML and generative AI knowledge on cloud architectures (Score: 826 / 1000).',
            tags: ['AWS Global', 'Generative AI', 'Cloud AI'],
            category: 'certification'
        },
        {
            id: 'achieve-4',
            title: 'Samsung Innovation Campus Semi-Finalist',
            issuer: 'Samsung Electronics Indonesia',
            date: '2024',
            description: 'Recognized for building intelligent embedded and IoT solutions under real-world operational constraints.',
            tags: ['Samsung Global', 'AIoT', 'Semi-Finalist'],
            category: 'award'
        },
        {
            id: 'achieve-5',
            title: 'CITI Biomedical Research Ethics Certification',
            issuer: 'CITI Program',
            date: '2024',
            description: 'Certified in ethical handling of human subject clinical data (MIMIC-III / PhysioNet protocol compliance).',
            tags: ['Research Ethics', 'Clinical Data', 'HIPAA/IRB'],
            category: 'certification'
        }
    ]
};
