import assert from "node:assert/strict";
import test from "node:test";

import { Button } from "./index";

test("Button preserves the provided label", () => {
  assert.deepEqual(Button({ label: "Save" }), {
    type: "button",
    label: "Save",
    disabled: false
  });
});

test("Button defaults disabled to false", () => {
  assert.equal(Button({ label: "Continue" }).disabled, false);
});

test("Button preserves explicit disabled values", () => {
  assert.equal(Button({ label: "Submit", disabled: true }).disabled, true);
  assert.equal(Button({ label: "Submit", disabled: false }).disabled, false);
});
