"use client";

import { ExploreProvider } from "@/context/ExploreContext";
import { Model3DViewer } from "@/components/modals/Model3DViewer";

export function ExploreShell({ children }: { children: React.ReactNode }) {
  return (
    <ExploreProvider>
      {children}
      <Model3DViewer />
    </ExploreProvider>
  );
}
