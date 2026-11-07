import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Filter, X } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { SkeletonForm } from "../../shared/SkeletonForm";
import { DEFAULT_FILTERS, useExpenseStore } from "@/store/useExpensesStore";
import { parseActiveFilters } from "@/lib/utils/parseActiveFilters";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { toast } from "react-toastify";
import type { ExpenseFilterKeys } from "@/lib/types/expense.types";
import { useShallow } from "zustand/react/shallow";

const LazyFilterForm = lazy(() =>
  import("./FilterForm").then((module) => ({ default: module.FilterForm }))
);

export function Filters() {
  const [open, setOpen] = useState(false);
  const { filterAllExpenses, activeFilters, setFilters, filters } = useExpenseStore(
    useShallow((state) => ({
      filterAllExpenses: state.getAllExpenses,
      activeFilters: state.filters,
      setFilters: state.setFilters,
      filters: state.filters,
    }))
  );

  const isActiveFilters = Object.keys(activeFilters).length > 2;

  async function revalidateAllExpenses() {
    toast.loading("Loading...", { toastId: "filterExpenses" });
    try {
      await filterAllExpenses(DEFAULT_FILTERS);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("filterExpenses");
    }
  }
  function handleRemoveFilter(key: ExpenseFilterKeys) {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="h-full min-h-12.5">
            <Button
              title="Open multiple filter options"
              aria-label="Open multiple filter options"
              className="w-full h-full"
              variant="outline"
              classNameChildren="flex flex-wrap items-center gap-2"
            >
              <div className="flex shrink-0 items-center gap-1">
                <Filter aria-hidden="true" />
                <span className="hidden sm:inline">Filter expenses</span>
              </div>

              <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-2">
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                  {Object.entries(activeFilters).map(([key, value]) => {
                    return (
                      <ActiveFilterChips
                        handleRemove={() => handleRemoveFilter(key as ExpenseFilterKeys)}
                        key={key}
                        value={`${parseActiveFilters(value, key as ExpenseFilterKeys)}`}
                        title={key as ExpenseFilterKeys}
                      />
                    );
                  })}
                </div>
                {isActiveFilters && (
                  <div
                    role="button"
                    tabIndex={0}
                    title="Clear filters"
                    aria-label="Clear filters"
                    onClick={(e) => {
                      e.stopPropagation();
                      revalidateAllExpenses();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        revalidateAllExpenses();
                      }
                    }}
                    className="flex shrink-0 items-center gap-2 text-destructive p-1 rounded-md hover:bg-destructive/50 hover:text-white"
                  >
                    <X className="size-6" />
                  </div>
                )}
              </div>
            </Button>
          </DialogTrigger>

          <DialogContent
            onInteractOutside={(e) => {
              const target = e.target as HTMLElement;

              if (target.closest("[data-radix-popper-content-wrapper]")) {
                e.preventDefault();
              }
            }}
            className="lg:max-w-200 overflow-y-auto lg:h-auto h-full"
          >
            <h4 className="text-lg font-semibold">Filter expenses</h4>
            <Suspense fallback={<SkeletonForm />}>
              <LazyFilterForm />
            </Suspense>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
