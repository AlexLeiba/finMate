import { CreateNewExpenseDialog } from "@/components/Expenses/CreateNewExpense/CreateNewExpenseDialog";
import { ExpensesData } from "@/components/Expenses/ExpensesData/ExpensesData";

import { Filters } from "@/components/Expenses/Filters/Filters";
import { SearchExpense } from "@/components/Expenses/Filters/SearchExpense";

import { Spacer } from "@/components/ui/spacer";
import { useExpenseStore } from "@/store/useExpensesStore";
import { useEffect } from "react";
import { toast } from "react-toastify";

function ExpensesPage() {
  const fetchAllExpenses = useExpenseStore((state) => state.getAllExpenses);

  useEffect(() => {
    toast.loading("Loading...", { toastId: "fetchExpenses" });
    try {
      fetchAllExpenses({});
    } catch (error: unknown) {
      toast.error(error as string);
      console.log(error);
    } finally {
      toast.dismiss("fetchExpenses");
    }
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h3>Expenses</h3>
          <p>Create and manage your expenses</p>
        </div>
        <div className="flex gap-2 items-center">
          <SearchExpense />
          <CreateNewExpenseDialog />
        </div>
      </div>

      <Spacer size={2} />
      <Filters />
      <Spacer size={4} />

      <ExpensesData />
    </div>
  );
}

export default ExpensesPage;
