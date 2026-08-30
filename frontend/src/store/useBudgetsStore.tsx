import { apiFactory } from "@/api/services/apiFactory";
import type { CreateBudgetSchemaType } from "@/lib/schemas/forms/budgetsSchema";
import { create } from "zustand";

export const MOCK_BUDGETS: CreateBudgetSchemaType[] = [
  {
    _id: "62e4f1c4c3a9a3c1f0e0f2f3",
    title: "My first budget to buy a car",
    description: "This is my first budget",
    budgetType: "savings",
    budgetTargetAmount: 5000,
    date: new Date(),
    options: [
      {
        title: "My first option",
        amount: 100,
      },
      {
        title: "My second option",
        amount: 200,
      },
    ],
    periodStats: "daily",
  },
  {
    _id: "62e4f1c4c3a9a3c1f0e0f2f4",
    title: "My second budget to buy a car",
    description: "This is my first budget",
    budgetType: "savings",
    budgetTargetAmount: 3500,
    date: new Date(),
    options: [
      {
        title: "My first option",
        amount: 100,
      },
      {
        title: "My second option",
        amount: 200,
      },
    ],
    periodStats: "daily",
  },
  {
    _id: "62e4f1c4c3a9a3c1f0e0f2f5",
    title: "Expenses for gym",
    description: "For the last year",
    budgetType: "expenses",
    budgetTargetAmount: 1500,
    date: new Date(),
    options: [
      {
        title: "My first option",
        amount: 100,
      },
      {
        title: "My second option",
        amount: 200,
      },
    ],
    periodStats: "daily",
  },
];

export type BudgetOption = {
  title: string;
  amount: number; //if the type is expenses, then will substract the budget from option / if budget is savings - will add to the budget
};
export type BudgetEntity = {
  _id: string;
  title: string;
  description?: string;
  budgetType: string; //set automatically, pass through url, but can be changed using a tab
  budgetTargetAmount?: number; //target budget amount
  date?: Date; //to indicate what date is the budget for (for planning for the future)
  options?: BudgetOption[]; //add ot remove from a list of options
  recurringType?: "daily" | "weekly" | "monthly" | "yearly"; //(dropdown) show result of the budget (how many days/weeks/months/years) will need to achieve the target amount
};
export type BudgetType = "savings" | "expenses";
export type BudgetStoreType = {
  budgetType: BudgetType;
  budgets: CreateBudgetSchemaType[];
  isLoading: boolean;
  error: any;
  singleBudget: CreateBudgetSchemaType | null;
  setBudgetType: (type: BudgetType) => void;

  // Apis
  getAllBudgets: () => Promise<void>;
  createBudget: (body: CreateBudgetSchemaType) => Promise<CreateBudgetSchemaType | undefined>;
  updateBudget: (body: CreateBudgetSchemaType, id: string) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  getSingleBudget: (id: string) => Promise<void>;
};

export const useBudgetsStore = create<BudgetStoreType>((set, get) => ({
  budgetType: "savings",
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
      console.log("🚀 ~ useBudgetsStore ~ response:", response);
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
      await apiFactory().updateBudget(id, body);

      set({ isLoading: false, error: null });
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
    } catch (error) {
      set({ error: error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
