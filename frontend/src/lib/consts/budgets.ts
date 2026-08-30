import type { BudgetType } from "@/store/useBudgetsStore";

export const BUDGET_TYPE: Array<{ label: string; value: BudgetType }> = [
  {
    label: "Saving",
    value: "savings",
  },
  {
    label: "Expense",
    value: "expenses",
  },
];
