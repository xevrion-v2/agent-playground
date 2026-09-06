import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasSevenDigit } from "./has-seven-digit";

test("detects seven digits", () => {
  assert.equal(hasSevenDigit("7"), true);
  assert.equal(hasSevenDigit("0"), false);
});
