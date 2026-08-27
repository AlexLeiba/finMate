import { apiFactory } from "@/api/services/apiFactory";
import type { DashboardStatsType } from "@/lib/schemas/apis/dashboardSchema";

import { create } from "zustand";

type DashboardStateType = {
  dashboardStats: DashboardStatsType["data"] | null;
  getDashboardStats: (query?: { startDate?: string; endDate?: string }) => Promise<void>;

  isLoading: boolean;
  error: string | null;
}; //TODO move in types file after complete implementing

export const useStatsStore = create<DashboardStateType>((set) => ({
  isLoading: false,
  error: null,
  dashboardStats: null,

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
}));
