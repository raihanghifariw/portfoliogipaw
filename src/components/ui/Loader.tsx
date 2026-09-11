'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import { usePortfolio } from '@/context/PortfolioContext';

export type LoaderType = 'ai' | 'software' | 'softskill' | 'default';

interface LoaderProps {
  type?: LoaderType;
  className?: string;
}

interface FaceSpec {
  label: string;
  sub: string;
  code: string;
  glyph: string;
}

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  tag: string;
  systemName: string;
  metricLabel: string;
  metricValue: string;
  faces: FaceSpec[];
}

const themeConfigs: Record<LoaderType, ThemeConfig> = {
  ai: {
    primaryColor: '#00f0ff', // Tron Cyan
    secondaryColor: '#38bdf8', // Neon Sky
    accentColor: '#818cf8',
    tag: 'NEURAL RUNTIME',
    systemName: 'AGENTIC_CORE.v4',
    metricLabel: 'RETRIEVAL LATENCY',
    metricValue: '8.4 ms',
    faces: [
      { label: 'LLM', sub: 'TRANSFORMER CORE', code: '01', glyph: '[AI]' },
      { label: 'AGENTS', sub: 'LANGGRAPH MESH', code: '02', glyph: '[NET]' },
      { label: 'DATA', sub: 'HYBRID VECTOR RAG', code: '03', glyph: '[RAG]' },
      { label: 'VISION', sub: 'MULTIMODAL VLM', code: '04', glyph: '[VLM]' },
      { label: 'SHIELD', sub: 'PROMPT DEFENSE', code: '05', glyph: '[SEC]' },
      { label: 'NEURAL', sub: 'REASONING GRAPH', code: '06', glyph: '[CORE]' },
    ]
  },
  software: {
    primaryColor: '#00ff66', // Matrix Emerald
    secondaryColor: '#34d399', // Neon Mint
    accentColor: '#10b981',
    tag: 'POLICY ENGINE',
    systemName: 'SAC_MANIFOLD.v2',
    metricLabel: 'SAFETY MARGIN',
    metricValue: '99.4 %',
    faces: [
      { label: 'SAC', sub: 'CONTINUOUS CONTROL', code: '01', glyph: '[SAC]' },
      { label: 'SAFETY', sub: 'LAGRANGIAN BOUND', code: '02', glyph: '[SAFE]' },
      { label: 'VISION', sub: 'EDGE PERCEPTION', code: '03', glyph: '[EDGE]' },
      { label: 'POLICY', sub: 'ACTOR-CRITIC NET', code: '04', glyph: '[NET]' },
      { label: 'CUDA', sub: 'HPC GPU PARALLEL', code: '05', glyph: '[CUDA]' },
      { label: 'CLINIC', sub: 'ICU TELEMETRY', code: '06', glyph: '[DATA]' },
    ]
  },
  softskill: {
    primaryColor: '#c084fc', // Neon Violet
    secondaryColor: '#ffaa00', // Electric Amber
    accentColor: '#e879f9',
    tag: 'DISTRIBUTED MESH',
    systemName: 'CLUSTER_SHARD.v7',
    metricLabel: 'THROUGHPUT RATE',
    metricValue: '12.8 GB/s',
    faces: [
      { label: 'CLUSTER', sub: 'GPU COMPUTE MESH', code: '01', glyph: '[MESH]' },
      { label: 'FASTAPI', sub: 'SUB-10MS INFERENCE', code: '02', glyph: '[API]' },
      { label: 'QDRANT', sub: 'DISTRIBUTED VECTOR', code: '03', glyph: '[VEC]' },
      { label: 'DOCKER', sub: 'MICROSERVICES', code: '04', glyph: '[DOC]' },
      { label: 'K8S', sub: 'POD ORCHESTRATION', code: '05', glyph: '[K8S]' },
      { label: 'MLOPS', sub: 'DISTRIBUTED TRAIN', code: '06', glyph: '[OPS]' },
    ]
  },
  default: {
    primaryColor: '#00f0ff',
    secondaryColor: '#c084fc',
    accentColor: '#38bdf8',
    tag: 'QUANTUM MATRIX',
    systemName: 'SYS_CORE.v1',
    metricLabel: 'CORE CLOCK',
    metricValue: '120 FPS',
    faces: [
      { label: 'LLM', sub: 'REASONING', code: '01', glyph: '[AI]' },
      { label: 'DATA', sub: 'EMBEDDINGS', code: '02', glyph: '[DATA]' },
      { label: 'GPU', sub: 'CUDA CORE', code: '03', glyph: '[CUDA]' },
      { label: 'RL', sub: 'CONTINUOUS', code: '04', glyph: '[RL]' },
      { label: 'ARCH', sub: 'PIPELINES', code: '05', glyph: '[ARCH]' },
      { label: 'SERVE', sub: 'ENDPOINTS', code: '06', glyph: '[API]' },
    ]
  }
};

