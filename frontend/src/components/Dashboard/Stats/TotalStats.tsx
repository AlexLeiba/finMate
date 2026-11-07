import { StatCard } from "./StatCard";
import {
  ArrowLeftRight,
  CalendarClock,
  CalendarDays,
  ChartNoAxesColumn,
  CircleDollarSign,
  ReceiptText,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useExpenseStore } from "@/store/useExpensesStore";
import { useShallow } from "zustand/react/shallow";
import { parseStartAndEndOfMonth } from "@/lib/utils/parseStartAndEndOfMonth";
import { useEffect, useState } from "react";
import { DatePicker } from "@/components/Dashboard/SpendingTrends/DatePicker";
import { toast } from "react-toastify";
import { useStatsStore } from "@/store/useStatsStore";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils/formatCurrency";

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
    async function fetchStats() {
      try {
        await getDashboardStats({
          startDate: datePeriod.startDate.toISOString(),
          endDate: datePeriod.endDate.toISOString(),
        });
      } catch (error: unknown) {
        toast.error(error as string);
      }
    }
    fetchStats();
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
        <div className="p-2 border rounded-md flex flex-col gap-2">
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
              icon={<ReceiptText size={18} />}
              iconClassName="bg-sky-500/15 text-sky-700 dark:text-sky-300"
              title="Number of Expenses"
              value={`${dashboardStats?.expenseCount || 0}`}
            />
            <StatCard
              icon={<CircleDollarSign size={18} />}
              iconClassName="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
              title="Total Expenses"
              value={formatCurrency(dashboardStats?.totalExpenses || 0, currency)}
            />
            <StatCard
              icon={<ChartNoAxesColumn size={18} />}
              iconClassName="bg-cyan-500/15 text-cyan-700 dark:text-cyan-300"
              title="Average Expense"
              value={formatCurrency(dashboardStats?.averageExpense || 0, currency)}
            />
            <StatCard
              onClick={() => handleFilterbyMonth("lowest")}
              icon={<TrendingDown size={18} />}
              iconClassName="bg-green-500/15 text-green-700 dark:text-green-300"
              title="Lowest Expense"
              value={formatCurrency(Number(dashboardStats?.lowestExpense?.amount || 0), currency)}
            />
            <StatCard
              onClick={() => handleFilterbyMonth("highest")}
              icon={<TrendingUp size={18} />}
              iconClassName="bg-rose-500/15 text-rose-700 dark:text-rose-300"
              title="Highest Expense"
              value={formatCurrency(Number(dashboardStats?.highestExpense?.amount || 0), currency)}
            />
          </div>
        </div>
        <Separator className="w-full h-2 my-6" />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-2 w-full">
          <StatCard
            onClick={() => handleFilterbyMonth("thisMonth")}
            icon={<CalendarDays size={18} />}
            iconClassName="bg-blue-500/15 text-blue-700 dark:text-blue-300"
            title="This Month"
            value={formatCurrency(dashboardStats?.currentMonthTotal || 0, currency)}
          />
          <StatCard
            onClick={() => handleFilterbyMonth("prevMonth")}
            icon={<CalendarClock size={18} />}
            iconClassName="bg-violet-500/15 text-violet-700 dark:text-violet-300"
            title="Previous Month"
            value={formatCurrency(dashboardStats?.prevMonthTotal || 0, currency)}
          />
          <StatCard
            icon={<ArrowLeftRight size={18} />}
            iconClassName="bg-amber-500/15 text-amber-700 dark:text-amber-300"
            title="Difference between current and prev. month"
            value={`${dashboardStats?.monthlyPercentageExpenseChange || 0} %`}
          />
        </div>
      </section>
    </>
  );
}
