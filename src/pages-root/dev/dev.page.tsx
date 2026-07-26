"use client";
import { CodeEnviroment, FileProvider } from "@/shared/ui/kit/code";
import { EnviromentProvider } from "@/shared/ui/kit/code/store/enviroment";

export const DevPage = () => {
  return (
    <FileProvider>
      <EnviromentProvider>
        <CodeEnviroment />
      </EnviromentProvider>
    </FileProvider>
  );
};
