"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePortfolio } from "@/context/PortfolioContext";

export default function HolographicNeuralCore({ size = 380 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = usePortfolio();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for combined rotations
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Outer Holographic Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isDark ? "#38bdf8" : "#0284c7"),
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.65 : 0.85,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Outer Vertices Glow
    const pointsMat = new THREE.PointsMaterial({
      color: new THREE.Color(isDark ? "#8b5cf6" : "#7c3aed"),
      size: isDark ? 0.12 : 0.14,
      transparent: true,
      opacity: isDark ? 0.9 : 0.95,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const pointsMesh = new THREE.Points(outerGeo, pointsMat);
    coreGroup.add(pointsMesh);

    // 2. Inner Glowing Core Sphere
    const innerGeo = new THREE.SphereGeometry(1.1, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isDark ? "#8b5cf6" : "#7c3aed"),
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.55,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 3. Orbiting Data Rings
    const ring1Geo = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isDark ? "#f59e0b" : "#d97706"),
      transparent: true,
      opacity: isDark ? 0.5 : 0.75,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.1, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isDark ? "#ec4899" : "#be185d"),
      transparent: true,
      opacity: isDark ? 0.4 : 0.65,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // Interactive mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2;
      mouseY = y * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      coreGroup.rotation.y = elapsedTime * 0.3 + targetX * 0.8;
      coreGroup.rotation.x = elapsedTime * 0.2 + targetY * 0.8;

      outerMesh.rotation.y = elapsedTime * 0.15;
      innerMesh.rotation.y = -elapsedTime * 0.4;
      ring1.rotation.z = elapsedTime * 0.5;
      ring2.rotation.z = -elapsedTime * 0.35;

      // Subtle breathing scale
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.04;
      innerMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      pointsMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      renderer.dispose();
    };
  }, [size, isDark]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center pointer-events-none select-none"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
