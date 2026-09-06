import test from "node:test";
import assert from "node:assert/strict";

import usersRouter from "./users";

type MockResponse = {
  statusCode: number;
  body: unknown;
  json: (payload: unknown) => MockResponse;
  status: (code: number) => MockResponse;
};

function createResponse(): MockResponse {
  return {
    statusCode: 200,
    body: undefined,
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    }
  };
}

function getRouteHandler(method: "get" | "post", path: string) {
  const layer = (usersRouter as any).stack.find((entry: any) => entry.route?.path === path && entry.route?.methods?.[method]);
  assert.ok(layer, `Missing ${method.toUpperCase()} ${path} route`);
  return layer.route.stack[0].handle as (req: any, res: MockResponse) => void;
}

test("GET / returns the stub list payload", () => {
  const handler = getRouteHandler("get", "/");
  const res = createResponse();

  handler({}, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
    data: [],
    message: "User listing is not implemented yet."
  });
});

test("POST / returns the stub created payload", () => {
  const handler = getRouteHandler("post", "/");
  const res = createResponse();
  const req = {
    body: {
      name: "Ada Lovelace",
      email: "ada@example.com"
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.body, {
    data: {
      id: "stub-user-id",
      name: "Ada Lovelace",
      email: "ada@example.com"
    },
    message: "User creation is not implemented yet."
  });
});
