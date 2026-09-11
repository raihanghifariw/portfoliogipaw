import { Project, ExperienceItem, OrganizationItem, EducationItem, AwardItem, FAQItem, StrategicDirective, CoreFocusDomain, EngineeringTechItem, ToolingItem } from "@/types";

export const I18N_DATA: Record<"en" | "id", Record<string, string>> = {
  en: {
    "badge.available": "AVAILABLE FOR OPPORTUNITY",
    "nav.identity": "Identity",
    "nav.work": "Portfolio / Projects",
    "nav.arsenal": "Arsenal",
    "nav.experience": "Experience",
    "nav.organizations": "Organizations",
    "nav.education": "Education",
    "nav.accolades": "Accolades",
    "nav.contact": "Contact",
    "nav.resume": "VIEW RESUME",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.openLinkedIn": "Open LinkedIn Profile",
    "nav.roleBadge": "AI, Data & Systems Researcher",
    "nav.directoryArchives": "[ DIRECTORY ARCHIVES ]",
    "nav.statusOnline": "STATUS: ONLINE",
    "nav.port": "PORT 443",
    "nav.exploreAction": "Explore",
    "nav.mobileAbout": "[ ABOUT DIRECTORY ]",
    "nav.mobileContact": "Initiate Contact",

    "nav.sub.portfolio.title": "Portfolio",
    "nav.sub.portfolio.subtitle": "Production AI & Systems Deployments",
    "nav.sub.portfolio.tag": "DEPLOYMENTS",
    "nav.sub.portfolio.previewTitle": "Safe-RL MIMIC-III Policy Ensembles",
    "nav.sub.portfolio.previewDesc": "Continuous Soft Actor-Critic (SAC) models with Lagrangian safety bounds on 20,913 ICU sepsis trajectories.",
    "nav.sub.portfolio.previewMetric": "75.31% SURVIVAL RATE",

    "nav.sub.experience.title": "Experience",
    "nav.sub.experience.subtitle": "Research Lab & Industry Leadership",
    "nav.sub.experience.tag": "RESEARCH LABS",
    "nav.sub.experience.previewTitle": "Cyber Physical AI & Laboratory Lead",
    "nav.sub.experience.previewDesc": "Directing deep learning research, mentoring 100+ students, and architecting distributed MLOps pipelines.",
    "nav.sub.experience.previewMetric": "10X TRAINING SPEEDUP",

    "nav.sub.skills.title": "Skills",
    "nav.sub.skills.subtitle": "Deep RL & High-Throughput CUDA",
    "nav.sub.skills.tag": "ARCHITECTURE",
    "nav.sub.skills.previewTitle": "CUDA, PyTorch & Distributed Systems",
    "nav.sub.skills.previewDesc": "Low-latency tensor pipelines, Docker containerization, FastAPI endpoints, and hybrid vector indexing.",
    "nav.sub.skills.previewMetric": "CUDA • PYTORCH • FASTAPI",

    "nav.sub.biography.title": "Biography",
    "nav.sub.biography.subtitle": "Research Philosophy & Clinical Thesis",
    "nav.sub.biography.tag": "PHILOSOPHY",
    "nav.sub.biography.previewTitle": "Engineering Rigorous Intelligence",
    "nav.sub.biography.previewDesc": "Bridging mathematical control theory, reinforcement learning safety corridors, and production-scale MLOps.",
    "nav.sub.biography.previewMetric": "CLINICAL SAFETY BOUNDS",

    "nav.sub.gallery.title": "Gallery",
    "nav.sub.gallery.subtitle": "Visual Research & 28 Verified Artifacts",
    "nav.sub.gallery.tag": "ARCHIVES",
    "nav.sub.gallery.previewTitle": "Visual Research & Lab Archives",
    "nav.sub.gallery.previewDesc": "Photographic documentation of Deep RL experiments, PRAGMA hackathons, DANA fintech, and faculty mentoring.",
    "nav.sub.gallery.previewMetric": "28 VERIFIED ARTIFACTS",

    "nav.sub.achievements.title": "Achievements",
    "nav.sub.achievements.subtitle": "PRAGMA Hackathon Winner & AWS Honors",
    "nav.sub.achievements.tag": "HONORS",
    "nav.sub.achievements.previewTitle": "PRAGMA Collaborative Hackathon Winner",
    "nav.sub.achievements.previewDesc": "International AI competition champion (Thammasat, UCSD, Osaka) and certified AWS cloud practitioner.",
    "nav.sub.achievements.previewMetric": "1ST PLACE TEAMWORK AWARD",

    "nav.sub.resume.title": "Resume",
    "nav.sub.resume.subtitle": "Curriculum Vitae & Distinctions",
    "nav.sub.resume.tag": "CREDENTIALS",
    "nav.sub.resume.previewTitle": "Academic & Professional CV",
    "nav.sub.resume.previewDesc": "Bachelor of Computer Science, Universitas YARSI with CGPA 3.92/4.00 (Highest Distinction).",
    "nav.sub.resume.previewMetric": "CGPA 3.92 • DISTINCTION",

    "nav.sub.blog.title": "Blog",
    "nav.sub.blog.subtitle": "Neural Archive Technical Publications",
    "nav.sub.blog.tag": "PUBLICATIONS",
    "nav.sub.blog.previewTitle": "Neural Archive Publications",
    "nav.sub.blog.previewDesc": "In-depth research papers, Decision Transformer benchmarks, and mathematical derivations of safe RL.",
    "nav.sub.blog.previewMetric": "6 PEER PUBLICATIONS",

    "hero.greeting": "HI, I'M RAIHAN GHIFARI WINATA. I BUILD SCALABLE SYSTEMS POWERED BY INTELLIGENCE.",
    "hero.available": "AVAILABLE FOR OPPORTUNITIES",
    "hero.tagline": "Architecting intelligent systems at the intersection of Deep Reinforcement Learning, Generative AI (LLMs/VLMs), and Production MLOps.",
    "hero.ctaPrimary": "Explore Flagship Work",
    "hero.ctaSecondary": "Get In Touch",
    "hero.sysOnline": "SYS: [ONLINE]",
    "hero.hp": "HP: [████████] 100%",
    "hero.level": "LVL.99 ARCHITECT",
    "hero.badgeRole": "AI, Data, & Software Engineer & Researcher",
    "hero.eyebrow": "AUTONOMOUS INTELLIGENCE SYSTEMS",
    "hero.headline.1": "ARCHITECTING",
    "hero.headline.2": "AUTONOMOUS AI",
    "hero.headline.3": "& DISTRIBUTED SYSTEMS",
    "hero.subtitle": "Engineering high-performance neural architectures across Generative Agents, Real-Time Computer Vision, continuous-action Deep Reinforcement Learning, and distributed GPU pipelines designed for scale.",
    "hero.btnExplore": "EXPLORE_SYSTEMS",
    "hero.btnEve": "TALK_TO_EVE",
    "hero.btnCredentials": "CREDENTIALS",
    "hero.eveBubble": "> HI! I AM EVE, RAIHAN'S RESEARCH CO-PILOT. EXPLORE HIS PRODUCTION WORKFLOWS IN GEN AI, COMPUTER VISION, DEEP RL, & DISTRIBUTED SYSTEMS.",
    "hero.eveCopilot": "EVE NAVIGATION CO-PILOT",
    "hero.chatTrigger": "CHAT ↗",

    "identity.title": "Architecting Scalable Systems Where Intelligence Meets Engineering.",
    "identity.lead": "As an AI Engineer & Researcher graduating from Universitas Yarsi (CGPA 3.92/4.00), I bridge rigorous algorithmic research with high-throughput production systems: turning clinical datasets and enterprise workflows into interpretable, high-impact AI solutions.",
    "pillar.1.title": "Safety-Constrained Reinforcement Learning",
    "pillar.1.desc": "Formulating Lagrangian continuous policy models (SAC/TD3) that enforce strict physiological safety corridors for clinical ICU decision support.",
    "pillar.2.title": "Production-Grade AI & MLOps",
    "pillar.2.desc": "Accelerating PyTorch training pipelines by 10x on AWS cloud infrastructure, containerizing with Docker, and serving micro-latency FastAPI endpoints.",
    "pillar.3.title": "Autonomous Agents & Enterprise RAG",
    "pillar.3.desc": "Architecting multi-agent orchestrations with LangGraph and LangChain, featuring hybrid vector retrieval, deterministic confidence routing, and 3-layer prompt defense.",
    "pillar.4.title": "Applied Computer Vision & VLMs",
    "pillar.4.desc": "Deploying edge-quantized Vision-Language Models (LLaVA/Qwen2-VL) combined with classical OpenCV for zero-shot industrial defect inspection and satellite telemetry.",
    "stats.gpa": "CGPA / 4.00 (Faculty of IT, Yarsi)",
    "stats.speed": "Training Pipeline Acceleration on AWS",
    "stats.baseline": "Over Historical Clinician Baselines",
    "stats.mentored": "CS Students Mentored across 5 Courses",

    "cta.consoleHeader": "COMMAND CONSOLE : ONLINE",
    "cta.eyebrow": "INITIATE COLLABORATION",
    "cta.headline": "LET'S ARCHITECT",
    "cta.subtitle": "Open to strategic engineering collaborations in autonomous AI agents, continuous deep reinforcement learning, and distributed high-throughput infrastructure.",
    "cta.paradigm.0": "INTELLIGENT SYSTEMS",
    "cta.paradigm.1": "AUTONOMOUS AGENTS",
    "cta.paradigm.2": "DISTRIBUTED RUNTIMES",
    "cta.paradigm.3": "HIGH-THROUGHPUT PIPELINES",
    "cta.btnPrimary": "INITIATE CONTACT",
    "cta.btnSecondary": "CURRICULUM VITAE",
    "cta.footerStatus": "STATUS: OPEN FOR STRATEGIC ROLES",
    "cta.footerLatency": "RESPONSE LATENCY: <24H",
    "cta.footerZone": "ZONE: JAKARTA & BEKASI [UTC+7]",

    "eve.hint.about.tag": "ACADEMIC & SAC RL",
    "eve.hint.about.hint": "Raihan achieved 3.92 CGPA with continuous SAC models on MIMIC-III (75.31% survival vs 73.55% clinician).",
    "eve.hint.slider.tag": "FLAGSHIP SYSTEMS",
    "eve.hint.slider.hint": "Inspecting Safe-RL Sepsis policy ensembles and edge Vision-Language triage platforms.",
    "eve.hint.github.tag": "OPEN SOURCE",
    "eve.hint.github.hint": "Verified PRAGMA Hackathon Winner repositories and high-throughput Python pipelines.",
    "eve.hint.kaggle.tag": "KAGGLE & DATASETS",
    "eve.hint.kaggle.hint": "Browse curated healthcare AI datasets and Decision Transformer research notebooks.",
    "eve.hint.contact.tag": "COLLABORATION",
    "eve.hint.contact.hint": "Ready to discuss AI research, safety-critical systems, or engineering roles? Let's connect!",

    "projects.title": "Flagship Engineering & Research Systems",
    "projects.lead": "A curated portfolio of deep learning architectures, reinforcement learning agents, on-prem vision inspection, and full-stack systems.",
    "filter.all": "All Systems",
    "filter.healthcare": "Deep RL & Healthcare",
    "filter.agents": "GenAI & Agents",
    "filter.vision": "Computer Vision & VLMs",
    "filter.fullstack": "Fullstack & Cloud",
    "skills.title": "Technical Arsenal & Stack",
    "skills.lead": "Mastered frameworks, architectures, and development environments across AI research and production software engineering.",
    "experience.title": "Professional Work Experience",
    "experience.lead": "Hands-on experience conducting frontier deep learning research, laboratory engineering, and university student instruction.",
    "organizations.title": "Organizations & Technical Leadership",
    "organizations.lead": "Driving campus leadership, student mentorship, and international cross-university collaboration.",
    "education.title": "Academic Background & Honors",
    "education.lead": "Formal higher education, high academic distinction, and dedicated undergraduate thesis research.",
    "awards.title": "Verified Honors & Certifications",
    "awards.lead": "Recognitions from international hackathons, national industry competitions, and global cloud certifications.",
    "contact.title": "Let's Build Something Intelligent Together",
    "contact.lead": "Open to global AI/ML Engineering opportunities, research collaborations, and production consulting.",
    "contact.infoTitle": "Direct Transmission",
    "contact.infoDesc": "Have an engineering problem, research initiative, or full-time opportunity? Reach out directly:",
    "contact.formTitle": "Send a Message",
    "contact.labelName": "YOUR NAME",
    "contact.labelEmail": "EMAIL ADDRESS",
    "contact.labelSubject": "SUBJECT / PROJECT",
    "contact.labelMessage": "MESSAGE",
    "contact.submitBtn": "Transmit Message",
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "What are your primary areas of engineering & research specialization?",
    "faq.a1": "I specialize in Deep Reinforcement Learning (SAC, DQN, TD3 applied to clinical decision support with safety constraints), Generative AI & Agentic Systems (LLMs, LangChain/LangGraph, RAG pipelines with prompt-injection defenses), and Computer Vision / VLMs for automated industrial inspection.",
    "faq.q2": "Are you available for full-time roles, research collaborations, or consulting?",
    "faq.a2": "Yes, I am actively open to full-time AI/ML Engineer opportunities globally (remote, hybrid, or on-site), as well as clinical healthcare AI research collaborations and enterprise system design consulting.",
    "faq.q3": "What is your typical production tech stack?",
    "faq.a3": "For model training and evaluation: PyTorch, Python, Scikit-learn, CUDA. For serving and orchestration: FastAPI, Docker, AWS (EC2/S3), LangGraph. For full-stack dashboards and GIS telemetry: Next.js, TypeScript, Tailwind CSS, PostgreSQL."
  },
  id: {
    "badge.available": "TERSEDIA UNTUK PELUANG KERJA",
    "nav.identity": "Identitas",
    "nav.work": "Portofolio / Proyek",
    "nav.arsenal": "Keahlian",
    "nav.experience": "Pengalaman Kerja",
    "nav.organizations": "Organisasi",
    "nav.education": "Pendidikan",
    "nav.accolades": "Prestasi",
    "nav.contact": "Kontak",
    "nav.resume": "LIHAT RESUME",
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.openLinkedIn": "Buka Profil LinkedIn",
    "nav.roleBadge": "AI, Data & Peneliti Sistem",
    "nav.directoryArchives": "[ ARSIP DIREKTORI ]",
    "nav.statusOnline": "STATUS: AKTIF",
    "nav.port": "PORT 443",
    "nav.exploreAction": "Jelajahi",
    "nav.mobileAbout": "[ DIREKTORI TENTANG ]",
    "nav.mobileContact": "Hubungi Sekarang",

    "nav.sub.portfolio.title": "Portofolio",
    "nav.sub.portfolio.subtitle": "Penerapan Sistem & Model AI Produksi",
    "nav.sub.portfolio.tag": "PENERAPAN",
    "nav.sub.portfolio.previewTitle": "Ensemble Kebijakan Safe-RL MIMIC-III",
    "nav.sub.portfolio.previewDesc": "Model continuous Soft Actor-Critic (SAC) dengan batasan keselamatan Lagrangian pada 20.913 trajektori sepsis ICU.",
    "nav.sub.portfolio.previewMetric": "75.31% TINGKAT SURVIVAL",

    "nav.sub.experience.title": "Pengalaman",
    "nav.sub.experience.subtitle": "Kepemimpinan Lab Riset & Industri",
    "nav.sub.experience.tag": "LAB RISET",
    "nav.sub.experience.previewTitle": "Riset Cyber Physical AI & Asisten Lab",
    "nav.sub.experience.previewDesc": "Memimpin riset deep learning, membimbing 100+ mahasiswa, dan merancang pipeline MLOps terdistribusi.",
    "nav.sub.experience.previewMetric": "10X AKSELERASI TRAINING",

    "nav.sub.skills.title": "Keahlian",
    "nav.sub.skills.subtitle": "Deep RL & Komputasi CUDA Kinerja Tinggi",
    "nav.sub.skills.tag": "ARSITEKTUR",
    "nav.sub.skills.previewTitle": "CUDA, PyTorch & Sistem Terdistribusi",
    "nav.sub.skills.previewDesc": "Pipeline tensor latensi rendah, kontainerisasi Docker, endpoint FastAPI, dan pengindeksan vektor hybrid.",
    "nav.sub.skills.previewMetric": "CUDA • PYTORCH • FASTAPI",

    "nav.sub.biography.title": "Biografi",
    "nav.sub.biography.subtitle": "Filosofi Riset & Tesis Klinis",
    "nav.sub.biography.tag": "FILOSOFI",
    "nav.sub.biography.previewTitle": "Rekayasa Kecerdasan Rigorus",
    "nav.sub.biography.previewDesc": "Menjembatani teori kontrol matematika, koridor keselamatan reinforcement learning, dan MLOps skala produksi.",
    "nav.sub.biography.previewMetric": "BATAS KESELAMATAN KLINIS",

    "nav.sub.gallery.title": "Galeri",
    "nav.sub.gallery.subtitle": "Riset Visual & 28 Artefak Terverifikasi",
    "nav.sub.gallery.tag": "ARSIP",
    "nav.sub.gallery.previewTitle": "Dokumentasi Riset Visual & Lab",
    "nav.sub.gallery.previewDesc": "Dokumentasi visual eksperimen Deep RL, hackathon PRAGMA internasional, fintech DANA, dan bimbingan akademik.",
    "nav.sub.gallery.previewMetric": "28 ARTEFAK TERVERIFIKASI",

    "nav.sub.achievements.title": "Prestasi",
    "nav.sub.achievements.subtitle": "Pemenang Hackathon PRAGMA & Penghargaan AWS",
    "nav.sub.achievements.tag": "PENGHARGAAN",
    "nav.sub.achievements.previewTitle": "Pemenang Hackathon Kolaboratif PRAGMA",
    "nav.sub.achievements.previewDesc": "Juara kompetisi AI internasional (Thammasat, UCSD, Osaka) dan praktisi cloud AWS bersertifikasi.",
    "nav.sub.achievements.previewMetric": "JUARA 1 TEAMWORK AWARD",

    "nav.sub.resume.title": "Resume",
    "nav.sub.resume.subtitle": "Curriculum Vitae & Predikat Kelulusan",
    "nav.sub.resume.tag": "KREDENSIAL",
    "nav.sub.resume.previewTitle": "CV Akademik & Profesional",
    "nav.sub.resume.previewDesc": "Sarjana Ilmu Komputer, Universitas YARSI dengan IPK 3.92/4.00 (Lulusan Terbaik / Predikat Tertinggi).",
    "nav.sub.resume.previewMetric": "IPK 3.92 • CUMLAUDE",

    "nav.sub.blog.title": "Blog",
    "nav.sub.blog.subtitle": "Publikasi Teknis Neural Archive",
    "nav.sub.blog.tag": "PUBLIKASI",
    "nav.sub.blog.previewTitle": "Publikasi Ilmiah Neural Archive",
    "nav.sub.blog.previewDesc": "Makalah riset mendalam, tolok ukur Decision Transformer, dan formulasi matematis safe RL.",
    "nav.sub.blog.previewMetric": "6 PUBLIKASI TEREVIEW",

    "hero.greeting": "HALO, SAYA RAIHAN GHIFARI WINATA. SAYA MEMBANGUN SISTEM SKALABEL BERBASIS INTELEGENSI.",
    "hero.available": "TERSEDIA UNTUK KOLABORASI",
    "hero.tagline": "Merancang sistem cerdas pada konvergensi Deep Reinforcement Learning, Generative AI (LLMs/VLMs), dan MLOps Produksi.",
    "hero.ctaPrimary": "Jelajahi Karya Unggulan",
    "hero.ctaSecondary": "Hubungi Saya",
    "hero.sysOnline": "SYS: [ONLINE]",
    "hero.hp": "HP: [████████] 100%",
    "hero.level": "LVL.99 ARCHITECT",
    "hero.badgeRole": "AI, Data, & Software Engineer & Peneliti",
    "hero.eyebrow": "SISTEM KECERDASAN OTONOM",
    "hero.headline.1": "MERANCANG",
    "hero.headline.2": "AI OTONOM",
    "hero.headline.3": "& SISTEM TERDISTRIBUSI",
    "hero.subtitle": "Merekayasa arsitektur neural berkinerja tinggi pada Generative Agents, Real-Time Computer Vision, continuous-action Deep Reinforcement Learning, dan pipeline GPU terdistribusi berskala tinggi.",
    "hero.btnExplore": "JELAJAHI_SISTEM",
    "hero.btnEve": "BICARA_DENGAN_EVE",
    "hero.btnCredentials": "KREDENSIAL",
    "hero.eveBubble": "> HALO! SAYA EVE, ASISTEN RISET RAIHAN. JELAJAHI PROYEK PRODUKSI DAN RISETNYA DI BIDANG GEN AI, COMPUTER VISION, DEEP RL, & SISTEM TERDISTRIBUSI.",
    "hero.eveCopilot": "ASISTEN NAVIGASI EVE",
    "hero.chatTrigger": "CHAT ↗",

    "identity.title": "Merancang Sistem Skalabel di Mana Intelegensi Bertemu Rekayasa.",
    "identity.lead": "Sebagai AI Engineer & Peneliti lulusan Universitas Yarsi (IPK 3.92/4.00), saya menghubungkan riset algoritmik mendalam dengan sistem produksi berperforma tinggi, mengubah data klinis dan proses bisnis menjadi solusi AI berdampak nyata.",
    "pillar.1.title": "Safety-Constrained Reinforcement Learning",
    "pillar.1.desc": "Memformulasikan model kebijakan continuous Lagrangian (SAC/TD3) yang membatasi dosis obat ICU dalam batas fisiologis aman.",
    "pillar.2.title": "Production-Grade AI & MLOps",
    "pillar.2.desc": "Mempercepat pipeline pelatihan PyTorch hingga 10x pada cloud AWS, kontainerisasi Docker, dan serving micro-latency FastAPI.",
    "pillar.3.title": "Autonomous Agents & Enterprise RAG",
    "pillar.3.desc": "Merancang orkestrasi multi-agent LangGraph & LangChain, retrieval hybrid vector, routing deterministik, dan pertahanan 3 lapis prompt injection.",
    "pillar.4.title": "Applied Computer Vision & VLMs",
    "pillar.4.desc": "Mendeploy model Vision-Language terkuantisasi (LLaVA/Qwen2-VL) dengan OpenCV untuk inspeksi cacat manufaktur on-premises dan telemetri satelit.",
    "stats.gpa": "IPK 3.92 / 4.00 (Fakultas TI, Univ Yarsi)",
    "stats.speed": "Akselerasi Pelatihan PyTorch di AWS",
    "stats.baseline": "Di Atas Baseline Historis Dokter",
    "stats.mentored": "Mahasiswa Dimentori di 5 Mata Kuliah",

    "cta.consoleHeader": "KONSOL PERINTAH : AKTIF",
    "cta.eyebrow": "INISIASI KOLABORASI",
    "cta.headline": "MARI MERANCANG",
    "cta.subtitle": "Terbuka untuk kolaborasi rekayasa strategis dalam agen AI otonom, continuous deep reinforcement learning, dan infrastruktur terdistribusi kinerja tinggi.",
    "cta.paradigm.0": "SISTEM CERDAS",
    "cta.paradigm.1": "AGEN OTONOM",
    "cta.paradigm.2": "RUNTIME TERDISTRIBUSI",
    "cta.paradigm.3": "PIPELINE KINERJA TINGGI",
    "cta.btnPrimary": "HUBUNGI SAYA",
    "cta.btnSecondary": "CURRICULUM VITAE",
    "cta.footerStatus": "STATUS: TERBUKA UNTUK PELUANG STRATEGIS",
    "cta.footerLatency": "LATENSI RESPON: <24 JAM",
    "cta.footerZone": "ZONA: JAKARTA & BEKASI [UTC+7]",

    "eve.hint.about.tag": "AKADEMIK & SAC RL",
    "eve.hint.about.hint": "Raihan meraih IPK 3.92 dengan model continuous SAC pada dataset MIMIC-III (survival rate 75.31% vs 73.55% baseline dokter).",
    "eve.hint.slider.tag": "SISTEM UNGGULAN",
    "eve.hint.slider.hint": "Menganalisis ensemble kebijakan Safe-RL Sepsis dan platform triase Vision-Language edge.",
    "eve.hint.github.tag": "KODE SUMBER TERBUKA",
    "eve.hint.github.hint": "Repositori terverifikasi pemenang Hackathon PRAGMA dan pipeline Python kinerja tinggi.",
    "eve.hint.kaggle.tag": "KAGGLE & DATASET",
    "eve.hint.kaggle.hint": "Jelajahi kumpulan dataset healthcare AI dan notebook riset Decision Transformer.",
    "eve.hint.contact.tag": "KOLABORASI",
    "eve.hint.contact.hint": "Siap berdiskusi mengenai riset AI, sistem kritis keselamatan, atau peluang kerja rekayasa? Mari terhubung!",

    "projects.title": "Portofolio Rekayasa & Riset Unggulan",
    "projects.lead": "Portofolio terpilih mencakup arsitektur deep learning, agen reinforcement learning, inspeksi visual industri, dan sistem full-stack.",
    "filter.all": "Semua Sistem",
    "filter.healthcare": "Deep RL & Kesehatan",
    "filter.agents": "GenAI & Agen AI",
    "filter.vision": "Computer Vision & VLM",
    "filter.fullstack": "Fullstack & Cloud",
    "skills.title": "Keahlian Teknis & Stack",
    "skills.lead": "Framework, arsitektur, dan ekosistem pengembangan yang dikuasai untuk riset AI dan rekayasa perangkat lunak produksi.",
    "experience.title": "Pengalaman Kerja Profesional",
    "experience.lead": "Pengalaman langsung dalam memimpin riset deep learning, rekayasa laboratorium AI, dan pengajaran mahasiswa universitas.",
    "organizations.title": "Organisasi & Kepemimpinan Teknis",
    "organizations.lead": "Mendorong kepemimpinan kampus, bimbingan mahasiswa, dan kolaborasi internasional antar universitas.",
    "education.title": "Latar Belakang Akademik & Prestasi",
    "education.lead": "Pendidikan tinggi formal, predikat akademik tertinggi (IPK 3.92), dan riset tugas akhir mendalam.",
    "awards.title": "Prestasi & Sertifikasi Terverifikasi",
    "awards.lead": "Pengakuan dari hackathon internasional, kompetisi AI nasional, dan sertifikasi cloud global.",
    "contact.title": "Mari Membangun Solusi Cerdas Bersama",
    "contact.lead": "Terbuka untuk peluang AI/ML Engineer global, kolaborasi riset klinis, dan konsultasi sistem cerdas.",
    "contact.infoTitle": "Saluran Komunikasi",
    "contact.infoDesc": "Punya tantangan rekayasa data, inisiatif riset, atau peluang kerja? Hubungi saya langsung:",
    "contact.formTitle": "Kirim Pesan",
    "contact.labelName": "NAMA ANDA",
    "contact.labelEmail": "ALAMAT EMAIL",
    "contact.labelSubject": "SUBJEK / PROYEK",
    "contact.labelMessage": "PESAN",
    "contact.submitBtn": "Kirimkan Pesan",
    "faq.title": "Pertanyaan yang Sering Diajukan",
    "faq.q1": "Apa bidang spesialisasi utama Anda?",
    "faq.a1": "Saya berspesialisasi dalam Deep Reinforcement Learning (SAC, DQN, TD3 untuk sistem rekomendasi dosis klinis), Generative AI & Sistem Agen (LLMs, LangGraph, RAG dengan pertahanan prompt), dan Computer Vision/VLM untuk inspeksi cacat industri.",
    "faq.q2": "Apakah Anda terbuka untuk posisi full-time, riset, atau konsultasi?",
    "faq.a2": "Ya, saya sangat terbuka untuk peluang posisi AI/ML Engineer (remote, hybrid, atau on-site), kolaborasi riset healthcare AI, maupun konsultasi arsitektur sistem.",
    "faq.q3": "Apa teknologi utama yang Anda gunakan dalam produksi?",
    "faq.a3": "Untuk pemodelan dan pelatihan: PyTorch, Python, Scikit-learn, CUDA. Untuk serving dan orkestrasi: FastAPI, Docker, AWS (EC2/S3), LangGraph. Untuk dashboard interaktif: Next.js, TypeScript, Tailwind CSS, PostgreSQL."
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "transformer-clinical",
    title: "Transformer-Based Clinical Decision Support",
    subtitle: "PRAGMA Collaborative Hackathon Winner (Asia-Pacific)",
    category: "healthcare",
    badge: "PRAGMA HACKATHON WINNER",
    badgeType: "gold",
    image: "/gallery/FotoSC1.webp",
    description: "Co-developed a Decision Transformer pipeline predicting continuous ICU drug dosages from longitudinal physiological trajectories (MIMIC-III). Validated policies against clinicians using Off-Policy Evaluation (OPE).",
    tags: ["PyTorch", "Decision Transformer", "MIMIC-III", "Off-Policy Eval", "Time-Series"],
    github: "https://github.com/raihanghifariw/Transformers_TreatmentRecommendation",
    demo: null,
    deepDive: {
      challenge: "Optimizing ICU continuous vasopressor and IV fluid dosages requires modeling complex multi-step temporal dependencies while avoiding fatal hemodynamic instability.",
      architecture: "Causal sequence-to-sequence Decision Transformer with 8-head self-attention conditioned on patient state trajectories, continuous action vectors, and return-to-go targets.",
      results: "Achieved superior estimated patient survival trajectories compared to clinical baseline baselines on retrospective ICU episodes. Validated with Calibrated Doubly Robust estimators.",
      stack: ["Python", "PyTorch", "NumPy", "Pandas", "CUDA Parallel", "MIMIC-III"]
    }
  },
  {
    id: "sepsis-rl-ensemble",
    title: "Ensemble SAC Sepsis Treatment Recommendation",
    subtitle: "Yarsi University Research Thesis & Lab AI",
    category: "healthcare",
    badge: "RESEARCH THESIS",
    badgeType: "cyan",
    image: "/project/Sepsis_Treatment_Recommendation.jpeg",
    description: "Ensemble of 5 Soft Actor-Critic (SAC) agents with median action aggregation and dynamic Lagrangian safety constraints on Mean Arterial Pressure (MAP) and fluid balance.",
    tags: ["Deep RL", "Soft Actor-Critic (SAC)", "Lagrangian Constraints", "Autoencoder", "MIMIC-III"],
    github: "https://github.com/raihanghifariw/RLEnsembleSepsiRecommendations",
    demo: null,
    deepDive: {
      challenge: "Clinical sepsis management involves extreme physiological volatility, noisy laboratory measurements, and the strict requirement that dosages remain within safe medical boundaries.",
      architecture: "Denoising Autoencoder (37 clinical features compressed into 24-D latent space) feeding an ensemble of 5 SAC continuous agents with dynamic Lagrangian boundary penalties and Smooth L1 Loss.",
      results: "Attained 75.31% estimated survival rate outperforming historical clinician baseline of 73.55%. Stabilized Effective Sample Size (ESS) at 1374.",
      stack: ["PyTorch", "Deep RL (SAC)", "Denoising Autoencoders", "MIMIC-III", "AWS EC2"]
    }
  },
  {
    id: "vlm-defect-triage",
    title: "VLM & Classical CV Industrial Defect Triage",
    subtitle: "On-Premises Edge Vision-Language Pipeline",
    category: "vision",
    badge: "ON-PREM EDGE VLM",
    badgeType: "purple",
    image: "/project/AI-Defect_Triage.png",
    description: "Hybrid vision inspection combining local Vision-Language Models (LLaVA via Ollama) with classical OpenCV object detection for automated smartphone defect classification.",
    tags: ["Computer Vision", "LLaVA", "Ollama", "OpenCV", "Docker", "Quantization"],
    github: "https://github.com/raihanghifariw/vlm-cv-defect-triage",
    demo: null,
    deepDive: {
      challenge: "Factory floor defect inspection requires zero-shot adaptability to novel defect classes without sending sensitive manufacturing images to public cloud APIs.",
      architecture: "Asynchronous pipeline coupling OpenCV spatial anomaly extraction with local quantized 4-bit LLaVA inference, outputting structured Pydantic-validated JSON triage reports.",
      results: "Real-time edge processing (~42ms latency), robust classification accuracy across high-noise lighting variations, fully containerized in Docker.",
      stack: ["Python", "LLaVA", "Ollama", "OpenCV", "Pydantic", "Docker", "Streamlit"]
    }
  },
  {
    id: "agentic-ops-rag",
    title: "Agentic Ops Enterprise RAG System",
    subtitle: "Internal Operations AI Agent with Prompt Shield",
    category: "agents",
    badge: "31/31 UNIT TESTS PASS",
    badgeType: "cyan",
    image: "/project/terraflowplatform1.webp",
    description: "Enterprise operations AI agent featuring hybrid semantic search, deterministic tool routing, strict Pydantic JSON validation, and a 3-layer prompt-injection defense barrier.",
    tags: ["Gemini", "LangChain", "RAG", "Prompt Shield", "Pydantic", "Docker"],
    github: "https://github.com/raihanghifariw/agentic-ops-rag-system",
    demo: null,
    deepDive: {
      challenge: "Enterprise AI agents frequently suffer from prompt injection vulnerabilities, hallucinated tool calls, and non-deterministic schema violations.",
      architecture: "LangChain / LangGraph orchestration with ChromaDB vector search + BM25 hybrid ranking, strict Pydantic output parsing, and multi-layer input sanitization.",
      results: "100% intent-accuracy evaluation score across benchmarked queries, 31/31 automated unit tests passing, production Docker deployment.",
      stack: ["Python", "Gemini API", "ChromaDB", "LangChain", "Pydantic", "Docker"]
    }
  },
  {
    id: "aero-flare",
    title: "Aero-Flare Autonomous Wildfire Intelligence",
    subtitle: "NASA Satellite Ingestion & Multi-Modal Command",
    category: "vision",
    badge: "LIVE VERCEL DEMO",
    badgeType: "gold",
    image: "/project/Aero-flare-project.png",
    description: "Wildfire intelligence platform integrating real-time NASA FIRMS satellite telemetry, Qwen2-VL multimodal triage, XGBoost spread forecasting, and a Next.js Leaflet tactical dashboard.",
    tags: ["FastAPI", "Next.js 14", "Qwen2-VL", "XGBoost", "Leaflet GIS", "NASA FIRMS"],
    github: "https://github.com/raihanghifariw/aero-flare",
    demo: "https://aero-flare.vercel.app",
    deepDive: {
      challenge: "Emergency response teams require early wildfire detection and accurate 6h/12h/24h spread forecasts before ground crews can be deployed.",
      architecture: "FastAPI ingestion worker fetching NASA VIIRS thermal coordinates, Qwen2-VL multimodal image triage, XGBoost spread regression, and Next.js 14 Leaflet tactical GIS UI.",
      results: "Interactive tactical command map with dynamic heatmap buffers, real-time hotspot categorization, deployed live on Vercel.",
      stack: ["Python", "FastAPI", "Next.js 14", "Leaflet", "Qwen2-VL", "XGBoost", "NASA FIRMS API"]
    }
  },
  {
    id: "sharing-vision",
    title: "Sharing Vision Fullstack Application",
    subtitle: "High-Performance Go REST API & TypeScript Frontend",
    category: "fullstack",
    badge: "LIVE VERCEL DEMO",
    badgeType: "purple",
    image: "/assets/img/projects/project-sharing-vision.svg",
    description: "Full-stack article and telemetry management platform: concurrent Go (Golang) RESTful backend paired with a modular TypeScript React dashboard.",
    tags: ["Go (Golang)", "TypeScript", "RESTful API", "PostgreSQL", "React", "Vercel"],
    github: "https://github.com/raihanghifariw/sharing-vision-fe-repo",
    demo: "https://sharing-vision-fe-repo.vercel.app",
    deepDive: {
      challenge: "Building a high-concurrency content and workflow management system with sub-millisecond database queries and clean pagination.",
      architecture: "Go Gin backend utilizing GORM ORM connected to PostgreSQL, paired with a React TypeScript frontend featuring optimistic UI updates.",
      results: "Sub-5ms API response latency, clean code architecture, live deployment on Vercel with automated CI/CD.",
      stack: ["Go (Golang)", "Gin", "PostgreSQL", "TypeScript", "React", "Tailwind CSS", "Vercel"]
    }
  }
];

