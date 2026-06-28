import assert from "node:assert/strict";
import test from "node:test";

import { Button } from "./index.js";

test("Button returns the provided label", () => {
  assert.equal(Button({ label: "Save" }).label, "Save");
});

test("Button defaults disabled to false", () => {
  assert.equal(Button({ label: "Save" }).disabled, false);
});

test("Button preserves an explicit disabled value", () => {
  assert.equal(Button({ label: "Save", disabled: true }).disabled, true);
});
