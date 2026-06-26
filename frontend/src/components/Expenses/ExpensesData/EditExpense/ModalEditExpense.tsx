import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { ExpenseType } from "@/lib/types/expense.types";
import { lazy, Suspense, useCallback } from "react";

import { SkeletonForm } from "../../SkeletonForm";

const EditExpenseForm = lazy(() =>
  import("./EditExpenseForm").then((module) => ({
    default: module.EditExpenseForm,
  })),
);

// import { SkeletonForm } from "../SkeletonForm";

export function ModalEditExpense({
  title,
  children,
  onOpenChange,
  open,
  expense,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  open?: boolean;
  expense?: ExpenseType;
}) {
  const onOpenChangeMemo = useCallback(
    (open: boolean) => {
      return onOpenChange(open);
    },
    [onOpenChange],
  );
  if (!expense) {
    if (onOpenChange) {
      onOpenChange(false);
    }
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="lg:max-w-200 overflow-y-auto lg:h-auto h-full flex flex-col gap-4">
        <h4 className="text-lg font-semibold">{title}</h4>

        <Suspense fallback={<SkeletonForm className="lg:h-98.5" />}>
          <EditExpenseForm
            expense={expense}
            onOpenChangeMemo={onOpenChangeMemo}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
