import { RecentExpenseCard } from "@/components/Dashboard/RecentExpenses/RecentExpenseCard";
import { Button } from "@/components/ui/button";
import { DEFAULT_CURRENCY } from "@/lib/consts/currency";
import { useAuthStore } from "@/store/useAuthStore";
import { DEFAULT_FILTERS, useExpenseStore } from "@/store/useExpensesStore";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

export function RecentExpenses() {
  const { fetchAllExpenses, isLoading, expenses } = useExpenseStore(
    useShallow((state) => ({
      expenses: state.expenses,
      isLoading: state.isLoading,
      fetchAllExpenses: state.getAllExpenses,
    }))
  );
  const currency = useAuthStore((state) => state.user?.currency) || DEFAULT_CURRENCY;

  useEffect(() => {
    try {
      fetchAllExpenses(DEFAULT_FILTERS);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("fetchExpenses");
    }
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h4>Recent Expenses</h4>

        <Link to="/expenses">
          <Button variant="outline">View All Expenses</Button>
        </Link>
      </div>

      {!isLoading && expenses?.length === 0 ? (
        <div>No expenses were found</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-4">
          {expenses?.map((expense) => (
            <RecentExpenseCard key={expense._id} expense={expense} currency={currency} />
          ))}
        </div>
      )}
    </div>
  );
}
