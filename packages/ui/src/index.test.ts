import assert from "node:assert/strict";
import test from "node:test";

import { Button } from "./index.ts";

test("Button returns the provided label", () => {
  assert.equal(Button({ label: "Save" }).label, "Save");
});

test("Button defaults disabled to false and keeps explicit disabled values", () => {
  assert.equal(Button({ label: "Save" }).disabled, false);
  assert.equal(Button({ label: "Delete", disabled: true }).disabled, true);
});
