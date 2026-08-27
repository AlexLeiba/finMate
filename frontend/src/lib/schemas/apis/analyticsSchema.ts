import { ExpenseCategory } from "@/lib/types/expense.types";
import * as zod from "zod";

const dashboardStatsSchema = zod.object({
  data: zod.object({
    totalExpenses: zod.number(),
    averageExpense: zod.number(),
    highestExpense: zod.object({
      amount: zod.string(),
      category: zod.enum(Object.values(ExpenseCategory)),
      description: zod.string(),
      date: zod.coerce.date(),
      createdAt: zod.coerce.date(),
      updatedAt: zod.coerce.date(),
    }),
    lowestExpense: zod.object({
      amount: zod.string(),
      category: zod.enum(Object.values(ExpenseCategory)),
      description: zod.string(),
      date: zod.coerce.date(),
      createdAt: zod.coerce.date(),
      updatedAt: zod.coerce.date(),
    }),
    currentMonthTotal: zod.number(),
    prevMonthTotal: zod.number(),
    monthlyPercentageExpenseChange: zod.number(),
    expenseCount: zod.number(),
  }),
});

type DashboardStatsType = zod.infer<typeof dashboardStatsSchema>;

const categoriesBreakdownSchema = zod.object({
  data: zod.array(
    zod.object({
      category: zod.enum(Object.values(ExpenseCategory)),
      total: zod.number(),
      count: zod.number(),
      percentage: zod.number(),
    })
  ),
});

type ExpensesByCategoriesType = zod.infer<typeof categoriesBreakdownSchema>;

const spendingByCategoryTimePeriodSchema = zod.object({
  data: zod.object({
    totalAmount: zod.number(),
    count: zod.number(),
    average: zod.number(),
    startDate: zod.coerce.date(),
    endDate: zod.coerce.date(),
    categoriesBreakdownStats: zod.array(
      zod.object({
        category: zod.enum(Object.values(ExpenseCategory)),
        total: zod.number(),
        count: zod.number(),
        percentage: zod.number(),
      })
    ),
  }),
});

type SpendingByCategoryTimePeriodType = zod.infer<typeof spendingByCategoryTimePeriodSchema>;

const monthlyTotalsSchema = zod.object({
  data: zod.array(
    zod.object({
      month: zod.string(),
      total: zod.number(),
      count: zod.number(),
    })
  ),
});

type MonthlyTotalsType = zod.infer<typeof monthlyTotalsSchema>;

const spendingTrendsSchema = zod.object({
  data: zod.array(
    zod.object({
      month: zod.string(),
      total: zod.number(),
      count: zod.number(),
    })
  ),
});

type SendingTrendsType = zod.infer<typeof spendingTrendsSchema>;

export {
  dashboardStatsSchema,
  categoriesBreakdownSchema,
  monthlyTotalsSchema,
  spendingTrendsSchema,
  spendingByCategoryTimePeriodSchema,
};
export type {
  DashboardStatsType,
  ExpensesByCategoriesType,
  MonthlyTotalsType,
  SendingTrendsType,
  SpendingByCategoryTimePeriodType,
};
