import assert from "node:assert/strict";
import test from "node:test";

import { isLeftSquareBracketWithDoubleStrokePresent } from "./is-left-square-bracket-with-double-stroke-present";

test("returns true when the left square bracket with double stroke character is present", () => {
  assert.equal(isLeftSquareBracketWithDoubleStrokePresent(`abc\u2e57def`), true);
  assert.equal(isLeftSquareBracketWithDoubleStrokePresent("abcdef"), false);
  assert.equal(isLeftSquareBracketWithDoubleStrokePresent("abc"), false);
});
