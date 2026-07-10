import assert from "node:assert/strict";
import test from "node:test";

import { createApp } from "./app";

test("createApp can be imported without binding a port", () => {
  const app = createApp();
  assert.ok(app);
  assert.equal(typeof app.listen, "function");
});
