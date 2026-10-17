"use client";

import { useRef } from "react";
import { ITerminalHandle, Terminal } from "@/shared/ui/kit";
import { Layout } from "@/widgets/layout";

export default function TerminalRoute() {
  const terminalRef = useRef<ITerminalHandle>(null);

  return (
    <Layout>
      <Terminal
        ref={terminalRef}
        user="student"
        host="icodeme"
        onInput={(input) => {
          console.info("[onInput]", input);
        }}
        onCommand={async (command, context) => {
          console.info("[onCommand]", command, context);
          await new Promise((resolve) => setTimeout(resolve, 400));
          return [
            `server@${context.host}: принял «${command}»`,
            `ответ: ${new Date().toLocaleTimeString()}`,
          ];
        }}
      />
    </Layout>
  );
}
