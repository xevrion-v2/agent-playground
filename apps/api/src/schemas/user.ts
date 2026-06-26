import { z } from "zod";

/**
 * Schema for validating user creation payloads.
 *
 * - Rejects non-object bodies (handled upstream by express.json() + manual check)
 * - Requires a valid email (normalised to lowercase + trimmed)
 * - Normalises name (trimmed, optional)
 * - Silently strips client-controlled id and any unrelated fields
 */
export const createUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    // Trim first so leading/trailing whitespace doesn't break email regex
    .trim()
    .email("Invalid email address")
    .transform((v) => v.toLowerCase()),
  name: z
    .string()
    .optional()
    .transform((v) => (v ? v.trim() : v)),
});
// Default behaviour: unknown keys are silently stripped

export type CreateUserInput = z.infer<typeof createUserSchema>;
