import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasExclamationSign } from "./has-exclamation-sign";

test("detects exclamation signs", () => {
  assert.equal(hasExclamationSign("wow!"), true);
  assert.equal(hasExclamationSign("wow"), false);
});
