import { LineChartCategoriesBreakdown } from "@/components/Dashboard/CategoriesBreakdown/LineChartCategoriesBreakdown";
import { SpendingTrendsPeriodByCategoryDropDown } from "@/components/Dashboard/SpendingTrends/SpendingPeriodByCategoryDropDown";
import { TIME_PERIOD_IN_MONTHS_DEFAULT } from "@/lib/consts/dashboard";
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

  useEffect(() => {
    try {
      getSpendingTrends({ timePeriodInMonths: TIME_PERIOD_IN_MONTHS_DEFAULT });
    } catch (error) {
      toast.error(error as string);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-4 py-2 border-border border rounded-md">
      <div className="flex justify-between items-center">
        <h4>Spending Trend</h4>
        <SpendingTrendsPeriodByCategoryDropDown />
      </div>

      {!isLoading && spendingTrends?.length === 0 ? (
        <div>No expenses were found </div>
      ) : (
        <LineChartCategoriesBreakdown spendingTrends={spendingTrends} />
      )}
    </div>
  );
}
