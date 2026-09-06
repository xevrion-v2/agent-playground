import test from "node:test";
import assert from "node:assert/strict";

import { isLowAsteriskPresent } from "./is-low-asterisk-present";

test("isLowAsteriskPresent detects only the Unicode low asterisk character", () => {
  assert.equal(isLowAsteriskPresent("before\u204Eafter"), true);
  assert.equal(isLowAsteriskPresent("\u204E"), true);
  assert.equal(isLowAsteriskPresent("regular asterisk *"), false);
  assert.equal(isLowAsteriskPresent("plain text"), false);
  assert.equal(isLowAsteriskPresent(""), false);
});
