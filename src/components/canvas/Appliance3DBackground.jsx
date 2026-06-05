import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

// Helper for programmatic glowing dot texture
const createCircleTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(56, 189, 248, 0.4)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
  }
  return new THREE.CanvasTexture(canvas);
};

// ── Concentric Tech Orbital Rings ──────────────────────────────
const TechOrbitalRings = () => {
  const groupRef = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Slow main group rotation
    groupRef.current.rotation.y = time * 0.05;

    // Rotate individual rings on different axes
    if (ring1.current) ring1.current.rotation.x = time * 0.15;
    if (ring2.current) ring2.current.rotation.y = -time * 0.2;
    if (ring3.current) ring3.current.rotation.z = time * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, -4.5]}>
      {/* Central Core sphere (wireframe) */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.008, 8, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.0, 0.006, 8, 64]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.25} />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ring3} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
        <torusGeometry args={[2.5, 0.005, 8, 64]} />
        <meshBasicMaterial color="#0284c7" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

// ── Ambient Floating Particles ────────────────────────────────
const GlowingAmbientDust = () => {
  const pointsRef = useRef();
  const count = 110;
  const texture = useMemo(() => createCircleTexture(), []);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 12; // X
      pos[i + 1] = (Math.random() - 0.5) * 8;  // Y
      pos[i + 2] = (Math.random() - 0.5) * 6 - 3; // Z
    }
    return [pos];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#38bdf8"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={texture}
      />
    </points>
  );
};

// ── Camera Parallax & Scroll Controller ────────────────────────
const SceneController = ({ scrollY }) => {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 0.5, 5.2));

  useFrame((state) => {
    // 1. Mouse pointer tracking parallax
    const mouseX = state.pointer.x * 0.6;
    const mouseY = (state.pointer.y * 0.4) + 0.5;

    // 2. Scroll translation (camera shifts down as user scrolls down the page)
    const scrollFactor = scrollY * 0.0016;

    targetCamPos.current.x = mouseX;
    targetCamPos.current.y = mouseY - scrollFactor;

    // Smooth lerping
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamPos.current.x, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamPos.current.y, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamPos.current.z, 0.04);

    // Look target shifts downward with scroll
    camera.lookAt(0, -scrollFactor, -4);
  });

  return null;
};

// ── Main Background Wrapper ────────────────────────────────────
const Appliance3DBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none overflow-hidden bg-slate-950">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(14,165,233,0.08),transparent_70%)]" />
      <div className="absolute top-[20vh] left-[20vw] w-[45vw] h-[45vw] bg-sky-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-[20vh] right-[15vw] w-[35vw] h-[35vw] bg-cyan-500/5 blur-3xl rounded-full" />

      <Canvas
        camera={{ position: [0, 0.5, 5.2], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        
        {/* Lights positioned to capture reflections on morphing shapes */}
        <pointLight position={[-6, 4, 1]} intensity={2.5} color="#0ea5e9" />
        <pointLight position={[6, -4, 1]} intensity={2.5} color="#06b6d4" />
        <pointLight position={[0, 2, 3]} intensity={0.5} color="#ffffff" />

        {/* ── Morphing Glass/Metallic Geometries ── */}
        
        {/* Blob 1: High-Tech Glass Distorted Sphere (Top Right / Hero Area) */}
        <mesh position={[2.4, 0.8, -2.5]}>
          <sphereGeometry args={[0.72, 64, 64]} />
          <MeshDistortMaterial
            color="#0ea5e9"
            distort={0.35}
            speed={1.6}
            roughness={0.08}
            metalness={0.8}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Blob 2: Cyan Metallic Wobble Sphere (Bottom Left / Services / Why Us) */}
        <mesh position={[-2.3, -1.8, -2.5]}>
          <sphereGeometry args={[0.64, 64, 64]} />
          <MeshWobbleMaterial
            color="#06b6d4"
            factor={0.4}
            speed={1.8}
            roughness={0.15}
            metalness={0.9}
            clearcoat={0.8}
          />
        </mesh>

        {/* Central tech rings */}
        <TechOrbitalRings />

        {/* Floating dust field */}
        <GlowingAmbientDust />

        {/* Grid helper on floor */}
        <gridHelper
          args={[40, 40, "#1e293b", "#0f172a"]}
          position={[0, -2, -5.5]}
          rotation={[0.12, 0, 0]}
        />

        {/* Controller */}
        <SceneController scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default Appliance3DBackground;
