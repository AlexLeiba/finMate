import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Filter } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { SkeletonForm } from "../SkeletonForm";
import { SearchExpense } from "./SearchExpense";

const LazyFilterForm = lazy(() =>
  import("./FilterForm").then((module) => ({ default: module.FilterForm })),
);

export function Filters() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SearchExpense />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" classNameChildren="flex items-center gap-1">
            <Filter /> Filter expenses
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
    </>
  );
}
