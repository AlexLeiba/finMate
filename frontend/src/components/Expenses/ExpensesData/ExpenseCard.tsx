import type { ExpenseType } from "@/lib/types/expense.types";
import React from "react";

export function ExpenseCard({ expense }: { expense: ExpenseType }) {
  return (
    <div className="border p-4">
      <p>{expense.description}</p>
    </div>
  );
}
