import type { HeroSceneConfig } from "./types";

/**
 * Hero sahne yapılandırması.
 *
 * GLB model eklendiğinde:
 * 1. Dosyayı `public/models/ary-prestige.glb` konumuna koyun
 * 2. `glb.enabled` → true
 * 3. `mode` → "glb"
 */
export const heroSceneConfig: HeroSceneConfig = {
  mode: "layers",

  parallax: {
    maxRotateX: 5,
    maxRotateY: 7,
    springStiffness: 65,
    springDamping: 22,
  },

  layers: [
    {
      id: "ambient",
      depth: -140,
      speed: 0.22,
      scale: 1.22,
      opacity: 0.55,
      blur: 4,
      objectPosition: "55% 45%",
    },
    {
      id: "sky",
      depth: -70,
      speed: 0.35,
      scale: 1.14,
      opacity: 0.75,
      objectPosition: "50% 30%",
    },
    {
      id: "building",
      depth: 0,
      speed: 0.58,
      scale: 1.06,
      opacity: 1,
      objectPosition: "58% 50%",
    },
    {
      id: "foreground",
      depth: 90,
      speed: 0.95,
      scale: 1.1,
      opacity: 0.28,
      objectPosition: "60% 65%",
    },
  ],

  glb: {
    url: "/models/ary-prestige.glb",
    enabled: false,
    cameraPosition: [0, 1.2, 5.5],
    autoRotate: false,
  },
};
