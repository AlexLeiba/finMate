import * as zod from "zod";

export enum BudgetType {
  SAVINGS = "savings",
  EXPENSES = "expenses",
}

export const budgetSchema = zod.object({
  title: zod.string().min(1, "Title is required"),
  description: zod.string().optional(),
  budgetType: zod.enum(BudgetType).default(BudgetType.SAVINGS).optional(),
  budgetTargetAmount: zod.number().min(1, "Amount must be higher than 0").optional(),
  date: zod.coerce.date().default(new Date()),
});

export const budgetOptionsSchema = zod.array(
  zod
    .object({
      title: zod.string().min(1, "Title is required"),
      amount: zod.number().min(1, "Amount must be higher than 1"),
    })
    .optional()
);

export type BudgetOptionsSchemaType = zod.infer<typeof budgetOptionsSchema>;

export type BudgetSchemaType = zod.infer<typeof budgetSchema>;

export const budgetQuerySchema = zod.object({
  budgetType: zod.enum(BudgetType).default(BudgetType.SAVINGS).optional(),
});
