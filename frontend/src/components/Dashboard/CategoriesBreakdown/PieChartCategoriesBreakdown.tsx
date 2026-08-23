import { CustomTooltip } from "@/components/Dashboard/CategoriesBreakdown/CustomTooltip";
import { PieChartLegend } from "@/components/Dashboard/CategoriesBreakdown/PieChartLegend";
import { CATEGORIES } from "@/lib/consts/categories";
import { COLORS } from "@/lib/consts/charts";
import { CURRENCY_SYMBOLS, DEFAULT_CURRENCY } from "@/lib/consts/currency";
import type { SpendingByCategoryTimePeriodType } from "@/lib/schemas/apis/dashboardSchema";
import { ExpenseCategory } from "@/lib/types/expense.types";
import { parseStartAndEndOfMonth } from "@/lib/utils/parseStartAndEndOfMonth";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useExpenseStore } from "@/store/useExpensesStore";
import { useNavigate } from "@tanstack/react-router";
import {
  Pie,
  PieChart,
  type PieLabelRenderProps,
  type PieSectorShapeProps,
  Sector,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
  Tooltip,
} from "recharts";
import { useShallow } from "zustand/react/shallow";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const PieSlice = (props: PieSectorShapeProps) => {
  const p = useActiveTooltipDataPoints();
  const isAnyPieActive = useIsTooltipActive();
  const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
  let fillOpacity: number;
  if (isAnyPieActive && !isThisPieActive) {
    fillOpacity = 0.5;
  } else {
    fillOpacity = 1;
  }
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      stroke="none"
      fillOpacity={fillOpacity}
      style={{ transition: "fill-opacity 0.3s ease" }}
    />
  );
};

export default function PieChartWithCustomizedLabel({
  isAnimationActive = true,
  categoriesBreakdown,
}: {
  isAnimationActive?: boolean;
  categoriesBreakdown: SpendingByCategoryTimePeriodType["data"];
}) {
  const navigate = useNavigate();
  const { setFilters, filters } = useExpenseStore(
    useShallow((state) => {
      return {
        setFilters: state.setFilters,
        filters: state.filters,
      };
    })
  );

  const periodStats = useDashboardStore((state) => state.periodStats);

  function handleSliceClick(
    payload: SpendingByCategoryTimePeriodType["data"]["categoriesBreakdownStats"][0]
  ) {
    const { startOfMonth } = parseStartAndEndOfMonth(categoriesBreakdown?.startDate);
    setFilters({
      ...filters,
      category: payload?.category || ExpenseCategory.ALL,
      ...(periodStats && periodStats?.value > 730
        ? null
        : { startDate: startOfMonth, endDate: new Date() }),
    });

    navigate({
      to: "/expenses",
    });
  }
  return (
    <PieChart
      style={{ width: "100%", maxWidth: "300px", maxHeight: "80vh", aspectRatio: 1 }}
      responsive
    >
      <Pie
        cx="50%"
        cy="50%"
        data={categoriesBreakdown?.categoriesBreakdownStats}
        labelLine={false}
        label={renderCustomizedLabel}
        dataKey="total"
        nameKey="category"
        isAnimationActive={isAnimationActive}
        shape={PieSlice}
        outerRadius={100}
        onClick={(e) => {
          handleSliceClick(e?.payload);
        }}
        className="cursor-pointer"
      />
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  );
}

export function PieChartCategoriesBreakdown({
  categoriesBreakdown,
  currency,
}: {
  categoriesBreakdown: SpendingByCategoryTimePeriodType["data"];
  currency: string;
}) {
  return (
    <div>
      <PieChartWithCustomizedLabel categoriesBreakdown={categoriesBreakdown} />
      <PieChartLegend
        categoriesBreakdownStats={categoriesBreakdown?.categoriesBreakdownStats}
        currency={currency}
      />
    </div>
  );
}
