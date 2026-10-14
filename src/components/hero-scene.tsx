"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";
import { currentBlue } from "@/lib/brand-color";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // no WebGL - the <Image> fallback underneath stays visible
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    // The constellation around the logo: a loose cloud of nodes echoing the
    // network motif already drawn into the mark, extended into the space
    // around it rather than confined to the flat artwork.
    const NODE_COUNT = 140;
    const positions = new Float32Array(NODE_COUNT * 3);
    const phases = new Float32Array(NODE_COUNT);
    for (let i = 0; i < NODE_COUNT; i++) {
      // bias away from the centre so the logo sprite reads clearly
      const r = 1.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: currentBlue(),
      size: 0.07,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(nodeGeo, nodeMat);

    // connect nearby nodes once - a static graph, not recomputed per frame
    const linePositions: number[] = [];
    const MAX_DIST = 1.15;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < MAX_DIST * MAX_DIST) {
          linePositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2],
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePositions), 3),
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: currentBlue(),
      transparent: true,
      opacity: 0.18,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);

    const group = new THREE.Group();
    group.add(points, lines);
    scene.add(group);

    const textureLoader = new THREE.TextureLoader();
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        transparent: true,
        depthWrite: false,
        opacity: 0,
      }),
    );
    sprite.scale.set(3.6, 4.4, 1);
    scene.add(sprite);
    textureLoader.load("/logo.png", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      const mat = sprite.material;
      mat.map = tex;
      mat.opacity = 1;
      mat.needsUpdate = true;
    });

    function resize() {
      if (!container) return;
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    container.appendChild(renderer.domElement);
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const themeObserver = new MutationObserver(() => {
      nodeMat.color.set(currentBlue());
      lineMat.color.set(currentBlue());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const pointer = { x: 0, y: 0 };
    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();
    function animate() {
      if (!running) return;
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.08;
      group.rotation.x = Math.sin(t * 0.05) * 0.08;
      const posAttr = nodeGeo.attributes.position as THREE.BufferAttribute;
      nodeMat.opacity = 0.7 + Math.sin(t * 1.4) * 0.1;
      void posAttr; // phases reserved for a future per-node twinkle pass
      camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (-pointer.y * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }
    animate();

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        animate();
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      nodeGeo.dispose();
      lineGeo.dispose();
      nodeMat.dispose();
      lineMat.dispose();
      sprite.material.map?.dispose();
      sprite.material.dispose();
      renderer.dispose();
      container?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-[4/5] w-56 sm:w-72 md:w-96">
      <Image
        src="/logo.png"
        alt=""
        width={613}
        height={752}
        priority
        className="h-full w-full object-contain"
      />
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
