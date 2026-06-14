import assert from "node:assert/strict";
import test from "node:test";

import { Button } from "./index.ts";

test("Button preserves the provided label and defaults to enabled", () => {
  assert.deepEqual(Button({ label: "Save" }), {
    type: "button",
    label: "Save",
    disabled: false
  });
});

test("Button respects explicit disabled values", () => {
  assert.deepEqual(Button({ label: "Delete", disabled: true }), {
    type: "button",
    label: "Delete",
    disabled: true
  });

  assert.deepEqual(Button({ label: "Edit", disabled: false }), {
    type: "button",
    label: "Edit",
    disabled: false
  });
});
