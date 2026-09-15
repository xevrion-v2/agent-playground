import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .trim()
    .email("Invalid email address")
    .transform((v) => v.toLowerCase()),
  name: z
    .string()
    .optional()
    .transform((v) => {
      const trimmed = v?.trim();
      return trimmed && trimmed.length > 0 ? trimmed : null;
    }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
