"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface Model3DContextValue {
  isOpen: boolean;
  openModel3D: () => void;
  closeModel3D: () => void;
}

const Model3DContext = createContext<Model3DContextValue | null>(null);

export function Model3DProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModel3D = useCallback(() => setIsOpen(true), []);
  const closeModel3D = useCallback(() => setIsOpen(false), []);

  return (
    <Model3DContext.Provider value={{ isOpen, openModel3D, closeModel3D }}>
      {children}
    </Model3DContext.Provider>
  );
}

export function useModel3D() {
  const ctx = useContext(Model3DContext);
  if (!ctx) {
    throw new Error("useModel3D must be used within Model3DProvider");
  }
  return ctx;
}