export const WORK_EXPERIENCES: ExperienceItem[] = [
  {
    id: "lab-ai-researcher",
    period: "08/2025 - 01/2026",
    organization: "LAB AI UNIVERSITAS YARSI",
    role: "Artificial Intelligence Researcher",
    active: true,
    tasks: [
      "Engineered a clinical data pipeline that filtered 94,458 raw ICU stays down to a refined Sepsis-3 cohort of 35,608 episodes with automated missing-value imputation.",
      "Architected a denoising Autoencoder compressing 37 clinical features into a 24-dimensional latent space, speeding model convergence.",
      "Trained an ensemble of 5 Soft Actor-Critic (SAC) agents with median action aggregation to optimize continuous dosage recommendations."
    ],
    impact: [
      "Achieved an estimated 75.31% survival rate and expected return of 17.24 (outperforming historical clinician baseline of 73.55%).",
      "Enforced dynamic Lagrangian Safety Constraints on Mean Arterial Pressure (MAP) and fluid balance; validated reliability with a Calibrated Doubly Robust estimator (ESS 1374)."
    ],
    tags: ["Deep RL", "SAC", "Lagrangian Constraints", "Clinical AI", "Denoising Autoencoder"]
  },
  {
    id: "lab-ehealth-intern",
    period: "02/2025 - 07/2025",
    organization: "LAB E-HEALTH UNIVERSITAS YARSI",
    role: "Artificial Intelligence Intern",
    tasks: [
      "Architected a temporal data extraction pipeline from the MIMIC-III database, parsing 61,532 ICU admissions into 20,913 clean clinical trajectories across 4-hour time steps.",
      "Built an Ensemble Weighted Dueling Double Deep Q-Network (EWD3QN) leveraging the preprocessed dataset to evaluate 25 discrete clinical action combinations."
    ],
    impact: [
      "Achieved a 92.4% estimated survival rate (significantly surpassing the 83.26% clinician baseline) and a cumulative expected return of 23.6 vs 14.11.",
      "Reduced training epoch duration from 20 minutes down to ~2 minutes using optimized GPU parallel processing and Smooth L1 Huber Loss."
    ],
    tags: ["MIMIC-III", "EWD3QN", "GPU Parallel", "Temporal Modeling", "Huber Loss"]
  },
  {
    id: "assistant-lecturer",
    period: "09/2023 - 04/2026",
    organization: "UNIVERSITAS YARSI",
    role: "Assistant Lecturer / Lab Instructor",
    tasks: [
      "Mentored 100+ Computer Science students across 5 core courses: Specialization AI Track, Artificial Intelligence, Data Structures, OOP, and Algorithm Fundamentals.",
      "Delivered 14 weekly lab sessions per semester, translating advanced Deep Learning architectures into practical Python/Java assignments."
    ],
    impact: [
      "Conducted technical code reviews and provided rigorous model performance feedback, contributing to a 70% increase in average student project scores."
    ],
    tags: ["AI Track Mentorship", "Code Review", "Python / Java Labs", "Deep Learning"]
  }
];

