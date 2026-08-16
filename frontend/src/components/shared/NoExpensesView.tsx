import { CreateNewExpenseDialog } from "@/components/shared/CreateNewExpense/CreateNewExpenseDialog";

export function NoExpensesView() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-bold">No expenses yet</h1>
      <p className="text-sm">
        You don't have any expenses yet. Create one now and start tracking your finances!
      </p>
      <div className="flex gap-2 items-center">
        <CreateNewExpenseDialog />
      </div>
    </div>
  );
}
