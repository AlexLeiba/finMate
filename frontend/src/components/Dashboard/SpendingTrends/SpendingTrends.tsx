import { LineChartCategoriesBreakdown } from "@/components/Dashboard/CategoriesBreakdown/LineChartCategoriesBreakdown";
import { SpendingTrendsPeriodByCategoryDropDown } from "@/components/Dashboard/SpendingTrends/SpendingPeriodByCategoryDropDown";
import { TIME_PERIOD_IN_MONTHS_DEFAULT } from "@/lib/consts/dashboard";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

export function SpendingTrends({
  isFullWidth,
  onToggleFullWidth,
  onExpand,
}: {
  isFullWidth: boolean;
  onToggleFullWidth: () => void;
  onExpand: () => void;
}) {
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
    <div className="min-w-0 w-full px-4 py-2 border-border border rounded-md">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h4>Spending Trend</h4>
        <div className="flex items-center gap-2">
          <SpendingTrendsPeriodByCategoryDropDown />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            classNameChildren="flex items-center justify-center"
            aria-label={isFullWidth ? "Use standard spending trend view" : "Expand spending trend"}
            aria-pressed={isFullWidth}
            title={isFullWidth ? "Shrink" : "Full screen"}
            onClick={isFullWidth ? onToggleFullWidth : onExpand}
          >
            {isFullWidth ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {!isLoading && spendingTrends?.length === 0 ? (
        <div>No expenses were found </div>
      ) : (
        <LineChartCategoriesBreakdown spendingTrends={spendingTrends} isFullWidth={isFullWidth} />
      )}
    </div>
  );
}
