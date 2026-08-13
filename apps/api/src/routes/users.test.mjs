import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadUsersRouter() {
  const routes = [];
  const Router = () => ({
    get: (path, handler) => routes.push({ method: "GET", path, handler }),
    post: (path, handler) => routes.push({ method: "POST", path, handler })
  });

  const source = readFileSync(new URL("./users.ts", import.meta.url), "utf8")
    .replace(/import \{ Router \} from "express";\r?\n\r?\n/, "")
    .replace("export default router;", "globalThis.router = router;");

  const context = { Router };
  vm.runInNewContext(source, context);

  return { router: context.router, routes };
}

function createResponse() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };
}

test("GET /users returns the list stub", () => {
  const { routes } = loadUsersRouter();
  const route = routes.find((entry) => entry.method === "GET" && entry.path === "/");
  const res = createResponse();

  assert.ok(route, "expected GET / route to be registered");
  route.handler({}, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.message, "User listing is not implemented yet.");
  assert.equal(Array.isArray(res.body.data), true);
  assert.equal(res.body.data.length, 0);
});

test("POST /users returns the create stub with submitted fields", () => {
  const { routes } = loadUsersRouter();
  const route = routes.find((entry) => entry.method === "POST" && entry.path === "/");
  const res = createResponse();

  assert.ok(route, "expected POST / route to be registered");
  route.handler({ body: { name: "Ada", email: "ada@example.com" } }, res);

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.message, "User creation is not implemented yet.");
  assert.equal(res.body.data.id, "stub-user-id");
  assert.equal(res.body.data.name, "Ada");
  assert.equal(res.body.data.email, "ada@example.com");
});
