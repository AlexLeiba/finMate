import ExpensesPage from "@/pages/ExpensesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_protected/expenses")({
  component: ExpensesPage,
  context: () => ({ title: "Expenses - FineManager" }),
});
