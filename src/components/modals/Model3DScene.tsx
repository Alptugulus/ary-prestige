"use client";

import { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { heroSceneConfig } from "@/lib/hero-scene/config";

function enhanceMaterials(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.castShadow = true;
    child.receiveShadow = true;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((mat) => {
      if (!(mat instanceof THREE.MeshStandardMaterial)) return;
      mat.envMapIntensity = 1.35;
      mat.roughness = THREE.MathUtils.clamp(mat.roughness * 0.92, 0.25, 0.9);
      mat.metalness = THREE.MathUtils.clamp(mat.metalness + 0.04, 0, 0.35);
      mat.needsUpdate = true;
    });
  });
}

function BuildingModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const cloned = scene.clone(true);
    enhanceMaterials(cloned);
    return cloned;
  }, [scene]);

  return (
    <Bounds fit clip observe margin={1.12} maxDuration={0}>
      <Center>
        <group rotation={[0, -0.42, 0]}>
          <primitive object={model} />
        </group>
      </Center>
    </Bounds>
  );
}

function SceneLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 pointer-events-none select-none">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(197,160,89,0.15)"
              strokeWidth="2"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#C5A059"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${(progress / 100) * 176} 176`}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-bronze text-xs font-medium tabular-nums">
            {Math.round(progress)}
          </span>
        </div>
        <p className="text-white/45 text-[10px] tracking-[0.22em] uppercase">
          Model yükleniyor
        </p>
      </div>
    </Html>
  );
}

function StudioStage({
  url,
  autoRotate,
  controlsRef,
  onInteract,
}: {
  url: string;
  autoRotate: boolean;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  onInteract: () => void;
}) {
  return (
    <>
      <color attach="background" args={["#060606"]} />
      <fog attach="fog" args={["#060606", 18, 55]} />

      <ambientLight intensity={0.55} color="#eef2ff" />
      <directionalLight
        position={[14, 22, 12]}
        intensity={1.85}
        color="#fff8ee"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00015}
      />
      <directionalLight
        position={[-12, 10, -8]}
        intensity={0.65}
        color="#c5a059"
      />
      <spotLight
        position={[0, 18, 0]}
        angle={0.42}
        penumbra={0.85}
        intensity={0.45}
        color="#ffffff"
      />

      <Suspense fallback={<SceneLoader />}>
        <BuildingModel url={url} />
        <Environment preset="city" environmentIntensity={0.85} />
      </Suspense>

      <ContactShadows
        position={[0, -0.015, 0]}
        opacity={0.55}
        scale={32}
        blur={2.8}
        far={16}
        color="#000000"
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[14, 96]} />
        <meshStandardMaterial
          color="#0c0c0c"
          metalness={0.55}
          roughness={0.72}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.018, 0]}>
        <ringGeometry args={[13.2, 14, 96]} />
        <meshBasicMaterial color="#c5a059" transparent opacity={0.12} />
      </mesh>

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.045}
        minDistance={4}
        maxDistance={28}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI * 0.49}
        autoRotate={autoRotate}
        autoRotateSpeed={0.55}
        onStart={onInteract}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
      />
    </>
  );
}

interface Model3DCanvasProps {
  autoRotate: boolean;
  onInteract: () => void;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

export function Model3DCanvas({
  autoRotate,
  onInteract,
  controlsRef,
}: Model3DCanvasProps) {
  const url = heroSceneConfig.glb.url;

  useEffect(() => {
    useGLTF.preload(url);
  }, [url]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 3.5, 11], fov: 35, near: 0.1, far: 200 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      className="touch-none"
    >
      <StudioStage
        url={url}
        autoRotate={autoRotate}
        controlsRef={controlsRef}
        onInteract={onInteract}
      />
    </Canvas>
  );
}

export function preloadModel3D() {
  useGLTF.preload(heroSceneConfig.glb.url);
}
