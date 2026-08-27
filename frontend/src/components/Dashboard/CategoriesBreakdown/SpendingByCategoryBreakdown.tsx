import { PieChartCategoriesBreakdown } from "@/components/Dashboard/CategoriesBreakdown/PieChartCategoriesBreakdown";
import { TIME_PERIOD_IN_DAYS_DEFAULT } from "@/lib/consts/dashboard";
import { DEFAULT_CURRENCY } from "@/lib/consts/currency";
import { useAuthStore } from "@/store/useAuthStore";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
import { SpendingPeriodByCategoryDropDown } from "@/components/Dashboard/CategoriesBreakdown/SpendingPeriodByCategoryDropDown";

export function SpendingByCategoryBreakdown() {
  const { isLoading, getSpendingByCategoryTimePeriod, spendingByCategoryTimePeriod } =
    useDashboardStore(
      useShallow((state) => {
        return {
          isLoading: state.isLoading,
          getSpendingByCategoryTimePeriod: state.getSpendingByCategoryTimePeriod,
          spendingByCategoryTimePeriod: state.spendingByCategoryTimePeriod,
        };
      })
    );
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    try {
      getSpendingByCategoryTimePeriod({ timePeriodInDays: TIME_PERIOD_IN_DAYS_DEFAULT });
    } catch (error) {
      console.log("🚀 ~ CategoriesBreakdown ~ error:", error);
      toast.error(error as string);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-4 py-2 border-border border rounded-md flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h4>Spending by category</h4>
        <SpendingPeriodByCategoryDropDown />
      </div>

      {!isLoading && spendingByCategoryTimePeriod?.categoriesBreakdownStats?.length === 0 ? (
        <div>No expenses were found for this period</div>
      ) : (
        spendingByCategoryTimePeriod && (
          <PieChartCategoriesBreakdown
            categoriesBreakdown={spendingByCategoryTimePeriod}
            currency={user?.currency || DEFAULT_CURRENCY}
          />
        )
      )}
    </div>
  );
}
