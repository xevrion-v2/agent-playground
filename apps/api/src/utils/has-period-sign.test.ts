import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasPeriodSign } from "./has-period-sign";

test("detects period signs", () => {
  assert.equal(hasPeriodSign("a.b"), true);
  assert.equal(hasPeriodSign("ab"), false);
});
