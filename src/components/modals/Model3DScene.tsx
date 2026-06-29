"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  CameraControls,
  Html,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import type { CameraControls as CameraControlsRef } from "@react-three/drei";
import * as THREE from "three";
import { heroSceneConfig } from "@/lib/hero-scene/config";

const CAMERA_ACTION = {
  NONE: 0,
  ROTATE: 1,
  TRUCK: 2,
  DOLLY: 16,
  TOUCH_ROTATE: 64,
  TOUCH_TRUCK: 128,
  TOUCH_DOLLY: 1024,
} as const;

const FIT_PADDING = {
  paddingLeft: 0.2,
  paddingRight: 0.2,
  paddingTop: 0.08,
  paddingBottom: 0.12,
} as const;

function tuneMaterials(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.castShadow = false;
    child.receiveShadow = false;
    child.frustumCulled = true;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((mat) => {
      if (!(mat instanceof THREE.MeshStandardMaterial)) return;
      mat.envMapIntensity = 0.85;
      mat.needsUpdate = true;
    });
  });
}

function getModelBounds(group: THREE.Group) {
  const box = new THREE.Box3().setFromObject(group);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const sphere = box.getBoundingSphere(new THREE.Sphere());
  return { box, size, center, sphere, minY: box.min.y };
}

function applyDistanceLimits(
  controls: CameraControlsRef,
  group: THREE.Group
) {
  const { sphere } = getModelBounds(group);
  const radius = Math.max(sphere.radius, 1);

  controls.minDistance = radius * 0.15;
  controls.maxDistance = radius * 5.5;
  // Üstten bakış serbest, altından bakış engelli (zemin kaybolmasın)
  controls.minPolarAngle = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.04;
}

function BuildingModel({
  url,
  onLoaded,
  onGroupReady,
}: {
  url: string;
  onLoaded?: () => void;
  onGroupReady?: (group: THREE.Group) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const onLoadedRef = useRef(onLoaded);
  const onGroupReadyRef = useRef(onGroupReady);
  const { scene } = useGLTF(url);

  onLoadedRef.current = onLoaded;
  onGroupReadyRef.current = onGroupReady;

  const model = useMemo(() => {
    const cloned = scene.clone(true);
    tuneMaterials(cloned);
    return cloned;
  }, [scene]);

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 12 / maxDim : 1;
    groupRef.current.scale.setScalar(scale);
    onGroupReadyRef.current?.(groupRef.current);
    onLoadedRef.current?.();
  }, [model]);

  return (
    <group ref={groupRef} rotation={[0, -0.38, 0]}>
      <primitive object={model} />
    </group>
  );
}