export const ORGANIZATIONS_DATA: OrganizationItem[] = [
  {
    id: "fit-senate",
    period: "08/2023 - 12/2024",
    organization: "SENAT MAHASISWA FTI UNIVERSITAS YARSI",
    role: "Head of Communication Department",
    active: true,
    highlights: [
      "Led a creative and media team managing digital publications, event broadcasting, and technical symposium communications for the Faculty of Information Technology.",
      "Orchestrated cross-departmental campaign strategies reaching 1,000+ university community members, improving event attendance and student participation.",
      "Structured digital asset pipelines and standardized public relations branding across official university media channels."
    ],
    tags: ["Student Senate", "Team Leadership", "Media Strategy", "Public Relations"]
  },
  {
    id: "pragma-liaison",
    period: "01/2026",
    organization: "PRAGMA ASIA-PACIFIC CONSORTIUM",
    role: "Technical Committee Liaison",
    highlights: [
      "Coordinated international logistics and collaborative research workflows for the Pacific Rim Application and Grid Middleware Assembly across 15 Asia-Pacific partner institutions.",
      "Collaborated with delegates from Thammasat University, UCSD, and Osaka University on cloud compute and AI challenge tracks."
    ],
    tags: ["International Committee", "PRAGMA", "UCSD", "Osaka University", "Thammasat"]
  },
  {
    id: "distance-learning",
    period: "2023 - 2024",
    organization: "DIRECTORATE OF DISTANCE LEARNING",
    role: "Lead Student Mentor",
    highlights: [
      "Mentored incoming freshmen on navigating online learning systems, collaborative coding platforms, and foundational computer science study methodologies.",
      "Conducted onboarding orientation workshops on Git version control and remote computing setup."
    ],
    tags: ["Student Mentorship", "Orientation", "Distance Learning"]
  }
];

