import { TotalStats } from "./TotalExpenses";
import { Spacer } from "@/components/ui/spacer";
import { ExpenseCard } from "./ExpenseCard";
import type { ExpenseType } from "@/lib/types/expense.types";

export function ExpensesData({
  currency,
  expenses,
}: {
  currency: string;
  expenses: ExpenseType[];
}) {
  return (
    <div>
      <TotalStats currency={currency} />
      <Spacer size={4} />
      <h4>Your Expenses</h4>
      <Spacer size={2} />

      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
        {expenses?.length > 0 ? (
          expenses.map((expense) => (
            <ExpenseCard key={expense._id} expense={expense} currency={currency} />
          ))
        ) : (
          <p>No expenses found</p>
        )}
      </div>
    </div>
  );
}
