import assert from "node:assert/strict";
import test from "node:test";

import { isIdeographicRisingToneMarkPresent } from "./is-ideographic-rising-tone-mark-present";

test("returns true when the input contains the ideographic rising tone mark", () => {
  assert.equal(isIdeographicRisingToneMarkPresent("target: \u302B"), true);
  assert.equal(isIdeographicRisingToneMarkPresent("hello\u302B world"), true);
});

test("returns false when the ideographic rising tone mark is absent", () => {
  assert.equal(isIdeographicRisingToneMarkPresent("plain latin text"), false);
  assert.equal(isIdeographicRisingToneMarkPresent("nearby mark but not target: \u302A"), false);
  assert.equal(isIdeographicRisingToneMarkPresent(""), false);
});
