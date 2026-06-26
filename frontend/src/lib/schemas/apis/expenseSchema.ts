import { ExpenseCategory } from "@/lib/types/expense.types";
import * as zod from "zod";

export const expenseSchema = zod.object({
  data: zod.object({
    createdAt: zod.coerce.date(),
    updatedAt: zod.coerce.date(),
    amount: zod.number(),
    category: zod.enum(ExpenseCategory),
    description: zod.string(),
    _id: zod.string(),
    date: zod.coerce.date(),
    userId: zod.string(),
  }),
});

export type ExpenseResponseType = zod.infer<typeof expenseSchema>;

export const arrayExpenseSchema = zod.object({
  data: zod.object({
    expenses: zod.array(
      zod.object({
        createdAt: zod.coerce.date(),
        updatedAt: zod.coerce.date(),
        amount: zod.number(),
        category: zod.enum(ExpenseCategory),
        description: zod.string(),
        _id: zod.string(),
        date: zod.coerce.date(),
        userId: zod.string(),
      }),
    ),
    stats: zod.object({
      totalCount: zod.number(),
      totalAmount: zod.number(),
      averageAmount: zod.number(),
    }),
  }),
});

export type ArrayExpenseResponseType = zod.infer<typeof arrayExpenseSchema>;
