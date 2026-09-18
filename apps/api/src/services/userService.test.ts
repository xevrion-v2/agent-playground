import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { UserValidationError, createUser } from "./userService.js";

describe("createUser", () => {
  it("rejects non-object JSON bodies", () => {
    assert.throws(() => createUser(null), UserValidationError);
    assert.throws(() => createUser([]), UserValidationError);
    assert.throws(() => createUser("not an object"), UserValidationError);
  });

  it("requires a valid email", () => {
    assert.throws(() => createUser({ name: "Ana" }), UserValidationError);
    assert.throws(
      () => createUser({ email: "not-an-email" }),
      UserValidationError
    );
  });

  it("normalizes email and name values", () => {
    const user = createUser(
      { email: "  TEST@Example.COM ", name: "  Test   User  " },
      () => "server-id"
    );

    assert.deepEqual(user, {
      id: "server-id",
      email: "test@example.com",
      name: "Test User"
    });
  });

  it("ignores client-controlled ids and unrelated fields", () => {
    const user = createUser(
      {
        id: "client-id",
        email: "person@example.com",
        name: "Person",
        role: "admin",
        createdAt: "2026-01-01"
      },
      () => "server-id"
    );

    assert.deepEqual(user, {
      id: "server-id",
      email: "person@example.com",
      name: "Person"
    });
  });

  it("rejects non-string name values", () => {
    assert.throws(
      () => createUser({ email: "person@example.com", name: 123 }),
      UserValidationError
    );
  });
});
