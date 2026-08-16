import { ModalDelete } from "@/components/shared/ModalDelete";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import { toast } from "react-toastify";
import { useExpenseStore } from "@/store/useExpensesStore";
import { useState } from "react";
import type { ExpenseCategory } from "@/lib/types/expense.types";

export function DeleteExpense({
  expenseId,
  expenseCategory,
}: {
  expenseId: string;
  expenseCategory: ExpenseCategory;
}) {
  const [open, setOpen] = useState(false);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  const isLoading = useExpenseStore((state) => state.isLoading);
  async function onSubmit() {
    toast.loading("Loading...", { toastId: "deleteExpense" });
    try {
      await deleteExpense(expenseId);
      toast.success("Expense deleted successfully", {
        toastId: "deleteExpenseSuccess",
      });
      setOpen(false);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("deleteExpense");
    }
  }
  return (
    <ModalDelete
      open={open}
      onOpenChange={setOpen}
      onSubmit={onSubmit}
      title={`Delete ${expenseCategory} expense`}
    >
      <Button
        loading={isLoading}
        title={`delete ${expenseCategory} expense`}
        aria-label={`delete ${expenseCategory} expense`}
        size={"sm"}
        variant="destructive"
        className="opacity-40 hover:opacity-100"
      >
        <Trash />
      </Button>
    </ModalDelete>
  );
}
