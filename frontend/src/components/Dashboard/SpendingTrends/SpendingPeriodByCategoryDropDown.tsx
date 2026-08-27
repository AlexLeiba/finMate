import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../../ui/button";

import { cn } from "@/lib/utils/tailwindUtils";
import { TREND_TIME_PERIOD } from "@/lib/consts/dashboard";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useShallow } from "zustand/react/shallow";

export function SpendingTrendsPeriodByCategoryDropDown() {
  const { selectedTrendPeriod, setSelectedTrendPeriod, getSpendingTrends } = useDashboardStore(
    useShallow((state) => ({
      getSpendingTrends: state.getSpendingTrends,
      selectedTrendPeriod: state.selectedTrendPeriod,
      setSelectedTrendPeriod: state.setSelectedTrendPeriod,
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
            {selectedTrendPeriod?.label}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-56">
        {TREND_TIME_PERIOD.map((period) => (
          <DropdownMenuItem
            className={cn(
              selectedTrendPeriod?.value === period.value && "bg-primary text-text-primary"
            )}
            key={period.value}
            onClick={() => {
              setSelectedTrendPeriod(period);
              getSpendingTrends({ timePeriodInMonths: period.value });
            }}
          >
            {period.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
