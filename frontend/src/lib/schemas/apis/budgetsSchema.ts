import * as zod from "zod";

export enum BudgetType {
  SAVINGS = "savings",
  EXPENSES = "expenses",
}
export const budgetSchemaList = zod.object({
  data: zod.array(
    zod.object({
      _id: zod.string().optional(),
      title: zod.string().min(1, "Title is required"),
      description: zod.string().optional(),
      budgetType: zod.enum(BudgetType).default(BudgetType.SAVINGS).optional(),
      budgetTargetAmount: zod.number().optional(),
      date: zod.coerce.date().default(new Date()).optional(),
      options: zod
        .array(
          zod
            .object({
              title: zod.string(),
              amount: zod.number(),
            })
            .optional()
        )
        .optional(),
    })
  ),
});
export const budgetSchema = zod.object({
  data: zod.object({
    _id: zod.string().optional(),
    title: zod.string().min(1, "Title is required"),
    description: zod.string().optional(),
    budgetType: zod.enum(BudgetType).default(BudgetType.SAVINGS).optional(),
    budgetTargetAmount: zod.number().optional(),
    date: zod.coerce.date().default(new Date()).optional(),
    options: zod
      .array(
        zod
          .object({
            title: zod.string().optional(),
            amount: zod.number().optional(),
          })
          .optional()
      )
      .optional()
      .default([]),
  }),
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

export type BudgetSchemaTypeList = zod.infer<typeof budgetSchemaList>;
export type BudgetSchemaType = zod.infer<typeof budgetSchema>;
