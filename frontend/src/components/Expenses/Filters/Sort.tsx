import { Button } from "@/components/ui/button";
import { ExpenseSort } from "@/lib/types/expense.types";
import { useExpenseStore } from "@/store/useExpensesStore";
import { SORT_DIRECTION, SORT_TYPE } from "@/lib/consts/sort";
import { cn } from "@/lib/utils/tailwindUtils";
import { useShallow } from "zustand/react/shallow";

export function Sort({ label = true }: { label?: boolean }) {
  const { setFilters, filters } = useExpenseStore(
    useShallow((state) => ({ setFilters: state.setFilters, filters: state.filters }))
  );

  function handleSort(sort: ExpenseSort) {
    setFilters({ ...filters, sort });
  }

  const activeSortType = filters.sort?.replace("-", "") || ExpenseSort.DATE_DESC;
  const activeSortDirectionSymbol = filters.sort?.replace(activeSortType, "");
  const activeSortDirection = activeSortDirectionSymbol !== "-" ? "asc" : "desc";

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <div>
        {label && (
          <label
            htmlFor="sort"
            className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Sort type:
          </label>
        )}

        <div id="sort" className="border rounded-md flex">
          {SORT_TYPE.map((sort) => (
            <Button
              key={sort.value}
              title={`Sort by ${sort.label}`}
              aria-label={`Sort by ${sort.label}`}
              onClick={() => handleSort((activeSortDirectionSymbol + sort.value) as ExpenseSort)}
              variant="ghost"
              className={cn(activeSortType === sort.value && "bg-primary ")}
            >
              {sort.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        {label && (
          <label
            htmlFor="sort-direction"
            className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Sort direction:
          </label>
        )}

        <div id="sort-direction" className="border  rounded-md flex">
          {SORT_DIRECTION.map((sort) => (
            <Button
              key={sort.value}
              title={`Sort ${sort.value === "asc" ? "ascending" : "descending"}`}
              aria-label={`Sort ${sort.value === "asc" ? "ascending" : "descending"}`}
              onClick={() => handleSort((sort.symbol + activeSortType) as ExpenseSort)}
              variant="ghost"
              className={cn(activeSortDirection === sort.value && "bg-primary ")}
            >
              {sort.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
