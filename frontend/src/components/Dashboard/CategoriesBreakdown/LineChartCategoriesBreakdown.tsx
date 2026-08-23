import { CustomTooltip } from "@/components/Dashboard/CategoriesBreakdown/CustomTooltip";
import type { MonthlyTotalsType, SendingTrendsType } from "@/lib/schemas/apis/dashboardSchema";
import { parseDateStringToDate } from "@/lib/utils/parseDateStringToMonth";
import { parseStartAndEndOfMonth } from "@/lib/utils/parseStartAndEndOfMonth";
import { useExpenseStore } from "@/store/useExpensesStore";
import { useNavigate } from "@tanstack/react-router";

import {
  CartesianGrid,
  createHorizontalChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useShallow } from "zustand/react/shallow";

const Typed = createHorizontalChart<any, string, number>()({ XAxis, YAxis, Tooltip, Line });

function LineChart({ data }: { data: SendingTrendsType["data"] }) {
  const navigate = useNavigate();

  const { setFilters, filters } = useExpenseStore(
    useShallow((state) => {
      return {
        setFilters: state.setFilters,
        filters: state.filters,
      };
    })
  );

  function handleLinechartClick(payload: MonthlyTotalsType["data"][0]) {
    const date = parseDateStringToDate(payload.month);
    const { startOfMonth, endOfMonth } = parseStartAndEndOfMonth(date);
    setFilters({
      ...filters,
      ...(!startOfMonth ? null : { startDate: startOfMonth, endDate: endOfMonth }),
    });

    navigate({
      to: "/expenses",
    });
  }
  return (
    <Typed.LineChart
      onClick={(e) => {
        console.log("🚀 ~ LineChart ~ e:\n\n\n", e);
      }}
      style={{ width: "100%", maxWidth: "700px", maxHeight: "70vh", aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 15,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <Typed.XAxis
        dataKey={(d) => {
          const date = parseDateStringToDate(d.month);

          return date.toLocaleString("default", {
            month: "short",
            year: "2-digit",
          });
        }}
      />
      <Typed.YAxis yAxisId="left" width="auto" />
      <Typed.YAxis yAxisId="right" orientation="right" width="auto" />
      <Tooltip content={<CustomTooltip />} />

      <Legend />

      <Typed.Line
        dot={({ cx, cy, payload }) => {
          return (
            <circle
              className="cursor-pointer"
              cx={cx}
              cy={cy}
              r={4}
              fill={payload.color}
              stroke={payload.color}
              strokeWidth={2}
              onClick={() => {
                handleLinechartClick(payload);
              }}
            />
          );
        }}
        activeDot={({ cx, cy, payload }) => {
          return (
            <circle
              className="cursor-pointer"
              cx={cx}
              cy={cy}
              r={12}
              fill={payload.color}
              stroke={payload.color}
              strokeWidth={2}
              onClick={() => {
                handleLinechartClick(payload);
              }}
            />
          );
        }}
        yAxisId="left"
        type="monotone"
        dataKey="total"
        // activeDot={{ r: 8 }}
        stroke="#FF0000"
      />
      <Typed.Line yAxisId="right" type="monotone" dataKey="count" stroke="#00FF00" />
    </Typed.LineChart>
  );
}

export function LineChartCategoriesBreakdown({
  spendingTrends,
}: {
  spendingTrends: SendingTrendsType["data"];
}) {
  return <LineChart data={spendingTrends} />;
}
