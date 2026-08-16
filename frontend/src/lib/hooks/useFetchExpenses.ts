import { useExpenseStore } from "@/store/useExpensesStore";
import { useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

export function useFetchExpenses() {
  const { fetchAllExpenses, filters, page, totalCount, isLoading } = useExpenseStore(
    useShallow((state) => ({
      fetchAllExpenses: state.getAllExpenses,
      filters: state.filters,
      page: state.page,
      totalCount: state.stats.totalCount,
      isLoading: state.isLoading,
    }))
  );

  const { start, end } = useSearch({
    from: "/(app)/_protected/expenses",
  });

  useEffect(() => {
    toast.loading("Loading...", { toastId: "fetchExpenses" });
    try {
      fetchAllExpenses(filters);

      if (start && end) {
        fetchAllExpenses({ ...filters, startDate: start, endDate: end });
      }
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("fetchExpenses");
    }
  }, [filters, page, start, end]);

  return { page, totalCount, isLoading };
}
