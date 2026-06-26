import { useExpenseStore } from "@/store/useExpensesStore";
import { TotalStats } from "./TotalExpenses";
import { Spacer } from "@/components/ui/spacer";
import { ExpenseCard } from "./ExpenseCard";
import { useAuthStore } from "@/store/useAuthStore";
import { DEFAULT_CURRENCY } from "@/lib/consts/currency";

export function ExpensesData() {
  const expensesData = useExpenseStore((state) => state.expenses);
  const currency =
    useAuthStore((state) => state.user?.currency) || DEFAULT_CURRENCY;

  return (
    <div>
      <TotalStats currency={currency} />
      <Spacer size={4} />
      <h4>Your Expenses</h4>
      <Spacer size={2} />

      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))]
      gap-4"
      >
        {expensesData.map((expense) => (
          <ExpenseCard
            key={expense._id}
            expense={expense}
            currency={currency}
          />
        ))}
      </div>
    </div>
  );
}