export const EDUCATION_DATA: EducationItem = {
  period: "09/2022 - 04/2026 : BACHELOR OF COMPUTER SCIENCE",
  degree: "Bachelor of Computer Science (S.Kom.)",
  institution: "Universitas Yarsi",
  faculty: "Faculty of Information Technology • Jakarta, Indonesia",
  gpa: "3.92 / 4.00",
  thesis: {
    label: "UNDERGRADUATE THESIS RESEARCH",
    title: '"Development of a Soft Actor-Critic Model Based on Ensemble Q-Learning for Sepsis Treatment Recommendation with Continuous Action Representation"',
    description: "Formulating continuous reinforcement learning policies with 5-agent SAC ensembles, denoising autoencoders, and dynamic Lagrangian safety corridor boundaries to optimize clinical fluid and vasopressor dosages for critical ICU patients."
  },
  coursework: [
    "Deep Learning & Reinforcement Learning",
    "Artificial Intelligence",
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Linear Algebra & Calculus",
    "Probability & Statistics",
    "Cloud & Distributed Systems",
    "Object-Oriented Programming (OOP)"
  ]
};

export const AWARDS_DATA: AwardItem[] = [
  {
    id: "pragma-award",
    period: "01/2026 : HACKATHON WINNER",
    badge: "HACKATHON WINNER",
    icon: "🏆",
    title: "PRAGMA Collaborative Hackathon Award",
    issuer: "Thammasat University, UCSD, Osaka University",
    description: "Winner Teamwork Award at a prestigious 15-university Asia-Pacific hackathon for co-developing a Decision Transformer pipeline predicting continuous ICU drug dosages."
  },
  {
    id: "samsung-innovation",
    period: "09/2024 : NATIONAL COMPETITION",
    badge: "NATIONAL COMPETITION",
    icon: "🌟",
    title: "Samsung Innovation Campus Semi-Finalist",
    issuer: "Skilvul & Samsung",
    description: "Ranked as Semi-Finalist in a national Samsung-sponsored Artificial Intelligence competition among 5,000+ competitive participants."
  },
  {
    id: "aws-cert",
    period: "09/2025 : AWS CERTIFIED",
    badge: "AWS CERTIFIED",
    icon: "📜",
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services (Score: 826 / 1000)",
    description: "Verified expertise in cloud AI infrastructure, foundation models, machine learning lifecycle, and responsible AI deployment."
  },
  {
    id: "citi-toeic",
    period: "RESEARCH & PROFICIENCY",
    badge: "ETHICS & PROFICIENCY",
    icon: "🌐",
    title: "Research Ethics & TOEIC English",
    issuer: "CITI Program & ETS TOEIC",
    description: "CITI certified in Data/Specimens Only Research and Conflicts of Interest. ETS TOEIC Score: 605 with fluent professional English communication."
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    qKey: "faq.q1",
    aKey: "faq.a1",
    qFallback: "What are your primary areas of engineering & research specialization?",
    aFallback: "I specialize in Deep Reinforcement Learning (SAC, DQN, TD3 applied to clinical decision support with safety constraints), Generative AI & Agentic Systems (LLMs, LangChain/LangGraph, RAG pipelines with prompt-injection defenses), and Computer Vision / VLMs for automated industrial inspection."
  },
  {
    qKey: "faq.q2",
    aKey: "faq.a2",
    qFallback: "Are you available for full-time roles, research collaborations, or consulting?",
    aFallback: "Yes, I am actively open to full-time AI/ML Engineer opportunities globally (remote, hybrid, or on-site), as well as clinical healthcare AI research collaborations and enterprise system design consulting."
  },
  {
    qKey: "faq.q3",
    aKey: "faq.a3",
    qFallback: "What is your typical production tech stack?",
    aFallback: "For model training and evaluation: PyTorch, Python, Scikit-learn, CUDA. For serving and orchestration: FastAPI, Docker, AWS (EC2/S3), LangGraph. For full-stack dashboards and GIS telemetry: Next.js, TypeScript, Tailwind CSS, PostgreSQL."
  }
];

