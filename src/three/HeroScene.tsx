import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  className?: string;
}

/**
 * Lightweight WebGL "AI core": a rotating particle sphere + inner wireframe
 * icosahedron. Pauses rendering when off-screen; renders a single static
 * frame when the user prefers reduced motion.
 */
export default function HeroScene({ className }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Particle shell — fibonacci sphere for even distribution
    const count = isSmall ? 900 : 2200;
    const radius = 2.4;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const accent = new THREE.Color("#c8ff2e");
    const dim = new THREE.Color("#3a4a22");
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * r * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = Math.sin(theta) * r * radius;
      const c = Math.random() > 0.82 ? accent : dim;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.Points(geo, mat));

    // Inner wireframe core
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 1),
      new THREE.MeshBasicMaterial({
        color: "#c8ff2e",
        wireframe: true,
        transparent: true,
        opacity: 0.14,
      }),
    );
    group.add(wire);

    // Connection halo ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.004, 8, 120),
      new THREE.MeshBasicMaterial({ color: "#c8ff2e", transparent: true, opacity: 0.25 }),
    );
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);

    let mouseX = 0;
    let mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduced) window.addEventListener("mousemove", onMouse, { passive: true });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.12 + mouseX * 0.25;
      group.rotation.x = mouseY * 0.18;
      wire.rotation.y = -t * 0.3;
      wire.rotation.z = t * 0.14;
      ring.rotation.z = t * 0.08;
      renderer.render(scene, camera);
    };

    if (reduced) {
      render(); // static single frame
    } else {
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return; // skip work when off-screen/hidden
        render();
      };
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (!reduced) window.removeEventListener("mousemove", onMouse);
      geo.dispose();
      mat.dispose();
      wire.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
