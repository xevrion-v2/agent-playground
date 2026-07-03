import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildCreatedUser, validateCreateUserPayload } from "./users";

describe("user creation payload validation", () => {
  it("accepts the whitelisted user fields", () => {
    const result = validateCreateUserPayload({
      email: "  Person@Example.COM ",
      name: " Ada Lovelace "
    });

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.deepEqual(result.value, {
        email: "person@example.com",
        name: "Ada Lovelace"
      });
    }
  });

  it("rejects client-supplied ids", () => {
    const result = validateCreateUserPayload({
      id: "client-controlled-id",
      email: "person@example.com"
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.errors.join(" "), /Unsupported field\(s\): id/);
    }
  });

  it("rejects unknown extra fields", () => {
    const result = validateCreateUserPayload({
      email: "person@example.com",
      role: "admin"
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.errors.join(" "), /Unsupported field\(s\): role/);
    }
  });

  it("rejects invalid email and name values", () => {
    const result = validateCreateUserPayload({
      email: "not-an-email",
      name: 42
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.errors.join(" "), /valid email address/);
      assert.match(result.errors.join(" "), /Name must be a string/);
    }
  });

  it("creates a server-generated id instead of using request data", () => {
    const createdUser = buildCreatedUser({
      email: "person@example.com",
      name: "Ada Lovelace"
    });

    assert.notEqual(createdUser.id, "client-controlled-id");
    assert.match(createdUser.id, /^[0-9a-f-]{36}$/);
    assert.equal(createdUser.email, "person@example.com");
    assert.equal(createdUser.name, "Ada Lovelace");
  });
});