export const STRATEGIC_DIRECTIVES: StrategicDirective[] = [
  {
    id: "dir-01",
    number: "# 01",
    title: "PROBLEM SOLVING",
    description: "Interpersonal and analytical resolution of engineering bottlenecks in mission-critical environments.",
    iconName: "puzzle"
  },
  {
    id: "dir-02",
    number: "# 02",
    title: "SYSTEMIC THINKING",
    description: "Designing robust, scalable, end-to-end architectures connecting raw data to user value.",
    iconName: "git-merge"
  },
  {
    id: "dir-03",
    number: "# 03",
    title: "CRITICAL THINKING",
    description: "Analytical approach to solving complex engineering challenges with empirical validation.",
    iconName: "brain"
  },
  {
    id: "dir-04",
    number: "# 04",
    title: "CONTINUOUS LEARNING",
    description: "Staying updated with state-of-the-art AI research, model architectures, and emerging paradigms.",
    iconName: "book-open"
  },
  {
    id: "dir-05",
    number: "# 05",
    title: "ANALYTICAL THINKING",
    description: "Breaking down complex high-dimensional data into actionable insights and strategic decisions.",
    iconName: "line-chart"
  },
  {
    id: "dir-06",
    number: "# 06",
    title: "ADAPTABILITY",
    description: "Quickly mastering new frameworks, hardware accelerators, and cutting-edge AI models.",
    iconName: "refresh-cw"
  },
  {
    id: "dir-07",
    number: "# 07",
    title: "LEADERSHIP",
    description: "Leading engineering teams, guiding student cohorts, and managing complex technical projects.",
    iconName: "users"
  },
  {
    id: "dir-08",
    number: "# 08",
    title: "COMMUNICATION",
    description: "Translating complex mathematical and AI concepts into clear narratives for stakeholders.",
    iconName: "message-square"
  },
  {
    id: "dir-09",
    number: "# 09",
    title: "TEAMWORK",
    description: "Collaborative development in cross-functional agile teams and international research consortia.",
    iconName: "handshake"
  },
  {
    id: "dir-10",
    number: "# 10",
    title: "RESEARCH SKILLS",
    description: "In-depth literature review, empirical experimentation, and peer-reviewed academic contribution.",
    iconName: "search"
  }
];

export const CORE_FOCUS_DOMAINS: CoreFocusDomain[] = [
  {
    id: "applied-ai",
    title: "Applied AI",
    skills: [
      {
        id: "ai-agents",
        title: "AI Agents & Autonomy",
        level: "BEGINNER",
        description: "Designing autonomous systems with recursive reasoning and decision-making capabilities.",
        proficiencyScore: 85
      },
      {
        id: "llm",
        title: "Large Language Models (LLM)",
        level: "INTERMEDIATE",
        description: "Expertise in fine-tuning open source models, RAG architectures, and prompt engineering.",
        proficiencyScore: 92
      },
      {
        id: "data-science",
        title: "Data Science",
        level: "EXPERT",
        description: "Advanced statistical analysis and predictive modeling to extract insights from big data.",
        proficiencyScore: 96
      },
      {
        id: "deep-learning",
        title: "Deep Learning (CV/NLP)",
        level: "ADVANCED",
        description: "Architecting deep neural networks for complex computer vision and natural language tasks.",
        proficiencyScore: 94
      },
      {
        id: "computer-vision",
        title: "Computer Vision",
        level: "INTERMEDIATE",
        description: "Developing real-time object detection, pattern recognition, and spatial analysis systems.",
        proficiencyScore: 88
      },
      {
        id: "mlops",
        title: "Machine Learning Ops",
        level: "ADVANCED",
        description: "Implementing robust pipelines for model training, deployment, and performance monitoring.",
        proficiencyScore: 90
      }
    ]
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    skills: [
      {
        id: "system-architecture",
        title: "System Architecture",
        level: "INTERMEDIATE",
        description: "Designing robust, scalable, and high-performance system architectures for complex applications.",
        proficiencyScore: 89
      },
      {
        id: "fullstack-dev",
        title: "Full Stack Development",
        level: "EXPERT",
        description: "Engineering scalable web architectures from pixel-perfect frontends to robust databases.",
        proficiencyScore: 95
      },
      {
        id: "system-analysis",
        title: "System Analysis",
        level: "ADVANCED",
        description: "Translating complex stakeholder requirements into efficient and scalable technical blueprints.",
        proficiencyScore: 91
      },
      {
        id: "sdlc",
        title: "SDLC",
        level: "INTERMEDIATE",
        description: "Governing the entire life cycle of software development with a focus on quality and agility.",
        proficiencyScore: 88
      },
      {
        id: "software-design",
        title: "Software Design",
        level: "ADVANCED",
        description: "Applying architectural patterns and principles to build maintainable and modular systems.",
        proficiencyScore: 92
      },
      {
        id: "requirement-specs",
        title: "Requirement Specifications",
        level: "ADVANCED",
        description: "Defining clear, precise, and actionable technical documentation for engineering teams.",
        proficiencyScore: 90
      }
    ]
  },
  {
    id: "additional-skills",
    title: "Additional Skills",
    skills: [
      {
        id: "devops",
        title: "DevOps",
        level: "ADVANCED",
        description: "Streamlining development workflows and infrastructure management through automation.",
        proficiencyScore: 89
      },
      {
        id: "data-analytics",
        title: "Data Analytics",
        level: "ADVANCED",
        description: "Transforming raw data into meaningful visualizations and strategic intelligence.",
        proficiencyScore: 93
      },
      {
        id: "data-vis",
        title: "Data Visualization",
        level: "EXPERT",
        description: "Crafting intuitive and interactive dashboards to communicate complex data findings.",
        proficiencyScore: 94
      },
      {
        id: "sql-dbms",
        title: "SQL & DBMS",
        level: "EXPERT",
        description: "Architecting and optimizing relational database schemas for high-performance applications.",
        proficiencyScore: 96
      },
      {
        id: "docker-k8s",
        title: "Docker & Kubernetes",
        level: "INTERMEDIATE",
        description: "Containerizing applications for consistent deployment and orchestrating cloud resources.",
        proficiencyScore: 87
      },
      {
        id: "wazuh",
        title: "Wazuh",
        level: "BEGINNER",
        description: "Exploring open-source security monitoring for threat detection and compliance.",
        proficiencyScore: 78
      },
      {
        id: "network-traffic",
        title: "Network Traffic Analysis",
        level: "BEGINNER",
        description: "Analyzing packet captures to identify anomalies and optimize network performance.",
        proficiencyScore: 80
      },
      {
        id: "socket-prog",
        title: "Socket Programming",
        level: "EXPERT",
        description: "Implementing low-level network communication protocols for real-time data transfer.",
        proficiencyScore: 94
      },
      {
        id: "gcp",
        title: "Google Cloud Platform",
        level: "BEGINNER",
        description: "Utilizing cloud infrastructure and services for scalable application hosting.",
        proficiencyScore: 82
      },
      {
        id: "solidity",
        title: "Solidity",
        level: "BEGINNER",
        description: "Writing secure smart contracts for decentralized applications on Ethereum.",
        proficiencyScore: 79
      },
      {
        id: "dapps",
        title: "Decentralized Applications (DApps)",
        level: "BEGINNER",
        description: "Developing web applications that interact with blockchain smart contracts.",
        proficiencyScore: 80
      },
      {
        id: "blockchain-arch",
        title: "Blockchain Architecture",
        level: "BEGINNER",
        description: "Understanding the fundamental principles of distributed ledger technologies.",
        proficiencyScore: 81
      }
    ]
  }
];

export const ENGINEERING_FOUNDATION_TECHS: EngineeringTechItem[] = [
  {
    id: "python",
    name: "Python",
    description: "High-performance AI modeling, numerical computation, and automated pipelines.",
    category: "Language",
    iconKey: "python",
    color: "#3776ab"
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "Type-safe scalable application logic with strict compile-time safety.",
    category: "Language",
    iconKey: "typescript",
    color: "#3178c6"
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Dynamic and interactive web development and asynchronous runtime execution.",
    category: "Language",
    iconKey: "javascript",
    color: "#f7df1e"
  },
  {
    id: "solidity",
    name: "Solidity",
    description: "Immutable blockchain smart contracts for deterministic protocol logic.",
    category: "Language",
    iconKey: "solidity",
    color: "#363636"
  },
  {
    id: "react",
    name: "React",
    description: "Interactive component-based user interfaces with declarative state paradigms.",
    category: "Framework",
    iconKey: "react",
    color: "#61dafb"
  },
  {
    id: "nextjs",
    name: "Next.js",
    description: "Production-grade React application framework with hybrid SSR/SSG rendering.",
    category: "Framework",
    iconKey: "nextjs",
    color: "#ffffff"
  },
  {
    id: "nodejs",
    name: "Node.js",
    description: "Scalable asynchronous server-side execution and event-driven architecture.",
    category: "Framework",
    iconKey: "nodejs",
    color: "#339933"
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    description: "Deep learning and neural network architectures with production deployment.",
    category: "AI",
    iconKey: "tensorflow",
    color: "#ff6f00"
  },
  {
    id: "scikit-learn",
    name: "Scikit-learn",
    description: "Predictive data analysis, statistical modeling, and machine learning pipelines.",
    category: "AI",
    iconKey: "scikitlearn",
    color: "#f7931e"
  },
  {
    id: "pandas",
    name: "Pandas",
    description: "High-performance data manipulation, temporal indexing, and analytics.",
    category: "Data",
    iconKey: "pandas",
    color: "#150458"
  },
  {
    id: "numpy",
    name: "NumPy",
    description: "Fundamental scientific computing, matrix algebra, and vector operations.",
    category: "Data",
    iconKey: "numpy",
    color: "#013243"
  },
  {
    id: "matplotlib",
    name: "Matplotlib",
    description: "Publication-grade scientific visualizations and clinical charts.",
    category: "Data",
    iconKey: "matplotlib",
    color: "#11557c"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description: "Rapid utility-first styling, design system tokens, and fluid typography.",
    category: "Framework",
    iconKey: "tailwind",
    color: "#06b6d4"
  },
  {
    id: "redis",
    name: "Redis",
    description: "In-memory data structure store, caching layer, and pub/sub message broker.",
    category: "Data",
    iconKey: "redis",
    color: "#dc382d"
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "Robust relational database architecture with strict ACID compliance.",
    category: "Data",
    iconKey: "postgresql",
    color: "#4169e1"
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Automated container deployment, horizontal autoscaling, and pod orchestration.",
    category: "Cloud",
    iconKey: "kubernetes",
    color: "#326ce5"
  },
  {
    id: "docker",
    name: "Docker",
    description: "Standardized containerized environments for reproducible ML workflows.",
    category: "Cloud",
    iconKey: "docker",
    color: "#2496ed"
  },
  {
    id: "terraform",
    name: "Terraform",
    description: "Infrastructure as code provisioning for multi-cloud enterprise architectures.",
    category: "Cloud",
    iconKey: "terraform",
    color: "#7b42bc"
  },
  {
    id: "langchain",
    name: "LangChain",
    description: "Large language model application orchestration and agent state graphs.",
    category: "AI",
    iconKey: "langchain",
    color: "#000000"
  },
  {
    id: "mistral",
    name: "Mistral AI",
    description: "Building cutting-edge Mistral and Mixtral open-weight architectures.",
    category: "AI",
    iconKey: "mistral",
    color: "#f2a73b"
  },
  {
    id: "pytorch",
    name: "PyTorch",
    description: "Dynamic neural networks, CUDA parallel compute, and deep RL research.",
    category: "AI",
    iconKey: "pytorch",
    color: "#ee4c2c"
  },
  {
    id: "opencv",
    name: "OpenCV",
    description: "Real-time computer vision capabilities, spatial filters, and image processing.",
    category: "AI",
    iconKey: "opencv",
    color: "#5c3ee8"
  },
  {
    id: "fastapi",
    name: "FastAPI",
    description: "High-throughput asynchronous Python APIs with automatic OpenAPI schemas.",
    category: "Framework",
    iconKey: "fastapi",
    color: "#009688"
  },
  {
    id: "flask",
    name: "Flask",
    description: "Micro web framework for lightweight AI inference and rapid prototyping.",
    category: "Framework",
    iconKey: "flask",
    color: "#000000"
  }
];

