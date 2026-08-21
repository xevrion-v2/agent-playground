import assert from "node:assert/strict";

import { parsePort } from "../src/config";

assert.equal(parsePort(undefined), 4000);
assert.equal(parsePort("0"), 0);
assert.equal(parsePort("4000"), 4000);
assert.equal(parsePort("65535"), 65535);

for (const invalidPort of ["", "abc", "-1", "65536", "1.5"]) {
  assert.throws(
    () => parsePort(invalidPort),
    /Invalid PORT value/,
    `${invalidPort} should be rejected before app.listen`
  );
}

console.log("API port configuration is valid.");
