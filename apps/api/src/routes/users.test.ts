import assert from "node:assert/strict";
import test from "node:test";

import type { Request, Response } from "express";

import router, { validateCreateUserPayload } from "./users";

type CapturedResponse = {
  statusCode: number;
  body: unknown;
};

type RouteHandler = (
  req: Request,
  res: Response,
  next: () => void
) => unknown;

type RouterLayer = {
  route?: {
    path: string;
    methods: Record<string, boolean>;
    stack: Array<{ handle: RouteHandler }>;
  };
};

function getPostHandler(): RouteHandler {
  const stack = (router as unknown as { stack: RouterLayer[] }).stack;
  const layer = stack.find(
    (entry) => entry.route?.path === "/" && entry.route.methods.post
  );

  assert.ok(layer?.route, "POST / route should exist");
  return layer.route.stack[0].handle;
}

function createResponse(): { res: Response; captured: CapturedResponse } {
  const captured: CapturedResponse = {
    statusCode: 200,
    body: undefined
  };

  const res = {
    status(code: number) {
      captured.statusCode = code;
      return this;
    },
    json(body: unknown) {
      captured.body = body;
      return this;
    }
  } as Response;

  return { res, captured };
}

test("validateCreateUserPayload rejects non-object request bodies", () => {
  assert.deepEqual(validateCreateUserPayload(null), {
    ok: false,
    error: "Request body must be a JSON object."
  });
  assert.deepEqual(validateCreateUserPayload([]), {
    ok: false,
    error: "Request body must be a JSON object."
  });
});

test("validateCreateUserPayload rejects missing or invalid required fields", () => {
  assert.deepEqual(validateCreateUserPayload({ email: "user@example.com" }), {
    ok: false,
    error: "A non-empty name is required."
  });
  assert.deepEqual(
    validateCreateUserPayload({ name: "Example User", email: "invalid" }),
    {
      ok: false,
      error: "A valid email is required."
    }
  );
});

test("POST / returns 400 for an invalid user payload", () => {
  const handler = getPostHandler();
  const { res, captured } = createResponse();
  const req = { body: {} } as Request;

  handler(req, res, () => undefined);

  assert.equal(captured.statusCode, 400);
  assert.deepEqual(captured.body, {
    error: "A non-empty name is required."
  });
});

test("POST / trims valid user fields and preserves the stub response", () => {
  const handler = getPostHandler();
  const { res, captured } = createResponse();
  const req = {
    body: {
      email: " user@example.com ",
      name: " Example User "
    }
  } as Request;

  handler(req, res, () => undefined);

  assert.equal(captured.statusCode, 201);
  assert.deepEqual(captured.body, {
    data: {
      id: "stub-user-id",
      email: "user@example.com",
      name: "Example User"
    },
    message: "User creation is not implemented yet."
  });
});
