import { z } from "zod";

/**
 * Job status enum
 */
export const JobStatusEnum = z.enum(["draft", "open", "in_progress", "completed", "cancelled"]);

/**
 * Job creation input schema
 * Validates the payload for creating a new job
 */
export const CreateJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less"),
  description: z
    .string()
    .max(5000, "Description must be 5000 characters or less")
    .trim()
    .optional()
    .nullable(),
  status: JobStatusEnum.default("draft"),
  ownerId: z.string().cuid("Invalid owner ID format"),
});

/**
 * Job update input schema
 * Validates the payload for updating an existing job
 */
export const UpdateJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less")
    .optional(),
  description: z
    .string()
    .max(5000, "Description must be 5000 characters or less")
    .trim()
    .optional()
    .nullable(),
  status: JobStatusEnum.optional(),
});

/**
 * Job query parameters schema
 * Validates query parameters for listing/filtering jobs
 */
export const JobQuerySchema = z.object({
  status: JobStatusEnum.optional(),
  ownerId: z.string().cuid("Invalid owner ID format").optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

/**
 * Type exports for TypeScript inference
 */
export type CreateJobInput = z.infer<typeof CreateJobSchema>;
export type UpdateJobInput = z.infer<typeof UpdateJobSchema>;
export type JobQueryInput = z.infer<typeof JobQuerySchema>;
export type JobStatus = z.infer<typeof JobStatusEnum>;