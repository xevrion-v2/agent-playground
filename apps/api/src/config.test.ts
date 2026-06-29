import assert from "node:assert/strict";

import { parsePort } from "./config";

assert.equal(parsePort(undefined), 4000);
assert.equal(parsePort("0"), 0);
assert.equal(parsePort("4000"), 4000);
assert.equal(parsePort("65535"), 65535);
assert.equal(parsePort(" 8080 "), 8080);

for (const invalidPort of ["", " ", "-1", "65536", "1.5", "abc", "4000/api"]) {
  assert.throws(
    () => parsePort(invalidPort),
    /PORT must be an integer from 0 to 65535/
  );
}
