import { describe, it, expect } from "vitest";
import { validateUserPayload } from "./users";

describe("validateUserPayload", () => {
  describe("rejects invalid bodies", () => {
    it("rejects null", () => {
      const result = validateUserPayload(null);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors[0].message).toBe("Request body is required");
      }
    });

    it("rejects undefined", () => {
      const result = validateUserPayload(undefined);
      expect(result.ok).toBe(false);
    });

    it("rejects arrays", () => {
      const result = validateUserPayload([1, 2, 3]);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors[0].message).toContain("JSON object");
      }
    });

    it("rejects primitives", () => {
      expect(validateUserPayload("string").ok).toBe(false);
      expect(validateUserPayload(42).ok).toBe(false);
      expect(validateUserPayload(true).ok).toBe(false);
    });
  });

  describe("validates email", () => {
    it("rejects missing email", () => {
      const result = validateUserPayload({ name: "Ada" });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors[0].field).toBe("email");
      }
    });

    it("rejects invalid email", () => {
      const result = validateUserPayload({ email: "not-an-email" });
      expect(result.ok).toBe(false);
    });

    it("rejects empty email", () => {
      const result = validateUserPayload({ email: "" });
      expect(result.ok).toBe(false);
    });

    it("accepts valid email", () => {
      const result = validateUserPayload({ email: "ada@example.com" });
      expect(result.ok).toBe(true);
    });
  });

  describe("normalizes values", () => {
    it("lowercases and trims email", () => {
      const result = validateUserPayload({ email: "  Ada@Example.COM  " });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.email).toBe("ada@example.com");
      }
    });

    it("trims name", () => {
      const result = validateUserPayload({
        email: "ada@example.com",
        name: "  Ada Lovelace  ",
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.name).toBe("Ada Lovelace");
      }
    });

    it("omits name when empty/whitespace", () => {
      const result = validateUserPayload({
        email: "ada@example.com",
        name: "   ",
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.name).toBeUndefined();
      }
    });
  });

  describe("ignores client-controlled fields", () => {
    it("generates a server-side id, ignoring client id", () => {
      const result = validateUserPayload({
        id: "client-hacked-id",
        email: "ada@example.com",
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.id).not.toBe("client-hacked-id");
        expect(result.data.id).toMatch(/^user-/);
      }
    });

    it("strips unrelated fields", () => {
      const result = validateUserPayload({
        email: "ada@example.com",
        role: "admin",
        isAdmin: true,
        password: "secret",
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).not.toHaveProperty("role");
        expect(result.data).not.toHaveProperty("isAdmin");
        expect(result.data).not.toHaveProperty("password");
      }
    });
  });
});