function GroundPlate({ group }: { group: THREE.Group }) {
  const ground = useMemo(() => getModelBounds(group), [group]);
  const radius = Math.max(ground.size.x, ground.size.z) * 0.75 + 10;

  return (
    <group position={[ground.center.x, ground.minY - 0.04, ground.center.z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={false}>
        <circleGeometry args={[radius, 48]} />
        <meshStandardMaterial
          color="#0d0d0d"
          roughness={0.92}
          metalness={0.08}
          side={THREE.FrontSide}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <ringGeometry args={[radius * 0.92, radius, 64]} />
        <meshBasicMaterial color="#1a1510" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function FitCamera({
  group,
  controlsRef,
}: {
  group: THREE.Group;
  controlsRef: React.RefObject<CameraControlsRef | null>;
}) {
  const { camera, invalidate } = useThree();
  const fittedRef = useRef(false);

  useLayoutEffect(() => {
    if (!controlsRef.current || fittedRef.current) return;

    fittedRef.current = true;
    camera.near = 0.25;
    camera.far = 600;
    camera.updateProjectionMatrix();

    const controls = controlsRef.current;
    applyDistanceLimits(controls, group);

    void controls.fitToBox(group, false, FIT_PADDING).then(() => {
      applyDistanceLimits(controls, group);
      invalidate();
    });
  }, [group, controlsRef, camera, invalidate]);

  return null;
}

function AutoRotate({
  enabled,
  controlsRef,
}: {
  enabled: boolean;
  controlsRef: React.RefObject<CameraControlsRef | null>;
}) {
  const invalidate = useThree((s) => s.invalidate);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!enabled || !controls) return;
    if (controls.currentAction !== CAMERA_ACTION.NONE) return;

    controls.rotate(0.18 * delta, 0, true);
    invalidate();
  });

  return null;
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
  modelGroupRef,
  onInteract,
  onLoaded,
}: {
  url: string;
  autoRotate: boolean;
  controlsRef: React.RefObject<CameraControlsRef | null>;
  modelGroupRef: React.MutableRefObject<THREE.Group | null>;
  onInteract: () => void;
  onLoaded?: () => void;
}) {
  const [modelGroup, setModelGroup] = useState<THREE.Group | null>(null);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    if (modelGroup) invalidate();
  }, [modelGroup, invalidate]);

  const handleGroupReady = useCallback(
    (group: THREE.Group) => {
      modelGroupRef.current = group;
      setModelGroup(group);
    },
    [modelGroupRef]
  );

  const handleControlStart = useCallback(() => {
    onInteract();
    invalidate();
  }, [onInteract, invalidate]);

  const handleControlChange = useCallback(() => {
    invalidate();
  }, [invalidate]);

  const handleControlEnd = useCallback(() => {
    invalidate();
  }, [invalidate]);

  return (
    <>
      <color attach="background" args={["#080808"]} />

      <hemisphereLight args={["#e8eeff", "#1a1208", 0.55]} />
      <ambientLight intensity={0.35} color="#ffffff" />
      <directionalLight position={[14, 22, 12]} intensity={1.35} color="#fff6ea" />
      <directionalLight position={[-12, 10, -8]} intensity={0.45} color="#c5a059" />

      <Suspense fallback={<SceneLoader />}>
        <BuildingModel
          url={url}
          onLoaded={onLoaded}
          onGroupReady={handleGroupReady}
        />
      </Suspense>

      {modelGroup && (
        <>
          <GroundPlate group={modelGroup} />
          <FitCamera group={modelGroup} controlsRef={controlsRef} />
        </>
      )}

      <CameraControls
        ref={controlsRef}
        makeDefault
        smoothTime={0.28}
        draggingSmoothTime={0.1}
        dollySpeed={0.55}
        truckSpeed={1.4}
        restThreshold={0.02}
        mouseButtons={{
          left: CAMERA_ACTION.ROTATE,
          middle: CAMERA_ACTION.TRUCK,
          right: CAMERA_ACTION.TRUCK,
          wheel: CAMERA_ACTION.DOLLY,
        }}
        touches={{
          one: CAMERA_ACTION.TOUCH_ROTATE,
          two: CAMERA_ACTION.TOUCH_DOLLY,
          three: CAMERA_ACTION.TOUCH_TRUCK,
        }}
        onStart={handleControlStart}
        onChange={handleControlChange}
        onEnd={handleControlEnd}
      />

      <AutoRotate enabled={autoRotate} controlsRef={controlsRef} />
    </>
  );
}

export interface Model3DCanvasProps {
  autoRotate: boolean;
  onInteract: () => void;
  onLoaded?: () => void;
  controlsRef: React.RefObject<CameraControlsRef | null>;
  modelGroupRef: React.MutableRefObject<THREE.Group | null>;
}

export function Model3DCanvas({
  autoRotate,
  onInteract,
  onLoaded,
  controlsRef,
  modelGroupRef,
}: Model3DCanvasProps) {
  const url = heroSceneConfig.glb.url;

  useEffect(() => {
    useGLTF.preload(url);
  }, [url]);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.35]}
      camera={{ fov: 36, near: 0.25, far: 600 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      performance={{ min: 0.6, max: 1.35, debounce: 200 }}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
    >
      <StudioStage
        url={url}
        autoRotate={autoRotate}
        onInteract={onInteract}
        onLoaded={onLoaded}
        controlsRef={controlsRef}
        modelGroupRef={modelGroupRef}
      />
    </Canvas>
  );
}

export function preloadModel3D() {
  useGLTF.preload(heroSceneConfig.glb.url);
}

export function fitCameraToModel(
  controls: CameraControlsRef | null,
  group: THREE.Group | null
) {
  if (!controls || !group) return;
  applyDistanceLimits(controls, group);
  void controls.fitToBox(group, true, FIT_PADDING);
}

export function zoomCameraRelative(
  controls: CameraControlsRef | null,
  direction: "in" | "out"
) {
  if (!controls) return;
  const factor = direction === "in" ? 0.85 : 1.18;
  const next = THREE.MathUtils.clamp(
    controls.distance * factor,
    controls.minDistance,
    controls.maxDistance
  );
  void controls.dollyTo(next, true);
}
