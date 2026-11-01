import type { BudgetType } from "../schemas/forms/budgetsSchema";


export const BUDGET_TYPE: Array<{ label: string; value: BudgetType[number] }> = [
  {
    label: "Saving",
    value: "savings",
  },
  {
    label: "Expense",
    value: "expenses",
  },
];
