import type { ExpenseType } from "@/lib/types/expense.types";
import { Calendar } from "lucide-react";
import { Category } from "@/components/shared/ExpenseCategory";
import { HandleExpense } from "@/components/shared/HandleExpense";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export function RecentExpenseCard({
  expense,
  currency,
}: {
  expense: ExpenseType;
  currency: string;
}) {
  return (
    <div className="min-w-0 rounded-md border p-4 flex flex-col gap-2">
      <div className="flex min-w-0 justify-between items-center gap-3">
        <Category category={expense.category} />

        <p className="shrink-0 text-xl">{formatCurrency(Number(expense.amount), currency)}</p>
      </div>

      <div className="flex min-w-0 justify-between items-center gap-3">
        <div className="flex gap-2">
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
