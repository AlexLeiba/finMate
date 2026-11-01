import type { BudgetType } from "@/lib/schemas/apis/budgetsSchema";
import { cn } from "@/lib/utils/tailwindUtils";

type BudgetCardProps = {
  budgetType: BudgetType | undefined;
  budgetTargetAmount: number | undefined;
  title: string;
  date: Date | undefined;
  currency: string;
};
export function BudgetCard({ budgetType, budgetTargetAmount, title, date, currency }: BudgetCardProps) {
  return  <div
                  className={cn(
                    budgetType === "savings"
                      ? "border-background-element-accent"
                      : "border-accent/60",
                    "px-3 py-2 border rounded-md"
                  )}
                >
                  <div className="flex justify-between">
                    <p className={cn("text-sm px-2 py-1 rounded-full bg-black ")}>
                      {budgetType}
                    </p>
                    <p>
                      {currency} {budgetTargetAmount}
                    </p>
                  </div>
                  <p>{title}</p>
                  <p className="text-sm text-gray-400">{date?.toDateString()}</p>
                </div>;
}