const facesId: Record<LoaderType, FaceSpec[]> = {
  ai: [
    { label: 'LLM', sub: 'INTI TRANSFORMER', code: '01', glyph: '[AI]' },
    { label: 'AGEN', sub: 'MESH LANGGRAPH', code: '02', glyph: '[NET]' },
    { label: 'DATA', sub: 'RAG VEKTOR HIBRIDA', code: '03', glyph: '[RAG]' },
    { label: 'VISI', sub: 'VLM MULTIMODAL', code: '04', glyph: '[VLM]' },
    { label: 'PERISAI', sub: 'PERTAHANAN PROMPT', code: '05', glyph: '[SEC]' },
    { label: 'NEURAL', sub: 'GRAF PENALARAN', code: '06', glyph: '[CORE]' },
  ],
  software: [
    { label: 'SAC', sub: 'KONTROL KONTINU', code: '01', glyph: '[SAC]' },
    { label: 'AMAN', sub: 'BATASAN LAGRANGIAN', code: '02', glyph: '[SAFE]' },
    { label: 'VISI', sub: 'PERSEPSI EDGE', code: '03', glyph: '[EDGE]' },
    { label: 'KEBIJAKAN', sub: 'ACTOR-CRITIC NET', code: '04', glyph: '[NET]' },
    { label: 'CUDA', sub: 'PARALEL GPU HPC', code: '05', glyph: '[CUDA]' },
    { label: 'KLINIS', sub: 'TELEMETRI ICU', code: '06', glyph: '[DATA]' },
  ],
  softskill: [
    { label: 'KLASTER', sub: 'MESH KOMPUTASI GPU', code: '01', glyph: '[MESH]' },
    { label: 'FASTAPI', sub: 'INFERENSI SUB-10MS', code: '02', glyph: '[API]' },
    { label: 'QDRANT', sub: 'VEKTOR TERDISTRIBUSI', code: '03', glyph: '[VEC]' },
    { label: 'DOCKER', sub: 'MICROSERVICES', code: '04', glyph: '[DOC]' },
    { label: 'K8S', sub: 'ORKESTRASI POD', code: '05', glyph: '[K8S]' },
    { label: 'MLOPS', sub: 'TRAINING TERDISTRIBUSI', code: '06', glyph: '[OPS]' },
  ],
  default: [
    { label: 'LLM', sub: 'PENALARAN', code: '01', glyph: '[AI]' },
    { label: 'DATA', sub: 'EMBEDDING', code: '02', glyph: '[DATA]' },
    { label: 'GPU', sub: 'INTI CUDA', code: '03', glyph: '[CUDA]' },
    { label: 'RL', sub: 'KONTINU', code: '04', glyph: '[RL]' },
    { label: 'ARSIT', sub: 'PIPELINE', code: '05', glyph: '[ARCH]' },
    { label: 'LAYAN', sub: 'ENDPOINT', code: '06', glyph: '[API]' },
  ]
};

/**
 * Generates an authentic Tron Cyberpunk pixelated face texture on an offscreen 512x512 canvas.
 */
