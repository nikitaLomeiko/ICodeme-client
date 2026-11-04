import { DocumentationPage } from "@/pages-root/documentation";

interface IProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DocumentationRoute({ searchParams }: IProps) {
  const params = await searchParams;
  const getParam = (name: string) => {
    const value = params[name];
    return typeof value === "string" ? value : undefined;
  };

  return (
    <DocumentationPage
      studyId={getParam("studyId")}
      moduleIndex={getParam("moduleIndex")}
      levelIndex={getParam("levelIndex")}
      stepIndex={getParam("stepIndex")}
    />
  );
}
