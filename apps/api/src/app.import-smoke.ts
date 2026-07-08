import assert from "node:assert/strict";

import app from "./app";

assert.equal(typeof app, "function");
assert.deepEqual(
  app._router.stack
    .filter((layer) => layer.route)
    .map((layer) => Object.keys(layer.route.methods)[0]),
  ["get"],
);
