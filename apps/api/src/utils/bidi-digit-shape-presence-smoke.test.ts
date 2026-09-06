import test from "node:test";
import assert from "node:assert/strict";

import { isLeftToRightOverridePresent } from "./is-left-to-right-override-present";
import { isNationalDigitShapesPresent } from "./is-national-digit-shapes-present";
import { isNominalDigitShapesPresent } from "./is-nominal-digit-shapes-present";
import { isPopDirectionalFormattingPresent } from "./is-pop-directional-formatting-present";

test("bidi and digit-shape helpers detect only their target characters", () => {
  assert.equal(isPopDirectionalFormattingPresent("pop\u202Cformat"), true);
  assert.equal(isPopDirectionalFormattingPresent("pop format"), false);
  assert.equal(isPopDirectionalFormattingPresent(""), false);

  assert.equal(isLeftToRightOverridePresent("ltr\u202Doverride"), true);
  assert.equal(isLeftToRightOverridePresent("ltr override"), false);
  assert.equal(isLeftToRightOverridePresent(""), false);

  assert.equal(isNationalDigitShapesPresent("national\u206Edigits"), true);
  assert.equal(isNationalDigitShapesPresent("national digits"), false);
  assert.equal(isNationalDigitShapesPresent(""), false);

  assert.equal(isNominalDigitShapesPresent("nominal\u206Fdigits"), true);
  assert.equal(isNominalDigitShapesPresent("nominal digits"), false);
  assert.equal(isNominalDigitShapesPresent(""), false);
});
