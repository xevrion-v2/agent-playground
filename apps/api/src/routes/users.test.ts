import assert from "node:assert/strict";
import test from "node:test";

import { createUserRecord, normalizeCreateUserPayload } from "./users";

test("normalizeCreateUserPayload rejects non-object JSON bodies", () => {
  for (const body of [null, "not-json-object", 42, ["email@example.com"]]) {
    const result = normalizeCreateUserPayload(body);

    assert.equal(result.ok, false);
  }
});

test("normalizeCreateUserPayload requires a valid email", () => {
  for (const body of [{}, { email: "" }, { email: "not-an-email" }]) {
    const result = normalizeCreateUserPayload(body);

    assert.equal(result.ok, false);
  }
});

test("normalizeCreateUserPayload normalizes email and name", () => {
  const result = normalizeCreateUserPayload({
    email: "  USER@Example.COM ",
    name: "  Jane   Example  "
  });

  assert.deepEqual(result, {
    ok: true,
    value: {
      email: "user@example.com",
      name: "Jane Example"
    }
  });
});

test("normalizeCreateUserPayload ignores client ids and unrelated fields", () => {
  const result = normalizeCreateUserPayload({
    id: "client-controlled-id",
    email: "person@example.com",
    name: "Person",
    role: "admin"
  });

  assert.deepEqual(result, {
    ok: true,
    value: {
      email: "person@example.com",
      name: "Person"
    }
  });
});

test("createUserRecord always uses a generated server id", () => {
  const record = createUserRecord(
    {
      email: "person@example.com",
      name: "Person"
    },
    () => "server-generated-id"
  );

  assert.deepEqual(record, {
    id: "server-generated-id",
    email: "person@example.com",
    name: "Person"
  });
});