function createCyberFaceTexture(face: FaceSpec, primaryColor: string, secondaryColor: string, isId: boolean = false): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // 1. Dark Void Cyber Glass Background
  const bgGrad = ctx.createRadialGradient(256, 256, 40, 256, 256, 280);
  bgGrad.addColorStop(0, '#060d20');
  bgGrad.addColorStop(1, '#02050f');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 512);

  // 2. Subtle 8-Bit Pixel Grid Texture
  ctx.strokeStyle = primaryColor;
  ctx.globalAlpha = 0.08;
  ctx.lineWidth = 1;
  const gridSize = 32;
  for (let x = 0; x <= 512; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y <= 512; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // 3. Tron Outer Wireframe Border with Stepped Pixel Corners
  ctx.globalAlpha = 1.0;
  ctx.strokeStyle = primaryColor;
  ctx.lineWidth = 4;
  ctx.shadowColor = primaryColor;
  ctx.shadowBlur = 18;

  const pad = 24;
  const cut = 32;

  ctx.beginPath();
  // Top edge
  ctx.moveTo(pad + cut, pad);
  ctx.lineTo(512 - pad - cut, pad);
  // Top-Right stepped corner
  ctx.lineTo(512 - pad, pad + cut);
  // Right edge
  ctx.lineTo(512 - pad, 512 - pad - cut);
  // Bottom-Right stepped corner
  ctx.lineTo(512 - pad - cut, 512 - pad);
  // Bottom edge
  ctx.lineTo(pad + cut, 512 - pad);
  // Bottom-Left stepped corner
  ctx.lineTo(pad, 512 - pad - cut);
  // Left edge
  ctx.lineTo(pad, pad + cut);
  // Top-Left stepped corner
  ctx.closePath();
  ctx.stroke();

  // Reset shadow for crisp inner elements
  ctx.shadowBlur = 0;

  // 4. Stepped Pixel Corner Accents (4 filled micro squares)
  ctx.fillStyle = primaryColor;
  const sq = 12;
  ctx.fillRect(pad + cut, pad + 6, sq, sq);
  ctx.fillRect(512 - pad - cut - sq, pad + 6, sq, sq);
  ctx.fillRect(pad + cut, 512 - pad - 6 - sq, sq, sq);
  ctx.fillRect(512 - pad - cut - sq, 512 - pad - 6 - sq, sq, sq);

  // 5. Header Bar on Face: Node Index & Status
  ctx.font = '16px "Press Start 2P", monospace, sans-serif';
  ctx.fillStyle = primaryColor;
  ctx.textAlign = 'left';
  ctx.fillText(`■ NODE [${face.code}]`, pad + cut + 24, pad + 48);

  ctx.textAlign = 'right';
  ctx.fillStyle = secondaryColor;
  ctx.fillText('ONLINE', 512 - pad - cut - 24, pad + 48);

  // Header Divider Line
  ctx.strokeStyle = primaryColor;
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad + cut, pad + 64);
  ctx.lineTo(512 - pad - cut, pad + 64);
  ctx.stroke();
  ctx.globalAlpha = 1.0;

  // 6. Central Cyber Glyphs & Geometric Circuit Emblem
  ctx.save();
  ctx.translate(256, 175);

  // Outer glowing hex/octagonal radar ring
  ctx.strokeStyle = secondaryColor;
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 68, 0, Math.PI * 2);
  ctx.stroke();

  // Central Glyph Emblem
  ctx.globalAlpha = 0.9;
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = secondaryColor;
  ctx.fillText(face.glyph, 0, 0);

  ctx.restore();

  // 7. Core Technical Domain Label (LLM, DATA, SAC, CUDA, etc.)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Neon text glow behind
  ctx.shadowColor = primaryColor;
  ctx.shadowBlur = 24;
  ctx.font = 'bold 54px "Press Start 2P", "Space Grotesk", monospace, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(face.label, 256, 310);

  // 8. Secondary Technical Subtitle (e.g. TRANSFORMER CORE, HYBRID VECTOR RAG)
  ctx.shadowBlur = 8;
  ctx.shadowColor = secondaryColor;
  ctx.font = 'bold 16px "Press Start 2P", monospace, sans-serif';
  ctx.fillStyle = primaryColor;
  ctx.fillText(face.sub, 256, 372);

  // 9. Bottom Telemetry Block: Stepped Progress Blocks & Frequency
  ctx.shadowBlur = 0;
  ctx.fillStyle = primaryColor;
  const blockWidth = 18;
  const blockHeight = 8;
  const blockGap = 8;
  const startX = 256 - (8 * (blockWidth + blockGap)) / 2;
  const blockY = 430;

  for (let b = 0; b < 8; b++) {
    ctx.globalAlpha = b < 6 ? 0.9 : 0.2;
    ctx.fillRect(startX + b * (blockWidth + blockGap), blockY, blockWidth, blockHeight);
  }

  // Footer micro text
  ctx.globalAlpha = 0.75;
  ctx.font = '13px "Press Start 2P", monospace, sans-serif';
  ctx.fillStyle = secondaryColor;
  ctx.fillText(isId ? 'STATUS: LOCKED • FREQ: 144MHz' : 'STATUS: LOCKED • FREQ: 144MHz', 256, 465);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

