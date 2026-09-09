"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  ArrowRight,
  Terminal,
  Rotate3d,
  Loader2,
  Crosshair,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

interface NeuralSkill {
  id: string;
  name: string;
  category: "ai" | "backend" | "frontend" | "cloud";
  categoryLabel: string;
  level: string;
  proficiency: number;
  highlight: string;
  brandColor: string;
  xPercent: number;
  yPercent: number;
  svgX: number;
  svgY: number;
  controlX: number;
  controlY: number;
  iconSvg: React.ReactNode;
}

const NEURAL_SKILLS: NeuralSkill[] = [
  // Left Flank (AI, RL & High-Speed Serving)
  {
    id: "pytorch",
    name: "PyTorch & Deep RL",
    category: "ai",
    categoryLabel: "Deep Learning & RL",
    level: "EXPERT : 95%",
    proficiency: 95,
    highlight: "Custom Lagrangian constrained SAC, continuous action space ensembles & parallel CUDA tensor pipelines.",
    brandColor: "#ee4c2c",
    xPercent: 14,
    yPercent: 18,
    svgX: 140,
    svgY: 130,
    controlX: 320,
    controlY: 90,
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12.74 0c.26 0 .52.1.72.3l7.98 7.98a1.02 1.02 0 0 1 0 1.44l-7.98 7.98a1.02 1.02 0 0 1-1.44 0l-7.98-7.98a1.02 1.02 0 0 1 0-1.44L12.02.3c.2-.2.46-.3.72-.3zm-.02 4.1L8.6 8.22l4.12 4.12 4.12-4.12-4.12-4.12zm0 14.8c-.56 0-1.02.46-1.02 1.02v2.06c0 .56.46 1.02 1.02 1.02.56 0 1.02-.46 1.02-1.02v-2.06c0-.56-.46-1.02-1.02-1.02z" />
      </svg>
    ),
  },
  {
    id: "python",
    name: "Python (AI Core)",
    category: "ai",
    categoryLabel: "Core Architecture",
    level: "EXPERT : 96%",
    proficiency: 96,
    highlight: "Algorithmic optimization, asynchronous data ingestion engines, and high-performance vector math.",
    brandColor: "#38bdf8",
    xPercent: 11,
    yPercent: 37,
    svgX: 110,
    svgY: 260,
    controlX: 300,
    controlY: 180,
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M11.91 0c-3.17 0-5.24.23-5.24 2.14v2.14h5.24v.71H4.63C1.65 5 0 7.37 0 10.35s1.46 5.35 4.63 5.35h1.79v-2.5c0-1.84 1.57-3.35 3.42-3.35h5.23c1.55 0 2.8-1.25 2.8-2.8V2.14C17.87.23 15.08 0 11.91 0zm-2.42 1.43c.48 0 .86.38.86.86s-.38.86-.86.86-.86-.38-.86-.86.38-.86.86-.86zM19.37 8.3v2.5c0 1.84-1.57 3.35-3.42 3.35H10.7c-1.55 0-2.8 1.25-2.8 2.8v4.91c0 1.91 2.79 2.14 5.96 2.14 3.17 0 5.24-.23 5.24-2.14v-2.14h-5.24v-.71h7.28c2.98 0 4.63-2.37 4.63-5.35s-1.46-5.36-4.63-5.36h-1.77zm-4.99 12.84c.48 0 .86.38.86.86s-.38.86-.86.86-.86-.38-.86-.86.38-.86.86-.86z" />
      </svg>
    ),
  },
  {
    id: "fastapi",
    name: "FastAPI Microservices",
    category: "backend",
    categoryLabel: "High-Speed Serving",
    level: "ADVANCED : 93%",
    proficiency: 93,
    highlight: "Sub-15ms asynchronous inference endpoints, Pydantic v2 strict contract schemas & Redis cache.",
    brandColor: "#009688",
    xPercent: 15,
    yPercent: 57,
    svgX: 150,
    svgY: 400,
    controlX: 320,
    controlY: 260,
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-.86 19.38v-5.74H7.26l6.88-9.02v5.74h3.86l-6.86 9.02z" />
      </svg>
    ),
  },
  {
    id: "docker",
    name: "Docker & GPU Runtime",
    category: "cloud",
    categoryLabel: "MLOps & Runtime",
    level: "ADVANCED : 90%",
    proficiency: 90,
    highlight: "Multi-stage lightweight images, NVIDIA Container Toolkit runtime & GPU worker cluster isolation.",
    brandColor: "#2496ed",
    xPercent: 12,
    yPercent: 77,
    svgX: 120,
    svgY: 540,
    controlX: 300,
    controlY: 330,
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M13.98 11.08h2.15v2.15h-2.15v-2.15zm-3.22 0h2.15v2.15h-2.15v-2.15zm-3.23 0h2.15v2.15H7.53v-2.15zm9.68-3.23h2.15V10h-2.15V7.85zm-3.22 0h2.15V10h-2.15V7.85zm-3.23 0h2.15V10H10.76V7.85zm-3.23 0h2.15V10H7.53V7.85zm9.68-3.23h2.15v2.15h-2.15V4.62zm-3.22 0h2.15v2.15h-2.15V4.62zm9.68 9.68c-.43 2.15-2.15 4.3-4.3 5.38-3.23 1.6-7.53 1.6-10.75 0-3.23-1.6-5.38-4.84-5.38-8.6 0-.54.05-1.08.16-1.61h14.52c.54 0 1.08.05 1.61.16 1.08.22 2.15.86 2.69 1.72.54.86.86 1.83.86 2.95h.59z" />
      </svg>
    ),
  },
  {
    id: "mimic",
    name: "MIMIC-III & Health RL",
    category: "ai",
    categoryLabel: "Healthcare Informatics",
    level: "EXPERT : 95%",
    proficiency: 95,
    highlight: "Trajectory extraction over 61,532 ICU stays, OPE validation & Sepsis dosage recommendation.",
    brandColor: "#10b981",
    xPercent: 17,
    yPercent: 94,
    svgX: 170,
    svgY: 658,
    controlX: 340,
    controlY: 390,
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },

  // Right Flank (Agents, Frontend, Cloud)
  {
    id: "langgraph",
    name: "LangGraph & AI Agents",
    category: "ai",
    categoryLabel: "Autonomous Reasoning",
    level: "EXPERT : 94%",
    proficiency: 94,
    highlight: "Cyclic multi-agent state graphs, hybrid semantic retrieval, deterministic tool dispatch & prompt shielding.",
    brandColor: "#a855f7",
    xPercent: 86,
    yPercent: 18,
    svgX: 860,
    svgY: 130,
    controlX: 680,
    controlY: 90,
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js & React 19",
    category: "frontend",
    categoryLabel: "Modern Web Systems",
    level: "EXPERT : 93%",
    proficiency: 93,
    highlight: "Server Components (RSC), predictive streaming rendering, and kinetic physics-driven interfaces.",
    brandColor: "#ffffff",
    xPercent: 89,
    yPercent: 37,
    svgX: 890,
    svgY: 260,
    controlX: 700,
    controlY: 180,
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.66 17.66l-5.66-8v8H10V6.34h2.15l5.51 7.8v-7.8h2v11.32h-2z" />
      </svg>
    ),
  },
  {
    id: "typescript",
    name: "TypeScript (Strict)",
    category: "frontend",
    categoryLabel: "Type-Safe Logic",
    level: "ADVANCED : 91%",
    proficiency: 91,
    highlight: "Zero-any compile-time schema verification, discriminated unions, and resilient domain models.",
    brandColor: "#3178c6",
    xPercent: 85,
    yPercent: 57,
    svgX: 850,
    svgY: 400,
    controlX: 680,
    controlY: 260,
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M0 0h24v24H0V0zm11.66 18.25v-2.4c-.6.9-1.5 1.4-2.6 1.4-2.4 0-3.6-1.6-3.6-4.2V6h2.5v6.8c0 1.5.6 2.3 1.8 2.3 1.1 0 1.9-.8 1.9-2.3V6h2.5v12.25h-2.5zm6.84 0c-1.8 0-3.2-.6-4.1-1.7l1.4-1.8c.7.8 1.6 1.2 2.7 1.2 1.1 0 1.7-.5 1.7-1.1 0-.7-.5-1-1.7-1.3l-1.3-.3c-2-.5-2.9-1.5-2.9-3 0-2 1.6-3.3 3.9-3.3 1.6 0 2.8.5 3.6 1.4l-1.3 1.7c-.6-.6-1.4-.9-2.3-.9-1 0-1.5.4-1.5 1 0 .6.4.9 1.5 1.2l1.2.3c2.3.5 3.2 1.6 3.2 3.1 0 2-1.6 3.5-4.1 3.5z" />
      </svg>
    ),
  },
  {
    id: "aws",
    name: "AWS Cloud & GPU",
    category: "cloud",
    categoryLabel: "Cloud Infrastructure",
    level: "CERTIFIED : 89%",
    proficiency: 89,
    highlight: "AWS Certified AI Practitioner. Spot multi-GPU cluster provisioning with 10× training throughput.",
    brandColor: "#f59e0b",
    xPercent: 88,
    yPercent: 77,
    svgX: 880,
    svgY: 540,
    controlX: 700,
    controlY: 330,
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M6.88 12.28a.5.5 0 0 1-.48-.36 7.4 7.4 0 0 1-.2-1.72 7.46 7.46 0 0 1 7.45-7.45 7.46 7.46 0 0 1 7.3 6.01 4.7 4.7 0 0 1 1.7.35 4.67 4.67 0 0 1-4.35 6.36H6.38a4.39 4.39 0 0 1-4.38-4.39 4.39 4.39 0 0 1 4.88-4.37v1.17zm13.14 6.72c-2.4 1.52-5.46 2.33-8.52 2.33-4.28 0-8.16-1.6-11.08-4.28-.24-.22-.04-.52.24-.35 3.18 1.9 7.02 3.03 10.96 3.03 2.72 0 5.67-.62 8.28-1.92.39-.2.62.24.12.59v.6z" />
      </svg>
    ),
  },
  {
    id: "vlm",
    name: "Vision-Language (VLMs)",
    category: "ai",
    categoryLabel: "Multimodal Vision",
    level: "ADVANCED : 88%",
    proficiency: 88,
    highlight: "Quantized 4-bit LLaVA & Qwen2-VL edge pipelines fused with OpenCV spatial defect extraction.",
    brandColor: "#38bdf8",
    xPercent: 83,
    yPercent: 94,
    svgX: 830,
    svgY: 658,
    controlX: 660,
    controlY: 390,
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18" />
        <path d="M3 12h18" />
        <circle cx="12" cy="12" r="3" className="fill-current stroke-none" />
      </svg>
    ),
  },
];

