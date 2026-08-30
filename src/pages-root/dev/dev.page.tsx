"use client";
import { IDE } from "@/entities/ide";
import { Layout } from "@/widgets/layout";

export const DevPage = () => {
  return (
    <Layout>
      <IDE
        userId="4"
        meta={{
          language: "",
          name: "test",
          subtitle: "title",
          title: "title",
        }}
      />
    </Layout>
  );
};
