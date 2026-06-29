"use client";

import { ExploreProvider } from "@/context/ExploreContext";
import { Model3DProvider } from "@/context/Model3DContext";
import { ProjectExploreModal } from "@/components/modals/ProjectExploreModal";
import { Model3DViewer } from "@/components/modals/Model3DViewer";

export function ExploreShell({ children }: { children: React.ReactNode }) {
  return (
    <ExploreProvider>
      <Model3DProvider>
        {children}
        <ProjectExploreModal />
        <Model3DViewer />
      </Model3DProvider>
    </ExploreProvider>
  );
}
