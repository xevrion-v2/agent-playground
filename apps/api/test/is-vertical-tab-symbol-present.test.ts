import assert from "node:assert/strict";
import { test } from "node:test";

import { isVerticalTabSymbolPresent } from "../src/utils/is-vertical-tab-symbol-present";

test("isVerticalTabSymbolPresent returns true when the input contains a vertical tab", () => {
  assert.equal(isVerticalTabSymbolPresent("first\vsecond"), true);
});

test("isVerticalTabSymbolPresent returns false when the input does not contain a vertical tab", () => {
  assert.equal(isVerticalTabSymbolPresent("first second"), false);
});
