import AnalyticsPage from "@/pages/AnalyticsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_protected/analytics")({
  component: AnalyticsPage,
  context: () => ({ title: "Analytics - FineManager" }),
});
