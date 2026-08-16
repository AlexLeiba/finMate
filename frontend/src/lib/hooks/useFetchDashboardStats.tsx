import { useDashboardStore } from "@/store/useDashboardStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

export function useFetchDashboardStats() {
  const { isLoading, getDashboardStats, dashboardStats } = useDashboardStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      getDashboardStats: state.getDashboardStats,
      dashboardStats: state.dashboardStats,
    }))
  );

  useEffect(() => {
    toast.loading("Loading...", { toastId: "fetchStats" });
    try {
      getDashboardStats();
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("fetchStats");
    }
  }, []);

  return { isLoading, dashboardStats };
}
