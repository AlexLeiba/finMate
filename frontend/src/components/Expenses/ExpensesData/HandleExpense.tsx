import type { ExpenseType } from "@/lib/types/expense.types";

import { DeleteExpense } from "./DeleteExpense/DeleteExpense";
import { EditExpense } from "./EditExpense/EditExpense";

export function HandleExpense({ expense }: { expense: ExpenseType }) {
  return (
    <>
      <div className="flex items-center gap-2">
        {/* EDIT */}
        <EditExpense expense={expense} />

        {/* DELETE */}
        <DeleteExpense
          expenseId={expense._id}
          expenseCategory={expense.category}
        />
      </div>
    </>
  );
}
