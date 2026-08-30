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
    <div className="flex gap-8 items-center ">
      <div className="flex flex-col gap-1">
        <p>Select your budget type</p>
        <div id="sort" className="border rounded-md flex">
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
