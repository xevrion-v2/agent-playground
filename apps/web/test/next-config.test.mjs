import assert from "node:assert/strict";
import { test } from "node:test";

import config from "../next.config.mjs";

test("disables the Next.js X-Powered-By response header", () => {
  assert.equal(config.poweredByHeader, false);
});
