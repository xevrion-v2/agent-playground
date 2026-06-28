import test from "node:test";
import assert from "node:assert/strict";
import { Button } from "./index";

test("Button returns its label and defaults to enabled", () => {
  assert.deepEqual(Button({ label: "Create task" }), {
    type: "button",
    label: "Create task",
    disabled: false
  });
});

test("Button preserves an explicit disabled value", () => {
  assert.deepEqual(Button({ label: "Create task", disabled: true }), {
    type: "button",
    label: "Create task",
    disabled: true
  });
});
