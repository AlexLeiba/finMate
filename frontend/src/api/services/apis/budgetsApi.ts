import { axiosInstance } from "@/api/axios";
import { ENDPOINTS } from "@/api/services/endpoints";
import {
  budgetSchema,
  budgetSchemaList,
  BudgetType,
  type BudgetSchemaType as BudgetSchemaTypeApi,
  type BudgetSchemaTypeList,
} from "@/lib/schemas/apis/budgetsSchema";
import type { BudgetSchemaType, CreateBudgetSchemaType } from "@/lib/schemas/forms/budgetsSchema";

import type { ApiErrorResponse, ApiResponse } from "@/lib/types/auth.types";

async function getAllBudgets(type: BudgetType) {
  const queryString = new URLSearchParams({ budgetType: type }).toString();
  try {
    const response = await axiosInstance.get<ApiResponse<BudgetSchemaTypeList>>(
      `${ENDPOINTS.budgets}?${queryString}`
    );

    const validatedResponse = budgetSchemaList.safeParse(response?.data);
    console.log("🚀 ~ getAllBudgets ~ validatedResponse:", validatedResponse?.error?.message);

    if (!validatedResponse?.success) throw new Error("Backend returned invalid budget shape");

    return validatedResponse?.data?.data;
  } catch (error: any) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

async function createBudget(body: CreateBudgetSchemaType) {
  try {
    const response = await axiosInstance.post<ApiResponse<BudgetSchemaTypeApi["data"]>>(
      `${ENDPOINTS.budgets}?type=${body?.budgetType}`,
      body
    );

    const validatedResponse = budgetSchema.safeParse(response.data);

    if (!validatedResponse.success) throw new Error("Backend returned invalid budget shape");

    return validatedResponse.data.data;
  } catch (error: any) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

async function updateBudget(id: string, body: BudgetSchemaType) {
  try {
    const response = await axiosInstance.put<ApiResponse<BudgetSchemaTypeApi["data"]>>(
      `${ENDPOINTS.budgets}/${id}`,
      body
    );

    const validatedResponse = budgetSchema.safeParse(response.data);
    console.log("🚀 ~ updateBudget ~ validatedResponse:", validatedResponse);

    if (!validatedResponse.success) throw new Error("Backend returned invalid budget shape");

    return validatedResponse.data.data;
  } catch (error: any) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

async function deleteBudget(id: string) {
  try {
    await axiosInstance.delete<ApiResponse<BudgetSchemaTypeApi["data"]>>(
      `${ENDPOINTS.budgets}/${id}`
    );
  } catch (error: any) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

async function getSingleBudget(id: string) {
  try {
    const response = await axiosInstance.get<ApiResponse<BudgetSchemaTypeApi["data"]>>(
      `${ENDPOINTS.budgets}/${id}`
    );

    const validatedResponse = budgetSchema.safeParse(response.data);
    console.log("🚀 ~ getSingleBudget ~ validatedResponse:", validatedResponse);

    if (!validatedResponse.success) throw new Error("Backend returned invalid budget shape");

    return validatedResponse.data.data;
  } catch (error: any) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

export { getAllBudgets, createBudget, updateBudget, deleteBudget, getSingleBudget };
