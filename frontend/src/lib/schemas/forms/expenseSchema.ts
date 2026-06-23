import { ExpenseCategory } from "@/lib/types/expense.types";
import * as zod from "zod";

export const expenseFormSchema = zod.object({
  amount: zod.number().min(0.01, "Amount must be greater than 0"),
  category: zod.enum(ExpenseCategory),
  description: zod.string().min(3, "Description must be at least 3 character"),
  date: zod.date(),
});

export type ExpenseFormDataType = zod.infer<typeof expenseFormSchema>;
