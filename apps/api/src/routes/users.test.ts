import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { createUserHandler, validateCreateUserPayload } from "./users";

const invokeCreateUser = (body: unknown) => {
  let statusCode = 200;
  let payload: unknown;
  const response = {
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(value: unknown) {
      payload = value;
      return this;
    },
  };

  createUserHandler({ body } as any, response as any);
  return { statusCode, payload };
};

describe("POST /users validation", () => {
  test("accepts and normalizes a valid name and email", () => {
    const result = invokeCreateUser({
      name: "  Ada Lovelace  ",
      email: "  ada@example.com  ",
      admin: true,
    });

    assert.equal(result.statusCode, 201);
    assert.deepEqual(result.payload, {
      data: {
        id: "stub-user-id",
        name: "Ada Lovelace",
        email: "ada@example.com",
      },
      message: "User creation is not implemented yet.",
    });
  });

  test("rejects missing, blank, and non-string names", () => {
    for (const name of [undefined, "", "   ", 123]) {
      const result = invokeCreateUser({ name, email: "ada@example.com" });
      assert.equal(result.statusCode, 400);
      assert.deepEqual(result.payload, {
        error: "name must be a non-empty string.",
      });
    }
  });

  test("rejects missing, blank, and non-string emails", () => {
    for (const email of [undefined, "", "   ", 123]) {
      const result = invokeCreateUser({ name: "Ada", email });
      assert.equal(result.statusCode, 400);
      assert.deepEqual(result.payload, {
        error: "email must be a non-empty string.",
      });
    }
  });

  test("rejects malformed email values", () => {
    for (const email of ["not-an-email", "a@", "@example.com", "a b@example.com"]) {
      const result = invokeCreateUser({ name: "Ada", email });
      assert.equal(result.statusCode, 400);
      assert.deepEqual(result.payload, {
        error: "email must be a valid email address.",
      });
    }
  });

  test("rejects non-object request bodies", () => {
    for (const body of [undefined, null, "text", []]) {
      const result = invokeCreateUser(body);
      assert.equal(result.statusCode, 400);
      assert.deepEqual(result.payload, {
        error: "Request body must be an object.",
      });
    }
  });

  test("validation helper returns the normalized payload", () => {
    assert.deepEqual(
      validateCreateUserPayload({ name: "  Grace ", email: " grace@example.org " }),
      {
        ok: true,
        value: { name: "Grace", email: "grace@example.org" },
      },
    );
  });
});
