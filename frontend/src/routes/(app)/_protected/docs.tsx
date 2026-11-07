import DocsPage from "@/pages/DocsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_protected/docs")({
  component: DocsPage,
  context: () => ({ title: "Docs - FineManager" }),
});
