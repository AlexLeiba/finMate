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
} from "./apis/expenseApi";
import { getProfile, updateProfile } from "./apis/profileApi";

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
  };
}
