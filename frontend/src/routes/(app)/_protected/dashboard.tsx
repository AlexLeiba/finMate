import DashboardPage from "@/pages/DashboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_protected/dashboard")({
  component: DashboardPage,
  context: () => ({ title: "Dashboard - FineManager" }),
});