export const PROFESSIONAL_TOOLS_ROW1: ToolingItem[] = [
  { id: "github", name: "GITHUB", iconKey: "github", category: "vcs" },
  { id: "vscode", name: "VS CODE", iconKey: "vscode", category: "editor" },
  { id: "jupyter", name: "JUPYTER", iconKey: "jupyter", category: "ml" },
  { id: "colab", name: "GOOGLE COLAB", iconKey: "colab", category: "ml" },
  { id: "figma", name: "FIGMA", iconKey: "figma", category: "design" },
  { id: "postman", name: "POSTMAN", iconKey: "postman", category: "infra" },
  { id: "git", name: "GIT", iconKey: "git", category: "vcs" },
  { id: "aws", name: "AWS CLOUD", iconKey: "aws", category: "infra" }
];

export const PROFESSIONAL_TOOLS_ROW2: ToolingItem[] = [
  { id: "linux", name: "LINUX", iconKey: "linux", category: "os" },
  { id: "postman-2", name: "POSTMAN", iconKey: "postman", category: "infra" },
  { id: "git-2", name: "GIT", iconKey: "git", category: "vcs" },
  { id: "docker-tool", name: "DOCKER", iconKey: "docker", category: "infra" },
  { id: "conda", name: "CONDA", iconKey: "conda", category: "ml" },
  { id: "linux-2", name: "LINUX", iconKey: "linux", category: "os" },
  { id: "terraform-tool", name: "TERRAFORM", iconKey: "terraform", category: "infra" },
  { id: "postgres-tool", name: "POSTGRESQL", iconKey: "postgresql", category: "infra" }
];

export const PROJECTS_DATA_ID: Project[] = [
  {
    id: "transformer-clinical",
    title: "Sistem Rekomendasi Klinis Berbasis Transformer",
    subtitle: "Pemenang Hackathon Kolaboratif PRAGMA (Asia-Pasifik)",
    category: "healthcare",
    badge: "JUARA HACKATHON PRAGMA",
    badgeType: "gold",
    image: "/gallery/FotoSC1.webp",
    description: "Mengembangkan pipeline Decision Transformer untuk memprediksi dosis obat kontinu pasien ICU dari trajektori fisiologis longitudinal (MIMIC-III). Validasi kebijakan terhadap dokter ahli menggunakan Off-Policy Evaluation (OPE).",
    tags: ["PyTorch", "Decision Transformer", "MIMIC-III", "Off-Policy Eval", "Time-Series"],
    github: "https://github.com/raihanghifariw/Transformers_TreatmentRecommendation",
    demo: null,
    deepDive: {
      challenge: "Mengoptimalkan dosis vasopressor dan cairan infus kontinu di ICU memerlukan pemodelan dependensi temporal multi-langkah yang kompleks tanpa memicu instabilitas hemodinamik fatal.",
      architecture: "Decision Transformer sequence-to-sequence kausal dengan 8-head self-attention berdasarkan trajektori status pasien, vektor aksi kontinu, dan target return-to-go.",
      results: "Mencapai estimasi trajektori kelangsungan hidup pasien yang melampaui baseline historis dokter pada episode retrospektif ICU. Divalidasi dengan estimator Calibrated Doubly Robust.",
      stack: ["Python", "PyTorch", "NumPy", "Pandas", "CUDA Parallel", "MIMIC-III"]
    }
  },
  {
    id: "sepsis-rl-ensemble",
    title: "Rekomendasi Pengobatan Sepsis Berbasis Ensemble SAC",
    subtitle: "Tesis Riset & Lab AI Universitas YARSI",
    category: "healthcare",
    badge: "TESIS RISET",
    badgeType: "cyan",
    image: "/project/Sepsis_Treatment_Recommendation.jpeg",
    description: "Ensemble 5 agen Soft Actor-Critic (SAC) dengan agregasi aksi median serta batasan keselamatan Lagrangian dinamis pada Mean Arterial Pressure (MAP) dan keseimbangan cairan.",
    tags: ["Deep RL", "Soft Actor-Critic (SAC)", "Batasan Lagrangian", "Autoencoder", "MIMIC-III"],
    github: "https://github.com/raihanghifariw/RLEnsembleSepsiRecommendations",
    demo: null,
    deepDive: {
      challenge: "Penanganan sepsis klinis melibatkan volatilitas fisiologis ekstrem, pengukuran laboratorium berderau tinggi, dan keharusan ketat agar dosis obat tetap berada di dalam batas aman medis.",
      architecture: "Denoising Autoencoder (37 fitur klinis dikompresi ke ruang laten 24 dimensi) terhubung ke ensemble 5 agen kontinu SAC dengan penalti batas Lagrangian dinamis dan Smooth L1 Loss.",
      results: "Meraih estimasi tingkat kelangsungan hidup 75.31%, melampaui baseline historis dokter sebesar 73.55%. Menstabilkan Effective Sample Size (ESS) pada angka 1374.",
      stack: ["PyTorch", "Deep RL (SAC)", "Denoising Autoencoder", "MIMIC-III", "AWS EC2"]
    }
  },
  {
    id: "vlm-defect-triage",
    title: "Triase Cacat Industri Berbasis VLM & CV Klasik",
    subtitle: "Pipeline Vision-Language Edge On-Premises",
    category: "vision",
    badge: "EDGE VLM ON-PREM",
    badgeType: "purple",
    image: "/project/AI-Defect_Triage.png",
    description: "Inspeksi visual hibrida yang menggabungkan Vision-Language Model lokal (LLaVA melalui Ollama) dengan deteksi objek OpenCV klasik untuk klasifikasi cacat smartphone otomatis.",
    tags: ["Computer Vision", "LLaVA", "Ollama", "OpenCV", "Docker", "Kuantisasi"],
    github: "https://github.com/raihanghifariw/vlm-cv-defect-triage",
    demo: null,
    deepDive: {
      challenge: "Inspeksi cacat di lini perakitan pabrik memerlukan kemampuan adaptasi zero-shot terhadap jenis cacat baru tanpa mengirim gambar manufaktur rahasia ke API cloud publik.",
      architecture: "Pipeline asinkron yang memadukan ekstraksi anomali spasial OpenCV dengan inferensi LLaVA 4-bit terkuantisasi lokal, menghasilkan laporan triase JSON tervalidasi Pydantic.",
      results: "Pemrosesan edge real-time (~42ms latensi), akurasi klasifikasi andal di berbagai variasi pencahayaan tinggi derau, dan terkontainerisasi penuh dalam Docker.",
      stack: ["Python", "LLaVA", "Ollama", "OpenCV", "Pydantic", "Docker", "Streamlit"]
    }
  },
  {
    id: "agentic-ops-rag",
    title: "Sistem RAG Multi-Agent Operasional Perusahaan",
    subtitle: "Agen AI Operasi Internal dengan Perisai Prompt",
    category: "agents",
    badge: "31/31 UNIT TEST LULUS",
    badgeType: "cyan",
    image: "/project/terraflowplatform1.webp",
    description: "Agen AI operasional perusahaan dengan pencarian semantik hibrida, routing tool deterministik, validasi skema Pydantic ketat, dan pertahanan 3 lapis terhadap injeksi prompt.",
    tags: ["Gemini", "LangChain", "RAG", "Perisai Prompt", "Pydantic", "Docker"],
    github: "https://github.com/raihanghifariw/agentic-ops-rag-system",
    demo: null,
    deepDive: {
      challenge: "Agen AI perusahaan rentan terhadap kerentanan injeksi prompt, halusinasi pemanggilan tool, dan inkonsistensi skema output non-deterministik.",
      architecture: "Orkestrasi LangChain / LangGraph dengan pencarian vektor ChromaDB + pemeringkatan hibrida BM25, parsing output Pydantic ketat, dan sanitasi input multi-lapis.",
      results: "Skor evaluasi akurasi maksud 100% pada seluruh kueri tolok ukur, 31/31 pengujian unit otomatis lulus, dan deployment produksi dengan Docker.",
      stack: ["Python", "Gemini API", "ChromaDB", "LangChain", "Pydantic", "Docker"]
    }
  },
  {
    id: "aero-flare",
    title: "Aero-Flare Intelijen Kebakaran Hutan Otonom",
    subtitle: "Integrasi Satelit NASA & Komando Multimodal",
    category: "vision",
    badge: "DEMO LIVE VERCEL",
    badgeType: "gold",
    image: "/project/Aero-flare-project.png",
    description: "Platform intelijen kebakaran hutan yang mengintegrasikan telemetri satelit NASA FIRMS real-time, triase multimodal Qwen2-VL, prediksi sebaran XGBoost, dan dasbor taktis Leaflet Next.js.",
    tags: ["FastAPI", "Next.js 14", "Qwen2-VL", "XGBoost", "Leaflet GIS", "NASA FIRMS"],
    github: "https://github.com/raihanghifariw/aero-flare",
    demo: "https://aero-flare.vercel.app",
    deepDive: {
      challenge: "Tim tanggap darurat memerlukan deteksi dini titik api dan prakiraan sebaran akurat 6 jam, 12 jam, hingga 24 jam sebelum armada darat dikerahkan ke lokasi.",
      architecture: "Worker pemrosesan FastAPI untuk koordinat termal NASA VIIRS, triase gambar multimodal Qwen2-VL, regresi sebaran XGBoost, dan antarmuka GIS taktis Leaflet Next.js 14.",
      results: "Peta komando taktis interaktif dengan buffer heatmap dinamis, kategorisasi titik api real-time, dideploy live di Vercel.",
      stack: ["Python", "FastAPI", "Next.js 14", "Leaflet", "Qwen2-VL", "XGBoost", "API NASA FIRMS"]
    }
  },
  {
    id: "sharing-vision",
    title: "Aplikasi Fullstack Sharing Vision",
    subtitle: "REST API Go Berkinerja Tinggi & Frontend TypeScript",
    category: "fullstack",
    badge: "DEMO LIVE VERCEL",
    badgeType: "purple",
    image: "/assets/img/projects/project-sharing-vision.svg",
    description: "Platform manajemen artikel dan telemetri full-stack: backend RESTful Go (Golang) konkuren dipadukan dengan dasbor TypeScript React modular.",
    tags: ["Go (Golang)", "TypeScript", "RESTful API", "PostgreSQL", "React", "Vercel"],
    github: "https://github.com/raihanghifariw/sharing-vision-fe-repo",
    demo: "https://sharing-vision-fe-repo.vercel.app",
    deepDive: {
      challenge: "Membangun sistem manajemen alur kerja dan konten dengan konkurensi tinggi, kueri database sub-milidetik, dan penomoran halaman yang bersih.",
      architecture: "Backend Go Gin memanfaatkan GORM ORM terhubung ke PostgreSQL, dipasangkan dengan frontend React TypeScript yang mengusung pembaruan UI optimistik.",
      results: "Latensi respons API di bawah 5ms, arsitektur kode terstruktur rapi, dan deployment live di Vercel dengan otomatisasi CI/CD.",
      stack: ["Go (Golang)", "Gin", "PostgreSQL", "TypeScript", "React", "Tailwind CSS", "Vercel"]
    }
  }
];

