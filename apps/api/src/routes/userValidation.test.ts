import assert from "node:assert/strict";
import test from "node:test";

import { validateCreateUserPayload } from "./userValidation.ts";

test("validateCreateUserPayload accepts trimmed name and email", () => {
  const result = validateCreateUserPayload({
    name: "  Ada Lovelace  ",
    email: "  ada@example.com  "
  });

  assert.deepEqual(result, {
    ok: true,
    data: {
      name: "Ada Lovelace",
      email: "ada@example.com"
    }
  });
});

test("validateCreateUserPayload rejects missing required fields", () => {
  const result = validateCreateUserPayload({});

  assert.deepEqual(result, {
    ok: false,
    errors: ["name is required", "email is required"]
  });
});

test("validateCreateUserPayload rejects malformed input shapes", () => {
  assert.deepEqual(validateCreateUserPayload(null), {
    ok: false,
    errors: ["request body must be an object"]
  });
  assert.deepEqual(validateCreateUserPayload({ name: "Ada", email: "bad-email" }), {
    ok: false,
    errors: ["email must be valid"]
  });
});
