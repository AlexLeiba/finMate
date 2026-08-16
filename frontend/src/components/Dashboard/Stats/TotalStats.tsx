import { useFetchDashboardStats } from "@/lib/hooks/useFetchDashboardStats";
import { StatCard } from "./StatCard";
import { DollarSign, TrendingDown, ChartNoAxesColumn, CalendarArrowDown } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useExpenseStore } from "@/store/useExpensesStore";
import { useShallow } from "zustand/react/shallow";

export function TotalStats({ currency }: { currency: string }) {
  const { dashboardStats } = useFetchDashboardStats();
  const { setFilters, filters } = useExpenseStore(
    useShallow((state) => ({
      setFilters: state.setFilters,
      filters: state.filters,
    }))
  );

  const navigate = useNavigate();
  function handleFilterbyMonth(month: "thisMonth" | "prevMonth") {
    const now = new Date();

    const selectedMonth = month === "thisMonth" ? now : new Date(now.setMonth(now.getMonth() - 1));
    const year = selectedMonth.getFullYear();
    const monthNumber = selectedMonth.getMonth();
    const startOfMonth = new Date(year, monthNumber, 1);
    const endOfMonth = new Date(year, monthNumber + 1, 0);

    setFilters({ ...filters, startDate: startOfMonth, endDate: endOfMonth });
    navigate({
      to: "/expenses",
    });
  }

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 w-full">
      <StatCard
        icon={<DollarSign size={18} />}
        title="Total Expenses"
        value={`${dashboardStats?.totalExpenses || 0} ${currency}`}
      />
      <StatCard
        icon={<TrendingDown size={18} />}
        title="Number of Expenses"
        value={`${dashboardStats?.expenseCount || 0}`}
      />
      <StatCard
        icon={<ChartNoAxesColumn size={18} />}
        title="Average Expense"
        value={`${dashboardStats?.averageExpense || 0} ${currency}`}
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
    </section>
  );
}
