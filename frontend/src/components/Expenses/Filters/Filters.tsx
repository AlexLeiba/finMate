import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Filter, X } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { SkeletonForm } from "../SkeletonForm";
import { useExpenseStore } from "@/store/useExpensesStore";
import { parseActiveFilters } from "@/lib/utils/parseActiveFilters";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { toast } from "react-toastify";

const LazyFilterForm = lazy(() =>
  import("./FilterForm").then((module) => ({ default: module.FilterForm })),
);

export function Filters() {
  const [open, setOpen] = useState(false);
  const activeFilters = useExpenseStore((state) => state.filters);
  const filterAllExpenses = useExpenseStore((state) => state.getAllExpenses);
  const isActiveFilters = Object.entries(activeFilters).length > 0;

  async function revalidateAllExpenses() {
    toast.loading("Loading...", { toastId: "filterExpenses" });
    try {
      await filterAllExpenses({});
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("filterExpenses");
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="overflow-x-auto h-full">
            <Button
              title="Edit Filter expenses"
              aria-label="Edit Filter expenses"
              className="w-full"
              variant="outline"
              classNameChildren="flex items-center gap-4"
            >
              <div className="flex items-center gap-1">
                <Filter /> Filter expenses
              </div>

              <div className="flex justify-between w-full">
                <div className="flex gap-2 items-center flex-wrap ">
                  {Object.entries(activeFilters).map(([key, value]) => {
                    return (
                      <ActiveFilterChips
                        key={key}
                        value={`${key}: ${parseActiveFilters(value)}`}
                      />
                    );
                  })}
                </div>
                {isActiveFilters && (
                  <Button
                    variant="ghost"
                    title="Clear filters"
                    aria-label="Clear filters"
                    onClick={(e) => {
                      e.stopPropagation();
                      revalidateAllExpenses();
                    }}
                    className="flex items-center gap-2 text-destructive"
                  >
                    <X className="size-6" />
                  </Button>
                )}
              </div>
            </Button>
          </DialogTrigger>

          <DialogContent
            onInteractOutside={(e) => {
              const target = e.target as HTMLElement;
              console.log("🚀 ~ Filters ~ target:", target);

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
