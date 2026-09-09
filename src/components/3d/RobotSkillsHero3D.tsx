"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingSkill {
  id: string;
  name: string;
  brandColor: string;
  xPercent: number;
  yPercent: number;
  iconSvg: React.ReactNode;
}

export default function RobotSkillsHero3D() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 650;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.3, 5.0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Group for robot
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Chrome Metallic Material
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#e2e8f0"),
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
    });

    const darkTitaniumMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1e293b"),
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.6,
    });

    const visorGlowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#38bdf8"),
      wireframe: false,
    });

    const accentGlowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#8b5cf6"),
    });

    // 1. Robot Head (Futuristic Helmet / Curved Sculpt)
    const headGroup = new THREE.Group();
    robotGroup.add(headGroup);
    headGroup.position.set(0, 0.65, 0);

    const craniumGeo = new THREE.SphereGeometry(0.68, 36, 36);
    craniumGeo.scale(1, 1.15, 1.05);
    const craniumMesh = new THREE.Mesh(craniumGeo, chromeMaterial);
    headGroup.add(craniumMesh);

    // Visor / Cyber Face Shield
    const visorGeo = new THREE.CylinderGeometry(0.55, 0.52, 0.24, 32, 1, false, Math.PI * 0.15, Math.PI * 0.7);
    const visorMesh = new THREE.Mesh(visorGeo, darkTitaniumMaterial);
    visorMesh.position.set(0, 0.05, 0.25);
    visorMesh.rotation.y = Math.PI * 0.5;
    headGroup.add(visorMesh);

    // Visor LED Array Dots (Eyes indicator)
    const ledGroup = new THREE.Group();
    for (let i = -4; i <= 4; i++) {
      if (i === 0) continue;
      const dotGeo = new THREE.BoxGeometry(0.025, 0.015, 0.01);
      const dotMesh = new THREE.Mesh(dotGeo, visorGlowMaterial);
      dotMesh.position.set(i * 0.045, 0.05, 0.65);
      ledGroup.add(dotMesh);
    }
    headGroup.add(ledGroup);

    // Jaw / Chin Plate
    const jawGeo = new THREE.CylinderGeometry(0.38, 0.22, 0.35, 16);
    const jawMesh = new THREE.Mesh(jawGeo, darkTitaniumMaterial);
    jawMesh.position.set(0, -0.4, 0.15);
    jawMesh.rotation.x = Math.PI * 0.15;
    headGroup.add(jawMesh);

    // Neck Joint Mechanism
    const neckGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.35, 20);
    const neckMesh = new THREE.Mesh(neckGeo, darkTitaniumMaterial);
    neckMesh.position.set(0, 0.05, 0);
    robotGroup.add(neckMesh);

    // 2. Torso / Chest Armor
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -0.7, 0);
    robotGroup.add(torsoGroup);

    // Chest Plate
    const chestGeo = new THREE.CylinderGeometry(0.9, 0.65, 1.1, 24);
    chestGeo.scale(1.2, 1, 0.75);
    const chestMesh = new THREE.Mesh(chestGeo, chromeMaterial);
    chestMesh.position.set(0, 0, 0);
    torsoGroup.add(chestMesh);

    // Center Core Light (Reactor glow)
    const reactorRingGeo = new THREE.TorusGeometry(0.18, 0.03, 16, 32);
    const reactorRing = new THREE.Mesh(reactorRingGeo, accentGlowMaterial);
    reactorRing.position.set(0, 0.12, 0.42);
    torsoGroup.add(reactorRing);

    const reactorCoreGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const reactorCore = new THREE.Mesh(reactorCoreGeo, visorGlowMaterial);
    reactorCore.position.set(0, 0.12, 0.4);
    torsoGroup.add(reactorCore);

    // Shoulder Pauldrons
    const shoulderLeftGeo = new THREE.SphereGeometry(0.42, 20, 20);
    shoulderLeftGeo.scale(1.3, 0.8, 1);
    const shoulderLeft = new THREE.Mesh(shoulderLeftGeo, chromeMaterial);
    shoulderLeft.position.set(-1.25, 0.35, -0.05);
    torsoGroup.add(shoulderLeft);

    const shoulderRightGeo = new THREE.SphereGeometry(0.42, 20, 20);
    shoulderRightGeo.scale(1.3, 0.8, 1);
    const shoulderRight = new THREE.Mesh(shoulderRightGeo, chromeMaterial);
    shoulderRight.position.set(1.25, 0.35, -0.05);
    torsoGroup.add(shoulderRight);

    // Upper Arms
    const armLeftGeo = new THREE.CylinderGeometry(0.2, 0.17, 0.8, 16);
    const armLeft = new THREE.Mesh(armLeftGeo, darkTitaniumMaterial);
    armLeft.position.set(-1.45, -0.2, 0);
    armLeft.rotation.z = Math.PI * 0.18;
    torsoGroup.add(armLeft);

    const armRightGeo = new THREE.CylinderGeometry(0.2, 0.17, 0.8, 16);
    const armRight = new THREE.Mesh(armRightGeo, darkTitaniumMaterial);
    armRight.position.set(1.45, -0.2, 0);
    armRight.rotation.z = -Math.PI * 0.18;
    torsoGroup.add(armRight);

    // Ambient Lighting & Rim Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 3.0);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    // Interactive mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
      const y = (e.clientY - rect.top) / (rect.height || 1) - 0.5;
      mouseX = x * 1.2;
      mouseY = y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth interpolation for head & body look-at
      targetRotY += (mouseX - targetRotY) * 0.045;
      targetRotX += (mouseY - targetRotX) * 0.045;

      headGroup.rotation.y = targetRotY * 0.65;
      headGroup.rotation.x = targetRotX * 0.45;

      robotGroup.rotation.y = targetRotY * 0.35;
      robotGroup.rotation.x = targetRotX * 0.25;

      // Subtle breathing motion
      const breathing = Math.sin(elapsed * 1.8) * 0.035;
      torsoGroup.position.y = -0.7 + breathing;
      headGroup.position.y = 0.65 + breathing * 0.5;

      // Pulse reactor core
      const pulse = 1 + Math.sin(elapsed * 3.5) * 0.08;
      reactorCore.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 650;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      craniumGeo.dispose();
      visorGeo.dispose();
      jawGeo.dispose();
      neckGeo.dispose();
      chestGeo.dispose();
      reactorRingGeo.dispose();
      reactorCoreGeo.dispose();
      shoulderLeftGeo.dispose();
      shoulderRightGeo.dispose();
      armLeftGeo.dispose();
      armRightGeo.dispose();
      chromeMaterial.dispose();
      darkTitaniumMaterial.dispose();
      visorGlowMaterial.dispose();
      accentGlowMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const floatingSkills: FloatingSkill[] = [
    {
      id: "python",
      name: "Python",
      brandColor: "#3776ab",
      xPercent: 14,
      yPercent: 22,
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M11.91 0c-3.17 0-5.24.23-5.24 2.14v2.14h5.24v.71H4.63C1.65 5 0 7.37 0 10.35s1.46 5.35 4.63 5.35h1.79v-2.5c0-1.84 1.57-3.35 3.42-3.35h5.23c1.55 0 2.8-1.25 2.8-2.8V2.14C17.87.23 15.08 0 11.91 0zm-2.42 1.43c.48 0 .86.38.86.86s-.38.86-.86.86-.86-.38-.86-.86.38-.86.86-.86zM19.37 8.3v2.5c0 1.84-1.57 3.35-3.42 3.35H10.7c-1.55 0-2.8 1.25-2.8 2.8v4.91c0 1.91 2.79 2.14 5.96 2.14 3.17 0 5.24-.23 5.24-2.14v-2.14h-5.24v-.71h7.28c2.98 0 4.63-2.37 4.63-5.35s-1.46-5.36-4.63-5.36h-1.77zm-4.99 12.84c.48 0 .86.38.86.86s-.38.86-.86.86-.86-.38-.86-.86.38-.86.86-.86z" />
        </svg>
      ),
    },
    {
      id: "react",
      name: "React",
      brandColor: "#61dafb",
      xPercent: 20,
      yPercent: 44,
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" className="fill-current stroke-none" />
        </svg>
      ),
    },
    {
      id: "pytorch",
      name: "PyTorch",
      brandColor: "#ee4c2c",
      xPercent: 12,
      yPercent: 68,
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M12.74 0c.26 0 .52.1.72.3l7.98 7.98a1.02 1.02 0 0 1 0 1.44l-7.98 7.98a1.02 1.02 0 0 1-1.44 0l-7.98-7.98a1.02 1.02 0 0 1 0-1.44L12.02.3c.2-.2.46-.3.72-.3zm-.02 4.1L8.6 8.22l4.12 4.12 4.12-4.12-4.12-4.12zm0 14.8c-.56 0-1.02.46-1.02 1.02v2.06c0 .56.46 1.02 1.02 1.02.56 0 1.02-.46 1.02-1.02v-2.06c0-.56-.46-1.02-1.02-1.02z" />
        </svg>
      ),
    },
    {
      id: "tensorflow",
      name: "TensorFlow",
      brandColor: "#ff6f00",
      xPercent: 18,
      yPercent: 86,
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M11.87 0L2.9 5.18l3.99 2.3 4.98-2.88v19.4l4.02-2.32V4.6l5.21 3.01 3.99-2.3L16.1 0h-4.23z" />
        </svg>
      ),
    },
    {
      id: "nextjs",
      name: "Next.js",
      brandColor: "#ffffff",
      xPercent: 82,
      yPercent: 20,
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.66 17.66l-5.66-8v8H10V6.34h2.15l5.51 7.8v-7.8h2v11.32h-2z" />
        </svg>
      ),
    },
    {
      id: "typescript",
      name: "TypeScript",
      brandColor: "#3178c6",
      xPercent: 86,
      yPercent: 44,
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M0 0h24v24H0V0zm11.66 18.25v-2.4c-.6.9-1.5 1.4-2.6 1.4-2.4 0-3.6-1.6-3.6-4.2V6h2.5v6.8c0 1.5.6 2.3 1.8 2.3 1.1 0 1.9-.8 1.9-2.3V6h2.5v12.25h-2.5zm6.84 0c-1.8 0-3.2-.6-4.1-1.7l1.4-1.8c.7.8 1.6 1.2 2.7 1.2 1.1 0 1.7-.5 1.7-1.1 0-.7-.5-1-1.7-1.3l-1.3-.3c-2-.5-2.9-1.5-2.9-3 0-2 1.6-3.3 3.9-3.3 1.6 0 2.8.5 3.6 1.4l-1.3 1.7c-.6-.6-1.4-.9-2.3-.9-1 0-1.5.4-1.5 1 0 .6.4.9 1.5 1.2l1.2.3c2.3.5 3.2 1.6 3.2 3.1 0 2-1.6 3.5-4.1 3.5z" />
        </svg>
      ),
    },
    {
      id: "docker",
      name: "Docker",
      brandColor: "#2496ed",
      xPercent: 80,
      yPercent: 68,
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M13.98 11.08h2.15v2.15h-2.15v-2.15zm-3.22 0h2.15v2.15h-2.15v-2.15zm-3.23 0h2.15v2.15H7.53v-2.15zm9.68-3.23h2.15V10h-2.15V7.85zm-3.22 0h2.15V10h-2.15V7.85zm-3.23 0h2.15V10H10.76V7.85zm-3.23 0h2.15V10H7.53V7.85zm9.68-3.23h2.15v2.15h-2.15V4.62zm-3.22 0h2.15v2.15h-2.15V4.62zm9.68 9.68c-.43 2.15-2.15 4.3-4.3 5.38-3.23 1.6-7.53 1.6-10.75 0-3.23-1.6-5.38-4.84-5.38-8.6 0-.54.05-1.08.16-1.61h14.52c.54 0 1.08.05 1.61.16 1.08.22 2.15.86 2.69 1.72.54.86.86 1.83.86 2.95h.59z" />
        </svg>
      ),
    },
    {
      id: "fastapi",
      name: "FastAPI",
      brandColor: "#009688",
      xPercent: 84,
      yPercent: 86,
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-.86 19.38v-5.74H7.26l6.88-9.02v5.74h3.86l-6.86 9.02z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-b from-sky-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      </div>

      {/* Floating 3D Canvas in center */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Floating Interactive Skill Pills */}
      <div className="absolute inset-0 max-w-[1360px] mx-auto pointer-events-none z-20">
        {floatingSkills.map((skill, index) => {
          const isHovered = hoveredSkill === skill.id;

          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { duration: 0.7, delay: index * 0.08 },
                scale: { duration: 0.7, delay: index * 0.08 },
                y: {
                  duration: 4.5 + (index % 3) * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                },
              }}
              style={{
                left: `${skill.xPercent}%`,
                top: `${skill.yPercent}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <motion.div
                whileHover={{ scale: 1.18, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative flex items-center justify-center p-3.5 sm:p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-2xl ${
                  isHovered
                    ? "border-transparent text-white shadow-2xl"
                    : "border-white/10 bg-white/[0.04] text-slate-300 hover:text-white"
                }`}
                style={
                  isHovered
                    ? {
                        backgroundColor: `${skill.brandColor}22`,
                        borderColor: skill.brandColor,
                        boxShadow: `0 0 25px ${skill.brandColor}55`,
                        color: skill.brandColor === "#ffffff" ? "#ffffff" : skill.brandColor,
                      }
                    : undefined
                }
              >
                <div className="w-6 h-6 flex items-center justify-center transition-transform group-hover:scale-110">
                  {skill.iconSvg}
                </div>

                {/* Floating tooltip label */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -bottom-8 px-2.5 py-0.5 rounded-md bg-[#09090d]/95 border border-white/15 text-[11px] font-mono font-bold tracking-wider whitespace-nowrap text-white shadow-lg pointer-events-none"
                    >
                      {skill.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Monumental Hero Headline & Subtitle */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-auto mb-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.3em] uppercase text-sky-400/90 bg-sky-500/10 px-3.5 py-1 rounded-full border border-sky-500/20">
            TECHNICAL ARSENAL &amp; STACK
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white leading-none uppercase select-none drop-shadow-2xl">
            SKILLS &amp; TOOLS
          </h1>
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-slate-400 uppercase select-none mt-1">
            TECHNOLOGIES AND TOOLS I WORK WITH
          </p>
        </motion.div>
      </div>
    </section>
  );
}
