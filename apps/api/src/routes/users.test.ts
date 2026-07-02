import { describe, it, expect } from "vitest";
import { sanitizeUserInput, validateEmail, normalizeName } from "./users";

// ---------------------------------------------------------------------------
// validateEmail
// ---------------------------------------------------------------------------

describe("validateEmail", () => {
  it("accepts a valid email address", () => {
    expect(validateEmail("user@example.com")).toBe("user@example.com");
  });

  it("trims whitespace from email", () => {
    expect(validateEmail("  user@example.com  ")).toBe("user@example.com");
  });

  it("lowercases email", () => {
    expect(validateEmail("User@EXAMPLE.COM")).toBe("user@example.com");
  });

  it("rejects non-string values", () => {
    expect(validateEmail(123)).toBeNull();
    expect(validateEmail(null)).toBeNull();
    expect(validateEmail(undefined)).toBeNull();
    expect(validateEmail({})).toBeNull();
  });

  it("rejects empty string", () => {
    expect(validateEmail("")).toBeNull();
    expect(validateEmail("   ")).toBeNull();
  });

  it("rejects malformed emails", () => {
    expect(validateEmail("not-an-email")).toBeNull();
    expect(validateEmail("@example.com")).toBeNull();
    expect(validateEmail("user@")).toBeNull();
    expect(validateEmail("user@@example.com")).toBeNull();
    expect(validateEmail("user example.com")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// normalizeName
// ---------------------------------------------------------------------------

describe("normalizeName", () => {
  it("trims and returns a valid name", () => {
    expect(normalizeName("  John Doe  ")).toBe("John Doe");
  });

  it("collapses multiple spaces", () => {
    expect(normalizeName("John    Doe")).toBe("John Doe");
  });

  it("returns null for non-string values", () => {
    expect(normalizeName(123)).toBeNull();
    expect(normalizeName(null)).toBeNull();
    expect(normalizeName(undefined)).toBeNull();
  });

  it("returns null for empty or whitespace-only strings", () => {
    expect(normalizeName("")).toBeNull();
    expect(normalizeName("   ")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// sanitizeUserInput — regression tests for #2207
// ---------------------------------------------------------------------------

describe("sanitizeUserInput", () => {
  // --- Reject non-object JSON bodies ---
  it("rejects null", () => {
    expect(sanitizeUserInput(null)).toBeNull();
  });

  it("rejects arrays", () => {
    expect(sanitizeUserInput(["email", "test@example.com"])).toBeNull();
  });

  it("rejects string primitives", () => {
    expect(sanitizeUserInput("just a string")).toBeNull();
  });

  it("rejects number primitives", () => {
    expect(sanitizeUserInput(42)).toBeNull();
  });

  it("rejects boolean primitives", () => {
    expect(sanitizeUserInput(true)).toBeNull();
  });

  // --- Require a valid email ---
  it("rejects missing email", () => {
    expect(sanitizeUserInput({ name: "John" })).toBeNull();
  });

  it("rejects invalid email format", () => {
    expect(sanitizeUserInput({ email: "not-an-email" })).toBeNull();
  });

  it("accepts valid email", () => {
    const result = sanitizeUserInput({ email: "user@example.com" });
    expect(result).toEqual({ email: "user@example.com" });
  });

  // --- Normalize email/name values ---
  it("normalizes email (trim + lowercase)", () => {
    const result = sanitizeUserInput({ email: "  User@EXAMPLE.COM  " });
    expect(result).toEqual({ email: "user@example.com" });
  });

  it("normalizes name (trim + collapse spaces)", () => {
    const result = sanitizeUserInput({
      email: "user@example.com",
      name: "  John    Doe  ",
    });
    expect(result).toEqual({ email: "user@example.com", name: "John Doe" });
  });

  // --- Ignore client-controlled id and unrelated fields ---
  it("ignores client-provided id", () => {
    const result = sanitizeUserInput({
      email: "user@example.com",
      id: "hacked-admin-id",
    });
    expect(result).toEqual({ email: "user@example.com" });
    expect(result).not.toHaveProperty("id");
  });

  it("ignores unrelated fields (role, password, isAdmin)", () => {
    const result = sanitizeUserInput({
      email: "user@example.com",
      role: "admin",
      password: "secret123",
      isAdmin: true,
    });
    expect(result).toEqual({ email: "user@example.com" });
  });

  it("ignores all extra fields while keeping valid ones", () => {
    const result = sanitizeUserInput({
      email: "user@example.com",
      name: "Jane Doe",
      id: "custom-id",
      createdAt: "2024-01-01",
      metadata: { hack: true },
    });
    expect(result).toEqual({ email: "user@example.com", name: "Jane Doe" });
  });

  // --- Name is optional ---
  it("accepts payload without name", () => {
    const result = sanitizeUserInput({ email: "user@example.com" });
    expect(result).toEqual({ email: "user@example.com" });
    expect(result?.name).toBeUndefined();
  });

  it("rejects invalid name type but still requires email", () => {
    expect(sanitizeUserInput({ email: "user@example.com", name: 123 })).toEqual({
      email: "user@example.com",
    });
  });
});
