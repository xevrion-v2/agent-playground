import assert from "node:assert/strict";
import test from "node:test";

import { isVerticalTabSymbolPresent } from "./is-vertical-tab-symbol-present.js";

test("detects a vertical tab character", () => {
  assert.equal(isVerticalTabSymbolPresent("before\vafter"), true);
});

test("returns false when a vertical tab is absent", () => {
  assert.equal(isVerticalTabSymbolPresent("ordinary text\n"), false);
});

test("does not treat the literal escape text as a control character", () => {
  assert.equal(isVerticalTabSymbolPresent(String.raw`before\vafter`), false);
});
