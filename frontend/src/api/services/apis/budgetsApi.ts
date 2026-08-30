import type { CreateBudgetSchemaType } from "@/lib/schemas/forms/budgetsSchema";
import type { ApiErrorResponse, ApiResponse, AuthResponseType } from "@/lib/types/auth.types";

// import { ENDPOINTS } from "../endpoints";
import {
  MOCK_BUDGETS,
  //   type BudgetEntity,
  //   type BudgetType,
} from "@/store/useBudgetsStore";
// import { axiosInstance } from "@/api/axios";

async function getAllBudgets(type: CreateBudgetSchemaType["budgetType"]) {
  try {
    // const response = await axiosInstance.get<ApiResponse<BudgetEntity[]>>(
    //   `${ENDPOINTS.budgets}?type=${type}`
    // );

    return MOCK_BUDGETS.filter((budget) => budget.budgetType === type);
  } catch (error: any) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

async function createBudget(body: CreateBudgetSchemaType) {
  try {
    // const response = await axiosInstance.get<ApiResponse<BudgetEntity[]>>(
    //   `${ENDPOINTS.budgets}?type=${type}`
    // );

    return MOCK_BUDGETS[0];
  } catch (error: any) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

async function updateBudget(id: string, body: CreateBudgetSchemaType) {
  try {
    // const response = await axiosInstance.get<ApiResponse<BudgetEntity[]>>(
    //   `${ENDPOINTS.budgets}?type=${type}`
    // );

    return body;
  } catch (error: any) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

async function deleteBudget(id: string) {
  try {
    // const response = await axiosInstance.get<ApiResponse<BudgetEntity[]>>(
    //   `${ENDPOINTS.budgets}?type=${type}`
    // );

    return id;
  } catch (error: any) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

async function getSingleBudget(id: string) {
  try {
    // const response = await axiosInstance.get<ApiResponse<BudgetEntity[]>>(
    //   `${ENDPOINTS.budgets}?type=${type}`
    // );

    return MOCK_BUDGETS.find((budget) => budget._id === id);
  } catch (error: any) {
    const err = error as ApiErrorResponse;
    throw typeof err?.response?.data?.message === "string"
      ? err?.response?.data?.message
      : "Something went wrong";
  }
}

export { getAllBudgets, createBudget, updateBudget, deleteBudget, getSingleBudget };
