import { apiFactory } from "@/api/services/apiFactory";
import {
  BudgetType,
  type BudgetSchemaType as BudgetSchemaTypeApi,
  type BudgetSchemaTypeList,
} from "@/lib/schemas/apis/budgetsSchema";
import type { BudgetSchemaType } from "@/lib/schemas/forms/budgetsSchema";
import { create } from "zustand";

export type BudgetOption = {
  title: string;
  amount: number; //if the type is expenses, then will substract the budget from option / if budget is savings - will add to the budget
};
export type BudgetEntity = {
  _id: string;
  title: string;
  description?: string;
  budgetType: BudgetType; //set automatically, pass through url, but can be changed using a tab
  budgetTargetAmount?: number; //target budget amount
  date?: Date; //to indicate what date is the budget for (for planning for the future)
  options?: BudgetOption[]; //add ot remove from a list of options
  recurringType?: "daily" | "weekly" | "monthly" | "yearly"; //(dropdown) show result of the budget (how many days/weeks/months/years) will need to achieve the target amount
};

export type BudgetStoreType = {
  budgetType: BudgetType;
  budgets: BudgetSchemaTypeList["data"];
  isLoading: boolean;
  error: any;
  singleBudget: BudgetSchemaTypeApi["data"] | null;
  setBudgetType: (type: BudgetType) => void;

  // Apis
  getAllBudgets: () => Promise<void>;
  createBudget: (body: BudgetSchemaType) => Promise<BudgetSchemaType | undefined>;
  updateBudget: (body: BudgetSchemaType, id: string) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  getSingleBudget: (id: string) => Promise<BudgetSchemaTypeApi["data"] | null>;
};

export const useBudgetsStore = create<BudgetStoreType>((set, get) => ({
  budgetType: BudgetType.SAVINGS,
  budgets: [],
  singleBudget: null,
  isLoading: false,
  error: null,

  setBudgetType: (type) => {
    set({ budgetType: type });
  },

  // Apis
  getAllBudgets: async () => {
    set({ isLoading: true });
    const budgetType = get().budgetType;
    try {
      const response = await apiFactory().getAllBudgets(budgetType);

      set({ budgets: response, isLoading: false, error: null });
    } catch (error) {
      set({ error: error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  createBudget: async (body) => {
    set({ isLoading: true });
    try {
      const response = await apiFactory().createBudget(body);

      set({ isLoading: false, error: null });
      return response;
    } catch (error) {
      set({ error: error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateBudget: async (body, id) => {
    set({ isLoading: true });
    try {
      const response = await apiFactory().updateBudget(id, body);

      set({ isLoading: false, error: null, singleBudget: response });
    } catch (error) {
      set({ error: error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteBudget: async (id) => {
    set({ isLoading: true });
    try {
      await apiFactory().deleteBudget(id);

      set({ isLoading: false, error: null });
    } catch (error) {
      set({ error: error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getSingleBudget: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await apiFactory().getSingleBudget(id);
      set({ singleBudget: response, isLoading: false, error: null });

      return response;
    } catch (error) {
      set({ error: error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
