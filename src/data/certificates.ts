export interface CredlyBadge {
  id: string;
  badgeId: string;
  title: string;
  issuer: string;
  issuerCode: "aws" | "google" | "ibm" | "cisco";
  category: "ai" | "cloud" | "data" | "network" | "security";
  categoryLabel: string;
  localImage: string;
  remoteImage: string;
  verificationUrl: string;
  embedUrl: string;
  description: string;
  skills: string[];
  issueDate: string;
}

export interface DocumentCertificate {
  id: string;
  title: string;
  issuer: string;
  issuerCode: "pragma" | "samsung" | "dicoding" | "citi" | "yarsi";
  category: "hackathon" | "ai" | "data" | "programming" | "ethics";
  categoryLabel: string;
  date: string;
  certNumber?: string;
  verificationUrl?: string;
  pdfUrl: string;
  previewImage: string;
  description: string;
  skills: string[];
  featured?: boolean;
}

export const CREDLY_BADGES: CredlyBadge[] = [
  {
    id: "aws-ai-practitioner",
    badgeId: "6e5d6e42-9850-4a7d-9784-6b7dad66ad95",
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services Training and Certification",
    issuerCode: "aws",
    category: "ai",
    categoryLabel: "AI & FOUNDATION MODELS",
    localImage: "/Sertif/badges/6e5d6e42-9850-4a7d-9784-6b7dad66ad95.png",
    remoteImage: "https://images.credly.com/images/4d4693bb-530e-4bca-9327-de07f3aa2348/image.png",
    verificationUrl: "https://www.credly.com/badges/6e5d6e42-9850-4a7d-9784-6b7dad66ad95",
    embedUrl: "https://www.credly.com/embedded_badge/6e5d6e42-9850-4a7d-9784-6b7dad66ad95",
    description: "Earners of this badge understand AI, ML, and generative AI concepts, methods, and strategies on AWS. Verified knowledge across foundation models, AWS AI services, security compliance, and responsible AI governance.",
    skills: ["Generative AI", "AWS Bedrock", "SageMaker", "Responsible AI", "MLOps", "Model Fine-Tuning"],
    issueDate: "2025"
  },
  {
    id: "google-agent-adk",
    badgeId: "79867a75-b778-4f92-8df2-51856614b6a9",
    title: "Engineer AI Agents with Agent Development Kit (ADK)",
    issuer: "Google Cloud",
    issuerCode: "google",
    category: "ai",
    categoryLabel: "AUTONOMOUS AGENTS",
    localImage: "/Sertif/badges/79867a75-b778-4f92-8df2-51856614b6a9.png",
    remoteImage: "https://images.credly.com/images/000655a5-3837-4c38-b906-2eb9c059ab36/blob",
    verificationUrl: "https://www.credly.com/badges/79867a75-b778-4f92-8df2-51856614b6a9",
    embedUrl: "https://www.credly.com/embedded_badge/79867a75-b778-4f92-8df2-51856614b6a9",
    description: "Verified capability to formulate real-world language model research problems, construct custom tokenizers, prepare specialized token training datasets, and implement autonomous training loops for language model agents.",
    skills: ["AI Agents", "Google Cloud ADK", "Tokenizer Engineering", "Transformer LLMs", "Autonomous Systems"],
    issueDate: "2026"
  },
  {
    id: "google-gemini-enterprise",
    badgeId: "3013ce3e-4e2d-470f-815b-7004654898e4",
    title: "Create Your First Gemini Enterprise Application",
    issuer: "Google Cloud",
    issuerCode: "google",
    category: "ai",
    categoryLabel: "ENTERPRISE LLM / RAG",
    localImage: "/Sertif/badges/3013ce3e-4e2d-470f-815b-7004654898e4.png",
    remoteImage: "https://images.credly.com/images/3c923d13-42da-4765-995d-59f3030e042a/blob",
    verificationUrl: "https://www.credly.com/badges/3013ce3e-4e2d-470f-815b-7004654898e4",
    embedUrl: "https://www.credly.com/embedded_badge/3013ce3e-4e2d-470f-815b-7004654898e4",
    description: "Demonstrates advanced skills in architecting enterprise generative AI solutions: deep research agents, multi-agent ideation workflows, and NotebookLM-driven synthesized intelligence.",
    skills: ["Gemini 1.5 Pro", "Multi-Agent Ideation", "Deep Research Agents", "Enterprise RAG", "Google Cloud Vertex"],
    issueDate: "2026"
  },
  {
    id: "aws-ml-foundations",
    badgeId: "10ee48fe-6534-4ca2-962c-e91b44f88f67",
    title: "AWS Academy Graduate - Machine Learning Foundations",
    issuer: "Amazon Web Services Training and Certification",
    issuerCode: "aws",
    category: "cloud",
    categoryLabel: "CLOUD MACHINE LEARNING",
    localImage: "/Sertif/badges/10ee48fe-6534-4ca2-962c-e91b44f88f67.png",
    remoteImage: "https://images.credly.com/images/727c2754-d727-4e27-a1aa-3de2425ce239/blob",
    verificationUrl: "https://www.credly.com/badges/10ee48fe-6534-4ca2-962c-e91b44f88f67",
    embedUrl: "https://www.credly.com/embedded_badge/10ee48fe-6534-4ca2-962c-e91b44f88f67",
    description: "Comprehensive graduate validation in cloud-native machine learning pipelines, data preprocessing, mathematical loss formulations, computer vision, NLP, and model hosting on AWS.",
    skills: ["AWS SageMaker", "Supervised Learning", "Deep Learning", "Model Evaluation", "Cloud ML Architecture"],
    issueDate: "2025"
  },
  {
    id: "ibm-ai-literacy",
    badgeId: "5b8272fa-9ce4-492a-9c3a-7d4e6ea30e66",
    title: "AI Literacy",
    issuer: "IBM SkillsBuild",
    issuerCode: "ibm",
    category: "ai",
    categoryLabel: "AI ETHICS & ARCHITECTURE",
    localImage: "/Sertif/badges/5b8272fa-9ce4-492a-9c3a-7d4e6ea30e66.png",
    remoteImage: "https://images.credly.com/images/bc70837c-99ae-499d-a31d-2a7be79095e6/BadgeEmblem_AILiteracy.png",
    verificationUrl: "https://www.credly.com/badges/5b8272fa-9ce4-492a-9c3a-7d4e6ea30e66",
    embedUrl: "https://www.credly.com/embedded_badge/5b8272fa-9ce4-492a-9c3a-7d4e6ea30e66",
    description: "Demonstrates foundational and practical mastery of AI principles, ethics in autonomous systems, model trust and bias evaluation, and deploying practical business intelligence algorithms.",
    skills: ["AI Ethics", "Neural Architectures", "Bias Mitigation", "Decision Intelligence", "AI Governance"],
    issueDate: "2025"
  },
  {
    id: "ibm-getting-started-data",
    badgeId: "b2021feb-9d3d-4e57-9db6-fc3ca343317a",
    title: "Getting Started with Data",
    issuer: "IBM SkillsBuild",
    issuerCode: "ibm",
    category: "data",
    categoryLabel: "DATA SCIENCE & PIPELINES",
    localImage: "/Sertif/badges/b2021feb-9d3d-4e57-9db6-fc3ca343317a.png",
    remoteImage: "https://images.credly.com/images/9a6e098a-618a-4e5a-8e8e-364a66b2f3de/Getting_20Started_20With_20Data_20Badge.png",
    verificationUrl: "https://www.credly.com/badges/b2021feb-9d3d-4e57-9db6-fc3ca343317a",
    embedUrl: "https://www.credly.com/embedded_badge/b2021feb-9d3d-4e57-9db6-fc3ca343317a",
    description: "Validation in data engineering foundations, analytical workflows, big data structures, statistical cleaning, exploratory analysis, and data storytelling.",
    skills: ["Data Engineering", "Data Analytics", "Statistical Modeling", "Exploratory Analysis", "ETL"],
    issueDate: "2025"
  },
  {
    id: "cisco-ccna-intro-networks",
    badgeId: "850c2115-6ce7-408f-9ef3-f17d89b8974c",
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    issuerCode: "cisco",
    category: "network",
    categoryLabel: "SYSTEMS & NETWORKING",
    localImage: "/Sertif/badges/850c2115-6ce7-408f-9ef3-f17d89b8974c.png",
    remoteImage: "https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png",
    verificationUrl: "https://www.credly.com/badges/850c2115-6ce7-408f-9ef3-f17d89b8974c",
    embedUrl: "https://www.credly.com/embedded_badge/850c2115-6ce7-408f-9ef3-f17d89b8974c",
    description: "Cisco-verified credential in network protocols, IPv4/IPv6 subnetting, physical & data link layers, Ethernet operations, switch & router configuration across 54 hands-on lab environments.",
    skills: ["IPv4 / IPv6 Subnetting", "Packet Tracer", "VLANs", "Routing Protocols", "Network Architecture"],
    issueDate: "2025"
  },
  {
    id: "cisco-ccna-switching-routing",
    badgeId: "918795f1-a120-406f-ac3e-4c932d8d7008",
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco",
    issuerCode: "cisco",
    category: "network",
    categoryLabel: "SYSTEMS & ROUTING",
    localImage: "/Sertif/badges/918795f1-a120-406f-ac3e-4c932d8d7008.png",
    remoteImage: "https://images.credly.com/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png",
    verificationUrl: "https://www.credly.com/badges/918795f1-a120-406f-ac3e-4c932d8d7008",
    embedUrl: "https://www.credly.com/embedded_badge/918795f1-a120-406f-ac3e-4c932d8d7008",
    description: "Advanced switching technologies, VLAN segmentation, inter-VLAN routing, STP redundancy protocols, EtherChannel aggregation, DHCP, and enterprise wireless LAN controller management.",
    skills: ["Switching Security", "Inter-VLAN Routing", "STP / RSTP", "Wireless LAN Controllers", "EtherChannel"],
    issueDate: "2025"
  },
  {
    id: "cisco-cybersecurity",
    badgeId: "17dbbbed-15ab-4507-b088-00665b9ad2af",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    issuerCode: "cisco",
    category: "security",
    categoryLabel: "CYBERSECURITY & DEFENSE",
    localImage: "/Sertif/badges/17dbbbed-15ab-4507-b088-00665b9ad2af.png",
    remoteImage: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
    verificationUrl: "https://www.credly.com/badges/17dbbbed-15ab-4507-b088-00665b9ad2af",
    embedUrl: "https://www.credly.com/embedded_badge/17dbbbed-15ab-4507-b088-00665b9ad2af",
    description: "Cisco certification validating cybersecurity defense principles: vulnerability assessment, threat detection, cryptography, network attack vectors, and enterprise defense-in-depth architecture.",
    skills: ["Vulnerability Assessment", "Threat Detection", "Cryptography", "Network Security", "Defense in Depth"],
    issueDate: "2025"
  }
];

