"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function HeroNodesCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWebGlSupported(false);
      return;
    }

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 280;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      setWebGlSupported(false);
      return;
    }

    // Node particle data
    const PARTICLE_COUNT = 90;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const BOUNDS_X = 260;
    const BOUNDS_Y = 160;
    const BOUNDS_Z = 120;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS_X * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS_Y * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS_Z * 2;

      velocities.push({
        x: (Math.random() - 0.5) * 0.45,
        y: (Math.random() - 0.5) * 0.45,
        z: (Math.random() - 0.5) * 0.3,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Circle texture for smooth particles
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(0, 242, 254, 1)");
      gradient.addColorStop(0.4, "rgba(0, 242, 254, 0.8)");
      gradient.addColorStop(1, "rgba(0, 242, 254, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 4.5,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Line segments connecting nearby nodes
    const maxConnections = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.8,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((event.clientX - rect.left) / width) * 2 - 1;
      const normY = -(((event.clientY - rect.top) / height) * 2 - 1);
      targetX = normX * 80;
      targetY = normY * 60;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    const CONNECTION_DISTANCE = 75;
    let frame = 0;

    const animate = () => {
      frame++;
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX * 0.4;
      camera.position.y = mouseY * 0.4;
      camera.lookAt(0, 0, 0);

      // Rotate group gently
      scene.rotation.y = frame * 0.0008;

      const pos = particleGeometry.attributes.position.array as Float32Array;

      // Update positions
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        pos[idx] += velocities[i].x;
        pos[idx + 1] += velocities[i].y;
        pos[idx + 2] += velocities[i].z;

        // Bounce back inside boundary
        if (Math.abs(pos[idx]) > BOUNDS_X) velocities[i].x *= -1;
        if (Math.abs(pos[idx + 1]) > BOUNDS_Y) velocities[i].y *= -1;
        if (Math.abs(pos[idx + 2]) > BOUNDS_Z) velocities[i].z *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Update connections
      let lineVertexIndex = 0;
      let colorVertexIndex = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const x1 = pos[i3];
        const y1 = pos[i3 + 1];
        const z1 = pos[i3 + 2];

        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const j3 = j * 3;
          const x2 = pos[j3];
          const y2 = pos[j3 + 1];
          const z2 = pos[j3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = 1.0 - dist / CONNECTION_DISTANCE;

            linePositions[lineVertexIndex++] = x1;
            linePositions[lineVertexIndex++] = y1;
            linePositions[lineVertexIndex++] = z1;
            linePositions[lineVertexIndex++] = x2;
            linePositions[lineVertexIndex++] = y2;
            linePositions[lineVertexIndex++] = z2;

            // Electric cyan to mint line color
            const r = 0.0;
            const g = 0.7 + alpha * 0.25;
            const b = 0.9 + alpha * 0.1;

            lineColors[colorVertexIndex++] = r * alpha * 0.45;
            lineColors[colorVertexIndex++] = g * alpha * 0.45;
            lineColors[colorVertexIndex++] = b * alpha * 0.45;
            lineColors[colorVertexIndex++] = r * alpha * 0.45;
            lineColors[colorVertexIndex++] = g * alpha * 0.45;
            lineColors[colorVertexIndex++] = b * alpha * 0.45;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineVertexIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,242,254,0.15),rgba(255,255,255,0))]" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ maskImage: "radial-gradient(circle at 50% 40%, black 50%, transparent 95%)" }}
    />
  );
}

