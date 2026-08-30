import { SkeletonForm } from "@/components/shared/SkeletonForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useBudgetsStore } from "@/store/useBudgetsStore";
import { lazy, Suspense } from "react";

const CreateNewBudgetForm = lazy(() =>
  import("./CreateNewBudgetForm").then((module) => ({
    default: module.CreateNewBudgetForm,
  }))
);

export function CreateNewBudgetDialog() {
  const budgetType = useBudgetsStore((state) => state.budgetType);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="accent">Add new {budgetType}</Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-200 overflow-y-auto lg:h-auto h-full">
        <h4 className="text-lg font-semibold">Add new expense</h4>
        <Suspense fallback={<SkeletonForm className="lg:h-98.5" />}>
          <CreateNewBudgetForm />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