export const FOLDER_CERTIFICATES: DocumentCertificate[] = [
  {
    id: "pragma-hackathon-ai",
    title: "AI-based Decision-Support System for Sepsis Management in the ICU",
    issuer: "PRAGMA 39 International Collaborative Hackathon (Thammasat, UCSD, Osaka, YARSI)",
    issuerCode: "pragma",
    category: "hackathon",
    categoryLabel: "INTERNATIONAL HACKATHON WINNER",
    date: "June 2023",
    certNumber: "PRAGMA-39-EXCELLENCE-AI",
    pdfUrl: "/Sertif/PRAGMA Certificate Hackathon_AI_Raihan Ghifari Winata.pdf",
    previewImage: "/Sertif/previews/PRAGMA Certificate Hackathon_AI_Raihan Ghifari Winata.webp",
    description: "Awarded 'Excellence in Team Work Award' for co-developing an AI clinical decision-support pipeline for predictive sepsis management in ICU wards under international research faculty oversight.",
    skills: ["Healthcare AI", "Clinical Decision Support", "MIMIC-III / IV", "Reinforcement Learning", "International Collaboration"],
    featured: true
  },
  {
    id: "samsung-innovation-stage-3",
    title: "Samsung Innovation Campus Batch 5 - Stage 3: AI Capstone & Model Engineering",
    issuer: "Samsung Electronics & Skilvul",
    issuerCode: "samsung",
    category: "ai",
    categoryLabel: "AI & CAPSTONE ENGINEERING",
    date: "17 September 2024",
    certNumber: "SKILVUL/CERT/SIC5/2024.IX/0182",
    pdfUrl: "/Sertif/Sertifikat Stage 3 - Samsung Innovation Campus Batch 5 (2023_2024).pdf",
    previewImage: "/Sertif/previews/Sertifikat Stage 3 - Samsung Innovation Campus Batch 5 (2023_2024).webp",
    description: "Selected as national finalist and successfully completed the rigorous AI Capstone project phase, building end-to-end computer vision and deep learning models solving real-world challenges.",
    skills: ["Computer Vision", "Deep Learning", "Edge AI", "End-to-End MLOps", "Product Innovation"],
    featured: true
  },
  {
    id: "samsung-innovation-stage-2",
    title: "Samsung Innovation Campus Batch 5 - Stage 2: IoT & Applied AI",
    issuer: "Samsung Electronics & Skilvul",
    issuerCode: "samsung",
    category: "ai",
    categoryLabel: "IOT & EMBEDDED AI",
    date: "17 September 2024",
    certNumber: "SKILVUL/CERT/SIC5/2024.IX/0538",
    pdfUrl: "/Sertif/Sertifikat Stage 2 - Samsung Innovation Campus Batch 5 (2023_2024).pdf",
    previewImage: "/Sertif/previews/Sertifikat Stage 2 - Samsung Innovation Campus Batch 5 (2023_2024).webp",
    description: "Certified completion of Stage 2 curriculum covering smart IoT telemetry, hardware sensor integration, microcontroller programming, and applied edge machine learning.",
    skills: ["IoT Telemetry", "Embedded Systems", "Sensor Fusion", "Edge ML", "Python on Microcontrollers"],
    featured: true
  },
  {
    id: "samsung-innovation-stage-1",
    title: "Samsung Innovation Campus Batch 5 - Stage 1: Coding & Innovation",
    issuer: "Samsung Electronics & Skilvul",
    issuerCode: "samsung",
    category: "programming",
    categoryLabel: "SYSTEMS PROGRAMMING",
    date: "17 September 2024",
    certNumber: "SKILVUL/CERT/SIC5/2024.IX/1955",
    pdfUrl: "/Sertif/Sertifikat Stage 1 - Samsung Innovation Campus Batch 5 (2023_2024).pdf",
    previewImage: "/Sertif/previews/Sertifikat Stage 1 - Samsung Innovation Campus Batch 5 (2023_2024).webp",
    description: "Successfully mastered fundamental software engineering, algorithmic problem solving, clean code architecture, and modern collaborative development methodologies.",
    skills: ["Algorithms", "Data Structures", "Python Core", "Problem Solving", "Software Engineering"],
    featured: false
  },
  {
    id: "dicoding-data-science",
    title: "Belajar Dasar Data Science",
    issuer: "Dicoding Indonesia (Accredited by IDCamp & AWS)",
    issuerCode: "dicoding",
    category: "data",
    categoryLabel: "DATA SCIENCE & STATISTICS",
    date: "04 September 2026",
    certNumber: "98XW8R9J0PM3",
    verificationUrl: "https://www.dicoding.com/certificates/98XW8R9J0PM3",
    pdfUrl: "/Sertif/Dicoding_DataScience.pdf",
    previewImage: "/Sertif/previews/Dicoding_DataScience.webp",
    description: "Comprehensive curriculum in the full data science lifecycle: data wrangling, exploratory data analysis, hypothesis testing, feature engineering, and statistical modeling.",
    skills: ["Data Wrangling", "Pandas", "NumPy", "Statistical Inference", "Data Visualization"],
    featured: true
  },
  {
    id: "dicoding-machine-learning",
    title: "Belajar Machine Learning untuk Pemula",
    issuer: "Dicoding Indonesia (Google Authorized Training Partner)",
    issuerCode: "dicoding",
    category: "ai",
    categoryLabel: "APPLIED MACHINE LEARNING",
    date: "04 September 2026",
    certNumber: "1RXYDMGNMXVM",
    verificationUrl: "https://www.dicoding.com/certificates/1RXYDMGNMXVM",
    pdfUrl: "/Sertif/Sertif_Dicoding_Belajar Machine Learning untuk Pemula.pdf",
    previewImage: "/Sertif/previews/Sertif_Dicoding_Belajar Machine Learning untuk Pemula.webp",
    description: "Hands-on mastery of supervised & unsupervised learning algorithms, TensorFlow image classification, overfitting mitigation, regularization, and model validation.",
    skills: ["Scikit-Learn", "TensorFlow", "Image Classification", "Overfitting Prevention", "Model Evaluation"],
    featured: true
  },
  {
    id: "dicoding-python",
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia",
    issuerCode: "dicoding",
    category: "programming",
    categoryLabel: "PYTHON ARCHITECTURE",
    date: "04 September 2026",
    certNumber: "GRX50L7N2Z0M",
    verificationUrl: "https://www.dicoding.com/certificates/GRX50L7N2Z0M",
    pdfUrl: "/Sertif/Sertif_Dicoding_Memulai Pemrograman dengan Python.pdf",
    previewImage: "/Sertif/previews/Sertif_Dicoding_Memulai Pemrograman dengan Python.webp",
    description: "Mastery of Python language paradigms, object-oriented programming (OOP), functional constructs, exception handling, and modular test-driven development.",
    skills: ["Python OOP", "Functional Programming", "Data Structures", "Unit Testing", "Clean Code"],
    featured: false
  },
  {
    id: "dicoding-sql",
    title: "Belajar Dasar Structured Query Language (SQL)",
    issuer: "Dicoding Indonesia",
    issuerCode: "dicoding",
    category: "data",
    categoryLabel: "DATABASE ENGINEERING",
    date: "04 September 2026",
    certNumber: "EYX4O23NJXDL",
    verificationUrl: "https://www.dicoding.com/certificates/EYX4O23NJXDL",
    pdfUrl: "/Sertif/Sertif_Dicoding_Belajar Dasar Structured Query Language (SQL).pdf",
    previewImage: "/Sertif/previews/Sertif_Dicoding_Belajar Dasar Structured Query Language (SQL).webp",
    description: "Relational database schema modeling, normalized query execution, complex multi-table joins, subqueries, grouping aggregates, and transactional data operations.",
    skills: ["Relational Databases", "SQL Joins", "Aggregation & Grouping", "Query Optimization", "PostgreSQL / MySQL"],
    featured: false
  },
  {
    id: "citi-ethics-human-research",
    title: "Human Research: Data or Specimens Only Research",
    issuer: "CITI Program (Collaborative Institutional Training Initiative)",
    issuerCode: "citi",
    category: "ethics",
    categoryLabel: "CLINICAL RESEARCH ETHICS",
    date: "2024",
    certNumber: "65757655",
    verificationUrl: "https://www.citiprogram.org",
    pdfUrl: "/Sertif/citiCompletionCertificate_13827927_65757655 (1).pdf",
    previewImage: "/Sertif/previews/citiCompletionCertificate_13827927_65757655 (1).webp",
    description: "International ethics credential qualifying researcher for secondary analysis of de-identified human clinical datasets (e.g., MIMIC-IV, eICU), HIPAA data compliance, and IRB protocols.",
    skills: ["HIPAA Compliance", "Clinical Data Ethics", "IRB Protocols", "De-identification", "MIMIC-IV Data Governance"],
    featured: true
  },
  {
    id: "citi-coi",
    title: "CITI Program: Conflicts of Interest (COI)",
    issuer: "CITI Program (Collaborative Institutional Training Initiative)",
    issuerCode: "citi",
    category: "ethics",
    categoryLabel: "RESEARCH INTEGRITY",
    date: "2024",
    certNumber: "65757654",
    verificationUrl: "https://www.citiprogram.org",
    pdfUrl: "/Sertif/citiCompletionCertificate_13827927_65757654.pdf",
    previewImage: "/Sertif/previews/citiCompletionCertificate_13827927_65757654.webp",
    description: "Professional certification validating adherence to federal and institutional standards for objectivity, financial disclosure, and ethical integrity in scientific research.",
    skills: ["Research Integrity", "Institutional Compliance", "Ethical Conduct", "Objectivity in AI Research"],
    featured: false
  },
  {
    id: "pragma-committee",
    title: "PRAGMA 39 International Conference - Technical Committee",
    issuer: "PRAGMA Consortium & Universitas YARSI",
    issuerCode: "pragma",
    category: "hackathon",
    categoryLabel: "CONFERENCE COMMITTEE",
    date: "June 2023",
    certNumber: "00109/FTI/PN.00/STF-PRAGMA/VI/2023",
    pdfUrl: "/Sertif/Raihan Ghifari Winata_CERTIFICATE_PRAGMA 39.pdf",
    previewImage: "/Sertif/previews/Raihan Ghifari Winata_CERTIFICATE_PRAGMA 39.webp",
    description: "Appointed to the YARSI Technical Committee for PRAGMA 39, managing technical infrastructure, international delegate logistics, and high-performance computing workshops.",
    skills: ["Technical Committee", "HPC Infrastructure", "International Event Coordination", "Cross-Border Logistics"],
    featured: false
  },
  {
    id: "pragma-participant",
    title: "PRAGMA 39 International Conference & Collaborative Workshop",
    issuer: "PRAGMA Consortium",
    issuerCode: "pragma",
    category: "hackathon",
    categoryLabel: "INTERNATIONAL WORKSHOP",
    date: "June 2023",
    certNumber: "00223/FTI/PN.00/STF-PRAGMA/VI/2023",
    pdfUrl: "/Sertif/Raihan Ghifari Winata_CERTIFICATE_PRAGMA 39 (1).pdf",
    previewImage: "/Sertif/previews/Raihan Ghifari Winata_CERTIFICATE_PRAGMA 39 (1).webp",
    description: "Active delegate in Pacific Rim Application and Grid Middleware Assembly workshops covering distributed computing, grid workflows, and cross-national bioinformatics pipelines.",
    skills: ["Distributed Computing", "Bioinformatics Workflows", "Grid Middleware", "High Performance Computing"],
    featured: false
  },
  {
    id: "teaching-assistant-ai",
    title: "Certificate of Appreciation: Teaching Assistant of Artificial Intelligence",
    issuer: "Informatics Department, Faculty of Information Technology, Universitas YARSI",
    issuerCode: "yarsi",
    category: "ai",
    categoryLabel: "ACADEMIC TEACHING ASSISTANT",
    date: "August 2026",
    certNumber: "0001/FTI-TI/SPK-PP-30.06/VIII/2025",
    pdfUrl: "/Sertif/Raihan Ghifari Winata (2).pdf",
    previewImage: "/Sertif/previews/Raihan Ghifari Winata (2).webp",
    description: "Official certificate of appreciation awarded by Faculty of Information Technology, Universitas YARSI for serving as Teaching Assistant in Artificial Intelligence Course, mentoring undergraduate students in heuristic search, logic, and machine learning models.",
    skills: ["Artificial Intelligence", "Teaching Assistant", "Algorithm Instruction", "Heuristic Search", "Machine Learning"],
    featured: true
  },
  {
    id: "teaching-assistant-oop",
    title: "Certificate of Appreciation: Teaching Assistant of Object-Oriented Programming",
    issuer: "Informatics Department, Faculty of Information Technology, Universitas YARSI",
    issuerCode: "yarsi",
    category: "programming",
    categoryLabel: "ACADEMIC TEACHING ASSISTANT",
    date: "August 2026",
    certNumber: "0001/FTI-TI/SPK-PP-30.06/VIII/2025",
    pdfUrl: "/Sertif/Raihan Ghifari Winata (3).pdf",
    previewImage: "/Sertif/previews/Raihan Ghifari Winata (3).webp",
    description: "Official certificate of appreciation awarded by Universitas YARSI for leading laboratory practicums in Object-Oriented Programming (OOP), guiding students in inheritance, polymorphism, encapsulation, and clean software architecture.",
    skills: ["Object-Oriented Programming", "Design Patterns", "Java / Python", "Code Architecture", "Student Mentorship"],
    featured: true
  },
  {
    id: "teaching-assistant-programming",
    title: "Certificate of Appreciation: Teaching Assistant of Introduction to Programming",
    issuer: "Informatics Department, Faculty of Information Technology, Universitas YARSI",
    issuerCode: "yarsi",
    category: "programming",
    categoryLabel: "ACADEMIC TEACHING ASSISTANT",
    date: "August 2026",
    certNumber: "0001/FTI-TI/SPK-PP-30.06/VIII/2024",
    pdfUrl: "/Sertif/Raihan Ghifari Winata.pdf",
    previewImage: "/Sertif/previews/Raihan Ghifari Winata.webp",
    description: "Appointed as Teaching Assistant for foundational Computer Science students in Introduction to Programming at Universitas YARSI, directing algorithm debugging, syntax mastery, and problem-solving labs.",
    skills: ["Programming Foundations", "Algorithmic Thinking", "Code Review", "Student Mentorship", "Python"],
    featured: false
  }
];

export const ALL_VERIFIED_COUNT = CREDLY_BADGES.length + FOLDER_CERTIFICATES.length;

