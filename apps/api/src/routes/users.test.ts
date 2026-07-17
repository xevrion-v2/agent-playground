import { test } from "node:test";
import assert from "node:assert/strict";
import router from "./users.ts";

function mockRes() {
  const res: any = { statusCode: 200, body: undefined };
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

function mockReq(method: string, url: string, body?: unknown) {
  return { method, url, body } as any;
}

test("GET /users returns 200 with an empty user list", () => {
  const req = mockReq("GET", "/");
  const res = mockRes();
  router.handle(req, res, () => {});
  assert.equal(res.statusCode, 200);
  assert.ok(Array.isArray(res.body.data));
  assert.equal(res.body.data.length, 0);
});

test("POST /users returns 201 with a stub user id", () => {
  const req = mockReq("POST", "/", { email: "a@b.com", name: "Ada" });
  const res = mockRes();
  router.handle(req, res, () => {});
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.data.id, "stub-user-id");
});
