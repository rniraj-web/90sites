"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { navLinks } from "@/lib/content";
import { currentBlue } from "@/lib/brand-color";

const PROXIMITY = 90; // px - how far a pointer's pull reaches
const MAX_SCALE = 1.22;
const MAX_DROP = 5; // px

function softDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export default function NavDock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const canvasHostRef = useRef<HTMLDivElement>(null);

  // Proximity magnify: items spring downward and widen as the pointer nears.
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    function apply(el: HTMLAnchorElement, strength: number) {
      const eased = strength * strength * (3 - 2 * strength); // smoothstep
      const scale = 1 + (MAX_SCALE - 1) * eased;
      el.style.transform = `translateY(${MAX_DROP * eased}px) scale(${scale})`;
    }

    function onMove(e: PointerEvent) {
      for (const el of itemRefs.current) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(e.clientX - (rect.left + rect.width / 2));
        apply(el, Math.max(0, 1 - dist / PROXIMITY));
      }
    }
    function onLeave() {
      for (const el of itemRefs.current) if (el) el.style.transform = "";
    }

    dock.addEventListener("pointermove", onMove);
    dock.addEventListener("pointerleave", onLeave);
    return () => {
      dock.removeEventListener("pointermove", onMove);
      dock.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // A quiet drift of light behind the frosted glass - decorative only.
  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const COUNT = 36;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = Math.random() * 2 - 1;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * 0.5;
      positions[i * 3 + 2] = 0;
      speeds[i] = 0.02 + Math.random() * 0.05;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      map: softDotTexture(),
      color: currentBlue(),
      size: 0.09,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function resize() {
      const { clientWidth: w, clientHeight: h } = host!;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    host.appendChild(renderer.domElement);
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const themeObserver = new MutationObserver(() =>
      material.color.set(currentBlue()),
    );
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let raf = 0;
    let running = true;
    function animate() {
      if (!running) return;
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < COUNT; i++) {
        let x = pos.getX(i) + speeds[i] * 0.016;
        if (x > 1.1) x = -1.1;
        pos.setX(i, x);
      }
      pos.needsUpdate = true;
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
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.map?.dispose();
      material.dispose();
      renderer.dispose();
      host?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={dockRef}
      className="relative hidden items-center gap-1 overflow-hidden rounded-full border border-border/60 bg-background/70 px-2 py-1.5 shadow-lg shadow-black/10 backdrop-blur-md md:flex"
    >
      <div
        ref={canvasHostRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
      {navLinks.map((link, i) => (
        <a
          key={link.label}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          href={link.href}
          onFocus={(e) => {
            e.currentTarget.style.transform = `translateY(${MAX_DROP}px) scale(${MAX_SCALE})`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.transform = "";
          }}
          className="relative z-10 min-h-11 rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:text-foreground"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
