import type { ExpenseType } from "@/lib/types/expense.types";
import { Category } from "./ExpenseCategory";
import { CURRENCY_SYMBOLS } from "@/lib/consts/currency";
import { Calendar } from "lucide-react";
import { HandleExpense } from "./HandleExpense";

export function ExpenseCard({
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

        <p className="text-xl">
          {CURRENCY_SYMBOLS[currency] || currency}
          <span className="ml-0.5">{expense.amount}</span>
        </p>
      </div>
      <p className="text-text-secondary">{expense.description}</p>

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
