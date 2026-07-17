import { test } from "node:test";
import assert from "node:assert/strict";
import router from "./health.ts";

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

function mockReq() {
  return { method: "GET", url: "/" } as any;
}

test("GET /health returns 200 with ok status", () => {
  const req = mockReq();
  const res = mockRes();
  router.handle(req, res, () => {});
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.status, "ok");
  assert.equal(res.body.service, "taskflow-api");
});
