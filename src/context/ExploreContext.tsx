"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type ExploreMode = "360" | "3d";

interface ExploreContextValue {
  openExplore: (mode: ExploreMode, startIndex?: number) => void;
  closeExplore: () => void;
  isOpen: boolean;
  mode: ExploreMode | null;
  startIndex: number;
}

const ExploreContext = createContext<ExploreContextValue | null>(null);

export function ExploreProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ExploreMode | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  const openExplore = useCallback((m: ExploreMode, index = 0) => {
    setMode(m);
    setStartIndex(index);
    setIsOpen(true);
  }, []);

  const closeExplore = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ExploreContext.Provider
      value={{ openExplore, closeExplore, isOpen, mode, startIndex }}
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
