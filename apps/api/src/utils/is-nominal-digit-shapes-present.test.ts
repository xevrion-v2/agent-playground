import assert from "node:assert/strict";
import test from "node:test";

import { isNominalDigitShapesPresent } from "./is-nominal-digit-shapes-present";

test("returns true when the nominal digit shapes character is present", () => {
  assert.equal(isNominalDigitShapesPresent("abc\u206fdef"), true);
  assert.equal(isNominalDigitShapesPresent("hello world"), false);
  assert.equal(isNominalDigitShapesPresent("abc"), false);
});
