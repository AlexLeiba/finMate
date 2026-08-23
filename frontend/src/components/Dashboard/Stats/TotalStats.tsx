import { useFetchDashboardStats } from "@/lib/hooks/useFetchDashboardStats";
import { StatCard } from "./StatCard";
import { DollarSign, TrendingDown, ChartNoAxesColumn, CalendarArrowDown } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useExpenseStore } from "@/store/useExpensesStore";
import { useShallow } from "zustand/react/shallow";
import { parseStartAndEndOfMonth } from "@/lib/utils/parseStartAndEndOfMonth";

export function TotalStats({ currency }: { currency: string }) {
  const { dashboardStats } = useFetchDashboardStats();
  const { setFilters, filters } = useExpenseStore(
    useShallow((state) => ({
      setFilters: state.setFilters,
      filters: state.filters,
    }))
  );

  const navigate = useNavigate();
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

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-2 w-full">
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
        icon={<CalendarArrowDown size={18} />}
        title="Difference with previous month"
        value={`${dashboardStats?.monthlyPercentageExpenseChange || 0} %`}
      />
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
    </section>
  );
}
