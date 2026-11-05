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
    <div className="border p-4 rounded-md flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Category category={expense.category} />

        <p className="text-xl">{formatCurrency(Number(expense.amount), currency)}</p>
      </div>

      <div className="flex justify-between items-center">
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