const CATEGORIES = [
  { id: "all", label: "ALL CAPABILITIES" },
  { id: "ai", label: "AI & REINFORCEMENT LEARNING" },
  { id: "backend", label: "BACKEND & SERVING" },
  { id: "frontend", label: "FRONTEND & UI" },
  { id: "cloud", label: "CLOUD & MLOPS" },
];

const CATEGORIES_ID = [
  { id: "all", label: "SEMUA KAPABILITAS" },
  { id: "ai", label: "AI & REINFORCEMENT LEARNING" },
  { id: "backend", label: "BACKEND & SERVING" },
  { id: "frontend", label: "FRONTEND & ANTARMUKA" },
  { id: "cloud", label: "CLOUD & MLOPS" },
];

export default function RobotNeuralHeroSection() {
  const { language } = usePortfolio();
  const isId = language === "id";
  const categories = isId ? CATEGORIES_ID : CATEGORIES;

  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "pytorch",
    "langgraph",
    "python",
    "nextjs",
  ]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [autoRotate, setAutoRotate] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);

  // SVG Head anchor coordinates in SVG space (1000x700)
  const [headScreenPos, setHeadScreenPos] = useState({ x: 500, y: 125 });

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const robotPivotRef = useRef<THREE.Group | null>(null);
  const targetRotationYRef = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(false);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  const toggleSkill = (id: string) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const filteredSkills =
    activeCategory === "all"
      ? NEURAL_SKILLS
      : NEURAL_SKILLS.filter((s) => s.category === activeCategory);

  // ===================================================================
  // REAL THREE.JS 3D GLB ROBOT WITH NATURAL HEAD GAZE TRACKING (AUTHENTIC TEXTURE)
  // ===================================================================
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    let width = container.clientWidth || 560;
    let height = container.clientHeight || 760;

    // 1. Scene & Perspective Camera (Distance 4.5, FOV 34 for complete zero-clipping)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.05, 4.5);

    // 2. High Performance WebGL Renderer with Pure Transparent Background
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.style.outline = "none";
    renderer.domElement.style.cursor = "grab";
    container.appendChild(renderer.domElement);

    // 3. Cinematic Studio Lighting (Cyber Studio Setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 4.5);
    cyanRimLight.position.set(-4, 2, 2);
    scene.add(cyanRimLight);

    const purpleBackLight = new THREE.DirectionalLight(0xa855f7, 4.8);
    purpleBackLight.position.set(0, 4, -4);
    scene.add(purpleBackLight);

    const softFillLight = new THREE.DirectionalLight(0x60a5fa, 1.8);
    softFillLight.position.set(0, -3, 3);
    scene.add(softFillLight);

    // 4. Holographic Base Pedestal Rings
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.35, 0);
    scene.add(pedestalGroup);

    const cyanRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const purpleRingMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.012, 16, 48), cyanRingMat);
    ring1.rotation.x = Math.PI * 0.5;
    pedestalGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.008, 16, 48), purpleRingMat);
    ring2.rotation.x = Math.PI * 0.5;
    pedestalGroup.add(ring2);

    // 5. Robot Pivot Group & Model Loading
    const robotPivot = new THREE.Group();
    robotPivotRef.current = robotPivot;
    scene.add(robotPivot);

    // Head Articulation Anchor (Follows Neck & Head Rotation for Dynamic Synapses)
    const headPivotGroup = new THREE.Group();
    robotPivot.add(headPivotGroup);

    const headTrackingAnchor = new THREE.Object3D();
    headPivotGroup.add(headTrackingAnchor);
    headTrackingAnchor.position.set(0, 0.28, 0); // Position at helmet apex

    // Custom Shader Uniform for Dynamic Head Tracking
    const customUniforms = {
      uHeadRotation: { value: new THREE.Vector2(0, 0) },
    };

    // Load User's True GLB Robot Model
    const loader = new GLTFLoader();
    loader.load(
      "/assets/models/robot.glb",
      (gltf) => {
        const model = gltf.scene;

        // Auto-center & auto-scale model to fit unclipped bounding box
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Target height calibrated for zero clipping (2.42 units)
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const targetHeight = 2.42;
        const scaleFactor = targetHeight / maxDim;
        model.scale.setScalar(scaleFactor);

        // Center geometry on origin
        model.position.x = -center.x * scaleFactor;
        model.position.y = -center.y * scaleFactor;
        model.position.z = -center.z * scaleFactor;

        // Neck pivot coordinate in scaled group space
        const neckWorldY = (0.84 - center.y) * scaleFactor;
        headPivotGroup.position.set(0, neckWorldY, 0);

        // Reposition head tracking anchor at top of cranium
        headTrackingAnchor.position.set(0, (1.0 - 0.84) * scaleFactor + 0.04, 0);

        // Enhance materials with PBR physical properties + Custom Vertex Head Tracking (Zero Color Distortion)
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.min(mat.roughness ?? 0.3, 0.38);
              mat.metalness = Math.max(mat.metalness ?? 0.2, 0.42);

              // Inject Custom GLSL for Head Rotation (Preserves Authentic Original Textures & Visor)
              mat.onBeforeCompile = (shader) => {
                shader.uniforms.uHeadRotation = customUniforms.uHeadRotation;

                // Vertex Shader: Smooth neck pivot deformation following cursor correctly
                shader.vertexShader = `
                  uniform vec2 uHeadRotation;
                ` + shader.vertexShader;

                shader.vertexShader = shader.vertexShader.replace(
                  "#include <begin_vertex>",
                  `
                  #include <begin_vertex>

                  // Dynamic neck blend: vertices above y = 0.81 rotate around neck pivot (0.0, 0.84, 0.0)
                  float neckWeight = smoothstep(0.81, 0.88, position.y);
                  if (neckWeight > 0.0) {
                    float yaw = uHeadRotation.x * neckWeight;
                    float pitch = uHeadRotation.y * neckWeight;

                    vec3 pivot = vec3(0.0, 0.84, 0.0);
                    vec3 p = position - pivot;
                    vec3 n = normal;

                    // Yaw rotation around Y axis
                    float cy = cos(yaw);
                    float sy = sin(yaw);
                    mat3 rotY = mat3(
                      cy,  0.0, sy,
                      0.0, 1.0, 0.0,
                      -sy, 0.0, cy
                    );
                    p = rotY * p;
                    n = rotY * n;

                    // Pitch rotation around X axis
                    float cx = cos(pitch);
                    float sx = sin(pitch);
                    mat3 rotX = mat3(
                      1.0, 0.0, 0.0,
                      0.0, cx,  -sx,
                      0.0, sx,  cx
                    );
                    p = rotX * p;
                    n = rotX * n;

                    transformed = p + pivot;
                    transformedNormal = n;
                  }
                  `
                );
              };
            }
          }
        });

        robotPivot.add(model);
        setModelLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
        setModelLoading(false);
      }
    );

    // 6. Interactive Cursor Tracking & Orbit Physics
    let isDragging = false;
    let prevPointerX = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;
    let mouseNormX = 0;
    let mouseNormY = 0;

    // Smooth head tracking angles
    let currentHeadYaw = 0;
    let currentHeadPitch = 0;
    let targetHeadYaw = 0;
    let targetHeadPitch = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      renderer.domElement.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNormX = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
      mouseNormY = (e.clientY - rect.top) / (rect.height || 1) - 0.5;

      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        targetRotationY += deltaX * 0.012;
        targetRotationYRef.current = targetRotationY;
        prevPointerX = e.clientX;
      }
    };

    // Global cursor tracking: when cursor is on the RIGHT, head turns RIGHT; when cursor is on the LEFT, head turns LEFT
    const onWindowMouseMove = (e: MouseEvent) => {
      const winNormX = (e.clientX / window.innerWidth - 0.5) * 2;
      const winNormY = (e.clientY / window.innerHeight - 0.5) * 2;

      // Inverted sign for correct anatomical gaze direction:
      // winNormX > 0 (right side of screen) -> targetHeadYaw < 0 -> face turns to the user's right (+X)!
      // winNormX < 0 (left side of screen) -> targetHeadYaw > 0 -> face turns to the user's left (-X)!
      targetHeadYaw = Math.max(-0.55, Math.min(0.55, -winNormX * 0.65));
      targetHeadPitch = Math.max(-0.32, Math.min(0.32, -winNormY * 0.38));
    };

    // Passive horizontal hover scrubbing
    const onContainerMouseMove = (e: MouseEvent) => {
      if (!isDragging && !autoRotateRef.current) {
        const rect = container.getBoundingClientRect();
        const norm = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
        targetRotationY = targetRotationYRef.current + norm * 0.55;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("mousemove", onContainerMouseMove);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("pointerup", onPointerUp);

    // 7. Animation Loop & Dynamic Real-Time Synapse Projection
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const headWorldPos = new THREE.Vector3();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Continuous auto-spin if active
      if (autoRotateRef.current && !isDragging) {
        targetRotationY += 0.009;
        targetRotationYRef.current = targetRotationY;
      }

      // Smooth body rotation damping
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (mouseNormY * 0.25 - currentRotationX) * 0.06;

      robotPivot.rotation.y = currentRotationY;
      robotPivot.rotation.x = currentRotationX * 0.35;

      // Smooth Head Tracking Interpolation (Spring Lerp)
      currentHeadYaw += (targetHeadYaw - currentHeadYaw) * 0.09;
      currentHeadPitch += (targetHeadPitch - currentHeadPitch) * 0.09;

      // Update Custom Shader Uniforms
      customUniforms.uHeadRotation.value.set(currentHeadYaw, currentHeadPitch);

      // Update 3D Head Group (Synchronizes with Head Rotation)
      headPivotGroup.rotation.y = currentHeadYaw;
      headPivotGroup.rotation.x = currentHeadPitch;

      // Subtle organic breathing motion
      const breath = Math.sin(elapsed * 1.8) * 0.018;
      robotPivot.position.y = breath;

      // Spin holographic pedestal floor rings
      ring1.rotation.z = elapsed * 0.25;
      ring2.rotation.z = -elapsed * 0.18;

      renderer.render(scene, camera);

      // Project 3D Robot Head Coordinate to 2D SVG Space (1000x700 viewBox)
      headTrackingAnchor.getWorldPosition(headWorldPos);
      headWorldPos.project(camera);

      // Convert normalized device coordinates [-1, 1] to SVG coordinates [0, 1000] & [0, 700]
      const projX = ((headWorldPos.x + 1) / 2) * 1000;
      const projY = ((-headWorldPos.y + 1) / 2) * 700;

      setHeadScreenPos({
        x: Math.round(projX),
        y: Math.round(projY),
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 560;
      height = container.clientHeight || 760;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      domEl.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("mousemove", onContainerMouseMove);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      cyanRingMat.dispose();
      purpleRingMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Preset angle switcher
  const setPresetAngle = (rad: number) => {
    setAutoRotate(false);
    targetRotationYRef.current = rad;
  };

  return (
    <section className="relative w-full min-h-[960px] lg:min-h-[1060px] flex flex-col items-center justify-start overflow-hidden pt-28 pb-20 select-none">
      {/* Background Ambient Lighting & Cybernetic Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-cyan-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      </div>

      {/* Top Header Information */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mb-2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="tracking-[0.2em] uppercase font-bold">
              {isId ? "INTI KOGNITIF NEURAL 3D • PEMETAAN SINAPSIS" : "3D NEURAL COGNITIVE CORE • SYNAPSE MAPPING"}
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white leading-none uppercase drop-shadow-2xl mt-1">
            {isId ? "KEAHLIAN & ALAT REKAYASA" : "SKILLS & TOOLS"}
          </h1>

          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-slate-400 uppercase">
              {isId ? "RIG ROBOT 3D INTERAKTIF • PELACAKAN PANDANGAN REAL-TIME & MATRIKS KINETIK" : "INTERACTIVE 3D ROBOT RIG • REAL-TIME GAZE TRACKING & KINETIC SYNAPSE MATRIX"}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
              <Crosshair className="w-3 h-3 text-cyan-400 animate-spin" />
              <span>{isId ? "PELACAKAN AKTIF" : "GAZE TRACKING ACTIVE"}</span>
            </span>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${activeCategory === cat.id
                  ? "bg-white text-black shadow-lg shadow-white/15 scale-105"
                  : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Central Visual Arena with Real 3D GLB Robot, Dynamic SVG Synaptic Lines, and Floating Badges */}
      <div className="relative w-full max-w-[1400px] h-[760px] sm:h-[820px] mx-auto mt-2">
        {/* 1. SVG Dynamic Neural Synapse Lines (Connected in Real-Time to 3D GLB Robot Head) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="headCoreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="1" />
            </linearGradient>

            <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Central Neural Cranium Emitter Circle (Follows 3D Robot Head in Real-Time) */}
          <circle
            cx={headScreenPos.x}
            cy={headScreenPos.y}
            r="14"
            fill="url(#headCoreGlow)"
            filter="url(#glowFilter)"
            className="animate-pulse"
          />
          <circle
            cx={headScreenPos.x}
            cy={headScreenPos.y}
            r="28"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            opacity="0.5"
            strokeDasharray="4 4"
            className="animate-[spin_20s_linear_infinite]"
          />
          <circle
            cx={headScreenPos.x}
            cy={headScreenPos.y}
            r="44"
            fill="none"
            stroke="#818cf8"
            strokeWidth="1"
            opacity="0.25"
            strokeDasharray="2 6"
          />

          {/* Neural Connection Lines to each Skill */}
          {NEURAL_SKILLS.map((skill) => {
            const isSelected = selectedSkills.includes(skill.id);
            const isHovered = hoveredSkill === skill.id;
            const isActive = isSelected || isHovered;
            const isCategoryMatched =
              activeCategory === "all" || skill.category === activeCategory;

            // Live Bezier curve from 3D Head position to Skill card
            const pathD = `M ${headScreenPos.x} ${headScreenPos.y} Q ${skill.controlX} ${skill.controlY} ${skill.svgX} ${skill.svgY}`;

            return (
              <g
                key={`path-${skill.id}`}
                opacity={isCategoryMatched ? (isActive ? 1 : 0.4) : 0.1}
                className="transition-opacity duration-300"
              >
                {/* Circuit pathway line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isActive ? skill.brandColor : "rgba(255,255,255,0.12)"}
                  strokeWidth={isActive ? 2.5 : 1}
                  strokeDasharray={isActive ? "none" : "4 6"}
                  filter={isActive ? "url(#glowFilter)" : undefined}
                  className="transition-all duration-300"
                />

                {/* Traveling photon packet along the live curve */}
                {isActive && (
                  <circle r="4.5" fill={skill.brandColor} filter="url(#glowFilter)">
                    <animateMotion
                      path={pathD}
                      dur="2.2s"
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                )}

                {/* Target skill node anchor dot */}
                <circle
                  cx={skill.svgX}
                  cy={skill.svgY}
                  r={isActive ? 6 : 3}
                  fill={isActive ? skill.brandColor : "#64748b"}
                  filter={isActive ? "url(#glowFilter)" : undefined}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* 2. REAL THREE.JS 3D GLB ROBOT CANVAS WITH CORRECT HEAD TRACKING & AUTHENTIC MODEL TEXTURES */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[520px] md:w-[580px] h-[720px] sm:h-[780px] z-20 flex flex-col items-center justify-center">
          {/* Loading Indicator */}
          {modelLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-30 bg-[#0a0a12]/70 backdrop-blur-md rounded-3xl">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
                CALIBRATING 3D GAZE TRACKING...
              </span>
            </div>
          )}

          {/* Three.js Container */}
          <div
            ref={canvasContainerRef}
            className="relative w-full h-full flex items-center justify-center select-none touch-none"
          />

          {/* 3D Orbit Controls & Angle Presets */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-[#11111a]/95 border border-white/20 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-1 pl-2 pr-1 text-[10px] font-mono font-bold text-cyan-400 uppercase">
              <Rotate3d className="w-3.5 h-3.5 animate-spin" />
              <span className="hidden sm:inline">3D GLB</span>
            </div>

            <button
              onClick={() => setPresetAngle(0)}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {isId ? "DEPAN" : "FRONT"}
            </button>
            <button
              onClick={() => setPresetAngle(-Math.PI * 0.25)}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {isId ? "KIRI-45°" : "L-45°"}
            </button>
            <button
              onClick={() => setPresetAngle(Math.PI * 0.25)}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {isId ? "KANAN-45°" : "R-45°"}
            </button>
            <button
              onClick={() => setPresetAngle(Math.PI)}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {isId ? "BELAKANG" : "REAR"}
            </button>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all cursor-pointer ${autoRotate
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/30"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
            >
              {autoRotate ? (isId ? "BERPUTAR" : "SPINNING") : (isId ? "PUTAR 360°" : "360° SPIN")}
            </button>
          </div>
        </div>

        {/* 3. Floating Interactive Skill Nodes with Dynamic Spring Feedback */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {filteredSkills.map((skill, idx) => {
            const isSelected = selectedSkills.includes(skill.id);
            const isHovered = hoveredSkill === skill.id;

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                style={{
                  left: `${skill.xPercent}%`,
                  top: `${skill.yPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                onClick={() => toggleSkill(skill.id)}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-2xl transition-all duration-300 shadow-2xl ${isSelected
                      ? "bg-[#11111a] border-opacity-100 shadow-2xl"
                      : "bg-[#11111a]/85 border-white/10 text-slate-300 hover:border-white/30"
                    }`}
                  style={{
                    borderColor: isSelected || isHovered ? skill.brandColor : undefined,
                    boxShadow:
                      isSelected || isHovered
                        ? `0 0 28px ${skill.brandColor}40`
                        : undefined,
                  }}
                >
                  {/* Icon with Brand Accent Aura */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${skill.brandColor}18`,
                      borderColor: `${skill.brandColor}40`,
                      color: skill.brandColor === "#ffffff" ? "#ffffff" : skill.brandColor,
                    }}
                  >
                    {skill.iconSvg}
                  </div>

                  {/* Title & Level Metric */}
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight whitespace-nowrap">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {skill.level}
                    </span>
                  </div>

                  {/* Spring Interactive Checkbox */}
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected
                        ? "bg-cyan-400 text-black border-cyan-300 shadow-[0_0_10px_#22d3ee]"
                        : "border-white/20 text-transparent"
                      }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. Contingent Feedback Status & Action Deployment Banner */}
      <div className="relative z-30 w-full max-w-4xl mx-auto px-4 mt-8">
        <AnimatePresence mode="wait">
          {selectedSkills.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-xs italic text-slate-400 font-mono py-4"
            >
              {isId
                ? "Silakan klik salah satu simpul teknologi neural di atas untuk menganalisis sinergi sistem."
                : "Please click any neural technology node above to inspect synaptic synergies."}
            </motion.div>
          ) : (
            <motion.div
              key="selected-state"
              initial={{ opacity: 0, y: 15, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="p-5 rounded-2xl bg-[#11111a]/95 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    {isId
                      ? `${selectedSkills.length} SALURAN SINAPSIS AKTIF TERHUBUNG`
                      : `${selectedSkills.length} ACTIVE SYNAPTIC CHANNELS CONNECTED`}
                  </span>
                  <span className="text-sm font-display font-bold text-white line-clamp-1">
                    {isId ? "Matriks Sinergi: " : "Synergy Matrix: "}
                    {selectedSkills
                      .map((id) => NEURAL_SKILLS.find((s) => s.id === id)?.name)
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setSelectedSkills([])}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isId ? "Hapus Pilihan" : "Clear All"}
                </button>
                <a
                  href="#strategic-directives"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-display font-bold text-xs hover:bg-cyan-400 hover:text-black transition-all shadow-lg group cursor-pointer"
                >
                  <span>{isId ? "Jelajahi Direktif" : "Explore Directives"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

