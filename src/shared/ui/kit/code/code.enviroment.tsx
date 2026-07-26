"use client";

import { useEffect } from "react";
import { FileExplorer } from "./components/file.explorer";
import { CodeEditor } from "./components/code.editor";
import { EmptyMessage } from "./components/empty.message";
import { CodeHeader } from "./components/code.header";
import { useExplorer } from "./store/file/use.explorer";

export const CodeEnviroment = () => {
  const { activeFileId, allFiles, setActiveFileId, activeFile } = useExplorer();

  useEffect(() => {
    if (!activeFileId && allFiles.length > 0) {
      setActiveFileId(allFiles[0].id);
    }
  }, [allFiles, activeFileId]);

  return (
    <div className="h-screen flex flex-col bg-[var(--ui-background-tertiary)]">
      <CodeHeader />

      <div className="flex-1 flex overflow-hidden">
        <FileExplorer />

        <main className="flex-1 flex flex-col overflow-hidden relative">
          {activeFile ? <CodeEditor /> : <EmptyMessage />}
        </main>
      </div>
    </div>
  );
};
