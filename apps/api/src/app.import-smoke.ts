import assert from "node:assert/strict";

import app from "./app";

assert.equal(typeof app, "function");
assert.equal(typeof app.listen, "function");
