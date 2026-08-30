import { BudgetsList } from "@/components/Budgets/BudgetsList";
import { BudgetTypeTabs } from "@/components/Budgets/BudgetTypeTabs";
import { CreateNewBudgetDialog } from "@/components/Budgets/CreateNewBudgetDialog";
import { DEFAULT_CURRENCY } from "@/lib/consts/currency";
import { useAuthStore } from "@/store/useAuthStore";
import { useBudgetsStore } from "@/store/useBudgetsStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

function Budgets() {
  const { getAllBudgets, budgets, budgetType } = useBudgetsStore(
    useShallow((state) => ({
      budgets: state.budgets,
      getAllBudgets: state.getAllBudgets,
      budgetType: state.budgetType,
    }))
  );

  const currency = useAuthStore((state) => state.user?.currency) || DEFAULT_CURRENCY;

  useEffect(() => {
    toast.loading("Loading...", { toastId: "fetchExpenses" });
    try {
      getAllBudgets();
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("fetchExpenses");
    }
  }, [budgetType]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="line-clamp-1">Budgets Plan</h3>
          <p>Plan your savings or expenses based on a budget</p>
        </div>

        <BudgetTypeTabs />

        {/* NEW BUDGET */}
      </div>
      <div className="flex justify-end">
        <CreateNewBudgetDialog />
      </div>

      <BudgetsList currency={currency} budgets={budgets} />
    </div>
  );
}

export default Budgets;
