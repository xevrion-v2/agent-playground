import { describe, it, expect } from "vitest";
import { CreateUserSchema, type CreateUserInput } from "../routes/users";

describe("User Schemas (Zod)", () => {
  describe("CreateUserSchema", () => {
    it("rejects non-object bodies", () => {
      const result = CreateUserSchema.safeParse("not an object");
      expect(result.success).toBe(false);
    });

    it("rejects arrays", () => {
      const result = CreateUserSchema.safeParse([]);
      expect(result.success).toBe(false);
    });

    it("rejects null", () => {
      const result = CreateUserSchema.safeParse(null);
      expect(result.success).toBe(false);
    });

    it("rejects missing email", () => {
      const result = CreateUserSchema.safeParse({ name: "John" });
      expect(result.success).toBe(false);
    });

    it("rejects invalid email format", () => {
      const result = CreateUserSchema.safeParse({ email: "not-an-email" });
      expect(result.success).toBe(false);
    });

    it("accepts valid email", () => {
      const result = CreateUserSchema.safeParse({ email: "test@example.com" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("test@example.com");
      }
    });

    it("normalizes email to lowercase", () => {
      const result = CreateUserSchema.safeParse({ email: "TEST@EXAMPLE.COM" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("test@example.com");
      }
    });

    it("trims email whitespace", () => {
      const result = CreateUserSchema.safeParse({ email: "  test@example.com  " });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("test@example.com");
      }
    });

    it("accepts optional name", () => {
      const result = CreateUserSchema.safeParse({ email: "test@example.com", name: "John Doe" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
      }
    });

    it("trims name whitespace", () => {
      const result = CreateUserSchema.safeParse({ email: "test@example.com", name: "  John Doe  " });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
      }
    });

    it("rejects non-string name", () => {
      const result = CreateUserSchema.safeParse({ email: "test@example.com", name: 123 });
      expect(result.success).toBe(false);
    });

    it("ignores client-controlled id field", () => {
      const result = CreateUserSchema.safeParse({ email: "test@example.com", id: "client-controlled" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).not.toHaveProperty("id");
      }
    });

    it("ignores unknown fields", () => {
      const result = CreateUserSchema.safeParse({ email: "test@example.com", unknown: "field" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).not.toHaveProperty("unknown");
      }
    });
  });

  describe("Type exports", () => {
    it("CreateUserInput type is valid", () => {
      const input: import("../routes/users").CreateUserInput = {
        email: "test@example.com",
      };
      expect(input.email).toBe("test@example.com");
    });
  });
});