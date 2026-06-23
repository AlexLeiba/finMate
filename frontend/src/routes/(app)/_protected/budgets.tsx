import Budgets from "@/pages/Budgets";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_protected/budgets")({
  component: Budgets,
  context: () => ({ title: "Budgets - FineManager" }),
});
