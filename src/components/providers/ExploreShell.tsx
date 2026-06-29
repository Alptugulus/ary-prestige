"use client";

import { ExploreProvider } from "@/context/ExploreContext";
import { ProjectExploreModal } from "@/components/modals/ProjectExploreModal";

export function ExploreShell({ children }: { children: React.ReactNode }) {
  return (
    <ExploreProvider>
      {children}
      <ProjectExploreModal />
    </ExploreProvider>
  );
}
