import assert from "node:assert/strict";
import test from "node:test";

import { isHangzhouNumeralNinePresent } from "./is-hangzhou-numeral-nine-present";

test("returns true when the value contains Hangzhou numeral nine (U+3029)", () => {
  assert.equal(isHangzhouNumeralNinePresent("prefix〩suffix"), true);
  assert.equal(isHangzhouNumeralNinePresent("〩leading"), true);
  assert.equal(isHangzhouNumeralNinePresent("trailing〩"), true);
});

test("returns false for other characters and empty values", () => {
  assert.equal(isHangzhouNumeralNinePresent("prefix9suffix"), false);
  assert.equal(isHangzhouNumeralNinePresent("prefix九suffix"), false);
  assert.equal(isHangzhouNumeralNinePresent("left right"), false);
  assert.equal(isHangzhouNumeralNinePresent(""), false);
});
