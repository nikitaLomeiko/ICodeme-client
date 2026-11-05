"use client";

import { useRef } from "react";
import { ITerminalHandle, Terminal } from "@/shared/ui/kit";

export function TerminalPage() {
  const terminalRef = useRef<ITerminalHandle>(null);

  return (
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
  );
}
