// Plain JS test — runs with `node --test`, no deps needed
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { validateUserCreation } from "../lib/validate-user.js";

describe("validateUserCreation", () => {
  // --- Happy paths ---

  it("accepts a valid email-only body", () => {
    const r = validateUserCreation({ email: "alice@example.com" });
    assert.equal(r.ok, true);
    if (r.ok) {
      assert.equal(r.data.email, "alice@example.com");
      assert.equal(r.data.name, undefined);
    }
  });

  it("accepts email + name and normalizes them", () => {
    const r = validateUserCreation({ email: "  ALICE@Example.COM ", name: "  Alice  " });
    assert.equal(r.ok, true);
    if (r.ok) {
      assert.equal(r.data.email, "alice@example.com");
      assert.equal(r.data.name, "Alice");
    }
  });

  it("ignores client-supplied id and extra fields", () => {
    const r = validateUserCreation({
      email: "bob@test.org",
      id: "hacked-id",
      isAdmin: true,
      role: "superuser",
      password: "s3cret",
      name: "Bob"
    });
    assert.equal(r.ok, true);
    if (r.ok) {
      assert.equal(r.data.email, "bob@test.org");
      assert.equal(r.data.name, "Bob");
      const keys = Object.keys(r.data);
      assert(!keys.includes("id"), "id must not be present");
      assert(!keys.includes("isAdmin"), "isAdmin must not be present");
      assert(!keys.includes("role"), "role must not be present");
    }
  });

  // --- Email validation ---

  it("rejects missing email", () => {
    const r = validateUserCreation({});
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.error, "EMAIL_REQUIRED");
  });

  it("rejects null email", () => {
    const r = validateUserCreation({ email: null });
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.error, "EMAIL_REQUIRED");
  });

  it("rejects non-string email (number)", () => {
    const r = validateUserCreation({ email: 42 });
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.error, "EMAIL_INVALID_TYPE");
  });

  it("rejects empty string email", () => {
    const r = validateUserCreation({ email: "   " });
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.error, "EMAIL_EMPTY");
  });

  it("rejects invalid email format (no @)", () => {
    const r = validateUserCreation({ email: "notanemail" });
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.error, "EMAIL_INVALID_FORMAT");
  });

  it("rejects invalid email format (no domain)", () => {
    const r = validateUserCreation({ email: "alice@" });
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.error, "EMAIL_INVALID_FORMAT");
  });

  it("rejects email exceeding max length", () => {
    const longLocal = "a".repeat(255);
    const r = validateUserCreation({ email: `${longLocal}@example.com` });
    assert.equal(r.ok, false);
  });

  // --- Name validation ---

  it("accepts missing name", () => {
    const r = validateUserCreation({ email: "a@b.c" });
    assert.equal(r.ok, true);
    if (r.ok) assert.equal(r.data.name, undefined);
  });

  it("normalizes whitespace-only name to undefined", () => {
    const r = validateUserCreation({ email: "a@b.c", name: "   " });
    assert.equal(r.ok, true);
    if (r.ok) assert.equal(r.data.name, undefined);
  });

  it("rejects non-string name", () => {
    const r = validateUserCreation({ email: "a@b.c", name: 123 });
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.error, "NAME_INVALID_TYPE");
  });

  it("rejects name exceeding max length", () => {
    const r = validateUserCreation({ email: "a@b.c", name: "x".repeat(101) });
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.error, "NAME_TOO_LONG");
  });

  // --- Edge cases ---

  it("accepts valid email with + aliasing", () => {
    const r = validateUserCreation({ email: "alice+test@sub.example.co.uk" });
    assert.equal(r.ok, true);
    if (r.ok) assert.equal(r.data.email, "alice+test@sub.example.co.uk");
  });

  it("only allows email/name in output", () => {
    const r = validateUserCreation({ email: "x@y.z" });
    assert.equal(r.ok, true);
    if (r.ok) {
      assert.ok(Object.keys(r.data).length <= 2);
    }
  });
});
