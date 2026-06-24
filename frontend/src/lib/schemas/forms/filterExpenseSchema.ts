import { ExpenseCategory, ExpenseSort } from "@/lib/types/expense.types";
import * as zod from "zod";

export const filterExpenseSchema = zod.object({
  category: zod.enum(ExpenseCategory).optional(),
  sort: zod.enum(ExpenseSort).optional(),

  searchTerm: zod.string().trim().toLowerCase().optional(),
  startDate: zod.date().optional(),
  endDate: zod.date().optional(),

  minAmount: zod.coerce.number().optional(),
  maxAmount: zod.coerce.number().optional(),
});
export type FilterExpenseFormDataType = zod.infer<typeof filterExpenseSchema>;

export const filterSearchSchema = zod.object({
  searchTerm: zod.string().trim().toLowerCase().optional(),
});

export type FilterSearchFormDataType = zod.infer<typeof filterSearchSchema>;
