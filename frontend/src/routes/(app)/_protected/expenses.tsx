import ExpensesPage from "@/pages/ExpensesPage";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";

export const Route = createFileRoute("/(app)/_protected/expenses")({
  component: ExpensesPage,
  context: () => ({ title: "Expenses - FineManager" }),
  validateSearch: z.object({
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
  }),
});
