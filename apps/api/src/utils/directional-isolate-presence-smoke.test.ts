import test from "node:test";
import assert from "node:assert/strict";

import { isFirstStrongIsolatePresent } from "./is-first-strong-isolate-present";
import { isLeftToRightIsolatePresent } from "./is-left-to-right-isolate-present";
import { isPopDirectionalIsolatePresent } from "./is-pop-directional-isolate-present";
import { isRightToLeftIsolatePresent } from "./is-right-to-left-isolate-present";

test("directional isolate helpers detect only their target characters", () => {
  assert.equal(isLeftToRightIsolatePresent("ltr\u2066text"), true);
  assert.equal(isLeftToRightIsolatePresent("ltr text"), false);

  assert.equal(isRightToLeftIsolatePresent("rtl\u2067text"), true);
  assert.equal(isRightToLeftIsolatePresent("rtl text"), false);

  assert.equal(isFirstStrongIsolatePresent("first\u2068strong"), true);
  assert.equal(isFirstStrongIsolatePresent("first strong"), false);

  assert.equal(isPopDirectionalIsolatePresent("pop\u2069isolate"), true);
  assert.equal(isPopDirectionalIsolatePresent("pop isolate"), false);
});