export const WORK_EXPERIENCES_ID: ExperienceItem[] = [
  {
    id: "lab-ai-researcher",
    period: "08/2025 - 01/2026",
    organization: "LAB AI UNIVERSITAS YARSI",
    role: "Peneliti Kecerdasan Artifisial",
    active: true,
    tasks: [
      "Merekayasa pipeline data klinis yang memfilter 94.458 raw data rawat inap ICU menjadi kohort Sepsis-3 bersih berisi 35.608 episode dengan imputasi nilai hilang otomatis.",
      "Merancang Denoising Autoencoder yang mengompresi 37 fitur klinis menjadi ruang laten 24 dimensi, mempercepat konvergensi pelatihan model.",
      "Melatih ensemble 5 agen Soft Actor-Critic (SAC) dengan agregasi aksi median untuk mengoptimalkan rekomendasi dosis obat kontinu."
    ],
    impact: [
      "Meraih estimasi tingkat kelangsungan hidup 75.31% dan expected return 17.24 (melampaui baseline historis dokter sebesar 73.55%).",
      "Menerapkan Batasan Keselamatan Lagrangian dinamis pada Mean Arterial Pressure (MAP) dan keseimbangan cairan; keandalan divalidasi dengan estimator Calibrated Doubly Robust (ESS 1374)."
    ],
    tags: ["Deep RL", "SAC", "Batasan Lagrangian", "AI Klinis", "Denoising Autoencoder"]
  },
  {
    id: "lab-ehealth-intern",
    period: "02/2025 - 07/2025",
    organization: "LAB E-HEALTH UNIVERSITAS YARSI",
    role: "Intern Peneliti Kecerdasan Artifisial",
    tasks: [
      "Merancang pipeline ekstraksi data temporal dari database MIMIC-III, memproses 61.532 rawat inap ICU menjadi 20.913 trajektori klinis bersih dengan interval 4 jam.",
      "Membangun model Ensemble Weighted Dueling Double Deep Q-Network (EWD3QN) memanfaatkan dataset terproses untuk mengevaluasi 25 kombinasi aksi klinis diskrit."
    ],
    impact: [
      "Meraih estimasi tingkat survival 92.4% (jauh melampaui baseline dokter sebesar 83.26%) dan return kumulatif 23.6 dibandingkan 14.11.",
      "Mempercepat durasi epoch pelatihan dari 20 menit menjadi ~2 menit menggunakan pemrosesan paralel GPU teroptimasi dan Smooth L1 Huber Loss."
    ],
    tags: ["MIMIC-III", "EWD3QN", "GPU Paralel", "Pemodelan Temporal", "Huber Loss"]
  },
  {
    id: "assistant-lecturer",
    period: "09/2023 - 04/2026",
    organization: "UNIVERSITAS YARSI",
    role: "Asisten Dosen / Instruktur Lab Komputer",
    tasks: [
      "Membimbing 100+ mahasiswa Informatika di 5 mata kuliah inti: Jalur Peminatan AI, Kecerdasan Artifisial, Struktur Data, PBO, dan Dasar Algoritma.",
      "Menyelenggarakan 14 sesi praktikum lab per semester, menjabarkan arsitektur Deep Learning lanjutan ke dalam tugas pemrograman Python dan Java praktis."
    ],
    impact: [
      "Melakukan review kode teknis dan memberikan umpan balik performa model yang ketat, berkontribusi pada peningkatan 70% rata-rata nilai proyek mahasiswa."
    ],
    tags: ["Bimbingan Jalur AI", "Review Kode", "Praktikum Python / Java", "Deep Learning"]
  }
];

export const ORGANIZATIONS_DATA_ID: OrganizationItem[] = [
  {
    id: "fit-senate",
    period: "08/2023 - 12/2024",
    organization: "SENAT MAHASISWA FTI UNIVERSITAS YARSI",
    role: "Ketua Departemen Komunikasi",
    active: true,
    highlights: [
      "Memimpin tim kreatif dan media yang mengelola publikasi digital, siaran acara, dan komunikasi simposium teknis untuk Fakultas Teknologi Informasi.",
      "Merancang strategi kampanye lintas departemen yang menjangkau 1.000+ anggota komunitas universitas, meningkatkan kehadiran acara dan partisipasi mahasiswa.",
      "Menata pipeline aset digital dan menstandarisasi branding hubungan masyarakat di seluruh kanal media resmi fakultas."
    ],
    tags: ["Senat Mahasiswa", "Kepemimpinan Tim", "Strategi Media", "Hubungan Masyarakat"]
  },
  {
    id: "pragma-liaison",
    period: "01/2026",
    organization: "KONSORSIUM PRAGMA ASIA-PASIFIK",
    role: "Penghubung Komite Teknis Internasional",
    highlights: [
      "Mengoordinasikan logistik internasional dan alur kerja riset kolaboratif untuk Pacific Rim Application and Grid Middleware Assembly di 15 institusi mitra Asia-Pasifik.",
      "Berkolaborasi langsung dengan delegasi dari Thammasat University, UCSD, dan Osaka University pada jalur komputasi cloud dan tantangan AI."
    ],
    tags: ["Komite Internasional", "PRAGMA", "UCSD", "Osaka University", "Thammasat"]
  },
  {
    id: "distance-learning",
    period: "2023 - 2024",
    organization: "DIREKTORAT PEMBELAJARAN JARAK JAUH",
    role: "Koordinator Mentor Mahasiswa",
    highlights: [
      "Membimbing mahasiswa baru dalam mengarungi sistem e-learning, platform kolaborasi kode, dan metodologi studi ilmu komputer dasar.",
      "Menyelenggarakan lokakarya orientasi seputar version control Git dan konfigurasi lingkungan komputasi jarak jauh."
    ],
    tags: ["Bimbingan Mahasiswa", "Orientasi Akademik", "Pembelajaran Jarak Jauh"]
  }
];

export const EDUCATION_DATA_ID: EducationItem = {
  period: "09/2022 - 04/2026 : SARJANA ILMU KOMPUTER",
  degree: "Sarjana Ilmu Komputer (S.Kom.)",
  institution: "Universitas YARSI",
  faculty: "Fakultas Teknologi Informasi • Jakarta, Indonesia",
  gpa: "3.92 / 4.00",
  thesis: {
    label: "RISET TUGAS AKHIR SARJANA",
    title: '"Pengembangan Model Soft Actor-Critic Berbasis Ensemble Q-Learning untuk Rekomendasi Pengobatan Sepsis dengan Representasi Aksi Kontinu"',
    description: "Memformulasikan kebijakan reinforcement learning kontinu dengan ensemble 5 agen SAC, denoising autoencoder, dan batas koridor keselamatan Lagrangian dinamis untuk mengoptimalkan dosis cairan infus dan vasopressor bagi pasien kritis ICU."
  },
  coursework: [
    "Deep Learning & Reinforcement Learning",
    "Kecerdasan Artifisial",
    "Struktur Data & Algoritma",
    "Sistem Manajemen Basis Data",
    "Aljabar Linear & Kalkulus",
    "Probabilitas & Statistika",
    "Komputasi Cloud & Sistem Terdistribusi",
    "Pemrograman Berorientasi Objek (PBO)"
  ]
};

export const AWARDS_DATA_ID: AwardItem[] = [
  {
    id: "pragma-award",
    period: "01/2026 : JUARA HACKATHON",
    badge: "JUARA HACKATHON",
    icon: "🏆",
    title: "Penghargaan Hackathon Kolaboratif PRAGMA",
    issuer: "Thammasat University, UCSD, Osaka University",
    description: "Pemenang Teamwork Award pada hackathon bergengsi tingkat Asia-Pasifik yang diikuti 15 universitas atas kolaborasi pengembangan pipeline Decision Transformer dosis obat ICU."
  },
  {
    id: "samsung-innovation",
    period: "09/2024 : KOMPETISI NASIONAL",
    badge: "KOMPETISI NASIONAL",
    icon: "🌟",
    title: "Semi-Finalis Samsung Innovation Campus",
    issuer: "Skilvul & Samsung",
    description: "Meraih posisi Semi-Finalis pada kompetisi Kecerdasan Artifisial nasional yang disponsori oleh Samsung di antara 5.000+ peserta kompetitif."
  },
  {
    id: "aws-cert",
    period: "09/2025 : TERSERTIFIKASI AWS",
    badge: "TERSERTIFIKASI AWS",
    icon: "📜",
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services (Skor: 826 / 1000)",
    description: "Kompetensi terverifikasi dalam infrastruktur AI cloud, foundation models, siklus hidup machine learning, dan penerapan AI yang bertanggung jawab."
  },
  {
    id: "citi-toeic",
    period: "RISET & KEMAHIRAN BAHASA",
    badge: "ETIKA & KEMAHIRAN",
    icon: "🌐",
    title: "Etika Riset CITI & Bahasa Inggris TOEIC",
    issuer: "Program CITI & ETS TOEIC",
    description: "Tersertifikasi CITI dalam Riset Data/Spesimen dan Pencegahan Konflik Kepentingan. Skor ETS TOEIC: 605 dengan komunikasi bahasa Inggris profesional yang fasih."
  }
];

export const STRATEGIC_DIRECTIVES_ID: StrategicDirective[] = [
  {
    id: "dir-01",
    number: "# 01",
    title: "PEMECAHAN MASALAH",
    description: "Penyelesaian kendala teknis secara analitis dan interpersonal dalam lingkungan rekayasa misi-kritis.",
    iconName: "puzzle"
  },
  {
    id: "dir-02",
    number: "# 02",
    title: "BERPIKIR SISTEMIK",
    description: "Merancang arsitektur end-to-end yang tangguh dan skalabel, menghubungkan data mentah ke nilai pengguna.",
    iconName: "git-merge"
  },
  {
    id: "dir-03",
    number: "# 03",
    title: "BERPIKIR KRITIS",
    description: "Pendekatan analitis untuk memecahkan tantangan rekayasa rumit dengan validasi empiris yang terukur.",
    iconName: "brain"
  },
  {
    id: "dir-04",
    number: "# 04",
    title: "PEMBELAJARAN BERKELANJUTAN",
    description: "Selalu memperbarui wawasan terhadap riset AI terdepan, arsitektur model mutakhir, dan paradigma baru.",
    iconName: "book-open"
  },
  {
    id: "dir-05",
    number: "# 05",
    title: "BERPIKIR ANALITIS",
    description: "Mengurai data berdimensi tinggi yang kompleks menjadi wawasan terarah dan keputusan strategis.",
    iconName: "line-chart"
  },
  {
    id: "dir-06",
    number: "# 06",
    title: "ADAPTABILITAS",
    description: "Cepat menguasai framework baru, akselerator perangkat keras, dan model AI generasi terbaru.",
    iconName: "refresh-cw"
  },
  {
    id: "dir-07",
    number: "# 07",
    title: "KEPEMIMPINAN",
    description: "Memimpin tim rekayasa, membimbing angkatan mahasiswa, dan mengelola proyek teknis multi-disiplin.",
    iconName: "users"
  },
  {
    id: "dir-08",
    number: "# 08",
    title: "KOMUNIKASI",
    description: "Menerjemahkan konsep matematika dan AI kompleks menjadi narasi yang jelas bagi pemangku kepentingan.",
    iconName: "message-square"
  },
  {
    id: "dir-09",
    number: "# 09",
    title: "KOLABORASI TIM",
    description: "Pengembangan kolaboratif dalam tim agile lintas fungsi dan konsorsium riset internasional.",
    iconName: "handshake"
  },
  {
    id: "dir-10",
    number: "# 10",
    title: "KEAHLIAN RISET",
    description: "Tinjauan pustaka mendalam, perancangan eksperimen empiris, dan kontribusi akademik terpublikasi.",
    iconName: "search"
  }
];

