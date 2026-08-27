import { StatCard } from "./StatCard";
import { DollarSign, TrendingDown, ChartNoAxesColumn, CalendarArrowDown, Form } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useExpenseStore } from "@/store/useExpensesStore";
import { useShallow } from "zustand/react/shallow";
import { parseStartAndEndOfMonth } from "@/lib/utils/parseStartAndEndOfMonth";
import { useEffect, useState } from "react";
import { DatePicker } from "@/components/Dashboard/SpendingTrends/DatePicker";
import { toast } from "react-toastify";
import { useStatsStore } from "@/store/useStatsStore";
import { Separator } from "@/components/ui/separator";

export function TotalStats({ currency }: { currency: string }) {
  const [datePeriod, setDatePeriod] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(new Date().setDate(1)),
    endDate: new Date(),
  });
  const { dashboardStats, getDashboardStats, isLoading } = useStatsStore();
  const { setFilters, filters } = useExpenseStore(
    useShallow((state) => ({
      setFilters: state.setFilters,
      filters: state.filters,
    }))
  );

  const navigate = useNavigate();

  useEffect(() => {
    try {
      getDashboardStats({
        startDate: datePeriod.startDate.toISOString(),
        endDate: datePeriod.endDate.toISOString(),
      });
    } catch (error: unknown) {
      toast.error(error as string);
    }
  }, []);
  function handleFilterbyMonth(month: "thisMonth" | "prevMonth" | "highest" | "lowest") {
    const now = new Date();

    const thisMonth = month === "thisMonth" ? now : undefined;
    const prevMonth =
      month === "prevMonth" ? new Date(now.setMonth(now.getMonth() - 1)) : undefined;
    let startOfMonth, endOfMonth;
    if (thisMonth) {
      const date = parseStartAndEndOfMonth(thisMonth);
      startOfMonth = date.startOfMonth;
      endOfMonth = date.endOfMonth;
    }
    if (prevMonth) {
      const date = parseStartAndEndOfMonth(prevMonth);
      startOfMonth = date.startOfMonth;
      endOfMonth = date.endOfMonth;
    }

    const minAmount = month === "lowest" ? dashboardStats?.lowestExpense?.amount : undefined;
    const maxAmount = month === "highest" ? dashboardStats?.highestExpense?.amount : undefined;

    setFilters({
      ...filters,
      ...((thisMonth || prevMonth) &&
        startOfMonth &&
        endOfMonth && { startDate: startOfMonth, endDate: endOfMonth }),
      ...(minAmount && { minAmount, maxAmount: minAmount }),
      ...(maxAmount && { maxAmount, minAmount: maxAmount }),
    });
    navigate({
      to: "/expenses",
    });
  }

  async function handleFilterbyDate(date: Date, key: "startDate" | "endDate") {
    const timePeriod = { ...datePeriod, [key]: date };

    if (timePeriod.startDate && timePeriod.endDate) {
      try {
        await getDashboardStats({
          startDate: timePeriod.startDate.toISOString(),
          endDate: timePeriod.endDate.toISOString(),
        });
      } catch (error: unknown) {
        console.log("🚀 ~ handleFilterbyDate ~ error:", error as string);
        toast.error(error as string);
      }
    }

    setDatePeriod(timePeriod);
  }

  return (
    <>
      <section>
        <div className="flex justify-end">
          <div className="flex gap-2">
            <DatePicker
              value={datePeriod.startDate}
              disabled={isLoading}
              onChange={(date) => handleFilterbyDate(date, "startDate")}
              label="From"
            />
            <DatePicker
              value={datePeriod.endDate}
              disabled={isLoading}
              onChange={(date) => handleFilterbyDate(date, "endDate")}
              label="to"
            />
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 w-full">
          <StatCard
            icon={<TrendingDown size={18} />}
            title="Number of Expenses"
            value={`${dashboardStats?.expenseCount || 0}`}
          />
          <StatCard
            icon={<DollarSign size={18} />}
            title="Total Expenses"
            value={`${dashboardStats?.totalExpenses || 0} ${currency}`}
          />
          <StatCard
            icon={<ChartNoAxesColumn size={18} />}
            title="Average Expense"
            value={`${dashboardStats?.averageExpense || 0} ${currency}`}
          />
          <StatCard
            onClick={() => handleFilterbyMonth("lowest")}
            icon={<CalendarArrowDown size={18} />}
            title="Lowest Expense"
            value={`${dashboardStats?.lowestExpense?.amount || 0} ${currency}`}
          />
          <StatCard
            onClick={() => handleFilterbyMonth("highest")}
            icon={<CalendarArrowDown size={18} />}
            title="Highest Expense"
            value={`${dashboardStats?.highestExpense?.amount || 0} ${currency}`}
          />
        </div>

        <Separator className="w-full h-2 my-6" />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-2 w-full">
          <StatCard
            onClick={() => handleFilterbyMonth("thisMonth")}
            icon={<CalendarArrowDown size={18} />}
            title="This Month"
            value={`${dashboardStats?.currentMonthTotal || 0} ${currency}`}
          />
          <StatCard
            onClick={() => handleFilterbyMonth("prevMonth")}
            icon={<CalendarArrowDown size={18} />}
            title="Previous Month"
            value={`${dashboardStats?.prevMonthTotal || 0} ${currency}`}
          />
          <StatCard
            icon={<CalendarArrowDown size={18} />}
            title="Difference between current and prev. month"
            value={`${dashboardStats?.monthlyPercentageExpenseChange || 0} %`}
          />
        </div>
      </section>
    </>
  );
}
