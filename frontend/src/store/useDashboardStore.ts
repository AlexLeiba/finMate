import { apiFactory } from "@/api/services/apiFactory";
import {
  CATEGORY_TIME_PERIOD,
  TREND_TIME_PERIOD,
  type CategoryTimePeriod,
  type TrendTimePeriod,
} from "@/lib/consts/dashboard";
import type {
  DashboardStatsType,
  ExpensesByCategoriesType,
  MonthlyTotalsType,
  SendingTrendsType,
  SpendingByCategoryTimePeriodType,
} from "@/lib/schemas/apis/dashboardSchema";

import { create } from "zustand";

type DashboardStateType = {
  dashboardStats: DashboardStatsType["data"] | null;
  categoryBreakdown: ExpensesByCategoriesType["data"];
  monthlyTotals: MonthlyTotalsType["data"];
  spendingTrends: SendingTrendsType["data"];
  spendingByCategoryTimePeriod: SpendingByCategoryTimePeriodType["data"] | null;
  selectedCategoriesBreakdownPeriod: CategoryTimePeriod | null;
  selectedTrendPeriod: CategoryTimePeriod | null;
  getSpendingByCategoryTimePeriod: (query: { timePeriodInDays: number }) => Promise<void>;
  getDashboardStats: (query?: { startDate?: string; endDate?: string }) => Promise<void>;
  getCategoriesBreakdown: (query?: { timePeriodInDays: number }) => Promise<void>;
  getMonthlyTotalsOfOneYear: (query: { year?: string; month?: string }) => Promise<void>;
  getSpendingTrends: (query: { timePeriodInMonths: number }) => Promise<void>;
  setSelectedCategoriesBreakdownPeriod: (periodStats: CategoryTimePeriod) => void;
  setSelectedTrendPeriod: (selectedTrendPeriod: TrendTimePeriod) => void;

  isLoading: boolean;
  error: string | null;
}; //TODO move in types file after complete implementing

export const useDashboardStore = create<DashboardStateType>((set) => ({
  dashboardStats: null,
  categoryBreakdown: [],
  monthlyTotals: [],
  spendingTrends: [],
  isLoading: false,
  error: null,
  spendingByCategoryTimePeriod: null,
  selectedCategoriesBreakdownPeriod: CATEGORY_TIME_PERIOD[0],
  selectedTrendPeriod: TREND_TIME_PERIOD[0],

  setSelectedTrendPeriod: (selectedTrendPeriod) => {
    set({ selectedTrendPeriod: selectedTrendPeriod });
  },
  setSelectedCategoriesBreakdownPeriod: (periodStats) => {
    set({ selectedCategoriesBreakdownPeriod: periodStats });
  },

  //   Apis
  getDashboardStats: async (query) => {
    set({ isLoading: true });
    try {
      const response = await apiFactory().getDashboardStats(query);
      set({ dashboardStats: response, error: null });
    } catch (error: unknown) {
      set({
        dashboardStats: null,
        error: error as string,
      });
      throw error as string;
    } finally {
      set({ isLoading: false });
    }
  },
  getCategoriesBreakdown: async (query) => {
    set({ isLoading: true });
    try {
      const response = await apiFactory().getCategoriesBreakdown(query);
      set({ categoryBreakdown: response, error: null });
    } catch (error: unknown) {
      set({
        categoryBreakdown: [],
        error: error as string,
      });
      throw error as string;
    } finally {
      set({ isLoading: false });
    }
  },
  getSpendingByCategoryTimePeriod: async (query) => {
    set({ isLoading: true });
    try {
      const response = await apiFactory().getSpendingByCategoryTimePeriod(query);
      set({ error: null, spendingByCategoryTimePeriod: response });
    } catch (error: unknown) {
      set({
        spendingByCategoryTimePeriod: null,
        error: error as string,
      });
      throw error as string;
    } finally {
      set({ isLoading: false });
    }
  },
  //   getSpendingByCategoryTimePeriod: (timePeriod: CategoryTimePeriod) => {
  //   set({ spendingByCategoryTimePeriod: timePeriod });
  // },
  getMonthlyTotalsOfOneYear: async (query: { year?: string; month?: string }) => {
    set({ isLoading: true });
    try {
      const response = await apiFactory().getMonthlyTotalsOfOneYear(query);
      set({ monthlyTotals: response, error: null });
    } catch (error: unknown) {
      set({
        monthlyTotals: [],
        error: error as string,
      });
      throw error as string;
    } finally {
      set({ isLoading: false });
    }
  },
  getSpendingTrends: async (query: { timePeriodInMonths: number }) => {
    set({ isLoading: true });
    try {
      const response = await apiFactory().getSpendingTrends(query);
      set({ spendingTrends: response, error: null });
    } catch (error: unknown) {
      set({
        spendingTrends: [],
        error: error as string,
      });
      throw error as string;
    } finally {
      set({ isLoading: false });
    }
  },
}));
