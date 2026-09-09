"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero robot — classic friendly emoji-robot look (white head + dark visor,
 * glowing cyan eyes & smile, white/teal body, blue arms, thin antenna).
 *
 * Behavior:
 * - Lives ONLY in the hero (absolute, scrolls away with the page — never
 *   blocks other sections)
 * - On load: flies STRAIGHT AT THE VIEWER filling the screen once, then
 *   settles back onto its perch
 * - Always: head & eyes track the cursor, blinks, happy squint when the
 *   cursor comes close, thrusters fire during the intro flight
 */
export default function RobotCompanion({
  size = 300,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const robot = new THREE.Group();
    robot.scale.setScalar(0.92);
    scene.add(robot);

    // ---- Materials ----
    const whiteMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#f5f7fa"),
      metalness: 0.25,
      roughness: 0.32,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0a0d14"),
      metalness: 0.5,
      roughness: 0.18,
    });
    const cyanGlowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#22d3ee"),
      transparent: true,
      opacity: 1,
    });
    const tealMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0d7490"),
      metalness: 0.35,
      roughness: 0.4,
    });
    const armMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2563eb"),
      metalness: 0.3,
      roughness: 0.45,
    });

    // ---- Head: glossy white rounded dome ----
    const head = new THREE.Group();
    const headMesh = new THREE.Mesh(new THREE.SphereGeometry(1.35, 40, 32), whiteMat);
    headMesh.scale.set(1.18, 0.95, 0.9);
    head.add(headMesh);

    // Big dark visor screen
    const visor = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 32), darkMat);
    visor.scale.set(1.06, 0.76, 0.75);
    visor.position.set(0, 0.04, 0.62);
    head.add(visor);

    // ---- FACE ----
    const faceZ = 1.32;

    const eyeGeo = new THREE.SphereGeometry(0.17, 24, 24);
    const leftEye = new THREE.Mesh(eyeGeo, cyanGlowMat);
    leftEye.scale.set(1, 1.05, 0.35);
    leftEye.position.set(-0.37, 0.12, faceZ);
    const rightEye = new THREE.Mesh(eyeGeo, cyanGlowMat);
    rightEye.scale.set(1, 1.05, 0.35);
    rightEye.position.set(0.37, 0.12, faceZ);
    head.add(leftEye, rightEye);

    const smileMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#22d3ee"),
      transparent: true,
      opacity: 0.95,
    });
    const smile = new THREE.Mesh(
      new THREE.TorusGeometry(0.2, 0.045, 12, 32, Math.PI),
      smileMat
    );
    smile.rotation.z = Math.PI;
    smile.position.set(0, -0.24, faceZ);
    head.add(smile);

    // Thin dark antenna (top-right)
    const antenna = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.022, 0.85, 10),
      darkMat
    );
    antenna.position.set(0.62, 1.55, -0.15);
    antenna.rotation.z = -0.28;
    head.add(antenna);
    const antennaTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 12, 12),
      darkMat
    );
    antennaTip.position.set(0.74, 1.95, -0.15);
    head.add(antennaTip);

    head.position.y = 0.35;
    robot.add(head);

    // ---- Body ----
    const torso = new THREE.Mesh(new THREE.SphereGeometry(0.95, 36, 28), whiteMat);
    torso.scale.set(0.95, 1.02, 0.85);
    torso.position.y = -1.55;
    robot.add(torso);

    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 24), tealMat);
    belly.scale.set(0.92, 0.8, 0.8);
    belly.position.y = -2.0;
    robot.add(belly);

    const chestRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.05, 14, 36),
      cyanGlowMat
    );
    chestRing.position.set(0, -1.42, 0.78);
    robot.add(chestRing);
    const chestCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 18, 18),
      new THREE.MeshBasicMaterial({ color: new THREE.Color("#a5f3fc") })
    );
    chestCore.position.set(0, -1.42, 0.78);
    robot.add(chestCore);

    // Blue side arms
    const armGeo = new THREE.CapsuleGeometry(0.15, 0.42, 8, 16);
    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.rotation.z = 1.05;
    leftArm.position.set(-1.08, -1.4, 0.05);
    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.rotation.z = -1.05;
    rightArm.position.set(1.08, -1.4, 0.05);
    robot.add(leftArm, rightArm);

    // ---- Thruster flames (intro flight) ----
    const flameMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#67e8f9"),
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const flameGeo = new THREE.ConeGeometry(0.14, 0.55, 12, 1, true);
    const flameL = new THREE.Mesh(flameGeo, flameMat);
    flameL.rotation.x = Math.PI;
    flameL.position.set(-0.3, -2.72, 0);
    const flameR = new THREE.Mesh(flameGeo, flameMat);
    flameR.rotation.x = Math.PI;
    flameR.position.set(0.3, -2.72, 0);
    robot.add(flameL, flameR);

    // ---- Lights ----
    const hemi = new THREE.HemisphereLight("#ffffff", "#1e293b", 1.1);
    scene.add(hemi);
    const keyLight = new THREE.DirectionalLight("#ffffff", 2.4);
    keyLight.position.set(3, 5, 6);
    scene.add(keyLight);
    const rim = new THREE.DirectionalLight("#93c5fd", 1.2);
    rim.position.set(-4, 2, -3);
    scene.add(rim);
    const underGlow = new THREE.PointLight("#22d3ee", 1.6, 10);
    underGlow.position.set(0, -3, 2.5);
    scene.add(underGlow);

    // ---- Interaction state ----
    let targetRX = 0;
    let targetRY = 0;
    let targetEyeX = 0;
    let hovering = false;
    let raf = 0;
    let t = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / Math.max(window.innerWidth / 2, 1);
      const ny = (e.clientY - cy) / Math.max(window.innerHeight / 2, 1);

      targetRY = THREE.MathUtils.clamp(nx * 0.8, -0.75, 0.75);
      targetRX = THREE.MathUtils.clamp(-ny * 0.45, -0.4, 0.45);
      targetEyeX = THREE.MathUtils.clamp(nx * 0.1, -0.12, 0.12);

      hovering =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(animate);
    };
    document.addEventListener("visibilitychange", onVisibility);

    const clock = new THREE.Clock();
    let blinkTimer = 0;
    let nextBlink = 2.2;

    // ---- Intro flight path (REAL 3D motion through Z space) ----
    // Waits for the preloader, then flies from far away straight at the
    // camera (grows via perspective), weaving & banking, then settles back
    // onto its perch. All frame-by-frame inside the render loop.
    const INTRO_START = 2.2;  // s — wait for ArcPreloader to clear
    const INTRO_FLY = 1.7;    // s — approach the camera
    const INTRO_SETTLE = 0.9; // s — retreat onto the perch
    const FAR_Z = -60;
    const NEAR_Z = 5.2;       // just in front of the camera (z=7.5) → fills screen

    const easeInOutCubic = (v: number) =>
      v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      t = clock.getElapsedTime();

      const introT = t - INTRO_START;
      let flightBoost = 0;

      if (introT < 0) {
        // Waiting far away — tiny dot on the horizon
        robot.position.set(0, 0, FAR_Z);
        robot.rotation.set(0, 0, 0);
      } else if (introT < INTRO_FLY) {
        // Fly at the camera: perspective does the growing
        const p = easeInOutCubic(introT / INTRO_FLY);
        robot.position.z = FAR_Z + (NEAR_Z - FAR_Z) * p;
        // Weaving flight path (fades out as it gets close)
        const weave = (1 - p) * 2.6;
        robot.position.x = Math.sin(p * Math.PI * 2.2) * weave;
        robot.position.y = Math.cos(p * Math.PI * 1.7) * weave * 0.55;
        // Bank into the weave + nose wiggle
        robot.rotation.z = -Math.cos(p * Math.PI * 2.2) * (1 - p) * 0.55;
        robot.rotation.y = Math.sin(p * Math.PI * 2.2 + 0.6) * (1 - p) * 0.4;
        robot.rotation.x = p * 0.12; // slight nose-down attack angle
        flightBoost = 1;
      } else if (introT < INTRO_FLY + INTRO_SETTLE) {
        // Retreat onto the perch (z 5.2 → 0), straightening up
        const p = easeInOutCubic((introT - INTRO_FLY) / INTRO_SETTLE);
        robot.position.z = NEAR_Z * (1 - p);
        robot.position.x *= 1 - p * 0.2;
        robot.rotation.z += (0 - robot.rotation.z) * 0.1;
        robot.rotation.y += (0 - robot.rotation.y) * 0.1;
        robot.rotation.x += (0 - robot.rotation.x) * 0.1;
        flightBoost = 1 - p;
      } else {
        // Perched
        robot.position.z = 0;
        flightBoost = 0;
      }

      // Idle hover bob (blended out while weaving)
      const settled = introT >= INTRO_FLY + INTRO_SETTLE ? 1 : 0;
      const bobAmp = 0.09 * settled;
      robot.position.y += Math.sin(t * 1.6) * bobAmp;

      // Gentle idle sway when perched
      robot.rotation.z += (Math.sin(t * 0.8) * 0.025 * settled - robot.rotation.z) * 0.04;

      // Head tracks cursor
      head.rotation.y += (targetRY - head.rotation.y) * 0.07;
      head.rotation.x += (targetRX - head.rotation.x) * 0.07;

      // Eyes micro-tracking
      leftEye.position.x = -0.37 + targetEyeX;
      rightEye.position.x = 0.37 + targetEyeX;

      // Blink + happy squint near cursor
      blinkTimer += clock.getDelta();
      const blinking = blinkTimer > nextBlink && blinkTimer < nextBlink + 0.15;
      const targetEyeScaleY = blinking ? 0.1 : hovering ? 0.82 : 1;
      leftEye.scale.y += (targetEyeScaleY - leftEye.scale.y) * 0.45;
      rightEye.scale.y += (targetEyeScaleY - rightEye.scale.y) * 0.45;
      if (blinkTimer > nextBlink + 0.15) {
        blinkTimer = 0;
        nextBlink = 2.2 + Math.random() * 3;
      }

      // Smile widens near cursor
      const smileTarget = hovering ? 1.18 : 1;
      smile.scale.setScalar(smile.scale.x + (smileTarget - smile.scale.x) * 0.08);

      // Thruster flicker (intro flight only)
      const flicker = 0.75 + Math.sin(t * 31) * 0.15 + Math.sin(t * 47) * 0.1;
      flameMat.opacity = flightBoost * 0.85 * flicker;
      const flameScale = 0.6 + flightBoost * 1.6 * flicker;
      flameL.scale.set(1, flameScale, 1);
      flameR.scale.set(1, flameScale, 1);
      chestCore.scale.setScalar(1 + Math.sin(t * 3) * 0.12 + flightBoost * 0.25);

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size }}
      initial={reduce ? undefined : { opacity: 0 }}
      animate={reduce ? undefined : { opacity: 1 }}
      transition={reduce ? undefined : { delay: 0.1, duration: 0.4 }}
      aria-hidden="true"
      data-detail="Your AI companion: it greets you, then watches your cursor"
      data-title="ROBOT_COMPANION"
    />
  );
}
