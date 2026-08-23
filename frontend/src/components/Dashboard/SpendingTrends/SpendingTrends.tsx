import { LineChartCategoriesBreakdown } from "@/components/Dashboard/CategoriesBreakdown/LineChartCategoriesBreakdown";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

export function SpendingTrends() {
  const { isLoading, getSpendingTrends, spendingTrends } = useDashboardStore(
    useShallow((state) => {
      return {
        isLoading: state.isLoading,
        getSpendingTrends: state.getSpendingTrends,
        spendingTrends: state.spendingTrends,
      };
    })
  );
  console.log("🚀 ~ SpendingTrends ~ spendingTrends:", spendingTrends);

  useEffect(() => {
    try {
      getSpendingTrends();
    } catch (error) {
      console.log("🚀 ~ CategoriesBreakdown ~ error:", error);
      toast.error(error as string);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-4 py-2 border-border border rounded-md">
      <h4>Spending Trend</h4>

      {!isLoading && spendingTrends?.length === 0 ? (
        <div>No expenses were found </div>
      ) : (
        <LineChartCategoriesBreakdown spendingTrends={spendingTrends} />
      )}
    </div>
  );
}
