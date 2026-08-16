import { CategoriesBreakdown } from "@/components/Dashboard/CategoriesBreakdown/CategoriesBreakdown";
import { SpendingTrends } from "@/components/Dashboard/SpendingTrends/SpendingTrends";
import { TotalStats } from "@/components/Dashboard/Stats/TotalStats";
import { CreateNewExpenseDialog } from "@/components/shared/CreateNewExpense/CreateNewExpenseDialog";
import { NoExpensesView } from "@/components/shared/NoExpensesView";
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
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="line-clamp-1">Welcome back {user?.name}</h3>
          <p>Here's your financial overview</p>
        </div>
        <CreateNewExpenseDialog />
      </div>

      <TotalStats currency={user?.currency || "USD"} />

      <CategoriesBreakdown />

      <SpendingTrends />
    </div>
  );
}

export default DashboardPage;
