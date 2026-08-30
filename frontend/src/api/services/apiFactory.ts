import {
  signin,
  signup,
  logout,
  verifyEmail,
  verifyOTP,
  resetPassword,
  refreshToken,
} from "./apis/authApi";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
  getExpenseById,
  createMultipleExpenses,
} from "./apis/expenseApi";
import {
  getDashboardStats,
  getCategoriesBreakdown,
  getMonthlyTotalsOfOneYear,
  getSpendingTrends,
  getSpendingByCategoryTimePeriod,
} from "./apis/dashboardApi";
import { getProfile, updateProfile } from "./apis/profileApi";
import {
  getAllBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  getSingleBudget,
} from "./apis/budgetsApi";

export function apiFactory() {
  return {
    signin,
    signup,
    logout,
    verifyEmail,
    verifyOTP,
    resetPassword,
    refreshToken,
    getProfile,
    updateProfile,
    createExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense,
    getExpenseById,
    getDashboardStats,
    getCategoriesBreakdown,
    getMonthlyTotalsOfOneYear,
    getSpendingTrends,
    getSpendingByCategoryTimePeriod,
    createMultipleExpenses,
    getAllBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
    getSingleBudget,
  };
}
