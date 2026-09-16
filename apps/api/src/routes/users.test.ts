import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { normalizeUserCreationPayload } from "./users.js";

describe("normalizeUserCreationPayload", () => {
  it("rejects non-object JSON payloads", () => {
    for (const payload of [null, [], "user", 42, true]) {
      const result = normalizeUserCreationPayload(payload);

      assert.equal(result.ok, false);
      assert.equal(result.message, "User payload must be a JSON object.");
    }
  });

  it("requires a valid email", () => {
    for (const payload of [{}, { email: "" }, { email: "not-an-email" }, { email: 123 }]) {
      const result = normalizeUserCreationPayload(payload);

      assert.equal(result.ok, false);
      assert.equal(result.message, "A valid email is required.");
    }
  });

  it("normalizes user fields and ignores client-controlled data", () => {
    const result = normalizeUserCreationPayload(
      {
        id: "client-id",
        email: "  USER@Example.COM  ",
        name: "  Ada    Lovelace  ",
        role: "admin"
      },
      () => "server-id"
    );

    assert.deepEqual(result, {
      ok: true,
      user: {
        id: "server-id",
        email: "user@example.com",
        name: "Ada Lovelace"
      }
    });
  });

  it("omits blank optional names", () => {
    const result = normalizeUserCreationPayload(
      {
        email: "person@example.com",
        name: "   "
      },
      () => "server-id"
    );

    assert.deepEqual(result, {
      ok: true,
      user: {
        id: "server-id",
        email: "person@example.com"
      }
    });
  });
});
