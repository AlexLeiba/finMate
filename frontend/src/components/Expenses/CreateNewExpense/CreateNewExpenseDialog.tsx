import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { lazy, Suspense } from "react";
import { SkeletonForm } from "../SkeletonForm";

const CreateNewExpenseForm = lazy(() =>
  import("../CreateNewExpense/CreateNewExpenseForm").then((module) => ({
    default: module.CreateNewExpenseForm,
  })),
);

export function CreateNewExpenseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add new expense</Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-200 overflow-y-auto lg:h-auto h-full">
        <h4 className="text-lg font-semibold">Add new expense</h4>
        <Suspense fallback={<SkeletonForm className="lg:h-98.5" />}>
          <CreateNewExpenseForm />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
