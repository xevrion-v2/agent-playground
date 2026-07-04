import test from "node:test";
import assert from "node:assert/strict";

import { isActivateArabicFormShapingPresent } from "./is-activate-arabic-form-shaping-present";
import { isActivateSymmetricSwappingPresent } from "./is-activate-symmetric-swapping-present";
import { isInhibitArabicFormShapingPresent } from "./is-inhibit-arabic-form-shaping-present";
import { isInhibitSymmetricSwappingPresent } from "./is-inhibit-symmetric-swapping-present";

test("format shaping helpers detect only their target characters", () => {
  assert.equal(isInhibitSymmetricSwappingPresent("swap\u206Aoff"), true);
  assert.equal(isInhibitSymmetricSwappingPresent("swap off"), false);

  assert.equal(isActivateSymmetricSwappingPresent("swap\u206Bon"), true);
  assert.equal(isActivateSymmetricSwappingPresent("swap on"), false);

  assert.equal(isInhibitArabicFormShapingPresent("shape\u206Coff"), true);
  assert.equal(isInhibitArabicFormShapingPresent("shape off"), false);

  assert.equal(isActivateArabicFormShapingPresent("shape\u206Don"), true);
  assert.equal(isActivateArabicFormShapingPresent("shape on"), false);
});
