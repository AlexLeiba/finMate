import type { ExpenseType } from "@/lib/types/expense.types";
import { Category } from "../../shared/ExpenseCategory";
import { Calendar } from "lucide-react";
import { HandleExpense } from "../../shared/HandleExpense";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export function ExpenseCard({ expense, currency }: { expense: ExpenseType; currency: string }) {
  return (
    <div className="min-w-0 rounded-md border p-4 flex flex-col gap-2">
      <div className="flex min-w-0 justify-between items-center gap-3">
        <Category category={expense.category} />

        <p className="shrink-0 text-xl">{formatCurrency(Number(expense.amount), currency)}</p>
      </div>
      <p className="break-words text-text-secondary">{expense.description}</p>

      <div className="flex min-w-0 justify-between items-center gap-3">
        <div className="flex min-w-0 gap-2">
          <Calendar className="text-text-secondary" />
          {expense.date && (
            <p className="text-text-secondary">
              {expense.date.toLocaleString("default", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
        <HandleExpense expense={expense} />
      </div>
    </div>
  );
}
