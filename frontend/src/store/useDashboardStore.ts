import { apiFactory } from "@/api/services/apiFactory";
import { CATEGORY_TIME_PERIOD, type CategoryTimePeriod } from "@/lib/consts/dashboard";
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
  periodStats: CategoryTimePeriod | null;
  getSpendingByCategoryTimePeriod: (query: { timePeriodInDays: number }) => Promise<void>;
  getDashboardStats: () => Promise<void>;
  getCategoriesBreakdown: (query?: { timePeriodInDays: number }) => Promise<void>;
  getMonthlyTotalsOfOneYear: (query: { year?: string; month?: string }) => Promise<void>;
  getSpendingTrends: () => Promise<void>;
  setPeriodStats: (periodStats: CategoryTimePeriod) => void;

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
  periodStats: CATEGORY_TIME_PERIOD[0],
  setPeriodStats: (periodStats) => {
    set({ periodStats: periodStats });
  },

  //   Apis
  getDashboardStats: async () => {
    set({ isLoading: true });
    try {
      const response = await apiFactory().getDashboardStats();
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
  getSpendingTrends: async () => {
    set({ isLoading: true });
    try {
      const response = await apiFactory().getSpendingTrends();
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
