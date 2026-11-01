import { axiosInstance } from "@/api/axios";
import { DASHBOARD_ENDPOINTS } from "../endpoints";
import type { ApiResponse } from "@/lib/types/auth.types";
import {
  categoriesBreakdownSchema,
  monthlyTotalsSchema,
  dashboardStatsSchema,
  type DashboardStatsType,
  type ExpensesByCategoriesType,
  type MonthlyTotalsType,
  type SendingTrendsType,
  spendingTrendsSchema,
  spendingByCategoryTimePeriodSchema,
} from "@/lib/schemas/apis/dashboardSchema";

import { getErrorMessage } from "@/lib/utils/errorMessage";

async function getDashboardStats(query?: { startDate?: string; endDate?: string }) {
  const queryString = new URLSearchParams(query as string).toString();
  try {
    const response = await axiosInstance.get<ApiResponse<DashboardStatsType["data"] | []>>(
      `${DASHBOARD_ENDPOINTS.getStats}?${queryString}`
    );

    // Backend returns an empty array when the user has no expenses
    if (Array.isArray(response?.data?.data)) return null;

    const parsed = dashboardStatsSchema.safeParse(response?.data);
    if (!parsed.success) throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    throw getErrorMessage(error);
  }
}

async function getCategoriesBreakdown(query?: { timePeriodInDays?: number }) {
  const queryString = new URLSearchParams(query as string).toString();
  try {
    const response = await axiosInstance.get<ApiResponse<ExpensesByCategoriesType>>(
      `${DASHBOARD_ENDPOINTS.getCategoriesBreakdown}?${queryString}`
    );

    const parsed = categoriesBreakdownSchema.safeParse(response?.data);
    if (!parsed.success) throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    console.log("🚀 ~ getAllExpenses ~ error:", error);
    throw getErrorMessage(error);
  }
}

async function getMonthlyTotalsOfOneYear(query: { year?: string; month?: string }) {
  const queryString = new URLSearchParams(query).toString();
  try {
    const response = await axiosInstance.get<ApiResponse<MonthlyTotalsType>>(
      `${DASHBOARD_ENDPOINTS.getMonthlyTotalsOfOneYear}?${queryString}`
    );

    const parsed = monthlyTotalsSchema.safeParse(response?.data);
    if (!parsed.success) throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    console.log("🚀 ~ getAllExpenses ~ error:", error);
    throw getErrorMessage(error);
  }
}

// GET TRENDS OVER THE LAST 6 MONTHS
async function getSpendingTrends(query: { timePeriodInMonths?: number }) {
  const queryString = new URLSearchParams(query as string).toString();
  try {
    const response = await axiosInstance.get<ApiResponse<SendingTrendsType>>(
      `${DASHBOARD_ENDPOINTS.getSpendingTrends}?${queryString}`
    );

    const parsed = spendingTrendsSchema.safeParse(response?.data);
    if (!parsed.success) throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    console.log("🚀 ~ getAllExpenses ~ error:", error);
    throw getErrorMessage(error);
  }
}
async function getSpendingByCategoryTimePeriod(query: { timePeriodInDays?: number }) {
  const queryString = new URLSearchParams(query as string).toString();
  try {
    const response = await axiosInstance.get<ApiResponse<ExpensesByCategoriesType>>(
      `${DASHBOARD_ENDPOINTS.getPeriodStats}?${queryString}`
    );

    const parsed = spendingByCategoryTimePeriodSchema.safeParse(response?.data);
    if (!parsed.success) throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    console.log("🚀 ~ getAllExpenses ~ error:", error);
    throw getErrorMessage(error);
  }
}

export {
  getDashboardStats,
  getCategoriesBreakdown,
  getMonthlyTotalsOfOneYear,
  getSpendingTrends,
  getSpendingByCategoryTimePeriod,
};
