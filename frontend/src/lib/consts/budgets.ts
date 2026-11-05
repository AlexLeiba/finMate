import { BudgetType } from "../schemas/forms/budgetsSchema";

export const BUDGET_TYPE: Array<{ label: string; value: BudgetType }> = [
  {
    label: "Saving",
    value: BudgetType.SAVINGS,
  },
  {
    label: "Expense",
    value: BudgetType.EXPENSES,
  },
];
