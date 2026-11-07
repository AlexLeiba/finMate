import { PieChartCategoriesBreakdown } from "@/components/Dashboard/CategoriesBreakdown/PieChartCategoriesBreakdown";
import { TIME_PERIOD_IN_DAYS_DEFAULT } from "@/lib/consts/dashboard";
import { DEFAULT_CURRENCY } from "@/lib/consts/currency";
import { useAuthStore } from "@/store/useAuthStore";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
import { SpendingPeriodByCategoryDropDown } from "@/components/Dashboard/CategoriesBreakdown/SpendingPeriodByCategoryDropDown";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

export function SpendingByCategoryBreakdown({
  isFullWidth,
  onToggleFullWidth,
}: {
  isFullWidth: boolean;
  onToggleFullWidth: () => void;
}) {
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
    <div className="min-w-0 w-full px-4 py-2 border-border border rounded-md flex flex-col gap-2">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h4>Spending by category</h4>
        <div className="flex items-center gap-2">
          <SpendingPeriodByCategoryDropDown />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            classNameChildren="flex items-center justify-center"
            aria-label={
              isFullWidth ? "Use standard spending category view" : "Expand spending by category"
            }
            aria-pressed={isFullWidth}
            title={isFullWidth ? "Shrink" : "Full screen"}
            onClick={onToggleFullWidth}
          >
            {isFullWidth ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
          </Button>
        </div>
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
