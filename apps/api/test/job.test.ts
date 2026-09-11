import { describe, it, expect } from "vitest";
import {
  CreateJobSchema,
  UpdateJobSchema,
  JobQuerySchema,
  JobStatusEnum,
  type CreateJobInput,
  type UpdateJobInput,
  type JobQueryInput,
} from "../src/schemas/job";

describe("Job Schemas", () => {
  describe("JobStatusEnum", () => {
    it("accepts valid status values", () => {
      expect(JobStatusEnum.safeParse("draft").success).toBe(true);
      expect(JobStatusEnum.safeParse("open").success).toBe(true);
      expect(JobStatusEnum.safeParse("in_progress").success).toBe(true);
      expect(JobStatusEnum.safeParse("completed").success).toBe(true);
      expect(JobStatusEnum.safeParse("cancelled").success).toBe(true);
    });

    it("rejects invalid status values", () => {
      expect(JobStatusEnum.safeParse("invalid").success).toBe(false);
      expect(JobStatusEnum.safeParse("").success).toBe(false);
    });
  });

  describe("CreateJobSchema", () => {
    it("accepts valid job creation input", () => {
      const input = {
        title: "Build a React dashboard",
        description: "Create a responsive dashboard with charts",
        status: "draft",
        ownerId: "clx1234567890abcdef",
      };
      const result = CreateJobSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("Build a React dashboard");
        expect(result.data.status).toBe("draft");
      }
    });

    it("accepts minimal input with defaults", () => {
      const input = {
        title: "Simple task",
        ownerId: "clx1234567890abcdef",
      };
      const result = CreateJobSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe("draft");
        expect(result.data.description).toBeUndefined();
      }
    });

    it("rejects missing title", () => {
      const input = {
        ownerId: "clx1234567890abcdef",
      };
      const result = CreateJobSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.title).toBeDefined();
      }
    });

    it("rejects empty title", () => {
      const input = {
        title: "   ",
        ownerId: "clx1234567890abcdef",
      };
      const result = CreateJobSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects title exceeding max length", () => {
      const input = {
        title: "a".repeat(201),
        ownerId: "clx1234567890abcdef",
      };
      const result = CreateJobSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects invalid ownerId format", () => {
      const input = {
        title: "Valid title",
        ownerId: "invalid-id",
      };
      const result = CreateJobSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects invalid status", () => {
      const input = {
        title: "Valid title",
        status: "invalid_status",
        ownerId: "clx1234567890abcdef",
      };
      const result = CreateJobSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("trims title whitespace", () => {
      const input = {
        title: "  Trimmed title  ",
        ownerId: "clx1234567890abcdef",
      };
      const result = CreateJobSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("Trimmed title");
      }
    });

    it("accepts optional description", () => {
      const input = {
        title: "With description",
        description: "Detailed description here",
        ownerId: "clx1234567890abcdef",
      };
      const result = CreateJobSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.description).toBe("Detailed description here");
      }
    });

    it("rejects description exceeding max length", () => {
      const input = {
        title: "Valid title",
        description: "a".repeat(5001),
        ownerId: "clx1234567890abcdef",
      };
      const result = CreateJobSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("UpdateJobSchema", () => {
    it("accepts partial updates", () => {
      const input = {
        title: "Updated title",
      };
      const result = UpdateJobSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("accepts status update", () => {
      const input = {
        status: "in_progress",
      };
      const result = UpdateJobSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe("in_progress");
      }
    });

    it("rejects invalid status in update", () => {
      const input = {
        status: "invalid",
      };
      const result = UpdateJobSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects title too long in update", () => {
      const input = {
        title: "a".repeat(201),
      };
      const result = UpdateJobSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("accepts empty update", () => {
      const input = {};
      const result = UpdateJobSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe("JobQuerySchema", () => {
    it("accepts valid query parameters", () => {
      const input = {
        status: "open",
        ownerId: "clx1234567890abcdef",
        limit: "10",
        offset: "0",
      };
      const result = JobQuerySchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(10);
        expect(result.data.offset).toBe(0);
      }
    });

    it("applies default values", () => {
      const input = {};
      const result = JobQuerySchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(20);
        expect(result.data.offset).toBe(0);
      }
    });

    it("coerces string numbers to integers", () => {
      const input = {
        limit: "15",
        offset: "5",
      };
      const result = JobQuerySchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(15);
        expect(result.data.offset).toBe(5);
      }
    });

    it("rejects invalid limit", () => {
      const input = { limit: "0" };
      const result = JobQuerySchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects limit over max", () => {
      const input = { limit: "101" };
      const result = JobQuerySchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects negative offset", () => {
      const input = { offset: "-1" };
      const result = JobQuerySchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects invalid ownerId format", () => {
      const input = { ownerId: "invalid" };
      const result = JobQuerySchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects invalid status in query", () => {
      const input = { status: "invalid" };
      const result = JobQuerySchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("Type exports", () => {
    it("CreateJobInput type is valid", () => {
      const input: CreateJobInput = {
        title: "Test job",
        status: "draft",
        ownerId: "clx1234567890abcdef",
      };
      expect(input.title).toBe("Test job");
    });

    it("UpdateJobInput type is valid", () => {
      const input: UpdateJobInput = {
        status: "completed",
      };
      expect(input.status).toBe("completed");
    });

    it("JobQueryInput type is valid", () => {
      const input: JobQueryInput = {
        limit: 10,
        offset: 0,
        status: "open",
      };
      expect(input.limit).toBe(10);
    });
  });
});