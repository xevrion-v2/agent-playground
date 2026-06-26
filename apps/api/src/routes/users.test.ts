import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createUserFromPayload } from "./users";

describe("createUserFromPayload", () => {
  it("rejects non-object JSON bodies", () => {
    for (const payload of [null, [], "hello", 42, true]) {
      const result = createUserFromPayload(payload);

      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.match(result.message, /JSON object/);
      }
    }
  });

  it("requires a valid normalized email", () => {
    for (const payload of [
      {},
      { email: "" },
      { email: "missing-at.example" },
      { email: "person@" },
      { email: 123 }
    ]) {
      const result = createUserFromPayload(payload);

      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.equal(result.message, "A valid email is required.");
      }
    }
  });

  it("normalizes email and optional name fields", () => {
    const result = createUserFromPayload(
      {
        email: "  PERSON@Example.COM  ",
        name: "  Ada   Lovelace ",
        firstName: " Ada ",
        lastName: " Lovelace  "
      },
      () => "generated-id"
    );

    assert.deepEqual(result, {
      ok: true,
      user: {
        id: "generated-id",
        email: "person@example.com",
        name: "Ada Lovelace",
        firstName: "Ada",
        lastName: "Lovelace"
      }
    });
  });

  it("ignores client-controlled id and unrelated fields", () => {
    const result = createUserFromPayload(
      {
        id: "client-id",
        email: "user@example.com",
        role: "admin",
        extra: { nested: true }
      },
      () => "server-id"
    );

    assert.deepEqual(result, {
      ok: true,
      user: {
        id: "server-id",
        email: "user@example.com"
      }
    });
  });

  it("rejects non-string name fields", () => {
    const result = createUserFromPayload({
      email: "user@example.com",
      name: ["Ada"]
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.message, "name must be a string when provided.");
    }
  });
});
