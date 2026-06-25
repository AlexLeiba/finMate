import * as zod from "zod";

export const profileSchema = zod.object({
  data: zod.object({
    user: zod.object({
      createdAt: zod.coerce.date(),
      updatedAt: zod.coerce.date(),
      email: zod.string().email().min(1, "Email is required"),
      name: zod.string().trim().min(2, "Name must be at least 2 characters"),
      _id: zod.string(),
      currency: zod.string(),
    }),
  }),
});
