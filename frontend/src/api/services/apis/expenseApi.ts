import { axiosInstance } from "@/api/axios";
import { ENDPOINTS } from "../endpoints";
import {
  arrayExpenseSchema,
  expenseSchema,
} from "@/lib/schemas/apis/expenseSchema";
import type {
  ExpenseCategory,
  ExpenseSort,
  ExpenseType,
} from "@/lib/types/expense.types";
import type { ApiErrorResponse, ApiResponse } from "@/lib/types/auth.types";
import type { ExpenseFormDataType } from "@/lib/schemas/forms/expenseSchema";

async function createExpense(body: ExpenseFormDataType) {
  try {
    const response = await axiosInstance.post<ApiResponse<ExpenseType>>(
      ENDPOINTS.expenses,
      body,
    );
    console.log("🚀 ~ createExpense ~ response:", response);

    const parsed = expenseSchema.safeParse(response?.data);
    if (!parsed.success)
      throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}
async function getAllExpenses(query: {
  category?: ExpenseCategory;
  sort?: ExpenseSort;
  page?: string;
}) {
  const queryString = new URLSearchParams(query).toString();

  try {
    const response = await axiosInstance.get<ApiResponse<ExpenseType[]>>(
      `${ENDPOINTS.expenses}?${queryString}`,
    );

    const parsed = arrayExpenseSchema.safeParse(response?.data);
    if (!parsed.success)
      throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

async function getExpenseById(id: string) {
  try {
    const response = await axiosInstance.get<ApiResponse<ExpenseType>>(
      `${ENDPOINTS.expenses}/${id}`,
    );

    const parsed = expenseSchema.safeParse(response?.data);
    if (!parsed.success)
      throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}
async function updateExpense(body: ExpenseFormDataType, id: string) {
  try {
    const response = await axiosInstance.put<ApiResponse<ExpenseType>>(
      `${ENDPOINTS.expenses}/${id}`,
      body,
    );

    const parsed = expenseSchema.safeParse(response?.data);
    if (!parsed.success)
      throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}
async function deleteExpense(id: string) {
  try {
    const response = await axiosInstance.delete<ApiResponse<ExpenseType>>(
      ` ${ENDPOINTS.expenses}/${id}`,
    );

    const parsed = expenseSchema.safeParse(response?.data);
    if (!parsed.success)
      throw new Error("Backend returned invalid expense shape");

    return parsed?.data?.data;
  } catch (error: unknown) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

export {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getExpenseById,
};
