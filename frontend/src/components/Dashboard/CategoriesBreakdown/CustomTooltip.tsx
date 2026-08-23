import { CATEGORIES } from "@/lib/consts/categories";
import { CURRENCY_SYMBOLS, DEFAULT_CURRENCY } from "@/lib/consts/currency";
import type { SpendingByCategoryTimePeriodType } from "@/lib/schemas/apis/dashboardSchema";

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    payload: SpendingByCategoryTimePeriodType["data"]["categoriesBreakdownStats"][0] & {
      month?: string;
    };
  }[];
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 rounded-md bg-black">
        {data?.month && <p className="font-bold">{data.month}</p>}
        <p className="font-bold">{CATEGORIES[data.category]}</p>
        <p>
          {CURRENCY_SYMBOLS[DEFAULT_CURRENCY]}
          {data.total}
        </p>
        {data.percentage && <p>{data.percentage}% of total categories</p>}
        <p>{data.count} expenses</p>
      </div>
    );
  }

  return null;
}

export { CustomTooltip };
