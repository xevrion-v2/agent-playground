import assert from "node:assert/strict";
import test from "node:test";

import { Button } from "./index";

test("Button returns the provided label and default disabled state", () => {
  assert.deepEqual(Button({ label: "Submit" }), {
    type: "button",
    label: "Submit",
    disabled: false
  });
});

test("Button preserves an explicit disabled value", () => {
  assert.deepEqual(Button({ label: "Delete", disabled: true }), {
    type: "button",
    label: "Delete",
    disabled: true
  });
});
