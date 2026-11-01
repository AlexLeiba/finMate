import { Spacer } from "@/components/ui/spacer";
import type { BudgetSchemaTypeList } from "@/lib/schemas/apis/budgetsSchema";

import { cn } from "@/lib/utils/tailwindUtils";
import { Link } from "@tanstack/react-router";

export function BudgetsList({
  currency,
  budgets,
}: {
  currency: string;
  budgets: BudgetSchemaTypeList["data"];
}) {
  return (
    <div>
      <Spacer size={4} />
      <h4>Your Budgets</h4>
      <Spacer size={2} />

      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))]
      gap-4"
      >
        {budgets?.length > 0 ? (
          budgets.map((expense, index) => {
            const card = (
              <div
                className={cn(
                  expense.budgetType === "savings"
                    ? "border-background-element-accent"
                    : "border-accent/60",
                  "px-3 py-2 border rounded-md"
                )}
              >
                <div className="flex justify-between">
                  <p className={cn("text-sm px-2 py-1 rounded-full bg-black ")}>
                    {expense.budgetType}
                  </p>
                  <p>
                    {currency} {expense.budgetTargetAmount}
                  </p>
                </div>
                <p>{expense.title}</p>
                <p className="text-sm text-gray-400">{expense.date?.toDateString()}</p>
              </div>
            );

            return expense._id ? (
              <Link
                key={expense._id}
                to="/budgets/$budgetId"
                params={{ budgetId: expense._id }}
                className="hover:opacity-70"
              >
                {card}
              </Link>
            ) : (
              <div key={`budget-${index}`}>{card}</div>
            );
          })
        ) : (
          <p>No budgets found</p>
        )}
      </div>
    </div>
  );
}
