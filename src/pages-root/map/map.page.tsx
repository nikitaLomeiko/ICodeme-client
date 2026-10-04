"use client";

import { IModule, Module } from "@/entities/study";
import { Layout } from "@/widgets/layout";
import { WorkZone } from "@/widgets/study-view";
import { modules } from "../../../app/mock.data";

export const MapPage = () => {
  return (
    <Layout>
      <WorkZone>
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ui-text-muted)]">
              Карта обучения
            </div>

            <h1 className="mt-2 text-3xl font-black">JavaScript с нуля</h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ui-text-muted)]">
              Последовательность модулей, которые помогут освоить JavaScript от
              первых строк кода до продвинутых возможностей языка.
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((item, index) => (
              <Module index={index} levelsCount={10} {...item} />
            ))}
          </div>
        </div>
      </WorkZone>
    </Layout>
  );
};
