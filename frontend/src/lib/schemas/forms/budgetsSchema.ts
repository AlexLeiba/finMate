import * as zod from "zod";

export const createBudgetSchema = zod.object({
  _id: zod.string().optional(),
  title: zod.string().min(1, "Title is required"),
  description: zod.string().optional(),
  budgetType: zod.enum(["savings", "expenses"]).default("savings").optional(),
  budgetTargetAmount: zod.number().default(0).optional(),
  date: zod.date().default(new Date()).optional(),
  options: zod
    .array(
      zod.object({
        title: zod.string(),
        amount: zod.number(),
      })
    )
    .default([])
    .optional(),
  periodStats: zod.enum(["daily", "weekly", "monthly", "yearly"]).default("daily").optional(),
});

export type CreateBudgetSchemaType = zod.infer<typeof createBudgetSchema>;
