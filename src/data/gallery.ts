export type GalleryCategory =
  | "all"
  | "ai-research"
  | "industry"
  | "hackathons"
  | "leadership"
  | "portraits";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  date: string;
  location: string;
  description: string;
  image: string;
  aspectRatio: "landscape" | "portrait" | "square";
  tags: string[];
  featured?: boolean;
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string; count?: number }[] = [
  { id: "all", label: "[ALL_ARCHIVES]" },
  { id: "ai-research", label: "[AI & RESEARCH]" },
  { id: "industry", label: "[INDUSTRY & INTERNSHIP]" },
  { id: "hackathons", label: "[HACKATHONS & GLOBAL]" },
  { id: "leadership", label: "[LEADERSHIP & CAMPUS]" },
  { id: "portraits", label: "[PORTRAITS & MOMENTS]" },
];

export const GALLERY_CATEGORIES_ID: { id: GalleryCategory; label: string; count?: number }[] = [
  { id: "all", label: "[SEMUA_ARSIP]" },
  { id: "ai-research", label: "[AI & RISET]" },
  { id: "industry", label: "[INDUSTRI & MAGANG]" },
  { id: "hackathons", label: "[HACKATHON & GLOBAL]" },
  { id: "leadership", label: "[KEPEMIMPINAN & KAMPUS]" },
  { id: "portraits", label: "[DOKUMENTASI & MOMEN]" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // ----------------------------------------------------
  // HACKATHONS & GLOBAL (PRAGMA 39 Asia-Pacific)
  // ----------------------------------------------------
  {
    id: "pragma-award-stage",
    title: "PRAGMA 39 Hackathon : Teamwork Award Ceremony",
    category: "hackathons",
    categoryLabel: "HACKATHONS & GLOBAL",
    date: "January 2026",
    location: "Thammasat University, Pattaya, Thailand",
    description:
      "Awarded the Teamwork Award at the 39th PRAGMA International Collaborative Hackathon across 15 Asia-Pacific universities (Thammasat, UCSD, Osaka University) for developing a Decision Transformer ICU dosage recommendation model on MIMIC-III.",
    image: "/gallery/pragma-hackathon-award-4.webp",
    aspectRatio: "portrait",
    tags: ["PRAGMA 39", "Hackathon Winner", "Decision Transformer", "MIMIC-III", "Thammasat", "UCSD"],
    featured: true,
  },
  {
    id: "pragma-team-collab",
    title: "PRAGMA 39 International Research Team",
    category: "hackathons",
    categoryLabel: "HACKATHONS & GLOBAL",
    date: "January 2026",
    location: "Thammasat University, Pattaya, Thailand",
    description:
      "Cross-border collaboration with international researchers from Thailand, the United States, and Japan, architecting offline RL autoregressive sequence modeling for septic patient trajectories.",
    image: "/gallery/pragma-hackathon-team-1.webp",
    aspectRatio: "landscape",
    tags: ["Cross-Border AI", "PRAGMA", "Research Team", "Offline RL"],
    featured: true,
  },
  {
    id: "pragma-stage-presentation",
    title: "PRAGMA 39 Final Technical Defense & Presentation",
    category: "hackathons",
    categoryLabel: "HACKATHONS & GLOBAL",
    date: "January 2026",
    location: "Pattaya International Convention Center, Thailand",
    description:
      "Delivering the technical presentation of our Transformer clinical decision-support pipeline, explaining doubly-robust policy evaluation to the international evaluation panel.",
    image: "/gallery/pragma-hackathon-stage-2.webp",
    aspectRatio: "portrait",
    tags: ["Technical Defense", "Stage Presentation", "PRAGMA 39", "Clinical AI"],
  },
  {
    id: "pragma-tuning-session",
    title: "PRAGMA 39 Sprint : Intensive Model Architecture Tuning",
    category: "hackathons",
    categoryLabel: "HACKATHONS & GLOBAL",
    date: "January 2026",
    location: "Thammasat University, Pattaya, Thailand",
    description:
      "Late-night engineering sprint optimizing multi-head attention conditioning on continuous returns-to-go and state history buffers under tight computational constraints.",
    image: "/gallery/pragma-hackathon-session-3.webp",
    aspectRatio: "portrait",
    tags: ["Sprint", "PyTorch", "Decision Transformer", "Deep Learning"],
  },
  {
    id: "pragma-keynote-assembly",
    title: "PRAGMA 39 International Assembly Keynote",
    category: "hackathons",
    categoryLabel: "HACKATHONS & GLOBAL",
    date: "January 2026",
    location: "Pattaya, Thailand",
    description:
      "Participating in the general assembly session with global delegates discussing grid middleware, distributed cloud compute, and AI applications in healthcare.",
    image: "/gallery/pragma-hackathon-keynote-5.webp",
    aspectRatio: "landscape",
    tags: ["Keynote", "Distributed Systems", "Global Consortium"],
  },
  {
    id: "pragma-delegation-group",
    title: "PRAGMA 39 Official Delegation Group Photo",
    category: "hackathons",
    categoryLabel: "HACKATHONS & GLOBAL",
    date: "January 2026",
    location: "Thammasat University, Pattaya, Thailand",
    description:
      "Official closing ceremony group photo with distinguished academic supervisors, international fellows, and hackathon participants from across the Pacific Rim.",
    image: "/gallery/pragma-hackathon-ceremony.webp",
    aspectRatio: "landscape",
    tags: ["Delegation", "International Fellows", "PRAGMA 39"],
  },
  {
    id: "pragma-international-bangkok",
    title: "PRAGMA Asia-Pacific Travel & International Delegation",
    category: "hackathons",
    categoryLabel: "HACKATHONS & GLOBAL",
    date: "January 2026",
    location: "Bangkok / Pattaya, Thailand",
    description:
      "Representing Universitas Yarsi and Indonesian informatics delegates abroad during the PRAGMA 39 consortium proceedings.",
    image: "/gallery/pragma-international-delegation.webp",
    aspectRatio: "landscape",
    tags: ["Travel", "International Delegation", "Consortium Liaison"],
  },

  // ----------------------------------------------------
  // AI & RESEARCH (Lab AI, Thesis SAC, PKM-RE)
  // ----------------------------------------------------
  {
    id: "ai-researcher-workstation",
    title: "Lab AI Researcher : Sepsis-3 Deep RL Training Workstation",
    category: "ai-research",
    categoryLabel: "AI & RESEARCH",
    date: "2024 - 2026",
    location: "Cyber Physical Systems & AI Laboratory, Jakarta",
    description:
      "Conducting intensive 5-agent Soft Actor-Critic (SAC) reinforcement learning training runs with Lagrangian safety constraints on Mean Arterial Pressure (MAP) using MIMIC-III ICU data.",
    image: "/gallery/ai-researcher-lab.webp",
    aspectRatio: "landscape",
    tags: ["Deep RL", "SAC Ensemble", "MIMIC-III", "Clinical AI", "Research Lab"],
    featured: true,
  },
  {
    id: "pkm-re-grant-defense",
    title: "PKM-RE National Research Grant : Proposal Defense",
    category: "ai-research",
    categoryLabel: "AI & RESEARCH",
    date: "December 2024",
    location: "Universitas Yarsi, Jakarta",
    description:
      "Presenting our research methodology for the PKM-RE (Program Kreativitas Mahasiswa Riset Eksakta) funded by Kemdikbud-Ditjen Diktiristek, focusing on continuous AI clinical intervention systems.",
    image: "/gallery/pkm-re-national-research-grant.webp",
    aspectRatio: "landscape",
    tags: ["PKM-RE", "National Research Grant", "Kemdikbud", "Clinical AI"],
    featured: true,
  },
  {
    id: "raker-lab-ai-strategic-1",
    title: "AI Laboratory Strategic Board Meeting (Raker Lab AI)",
    category: "ai-research",
    categoryLabel: "AI & RESEARCH",
    date: "September 2025",
    location: "Auditorium Ar-Rahman, Universitas Yarsi",
    description:
      "Strategic work meeting of the Artificial Intelligence Laboratory detailing research milestones, GPU infrastructure compute allocation, and upcoming publication roadmaps.",
    image: "/gallery/raker-lab-ai-strategic-1.webp",
    aspectRatio: "landscape",
    tags: ["Raker Lab AI", "Strategic Roadmap", "GPU Infrastructure", "Lab Board"],
    featured: true,
  },
  {
    id: "raker-lab-ai-strategic-2",
    title: "AI Research Team Assembly & Laboratory Review",
    category: "ai-research",
    categoryLabel: "AI & RESEARCH",
    date: "September 2025",
    location: "Universitas Yarsi, Jakarta",
    description:
      "Co-coordinating research projects across deep reinforcement learning, clinical NLP, and computer vision with fellow lab researchers and faculty advisors.",
    image: "/gallery/raker-lab-ai-strategic-2.webp",
    aspectRatio: "portrait",
    tags: ["Research Assembly", "AI Lab Yarsi", "Faculty Advisory"],
  },
  {
    id: "ai-lab-research-session",
    title: "Model Convergence & Loss Analysis Session",
    category: "ai-research",
    categoryLabel: "AI & RESEARCH",
    date: "2025",
    location: "Cyber Physical Systems Lab, Jakarta",
    description:
      "Deep dive into policy gradient convergence logs, reward stabilization, and Denoising Autoencoder latent compression representations.",
    image: "/gallery/ai-lab-research-session.webp",
    aspectRatio: "landscape",
    tags: ["Loss Analysis", "Model Convergence", "PyTorch", "Autoencoders"],
  },
  {
    id: "lab-collab-session",
    title: "Multi-Agent Architecture & Pipeline Workshop",
    category: "ai-research",
    categoryLabel: "AI & RESEARCH",
    date: "October 2025",
    location: "Informatics Research Lab, Jakarta",
    description:
      "Collaborative coding sprint implementing LangGraph state graphs, cyclic agent verification, and automated medical knowledge retrieval.",
    image: "/gallery/lab-collaboration-session.webp",
    aspectRatio: "landscape",
    tags: ["Multi-Agent AI", "LangGraph", "Architecture", "Sprint"],
  },
  {
    id: "tech-presentation-demo",
    title: "Applied Deep Learning Pipeline Technical Demonstration",
    category: "ai-research",
    categoryLabel: "AI & RESEARCH",
    date: "2025",
    location: "Universitas Yarsi, Jakarta",
    description:
      "Live demonstration of clinical policy simulation and automated triage engine during technical department showcases.",
    image: "/gallery/tech-presentation-demo.webp",
    aspectRatio: "landscape",
    tags: ["Live Demo", "Telemetry", "Technical Showcase"],
  },

  // ----------------------------------------------------
  // INDUSTRY & INTERNSHIP (DANA, AI Engineer Intern)
  // ----------------------------------------------------
  {
    id: "dana-hq-exposure-1",
    title: "DANA Indonesia Headquarters : Technology Immersion",
    category: "industry",
    categoryLabel: "INDUSTRY & INTERNSHIP",
    date: "January 2024",
    location: "DANA Indonesia Headquarters, Jakarta",
    description:
      "Exploring production fintech architectures, distributed payment systems, and fraud prevention pipelines at DANA Indonesia (PT Espay Debit Indonesia Koe).",
    image: "/gallery/dana-fintech-hq-1.webp",
    aspectRatio: "landscape",
    tags: ["DANA Indonesia", "Fintech HQ", "Distributed Systems", "Industry Visit"],
    featured: true,
  },
  {
    id: "dana-hq-exposure-2",
    title: "Fintech Data Pipelines & High-Throughput Systems at DANA",
    category: "industry",
    categoryLabel: "INDUSTRY & INTERNSHIP",
    date: "January 2024",
    location: "DANA Indonesia Headquarters, Jakarta",
    description:
      "Engaging with industry engineering leaders discussing microservices orchestration, low-latency transaction processing, and data reliability engineering.",
    image: "/gallery/dana-fintech-hq-2.webp",
    aspectRatio: "landscape",
    tags: ["Fintech Engineering", "Microservices", "DANA Indonesia"],
  },
  {
    id: "ai-engineer-intern-1",
    title: "AI Engineer Intern : Model Serving & Pipeline Automation",
    category: "industry",
    categoryLabel: "INDUSTRY & INTERNSHIP",
    date: "2024 - 2025",
    location: "Jakarta, Indonesia",
    description:
      "Building Dockerized FastAPI endpoints, optimizing PyTorch inference latency on CUDA GPUs, and designing automated data preprocessing pipelines.",
    image: "/gallery/ai-engineer-intern-1.webp",
    aspectRatio: "landscape",
    tags: ["AI Engineer Intern", "FastAPI", "Docker", "Model Serving", "MLOps"],
    featured: true,
  },
  {
    id: "ai-engineer-intern-2",
    title: "Model Benchmarking & Infrastructure Profiling",
    category: "industry",
    categoryLabel: "INDUSTRY & INTERNSHIP",
    date: "2024 - 2025",
    location: "Jakarta, Indonesia",
    description:
      "Profiling GPU memory bandwidth and quantization trade-offs to deliver sub-50ms inference times on resource-constrained compute clusters.",
    image: "/gallery/ai-engineer-intern-2.webp",
    aspectRatio: "landscape",
    tags: ["Benchmarking", "Quantization", "CUDA Profiling", "Edge AI"],
  },

  // ----------------------------------------------------
  // LEADERSHIP & CAMPUS (SEMA FTI, Teaching Assistant)
  // ----------------------------------------------------
  {
    id: "assistant-lecturer-class",
    title: "Informatics Assistant Lecturer : Computer Science Mentoring Lab",
    category: "leadership",
    categoryLabel: "LEADERSHIP & CAMPUS",
    date: "2023 - 2026",
    location: "Faculty of Information Technology, Universitas Yarsi",
    description:
      "Appointed Assistant Lecturer / Lab Instructor across 5 core courses: Specialization AI Track, Artificial Intelligence, Data Structures, OOP, and Algorithm Fundamentals. Mentored 100+ CS students.",
    image: "/gallery/assistant-lecturer-mentoring.webp",
    aspectRatio: "landscape",
    tags: ["Assistant Lecturer", "Mentorship", "AI Lab Instructor", "Teaching"],
    featured: true,
  },
  {
    id: "sema-fti-leadership-1",
    title: "Senat Mahasiswa FTI : Student Leadership & Congress",
    category: "leadership",
    categoryLabel: "LEADERSHIP & CAMPUS",
    date: "2023 - 2024",
    location: "Faculty of Information Technology, Universitas Yarsi",
    description:
      "Serving as Head of Communication Department in Senat Mahasiswa FTI Universitas Yarsi, managing university digital publications, event broadcasting, and technical symposium communications.",
    image: "/gallery/sema-fti-student-senate-1.webp",
    aspectRatio: "landscape",
    tags: ["Student Senate", "Head of Communications", "Leadership", "FTI Yarsi"],
  },
  {
    id: "sema-fti-leadership-2",
    title: "Senat Mahasiswa FTI : Department Executive Cabinet",
    category: "leadership",
    categoryLabel: "LEADERSHIP & CAMPUS",
    date: "September 2024",
    location: "Faculty of Information Technology, Universitas Yarsi",
    description:
      "Executive cabinet assembly orchestrating cross-department campaigns reaching 1,000+ university community members to advance student research and technical initiatives.",
    image: "/gallery/sema-fti-student-senate-2.webp",
    aspectRatio: "landscape",
    tags: ["Cabinet Assembly", "Student Senate", "Executive Board"],
    featured: true,
  },
  {
    id: "academic-symposium-1",
    title: "Faculty Academic Symposium & Auditorium Keynote 01",
    category: "leadership",
    categoryLabel: "LEADERSHIP & CAMPUS",
    date: "April 2026",
    location: "Auditorium Universitas Yarsi, Jakarta",
    description:
      "Participating on the main auditorium stage during the faculty academic symposium, highlighting breakthroughs in student AI research and technological innovations.",
    image: "/gallery/academic-symposium-stage-1.webp",
    aspectRatio: "landscape",
    tags: ["Academic Symposium", "Keynote Stage", "Auditorium", "Honors"],
  },
  {
    id: "academic-symposium-2",
    title: "Faculty Academic Symposium & Auditorium Keynote 02",
    category: "leadership",
    categoryLabel: "LEADERSHIP & CAMPUS",
    date: "April 2026",
    location: "Auditorium Universitas Yarsi, Jakarta",
    description:
      "Stage proceedings recognizing high academic distinction (CGPA 3.92/4.00) and contributions to undergraduate research engineering.",
    image: "/gallery/academic-symposium-stage-2.webp",
    aspectRatio: "landscape",
    tags: ["High Distinction", "Academic Honors", "Symposium"],
  },
  {
    id: "campus-faculty-moment",
    title: "Faculty of Information Technology : Campus Assembly",
    category: "leadership",
    categoryLabel: "LEADERSHIP & CAMPUS",
    date: "June 2025",
    location: "Universitas Yarsi, Jakarta",
    description:
      "Moments shared with faculty members, academic colleagues, and engineering peers discussing future informatics curriculum and research priorities.",
    image: "/gallery/campus-faculty-moment.webp",
    aspectRatio: "landscape",
    tags: ["Campus Life", "Academic Colleagues", "FTI Yarsi"],
  },

  // ----------------------------------------------------
  // PORTRAITS & MOMENTS
  // ----------------------------------------------------
  {
    id: "profile-official",
    title: "Raihan Ghifari Winata : Official Professional Portrait",
    category: "portraits",
    categoryLabel: "PORTRAITS & MOMENTS",
    date: "January 2026",
    location: "Jakarta, Indonesia",
    description:
      "Official professional portrait of Raihan Ghifari Winata : AI, Data & Software Engineer & Researcher specializing in Safety-Critical Deep RL and Distributed MLOps.",
    image: "/gallery/profile-portrait-official.webp",
    aspectRatio: "portrait",
    tags: ["Official Portrait", "AI Engineer", "Profile"],
    featured: true,
  },
  {
    id: "studio-formal-1",
    title: "Studio Portrait Session : Formal Profile 01",
    category: "portraits",
    categoryLabel: "PORTRAITS & MOMENTS",
    date: "2025",
    location: "Studio Session, Jakarta",
    description:
      "High-resolution formal studio portrait for professional conferences, symposium keynotes, and international research publications.",
    image: "/gallery/studio-portrait-formal-1.webp",
    aspectRatio: "portrait",
    tags: ["Studio Portrait", "Professional", "Speaker Profile"],
  },
  {
    id: "studio-formal-2",
    title: "Studio Portrait Session : Formal Profile 02",
    category: "portraits",
    categoryLabel: "PORTRAITS & MOMENTS",
    date: "2025",
    location: "Studio Session, Jakarta",
    description:
      "Formal executive portrait representing student leadership and academic distinction at Universitas Yarsi.",
    image: "/gallery/studio-portrait-formal-2.webp",
    aspectRatio: "portrait",
    tags: ["Studio Portrait", "Executive", "Leadership"],
  },
  {
    id: "studio-formal-3",
    title: "Studio Portrait Session : Formal Profile 03",
    category: "portraits",
    categoryLabel: "PORTRAITS & MOMENTS",
    date: "2025",
    location: "Studio Session, Jakarta",
    description:
      "High-definition portrait session capturing career milestones across academia, industry, and frontier AI research.",
    image: "/gallery/studio-portrait-formal-3.webp",
    aspectRatio: "portrait",
    tags: ["Studio Portrait", "Career Milestone"],
  },
];

export const GALLERY_ITEMS_ID: GalleryItem[] = [
  // ----------------------------------------------------
  // HACKATHON & GLOBAL (PRAGMA 39 Asia-Pasifik)
  // ----------------------------------------------------
  {
    id: "pragma-award-stage",
    title: "PRAGMA 39 Hackathon : Upacara Penghargaan Kolaborasi Tim",
    category: "hackathons",
    categoryLabel: "HACKATHON & GLOBAL",
    date: "Januari 2026",
    location: "Universitas Thammasat, Pattaya, Thailand",
    description:
      "Meraih Penghargaan Kolaborasi Tim (Teamwork Award) pada Hackathon Kolaboratif Internasional PRAGMA ke-39 lintas 15 universitas Asia-Pasifik (Thammasat, UCSD, Osaka University) atas pengembangan model rekomendasi dosis ICU Decision Transformer pada dataset MIMIC-III.",
    image: "/gallery/pragma-hackathon-award-4.webp",
    aspectRatio: "portrait",
    tags: ["PRAGMA 39", "Juara Hackathon", "Decision Transformer", "MIMIC-III", "Thammasat", "UCSD"],
    featured: true,
  },
  {
    id: "pragma-team-collab",
    title: "Tim Riset Internasional PRAGMA 39",
    category: "hackathons",
    categoryLabel: "HACKATHON & GLOBAL",
    date: "Januari 2026",
    location: "Universitas Thammasat, Pattaya, Thailand",
    description:
      "Kolaborasi lintas batas bersama peneliti internasional dari Thailand, Amerika Serikat, dan Jepang dalam merancang pemodelan sekuens autoregresif offline RL untuk trajektori pasien sepsis.",
    image: "/gallery/pragma-hackathon-team-1.webp",
    aspectRatio: "landscape",
    tags: ["AI Lintas Batas", "PRAGMA", "Tim Riset", "Offline RL"],
    featured: true,
  },
  {
    id: "pragma-stage-presentation",
    title: "PRAGMA 39 : Presentasi & Sidang Teknis Final",
    category: "hackathons",
    categoryLabel: "HACKATHON & GLOBAL",
    date: "Januari 2026",
    location: "Pattaya International Convention Center, Thailand",
    description:
      "Mempresentasikan arsitektur pipeline pendukung keputusan klinis berbasis Transformer serta memaparkan evaluasi kebijakan doubly-robust di hadapan dewan juri internasional.",
    image: "/gallery/pragma-hackathon-stage-2.webp",
    aspectRatio: "portrait",
    tags: ["Sidang Teknis", "Presentasi Panggung", "PRAGMA 39", "AI Klinis"],
  },
  {
    id: "pragma-tuning-session",
    title: "PRAGMA 39 Sprint : Optimasi Arsitektur Model Intensif",
    category: "hackathons",
    categoryLabel: "HACKATHON & GLOBAL",
    date: "Januari 2026",
    location: "Universitas Thammasat, Pattaya, Thailand",
    description:
      "Sprint rekayasa larut malam mengoptimalkan pengkondisian multi-head attention pada return-to-go kontinu dan penyangga riwayat status di bawah batas komputasi yang ketat.",
    image: "/gallery/pragma-hackathon-session-3.webp",
    aspectRatio: "portrait",
    tags: ["Sprint", "PyTorch", "Decision Transformer", "Deep Learning"],
  },
  {
    id: "pragma-keynote-assembly",
    title: "Sidang Pleno Internasional PRAGMA 39",
    category: "hackathons",
    categoryLabel: "HACKATHON & GLOBAL",
    date: "Januari 2026",
    location: "Pattaya, Thailand",
    description:
      "Berpartisipasi dalam sidang majelis umum bersama delegasi global membahas middleware komputasi grid, cloud terdistribusi, dan aplikasi AI dalam layanan kesehatan.",
    image: "/gallery/pragma-hackathon-keynote-5.webp",
    aspectRatio: "landscape",
    tags: ["Sidang Pleno", "Sistem Terdistribusi", "Konsorsium Global"],
  },
  {
    id: "pragma-delegation-group",
    title: "Foto Resmi Delegasi PRAGMA 39",
    category: "hackathons",
    categoryLabel: "HACKATHON & GLOBAL",
    date: "Januari 2026",
    location: "Universitas Thammasat, Pattaya, Thailand",
    description:
      "Foto bersama penutupan resmi bersama para pembimbing akademis terkemuka, peneliti internasional, dan peserta hackathon dari kawasan Lingkar Pasifik.",
    image: "/gallery/pragma-hackathon-ceremony.webp",
    aspectRatio: "landscape",
    tags: ["Delegasi Resmi", "Riset Internasional", "PRAGMA 39"],
  },
  {
    id: "pragma-international-bangkok",
    title: "Delegasi Internasional & Perjalanan Asia-Pasifik PRAGMA",
    category: "hackathons",
    categoryLabel: "HACKATHON & GLOBAL",
    date: "Januari 2026",
    location: "Bangkok / Pattaya, Thailand",
    description:
      "Mewakili Universitas YARSI dan delegasi informatika Indonesia di forum internasional selama rangkaian konsorsium PRAGMA 39.",
    image: "/gallery/pragma-international-delegation.webp",
    aspectRatio: "landscape",
    tags: ["Perjalanan Riset", "Delegasi Internasional", "Penghubung Konsorsium"],
  },

  // ----------------------------------------------------
  // AI & RISET (Lab AI, Skripsi SAC, PKM-RE)
  // ----------------------------------------------------
  {
    id: "ai-researcher-workstation",
    title: "Peneliti Lab AI : Workstation Pelatihan Deep RL Sepsis-3",
    category: "ai-research",
    categoryLabel: "AI & RISET",
    date: "2024 - 2026",
    location: "Laboratorium Cyber Physical Systems & AI, Jakarta",
    description:
      "Menjalankan eksperimen intensif 5-agent Soft Actor-Critic (SAC) reinforcement learning dengan batasan keselamatan Lagrangian pada Tekanan Arteri Rata-rata (MAP) menggunakan data ICU MIMIC-III.",
    image: "/gallery/ai-researcher-lab.webp",
    aspectRatio: "landscape",
    tags: ["Deep RL", "Ensemble SAC", "MIMIC-III", "AI Klinis", "Lab Riset"],
    featured: true,
  },
  {
    id: "pkm-re-grant-defense",
    title: "Hibah Riset Nasional PKM-RE : Sidang Proposal",
    category: "ai-research",
    categoryLabel: "AI & RISET",
    date: "Desember 2024",
    location: "Universitas YARSI, Jakarta",
    description:
      "Mempresentasikan metodologi riset Program Kreativitas Mahasiswa Riset Eksakta (PKM-RE) yang didanai oleh Kemdikbud-Ditjen Diktiristek, berfokus pada sistem intervensi klinis AI kontinu.",
    image: "/gallery/pkm-re-national-research-grant.webp",
    aspectRatio: "landscape",
    tags: ["PKM-RE", "Hibah Riset Nasional", "Kemdikbud", "AI Klinis"],
    featured: true,
  },
  {
    id: "raker-lab-ai-strategic-1",
    title: "Rapat Kerja Strategis Laboratorium AI (Raker Lab AI)",
    category: "ai-research",
    categoryLabel: "AI & RISET",
    date: "September 2025",
    location: "Auditorium Ar-Rahman, Universitas YARSI",
    description:
      "Rapat kerja strategis Laboratorium Kecerdasan Buatan merinci tonggak pencapaian riset, alokasi komputasi infrastruktur GPU, serta peta jalan publikasi ilmiah.",
    image: "/gallery/raker-lab-ai-strategic-1.webp",
    aspectRatio: "landscape",
    tags: ["Raker Lab AI", "Peta Jalan Strategis", "Infrastruktur GPU", "Dewan Lab"],
    featured: true,
  },
  {
    id: "raker-lab-ai-strategic-2",
    title: "Konsolidasi Tim Peneliti AI & Evaluasi Laboratorium",
    category: "ai-research",
    categoryLabel: "AI & RISET",
    date: "September 2025",
    location: "Universitas YARSI, Jakarta",
    description:
      "Mengoordinasikan proyek riset reinforcement learning mendalam, NLP klinis, dan visi komputer bersama rekan peneliti laboratorium dan dosen pembimbing.",
    image: "/gallery/raker-lab-ai-strategic-2.webp",
    aspectRatio: "portrait",
    tags: ["Konsolidasi Riset", "Lab AI YARSI", "Dewan Pembimbing"],
  },
  {
    id: "ai-lab-research-session",
    title: "Analisis Konvergensi Model & Loss Training",
    category: "ai-research",
    categoryLabel: "AI & RISET",
    date: "2025",
    location: "Laboratorium Cyber Physical Systems, Jakarta",
    description:
      "Investigasi mendalam terhadap log konvergensi policy gradient, stabilisasi reward, dan kompresi representasi laten Denoising Autoencoder.",
    image: "/gallery/ai-lab-research-session.webp",
    aspectRatio: "landscape",
    tags: ["Analisis Loss", "Konvergensi Model", "PyTorch", "Autoencoder"],
  },
  {
    id: "lab-collab-session",
    title: "Lokakarya Arsitektur Multi-Agent & Pipeline AI",
    category: "ai-research",
    categoryLabel: "AI & RISET",
    date: "Oktober 2025",
    location: "Laboratorium Riset Informatika, Jakarta",
    description:
      "Sprint pemrograman kolaboratif mengimplementasikan graf status LangGraph, verifikasi siklik agen, dan temu kembali pengetahuan medis otomatis.",
    image: "/gallery/lab-collaboration-session.webp",
    aspectRatio: "landscape",
    tags: ["AI Multi-Agent", "LangGraph", "Arsitektur Sistem", "Sprint Rekayasa"],
  },
  {
    id: "tech-presentation-demo",
    title: "Demonstrasi Teknis Pipeline Deep Learning Terapan",
    category: "ai-research",
    categoryLabel: "AI & RISET",
    date: "2025",
    location: "Universitas YARSI, Jakarta",
    description:
      "Demonstrasi langsung simulasi kebijakan klinis dan mesin triase otomatis dalam pameran teknis program studi informatika.",
    image: "/gallery/tech-presentation-demo.webp",
    aspectRatio: "landscape",
    tags: ["Demo Langsung", "Telemetri", "Pameran Teknis"],
  },

  // ----------------------------------------------------
  // INDUSTRI & MAGANG (DANA, AI Engineer Intern)
  // ----------------------------------------------------
  {
    id: "dana-hq-exposure-1",
    title: "Kantor Pusat DANA Indonesia : Imersi Teknologi Fintech",
    category: "industry",
    categoryLabel: "INDUSTRI & MAGANG",
    date: "Januari 2024",
    location: "Kantor Pusat DANA Indonesia, Jakarta",
    description:
      "Mendalami arsitektur fintech produksi, sistem pembayaran terdistribusi, dan pipeline pencegahan fraud di DANA Indonesia (PT Espay Debit Indonesia Koe).",
    image: "/gallery/dana-fintech-hq-1.webp",
    aspectRatio: "landscape",
    tags: ["DANA Indonesia", "Kantor Pusat Fintech", "Sistem Terdistribusi", "Kunjungan Industri"],
    featured: true,
  },
  {
    id: "dana-hq-exposure-2",
    title: "Pipeline Data Fintech & Sistem Throughput Tinggi di DANA",
    category: "industry",
    categoryLabel: "INDUSTRI & MAGANG",
    date: "Januari 2024",
    location: "Kantor Pusat DANA Indonesia, Jakarta",
    description:
      "Diskusi mendalam bersama pimpinan rekayasa industri membahas orkestrasi microservices, pemrosesan transaksi berlatensi rendah, dan keandalan data produksi.",
    image: "/gallery/dana-fintech-hq-2.webp",
    aspectRatio: "landscape",
    tags: ["Rekayasa Fintech", "Microservices", "DANA Indonesia"],
  },
  {
    id: "ai-engineer-intern-1",
    title: "Magang AI Engineer : Penyajian Model & Otomasi Pipeline",
    category: "industry",
    categoryLabel: "INDUSTRI & MAGANG",
    date: "2024 - 2025",
    location: "Jakarta, Indonesia",
    description:
      "Membangun endpoint FastAPI berbasis Docker, mengoptimalkan latensi inferensi PyTorch pada GPU CUDA, serta merancang pipeline prapemrosesan data otomatis.",
    image: "/gallery/ai-engineer-intern-1.webp",
    aspectRatio: "landscape",
    tags: ["Magang AI Engineer", "FastAPI", "Docker", "Penyajian Model", "MLOps"],
    featured: true,
  },
  {
    id: "ai-engineer-intern-2",
    title: "Tolok Ukur Model & Pemprofilan Infrastruktur Komputasi",
    category: "industry",
    categoryLabel: "INDUSTRI & MAGANG",
    date: "2024 - 2025",
    location: "Jakarta, Indonesia",
    description:
      "Memprofil bandwidth memori GPU dan trade-off kuantisasi model guna mencapai latensi inferensi di bawah 50ms pada kluster komputasi terdistribusi.",
    image: "/gallery/ai-engineer-intern-2.webp",
    aspectRatio: "landscape",
    tags: ["Tolok Ukur", "Kuantisasi", "Pemprofilan CUDA", "Edge AI"],
  },

  // ----------------------------------------------------
  // KEPEMIMPINAN & KAMPUS (SEMA FTI, Asisten Dosen)
  // ----------------------------------------------------
  {
    id: "assistant-lecturer-class",
    title: "Asisten Dosen Informatika : Laboratorium Mentoring Ilmu Komputer",
    category: "leadership",
    categoryLabel: "KEPEMIMPINAN & KAMPUS",
    date: "2023 - 2026",
    location: "Fakultas Teknologi Informasi, Universitas YARSI",
    description:
      "Dipercaya sebagai Asisten Dosen dan Instruktur Lab pada 5 mata kuliah inti: Peminatan AI, Kecerdasan Buatan, Struktur Data, PBO, dan Dasar Algoritma. Membimbing 100+ mahasiswa.",
    image: "/gallery/assistant-lecturer-mentoring.webp",
    aspectRatio: "landscape",
    tags: ["Asisten Dosen", "Mentoring", "Instruktur Lab AI", "Pengajaran"],
    featured: true,
  },
  {
    id: "sema-fti-leadership-1",
    title: "Senat Mahasiswa FTI : Kepemimpinan Mahasiswa & Kongres",
    category: "leadership",
    categoryLabel: "KEPEMIMPINAN & KAMPUS",
    date: "2023 - 2024",
    location: "Fakultas Teknologi Informasi, Universitas YARSI",
    description:
      "Menjabat sebagai Kepala Departemen Komunikasi di Senat Mahasiswa FTI Universitas YARSI, mengelola publikasi digital fakultas, penyiaran acara, dan komunikasi simposium teknis.",
    image: "/gallery/sema-fti-student-senate-1.webp",
    aspectRatio: "landscape",
    tags: ["Senat Mahasiswa", "Kepala Komunikasi", "Kepemimpinan", "FTI YARSI"],
  },
  {
    id: "sema-fti-leadership-2",
    title: "Senat Mahasiswa FTI : Rapat Kabinet Eksekutif",
    category: "leadership",
    categoryLabel: "KEPEMIMPINAN & KAMPUS",
    date: "September 2024",
    location: "Fakultas Teknologi Informasi, Universitas YARSI",
    description:
      "Rapat kabinet eksekutif mengoordinasikan program lintas departemen yang menjangkau 1.000+ sivitas akademika guna mendorong riset mahasiswa dan inisiatif teknologi.",
    image: "/gallery/sema-fti-student-senate-2.webp",
    aspectRatio: "landscape",
    tags: ["Rapat Kabinet", "Senat Mahasiswa", "Dewan Eksekutif"],
    featured: true,
  },
  {
    id: "academic-symposium-1",
    title: "Simposium Akademik Fakultas & Panggung Utama 01",
    category: "leadership",
    categoryLabel: "KEPEMIMPINAN & KAMPUS",
    date: "April 2026",
    location: "Auditorium Universitas YARSI, Jakarta",
    description:
      "Berpartisipasi di panggung auditorium utama dalam simposium akademik fakultas, menyoroti terobosan riset kecerdasan buatan mahasiswa dan inovasi teknologi.",
    image: "/gallery/academic-symposium-stage-1.webp",
    aspectRatio: "landscape",
    tags: ["Simposium Akademik", "Panggung Utama", "Auditorium", "Penghargaan"],
  },
  {
    id: "academic-symposium-2",
    title: "Simposium Akademik Fakultas & Panggung Utama 02",
    category: "leadership",
    categoryLabel: "KEPEMIMPINAN & KAMPUS",
    date: "April 2026",
    location: "Auditorium Universitas YARSI, Jakarta",
    description:
      "Prosesi penghargaan kehormatan atas prestasi akademik luar biasa (IPK 3.92/4.00) serta kontribusi signifikan pada rekayasa riset tingkat sarjana.",
    image: "/gallery/academic-symposium-stage-2.webp",
    aspectRatio: "landscape",
    tags: ["Pujian Tertinggi", "Prestasi Akademik", "Simposium"],
  },
  {
    id: "campus-faculty-moment",
    title: "Fakultas Teknologi Informasi : Kebersamaan Kampus",
    category: "leadership",
    categoryLabel: "KEPEMIMPINAN & KAMPUS",
    date: "Juni 2025",
    location: "Universitas YARSI, Jakarta",
    description:
      "Momen bersama para dosen pembimbing, rekan sejawat akademisi, dan mahasiswa teknik membahas kurikulum masa depan serta prioritas riset informatika.",
    image: "/gallery/campus-faculty-moment.webp",
    aspectRatio: "landscape",
    tags: ["Kehidupan Kampus", "Rekan Akademisi", "FTI YARSI"],
  },

  // ----------------------------------------------------
  // DOKUMENTASI & MOMEN
  // ----------------------------------------------------
  {
    id: "profile-official",
    title: "Raihan Ghifari Winata : Potret Profesional Resmi",
    category: "portraits",
    categoryLabel: "DOKUMENTASI & MOMEN",
    date: "Januari 2026",
    location: "Jakarta, Indonesia",
    description:
      "Potret profesional resmi Raihan Ghifari Winata : AI, Data & Software Engineer dan Peneliti dengan spesialisasi Safety-Critical Deep RL dan MLOps Terdistribusi.",
    image: "/gallery/profile-portrait-official.webp",
    aspectRatio: "portrait",
    tags: ["Potret Resmi", "AI Engineer", "Profil"],
    featured: true,
  },
  {
    id: "studio-formal-1",
    title: "Sesi Foto Studio : Profil Formal 01",
    category: "portraits",
    categoryLabel: "DOKUMENTASI & MOMEN",
    date: "2025",
    location: "Sesi Studio, Jakarta",
    description:
      "Potret formal studio resolusi tinggi untuk konferensi profesional, pembicara simposium, dan publikasi riset internasional.",
    image: "/gallery/studio-portrait-formal-1.webp",
    aspectRatio: "portrait",
    tags: ["Potret Studio", "Profesional", "Profil Pembicara"],
  },
  {
    id: "studio-formal-2",
    title: "Sesi Foto Studio : Profil Formal 02",
    category: "portraits",
    categoryLabel: "DOKUMENTASI & MOMEN",
    date: "2025",
    location: "Sesi Studio, Jakarta",
    description:
      "Potret eksekutif formal yang mencerminkan kepemimpinan mahasiswa dan keunggulan akademik di Universitas YARSI.",
    image: "/gallery/studio-portrait-formal-2.webp",
    aspectRatio: "portrait",
    tags: ["Potret Studio", "Eksekutif", "Kepemimpinan"],
  },
  {
    id: "studio-formal-3",
    title: "Sesi Foto Studio : Profil Formal 03",
    category: "portraits",
    categoryLabel: "DOKUMENTASI & MOMEN",
    date: "2025",
    location: "Sesi Studio, Jakarta",
    description:
      "Sesi potret definisi tinggi mengabadikan tonggak karier di dunia akademisi, industri teknologi, dan riset AI mutakhir.",
    image: "/gallery/studio-portrait-formal-3.webp",
    aspectRatio: "portrait",
    tags: ["Potret Studio", "Tonggak Karier"],
  },
];
