import { axiosInstance } from "@/api/axios";
import { DASHBOARD_ENDPOINTS } from "../endpoints";
import type { ApiErrorResponse, ApiResponse } from "@/lib/types/auth.types";
import {
  categoriesBreakdownSchema,
  monthlyTotalsSchema,
  dashboardStatsSchema,
  type DashboardStatsType,
  type ExpensesByCategoriesType,
  type MonthlyTotalsType,
  type SendingTrendsType,
  spendingTrendsSchema,
} from "@/lib/schemas/apis/dashboardSchema";

async function getDashboardStats() {
  try {
    const response = await axiosInstance.get<ApiResponse<DashboardStatsType>>(
      `${DASHBOARD_ENDPOINTS.getStats}`
    );

    const parsed = dashboardStatsSchema.safeParse(response?.data);
    if (!parsed.success) throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    console.log("🚀 ~ getAllExpenses ~ error:", error);
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

async function getCategoriesBreakdown(query?: { timePeriodInDays?: number }) {
  const queryString = new URLSearchParams(String(query)).toString();
  try {
    const response = await axiosInstance.get<ApiResponse<ExpensesByCategoriesType>>(
      `${DASHBOARD_ENDPOINTS.getCategoriesBreakdown}?${queryString}`
    );

    const parsed = categoriesBreakdownSchema.safeParse(response?.data);
    if (!parsed.success) throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    console.log("🚀 ~ getAllExpenses ~ error:", error);
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
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
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

async function getSpendingTrends() {
  try {
    const response = await axiosInstance.get<ApiResponse<SendingTrendsType>>(
      `${DASHBOARD_ENDPOINTS.getSpendingTrends}`
    );

    const parsed = spendingTrendsSchema.safeParse(response?.data);
    if (!parsed.success) throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    console.log("🚀 ~ getAllExpenses ~ error:", error);
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

export { getDashboardStats, getCategoriesBreakdown, getMonthlyTotalsOfOneYear, getSpendingTrends };
