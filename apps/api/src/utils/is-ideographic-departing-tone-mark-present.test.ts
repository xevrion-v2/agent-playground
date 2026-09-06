import assert from "node:assert/strict";
import test from "node:test";

import { isIdeographicDepartingToneMarkPresent } from "./is-ideographic-departing-tone-mark-present";

test("returns true when the input contains the ideographic departing tone mark", () => {
  assert.equal(isIdeographicDepartingToneMarkPresent("left〬right"), true);
  assert.equal(isIdeographicDepartingToneMarkPresent("〬leading"), true);
  assert.equal(isIdeographicDepartingToneMarkPresent("trailing〬"), true);
});

test("returns false for adjacent whitespace and empty values", () => {
  assert.equal(isIdeographicDepartingToneMarkPresent("left right"), false);
  assert.equal(isIdeographicDepartingToneMarkPresent("left〭right"), false);
  assert.equal(isIdeographicDepartingToneMarkPresent("left right"), false);
  assert.equal(isIdeographicDepartingToneMarkPresent(""), false);
});
