import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../../ui/button";

import { cn } from "@/lib/utils/tailwindUtils";
import { CATEGORY_TIME_PERIOD } from "@/lib/consts/dashboard";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useShallow } from "zustand/react/shallow";

export function SpendingPeriodByCategoryDropDown() {
  const { getSpendingByCategoryTimePeriod, periodStats, setPeriodStats } = useDashboardStore(
    useShallow((state) => ({
      getSpendingByCategoryTimePeriod: state.getSpendingByCategoryTimePeriod,
      periodStats: state.periodStats,
      setPeriodStats: state.setPeriodStats,
    }))
  );

  return (
    <DropdownMenu modal={false}>
      <div className="flex flex-col gap-1">
        <DropdownMenuTrigger asChild>
          <Button
            // disabled={disabled}
            variant={"outline"}
            className="w-full justify-between"
            classNameChildren="flex items-center justify-between"
          >
            {periodStats?.label}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-56">
        {CATEGORY_TIME_PERIOD.map((period) => (
          <DropdownMenuItem
            className={cn(periodStats?.value === period.value && "bg-primary text-text-primary")}
            key={period.value}
            onClick={() => {
              setPeriodStats(period);
              getSpendingByCategoryTimePeriod({ timePeriodInDays: period.value });
            }}
          >
            {period.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
