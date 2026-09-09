"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePortfolio } from "@/context/PortfolioContext";

export default function NeuralConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = usePortfolio();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 320;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Parameters (Neural Nodes)
    const particleCount = 85;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const bounds = { x: 280, y: 190, z: 130 };

    const colorPalette = isDark
      ? [
          new THREE.Color("#38bdf8"), // Cyan
          new THREE.Color("#8b5cf6"), // Violet
          new THREE.Color("#10b981"), // Emerald
          new THREE.Color("#f43f5e"), // Rose
        ]
      : [
          new THREE.Color("#0284c7"), // Deep Cyan
          new THREE.Color("#7c3aed"), // Deep Violet
          new THREE.Color("#059669"), // Deep Emerald
          new THREE.Color("#be123c"), // Deep Rose
        ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * bounds.x * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      velocities.push({
        x: (Math.random() - 0.5) * 0.35,
        y: (Math.random() - 0.5) * 0.35,
        z: (Math.random() - 0.5) * 0.18,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const pointTexture = createCircleTexture(isDark);
    const pMaterial = new THREE.PointsMaterial({
      size: isDark ? 6 : 5.5,
      map: pointTexture,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.85,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Line Connections Geometry (Synapses)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(isDark ? "#8b5cf6" : "#7c3aed"),
      transparent: true,
      opacity: isDark ? 0.22 : 0.32,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse Tracking & Physics Field
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let mouseWorldX = 0;
    let mouseWorldY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      mouseX = (e.clientX - halfX) * 0.45;
      mouseY = (e.clientY - halfY) * 0.45;

      // Project into approximate 3D world space coordinates
      mouseWorldX = ((e.clientX / window.innerWidth) * 2 - 1) * bounds.x * 0.75;
      mouseWorldY = -((e.clientY / window.innerHeight) * 2 - 1) * bounds.y * 0.75;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Dynamic Connections Pool
    const maxConnections = 140;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    // Animation Loop
    let animationFrameId: number;
    const connectionDist = 68;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera parallax drift towards mouse
      targetX += (mouseX - targetX) * 0.035;
      targetY += (mouseY - targetY) * 0.035;
      camera.position.x = targetX * 0.4;
      camera.position.y = -targetY * 0.4;
      camera.lookAt(0, 0, 0);

      // Particle physics & boundary bounce
      const pos = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        pos[idx] += velocities[i].x;
        pos[idx + 1] += velocities[i].y;
        pos[idx + 2] += velocities[i].z;

        // Subtle repulsion from cursor in 3D
        const dx = pos[idx] - mouseWorldX;
        const dy = pos[idx + 1] - mouseWorldY;
        const distSq = dx * dx + dy * dy;
        const repelRadiusSq = 45 * 45;

        if (distSq < repelRadiusSq && distSq > 0) {
          const force = (1 - Math.sqrt(distSq) / 45) * 0.6;
          pos[idx] += (dx / Math.sqrt(distSq)) * force;
          pos[idx + 1] += (dy / Math.sqrt(distSq)) * force;
        }

        // Boundary reflection
        if (pos[idx] > bounds.x || pos[idx] < -bounds.x) velocities[i].x *= -1;
        if (pos[idx + 1] > bounds.y || pos[idx + 1] < -bounds.y) velocities[i].y *= -1;
        if (pos[idx + 2] > bounds.z || pos[idx + 2] < -bounds.z) velocities[i].z *= -1;
      }

      geometry.attributes.position.needsUpdate = true;

      // Calculate Synapse Lines
      let lineIndex = 0;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (d < connectionDist && lineIndex < maxConnections) {
            const lIdx = lineIndex * 6;
            linePositions[lIdx] = pos[i * 3];
            linePositions[lIdx + 1] = pos[i * 3 + 1];
            linePositions[lIdx + 2] = pos[i * 3 + 2];
            linePositions[lIdx + 3] = pos[j * 3];
            linePositions[lIdx + 4] = pos[j * 3 + 1];
            linePositions[lIdx + 5] = pos[j * 3 + 2];
            lineIndex++;
          }
        }
      }

      // Hide unused line segments by collapsing them to zero
      for (let k = lineIndex; k < maxConnections; k++) {
        const lIdx = k * 6;
        linePositions[lIdx] = 0;
        linePositions[lIdx + 1] = 0;
        linePositions[lIdx + 2] = 0;
        linePositions[lIdx + 3] = 0;
        linePositions[lIdx + 4] = 0;
        linePositions[lIdx + 5] = 0;
      }

      lineGeometry.attributes.position.needsUpdate = true;

      // Slow scene rotation
      particles.rotation.y += 0.0006;
      linesMesh.rotation.y += 0.0006;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      lineGeometry.dispose();
      pMaterial.dispose();
      lineMaterial.dispose();
      if (pointTexture) pointTexture.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

function createCircleTexture(isDark: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  if (isDark) {
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(56, 189, 248, 0.9)");
    gradient.addColorStop(0.65, "rgba(139, 92, 246, 0.3)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  } else {
    gradient.addColorStop(0, "rgba(2, 132, 199, 1)");
    gradient.addColorStop(0.4, "rgba(124, 58, 237, 0.8)");
    gradient.addColorStop(0.7, "rgba(124, 58, 237, 0.3)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
