import assert from "node:assert/strict";
import { test } from "node:test";

import { isKangxiRadicalLinePresent } from "../src/utils/is-kangxi-radical-line-present";

test("isKangxiRadicalLinePresent returns true when the input contains ⼁", () => {
  assert.equal(isKangxiRadicalLinePresent("⼁"), true);
  assert.equal(isKangxiRadicalLinePresent("foo⼁bar"), true);
});

test("isKangxiRadicalLinePresent returns false when the input does not contain ⼁", () => {
  assert.equal(isKangxiRadicalLinePresent("一"), false);
  assert.equal(isKangxiRadicalLinePresent("foo"), false);
});
