import { CreateNewExpenseDialog } from "@/components/shared/CreateNewExpense/CreateNewExpenseDialog";
import { ExpensesData } from "@/components/Expenses/ExpensesData/ExpensesData";
import { Pagination } from "@/components/Expenses/ExpensesData/Pagination";

import { Filters } from "@/components/Expenses/Filters/Filters";
import { SearchExpense } from "@/components/Expenses/Filters/SearchExpense";
import { Sort } from "@/components/Expenses/Filters/Sort";

import { Spacer } from "@/components/ui/spacer";
import { useExpenseStore } from "@/store/useExpensesStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useShallow } from "zustand/react/shallow";
import { DEFAULT_CURRENCY } from "@/lib/consts/currency";
import { useEffect } from "react";
import { toast } from "react-toastify";

function ExpensesPage() {
  const { page, totalCount, expenses, fetchAllExpenses, filters } = useExpenseStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      expenses: state.expenses,
      page: state.page,
      totalCount: state.stats.totalCount,
      filters: state.filters,
      fetchAllExpenses: state.getAllExpenses,
      setFilters: state.setFilters,
    }))
  );
  const currency = useAuthStore((state) => state.user?.currency) || DEFAULT_CURRENCY;

  useEffect(() => {
    toast.loading("Loading...", { toastId: "fetchExpenses" });
    try {
      fetchAllExpenses(filters);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("fetchExpenses");
    }
  }, [filters, page]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full min-w-0 lg:w-auto">
            <h3>Expenses</h3>
            <p>Create and manage your expenses</p>
          </div>
          <div className="flex w-full min-w-0 flex-wrap items-center gap-2 lg:w-auto lg:justify-end">
            <Sort label={false} />
            <div className="min-w-0 flex-[1_1_12rem] lg:w-48 lg:flex-none">
              <SearchExpense />
            </div>
            <CreateNewExpenseDialog compactOnMobile />
          </div>
        </div>

        <Spacer size={2} />
        <Filters />
        <Spacer size={4} />

        <ExpensesData currency={currency} expenses={expenses} />
      </div>
      {totalCount > 10 && <Pagination page={page} totalCount={totalCount} />}
    </div>
  );
}

export default ExpensesPage;
