import assert from "node:assert/strict";
import { test } from "node:test";

import { isKangxiRadicalOnePresent } from "../src/utils/is-kangxi-radical-one-present";

test("isKangxiRadicalOnePresent returns true when the input contains ⼀", () => {
  assert.equal(isKangxiRadicalOnePresent("⼀"), true);
  assert.equal(isKangxiRadicalOnePresent("foo⼀bar"), true);
});

test("isKangxiRadicalOnePresent returns false when the input does not contain ⼀", () => {
  assert.equal(isKangxiRadicalOnePresent("一"), false);
  assert.equal(isKangxiRadicalOnePresent("foo"), false);
});
