import type { ExpenseCategory, ExpenseType } from "./expense.types";

export type CategoryTotalType = {
  category: ExpenseCategory;
  total: number;
  count: number;
  percentage: number;
};
export type MonthlyTotalType = {
  month: string;
  total: number;
  count: number;
};

export type SpendingTrendsType = {
  month: string;
  total: number;
  count: number;
};

export type DashboardStatsType = {
  averageExpense: number;
  expenseCount: number;
  highestExpense: ExpenseType;
  lowestExpense: ExpenseType;
  prevMonthTotal: number;
  currentMonthTotal: number;
  monthlyPercentageExpenseChange: number;
  totalExpenses: number;
};

export type AnalyticsStateType = {
  categoryData: CategoryTotalType[];
  monthlyData: MonthlyTotalType[];
  dashboardStats: DashboardStatsType | null;
  trends: SpendingTrendsType[];
  isLoading: boolean;
  error: string | null;
};
