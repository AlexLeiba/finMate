import { Spacer } from "@/components/ui/spacer";
import type { BudgetSchemaTypeList } from "@/lib/schemas/apis/budgetsSchema";


import { Link } from "@tanstack/react-router";
import { BudgetCard } from "./BudgetCard";

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
          budgets.map((expense) => {
         

            return expense._id ? (
              <Link
                key={expense._id}
                to="/budgets/$budgetId"
                params={{ budgetId: expense._id }}
                className="hover:opacity-70"
              >
               <BudgetCard 
                 budgetType={expense.budgetType}
                 budgetTargetAmount={expense.budgetTargetAmount}
                 title={expense.title}
                 date={expense.date}
                 currency={currency}
               />
              </Link>
            ) : (
               <BudgetCard 
                 budgetType={expense.budgetType}
                 budgetTargetAmount={expense.budgetTargetAmount}
                 title={expense.title}
                 date={expense.date}
                 currency={currency}
               />
            );
          })
        ) : (
          <p>No budgets found</p>
        )}
      </div>
    </div>
  );
}
