"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Loader2, Sparkles, RefreshCw } from "lucide-react";

interface EveHeroCanvasProps {
  className?: string;
  onModelLoaded?: () => void;
}

export function EveHeroCanvas({ className = "", onModelLoaded }: EveHeroCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.35, 4.2);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Cinematic Cyber Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.8);
    scene.add(ambientLight);

    // Key Light: Ethereal Quantum Cyan from front-left
    const keyLight = new THREE.DirectionalLight(0x00f0ff, 3.2);
    keyLight.position.set(-2.5, 3.5, 3.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Fill Light: Crisp White/Silver from front-right
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.4);
    fillLight.position.set(2.5, 2.0, 2.5);
    scene.add(fillLight);

    // Rim Backlight: Electric Violet from back
    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 4.0);
    rimLight.position.set(0, 2.5, -3.0);
    scene.add(rimLight);

    // Ground Bounce: Mint Emerald
    const groundLight = new THREE.PointLight(0x10b981, 1.6, 6);
    groundLight.position.set(0, -2.0, 1.5);
    scene.add(groundLight);

    // 4. Stardust Particle Field (Holographic Atmosphere)
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const violetColor = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const mixed = cyanColor.clone().lerp(violetColor, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Model Container & Tracking Targets
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    let eveModel: THREE.Group | null = null;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let targetPositionY = 0;
    let targetScale = 1;

    // Mouse Tracking Coordinates
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      // Smooth horizontal yaw (-0.45 to +0.45 rad)
      targetRotationY = x * 0.55;
      // Smooth vertical pitch (-0.25 to +0.25 rad)
      targetRotationX = -y * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Load EVE Model
    const loader = new GLTFLoader();
    loader.load(
      "/assets/models/eve.glb",
      (gltf) => {
        if (isDisposed) return;
        eveModel = gltf.scene;

        // Auto-center and normalize bounding box
        const box = new THREE.Box3().setFromObject(eveModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        // Calibrated target height for elegant presence
        const targetHeight = 2.45;
        const scaleFactor = targetHeight / maxDim;
        eveModel.scale.setScalar(scaleFactor);

        // Center model geometry inside group
        eveModel.position.x = -center.x * scaleFactor;
        eveModel.position.y = -center.y * scaleFactor;
        eveModel.position.z = -center.z * scaleFactor;

        // Enhance materials for futuristic aesthetic
        eveModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.min(mat.roughness ?? 0.25, 0.35);
              mat.metalness = Math.max(mat.metalness ?? 0.35, 0.45);
              mat.envMapIntensity = 1.2;

              // If visor or eyes mesh detected, give it glowing emissive cyan
              const nameLower = mesh.name.toLowerCase();
              if (
                nameLower.includes("eye") ||
                nameLower.includes("visor") ||
                nameLower.includes("screen") ||
                nameLower.includes("glass") ||
                nameLower.includes("glow")
              ) {
                mat.emissive = new THREE.Color(0x00f0ff);
                mat.emissiveIntensity = 1.8;
              }
            }
          }
        });

        modelGroup.add(eveModel);
        setIsLoading(false);
        onModelLoaded?.();
      },
      undefined,
      (error) => {
        console.error("Failed to load eve.glb:", error);
        if (!isDisposed) {
          setLoadError("Failed to load 3D model");
          setIsLoading(false);
        }
      }
    );

    // 7. Interactive Click Reaction
    const handleClick = () => {
      setInteractionCount((prev) => prev + 1);
      // Gentle reactive pulse
      targetScale = 1.08;
      targetPositionY = 0.15;
      setTimeout(() => {
        targetScale = 1.0;
        targetPositionY = 0;
      }, 450);
    };

    container.addEventListener("click", handleClick);

    // 8. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 9. Animation Loop with Levitation Physics
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating levitation physics (sine wave)
      const hoverY = Math.sin(elapsedTime * 1.8) * 0.08 + targetPositionY;
      const hoverRoll = Math.cos(elapsedTime * 1.2) * 0.025;

      // Smooth damped lerping for rotation and position
      modelGroup.position.y += (hoverY - modelGroup.position.y) * 0.08;
      modelGroup.rotation.y += (targetRotationY - modelGroup.rotation.y) * 0.06;
      modelGroup.rotation.x += (targetRotationX - modelGroup.rotation.x) * 0.06;
      modelGroup.rotation.z += (hoverRoll - modelGroup.rotation.z) * 0.05;

      // Scale pulse lerp
      const currentScale = modelGroup.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * 0.1;
      modelGroup.scale.setScalar(nextScale);

      // Rotate stardust particles slowly
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      resizeObserver.disconnect();

      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onModelLoaded]);

  return (
    <div className={`relative w-full h-full min-h-[440px] md:min-h-[580px] lg:min-h-[660px] flex items-center justify-center ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Cyberpunk Radial Glow Behind Eve */}
      <div
        className="absolute pointer-events-none w-[340px] h-[340px] md:w-[480px] md:h-[480px] rounded-full blur-[100px] opacity-40 -z-10"
        style={{
          background: "radial-gradient(circle, rgba(0,240,255,0.45) 0%, rgba(99,102,241,0.25) 50%, transparent 80%)",
        }}
      />

      {/* Loading Holographic Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-sm rounded-3xl z-20">
          <div className="relative flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            <Sparkles className="w-4 h-4 text-cyan-200 absolute" />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
              Initializing EVE 3D Core...
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              Calibrating PBR Mesh & Neural Telemetry
            </span>
          </div>
        </div>
      )}

      {/* Fallback Error Overlay */}
      {loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-sm rounded-3xl p-6 text-center z-20">
          <RefreshCw className="w-8 h-8 text-rose-400 animate-pulse" />
          <span className="text-xs font-mono text-rose-300 font-bold tracking-wider">
            {loadError}
          </span>
          <span className="text-[10px] text-zinc-400 max-w-xs">
            Model path: /assets/models/eve.glb
          </span>
        </div>
      )}
    </div>
  );
}
