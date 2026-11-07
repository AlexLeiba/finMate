import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { lazy, Suspense } from "react";
import { SkeletonForm } from "../SkeletonForm";
import { Plus } from "lucide-react";

const CreateNewExpenseForm = lazy(() =>
  import("./CreateNewExpenseForm").then((module) => ({
    default: module.CreateNewExpenseForm,
  }))
);

export function CreateNewExpenseDialog({ compactOnMobile = false }: { compactOnMobile?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label={compactOnMobile ? "Add new expense" : undefined}
          title={compactOnMobile ? "Add new expense" : undefined}
          className={compactOnMobile ? "max-sm:w-9 max-sm:px-0" : undefined}
          classNameChildren={
            compactOnMobile ? "max-sm:flex max-sm:items-center max-sm:justify-center" : undefined
          }
        >
          {compactOnMobile ? (
            <>
              <span className="hidden sm:inline">Add new expense</span>
              <Plus className="sm:hidden" aria-hidden="true" />
            </>
          ) : (
            "Add new expense"
          )}
        </Button>
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
