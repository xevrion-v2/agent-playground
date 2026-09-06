import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isKangxiRadicalStepPresent } from "./is-kangxi-radical-step-present";

test("returns true when kangxi radical step char is present", () => {
  assert.equal(isKangxiRadicalStepPresent("text ⼻"), true);
});

test("returns false when kangxi radical step char is absent", () => {
  assert.equal(isKangxiRadicalStepPresent("no special chars"), false);
});

test("returns false for empty string", () => {
  assert.equal(isKangxiRadicalStepPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isKangxiRadicalStepPresent("⼻"), true);
});
