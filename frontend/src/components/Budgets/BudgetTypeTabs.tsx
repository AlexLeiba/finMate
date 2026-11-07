import { Button } from "@/components/ui/button";
import { BUDGET_TYPE } from "@/lib/consts/budgets";
import { cn } from "@/lib/utils/tailwindUtils";
import { useBudgetsStore } from "@/store/useBudgetsStore";
import { useShallow } from "zustand/react/shallow";

export function BudgetTypeTabs() {
  const { budgetType, setBudgetType } = useBudgetsStore(
    useShallow((state) => ({
      budgetType: state.budgetType,
      setBudgetType: state.setBudgetType,
    }))
  );

  return (
    <div className="flex w-full min-w-0 flex-wrap items-center gap-2 lg:w-auto">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <p>Select your budget type</p>
        <div id="sort" className="flex max-w-full rounded-md border">
          {BUDGET_TYPE.map((sort) => (
            <Button
              key={sort.value}
              onClick={() => setBudgetType(sort.value)}
              variant="ghost"
              className={cn(sort.value === budgetType && "bg-primary ")}
            >
              {sort.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
