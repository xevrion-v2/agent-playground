import { describe, it, expect } from "vitest";
import { validateCreateUserPayload } from "../validators/userPayload.js";

describe("validateCreateUserPayload", () => {
  // --- Reject non-object JSON bodies ---

  it("rejects null body", () => {
    const result = validateCreateUserPayload(null);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("required");
    expect(result.status).toBe(400);
  });

  it("rejects undefined body", () => {
    const result = validateCreateUserPayload(undefined);
    expect(result.valid).toBe(false);
  });

  it("rejects string body", () => {
    const result = validateCreateUserPayload("hello");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("string");
  });

  it("rejects number body", () => {
    const result = validateCreateUserPayload(42);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("number");
  });

  it("rejects boolean body", () => {
    const result = validateCreateUserPayload(true);
    expect(result.valid).toBe(false);
  });

  it("rejects array body", () => {
    const result = validateCreateUserPayload([{ email: "a@b.com" }]);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("array");
  });

  // --- Require a valid email ---

  it("rejects missing email", () => {
    const result = validateCreateUserPayload({ name: "Alice" });
    expect(result.valid).toBe(false);
    expect(result.error).toContain("email");
  });

  it("rejects empty email string", () => {
    const result = validateCreateUserPayload({ email: "" });
    expect(result.valid).toBe(false);
  });

  it("rejects whitespace-only email", () => {
    const result = validateCreateUserPayload({ email: "   " });
    expect(result.valid).toBe(false);
  });

  it("rejects malformed email (no @)", () => {
    const result = validateCreateUserPayload({ email: "notanemail" });
    expect(result.valid).toBe(false);
    expect(result.error).toContain("Invalid email");
  });

  it("rejects malformed email (no domain)", () => {
    const result = validateCreateUserPayload({ email: "user@" });
    expect(result.valid).toBe(false);
  });

  // --- Valid cases ---

  it("accepts valid email without name", () => {
    const result = validateCreateUserPayload({ email: "alice@example.com" });
    expect(result.valid).toBe(true);
    expect(result.payload).toEqual({
      name: "",
      email: "alice@example.com",
    });
  });

  it("accepts valid payload with name and email", () => {
    const result = validateCreateUserPayload({
      name: "alice",
      email: "Alice@Example.COM",
    });
    expect(result.valid).toBe(true);
    expect(result.payload).toEqual({
      name: "Alice",
      email: "alice@example.com",
    });
  });

  // --- Normalize email/name values ---

  it("normalizes email to lowercase", () => {
    const result = validateCreateUserPayload({
      email: "USER@EXAMPLE.COM",
    });
    expect(result.valid).toBe(true);
    expect(result.payload!.email).toBe("user@example.com");
  });

  it("trims email whitespace", () => {
    const result = validateCreateUserPayload({
      email: "  user@example.com  ",
    });
    expect(result.valid).toBe(true);
    expect(result.payload!.email).toBe("user@example.com");
  });

  it("capitalizes each word in name", () => {
    const result = validateCreateUserPayload({
      name: "john doe",
      email: "john@example.com",
    });
    expect(result.valid).toBe(true);
    expect(result.payload!.name).toBe("John Doe");
  });

  it("trims name whitespace", () => {
    const result = validateCreateUserPayload({
      name: "  jane   ",
      email: "jane@example.com",
    });
    expect(result.valid).toBe(true);
    expect(result.payload!.name).toBe("Jane");
  });

  // --- Ignore client-controlled id and unrelated fields ---

  it("ignores client-provided id", () => {
    const result = validateCreateUserPayload({
      id: "client-generated-id-123",
      email: "test@example.com",
    });
    expect(result.valid).toBe(true);
    // id should not appear in the payload
    expect(result.payload).not.toHaveProperty("id");
    expect(Object.keys(result.payload!)).toEqual(["name", "email"]);
  });

  it("ignores extra unrelated fields", () => {
    const result = validateCreateUserPayload({
      email: "test@example.com",
      role: "admin",
      admin: true,
      extra: "data",
      nested: { foo: "bar" },
    });
    expect(result.valid).toBe(true);
    // Only name and email should be in the payload
    expect(Object.keys(result.payload!)).toEqual(["name", "email"]);
    expect(result.payload!.email).toBe("test@example.com");
    expect(result.payload!.name).toBe("");
  });

  // --- Edge cases ---

  it("rejects email that is not a string", () => {
    const result = validateCreateUserPayload({ email: 123 });
    expect(result.valid).toBe(false);
  });

  it("handles name that is not a string gracefully", () => {
    const result = validateCreateUserPayload({
      name: 42,
      email: "test@example.com",
    });
    // name is not a string so it gets skipped -> empty string
    expect(result.valid).toBe(true);
    expect(result.payload!.name).toBe("");
  });
});
