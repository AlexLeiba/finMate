import type { ExpenseType } from "@/lib/types/expense.types";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ModalEditExpense } from "./ModalEditExpense";
import { useState } from "react";
export function EditExpense({ expense }: { expense: ExpenseType }) {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <ModalEditExpense
      open={openEdit}
      onOpenChange={setOpenEdit}
      title={`Edit ${expense.category} expense`}
      expense={expense}
    >
      <Button size={"sm"} variant="outline">
        <Edit />
      </Button>
    </ModalEditExpense>
  );
}
