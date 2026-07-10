import assert from "node:assert/strict";
import test from "node:test";

test("importing the API entrypoint does not start an HTTP listener", async () => {
  const mod = await import("./index");
  assert.ok(mod.app);
  assert.equal(typeof mod.app.listen, "function");
});
