/**
 * Regression tests for user creation payload validation.
 *
 * Run: npm test
 * Uses Node.js built-in test runner — zero dependencies.
 */
import { describe, it } from "node:test";
import assert from "node:assert";
import { validateUserPayload } from "./users";

describe("User payload validation", () => {
  it("should accept a valid payload with email and name", () => {
    const result = validateUserPayload({ email: "Test@Example.com", name: "  John Doe  " });
    assert.ok(result.user);
    assert.strictEqual(result.user.email, "test@example.com");
    assert.strictEqual(result.user.name, "John Doe");
    assert.strictEqual(result.errors, undefined);
  });

  it("should accept a valid payload with email only", () => {
    const result = validateUserPayload({ email: "user@domain.com" });
    assert.ok(result.user);
    assert.strictEqual(result.user.email, "user@domain.com");
    assert.strictEqual(result.user.name, undefined);
    assert.strictEqual(result.errors, undefined);
  });

  it("should reject non-object bodies (null)", () => {
    const result = validateUserPayload(null);
    assert.strictEqual(result.user, undefined);
    assert.deepStrictEqual(result.errors, ["Request body must be a JSON object"]);
  });

  it("should reject non-object bodies (array)", () => {
    const result = validateUserPayload(["email@test.com"]);
    assert.strictEqual(result.user, undefined);
    assert.deepStrictEqual(result.errors, ["Request body must be a JSON object"]);
  });

  it("should reject non-object bodies (string)", () => {
    const result = validateUserPayload("not-an-object");
    assert.strictEqual(result.user, undefined);
    assert.deepStrictEqual(result.errors, ["Request body must be a JSON object"]);
  });

  it("should reject missing email", () => {
    const result = validateUserPayload({ name: "No Email" });
    assert.strictEqual(result.user, undefined);
    assert.ok(result.errors?.some((e) => e.includes("Email is required")));
  });

  it("should reject invalid email format", () => {
    const result = validateUserPayload({ email: "not-an-email" });
    assert.strictEqual(result.user, undefined);
    assert.ok(result.errors?.some((e) => e.includes("valid email")));
  });

  it("should reject empty string email", () => {
    const result = validateUserPayload({ email: "" });
    assert.strictEqual(result.user, undefined);
    assert.ok(result.errors?.some((e) => e.includes("Email is required")));
  });

  it("should reject non-string name", () => {
    const result = validateUserPayload({ email: "test@test.com", name: 123 as any });
    assert.strictEqual(result.user, undefined);
    assert.ok(result.errors?.some((e) => e.includes("Name must be a string")));
  });

  it("should reject empty name after trim", () => {
    const result = validateUserPayload({ email: "test@test.com", name: "   " });
    assert.strictEqual(result.user, undefined);
    assert.ok(result.errors?.some((e) => e.includes("Name must not be empty")));
  });

  it("should ignore client-controlled id field", () => {
    const result = validateUserPayload({ email: "hacker@evil.com", id: "malicious-id" });
    assert.ok(result.user);
    assert.strictEqual((result.user as any).id, undefined);
  });

  it("should ignore unrelated extra fields", () => {
    const result = validateUserPayload({ email: "test@test.com", role: "admin", isAdmin: true });
    assert.ok(result.user);
    assert.strictEqual((result.user as any).role, undefined);
    assert.strictEqual((result.user as any).isAdmin, undefined);
  });

  it("should normalize email to lowercase", () => {
    const result = validateUserPayload({ email: "USER@EXAMPLE.COM" });
    assert.ok(result.user);
    assert.strictEqual(result.user.email, "user@example.com");
  });

  it("should normalize trimmed email", () => {
    const result = validateUserPayload({ email: "  user@test.com  " });
    assert.ok(result.user);
    assert.strictEqual(result.user.email, "user@test.com");
  });
});
