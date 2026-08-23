import { SpendingByCategoryBreakdown } from "@/components/Dashboard/CategoriesBreakdown/SpendingByCategoryBreakdown";
import { RecentExpenses } from "@/components/Dashboard/RecentExpenses/RecentExpenses";
import { SpendingTrends } from "@/components/Dashboard/SpendingTrends/SpendingTrends";
import { TotalStats } from "@/components/Dashboard/Stats/TotalStats";
import { CreateNewExpenseDialog } from "@/components/shared/CreateNewExpense/CreateNewExpenseDialog";
import { NoExpensesView } from "@/components/shared/NoExpensesView";
import { DEFAULT_CURRENCY } from "@/lib/consts/currency";
import { useAuthStore } from "@/store/useAuthStore";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useShallow } from "zustand/react/shallow";

function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const { isLoading, dashboardStats } = useDashboardStore(
    useShallow((state) => ({
      dashboardStats: state.dashboardStats,
      isLoading: state.isLoading,
    }))
  );

  if (!isLoading && dashboardStats?.expenseCount === 0) {
    return <NoExpensesView />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="line-clamp-1">Welcome back {user?.name}</h3>
          <p>Here's your financial overview</p>
        </div>
        {/* NEW EXPENSE */}
        <CreateNewExpenseDialog />
      </div>

      {/* STATS */}
      <TotalStats currency={user?.currency || DEFAULT_CURRENCY} />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-2 w-full">
        {/* SPENDING BY CATEGORY */}
        <SpendingByCategoryBreakdown />

        {/* SPENDING TRENDS */}
        <SpendingTrends />
      </div>

      {/* RECENT EXPENSES */}
      <RecentExpenses />
    </div>
  );
}

export default DashboardPage;
