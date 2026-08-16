import { apiFactory } from "@/api/services/apiFactory";
import type {
  DashboardStatsType,
  ExpensesByCategoriesType,
  MonthlyTotalsType,
  SendingTrendsType,
} from "@/lib/schemas/apis/dashboardSchema";

import { create } from "zustand";

type DashboardStateType = {
  dashboardStats: DashboardStatsType["data"] | null;
  categoryBreakdown: ExpensesByCategoriesType["data"];
  monthlyTotals: MonthlyTotalsType["data"];
  spendingTrends: SendingTrendsType["data"];
  getDashboardStats: () => Promise<void>;
  getCategoriesBreakdown: () => Promise<void>;
  getMonthlyTotalsOfOneYear: (query: { year?: string; month?: string }) => Promise<void>;
  getSpendingTrends: () => Promise<void>;

  isLoading: boolean;
  error: string | null;
}; //TODO move in types file after complete

export const useDashboardStore = create<DashboardStateType>((set) => ({
  dashboardStats: null,
  categoryBreakdown: [],
  monthlyTotals: [],
  spendingTrends: [],
  isLoading: false,
  error: null,

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
  getCategoriesBreakdown: async () => {
    set({ isLoading: true });
    try {
      const response = await apiFactory().getCategoriesBreakdown();
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