const Loader = ({ type = 'default', className }: LoaderProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { language } = usePortfolio();
  const isId = language === "id";
  const baseTheme = themeConfigs[type] || themeConfigs.default;
  const theme = {
    ...baseTheme,
    tag: isId
      ? (type === 'ai' ? 'RUNTIME NEURAL' : type === 'software' ? 'ENGINE KEBIJAKAN' : type === 'softskill' ? 'MESH TERDISTRIBUSI' : 'MATRIKS KUANTUM')
      : baseTheme.tag,
    metricLabel: isId
      ? (type === 'ai' ? 'LATENSI RETRIEVAL' : type === 'software' ? 'BATAS KESELAMATAN' : type === 'softskill' ? 'LAJU THROUGHPUT' : 'CLOCK INTI')
      : baseTheme.metricLabel,
    faces: isId ? (facesId[type] || facesId.default) : baseTheme.faces,
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Canvas Dimensions
    const width = container.clientWidth || 460;
    const height = container.clientHeight || 460;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Master Rotation Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Primary & Secondary Three.js Colors
    const primaryThreeColor = new THREE.Color(theme.primaryColor);
    const secondaryThreeColor = new THREE.Color(theme.secondaryColor);
    const accentThreeColor = new THREE.Color(theme.accentColor);

    // 1. Generate 6 Custom Cyberpunk Face Textures
    const cubeMaterials: THREE.MeshBasicMaterial[] = theme.faces.map((face) => {
      const texture = createCyberFaceTexture(face, theme.primaryColor, theme.secondaryColor, isId);
      return new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.94,
        side: THREE.FrontSide
      });
    });

    // 2. Central Tron Holographic Cube
    const cubeSize = 2.45;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const datacubeMesh = new THREE.Mesh(cubeGeo, cubeMaterials);
    masterGroup.add(datacubeMesh);

    // Glowing laser wireframe edges around the cube
    const cubeEdges = new THREE.EdgesGeometry(cubeGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: primaryThreeColor,
      transparent: true,
      opacity: 0.85,
    });
    const cubeEdgesMesh = new THREE.LineSegments(cubeEdges, edgesMat);
    datacubeMesh.add(cubeEdgesMesh);

    // 3. Corner Vertex Pixel Points (8 vertices of the datacube)
    const half = cubeSize / 2;
    const cornerCoords = [
      -half, -half, -half,   half, -half, -half,
      -half,  half, -half,   half,  half, -half,
      -half, -half,  half,   half, -half,  half,
      -half,  half,  half,   half,  half,  half,
    ];
    const cornerGeo = new THREE.BufferGeometry();
    cornerGeo.setAttribute('position', new THREE.Float32BufferAttribute(cornerCoords, 3));
    const cornerMat = new THREE.PointsMaterial({
      color: secondaryThreeColor,
      size: 0.18,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const cornerPoints = new THREE.Points(cornerGeo, cornerMat);
    datacubeMesh.add(cornerPoints);

    // 4. Inner Glowing Quantum Core (Nested inside the cube)
    const innerGeo = new THREE.OctahedronGeometry(0.9, 0);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerLineMat = new THREE.LineBasicMaterial({
      color: accentThreeColor,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const innerCoreMesh = new THREE.LineSegments(innerEdges, innerLineMat);
    masterGroup.add(innerCoreMesh);

    // 5. Dual Concentric Orbiting Tron Light Rings
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: primaryThreeColor,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.65, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: secondaryThreeColor,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 4;
    masterGroup.add(ring2);

    // 6. Tron Vertical Laser Scan Plane
    const scanPlaneGeo = new THREE.PlaneGeometry(2.8, 2.8);
    const scanPlaneEdges = new THREE.EdgesGeometry(scanPlaneGeo);
    const scanPlaneMat = new THREE.LineBasicMaterial({
      color: primaryThreeColor,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const scanPlane = new THREE.LineSegments(scanPlaneEdges, scanPlaneMat);
    scanPlane.rotation.x = Math.PI / 2;
    masterGroup.add(scanPlane);

    // 7. Floating Cyber Bit Particles
    const particleCount = 45;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5.2;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5.2;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5.2;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: primaryThreeColor,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // Interactive Mouse Tracking for Smooth Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = nx * 1.6;
      mouseY = ny * 1.6;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 460;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth Parallax Lerp
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // Master 3D tumble rotation combining smooth cinematic rotation + interactive mouse tilt
      masterGroup.rotation.y = elapsed * 0.32 + targetX;
      masterGroup.rotation.x = Math.sin(elapsed * 0.22) * 0.2 - targetY;

      // Independent multi-axis rotations
      ring1.rotation.z = elapsed * 0.45;
      ring2.rotation.z = -elapsed * 0.38;
      innerCoreMesh.rotation.y = -elapsed * 0.6;
      innerCoreMesh.rotation.x = elapsed * 0.4;

      // Inner core breathing scale
      const innerScale = 1 + Math.sin(elapsed * 2.5) * 0.08;
      innerCoreMesh.scale.set(innerScale, innerScale, innerScale);

      // Laser scan plane vertical oscillation
      scanPlane.position.y = Math.sin(elapsed * 1.8) * 1.35;

      // Particles subtle orbital drift
      particles.rotation.y = -elapsed * 0.08;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Resource Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      cubeMaterials.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });

      cubeGeo.dispose();
      cubeEdges.dispose();
      edgesMat.dispose();
      cornerGeo.dispose();
      cornerMat.dispose();
      innerGeo.dispose();
      innerEdges.dispose();
      innerLineMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      scanPlaneGeo.dispose();
      scanPlaneEdges.dispose();
      scanPlaneMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [type, theme]);

  return (
    <div
      className={cn(
        'relative w-full h-full min-h-[440px] max-h-[580px] flex items-center justify-center select-none overflow-hidden',
        className
      )}
    >
      {/* 1. Cyberpunk Tron Perspective Floor Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${theme.primaryColor}22 1px, transparent 1px),
            linear-gradient(to bottom, ${theme.primaryColor}22 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 80%)'
        }}
      />

      {/* 2. Cyberpunk Radial Backdrop Glow */}
      <div
        className="absolute w-[380px] h-[380px] rounded-full blur-[110px] pointer-events-none opacity-25"
        style={{ backgroundColor: theme.primaryColor }}
      />

      {/* 3. Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
      />

      {/* 4. Cyberpunk Pixel HUD Overlay (Framing the 3D Core with design_system.md fonts) */}
      <div className="absolute inset-4 md:inset-8 pointer-events-none flex flex-col justify-between z-20">
        {/* Top Telemetry Bar */}
        <div className="flex items-center justify-between font-mono tracking-widest uppercase">
          {/* Top-Left: Pixel Notch & System Tag */}
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <span className="font-pixel text-[8px] text-zinc-400 font-bold tracking-[0.15em]">{theme.tag}</span>
            <span className="text-zinc-400 font-mono text-[10px]">/</span>
            <span
              style={{ color: theme.primaryColor }}
              className="font-mono text-[10px] font-bold tracking-wider"
            >
              {theme.systemName}
            </span>
          </div>

          {/* Top-Right: Live Status & 120 FPS */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-pixel text-[8px] font-bold tracking-wider">{isId ? "AKTIF" : "ONLINE"}</span>
            </div>
            <span className="text-zinc-400 font-mono text-[10px]">120 FPS</span>
          </div>
        </div>

        {/* Bottom Telemetry Bar */}
        <div className="flex items-end justify-between font-mono">
          {/* Bottom-Left: Metric Readout */}
          <div className="bg-black/80 border border-white/10 px-3.5 py-2 backdrop-blur-md rounded-sm">
            <span className="text-zinc-500 uppercase block font-pixel text-[7px] tracking-[0.15em]">
              {theme.metricLabel}
            </span>
            <span
              className="font-mono font-bold text-xs md:text-sm tracking-wider"
              style={{ color: theme.primaryColor }}
            >
              {theme.metricValue}
            </span>
          </div>

          {/* Bottom-Right: Pixel Crosshair & Grid Coordinate */}
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] tracking-wider">
            <span>{isId ? "KOORD" : "COORD"} [ 42.09 : 88.14 ]</span>
            <span style={{ color: theme.primaryColor }} className="font-bold">+</span>
          </div>
        </div>

        {/* 4 Stepped Pixel Corner Cutouts */}
        <div
          className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2"
          style={{ borderColor: theme.primaryColor }}
        />
        <div
          className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2"
          style={{ borderColor: theme.primaryColor }}
        />
        <div
          className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2"
          style={{ borderColor: theme.primaryColor }}
        />
        <div
          className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2"
          style={{ borderColor: theme.primaryColor }}
        />
      </div>

      {/* Subtle Scanline Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 1) 50%)',
          backgroundSize: '100% 4px'
        }}
      />
    </div>
  );
};

export default Loader;


