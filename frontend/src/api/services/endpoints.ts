export const ENDPOINTS = {
  // auth
  signIn: "/auth/signin",
  signUp: "/auth/signup",
  logOut: "/auth/logout",
  // forgot password
  verifyEmail: "/auth/forgot-password",
  verifyOTP: "/auth/verify-otp",
  resetPassword: "/auth/reset-password",
  // refresh token
  refreshToken: "/auth/refresh-token",

  analytics: "analytics",
  budgets: "budgets",
  dashboard: "dashboard",
  expenses: "expenses",
  profile: "profile",
} as const;

export const AUTH_ENDPOINTS = [
  "/auth/signin",
  "/auth/signup",
  "/auth/refresh-token",
  "/auth/forgot-password",
  "/auth/logout",
  "/auth/verify-otp",
  "/auth/reset-password",
  // "profile",
];
