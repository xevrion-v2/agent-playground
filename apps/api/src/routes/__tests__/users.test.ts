import { describe, it, expect } from "vitest";
import {
  validateUserPayload,
  normalizeEmail,
  normalizeName,
  isValidEmail,
} from "../users";

describe("User Creation Validation", () => {
  describe("isValidEmail", () => {
    it("should accept valid email addresses", () => {
      expect(isValidEmail("user@example.com")).toBe(true);
      expect(isValidEmail("test.user@domain.org")).toBe(true);
      expect(isValidEmail("user+tag@example.com")).toBe(true);
    });

    it("should reject invalid email addresses", () => {
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("notanemail")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
      expect(isValidEmail("user@.com")).toBe(false);
    });
  });

  describe("normalizeEmail", () => {
    it("should lowercase and trim email", () => {
      expect(normalizeEmail("  User@Example.COM  ")).toBe("user@example.com");
      expect(normalizeEmail("TEST@DOMAIN.ORG")).toBe("test@domain.org");
    });
  });

  describe("normalizeName", () => {
    it("should trim and capitalize name words", () => {
      expect(normalizeName("  john doe  ")).toBe("John Doe");
      expect(normalizeName("JANE SMITH")).toBe("Jane Smith");
      expect(normalizeName("alice bob charlie")).toBe("Alice Bob Charlie");
    });
  });

  describe("validateUserPayload", () => {
    describe("non-object bodies", () => {
      it("should reject null", () => {
        const result = validateUserPayload(null);
        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].field).toBe("body");
      });

      it("should reject undefined", () => {
        const result = validateUserPayload(undefined);
        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
      });

      it("should reject arrays", () => {
        const result = validateUserPayload([]);
        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
      });

      it("should reject strings", () => {
        const result = validateUserPayload("string");
        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
      });

      it("should reject numbers", () => {
        const result = validateUserPayload(123);
        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
      });
    });

    describe("email validation", () => {
      it("should require email", () => {
        const result = validateUserPayload({});
        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].field).toBe("email");
      });

      it("should reject non-string email", () => {
        const result = validateUserPayload({ email: 123 });
        expect(result.valid).toBe(false);
        expect(result.errors[0].field).toBe("email");
      });

      it("should reject invalid email format", () => {
        const result = validateUserPayload({ email: "notanemail" });
        expect(result.valid).toBe(false);
        expect(result.errors[0].field).toBe("email");
      });

      it("should accept valid email", () => {
        const result = validateUserPayload({ email: "user@example.com" });
        expect(result.valid).toBe(true);
        expect(result.data?.email).toBe("user@example.com");
      });
    });

    describe("name validation", () => {
      it("should accept valid name", () => {
        const result = validateUserPayload({
          email: "user@example.com",
          name: "John Doe",
        });
        expect(result.valid).toBe(true);
        expect(result.data?.name).toBe("John Doe");
      });

      it("should reject non-string name", () => {
        const result = validateUserPayload({
          email: "user@example.com",
          name: 123,
        });
        expect(result.valid).toBe(false);
        expect(result.errors[0].field).toBe("name");
      });

      it("should reject empty name", () => {
        const result = validateUserPayload({
          email: "user@example.com",
          name: "   ",
        });
        expect(result.valid).toBe(false);
        expect(result.errors[0].field).toBe("name");
      });

      it("should normalize name", () => {
        const result = validateUserPayload({
          email: "user@example.com",
          name: "  john doe  ",
        });
        expect(result.valid).toBe(true);
        expect(result.data?.name).toBe("John Doe");
      });
    });

    describe("field stripping", () => {
      it("should strip client-controlled id", () => {
        const result = validateUserPayload({
          id: "client-id",
          email: "user@example.com",
        });
        expect(result.valid).toBe(true);
        expect(result.data).not.toHaveProperty("id");
      });

      it("should strip unrelated fields", () => {
        const result = validateUserPayload({
          email: "user@example.com",
          role: "admin",
          createdAt: "2024-01-01",
        });
        expect(result.valid).toBe(true);
        expect(result.data).not.toHaveProperty("role");
        expect(result.data).not.toHaveProperty("createdAt");
      });

      it("should keep allowed fields", () => {
        const result = validateUserPayload({
          email: "user@example.com",
          name: "John Doe",
        });
        expect(result.valid).toBe(true);
        expect(result.data).toHaveProperty("email");
        expect(result.data).toHaveProperty("name");
      });
    });

    describe("normalization", () => {
      it("should normalize email to lowercase", () => {
        const result = validateUserPayload({
          email: "USER@EXAMPLE.COM",
        });
        expect(result.valid).toBe(true);
        expect(result.data?.email).toBe("user@example.com");
      });

      it("should normalize name with proper capitalization", () => {
        const result = validateUserPayload({
          email: "user@example.com",
          name: "jane doe",
        });
        expect(result.valid).toBe(true);
        expect(result.data?.name).toBe("Jane Doe");
      });
    });

    describe("multiple errors", () => {
      it("should return multiple errors for invalid payload", () => {
        const result = validateUserPayload({
          email: "notanemail",
          name: 123,
        });
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBeGreaterThanOrEqual(2);
      });
    });
  });
});
