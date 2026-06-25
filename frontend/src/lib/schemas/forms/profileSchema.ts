import * as zod from "zod";
const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);
export const profileSchema = zod
  .object({
    name: zod.string().trim().min(2, "Name must be at least 2 characters"),
    email: zod.string().email().optional(),
    newPassword: zod.preprocess(
      emptyToUndefined,
      zod
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d).+$/,
          "Password must contain at least one letter and one number",
        )
        .optional(),
    ),

    repeatNewPassword: zod.preprocess(
      emptyToUndefined,
      zod
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d).+$/,
          "Password must contain at least one letter and one number",
        )
        .optional(),
    ),
    currency: zod.string().optional(),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Passwords do not match",
    path: ["repeatNewPassword"],
  });

export type ProfileFormType = zod.infer<typeof profileSchema>;
