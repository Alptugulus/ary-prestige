"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type ExploreMode = "360" | "3d";
export type ExperienceTab = "3d" | "gallery";

interface ExploreContextValue {
  isOpen: boolean;
  tab: ExperienceTab;
  galleryIndex: number;
  openExperience: (tab?: ExperienceTab, galleryIndex?: number) => void;
  closeExperience: () => void;
  setTab: (tab: ExperienceTab) => void;
  /** 360 → 3D model, 3d → render galerisi */
  openExplore: (mode: ExploreMode, startIndex?: number) => void;
  closeExplore: () => void;
  openModel3D: () => void;
  closeModel3D: () => void;
}

const ExploreContext = createContext<ExploreContextValue | null>(null);

export function ExploreProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<ExperienceTab>("3d");
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openExperience = useCallback(
    (nextTab: ExperienceTab = "3d", index = 0) => {
      setTab(nextTab);
      setGalleryIndex(index);
      setIsOpen(true);
    },
    []
  );

  const closeExperience = useCallback(() => setIsOpen(false), []);

  const openExplore = useCallback(
    (mode: ExploreMode, index = 0) => {
      if (mode === "360") openExperience("3d", index);
      else openExperience("gallery", index);
    },
    [openExperience]
  );

  const openModel3D = useCallback(() => openExperience("3d"), [openExperience]);
  const closeModel3D = closeExperience;
  const closeExplore = closeExperience;

  return (
    <ExploreContext.Provider
      value={{
        isOpen,
        tab,
        galleryIndex,
        openExperience,
        closeExperience,
        setTab,
        openExplore,
        closeExplore,
        openModel3D,
        closeModel3D,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
}

export function useExplore() {
  const ctx = useContext(ExploreContext);
  if (!ctx) {
    throw new Error("useExplore must be used within ExploreProvider");
  }
  return ctx;
}

export function useExperience() {
  return useExplore();
}

export function useModel3D() {
  return useExplore();
}
