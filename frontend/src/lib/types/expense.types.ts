import type { ExpenseFormDataType } from "../schemas/forms/expenseSchema";

export enum ExpenseCategory {
  ALL = "all",
  TRANSPORT = "transport",
  UTILITIES = "utilities",
  ENTERTAINMENT = "entertainment",
  HEALTHCARE = "healthcare",
  SHOPPINHG = "shopping",
  EDUCATION = "education",
  GROCERIES = "groceries",
  FOOD = "food",
  DRINKS = "drinks",
  OTHER = "other",
}

export enum ExpenseSort {
  AMOUNT_ASC = "amount",
  AMOUNT_DESC = "-amount",
  DATE_ASC = "date",
  DATE_DESC = "-date",
}

export type ExpenseType = {
  _id: string;
  userId: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date; //when the expense actually happened
  createdAt: Date;
  updatedAt: Date;
};

export type ExpenseFiltersType = {
  category?: ExpenseCategory;
  sort?: ExpenseSort;

  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;

  minAmount?: number;
  maxAmount?: number;
};

// zustand type
export type ExpenseStateType = {
  expenses: ExpenseType[];
  currentExpense: ExpenseType | null;
  isLoading: boolean;
  error: string | null;
  filters: ExpenseFiltersType;
  totalCount: number;

  setExpenses: (expenses: ExpenseType[]) => void;
  setCurrentExpense: (expense: ExpenseType | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: ExpenseFiltersType) => void;
  createExpense: (body: ExpenseFormDataType) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  updateExpense: (body: ExpenseFormDataType, id: string) => Promise<void>;
  getExpenseById: (id: string) => Promise<void>;
  getAllExpenses: (filters: ExpenseFiltersType) => Promise<void>;
};
