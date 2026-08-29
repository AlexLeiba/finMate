import { ExpenseCategory } from "@/lib/types/expense.types";
import * as zod from "zod";

export const expenseFormSchema = zod.object({
  amount: zod.string().min(0.01, "Amount must be greater than 0"),
  category: zod.enum(ExpenseCategory),
  description: zod.string().min(3, "Description must be at least 3 character"),
  date: zod.date(),
});

export type ExpenseFormDataType = zod.infer<typeof expenseFormSchema>;

export const uploadNewExpensesFormSchema = zod
  .array(
    zod
      .object({
        description: zod.string().min(1),
        date: zod.coerce.date(),
        category: zod.enum(ExpenseCategory),
        amount: zod.coerce.number().min(1),
      })
      .refine(
        (state) => {
          if (state.date) {
            console.log("🚀 ~ state.date:", state.date);
            const date = new Date(state.date);
            return !isNaN(date.getTime()) || date.toString() !== "Invalid Date";
          }
          return true;
        },
        { message: "Invalid date" }
      )
  )
  .min(1, "Must be at least 1 expense valid, plase fill all the values");

export type UploadNewExpensesFormDataType = zod.infer<typeof uploadNewExpensesFormSchema>;

export const uploadNewExpensesSchemaOptional = zod
  .object({
    description: zod.string().optional(),
    date: zod.coerce.date().optional(),
    category: zod.enum(ExpenseCategory),
    amount: zod.coerce.number().optional(),
  })
  .refine(
    (state) => {
      if (state.date) {
        console.log("🚀 ~ state.date:", state.date);
        const date = new Date(state.date);
        return !isNaN(date.getTime()) || date.toString() !== "Invalid Date";
      }
      return true;
    },
    { message: "Invalid date" }
  );
