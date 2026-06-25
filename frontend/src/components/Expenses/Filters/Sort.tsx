import { Button } from "@/components/ui/button";
import { ExpenseSort } from "@/lib/types/expense.types";
import { useExpenseStore } from "@/store/useExpensesStore";
import { SORT_DIRECTION, SORT_TYPE } from "@/lib/consts/sort";
import { cn } from "@/lib/utils/tailwindUtils";

export function Sort() {
  const setFilters = useExpenseStore((state) => state.setFilters);
  const filters = useExpenseStore((state) => state.filters);

  function handleSort(sort: ExpenseSort) {
    setFilters({ ...filters, sort });
  }

  const activeSortType =
    filters.sort?.replace("-", "") || ExpenseSort.DATE_DESC;
  console.log("🚀 ~ Sort ~ activeSortType:", activeSortType);

  const sortDirectionSymbol = filters.sort?.replace(activeSortType, "");
  console.log("🚀 ~ Sort ~ sortDirectionSymbol:", sortDirectionSymbol);

  const activeSortDirection = sortDirectionSymbol !== "-" ? "asc" : "desc";

  return (
    <div className="flex gap-8 items-center ">
      <div>
        <label
          htmlFor="sort"
          className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Sort type:
        </label>
        <div id="sort" className="border  rounded-md flex">
          {SORT_TYPE.map((sort) => (
            <Button
              key={sort.value}
              onClick={() =>
                handleSort((sortDirectionSymbol + sort.value) as ExpenseSort)
              }
              variant="ghost"
              className={cn(activeSortType === sort.value && "bg-primary ")}
            >
              {sort.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="sort-direction"
          className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Sort direction:
        </label>
        <div id="sort-direction" className="border  rounded-md flex">
          {SORT_DIRECTION.map((sort) => (
            <Button
              key={sort.value}
              onClick={() =>
                handleSort((sort.symbol + activeSortType) as ExpenseSort)
              }
              variant="ghost"
              className={cn(
                activeSortDirection === sort.value && "bg-primary ",
              )}
            >
              {sort.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
