import { test } from "node:test";
import assert from "node:assert/strict";
import router from "./users.ts";

function mockRes() {
  const res: any = { statusCode: 0, body: undefined };
  res.status = (code: number) => {
    res.statusCode = code;
    return res;
  };
  res.json = (obj: unknown) => {
    res.body = obj;
    return res;
  };
  return res;
}

function mockReq(body: unknown) {
  return { method: "POST", url: "/", body } as any;
}

test("POST /users rejects non-object bodies with a 400 error envelope", () => {
  const req = mockReq([1, 2, 3]);
  const res = mockRes();
  router.handle(req, res, () => {});
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error, "error");
  assert.equal(res.body.message, "Request body must be a JSON object.");
});

test("POST /users returns 201 for object bodies", () => {
  const req = mockReq({ email: "a@b.com" });
  const res = mockRes();
  router.handle(req, res, () => {});
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.data.id, "stub-user-id");
});
