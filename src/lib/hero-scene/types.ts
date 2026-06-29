export type HeroSceneMode = "layers" | "glb";

export interface HeroParallaxConfig {
  maxRotateX: number;
  maxRotateY: number;
  springStiffness: number;
  springDamping: number;
}

export interface HeroLayerConfig {
  id: string;
  /** Katmana özel görsel — yoksa aktif slayt render'ı kullanılır */
  src?: string;
  /** Z derinliği (px) — büyük = öne */
  depth: number;
  /** Parallax hız çarpanı */
  speed: number;
  /** Ölçek */
  scale: number;
  /** Opaklık (0–1) */
  opacity?: number;
  /** px blur */
  blur?: number;
  /** object-position */
  objectPosition?: string;
}

export interface HeroGlbConfig {
  /** GLB dosya yolu — hazır olunca etkinleştirin */
  url: string;
  enabled: boolean;
  /** Kamera başlangıç pozisyonu */
  cameraPosition?: [number, number, number];
  autoRotate?: boolean;
}

export interface HeroSceneConfig {
  mode: HeroSceneMode;
  parallax: HeroParallaxConfig;
  layers: HeroLayerConfig[];
  glb: HeroGlbConfig;
}

export interface HeroSlide {
  id: string;
  label: string;
  image: string;
}

export interface ParallaxState {
  normalizedX: number;
  normalizedY: number;
  rotateX: number;
  rotateY: number;
}
