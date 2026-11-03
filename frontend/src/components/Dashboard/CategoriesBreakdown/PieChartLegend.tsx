import { CATEGORIES } from "@/lib/consts/categories";
import { COLORS } from "@/lib/consts/charts";
import type { SpendingByCategoryTimePeriodType } from "@/lib/schemas/apis/dashboardSchema";
import { cn } from "@/lib/utils/tailwindUtils";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export function PieChartLegend({
  categoriesBreakdownStats,
  currency,
}: {
  categoriesBreakdownStats: SpendingByCategoryTimePeriodType["data"]["categoriesBreakdownStats"];
  currency: string;
}) {
  return (
    <div>
      {categoriesBreakdownStats?.map((category, index) => {
        return (
          <div key={index} className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                className={cn("w-4 h-4 rounded-full")}
              />
              <p>{CATEGORIES[category.category as keyof typeof CATEGORIES]}</p>
            </div>

            <div className="flex gap-2 items-center">
              <p className="font-bold">{formatCurrency(category.total, currency)}</p>
              <p>({category.percentage}%)</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
