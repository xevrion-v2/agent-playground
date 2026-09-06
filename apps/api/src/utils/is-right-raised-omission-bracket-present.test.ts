import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isRightRaisedOmissionBracketPresent } from "./is-right-raised-omission-bracket-present";

test("returns true when right raised omission bracket char is present", () => {
  assert.equal(isRightRaisedOmissionBracketPresent("text ⸍"), true);
});

test("returns false when right raised omission bracket char is absent", () => {
  assert.equal(isRightRaisedOmissionBracketPresent("no special chars"), false);
});

test("returns false for empty string", () => {
  assert.equal(isRightRaisedOmissionBracketPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isRightRaisedOmissionBracketPresent("⸍"), true);
});
