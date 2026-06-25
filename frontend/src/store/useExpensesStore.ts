import { apiFactory } from "@/api/services/apiFactory";

import {
  ExpenseCategory,
  ExpenseSort,
  type ExpenseStateType,
} from "@/lib/types/expense.types";
import { create } from "zustand";

export const DEFAULT_FILTERS = {
  category: ExpenseCategory.ALL,
  sort: ExpenseSort.DATE_DESC,
};

export const useExpenseStore = create<ExpenseStateType>((set, get) => ({
  page: 1,
  expenses: [],
  currentExpense: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  filters: DEFAULT_FILTERS,

  setPage: (page) => set({ page }),
  setExpenses: (expenses) => set({ expenses }),
  setFilters: (filters) => set({ filters }),
  setCurrentExpense: (expense) => set({ currentExpense: expense }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  //   Apis
  createExpense: async (body) => {
    set({ isLoading: true });

    try {
      const response = await apiFactory().createExpense(body);

      set((state) => ({
        expenses: [...state.expenses, response],
        error: null,
      }));

      const getAllExpenses = get().getAllExpenses;
      getAllExpenses(DEFAULT_FILTERS);
    } catch (error: unknown) {
      set({ error: error as string });
      throw error as string;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteExpense: async (id) => {
    set({ isLoading: true });
    const { expenses } = get();
    try {
      const response = await apiFactory().deleteExpense(id);
      set({
        error: null,
        expenses: expenses.filter((e) => e._id !== response._id),
      });
    } catch (error: unknown) {
      set({ error: error as string });
      throw error as string;
    } finally {
      set({ isLoading: false });
    }
  },

  updateExpense: async (body, id) => {
    set({ isLoading: true });
    const { expenses } = get();
    try {
      const response = await apiFactory().updateExpense(body, id);
      set({
        error: null,
        expenses: expenses.map((e) => (e._id === response._id ? response : e)),
      });
    } catch (error: unknown) {
      set({ error: error as string });
      throw error as string;
    } finally {
      set({ isLoading: false });
    }
  },

  getExpenseById: async (id) => {
    set({ isLoading: true });

    try {
      const response = await apiFactory().getExpenseById(id);
      set({ error: null, currentExpense: response });
    } catch (error: unknown) {
      set({ error: error as string });
      throw error as string;
    } finally {
      set({ isLoading: false });
    }
  },

  getAllExpenses: async (filtersQuery) => {
    set({
      isLoading: true,
      filters: filtersQuery,
    });
    const page = String(get().page);

    try {
      const response = await apiFactory().getAllExpenses({
        ...filtersQuery,
        page: page,
      });
      set({
        error: null,
        expenses: response.expenses,
        totalCount: response.totalCount,
      });
    } catch (error: unknown) {
      set({ error: error as string });
      throw error as string;
    } finally {
      set({ isLoading: false });
    }
  },
}));
