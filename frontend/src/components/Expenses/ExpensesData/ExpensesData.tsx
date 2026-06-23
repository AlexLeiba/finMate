import { useExpenseStore } from "@/store/useExpensesStore";
import { TotalExpenses } from "./TotalExpenses";
import { Spacer } from "@/components/ui/spacer";
import { ExpenseCard } from "./ExpenseCard";

export function ExpensesData() {
  const expensesData = useExpenseStore((state) => state.expenses);
  console.log("🚀 ~ ExpensesPage ~ expensesData:", expensesData);
  return (
    <div>
      <TotalExpenses total={expensesData.length} />
      <Spacer size={4} />
      <h4>Your Expenses</h4>
      <Spacer size={2} />

      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]
      gap-4"
      >
        {expensesData.map((expense) => (
          <ExpenseCard key={expense._id} expense={expense} />
        ))}
      </div>
    </div>
  );
}
