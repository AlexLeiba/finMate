import { Spacer } from "@/components/ui/spacer";

import { useNavigate } from "@tanstack/react-router";
import { BudgetCard } from "./BudgetCard";
import { useBudgetsStore } from "@/store/useBudgetsStore";
import { useShallow } from "zustand/react/shallow";
import { toast } from "react-toastify";

export function BudgetsList({ currency }: { currency: string }) {
  const navigate = useNavigate();
  const { getAllBudgets, budgets, budgetType, deleteBudget, isLoading } = useBudgetsStore(
    useShallow((state) => ({
      budgets: state.budgets,
      getAllBudgets: state.getAllBudgets,
      deleteBudget: state.deleteBudget,
      budgetType: state.budgetType,
      isLoading: state.isLoading,
      error: state.error,
    }))
  );

  async function handleDelete(id: string) {
    await deleteBudget(id);
    void getAllBudgets().catch((error: unknown) => toast.error(error as string));
  }

  return (
    <div>
      {budgets?.length > 0 ? (
        <>
          <Spacer size={4} />
          <h4>Your {budgetType}</h4>
          <Spacer size={2} />
          <div
            className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))]
      gap-4"
          >
            {budgets.map((expense) => {
              const budgetId = expense._id;
              return budgetId ? (
                <BudgetCard
                  key={budgetId}
                  onNavigate={() =>
                    navigate({
                      to: "/budgets/$budgetId",
                      params: { budgetId },
                    })
                  }
                  onDelete={() => handleDelete(budgetId)}
                  isLoading={isLoading}
                  budgetType={expense.budgetType}
                  budgetTargetAmount={expense.budgetTargetAmount}
                  title={expense.title}
                  date={expense.date}
                  currency={currency}
                />
              ) : (
                <BudgetCard
                  budgetType={expense.budgetType}
                  budgetTargetAmount={expense.budgetTargetAmount}
                  title={expense.title}
                  date={expense.date}
                  currency={currency}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p>No {budgetType || "budgets"} found</p>
      )}
    </div>
  );
}