export const CORE_FOCUS_DOMAINS_ID: CoreFocusDomain[] = [
  {
    id: "applied-ai",
    title: "AI Terapan",
    skills: [
      {
        id: "ai-agents",
        title: "Agen AI & Otonomi",
        level: "BEGINNER",
        description: "Merancang sistem otonom dengan penalaran rekursif dan kemampuan pengambilan keputusan mandiri.",
        proficiencyScore: 85
      },
      {
        id: "llm",
        title: "Large Language Models (LLM)",
        level: "INTERMEDIATE",
        description: "Keahlian fine-tuning model open-source, arsitektur RAG, dan prompt engineering.",
        proficiencyScore: 92
      },
      {
        id: "data-science",
        title: "Sains Data",
        level: "EXPERT",
        description: "Analisis statistik lanjutan dan pemodelan prediktif untuk mengekstrak wawasan dari big data.",
        proficiencyScore: 96
      },
      {
        id: "deep-learning",
        title: "Deep Learning (CV/NLP)",
        level: "ADVANCED",
        description: "Merancang deep neural network untuk tugas computer vision dan pemrosesan bahasa alami yang kompleks.",
        proficiencyScore: 94
      },
      {
        id: "computer-vision",
        title: "Computer Vision",
        level: "INTERMEDIATE",
        description: "Mengembangkan sistem deteksi objek real-time, pengenalan pola, dan analisis spasial.",
        proficiencyScore: 88
      },
      {
        id: "mlops",
        title: "Machine Learning Ops",
        level: "ADVANCED",
        description: "Menerapkan pipeline tangguh untuk pelatihan model, deployment, dan pemantauan performa.",
        proficiencyScore: 90
      }
    ]
  },
  {
    id: "software-engineering",
    title: "Rekayasa Perangkat Lunak",
    skills: [
      {
        id: "system-architecture",
        title: "Arsitektur Sistem",
        level: "INTERMEDIATE",
        description: "Merancang arsitektur sistem yang andal, skalabel, dan berkinerja tinggi untuk aplikasi kompleks.",
        proficiencyScore: 89
      },
      {
        id: "fullstack-dev",
        title: "Pengembangan Full Stack",
        level: "EXPERT",
        description: "Membangun arsitektur web skalabel dari antarmuka modern hingga basis data yang kokoh.",
        proficiencyScore: 95
      },
      {
        id: "system-analysis",
        title: "Analisis Sistem",
        level: "ADVANCED",
        description: "Menerjemahkan kebutuhan pemangku kepentingan menjadi cetak biru teknis yang efisien dan skalabel.",
        proficiencyScore: 91
      },
      {
        id: "sdlc",
        title: "SDLC",
        level: "INTERMEDIATE",
        description: "Mengelola seluruh siklus hidup pengembangan perangkat lunak dengan fokus pada kualitas dan ketangkasan.",
        proficiencyScore: 88
      },
      {
        id: "software-design",
        title: "Desain Perangkat Lunak",
        level: "ADVANCED",
        description: "Menerapkan pola dan prinsip arsitektural untuk membangun sistem modular yang mudah dirawat.",
        proficiencyScore: 92
      },
      {
        id: "requirement-specs",
        title: "Spesifikasi Kebutuhan",
        level: "ADVANCED",
        description: "Menyusun dokumentasi teknis yang jelas, presisi, dan dapat ditindaklanjuti oleh tim pengembang.",
        proficiencyScore: 90
      }
    ]
  },
  {
    id: "additional-skills",
    title: "Keahlian Tambahan",
    skills: [
      {
        id: "devops",
        title: "DevOps",
        level: "ADVANCED",
        description: "Menyederhanakan alur kerja pengembangan dan manajemen infrastruktur melalui otomatisasi.",
        proficiencyScore: 89
      },
      {
        id: "data-analytics",
        title: "Analisis Data",
        level: "ADVANCED",
        description: "Mengubah data mentah menjadi visualisasi bermakna dan intelijen strategis.",
        proficiencyScore: 93
      },
      {
        id: "data-vis",
        title: "Visualisasi Data",
        level: "EXPERT",
        description: "Membuat dasbor interaktif dan intuitif untuk mengomunikasikan temuan data yang kompleks.",
        proficiencyScore: 94
      },
      {
        id: "sql-dbms",
        title: "SQL & DBMS",
        level: "EXPERT",
        description: "Merancang dan mengoptimalkan skema basis data relasional untuk aplikasi berkinerja tinggi.",
        proficiencyScore: 96
      },
      {
        id: "docker-k8s",
        title: "Docker & Kubernetes",
        level: "INTERMEDIATE",
        description: "Mewadahi aplikasi dalam kontainer untuk deployment konsisten dan orkestrasi sumber daya cloud.",
        proficiencyScore: 87
      },
      {
        id: "wazuh",
        title: "Wazuh",
        level: "BEGINNER",
        description: "Mempelajari pemantauan keamanan sumber terbuka untuk deteksi ancaman dan kepatuhan.",
        proficiencyScore: 78
      },
      {
        id: "network-traffic",
        title: "Analisis Lalu Lintas Jaringan",
        level: "BEGINNER",
        description: "Menganalisis tangkapan paket untuk mendeteksi anomali dan mengoptimalkan performa jaringan.",
        proficiencyScore: 80
      },
      {
        id: "socket-prog",
        title: "Pemrograman Socket",
        level: "EXPERT",
        description: "Menerapkan protokol komunikasi jaringan tingkat rendah untuk transfer data real-time.",
        proficiencyScore: 94
      },
      {
        id: "gcp",
        title: "Google Cloud Platform",
        level: "BEGINNER",
        description: "Memanfaatkan infrastruktur dan layanan cloud untuk hosting aplikasi yang skalabel.",
        proficiencyScore: 82
      },
      {
        id: "solidity",
        title: "Solidity",
        level: "BEGINNER",
        description: "Menulis smart contract yang aman untuk aplikasi terdesentralisasi di blockchain Ethereum.",
        proficiencyScore: 79
      },
      {
        id: "dapps",
        title: "Aplikasi Terdesentralisasi (DApps)",
        level: "BEGINNER",
        description: "Mengembangkan aplikasi web yang berinteraksi dengan smart contract blockchain.",
        proficiencyScore: 80
      },
      {
        id: "blockchain-arch",
        title: "Arsitektur Blockchain",
        level: "BEGINNER",
        description: "Memahami prinsip fundamental teknologi buku besar terdistribusi.",
        proficiencyScore: 81
      }
    ]
  }
];

export const ENGINEERING_FOUNDATION_TECHS_ID: EngineeringTechItem[] = [
  {
    id: "python",
    name: "Python",
    description: "Pemodelan AI berkinerja tinggi, komputasi numerik, dan pipeline otomatisasi data.",
    category: "Language",
    iconKey: "python",
    color: "#3776ab"
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "Logika aplikasi terukur yang aman tipe dengan jaminan keamanan kompilasi ketat.",
    category: "Language",
    iconKey: "typescript",
    color: "#3178c6"
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Pengembangan web dinamis dan interaktif dengan eksekusi runtime asinkron.",
    category: "Language",
    iconKey: "javascript",
    color: "#f7df1e"
  },
  {
    id: "solidity",
    name: "Solidity",
    description: "Smart contract blockchain immutable untuk logika protokol yang deterministik.",
    category: "Language",
    iconKey: "solidity",
    color: "#363636"
  },
  {
    id: "react",
    name: "React",
    description: "Antarmuka pengguna berbasis komponen interaktif dengan paradigma state deklaratif.",
    category: "Framework",
    iconKey: "react",
    color: "#61dafb"
  },
  {
    id: "nextjs",
    name: "Next.js",
    description: "Framework aplikasi React tingkat produksi dengan rendering hibrida SSR/SSG.",
    category: "Framework",
    iconKey: "nextjs",
    color: "#ffffff"
  },
  {
    id: "nodejs",
    name: "Node.js",
    description: "Eksekusi sisi server asinkron yang skalabel dan berarsitektur event-driven.",
    category: "Framework",
    iconKey: "nodejs",
    color: "#339933"
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    description: "Arsitektur deep learning dan jaringan neural untuk deployment skala produksi.",
    category: "AI",
    iconKey: "tensorflow",
    color: "#ff6f00"
  },
  {
    id: "scikit-learn",
    name: "Scikit-learn",
    description: "Analisis data prediktif, pemodelan statistik, dan pipeline machine learning klasik.",
    category: "AI",
    iconKey: "scikitlearn",
    color: "#f7931e"
  },
  {
    id: "pandas",
    name: "Pandas",
    description: "Manipulasi data berkinerja tinggi, pengindeksan temporal, dan analitik agregat.",
    category: "Data",
    iconKey: "pandas",
    color: "#150458"
  },
  {
    id: "numpy",
    name: "NumPy",
    description: "Komputasi ilmiah fundamental, aljabar matriks, dan operasi vektor multidimensi.",
    category: "Data",
    iconKey: "numpy",
    color: "#013243"
  },
  {
    id: "matplotlib",
    name: "Matplotlib",
    description: "Visualisasi ilmiah tingkat publikasi dan bagan telemetri klinis.",
    category: "Data",
    iconKey: "matplotlib",
    color: "#11557c"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description: "Gaya utility-first cepat, token sistem desain konsisten, dan tipografi fluida.",
    category: "Framework",
    iconKey: "tailwind",
    color: "#06b6d4"
  },
  {
    id: "redis",
    name: "Redis",
    description: "Penyimpanan struktur data in-memory, lapisan caching, dan broker pesan pub/sub.",
    category: "Data",
    iconKey: "redis",
    color: "#dc382d"
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "Arsitektur basis data relasional yang kokoh dengan kepatuhan ACID ketat.",
    category: "Data",
    iconKey: "postgresql",
    color: "#4169e1"
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Otomatisasi deployment kontainer, penskalaan horizontal, dan orkestrasi pod.",
    category: "Cloud",
    iconKey: "kubernetes",
    color: "#326ce5"
  },
  {
    id: "docker",
    name: "Docker",
    description: "Lingkungan terkontainerisasi terstandarisasi untuk alur kerja ML yang dapat direproduksi.",
    category: "Cloud",
    iconKey: "docker",
    color: "#2496ed"
  },
  {
    id: "terraform",
    name: "Terraform",
    description: "Penyediaan infrastruktur sebagai kode untuk arsitektur enterprise multi-cloud.",
    category: "Cloud",
    iconKey: "terraform",
    color: "#7b42bc"
  },
  {
    id: "langchain",
    name: "LangChain",
    description: "Orkestrasi aplikasi model bahasa besar dan graf keadaan agen otonom.",
    category: "AI",
    iconKey: "langchain",
    color: "#000000"
  },
  {
    id: "mistral",
    name: "Mistral AI",
    description: "Membangun sistem agen dengan arsitektur model open-weight Mistral dan Mixtral.",
    category: "AI",
    iconKey: "mistral",
    color: "#f2a73b"
  },
  {
    id: "pytorch",
    name: "PyTorch",
    description: "Jaringan neural dinamis, komputasi paralel CUDA, dan riset deep RL mutakhir.",
    category: "AI",
    iconKey: "pytorch",
    color: "#ee4c2c"
  },
  {
    id: "opencv",
    name: "OpenCV",
    description: "Kemampuan computer vision real-time, filter spasial, dan pemrosesan gambar.",
    category: "AI",
    iconKey: "opencv",
    color: "#5c3ee8"
  },
  {
    id: "fastapi",
    name: "FastAPI",
    description: "API Python asinkron berkinerja tinggi dengan skema otomatisasi OpenAPI bawaan.",
    category: "Framework",
    iconKey: "fastapi",
    color: "#009688"
  },
  {
    id: "flask",
    name: "Flask",
    description: "Micro-framework web untuk inferensi AI ringan dan pembuatan prototipe cepat.",
    category: "Framework",
    iconKey: "flask",
    color: "#000000"
  }
];

