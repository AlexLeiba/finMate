import * as zod from "zod";

export const signupSchema = zod.object({
  email: zod.string().email().min(1, "Email is required"),
  password: zod
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "Password must contain at least one letter and one number",
    ),
  name: zod.string().trim().min(2, "Name must be at least 2 characters"),
});
export type SignupType = zod.infer<typeof signupSchema>;

export const signinSchema = zod.object({
  email: zod.string().trim().email().min(1, "Email is required"),
  password: zod
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "Password must contain at least one letter and one number",
    ),
});

export type SigninType = zod.infer<typeof signinSchema>;

export const resetPasswordVerifyEmailSchema = zod.object({
  step: zod.literal("verifyEmail"),
  email: zod.string().email().min(1, "Email is required"),
});
export type ResetPasswordVerifyEmailType = zod.infer<
  typeof resetPasswordVerifyEmailSchema
>;

export const resetPasswordVerifyOtpSchema = zod.object({
  step: zod.literal("verifyOtp"),
  otpCode: zod.coerce.number().min(100000).max(999999),
  email: zod.string().email().min(1, "Email is required"),
});

export type ResetPasswordVerifyOtpType = zod.infer<
  typeof resetPasswordVerifyOtpSchema
>;

export const resetPasswordSchema = zod
  .object({
    step: zod.literal("resetPassword"),
    email: zod.string().email().min(1, "Email is required"),
    newPassword: zod
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Password must contain at least one letter and one number",
      ),
    repeatNewPassword: zod
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Password must contain at least one letter and one number",
      ),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Passwords do not match",
    path: ["repeatNewPassword"],
  });

export type ResetPasswordType = zod.infer<typeof resetPasswordSchema>;

export const verifyEmailSchema = zod.object({
  email: zod.string().email().min(1, "Email is required"),
});

export type VerifyEmailType = zod.infer<typeof verifyEmailSchema>;

export const forgotPasswordSchema = zod.discriminatedUnion("step", [
  resetPasswordSchema,
  resetPasswordVerifyEmailSchema,
  resetPasswordVerifyOtpSchema,
]);

export type ForgotPasswordType = zod.infer<typeof forgotPasswordSchema>;
