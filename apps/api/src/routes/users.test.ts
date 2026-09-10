import { describe, it, expect } from "vitest";
import { validateCreateUser } from "./users";

describe("validateCreateUser", () => {
  it("rejects non-object bodies", () => {
    const result = validateCreateUser("not an object");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Request body must be a JSON object");
  });

  it("rejects arrays", () => {
    const result = validateCreateUser([]);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Request body must be a JSON object");
  });

  it("rejects null", () => {
    const result = validateCreateUser(null);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Request body must be a JSON object");
  });

  it("rejects missing email", () => {
    const result = validateCreateUser({ name: "John" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Email is required and must be a string");
  });

  it("rejects invalid email format", () => {
    const result = validateCreateUser({ email: "not-an-email" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Invalid email format");
  });

  it("accepts valid email", () => {
    const result = validateCreateUser({ email: "test@example.com" });
    expect(result.valid).toBe(true);
    expect(result.data?.email).toBe("test@example.com");
  });

  it("normalizes email to lowercase", () => {
    const result = validateCreateUser({ email: "TEST@EXAMPLE.COM" });
    expect(result.valid).toBe(true);
    expect(result.data?.email).toBe("test@example.com");
  });

  it("trims email whitespace", () => {
    const result = validateCreateUser({ email: "  test@example.com  " });
    expect(result.valid).toBe(true);
    expect(result.data?.email).toBe("test@example.com");
  });

  it("accepts optional name", () => {
    const result = validateCreateUser({ email: "test@example.com", name: "John Doe" });
    expect(result.valid).toBe(true);
    expect(result.data?.name).toBe("John Doe");
  });

  it("trims name whitespace", () => {
    const result = validateCreateUser({ email: "test@example.com", name: "  John Doe  " });
    expect(result.valid).toBe(true);
    expect(result.data?.name).toBe("John Doe");
  });

  it("rejects non-string name", () => {
    const result = validateCreateUser({ email: "test@example.com", name: 123 });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Name must be a string if provided");
  });

  it("ignores client-controlled id field", () => {
    const result = validateCreateUser({ email: "test@example.com", id: "client-controlled" });
    expect(result.valid).toBe(true);
    // id should be ignored (not in returned data)
    expect(result.data).not.toHaveProperty("id");
  });

  it("ignores unknown fields", () => {
    const result = validateCreateUser({ email: "test@example.com", unknown: "field" });
    expect(result.valid).toBe(true);
    expect(result.data).not.toHaveProperty("unknown");
  });
});